import { Component, Injector, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd';
import { UserAnswer, UserQuestion } from '@shared/service-proxies/entity';
import { UserAnswerService, UserQuestionService } from '@shared/service-proxies/marketing-service';

import { AppComponentBase } from '@shared/app-component-base';

@Component({
    selector: 'app-page-user-answer',
    templateUrl: './user-answer.component.html'
})
export class UserAnswerComponent extends AppComponentBase implements OnInit {
    data: UserAnswer[] = [];
    question: UserQuestion;
    questionId: string;
    questions = [
        {
            no: 1,
            text: '您所开的烟店地处什么位置?',
            answers: [
                { label: '城市', checked: false },
                { label: '乡镇', checked: false },
                { label: '郊区', checked: false },
                { label: '农村', checked: false }
            ]
        },
        {
            no: 2,
            text: '您经营卷烟零售有多长时间?',
            answers: [
                { label: '1年或1年以内', checked: false },
                { label: '1～5年', checked: false },
                { label: '5年以上', checked: false }
            ]
        },
        {
            no: 3,
            text: '您每月卷烟销量有多少?',
            answers: [
                { label: '20条以下', checked: false },
                { label: '20～70条', checked: false },
                { label: '70～150条', checked: false },
                { label: '150条以上', checked: false }
            ]
        },
        {
            no: 4,
            text: '您每月销售的卷烟中哪种档次的卷烟销量较大?',
            answers: [
                { label: '30元以下', checked: false },
                { label: '30～80元', checked: false },
                { label: '80元以上', checked: false }
            ]
        },
        {
            no: 5,
            text: '您所售卷烟中哪些牌号卷烟销量较大，请依次填写?',
            answers: [
                { label: '30元以下', checked: false },
                { label: '30～80元', checked: false },
                { label: '80元以上', checked: false }
            ]
        },
        {
            no: 6,
            text: '烟草公司的访销员每周到你户访销几次?',
            answers: [
                { label: '一次', checked: false },
                { label: '两次', checked: false },
                { label: '两次以上', checked: false },
                { label: '不走访', checked: false }
            ]
        },
        {
            no: 7,
            text: '您认为我们访销员一周上门访销几次为好?',
            answers: [
                { label: '一次', checked: false },
                { label: '两次', checked: false },
                { label: '三次', checked: false },
                { label: '无所谓', checked: false }
            ]
        },
        {
            no: 8,
            text: '您对我们上门访销员、市场经理的服务态度是否满意?',
            answers: [
                { label: '满意', checked: false },
                { label: '基本满意', checked: false },
                { label: '不满意', checked: false }
            ]
        },
        {
            no: 9,
            text: '您对我们配送员、驾驶员的服务态度是否满意?',
            answers: [
                { label: '满意', checked: false },
                { label: '基本满意', checked: false },
                { label: '不满意', checked: false }
            ]
        },
        {
            no: 10,
            text: '访销员每次上门访销时做些什么工作?',
            answers: [
                { label: '完成定单', checked: false },
                { label: '市场管理', checked: false },
                { label: '询问信息', checked: false }
            ]
        }
    ];

    constructor(injector: Injector, public msg: NzMessageService
        , private _userAnswerService: UserAnswerService
        , private _userQuestionService: UserQuestionService
        , public route: ActivatedRoute) {
        super(injector);
        this.questionId = this.route.snapshot.params['id'];
    }

    ngOnInit() {
        this.getQuestion();
        this.getAanswerData();
    }

    getQuestion() {
        this._userQuestionService.get(this.questionId).subscribe(result => {
            this.question = result;
        });
    }

    getAanswerData() {
        this._userAnswerService.getByQuestionId(this.questionId).subscribe((result: UserAnswer[]) => {
            this.data = result;
            if (this.data != undefined) {
                for (const item of this.data) {
                    this.setQuestion(item);
                }
            }
        })
    }

    setQuestion(answer: UserAnswer) {
        for (const question of this.questions) {
            if (answer.answerSqe == question.no) {
                for (const aitem of question.answers) {
                    if (aitem.label == answer.content) {
                        aitem.checked = true;
                        return;
                    }
                }
                return;
            }
        }
    }
}
