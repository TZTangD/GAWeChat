export class WechatUser implements IWechatUser {
    id: string;
    nickName: string;
    openId: string;
    userType: number;
    userId: string;
    userName: string;
    bindStatus: number;
    bindTime: Date;
    tenantId: number;
    unBindTime: Date;
    headImgUrl: string;
    userTypeName: string;
    bindStatusName: string;
    phone: string;
    memberBarCode: string;
    integralTotal: number;
    isShopkeeper: boolean;
    status: number;
    statusName:string;
    ticket:string;
    sourceType:number;
    sourceId:string;
    constructor(data?: IWechatUser) {
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
            this.nickName = data["nickName"];
            this.openId = data["openId"];
            this.userType = data["userType"];
            this.userId = data["userId"];
            this.userName = data["userName"];
            this.bindStatus = data["bindStatus"];
            this.bindTime = data["bindTime"];
            this.tenantId = data["tenantId"];
            this.unBindTime = data["unBindTime"];
            this.userTypeName = data["userTypeName"];
            this.bindStatusName = data["bindStatusName"];
            this.headImgUrl = data["headImgUrl"];
            this.phone = data["phone"];
            this.memberBarCode = data["memberBarCode"];
            this.integralTotal = data["integralTotal"];
            this.isShopkeeper = data["isShopkeeper"];
            this.status = data["status"];
            this.statusName = data["statusName"];
            this.ticket = data["ticket"];
            this.sourceType = data["sourceType"];
            this.sourceId = data["sourceId"];
            
        }
    }

    static fromJS(data: any): WechatUser {
        let result = new WechatUser();
        result.init(data);
        return result;
    }

    static fromJSArray(data: any[]): WechatUser[] {
        let arry = []
        data.map(i => {
            let item = new WechatUser();
            item.init(i);
            arry.push(item);
        })
        return arry;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["nickName"] = this.nickName;
        data["openId"] = this.openId;
        data["userType"] = this.userType;
        data["userId"] = this.userId;
        data["userName"] = this.userName;
        data["bindStatus"] = this.bindStatus;
        data["bindTime"] = this.bindTime;
        data["tenantId"] = this.tenantId;
        data["unBindTime"] = this.unBindTime;
        data["headImgUrl"] = this.headImgUrl;
        data["phone"] = this.phone;
        data["memberBarCode"] = this.memberBarCode;
        data["integralTotal"] = this.integralTotal;
        data["isShopkeeper"] = this.isShopkeeper;
        data["status"] = this.status;
        data["statusName"] = this.statusName;
        data["ticket"] = this.ticket;
        data["sourceType"] = this.sourceType;
        data["sourceId"] = this.sourceId;
        
        return data;
    }

    clone() {
        const json = this.toJSON();
        let result = new WechatUser();
        result.init(json);
        return result;
    }
}
export interface IWechatUser {
    id: string;
    nickName: string;
    openId: string;
    userType: number;
    userId: string;
    userName: string;
    bindStatus: number;
    bindTime: Date;
    tenantId: number;
    unBindTime: Date;
    headImgUrl: string;
    phone: string;
    memberBarCode: string;
    integralTotal: number;
    isShopkeeper: boolean;
    status: number;
    statusName:string;
    ticket:string;
    sourceType:number;
    sourceId:string;
    
}

export enum UserType {
    Retailer = 1,
    Staff = 2,
    Consumer = 4
}