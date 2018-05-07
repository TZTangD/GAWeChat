export class UserQuestion implements IUserQuestion {
    id: string;
    name: string;
    userName: string;
    phone: string;
    address: string;
    openId: string;
    tenantId: number;
    creationTime: Date;

    constructor(data?: IUserQuestion) {
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
            this.name = data["name"];
            this.userName = data["userName"];
            this.phone = data["phone"];
            this.address = data["address"];
            this.openId = data["openId"];
            this.tenantId = data["tenantId"];
            this.creationTime = data["creationTime"];
        }
    }

    static fromJS(data: any): UserQuestion {
        let result = new UserQuestion();
        result.init(data);
        return result;
    }

    static fromJSArray(dataArray: any[]): UserQuestion[] {
        let array = [];
        dataArray.forEach(result => {
            let item = new UserQuestion();
            item.init(result);
            array.push(item);
        });

        return array;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["name"] = this.name;
        data["userName"] = this.userName;
        data["phone"] = this.phone;
        data["address"] = this.address;
        data["openId"] = this.openId;
        data["tenantId"] = this.tenantId;
        data["creationTime"] = this.creationTime;
        return data;
    }

    clone() {
        const json = this.toJSON();
        let result = new UserQuestion();
        result.init(json);
        return result;
    }
}
export interface IUserQuestion {
    id: string;
    name: string;
    userName: string;
    phone: string;
    address: string;
    openId: string;
    tenantId: number;
    creationTime: Date;
}



