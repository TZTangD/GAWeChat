export class ShopProduct implements IShopProduct{
    id: string;
    productId: string;
    shopId: string;
    specification: string;
    type: number;
    price:number;
    packageCode: string;
    barCode: string;
    typeName: string;
    photoUrl:string;
    showPhotoUrl:string;
    constructor(data?: IShopProduct) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(data?: any) {
        if (data) {
            this.id = data["id"];
            this.productId = data["productId"];
            this.shopId = data["shopId"];
            this.specification = data["specification"];
            this.type = data["type"];
            this.price = data["price"];
            this.packageCode = data["packageCode"];
            this.barCode = data["barCode"];
            this.typeName = data["typeName"];
            this.photoUrl = data["photoUrl"];
        }
    }

    static fromJS(data: any): ShopProduct {
        let result = new ShopProduct();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["productId"] = this.productId;
        data["shopId"] = this.shopId;
        data["specification"] = this.specification;
        return data;
    }

    clone() {
        const json = this.toJSON();
        let result = new ShopProduct();
        result.init(json);
        return result;
    }
}
export interface IShopProduct {
    id: string;
    productId: string;
    shopId: string;
    specification: string;
}