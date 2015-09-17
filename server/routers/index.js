import { Router } from 'express'
import indexRouter from './page'
import userRouter from './users'
import articleRouter from './articles'

const router = Router()

router.use('/users', userRouter)
router.use('/p', articleRouter)
router.use('/', indexRouter)

export default router
