export class Activity implements IActivity{
    id: string;
    name: string;
    beginTime: string;
    endTime: string;
    activityType: number;
    content: string;
    mUnfinished: number;
    rUnfinished: number;
    tenantId: number;
    publishTime: string;
    status: number;
    statusName:string;
    typeName:string;
    constructor(data?: IActivity) {
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
            this.beginTime = data["beginTime"];
            this.endTime = data["endTime"];
            this.activityType = data["activityType"];
            this.content = data["content"];
            this.mUnfinished = data["mUnfinished"];
            this.rUnfinished = data["rUnfinished"];
            this.tenantId = data["tenantId"];
            this.publishTime = data["publishTime"];
            this.status = data["status"];
            this.statusName = data["statusName"];
            this.typeName = data["typeName"];
            
        }
    }

    static fromJS(data: any): Activity {
        let result = new Activity();
        result.init(data);
        return result;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["name"] = this.name;
        data["content"] = this.content;
        data["beginTime"] =this.beginTime ;
        data["endTime"] =this.endTime;
        data["tenantId"] = this.tenantId;
        data["mUnfinished"] = this.mUnfinished;
        data["rUnfinished"] = this.rUnfinished;
        data["publishTime"] =this.publishTime;
        data["status"] = this.status;
        data["activityType"] = this.activityType;
        return data;
    }

    clone() {
        const json = this.toJSON();
        let result = new Activity();
        result.init(json);
        return result;
    }
    dateFormat(date: any): string {
        if (date === null) {
            return null;
        }
        let d = <Date>date;
        let y = d.getFullYear().toString();
        let m = (d.getMonth() + 1).toString();
        let day = d.getDate().toString();
        return  y + '-' + m + '-' + day;
        //let dateStr:string = this.datePipe.transform(d,'yyyy-MM-dd');
        //return dateStr;
    }
}
export interface IActivity {
    id: string;
    name: string;
    beginTime: string;
    endTime: string;
    activityType: number;
    content: string;
    mUnfinished: number;
    rUnfinished: number;
    tenantId: number;
    publishTime: string;
    status: number;
}