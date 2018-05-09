export class MemberConfigs implements IMemberConfigs {
    id: string;
    type: number;
    code: number;
    value: string;
    creationTime: Date;
    tenantId: number;
    constructor(data?: IMemberConfigs) {
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
            this.code = data["code"];
            this.value = data["value"];
            this.creationTime = data["creationTime"];
            this.tenantId = data["tenantId"];
        }
    }

    static fromJS(data: any): MemberConfigs {
        let result = new MemberConfigs();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["type"] = this.type;
        data["code"] = this.code;
        data["value"] = this.value;
        data["creationTime"] = this.creationTime;
        data["tenantId"] = this.tenantId;
        return data;
    }

    clone() {
        const json = this.toJSON();
        let result = new MemberConfigs();
        result.init(json);
        return result;
    }
}
export interface IMemberConfigs {
    id: string;
    type: number;
    code: number;
    value: string;
    creationTime: Date;
    tenantId: number;
}