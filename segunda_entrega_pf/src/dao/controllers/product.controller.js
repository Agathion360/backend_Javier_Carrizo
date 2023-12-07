import productsModel from "../models/products.model.js"
import mongoose from "mongoose"


export class ProductController {

    constructor() {
       
    }


async addProduct(product) {
    try {
        await productsModel.create(product)
        return "Producto agregado correctamente"
           
    } catch (error) {
            return error.message
    }
}


// async getProducts(limit) {
//     try{
// const options = {limit: parseInt(limit,10) ,lean: true}        
// //    const products = await productsModel.find().lean()
// //const products = await productsModel.paginate({ limit: 5, page: 1, defaultLimit: 5 }, { lean: true });
// //const products = await productsModel.paginate({}, {limit: 5})


//        return products

//     }
//     catch(error){
//         return error.message
//     }
// }


async getProducts(limit,page,sort) {
    try {
        const options = { limit: parseInt(limit, 10),page: parseInt(page,10), lean: true };

        if (sort && (sort.toLowerCase() === 'asc' || sort.toLowerCase() === 'desc')) {
            options.sort = { price: sort.toLowerCase() };
        }

        const products = await productsModel.paginate({}, options);
        return products;
    } catch (error) {
        console.error('Error al obtener productos:', error);
        throw new Error('Error al obtener productos');
    }
}


async getProductsById(id) {
    try{
        const product = await productsModel.findById(id).lean()
        return product === null ? {error: "Producto no encontrado"} : product
    }
      catch(error){
        return error.message
    }
  }
     

async updateProduct(id, product) {
    try {
     const productUpdated = await productsModel.findByIdAndUpdate(id, product)
    return productUpdated === null ? {error: "Producto no encontrado"} : productUpdated
    } catch (error) {
        return error.message
    }
}

async deleteProduct(id) {
    try {
        const productDeleted = await productsModel.findByIdAndDelete(id)
        return productDeleted === null ? {error: "Producto no encontrado"} : productDeleted
    } catch (error) {
        return error.message
    }
}


}