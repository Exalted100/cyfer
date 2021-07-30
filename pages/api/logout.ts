import express from "express"
const router = express.Router()
import userCtrl from '../../controllers/userCtrl'
import middleware from '../../middleware/database';
import nc from "next-connect"

const handler = nc()

handler.use(middleware)

handler.post(userCtrl.logout)

export default handler