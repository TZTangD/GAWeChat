export class JsApiConfig implements IJsApiConfig {
    debug: boolean; 
    appId: string; 
    timestamp: number; 
    nonceStr: string; 
    signature: string; 
    jsApiList: string[];

    constructor(data?: IJsApiConfig) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(data?: any) {
        if (data) {
            this.debug = data["debug"];
            this.appId = data["appId"];
            this.timestamp = data["timestamp"];
            this.nonceStr = data["nonceStr"];
            this.signature = data["signature"];
            this.jsApiList = data["jsApiList"];
        }
    }

    static fromJS(data: any): JsApiConfig {
        let result = new JsApiConfig();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["debug"] = this.debug;
        data["appId"] = this.appId;
        data["timestamp"] = this.timestamp;
        data["nonceStr"] = this.nonceStr;
        data["signature"] = this.signature;
        data["jsApiList"] = this.jsApiList;
        return data;
    }

    clone() {
        const json = this.toJSON();
        let result = new JsApiConfig();
        result.init(json);
        return result;
    }
}
export interface IJsApiConfig {
    debug: boolean; // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
    appId: string;  // 必填，公众号的唯一标识
    timestamp: number; // 必填，生成签名的时间戳
    nonceStr: string; // 必填，生成签名的随机串
    signature: string; // 必填，签名
    jsApiList: string[];
}

