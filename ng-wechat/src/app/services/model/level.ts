export class Level implements ILevel {
    custId: string;
    code: string;
    name: string;
    headImgUrl: string;
    businessAddress: string;
    openId: string;
    licenseKey: string;
    monthOrderMoney: number;
    monthOrderQty: number;
    preMonthOrderMoney: number;
    preMonthOrderQty: number;
    siChuanQty: number;
    level: string;
    currentLevel: string;
    preLevel: string;
    totalPoint: number;
    monthPoint: number;

    constructor(data?: ILevel) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(data?: any) {
        if (data) {
            this.custId = data["custId"];
            this.code = data["code"];
            this.name = data["name"];
            this.headImgUrl = data["headImgUrl"];
            this.businessAddress = data["businessAddress"];
            this.openId = data["openId"];
            this.licenseKey = data["licenseKey"];
            this.monthOrderMoney = data["monthOrderMoney"];
            this.monthOrderQty = data["monthOrderQty"];
            this.preMonthOrderMoney = data["preMonthOrderMoney"];
            this.preMonthOrderQty = data["preMonthOrderQty"];
            this.siChuanQty = data["siChuanQty"];
            this.level = data["level"];
            this.currentLevel = data["currentLevel"];
            this.preLevel = data["preLevel"];
            this.totalPoint = data["totalPoint"];
            this.monthPoint = data["monthPoint"];
        }
    }

    static fromJS(data: any): Level {
        let result = new Level();
        result.init(data);
        return result;
    }

    static fromJSArray(data: any[]): Level[] {
        let arry = []
        data.map(i => {
            let item = new Level();
            item.init(i);
            arry.push(item);
        })
        return arry;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["custId"] = this.custId;
        data["code"] = this.code;
        data["name"] = this.name;
        data["headImgUrl"] = this.headImgUrl;
        data["businessAddress"] = this.businessAddress;
        data["openId"] = this.openId;
        data["licenseKey"] = this.licenseKey;
        data["monthOrderMoney"] = this.monthOrderMoney;
        data["monthOrderQty"] = this.monthOrderQty;
        data["preMonthOrderMoney"] = this.preMonthOrderMoney;
        data["preMonthOrderQty"] = this.preMonthOrderQty;
        data["siChuanQty"] = this.siChuanQty;
        data["level"] = this.level;
        data["currentLevel"] = this.currentLevel;
        data["preLevel"] = this.preLevel;
        data["totalPoint"] = this.totalPoint;
        data["monthPoint"] = this.monthPoint;
        return data;
    }

    clone() {
        const json = this.toJSON();
        let result = new Level();
        result.init(json);
        return result;
    }
}
export interface ILevel {
    custId: string;
    code: string;
    name: string;
    headImgUrl: string;
    businessAddress: string;
    openId: string;
    licenseKey: string;
    monthOrderMoney: number;
    monthOrderQty: number;
    preMonthOrderMoney: number;
    preMonthOrderQty: number;
    siChuanQty: number;
    level: string;
    currentLevel: string;
    preLevel: string;
    totalPoint: number;
    monthPoint: number;
}