import { Router } from 'express'
import { ProductController } from '../controllers/product.controller.js'

const router = Router()
const controller = new ProductController()

router.get('/products', async (req, res) => {
   
    const products = await controller.getProducts()
    
    res.render('products', {
        title: 'Listado de Productos',
        rutaJs: 'products'
    })
})





export default router