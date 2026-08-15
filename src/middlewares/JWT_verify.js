import jwt from 'jsonwebtoken'

export const verify = async (req,res,next) => {

    //busca o token nos cookies, se nao tiver, busca no header
    const token = req.cookies?.token || req.header('Autorization').replace('Bearer','')

    if(!token){
        res.status(400).json({response:"Token não Fornecido!"})
    }

    try{
        const decoded = jwt.verify(token,process.env.SECRET_JWT)
        req.user = decoded
        next()
    }catch(e){
        res.status(401).json({response:"Token invalido!"})
    }

}