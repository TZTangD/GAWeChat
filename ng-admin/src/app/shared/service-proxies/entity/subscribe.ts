export class Subscribess implements ISubscribe{
    id:number;
    msgType: number;
    content: string;
    tenantId: number;
    creationTime: Date;
    creatorUserId: number;
    lastModificationTime: Date;
    lastModifierUserId: Date;
    constructor(data?: ISubscribe) {
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
            this.msgType = data["msgType"];
            this.content = data["content"];
            this.tenantId = data["tenantId"];
            this.creationTime = data["creationTime"];
            this.creatorUserId = data["creatorUserId"];
            this.lastModificationTime = data["lastModificationTime"];
            this.lastModifierUserId = data["lastModifierUserId"];
          
        }
    }

    static fromJS(data: any): Subscribess {
        let result = new Subscribess();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["msgType"] = this.msgType;
        data["content"] = this.content;
        data["tenantId"] = this.tenantId;
        data["id"] = this.id;
        return data;
    }

    clone() {
        const json = this.toJSON();
        let result = new Subscribess();
        result.init(json);
        return result;
    }
}
export interface ISubscribe {
    id:number;
    msgType: number;
    content: string;
    tenantId: number;
    creationTime: Date;
    creatorUserId: number;
    lastModificationTime: Date;
    lastModifierUserId: Date;
}