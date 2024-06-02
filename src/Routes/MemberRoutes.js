import { Router } from 'express'
import Controller from './../Controllers/MemberController.js'
const r = Router()
r.get('/show/allbooks',Controller.ShowAllBooks)
r.get('/show/allmembers',Controller.ShowAllMember)
r.post('/borrowbook',Controller.BorrowBooks)
export default r