import { Router } from 'express';
import CartManager from '../cartManager.js';
import ProductManager from '../productManager.js';


const router = new Router();
let cartManager = new CartManager();
let productManager = new ProductManager();
let products = await productManager.getProducts();
let carts = await cartManager.getCarts()

router.get('/', async (req, res) => {
    let arrayDeCarritos = await cartManager.getCarts()
    return res.send(arrayDeCarritos)
})

router.post('/', async (req, res) => {
    let iDGenerator = carts.at(-1).id+1;
    const newCart = {
        id: iDGenerator,
        products: [],
    }
    let arrayNuevo = [...carts, newCart]
    cartManager.jsonSave(arrayNuevo)
    console.log(arrayNuevo);
    res.status(200).send('El cart se ha creado con exito')
})

router.get('/:cid', (req, res) => {
    const { cid } = req.params;
    const cartById = carts.find(cart => cart.id === parseInt(cid))
    if (!cartById) return res.send(`El Cart con el id ${cid} no existe`);

    res.send(cartById)
})

router.post('/:cid/products/:pid', async (req, res) => {
    const { cid , pid } = req.params;
    const cartById = carts.find(cart => cart.id === parseInt(cid));
    if (!cartById) return res.status(404).send(`El Cart con el id ${cid} no existe`);
    let cartProducts = cartById.products;
    const productFound = products.find(product => product.id === parseInt(pid));
    if(!productFound) return res.status(404).send(`El producto con el id ${pid} no existe`);
    const productId = productFound.id;
    let productInCart = cartProducts.find(cartProducts => cartProducts.id=== productId)
    console.log(productInCart);
    if(!productInCart) {
        const newObject = {
            id: parseInt(pid),
            quantity: 1
            }
            let newCarts = carts.filter(cart => cart.id != cid)
            cartById.products.push(newObject)
            cartManager.jsonSave([...newCarts, cartById])
    } else {
        productInCart.quantity ++;
        cartManager.jsonSave(carts)
    }
    res.status(200).send('El producto se ha agregado con éxito')
    console.log();
})

export default router