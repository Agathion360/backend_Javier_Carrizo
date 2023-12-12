import { Router } from 'express'
import { ProductController } from '../controllers/product.controller.js'

const router = Router()
const controller = new ProductController()


router.get('/products', async (req, res) => {
    const { limit, page, sort } = req.query;
    
    try {
        const productsData = await controller.getProducts(limit, page, sort);

        res.render('products', {
            title: 'Listado de Productos',
            rutaJs: 'products',
            products: productsData.products,
            totalProducts: productsData.total,
            totalPages: productsData.pages,
            currentPage: productsData.currentPage
        });
    } catch (err) {
        res.status(500).render('error', {
            message: 'Error al obtener productos',
            error: { status: 500 }
        });
    }
});






export default router