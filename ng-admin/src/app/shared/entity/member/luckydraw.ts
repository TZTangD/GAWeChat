export class LuckyDraw implements ILuckyDraw {
  id: string;
  name: string;
  beginTime: Date;
  endTime: Date;
  type: number;
  content: string;
  desc: string;
  consume: number;
  frequency: number;
  tenantId: number;
  creationTime: Date;
  creatorUserId: number;
  lastModificationTime: Date;
  lastModifierUserId: number;
  
  constructor(data?: ILuckyDraw) {
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
      this.type = data["type"];
      this.content = data["content"];
      this.desc = data["desc"];
      this.consume = data["consume"];
      this.frequency = data["frequency"];
      this.tenantId = data["tenantId"];
      this.creationTime = data["creationTime"];
      this.creatorUserId = data["creatorUserId"];
      this.lastModificationTime = data["lastModificationTime"];
      this.lastModifierUserId = data["lastModifierUserId"];
    }
  }

  static fromJS(data: any): LuckyDraw {
    let result = new LuckyDraw();
    result.init(data);
    return result;
  }

  toJSON(data?: any) {
    data = typeof data === 'object' ? data : {};
    data["id"] = this.id;
    data["name"] = this.name;
    data["beginTime"] = this.beginTime;
    data["endTime"] = this.endTime;
    data["type"] = this.type;
    data["content"] = this.content;
    data["desc"] = this.desc;
    data["consume"] = this.consume;
    data["frequency"] = this.frequency;
    data["tenantId"] = this.tenantId;
    data["creationTime"] = this.creationTime;
    data["creatorUserId"] = this.creatorUserId;
    data["lastModificationTime"] = this.lastModificationTime;
    data["lastModifierUserId"] = this.lastModifierUserId;
    return data;
  }

  clone() {
    const json = this.toJSON();
    let result = new LuckyDraw();
    result.init(json);
    return result;
  }
}

export interface ILuckyDraw {
  id: string;
  name: string;
  beginTime: Date;
  endTime: Date;
  type: number;
  content: string;
  desc: string;
  consume: number;
  frequency: number;
  tenantId: number;
  creationTime: Date;
  creatorUserId: number;
  lastModificationTime: Date;
  lastModifierUserId: number;
}