import express from 'express';
import  productsRouter  from './routes/products.router.js';
import  cartRouter  from './routes/cart.router.js';
import  viewsRouter  from './routes/view.router.js';
import { __dirname, uploader } from './utils.js';
import handlebars from 'express-handlebars';
import { Server } from 'socket.io';

const app = express();
const PORT = process.env.PORT || 8080

const httpServer = app.listen(PORT, err => {
    if(err) console.log(err);
    console.log('Server escuchando en puerto 8080');
})

const io = new Server(httpServer);

app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));

app.engine('hbs', handlebars.engine({
    extname: '.hbs'
}));

app.set('views', __dirname + '/views');
app.set('view engine', 'hbs');



app.use('/upload-file', uploader.single('myFile'), (req, res) => {
    if(!req.file) {
        return res.send('No se pudo subir el archivo')
    };
    res.status(200).send ('Archivo subido con éxito')
});

app.use('/', viewsRouter);

app.use('/api/products', productsRouter);

app.use('/api/cart', cartRouter);

let messages = []
io.on('connection', socket => {
    console.log('Cliente conectado');

    socket.on('message', data => {
        messages.push(data)
        io.emit('messageLogs', messages )
    })

    // socket.on('message', data => {
    //     console.log(data);
    // });
    // socket.emit('socket_individual', 'Este mensaje solo lo debe recibir este socket' )

    // socket.broadcast.emit('para_todos_menos_el_actual', 'este evento lo veran todos los socket conectados menos el actual' );
    // socketServer.emit('eventos_para_todos', 'este msje lo reciben todos los socket');
});


