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
  const transactionuser = await prisma.user.findUnique({
    where:{id:+userid},
    include :{transaction:{where:{status:"ACTIVE"}}}
  }) 
  if(!founduser) return response({response:res,msg : "user not Found!",code : 404})
    const transactionCount = transactionuser.transaction.length;
  if(transactionCount >= 2) return response({response:res,msg : "you cannot borrow more than 2 books!" ,code:400});

const foundbook = await prisma.books.findUnique({
        where:{id:+bookid}
      }) 
  if(!foundbook) return response({response:res,msg : "Book not Found!",code : 404})
    if (foundbook.status !== 'CANBEBORROWED' || foundbook.stock < 1) {
        return response({response:res,msg : "Book cannot be borrowed!" ,code:400});
      }
      if (founduser.penalty == 'TRUE' || founduser.penalty !== "FALSE") {
        const waktuReferensi = new Date(founduser.penaltyAt);
        const waktuSaatIni = new Date();
        
        const selisihHari = Math.floor((waktuSaatIni - waktuReferensi) / (1000 * 60 * 60 * 24 * 3))
        if (selisihHari > 3) {
            await prisma.user.update({
                data:{penalty:FALSE},
                where:{id:+userid}
            })
            console.log("un penalty :v")
        } 
        
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

    ReturnBook:async(req,res)=>{
const {userid,bookid} = req.body
try {
    const founduser = await prisma.user.findUnique({
        where:{id:+userid},
        include :{transaction:{where:{status : "ACTIVE"}}}
      }) 
      if(!founduser) return response({response:res,msg : "user not Found!",code : 404})
    const foundbook = await prisma.books.findUnique({
            where:{id:+bookid},
            include :{transaction:{where:{status : "ACTIVE"}}}
          }) 
      if(!foundbook) return response({response:res,msg : "Book not Found!",code : 404})
  

// check penalty
// foundbook.transaction.forEach((transaction, index) => {
//     res.send("Transaction", index + 1);
//     res.send(transaction);
// });
const old_transc = await prisma.books.findUnique({
    where: { id: +bookid },
    include: { 
        transaction: {
            where: { status: "ACTIVE" },
            orderBy: { borrowedAt: 'asc' }
        }
    }
});

// return res.send(old_transc)

const waktuReferensi = new Date(old_transc.transaction[0].borrowedAt);
const waktuSaatIni = new Date();

const selisihHari = Math.floor((waktuSaatIni - waktuReferensi) / (1000 * 60 * 60 * 24 * 7))
if (selisihHari > 7) {
    await prisma.user.update({
        data:{penalty:'TRUE',penaltyAt: new Date()},
        where:{id:+userid}
    })
    console.log("You Got Penalty")
} 
const bookup = await prisma.books.update({
    data :{status:"CANBEBORROWED"},
    where :{id:+bookid}
})
const tId = foundbook.transaction[0].id;
// return res.send(`${tId}`)
const transckup = await prisma.transaction.update({
    data :{status:"RETURNED",returnedAt: new Date()},
    where :{id:tId}
})
return response({response:res,data:{transaction :transckup,book:bookup},msg: "Success Return the book"})


} catch (error) {
    console.log(error.message)
    return response({response:res,msg : error,code : 500})
}
    }
}
export default Controller