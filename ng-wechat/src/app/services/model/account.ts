// export class Account implements IAccount{
//     licenseCode: string;
//     bookDate: string;
//     iteM_CODE: string;
//     iteM_NAME: string;
//     preMonthQty: number;
//     thsMonthQty: number;
//     quarterlyDate: string;
//     quarterlyQty: number;
//     yearDate: string;
//     yearQty: number;
//     constructor(data?: IAccount) {
//         if (data) {
//             for (var property in data) {
//                 if (data.hasOwnProperty(property))
//                     (<any>this)[property] = (<any>data)[property];
//             }
//         }
//     }

//     init(data?: any) {
//         if (data) {
//             this.licenseCode = data["licenseCode"];
//             this.bookDate = data["bookDate"];
//             this.iteM_CODE = data["iteM_CODE"];
//             this.iteM_NAME = data["iteM_NAME"];
//             this.preMonthQty = data["preMonthQty"];
//             this.thsMonthQty = data["thsMonthQty"];
//             this.quarterlyDate = data["quarterlyDate"];
//             this.quarterlyQty = data["quarterlyQty"];
//             this.yearDate = data["yearDate"];
//             this.yearQty = data["yearQty"];
//         }
//     }

//     static fromJS(data: any): Account {
//         let result = new Account();
//         result.init(data);
//         return result;
//     }

//     static fromJSArray(data: any[]): Account[] {
//         let arry = []
//         data.map(i => {
//             let item = new Account();
//             item.init(i);
//             arry.push(item);
//         })
//         return arry;
//     }

//     toJSON(data?: any) {
//         data = typeof data === 'object' ? data : {};
//         data["licenseCode"] = this.licenseCode;
//         data["bookDate"] = this.bookDate;
//         data["iteM_CODE"] = this.iteM_CODE;
//         data["iteM_NAME"] = this.iteM_NAME;
//         data["preMonthQty"] = this.preMonthQty;
//         data["thsMonthQty"] = this.thsMonthQty;
//         data["quarterlyDate"] = this.quarterlyDate;
//         data["quarterlyQty"] = this.quarterlyQty;
//         data["yearDate"] = this.yearDate;
//         data["yearQty"] = this.yearQty;
//         return data;
//     }

//     clone() {
//         const json = this.toJSON();
//         let result = new Account();
//         result.init(json);
//         return result;
//     }
// }
// export interface IAccount {
//     licenseCode: string;
//     bookDate: string;
//     iteM_CODE: string;
//     iteM_NAME: string;
//     preMonthQty: number;
//     thsMonthQty: number;
//     quarterlyDate: string;
//     quarterlyQty: number;
//     yearDate: string;
//     yearQty: number;
// }

export class Accounts implements IAccounts {
    licenseCode: string;
    bookDate: string;
    iteM_CODE: string;
    iteM_NAME: string;
    preMonthQty: number;
    thsMonthQty: number;
    quarterlyDate: string;
    quarterlyQty: number;
    yearDate: string;
    yearQty: number;

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
            this.iteM_CODE = data["iteM_CODE"];
            this.iteM_NAME = data["iteM_NAME"];
            this.preMonthQty = data["preMonthQty"];
            this.thsMonthQty = data["thsMonthQty"];
            this.quarterlyDate = data["quarterlyDate"];
            this.quarterlyQty = data["quarterlyQty"];
            this.yearDate = data["yearDate"];
            this.yearQty = data["yearQty"];
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
        data["iteM_CODE"] = this.iteM_CODE;
        data["iteM_NAME"] = this.iteM_NAME;
        data["preMonthQty"] = this.preMonthQty;
        data["thsMonthQty"] = this.thsMonthQty;
        data["quarterlyDate"] = this.quarterlyDate;
        data["quarterlyQty"] = this.quarterlyQty;
        data["yearDate"] = this.yearDate;
        data["yearQty"] = this.yearQty;
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
    iteM_CODE: string;
    iteM_NAME: string;
    preMonthQty: number;
    thsMonthQty: number;
    quarterlyDate: string;
    quarterlyQty: number;
    yearDate: string;
    yearQty: number;
}