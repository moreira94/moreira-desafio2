import { Router } from "express";
import ProductManager from "../productManager.js";

const router = Router();

let productManager = new ProductManager();
const products = await productManager.getProducts()

router.get('/', async (req, res) => {
    const products = await productManager.getProducts()
let cantProducts = products.length
    res.render('home', {
        products,
        cantProducts,
    })
}); 

router.get('/realtimeproducts', (req, res) => {
    res.render('realtimeproducts', {
        products,

    }  )})

export default router; 