import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
import response from './../Utility/Response.js'
const Controller = {
    ShowAllBooks : async (req,res)=>{
        try {
            const books = await prisma.books.findMany({where:{status:'CANBEBORROWED'}})
        return response({response:res,data:books})
        } catch (error) {
        return response({response:res,message : error,code : 500})
        }
    },
    ShowAllMember : async (req,res)=>{
        try {
            const user = await prisma.user.findMany({
                select: {
                    id: true,
                    name: true,
                    code: true,
                    penalty: true,
                    _count: {
                        select: { transaction: true }
                    }
                }
            });
            const users = user.map(user => ({
                id: user.id,
                name: user.name,
                code: user.code,
                penalty: user.penalty,
                total_transaction: user._count.transaction
            }));
        return response({response:res,data:users})
        } catch (error) {
        return response({response:res,message : error,code : 500})
        }
    }
}
export default Controller