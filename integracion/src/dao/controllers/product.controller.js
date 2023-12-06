import productsModel from "../models/products.model.js"



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


async getProducts() {
    try{
       const products = await productsModel.find().lean()
       return products

    }
    catch(error){
        return error.message
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