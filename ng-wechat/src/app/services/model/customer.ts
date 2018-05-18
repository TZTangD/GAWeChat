import { forEach } from "@angular/router/src/utils/collection";

export class Customers implements ICustomers {
    id: string;
    code: string;
    name: string;
    businessAddress: string;
    archivalLevel: string;
    orderCycle: string;
    storeType: string;
    telephone: string;
    isAction: boolean;
    branchCompany: string;
    department: string;
    employeeId: string;
    manager: string;
    orderMode: number;
    terminalType: number;
    businessType: string;
    scale: number;
    marketType: number;
    deliveryLine: string;
    tenantId: number;
    isDeleted: boolean;
    creationTime: Date;
    creatorUserId: number;
    lastModificationTime: Date;
    lastModifierUserId: number;
    deletionTime: Date;
    deleterUserId: number;
    verificationCode: string;
    licenseKey: string;
    custId: string;
    disLineCode: string;
    category: string;
    departmentId: string;
    slsmanId: string;
    slsmanName: string;

    constructor(data?: ICustomers) {
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
            this.code = data["code"];
            this.name = data["name"];
            this.businessAddress = data["businessAddress"];
            this.archivalLevel = data["archivalLevel"];
            this.orderCycle = data["orderCycle"];
            this.storeType = data["storeType"];
            this.telephone = data["telephone"];
            this.isAction = data["isAction"];
            this.branchCompany = data["branchCompany"];
            this.department = data["department"];
            this.employeeId = data["employeeId"];
            this.manager = data["manager"];
            this.orderMode = data["orderMode"];
            this.terminalType = data["terminalType"];
            this.businessType = data["businessType"];
            this.scale = data["scale"];
            this.marketType = data["marketType"];
            this.deliveryLine = data["deliveryLine"];
            this.tenantId = data["tenantId"];
            this.isDeleted = data["isDeleted"];
            this.creationTime = data["creationTime"];
            this.creatorUserId = data["creatorUserId"];
            this.lastModificationTime = data["lastModificationTime"];
            this.lastModifierUserId = data["lastModifierUserId"];
            this.deletionTime = data["deletionTime"];
            this.deleterUserId = data["deleterUserId"];
            this.verificationCode = data["verificationCode"];
            this.licenseKey = data["licenseKey"];
            this.custId = data["custId"];
            this.disLineCode = data["disLineCode"];
            this.category = data["category"];
            this.departmentId = data["departmentId"];
            this.slsmanId = data["slsmanId"];
            this.slsmanName = data["slsmanName"];
        }
    }

    static fromJS(data: any): Customers {
        let result = new Customers();
        result.init(data);
        return result;
    }

    static fromJSArray(data: any[]): Customers[] {
        let arry = []
        data.map(i => {
            let item = new Customers();
            item.init(i);
            arry.push(item);
        })
        return arry;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["code"] = this.code;
        data["name"] = this.name;
        data["businessAddress"] = this.businessAddress;
        data["archivalLevel"] = this.archivalLevel;
        data["orderCycle"] = this.orderCycle;
        data["storeType"] = this.storeType;
        data["telephone"] = this.telephone;
        data["isAction"] = this.isAction;
        data["branchCompany"] = this.branchCompany;
        data["department"] = this.department;
        data["employeeId"] = this.employeeId;
        data["manager"] = this.manager;
        data["orderMode"] = this.orderMode;
        data["terminalType"] = this.terminalType;
        data["businessType"] = this.businessType;
        data["scale"] = this.scale;
        data["marketType"] = this.marketType;
        data["deliveryLine"] = this.deliveryLine;
        data["tenantId"] = this.tenantId;
        data["isDeleted"] = this.isDeleted;
        data["creationTime"] = this.creationTime;
        data["creatorUserId"] = this.creatorUserId;
        data["lastModificationTime"] = this.lastModificationTime;
        data["lastModifierUserId"] = this.lastModifierUserId;
        data["deletionTime"] = this.deletionTime;
        data["deleterUserId"] = this.deleterUserId;
        data["verificationCode"] = this.verificationCode;
        data["licenseKey"] = this.licenseKey;
        data["custId"] = this.custId;
        data["disLineCode"] = this.disLineCode;
        data["category"] = this.category;
        data["departmentId"] = this.departmentId;
        data["slsmanId"] = this.slsmanId;
        data["slsmanName"] = this.slsmanName;
        return data;
    }

    clone() {
        const json = this.toJSON();
        let result = new Customers();
        result.init(json);
        return result;
    }
}
export interface ICustomers {
    id: string;
    code: string;
    name: string;
    businessAddress: string;
    archivalLevel: string;
    orderCycle: string;
    storeType: string;
    telephone: string;
    isAction: boolean;
    branchCompany: string;
    department: string;
    employeeId: string;
    manager: string;
    orderMode: number;
    terminalType: number;
    businessType: string;
    scale: number;
    marketType: number;
    deliveryLine: string;
    tenantId: number;
    isDeleted: boolean;
    creationTime: Date;
    creatorUserId: number;
    lastModificationTime: Date;
    lastModifierUserId: number;
    deletionTime: Date;
    deleterUserId: number;
    verificationCode: string;
    licenseKey: string;
    custId: string;
    disLineCode: string;
    category: string;
    departmentId: string;
    slsmanId: string;
    slsmanName: string;
}