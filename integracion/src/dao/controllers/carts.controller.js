import Carts from '../models/carts.models.js';
import productsModel from '../models/products.model.js';



export class CartsController {
    constructor() {}
    
    async addProduct(id) {
        try {
        const product = await productsModel.findById(id);
        if (product === null) {
            return { error: 'Producto no encontrado' };
        }
        const cart = await Carts.find();
        if (cart.length === 0) {
            await Carts.create({ products: [product] });
            return 'Producto agregado correctamente';
        } else {
            const cartUpdated = await Carts.findByIdAndUpdate(
            cart[0]._id,
            { $push: { products: product } },
            { new: true }
            );
            return 'Producto agregado correctamente';
        }
        } catch (error) {
        return error.message;
        }
    }
    
 

    async getProducts() {
        try {
            const carts = await Carts.find().lean();
            let allProducts = [];
            for (let cart of carts) {
                for (let product of cart.products) {
                    allProducts.push(product);
                }
            }
            return allProducts.length === 0
                ? { error: 'No hay productos en el carrito' }
                : allProducts;
        } catch (error) {
            return error.message;
        }
    }
    
    async deleteProduct(id) {
        try {
        const cart = await Carts.find();
        if (cart.length === 0) {
            return { error: 'No hay productos en el carrito' };
        }
        const product = await productsModel.findById(id);
        if (product === null) {
            return { error: 'Producto no encontrado' };
        }
        const cartUpdated = await Carts.findByIdAndUpdate(
            cart[0]._id,
            { $pull: { products: { _id: id } } },
            { new: true }
        );
        return 'Producto eliminado correctamente';
        } catch (error) {
        return error.message;
        }
    }
    }