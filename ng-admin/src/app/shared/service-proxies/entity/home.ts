export class HomeInfo implements IHomeInfo {
    shopCount: number;
    pendingShopCount: number;
    goodsSearchCount: number;
    integralTotal: number;
    wechatUserCount: number;

    constructor(data?: IHomeInfo) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(data?: any) {
        if (data) {
            this.shopCount = data["shopCount"];
            this.pendingShopCount = data["pendingShopCount"];
            this.goodsSearchCount = data["goodsSearchCount"];
            this.integralTotal = data["integralTotal"];
            this.wechatUserCount = data["wechatUserCount"];
        }
    }

    static fromJS(data: any): HomeInfo {
        let result = new HomeInfo();
        result.init(data);
        return result;
    }

    static fromJSArray(dataArray: any[]): HomeInfo[] {
        let array = [];
        dataArray.forEach(result => {
            let item = new HomeInfo();
            item.init(result);
            array.push(item);
        });

        return array;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["shopCount"] = this.shopCount;
        data["pendingShopCount"] = this.pendingShopCount;
        data["goodsSearchCount"] = this.goodsSearchCount;
        data["integralTotal"] = this.integralTotal;
        data["wechatUserCount"] = this.wechatUserCount;
        return data;
    }

    clone() {
        const json = this.toJSON();
        let result = new HomeInfo();
        result.init(json);
        return result;
    }
}
export interface IHomeInfo {
    shopCount: number;
    pendingShopCount: number;
    goodsSearchCount: number;
    integralTotal: number;
    wechatUserCount: number;
}



