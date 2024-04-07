import express from 'express';
import ProductManager from './productManager.js';
import  productsRouter  from './routes/products.router.js';

const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));


app.get('/', (req, res) => {
    res.send('Bienvenido al administrador de productos')
}); 

app.use('/api/products', productsRouter)

app.listen(8080, err => {
    if(err) console.log(err);
    console.log('Server escuchando en puerto 8080');
})