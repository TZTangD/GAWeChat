export class Manuscript implements IManuscript {
    id: string;
    type: number;
    title: string;
    content: string;
    userName: string;
    phone: string;
    openId: string;
    status: number;
    tenantId: number;
    creationTime: Date;
    statusName: string;
    dealWithTime: string;
    typeName: string;
    constructor(data?: IManuscript) {
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
            this.type = data["type"];
            this.title = data["title"];
            this.content = data["content"];
            this.userName = data["userName"];
            this.phone = data["phone"];
            this.openId = data["openId"];
            this.status = data["status"];
            this.tenantId = data["tenantId"];
            this.creationTime = data["creationTime"];
            this.statusName = data["statusName"];
            this.dealWithTime = data["dealWithTime"];
            this.typeName = data["typeName"];

        }
    }

    static fromJS(data: any): Manuscript {
        let result = new Manuscript();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["type"] = this.type;
        data["title"] = this.title;
        data["content"] = this.content;
        data["userName"] = this.userName;
        data["phone"] = this.phone;
        data["openId"] = this.openId;
        data["status"] = this.status;
        data["tenantId"] = this.tenantId;
        data["creationTime"] = this.creationTime;
        data["dealWithTime"] = this.dealWithTime;
        return data;
    }

    clone() {
        const json = this.toJSON();
        let result = new Manuscript();
        result.init(json);
        return result;
    }
}
export interface IManuscript {
    id: string;
    type: number;
    title: string;
    content: string;
    userName: string;
    phone: string;
    openId: string;
    status: number;
    tenantId: number;
    creationTime: Date;
}