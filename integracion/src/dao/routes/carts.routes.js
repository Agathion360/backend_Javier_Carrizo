

import { Router } from "express";
import {CartsController} from '../controllers/carts.controller.js'

const router = Router();
const cartsController = new CartsController();

router.get('/', async (req, res) => {
    const carts = await cartsController.getProducts();
    res.status(200).send({status:'ok', data: carts});
}); 

router.get('/:cid', async(req, res) => {
    const {cid} = req.params;
    const cart = await cartsController.getProductsById(cid);
    res.status(200).send({status:'ok', data: cart});
});

router.post('/:cid/products/:pid', async(req, res) => {
    const {cid, pid} = req.params;
    const quantity = parseInt(req.body.quantity);
    const cart = await cartsController.addProductInCart(cid, pid, quantity);
    res.status(200).send({status:'ok', data: cart});
});

router.put('/:cid', async(req, res) => {
    const {cid} = req.params;
    const cart = req.body;
    const updatedCart = await cartsController.updateProduct(cid, cart);
    res.status(200).send({status:'ok', data: updatedCart});
});

router.delete('/:cid', async(req, res) => {
    const {cid} = req.params;
    await cartsController.deleteProduct(cid);
    res.status(200).send({status:'ok', data: `Cart ${cid} deleted`});
});


export default router;
