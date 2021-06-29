import sharp from "sharp"

export default class ImageResizer {
    constructor(
        destination = 'dist/public/download',
        sizes = [
            400,
            600,
            800
        ]
    ) {
        this._destination = destination;
        this._sizes = sizes;
    }


    _setSizes(sizeStr){
        this._sizes = sizeStr.split(',').map(size => Number(size)).filter(size => Boolean(size))
    }

    resize(file, format = 'jpeg', sizes){
        if(sizes)
            this._setSizes(sizes)

        const fileName = file.originalname.replace(/\..*$/, '')
        const hashName = file.filename;

        const pipeline = sharp(file.path).toFormat(format);

        return Promise.all(this._sizes.map(size => {
            const path = `${this._destination}/${hashName}-${size}-${fileName}.${format}`
            return pipeline
                .clone()
                .resize({width: size})
                .toFile(path)
                .then(info => {
                    return {
                        ...file,
                        ...info,
                        path,
                        'downloadname': `${fileName}-${info.width}x${info.height}.${format}`
                    }
                })
        }))
    }
}