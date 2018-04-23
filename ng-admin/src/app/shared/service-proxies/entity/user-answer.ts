export class UserAnswer implements IUserAnswer {
    id: string;
    userQuestionId: string;
    answerSqe: number;
    content: string;

    constructor(data?: IUserAnswer) {
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
            this.userQuestionId = data["userQuestionId"];
            this.answerSqe = data["answerSqe"];
            this.content = data["content"];
        }
    }

    static fromJS(data: any): UserAnswer {
        let result = new UserAnswer();
        result.init(data);
        return result;
    }

    static fromJSArray(dataArray: any[]): UserAnswer[] {
        let array = [];
        dataArray.forEach(result => {
            let item = new UserAnswer();
            item.init(result);
            array.push(item);
        });

        return array;
    }

    toJSON(data?: any) {
        data = typeof data === 'object' ? data : {};
        data["id"] = this.id;
        data["userQuestionId"] = this.userQuestionId;
        data["answerSqe"] = this.answerSqe;
        data["content"] = this.content;
        return data;
    }

    clone() {
        const json = this.toJSON();
        let result = new UserAnswer();
        result.init(json);
        return result;
    }
}
export interface IUserAnswer {
    id: string;
    userQuestionId: string;
    answerSqe: number;
    content: string;
}



