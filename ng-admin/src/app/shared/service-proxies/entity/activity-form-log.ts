export class ActivityFormLogDto implements IActivityFormLogDto {
    id: string;
    activityFormId: string;
    status: number;
    statusName: string;
    opinion: string;
    userType: number;
    userId: string;
    userName: string;
    actionTime: Date;
    userTypeName: string;
    desc: string;
    constructor(data?: IActivityFormLogDto) {
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
            this.status = data["status"];
            this.statusName = data["statusName"];
            this.opinion = data["opinion"];
            this.userType = data["userType"];
            this.userId = data["userId"];
            this.userName = data["userName"];
            this.actionTime = data["actionTime"];
            this.userTypeName = data["userTypeName"];
            this.desc = data["desc"];
        }
    }

    static fromJS(data: any): ActivityFormLogDto {
        let result = new ActivityFormLogDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["activityFormId"] = this.activityFormId;
        data["status"] = this.status;
        data["statusName"] = this.statusName;
        data["opinion"] = this.opinion;
        data["userType"] = this.userType;
        data["userId"] = this.userId;
        data["userName"] = this.userName;
        data["actionTime"] = this.actionTime;
        data["userTypeName"] = this.userTypeName;
        data["desc"] = this.desc;
        return data;
    }

    clone() {
        const json = this.toJSON();
        let result = new ActivityFormLogDto();
        result.init(json);
        return result;
    }
}
export interface IActivityFormLogDto {
    id: string;
    activityFormId: string;
    status: number;
    statusName: string;
    opinion: string;
    userType: number;
    userId: string;
    userName: string;
    actionTime: Date;
    userTypeName: string;
    desc: string;
}