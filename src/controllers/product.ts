import express from 'express';
import { FiltersProps, SortProps } from './../interface/ProductInterface';
import { createProductAction, deleteProductByIdAction, getAllProductsAction, getProductByIdAction, updateProductByIdAuction } from '../service/productService';

export const getAllProducts = async (req: express.Request, res: express.Response) => {
    try {
        const { search, filters, sort, sortOrder, page, limit } = req.query;
        let query: FiltersProps = {};

        if (search) {
            query.name = { $regex: new RegExp(search as string, 'i') };
        }

        if (filters) {
            const parsedData = JSON.parse(filters as string);
            query = { ...query, ...parsedData };
        }

        const response = await getAllProductsAction(query, sort as string || 'name', sortOrder as SortProps || 'asc', Number(page || 1), Number(limit || 50));
        return res.status(200).json(response);
    } catch (error) {
        console.log(error);
        res.sendStatus(400);
    }
}

export const getProductById = async (req: express.Request, res: express.Response) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).send({ message: 'Id should not be empty' });
        }
        const response = await getProductByIdAction(id);
        return res.status(200).json(response);
    } catch (error) {
        console.log(error);
        res.sendStatus(400);
    }
}

export const createProduct = async (req: express.Request, res: express.Response) => {
    try {
        const { name, price, image, categoryId, description } = req.body;

        if (!name || !price || !image || !categoryId) {
            return res.status(400).send({ message: 'Please fill all the required fields' });
        }
        const response = await createProductAction({ name, price, image, categoryId, description });
        return res.status(200).send(response);
    } catch (error) {
        console.log(error);
        res.sendStatus(400);
    }
}

export const updateProductById = async (req: express.Request, res: express.Response) => {
    try {
        const { id } = req.params;
        const { name, price, image, categoryId, description } = req.body;
        const product = await getProductByIdAction(id);
        product.name = name || product.name;
        product.price = price || product.price;
        product.image = image || product.image;
        product.categoryId = categoryId || product.categoryId;
        product.description = description || product.description;
        const response = await updateProductByIdAuction(id, product);
        return res.status(200).send(response);
    } catch (error) {
        console.log(error);
        res.sendStatus(400);
    }
}

export const deleteProduct = async (req: express.Request, res: express.Response) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).send({ message: 'Id should not be empty' });
        }
        const response = deleteProductByIdAction(id);
        return res.status(200).send(response);
    } catch (error) {
        console.log(error);
        res.sendStatus(400);
    }
}
