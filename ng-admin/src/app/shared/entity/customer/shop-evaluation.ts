export class ShopEvaluation implements IShopEvaluation {
    id: string;
    purchaseRecordId: string;
    shopId: string;
    openId: string;
    evaluation: number;
    isCorrectQuantity: boolean;
    content: string;
    creationTime: Date;
    tenantId: number;
    evaluationName: string;
    constructor(data?: IShopEvaluation) {
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
            this.purchaseRecordId = data["purchaseRecordId"];
            this.shopId = data["shopId"];
            this.openId = data["openId"];
            this.evaluation = data["evaluation"];
            this.isCorrectQuantity = data["isCorrectQuantity"];
            this.content = data["content"];
            this.creationTime = data["creationTime"];
            this.tenantId = data["tenantId"];
            this.evaluationName = data["evaluationName"];
            
        }
    }

    static fromJS(data: any): ShopEvaluation {
        let result = new ShopEvaluation();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["purchaseRecordId"] = this.purchaseRecordId;
        data["shopId"] = this.shopId;
        data["openId"] = this.openId;
        data["evaluation"] = this.evaluation;
        data["isCorrectQuantity"] = this.isCorrectQuantity;
        data["content"] = this.content;
        data["creationTime"] = this.creationTime;
        data["tenantId"] = this.tenantId;
        return data;
    }

    clone() {
        const json = this.toJSON();
        let result = new ShopEvaluation();
        result.init(json);
        return result;
    }
}

export interface IShopEvaluation {
    id: string;
    purchaseRecordId: string;
    shopId: string;
    openId: string;
    evaluation: number;
    isCorrectQuantity: boolean;
    content: string;
    creationTime: Date;
    tenantId: number;
}