import { fileURLToPath } from 'url';
import { dirname } from 'path';
import multer from 'multer';

const __filename =fileURLToPath(import.meta.url)

export const __dirname = dirname(__filename);

const storage = multer.diskStorage({
    destination: function(req, file, callback) {
        callback(null, __dirname + '/public/uploads')
    },
    filename: function(req, file, callback) {
        callback(null, `${Date.now()}-${file.originalname}`)
    }
});

export const uploader = multer({
    storage
})
