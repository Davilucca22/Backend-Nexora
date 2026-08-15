import pool from '../../database.js'
import { argon2d } from 'argon2'
import jwt from 'jsonwebtoken'

export const loginController = async (req,res) => {

    try{

        //conecta no banco
        const client = await pool.connect() 
        
        const {form} = req.body
        
        if(!form) return res.status(400).json({response:"Formulario não Enviado!"})
         
        const dados_banco = await client.query(`
            SELECT id,email_gestor,senha_hash 
            FROM empresas 
            WHERE email_gestor = $1`
        ,[form.email])
        
        const obj_user = dados_banco.rows[0]

        const verify = await argon2d.verify(obj_user.senha_hash,form.senha)

        if(!verify) return res.status(400).json({response:"Senha Incorreta!"})

        const token = jwt.sign({id:obj_user.id,email:obj_user.email_gestor},process.env.SECRET_JWT,{expiresIn:'14d'})

        const isProduction = process.env.NODE_ENV === 'production'

        res.cookie('token',token,{
            httpOnly:true, //impede de enviar cookies via javaScript
            secure:isProduction ? true : false, // true apenas em produção (trafega apenas por HTTPS)
            sameSite:'strict', //aceita requisiçoes do mesmo site
            maxAge: 14 * 24 * 60 * 60 * 1000
        })

        //desconecta do banco
        client.release()

        res.json({response:"Login Feito!",email:obj_user.email_gestor})

    }catch(e){
        res.status(500).json({response:"Erro no Banco de dados!"})
        console.error(e)
    }    
}