export class Messagess implements IMessagess {
    id: number;
    keyWord: string;
    matchMode: number;
    msgType: number;
    content: string
    tenantId: number;
    creationTime: Date
    creatorUserId: number;
    lastModificationTime: Date
    lastModifierUserId: number;
    picLink: string;
    desc: string;
    title: string;

    constructor(data?: IMessagess) {
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
            this.keyWord = data["keyWord"];
            this.matchMode = data["matchMode"];
            this.msgType = data["msgType"];
            this.content = data["content"];
            this.tenantId = data["tenantId"];
            this.creationTime = data["creationTime"];
            this.creatorUserId = data["creatorUserId"];
            this.lastModificationTime = data["lastModificationTime"];
            this.lastModifierUserId = data["lastModifierUserId"];
            this.picLink = data["picLink"];
            this.desc = data["desc"];
            this.title = data["title"];
        }
    }

    static fromJS(data: any): Messagess {
        let result = new Messagess();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["keyWord"] = this.keyWord;
        data["matchMode"] = this.matchMode;
        data["msgType"] = this.msgType;
        data["content"] = this.content;
        data["tenantId"] = this.tenantId;
        data["title"] = this.title;
        data["desc"] = this.desc;
        data["picLink"] = this.picLink;
        return data;
    }

    clone() {
        const json = this.toJSON();
        let result = new Messagess();
        result.init(json);
        return result;
    }
}
export interface IMessagess {
    keyWord: string;
    matchMode: number;
    msgType: number;
    content: string
    tenantId: number;
    creationTime: Date
    creatorUserId: number;
    lastModificationTime: Date
    lastModifierUserId: number;
    picLink: string;
    desc: string;
    title: string;
}