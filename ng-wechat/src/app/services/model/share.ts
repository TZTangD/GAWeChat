export class Share implements IShare {
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
    pushTime: Date;

    constructor(data?: IShare) {
        if (data) {
            for (const property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(data?: any) {
        if (data) {
            this.id = data['id'];
            this.title = data['title'];
            this.author = data['author'];
            this.type = data['type'];
            this.coverPhoto = data['coverPhoto'];
            this.content = data['content'];
            this.readTotal = data['readTotal'];
            this.goodTotal = data['goodTotal'];
            this.tenantId = data['tenantId'];
            this.isDeleted = data['isDeleted'];
            this.creationTime = data['creationTime'];
            this.creatorUserId = data['creatorUserId'];
            this.lastModificationTime = data['lastModificationTime'];
            this.lastModifierUserId = data['lastModifierUserId'];
            this.deletionTime = data['deletionTime'];
            this.deleterUserId = data['deleterUserId'];
            this.pushStatus = data['pushStatus'];
            this.pushTime = data['pushTime'];
        }
    }

    static fromJS(data: any): Share {
        const result = new Share();
        result.init(data);
        return result;
    }

    static fromJSArray(dataArray: any[]): Share[] {
        const array = [];
        dataArray.forEach(result => {
            const item = new Share();
            item.init(result);
            array.push(item);
        });
        return array;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data['id'] = this.id;
        data['title'] = this.title;
        data['author'] = this.author;
        data['type'] = this.type;
        data['coverPhoto'] = this.coverPhoto;
        data['content'] = this.content;
        data['readTotal'] = this.readTotal;
        data['goodTotal'] = this.goodTotal;
        data['tenantId'] = this.tenantId;
        data['isDeleted'] = this.isDeleted;
        data['creationTime'] = this.creationTime;
        data['creatorUserId'] = this.creatorUserId;
        data['lastModificationTime'] = this.lastModificationTime;
        data['lastModifierUserId'] = this.lastModifierUserId;
        data['deletionTime'] = this.deletionTime;
        data['deleterUserId'] = this.deleterUserId;
        data['pushStatus'] = this.pushStatus;
        data['pushTime'] = this.pushTime;
        return data;
    }

    clone() {
        const json = this.toJSON();
        const result = new Share();
        result.init(json);
        return result;
    }
}

export interface IShare {
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
    pushTime: Date;
}

