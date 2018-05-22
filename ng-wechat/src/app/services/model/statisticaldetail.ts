export class StatisticalDetail
    implements IStatisticalDetail {
    id: string;
    openId: string;
    articleId: string;
    type: number;
    creationTime: Date;
    tenantId: number;
    constructor(data?: IStatisticalDetail) {
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
            this.openId = data["openId"];
            this.articleId = data["articleId"];
            this.type = data["type"];
            this.creationTime = data["creationTime"];
            this.tenantId = data["tenantId"];
        }
    }

    static fromJS(data: any): StatisticalDetail {
        let result = new StatisticalDetail
            ();
        result.init(data);
        return result;
    }

    static fromJSArray(dataArray: any[]): StatisticalDetail[] {
        let array = [];
        dataArray.forEach(result => {
            let item = new StatisticalDetail();
            item.init(result);
            array.push(item);
        });
        return array;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["openId"] = this.openId;
        data["articleId"] = this.articleId;
        data["type"] = this.type;
        data["creationTime"] = this.creationTime;
        data["tenantId"] = this.tenantId;
        return data;
    }

    clone() {
        const json = this.toJSON();
        let result = new StatisticalDetail();
        result.init(json);
        return result;
    }
}
export interface IStatisticalDetail {
    id: string;
    openId: string;
    articleId: string;
    type: number;
    creationTime: Date;
    tenantId: number;
}