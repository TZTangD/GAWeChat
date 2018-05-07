export class Advise implements IAdvise {
    id: string;
    title: string;
    userTypeName: string;
    openId: string;
    phone: string;
    content: string;
    photoUrl: string;
    tenantId: number;
    creationTime: Date;

    constructor(data?: IAdvise) {
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
            this.userTypeName = data["userTypeName"];
            this.openId = data["openId"];
            this.phone = data["phone"];
            this.content = data["content"];
            this.photoUrl = data["photoUrl"];
            this.tenantId = data["tenantId"];
            this.creationTime = data["creationTime"];
        }
    }

    static fromJS(data: any): Advise {
        let result = new Advise();
        result.init(data);
        return result;
    }

    static fromJSArray(dataArray: any[]): Advise[] {
        let array = [];
        dataArray.forEach(result => {
            let item = new Advise();
            item.init(result);
            array.push(item);
        });

        return array;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["title"] = this.title;
        data["userTypeName"] = this.userTypeName;
        data["openId"] = this.openId;
        data["phone"] = this.phone;
        data["content"] = this.content;
        data["photoUrl"] = this.photoUrl;
        data["tenantId"] = this.tenantId;
        data["creationTime"] = this.creationTime;
        return data;
    }

    clone() {
        const json = this.toJSON();
        let result = new Advise();
        result.init(json);
        return result;
    }
}
export interface IAdvise {
    id: string;
    title: string;
    userTypeName: string;
    openId: string;
    phone: string;
    content: string;
    photoUrl: string;
    tenantId: number;
    creationTime: Date;
}



