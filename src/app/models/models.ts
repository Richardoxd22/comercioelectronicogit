
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
        numStock: number;
    }

    
    export interface ProductTypeDTO {
        code: number;
        description: string;
        creationDate: Date;
    }