import { Router } from "express";
import { ProductController } from '../controllers/product.controller.js'




const router = Router();
const productController = new ProductController();



router.get('/', async (req, res) => {
    const limit = req.query.limit || 10;
    const page = req.query.page || 1;
    const sort = req.query.sort || ''; 
    const products = await productController.getProducts(limit,page,sort);

    const status = products.docs.length > 0 ? 'Success' : 'Error';
    const message = status === 'Error' ? 'No se encontraron productos.' : undefined;

    res.status(status === 'Success' ? 200 : 404).send({ status, data: products, message });
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

