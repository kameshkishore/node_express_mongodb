import express from 'express';
import { getAllCategoryAction, getCategoryByIdAction, createCategoryAction, updateCategoryByIdAuction, deleteCategoryByIdAction } from '../service/categoryService';

export const getAllCategories = async (req: express.Request, res: express.Response) => {
    try {
        const response = await getAllCategoryAction();
        return res.status(200).json(response);
    } catch (error) {
        console.log(error);
        res.sendStatus(400);
    }
}

export const getCategoryById = async (req: express.Request, res: express.Response) => {
    try {
        const { id } = req.params;
        if (!id) {
            return res.status(400).send({ message: 'Id should not be empty' });
        }
        const response = await getCategoryByIdAction(id);
        return res.status(200).json(response);
    } catch (error) {
        console.log(error);
        res.sendStatus(400);
    }
}

export const createCategory = async (req: express.Request, res: express.Response) => {
    try {
        const { name, image, description } = req.body;

        if (!name || !image) {
            return res.status(400).send({ message: 'Please fill all the required fields' });
        }
        const response = await createCategoryAction({ name, image, description });
        return res.status(200).send(response);
    } catch (error) {
        console.log(error);
        res.sendStatus(400);
    }
}

export const updateCategoryById = async (req: express.Request, res: express.Response) => {
    try {
        const { id } = req.params;
        const { name, price, image, categoryId, description } = req.body;
        const product = await getCategoryByIdAction(id);
        product.name = name || product.name;
        product.image = image || product.image;
        product.description = description || product.description;
        const response = await updateCategoryByIdAuction(id, product);
        return res.status(200).send(response);
    } catch (error) {
        console.log(error);
        res.sendStatus(400);
    }
}

export const deleteCategory = async (req: express.Request, res: express.Response) => {
    try {
        const { id } = req.params;

        if (!id) {
            return res.status(400).send({ message: 'Id should not be empty' });
        }
        const response = deleteCategoryByIdAction(id);
        return res.status(200).send(response);
    } catch (error) {
        console.log(error);
        res.sendStatus(400);
    }
}
