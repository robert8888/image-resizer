import express from "express"
import multer from "multer"
import ImageResizer from "@services/ImageResizer.js";

const router = express.Router();

const upload = multer({ dest: './temp/upload' })

router.post('/download', upload.single('image'), async (req, res, next) => {
    try{
        const imageResizer = new ImageResizer();
        const image = req.file;
        const format = req.body.format;
        const sizes = req.body.sizes;
        const images = await imageResizer.resize(image, format, sizes);
        images.forEach(image => {
            image.url = image.path.replace('dist/public', '')
        })

        res.render('download',  {
            page: 'download',
            images,
            pageTitle: 'Download images',
            uploadUrl: '/'
        })
    } catch (error){
        res.render('error', {
            page: 'error',
        })
    }


})

export default router;