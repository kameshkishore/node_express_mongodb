import { CategoryData } from "../interface/CategoryInterface";
import { CategoryModal } from "../model/categoryModal";

export const getAllCategoryAction = () => CategoryModal.find();

export const getCategoryByIdAction = (id: string) => CategoryModal.findById(id);

export const createCategoryAction = (values: CategoryData) => new CategoryModal(values).save().then(item => item.toObject());

export const deleteCategoryByIdAction = (id: string) => CategoryModal.findOneAndDelete({ _id: id });

export const updateCategoryByIdAuction = (id: string, values: CategoryData) => CategoryModal.findByIdAndUpdate(id, values);
