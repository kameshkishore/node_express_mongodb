export interface ProductData {
    name: string;
    price: number;
    image: string;
    categoryId: string;
    description?: string;
}

export interface ProductListProps {
    metaData: {
        totalCounts: number;
        page: number;
        totalPages: number;
        count: number;
    }[];
    data: ProductData[];
}

export interface FiltersProps {
    name?: any;
    categoryId?: any;
}

export type SortProps = 'desc' | 'asc';