import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient()
import response from './../Utility/Response.js'
const Controller = {
    ShowAllBooks : async (req,res)=>{
        try {
            const books = await prisma.books.findMany({where:{status:'CANBEBORROWED'}})
        return response({response:res,data:books,msg: "Check the book : Shows all existing books and quantities, Books that are being borrowed are not counted"})
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
        return response({response:res,data:users,msg: "Member Check :  Shows all existing members, The number of books being borrowed by each member"})
        } catch (error) {
        return response({response:res,message : error,code : 500})
        }
    },
    BorrowBooks : async (req,res) => {
const {userid,bookid} = req.body
try {
  const founduser = await prisma.user.findUnique({
    where:{id:+userid},
    include :{transaction:true}
  }) 

  if(!founduser) return response({response:res,msg : "user not Found!",code : 404})
    const transactionCount = founduser.transaction.length;
  if(transactionCount >= 2) return response({response:res,msg : "you cannot borrow more than 2 books!" ,code:400});

const foundbook = await prisma.books.findUnique({
        where:{id:+bookid}
      }) 
  if(!foundbook) return response({response:res,msg : "Book not Found!",code : 404})
    if (foundbook.status !== 'CANBEBORROWED' || foundbook.stock < 1) {
        return response({response:res,msg : "Book cannot be borrowed!" ,code:400});
      }
      if (founduser.penalty == 'TRUE' || founduser.penalty !== "FALSE") {
        return response({response:res,msg : "Book cannot be borrowed,You Have a Penalty!" ,code:400});
      }
    const transaction = await prisma.transaction.create({
        data:{
            user:{
                connect :{id : +userid}
            }, 
             book:{
                connect :{id : +bookid}
            }
        }
    })
    await prisma.books.update({
        where: { id: +bookid },
        data: {
          status: 'BORROWED',
        },})
        return response({response:res,data:transaction,msg: "Success Borrow the book"})
} catch (error) {
    console.log(error.message)
    return response({response:res,msg : error,code : 500})
}
    },
}
export default Controller