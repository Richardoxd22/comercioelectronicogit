
    export interface BrandDto {
        code: number;
        description: string;
        creationDate: Date;
    }
    
    export interface ProductDto {
        id: string;
        name: string;
        description: string;
        price: number;
        productType: string;
        brand: string;
        productTypeId: string;
        brandId: string;
        numStock: number;
    }

    
    export interface ProductTypeDTO {
        code: number;
        description: string;
        creationDate: Date;
    }

    
    export interface DeliveryModeDto {
        id: number;
        name: string;
        description: string;
    }

    export interface CartDto {
        id: string;
        productId: string;
        deliveryModeId: string;
        price: number;
        cantProduct: number;
        name: string;
        cartResult: number;
        cantStock: number;
        stock: boolean;
    }
