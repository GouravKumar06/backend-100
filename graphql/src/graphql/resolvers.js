const products = require("../data/products");
const Product = require("../models/Product");
const mongoose = require("mongoose");

const resolvers = {
    Query: {
        products: async () => await Product.find(),
        product: async (_, { id }) => {
        if (!mongoose.Types.ObjectId.isValid(id)) {
            return { message: "Invalid Product ID" };
        }
        const product = await Product.findById(id);

        if (!product) {
            return { message: "Product not found" };
        }

        return product;
        },
    },

    Mutation: {
        createProduct: async (_, args) => {
            const newProduct = new Product(args);

            return await newProduct.save();
        },

        deleteProduct: async(_, { id }) => {
            const deleteProduct = await Product.findByIdAndDelete(id);

            if(!deleteProduct){
                return 'Product not found';
            }

            return 'Product deleted successfully';
        },

        updateProduct: async(_,{ id,...updatedFields }) => {
            const product= await Product.findByIdAndUpdate(
                id,
                { $set: updatedFields },
                { new: true }
            )
            return product;
        },
    },

    ProductResult: {
        __resolveType(obj) {
            if (obj._id || obj.id) {
                return "Product";
            }
            if (obj.message) {
                return "Error";
            }
            return null;
        },
    },
};

module.exports = resolvers;
