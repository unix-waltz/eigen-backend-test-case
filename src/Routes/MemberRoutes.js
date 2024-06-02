import { Router } from 'express'
import Controller from './../Controllers/MemberController.js'
const r = Router()
r.get('/show/allbooks',Controller.ShowAllBooks)
r.get('/show/allmembers',Controller.ShowAllMember)
r.post('/borrow-book',Controller.BorrowBooks)
r.post('/return-book',Controller.ReturnBook)
export default r