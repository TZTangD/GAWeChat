export class ExhibitionShop implements IExhibitionShop {
    id: string;
    createTime: Date;
    retailerId: string;
    shopName: string;
    shopAddress: string;
    picPath: string;
    votes: number;
    status: number;
    shopId: string;
    auditTime: Date;
    constructor(data?: IExhibitionShop) {
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
            this.createTime = data["createTime"];
            this.retailerId = data["retailerId"];
            this.shopName = data["shopName"];
            this.shopAddress = data["shopAddress"];
            this.picPath = data["picPath"];
            this.votes = data["votes"];
            this.status = data["status"];
            this.shopId = data["shopId"];
            this.auditTime = data["auditTime"];
        }
    }

    static fromJS(data: any): ExhibitionShop {
        let result = new ExhibitionShop();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["createTime"] = this.createTime;
        data["retailerId"] = this.retailerId;
        data["shopName"] = this.shopName;
        data["shopAddress"] = this.shopAddress;
        data["picPath"] = this.picPath;
        data["votes"] = this.votes;
        data["status"] = this.status;
        data["shopId"] = this.shopId;
        data["auditTime"] = this.auditTime;
        return data;
    }

    clone() {
        const json = this.toJSON();
        let result = new ExhibitionShop();
        result.init(json);
        return result;
    }
}
export interface IExhibitionShop {
    id: string;
    createTime: Date;
    retailerId: string;
    shopName: string;
    shopAddress: string;
    picPath: string;
    votes: number;
    status: number;
    shopId: string;
    auditTime: Date;
}