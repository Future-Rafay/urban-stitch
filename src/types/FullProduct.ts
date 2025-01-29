export interface FullProductInterface {
    _id: string;
    name: string;
    category: string;
    description: string;
    price: number;
    discountPercent?: number;
    isNew?: boolean;
    image: {
      asset: {
        _ref: string;
      };
    };
    colors: string[];
    sizes: string[];
    _createdAt: string;
    _updatedAt: string;
  }
  