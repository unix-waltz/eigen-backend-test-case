import 'dotenv/config'
import e from 'express'




const app = e()





const port = process.env.APP_LOCAL_PORT || 4000
app.listen(port,()=>{
console.log(`Listen : ${port}`)
})