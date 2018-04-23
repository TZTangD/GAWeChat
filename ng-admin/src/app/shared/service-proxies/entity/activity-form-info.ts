export class ActivityFormInfo implements IActivityFormInfo {
    isCheckedCount: number;
    goodsCount: number;
    checkCount: number;
    weiChatAttention: number;
    constructor(data?: IActivityFormInfo) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(data?: any) {
        if (data) {
            this.isCheckedCount = data["isCheckedCount"];
            this.goodsCount = data["goodsCount"];
            this.checkCount = data["checkCount"];
            this.weiChatAttention = data["weiChatAttention"];
        }
    }

    static fromJS(data: any): ActivityFormInfo {
        let result = new ActivityFormInfo();
        result.init(data);
        return result;
    }

    static fromJSArray(dataArray: any[]): ActivityFormInfo[] {
        let array = [];
        dataArray.forEach(result => {
            let item = new ActivityFormInfo();
            item.init(result);
            array.push(item);
        });

        return array;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["isCheckedCount"] = this.isCheckedCount;
        data["goodsCount"] = this.goodsCount;
        data["checkCount"] = this.checkCount;
        data["weiChatAttention"] = this.weiChatAttention;
        return data;
    }

    clone() {
        const json = this.toJSON();
        let result = new ActivityFormInfo();
        result.init(json);
        return result;
    }
}
export interface IActivityFormInfo {
    isCheckedCount: number;
    goodsCount: number;
    checkCount: number;
    weiChatAttention: number;
}