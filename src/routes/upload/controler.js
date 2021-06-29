import express from "express"

const router = express.Router();

router.get('/', (req, res) => {
    res.render('upload',  {
        page: 'upload',
        pageTitle: 'Image resizer',
        header: 'Select file and download format',
        action: '/download',
        types: ['jpeg', 'png', 'webp'],
        accept: '.jpg,.png,.jpeg,.webp'
    })
})

export default router;