export class WeChatGroup implements IWeChatGroup {
    id: number;
    typeCode: number;
    typeName: string;
    tagId: number;
    tagName: string;
    tenantId: number;
    creationTime: Date;
    creatorUserId: number;
    lastModificationTime: Date;
    lastModifierUserId: number;
    constructor(data?: IWeChatGroup) {
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
            this.typeCode = data["typeCode"];
            this.typeName = data["typeName"];
            this.tagId = data["tagId"];
            this.tagName = data["tagName"];
            this.tenantId = data["tenantId"];
            this.creationTime = data["creationTime"];
            this.creatorUserId = data["creatorUserId"];
            this.lastModificationTime = data["lastModificationTime"];
            this.lastModifierUserId = data["lastModifierUserId"];


        }
    }

    static fromJS(data: any): WeChatGroup {
        let result = new WeChatGroup();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["typeCode"] = this.typeCode;
        data["typeName"] = this.typeName;
        data["tagId"] = this.tagId;
        data["tagName"] = this.tagName;
        data["tenantId"] = this.tenantId;
        data["creationTime"] = this.creationTime;
        data["creatorUserId"] = this.creatorUserId;
        data["lastModificationTime"] = this.lastModificationTime;
        data["lastModifierUserId"] = this.lastModifierUserId;
        return data;
    }

    clone() {
        const json = this.toJSON();
        let result = new WeChatGroup();
        result.init(json);
        return result;
    }
}
export interface IWeChatGroup {
    id: number;
    typeCode: number;
    typeName: string;
    tagId: number;
    tagName: string;
    tenantId: number;
    creationTime: Date;
    creatorUserId: number;
    lastModificationTime: Date;
    lastModifierUserId: number;
}