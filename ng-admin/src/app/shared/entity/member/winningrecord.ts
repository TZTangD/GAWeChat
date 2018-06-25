export class WinningRecord implements IWinningRecord {
    id: string;
    prizeId: string;
    userId: string;
    addressId: string;
    winningTime: Date;
    num: number;
    expiryTime: Date;
    status: number;
    applyTime: Date;
    completeTime: Date;
    expressCompany: string;
    expressNo: string;
    creationTime: Date;
    creatorUserId: number;
    prizeName: string;
    userName: string;
    statusName: string;
    constructor(data?: IWinningRecord) {
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
            this.prizeId = data["prizeId"];
            this.userId = data["userId"];
            this.addressId = data["addressId"];
            this.winningTime = data["winningTime"];
            this.num = data["num"];
            this.expiryTime = data["expiryTime"];
            this.status = data["status"];
            this.applyTime = data["applyTime"];
            this.completeTime = data["completeTime"];
            this.expressCompany = data["expressCompany"];
            this.expressNo = data["expressNo"];
            this.creationTime = data["creationTime"];
            this.creatorUserId = data["creatorUserId"];
            this.prizeName = data["prizeName"];
            this.userName = data["userName"];
            this.statusName = data["statusName"];
        }
    }

    static fromJS(data: any): WinningRecord {
        let result = new WinningRecord();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["prizeId"] = this.prizeId;
        data["userId"] = this.userId;
        data["addressId"] = this.addressId;
        data["winningTime"] = this.winningTime;
        data["num"] = this.num;
        data["expiryTime"] = this.expiryTime;
        data["status"] = this.status;
        data["applyTime"] = this.applyTime;
        data["completeTime"] = this.completeTime;
        data["expressCompany"] = this.expressCompany;
        data["expressNo"] = this.expressNo;
        data["creationTime"] = this.creationTime;
        data["creatorUserId"] = this.creatorUserId;
        data["prizeName"] = this.prizeName;
        data["userName"] = this.userName;
        data["statusName"] = this.statusName;
        return data;
    }

    clone() {
        const json = this.toJSON();
        let result = new WinningRecord();
        result.init(json);
        return result;
    }
}

export interface IWinningRecord {
    id: string;
    prizeId: string;
    userId: string;
    addressId: string;
    winningTime: Date;
    num: number;
    expiryTime: Date;
    status: number;
    applyTime: Date;
    completeTime: Date;
    expressCompany: string;
    expressNo: string;
    creationTime: Date;
    creatorUserId: number;
    prizeName: string;
    userName: string;
    statusName: string;
}