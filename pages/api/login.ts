import userCtrl from '../../controllers/userCtrl'
import middleware from '../../middleware/database'
import nc from "next-connect"
import cookieParser from 'cookie-parser'

const handler = nc()

handler.use(middleware)
handler.use(cookieParser())

handler.post(userCtrl.login)

export default handler