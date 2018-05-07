export class ActivityDeliveryInfoDto implements IActivityDeliveryInfoDto {
    id: string;
    activityFormId: string;
    userName: string;
    phone: string;
    address: string;
    type: number;
    expressCompany: string;
    expressNo: string;
    remark: string;
    sendTime: Date;
    creationTime: Date;
    deliveryRemark: string;
    constructor(data?: IActivityDeliveryInfoDto) {
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
            this.activityFormId = data["activityFormId"];
            this.userName = data["userName"];
            this.phone = data["phone"];
            this.address = data["address"];
            this.type = data["type"];
            this.expressCompany = data["expressCompany"];
            this.expressNo = data["expressNo"];
            this.remark = data["remark"];
            this.sendTime = data["sendTime"];
            this.creationTime = data["creationTime"];
            this.deliveryRemark = data["deliveryRemark"];
        }
    }

    static fromJS(data: any): ActivityDeliveryInfoDto {
        let result = new ActivityDeliveryInfoDto();
        result.init(data);
        return result;
    }

    static fromJSArray(dataArray: any[]): ActivityDeliveryInfoDto[] {
        let array = [];
        dataArray.forEach(result => {
            let item = new ActivityDeliveryInfoDto();
            item.init(result);
            array.push(item);
        });   
      
        return array;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["activityFormId"] = this.activityFormId;
        data["userName"] = this.userName;
        data["phone"] = this.phone;
        data["address"] = this.address;
        data["type"] = this.type;
        data["expressCompany"] = this.expressCompany;
        data["expressNo"] = this.expressNo;
        data["remark"] = this.remark;
        data["sendTime"] = this.sendTime;
        data["creationTime"] = this.creationTime;
        data["deliveryRemark"] = this.deliveryRemark;
        return data;
    }

    clone() {
        const json = this.toJSON();
        let result = new ActivityDeliveryInfoDto();
        result.init(json);
        return result;
    }
}
export interface IActivityDeliveryInfoDto {
    id: string;
    activityFormId: string;
    userName: string;
    phone: string;
    address: string;
    type: number;
    expressCompany: string;
    expressNo: string;
    remark: string;
    sendTime: Date;
    creationTime: Date;
    deliveryRemark: string;
}