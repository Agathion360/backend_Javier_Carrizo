import { Router } from "express";
import { ProductController } from '../controllers/product.controller.js'




const router = Router();
const productController = new ProductController();

//aca va ka verificacion de los campos que esten llenos etc
router.get('/', async(req, res) => {
   const products = await productController.getProducts();
    // res.status(200).render('products',{});
    res.status(200).send({status:'ok', data: products});
}); 

router.get('/:pid', async(req, res) => {
    const {pid} = req.params;
    const product = await productController.getProductsById(pid);
    res.status(200).send({status:'ok', data: product});
});

router.post('/', async(req, res) => {
    const product = req.body;
    const newProduct = await productController.addProduct(product);
    res.status(201).send({status:'ok', data: newProduct});
});

router.put('/:pid', async(req, res) => {
    const {pid} = req.params;
    const product = req.body;
    const updatedProduct = await productController.updateProduct(pid, product);
    res.status(200).send({status:'ok', data: updatedProduct});
});

router.delete('/:pid', async(req, res) => {
    const {pid} = req.params;
    await productController.deleteProduct(pid);
    res.status(200).send({status:'ok', data: `Product ${pid} deleted`});
});

export default router;

