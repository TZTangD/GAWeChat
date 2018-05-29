export class GoodSource implements IGoodSource {
    id: string;
    custCode: string;
    amount: number;
    goodCode: string;
    cusName: string;
    goodName: string;
    constructor(data?: IGoodSource) {
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
            this.custCode = data["custCode"];
            this.amount = data["amount"];
            this.goodCode = data["goodCode"];
            this.cusName = data["cusName"];
            this.goodName = data["goodName"];
        }
    }

    static fromJS(data: any): GoodSource {
        let result = new GoodSource();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["custCode"] = this.custCode;
        data["amount"] = this.amount;
        data["goodCode"] = this.goodCode;
        data["cusName"] = this.cusName;
        data["goodName"] = this.goodName;
        return data;
    }

    clone() {
        const json = this.toJSON();
        let result = new GoodSource();
        result.init(json);
        return result;
    }
}
export interface IGoodSource {
    id: string;
    custCode: string;
    amount: number;
    goodCode: string;
    cusName: string;
    goodName: string;
}