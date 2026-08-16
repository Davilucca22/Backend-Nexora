import pool from "../../database.js"
import argon2  from "argon2"
import jwt from 'jsonwebtoken'

export const registerController = async (req,res) => {
    
    try{
        const {form} = req.body

        const client = await pool.connect()

        if(!form) return res.status(400).json({response:"Formulario não enviado!"})
        
        const exist = await client.query(`
                SELECT * FROM empresas
                WHERE cnpj = $1
            `,[form.cnpj])

        const data = exist.rows

        if(data.length > 0) return res.status(400).json({response:"Empresa com este CNPJ ja cadastrada"})
        
        if(data.email_gestor === form.email_gestor) return res.status(400).json({response:"Email de gestor ja cadastrado. Tente outro"})
        
        const senha_hash = await argon2.hash(form.senha)

        const registerBD = await client.query(`
                INSERT INTO empresas(nome_empresa,cnpj,nome_fantasia,email_empresa,telefone,nome_gestor,email_gestor,senha_hash)
                VALUES
                ($1,$2,$3,$4,$5,$6,$7,$8)
            `,[form.nome_empresa,form.cnpj,form.nome_fantasia,form.email_empresa,form.telefone,form.nome_gestor,form.email_gestor,senha_hash])

        if(!registerBD) return res.status(500).json({response:"Erro no banco de dados"})

        const empresa_data = {
            id: registerBD.id,
            nome_empresa: registerBD.nome_empresa,
            cnpj: registerBD.cnpj,
            nome_fantasia: registerBD.nome_fantasia,
            email_empresa: registerBD.email_empresa,
            telefone: registerBD.telefone,
            nome_gestor:registerBD.nome_gestor,
            email_gestor: registerBD.email_gestor
        }

        const token = await jwt.sign({id:registerBD.id,email_gestor:registerBD.email_gestor},process.env.SECRET_JWT,{expiresIn:'14d'})

        const isProduction = process.env.NODE_ENV === 'production'

        res.cookie('token',token,{
            httpOnly: true, //bloqueia js
            secure: isProduction ? true : false, // trafego por HTTPS apenas em produção
            sameSite:'strict', //aceita requisiçoes do mesmo site
            maxAge: 14 * 24 * 60 * 60 * 1000 //14 dias
        })
        
        client.release()

        res.json({response:"Empresa Cadastrada!",empresa_data})
    }catch(e){
        res.status(500).json({response:"Erro ao receber dados!"})
        console.error(e)
    }
}