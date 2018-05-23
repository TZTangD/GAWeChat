export class Accounts implements IAccounts {
    licenseCode: string;
    bookDate: string;
    preDate:string;
    itemCode: string;
    itemName: string;
    monthQty: number;
    quarterlyDate: string;
    yearDate: string;

    constructor(data?: IAccounts) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(data?: any) {
        if (data) {
            this.licenseCode = data["licenseCode"];
            this.bookDate = data["bookDate"];
            this.preDate = data["preDate"];
            this.itemCode = data["itemCode"];
            this.itemName = data["itemName"];
            this.monthQty = data["monthQty"];
            this.quarterlyDate = data["quarterlyDate"];
            this.yearDate = data["yearDate"];
        }
    }

    static fromJS(data: any): Accounts {
        let result = new Accounts();
        result.init(data);
        return result;
    }

    static fromJSArray(data: any[]): Accounts[] {
        let arry = []
        data.map(i => {
            let item = new Accounts();
            item.init(i);
            arry.push(item);
        })
        return arry;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["licenseCode"] = this.licenseCode;
        data["bookDate"] = this.bookDate;
        data["preDate"] = this.preDate;
        data["itemCode"] = this.itemCode;
        data["itemName"] = this.itemName;
        data["monthQty"] = this.monthQty;
        data["quarterlyDate"] = this.quarterlyDate;
        data["yearDate"] = this.yearDate;
        return data;
    }

    clone() {
        const json = this.toJSON();
        let result = new Accounts();
        result.init(json);
        return result;
    }
}
export interface IAccounts {
    licenseCode: string;
    bookDate: string;
    preDate:string;
    itemCode: string;
    itemName: string;
    monthQty: number;
    quarterlyDate: string;
    yearDate: string;
}