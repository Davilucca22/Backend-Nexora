import Express from 'express'
import helmet from 'helmet'
import route from './src/routes/router.js';
import { testConnection } from './database.js';
const app = Express();

app.use(helmet())

app.use(Express.json())
app.use(Express.urlencoded({extended:true}))

app.use(route)

try{
    await testConnection()

    app.listen(process.env.PORT,() => {
        console.log("Servidor rodando na porta:",process.env.PORT)
    })

}catch(err){
    console.log("Erro ao iniciar servidor:",err)
    process.exit()
}