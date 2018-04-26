export abstract class BaseEntity<T> {

    abstract init(data?: any);

    abstract fromJS(data: any): T;

    abstract fromJSArray(dataArray: any[]): T[];

    abstract toJSON(data?: any);

    abstract clone();
}