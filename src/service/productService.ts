import { FiltersProps, ProductData, ProductListProps, SortProps } from "../interface/ProductInterface";
import { ProductModal } from "../model/productModal";

export const getAllProductsAction = async (query?: FiltersProps, sort?: string, sortOrder?: SortProps, page?: number, limit?: number) => {
    const order = sortOrder === 'desc' ? -1 : 1;
    const response: ProductListProps[] = await ProductModal.aggregate([
        { $match: query },
        { $sort: { [sort]: order } },
        { $facet: {
            metaData: [
                { $count: 'totalCounts' },
                { $addFields: {
                    page: page,
                    totalPages: { $ceil: { $divide: ['$totalCounts', limit] } }
                } }
            ],
            data: [
                { $skip: (page - 1) * limit },
                { $limit: limit },
            ]
        } },
    ]);
    const metaData = response[0].metaData[0];
    const data = response[0].data;

    const result = {
        metaData: {
            totalCounts: metaData.totalCounts,
            page: metaData.page,
            totalPages: metaData.totalPages,
            count: data.length,
        },
        data,
    }
    return result;
};

export const getProductByIdAction = (id: string) => ProductModal.findById(id);

export const createProductAction = (values: ProductData) => new ProductModal(values).save().then(item => item.toObject());

export const deleteProductByIdAction = (id: string) => ProductModal.findOneAndDelete({ _id: id });

export const updateProductByIdAuction = (id: string, values: ProductData) => ProductModal.findByIdAndUpdate(id, values);
