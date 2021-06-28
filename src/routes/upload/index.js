import express from "express"

const router = express.Router();

router.get('/', (res, rej) => {
    res.render('upload',  { title: 'Hey', message: 'Hello there! from upload route' })
})

export default router;