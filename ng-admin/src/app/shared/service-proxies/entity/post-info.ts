export class PostInfo implements IPostInfo {
    formCode: string;
    area: string;
    goodsSpecification: string;
    num: number;
    applyTime: Date;
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
    isSend: boolean;
    id: string;
    typeName: string;
    isSendName: string;
    disabled: boolean;
    // checked: boolean;
    constructor(data?: IPostInfo) {
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
            this.formCode = data["formCode"];
            this.area = data["area"];
            this.goodsSpecification = data["goodsSpecification"];
            this.num = data["num"];
            this.applyTime = data["applyTime"];
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
            this.isSend = data["isSend"];
            this.typeName = data["typeName"];

        }
    }

    static fromJS(data: any): PostInfo {
        let result = new PostInfo();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["formCode"] = this.formCode;
        data["area"] = this.area;
        data["goodsSpecification"] = this.goodsSpecification;
        data["num"] = this.num;
        data["applyTime"] = this.applyTime;
        data["activityFormId"] = this.activityFormId;
        data["userName"] = this.userName;
        data["phone"] = this.phone;
        data["address"] = this.address;
        data["type"] = this.type;
        data["expressCompany"] = this.expressCompany;
        data["creationTime"] = this.creationTime;
        data["expressNo"] = this.expressNo;
        data["remark"] = this.remark;
        data["sendTime"] = this.sendTime;
        data["deliveryRemark"] = this.deliveryRemark;
        data["isSend"] = this.isSend;

        return data;
    }

    clone() {
        const json = this.toJSON();
        let result = new PostInfo();
        result.init(json);
        return result;
    }
}

export interface IPostInfo {
    formCode: string;
    area: string;
    goodsSpecification: string;
    num: number;
    applyTime: Date;
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
    isSend: boolean;
    id: string;
    typeName: string;

}