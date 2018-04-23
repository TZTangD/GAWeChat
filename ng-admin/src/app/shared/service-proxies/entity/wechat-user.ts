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

        }
    }

    static fromJS(data: any): WechatUser {
        let result = new WechatUser();
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
}