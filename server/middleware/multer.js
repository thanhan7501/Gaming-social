const multer = require('@koa/multer');
const path = require('path');
const storage = multer.diskStorage({
    destination: function (ctx, file, cb) {
        cb(null, path.join(__dirname, '../public/uploads'))
    },
    filename: function (ctx, file, cb) {
        let fileName = file.originalname.split('.')[0];
        let type = file.originalname.split('.')[1];
        cb(null, `${fileName}-${Date.now().toString(16)}.${type}`)
    }
});
const limits = {
    fileSize: 5000000, //File Size Unit
}
const fileFilter = (ctx, file, cb) => {
    console.log(file)
    if (!file.mimetype.startsWith('image/') || !file.mimetype.startsWith('video/')) {
        return cb(new Error('file upload error'))
    }
    // Only allow images pass
    cb(null, true);
}
module.exports = multer({
    storage,
    limits,
    fileFilter
});