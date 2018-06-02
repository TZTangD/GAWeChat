export class ConfigCode implements IConfigCode {
    rcCode: number;
    rcValue: string;
    rcId: string;
    cCode: number;
    cValue: string;
    cId: string;
    eCode: number;
    eValue: string;
    eId: string;
    userValue: string;
    userId: string;
    userCode: number;
    desc: string;
    constructor(data?: IConfigCode) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(data?: any) {
        if (data) {
            this.rcCode = data["rcCode"];
            this.rcValue = data["rcValue"];
            this.rcId = data["rcId"];
            this.cCode = data["cCode"];
            this.cValue = data["cValue"];
            this.cId = data["cId"];
            this.eCode = data["eCode"];
            this.eValue = data["eValue"];
            this.eId = data["eId"];
            this.userCode = data["userCode"];
            this.userValue = data["userValue"];
            this.userId = data["userId"];
            this.desc = data["desc"];
        }
    }

    static fromJS(data: any): ConfigCode {
        let result = new ConfigCode();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["rcCode"] = this.rcCode;
        data["rcValue"] = this.rcValue;
        data["rcId"] = this.rcId;
        data["cCode"] = this.cCode;
        data["cValue"] = this.cValue;
        data["cId"] = this.cId;
        data["eCode"] = this.eCode;
        data["eValue"] = this.eValue;
        data["eId"] = this.eId;
        data["userCode"] = this.userCode;
        data["userValue"] = this.userValue;
        data["userId"] = this.userId;
        data["desc"] = this.desc;
        return data;
    }

    clone() {
        const json = this.toJSON();
        let result = new ConfigCode();
        result.init(json);
        return result;
    }
}
export interface IConfigCode {
    rcCode: number;
    rcValue: string;
    rcId: string;
    cCode: number;
    cValue: string;
    cId: string;
    eCode: number;
    eValue: string;
    eId: string;
    userValue: string;
    userId: string;
    userCode: number;
    desc: string;
}