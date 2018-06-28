export class Shop implements IShop {
    id: string;
    name: string;
    address: string;
    desc: string;
    retailerId: string;
    coverPhoto: string;
    saleTotal: number;
    readTotal: number;
    singleTotal: number;
    evaluation: string;
    longitude: Number;
    latitude: Number;
    status: number;
    auditTime: string;
    creationTime: Date;
    tenantId: number;
    statusName: string;
    retailerName: string;
    statusType: string;
    tel: string;
    qqLongitude: number;
    qqLatitude: number;
    reason: string;
    retailerCode:string;
    ticket:string;
    wechatUrl:string;
    qrUrl:string;
    constructor(data?: IShop) {
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
            this.name = data["name"];
            this.address = data["address"];
            this.desc = data["desc"];
            this.retailerId = data["retailerId"];
            this.coverPhoto = data["coverPhoto"];
            this.saleTotal = data["saleTotal"];
            this.readTotal = data["readTotal"];
            this.evaluation = data["evaluation"];
            this.longitude = data["longitude"];
            this.latitude = data["latitude"];
            this.status = data["status"];
            this.auditTime = data["auditTime"];
            this.creationTime = data["creationTime"];
            this.tenantId = data["tenantId"];
            this.statusName = data["statusName"];
            this.retailerName = data["retailerName"];
            this.tel = data["tel"];
            this.qqLongitude = data["qqLongitude"];
            this.qqLatitude = data["qqLatitude"];
            this.reason = data["reason"];
            this.singleTotal = data["singleTotal"];
            this.retailerCode = data["retailerCode"];
            this.ticket = data["ticket"];
            this.wechatUrl = data["wechatUrl"];
            this.qrUrl = data["qrUrl"];
            
        }
    }

    static fromJS(data: any): Shop {
        let result = new Shop();
        result.init(data);
        return result;
    }

    static fromJSArray(dataArray: any[]): Shop[] {
        let array = [];
        dataArray.forEach(result => {
            let item = new Shop();
            item.init(result);
            array.push(item);
        });

        return array;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["name"] = this.name;
        data["address"] = this.address;
        data["desc"] = this.desc;
        data["retailerId"] = this.retailerId;
        data["coverPhoto"] = this.coverPhoto;
        data["saleTotal"] = this.saleTotal;
        data["readTotal"] = this.readTotal;
        data["evaluation"] = this.evaluation;
        data["longitude"] = this.longitude;
        data["latitude"] = this.latitude;
        data["status"] = this.status;
        data["auditTime"] = this.auditTime;
        data["creationTime"] = this.creationTime;
        data["tenantId"] = this.tenantId;
        data["tel"] = this.tel;
        data["qqLongitude"] = this.qqLongitude;
        data["qqLatitude"] = this.qqLatitude;
        data["reason"] = this.reason;
        data["singleTotal"] = this.singleTotal;
        data["retailerCode"] = this.retailerCode;
        data["ticket"] = this.ticket;
        data["wechatUrl"] = this.wechatUrl;
        data["qrUrl"] = this.qrUrl;
        return data;
    }

    clone() {
        const json = this.toJSON();
        let result = new Shop();
        result.init(json);
        return result;
    }
}
export interface IShop {
    id: string;
    name: string;
    address: string;
    desc: string;
    retailerId: string;
    coverPhoto: string;
    saleTotal: number;
    readTotal: number;
    singleTotal: number;
    evaluation: string;
    longitude: Number;
    latitude: Number;
    status: number;
    auditTime: string;
    creationTime: Date;
    tenantId: number;
    qqLongitude: number;
    qqLatitude: number;
    tel: string;
    reason: string;
    retailerCode:string;
    ticket:string;
    wechatUrl:string;
    qrUrl:string;
}