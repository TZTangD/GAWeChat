export class ActivityViewDto implements IActivityViewDto{
    area: string;
    goodsSpecification: string;
    managerName: string;
    openNum: number;
    goodsNum: number;

    constructor(data?: IActivityViewDto) {
        if (data) {
            for (var property in data) {
                if (data.hasOwnProperty(property))
                    (<any>this)[property] = (<any>data)[property];
            }
        }
    }

    init(data?: any) {
        if (data) {
            this.area = data["area"];
            this.goodsSpecification = data["goodsSpecification"];
            this.managerName = data["managerName"];
            this.openNum = data["openNum"];
            this.goodsNum = data["goodsNum"];  
        }
    }

    static fromJS(data: any): ActivityViewDto {
        let result = new ActivityViewDto();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["area"] = this.area;
        data["goodsSpecification"] = this.goodsSpecification;
        data["managerName"] = this.managerName;
        data["openNum"] = this.openNum;
        data["goodsNum"] = this.goodsNum;
        return data;
    }

    clone() {
        const json = this.toJSON();
        let result = new ActivityViewDto();
        result.init(json);
        return result;
    }
}
export interface IActivityViewDto {
    area: string;
    goodsSpecification: string;
    managerName: string;
    openNum: number;
    goodsNum: number;
}