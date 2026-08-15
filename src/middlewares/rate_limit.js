import rateLimit from 'express-rate-limit'

export const rate_limit = rateLimit({
    windowMs: 5 * 60 * 1000, // 5 minutos
    max: 5,
    standardHeaders: true,
    legacyHeaders: true,
    message:{
        message:"Limite de Tentativas Atingidas. Tente novamente em 5 Minutos."
    }
})
