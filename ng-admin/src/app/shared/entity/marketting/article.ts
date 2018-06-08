export class Article implements IArticle {
    id: string;
    title: string;
    author: string;
    type: number;
    coverPhoto: string;
    content: string;
    readTotal: number;
    goodTotal: number;
    tenantId: number;
    isDeleted: boolean;
    creationTime: Date;
    creatorUserId: number;
    lastModificationTime: Date;
    lastModifierUserId: number;
    deletionTime: Date;
    deleterUserId: number;
    pushStatus: number;
    pushStatusName: string;
    pushTime: string;
    showCoverPhoto: string;
    linkType: number;
    linkAddress: string;
    constructor(data?: IArticle) {
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
            this.title = data["title"];
            this.author = data["author"];
            this.type = data["type"];
            this.coverPhoto = data["coverPhoto"];
            this.content = data["content"];
            this.readTotal = data["readTotal"];
            this.goodTotal = data["goodTotal"];
            this.tenantId = data["tenantId"];
            this.isDeleted = data["isDeleted"];
            this.creationTime = data["creationTime"];
            this.creatorUserId = data["creatorUserId"];
            this.lastModificationTime = data["lastModificationTime"];
            this.lastModifierUserId = data["lastModifierUserId"];
            this.deletionTime = data["deletionTime"];
            this.deleterUserId = data["deleterUserId"];
            this.pushStatus = data["pushStatus"];
            this.pushStatusName = data["pushStatusName"];
            this.pushTime = data["pushTime"];
            this.linkType = data["linkType"];
            this.linkAddress = data["linkAddress"];
        }
    }

    static fromJS(data: any): Article {
        let result = new Article();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["title"] = this.title;
        data["author"] = this.author;
        data["type"] = this.type;
        data["coverPhoto"] = this.coverPhoto;
        data["content"] = this.content;
        data["readTotal"] = this.readTotal;
        data["goodTotal"] = this.goodTotal;
        data["tenantId"] = this.tenantId;
        data["isDeleted"] = this.isDeleted;
        data["creationTime"] = this.creationTime;
        data["creatorUserId"] = this.creatorUserId;
        data["lastModificationTime"] = this.lastModificationTime;
        data["lastModifierUserId"] = this.lastModifierUserId;
        data["deletionTime"] = this.deletionTime;
        data["deleterUserId"] = this.deleterUserId;
        data["pushStatus"] = this.pushStatus;
        data["pushTime"] = this.pushTime;
        data["linkType"] = this.linkType;
        data["linkAddress"] = this.linkAddress;
        return data;
    }

    clone() {
        const json = this.toJSON();
        let result = new Article();
        result.init(json);
        return result;
    }
}
export interface IArticle {
    id: string;
    title: string;
    author: string;
    type: number;
    coverPhoto: string;
    content: string;
    readTotal: number;
    goodTotal: number;
    tenantId: number;
    isDeleted: boolean;
    creationTime: Date;
    creatorUserId: number;
    lastModificationTime: Date;
    lastModifierUserId: number;
    deletionTime: Date;
    deleterUserId: number;
    pushStatus: number;
    linkType: number;
    linkAddress: string;
}