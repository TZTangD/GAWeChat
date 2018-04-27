export class Shop implements IShop {
    id: string;
    name: string;
    address: string;
    desc: string;
    retailerId: string;
    coverPhoto: string;
    saleTotal: number;
    readTotal: number;
    evaluation: string;
    longitude: Number;
    latitude: Number;
    status: number;
    auditTime: Date;
    creationTime: Date;
    tenantId: number;
    statusName: string;
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

        }
    }

    static fromJS(data: any): Shop {
        let result = new Shop();
        result.init(data);
        return result;
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
    evaluation: string;
    longitude: Number;
    latitude: Number;
    status: number;
    auditTime: Date;
    creationTime: Date;
    tenantId: number;
}