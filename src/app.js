import express from 'express';
import  productsRouter  from './routes/products.router.js';
import  cartRouter  from './routes/cart.router.js';
import { __dirname, uploader } from './utils.js';

const app = express();

app.use(express.json());

app.use(express.urlencoded({extended: true}));

app.use(express.static(__dirname + '/public'));

app.use('/upload-file', uploader.single('myFile'), (req, res) => {
    if(!req.file) {
        return res.send('No se pudo subir el archivo')
    }
    res.send ('Archivo subido con éxito')
})

app.get('/', (req, res) => {
    res.send('Bienvenido al administrador de productos');
}); 

app.use('/api/products', productsRouter);

app.use('/api/cart', cartRouter)



app.listen(8080, err => {
    if(err) console.log(err);
    console.log('Server escuchando en puerto 8080');
})