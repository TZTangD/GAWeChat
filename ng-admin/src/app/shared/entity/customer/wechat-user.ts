export class WeChatUser implements IWeChatUser {
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
    phone: string;
    memberBarCode: string;
    integralTotal: number;
    isShopkeeper: boolean;
    status: number;
    headImgUrl: string;

    constructor(data?: IWeChatUser) {
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
            this.phone = data["phone"];
            this.memberBarCode = data["memberBarCode"];
            this.integralTotal = data["integralTotal"];
            this.isShopkeeper = data["isShopkeeper"];
            this.status = data["status"];
            this.headImgUrl = data["headImgUrl"];

        }
    }

    static fromJS(data: any): WeChatUser {
        let result = new WeChatUser();
        result.init(data);
        return result;
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
        data["phone"] = this.phone;
        data["memberBarCode"] = this.memberBarCode;
        data["integralTotal"] = this.integralTotal;
        data["isShopkeeper"] = this.isShopkeeper;
        data["status"] = this.status;
        data["headImgUrl"] = this.headImgUrl;
        return data;
    }

    clone() {
        const json = this.toJSON();
        let result = new WeChatUser();
        result.init(json);
        return result;
    }
}

export interface IWeChatUser {
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
    phone: string;
    memberBarCode: string;
    integralTotal: number;
    isShopkeeper: boolean;
    status: number;
    headImgUrl: string;
}