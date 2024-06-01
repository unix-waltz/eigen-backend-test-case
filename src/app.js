import 'dotenv/config'
import e from 'express'
import MemberRoutes from "./Routes/MemberRoutes.js"



const app = e()
app.use(MemberRoutes)
const port = process.env.APP_LOCAL_PORT || 4000
app.listen(port,()=>{
console.log(`Listen : ${port}`)
})