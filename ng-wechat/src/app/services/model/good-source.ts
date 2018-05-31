export class GoodSource implements IGoodSource {
    custCode: string;
    amount: number;
    itemCode: string;
    itemName: string;
    id: string;
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
            this.itemCode = data["itemCode"];
            this.itemName = data["itemName"];
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
        data["itemCode"] = this.itemCode;
        data["itemName"] = this.itemName;
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
    custCode: string;
    amount: number;
    itemCode: string;
    itemName: string;
    id: string;
}
