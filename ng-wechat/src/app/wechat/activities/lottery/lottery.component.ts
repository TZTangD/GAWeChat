import { Component, ViewEncapsulation, Injector, OnInit } from '@angular/core';
import { AppComponentBase } from '../../components/app-component-base';

declare var $:any;

@Component({
    selector: 'wechat-lottery',
    templateUrl: './lottery.component.html',
    styleUrls: ['./lottery.component.scss'],
    encapsulation: ViewEncapsulation.None
})
export class LotteryComponent extends AppComponentBase implements OnInit {
    go: any;
    canvas: any;
    $lottery:any;
    ctx: any;
    w = 300;
    h = 300;
    _lottery: any = {
        title: ["奖品一", "奖品二", "奖品三", "谢谢参与", "奖品四", "奖品五", "奖品六 ", "谢谢参与"],			 //奖品名称
        colors: ["#fe807d", "#fe7771", "#fe807d", "#fe7771","#fe807d", "#fe7771", "#fe807d", "#fe7771"],			 //奖品区块对应背景颜色
        endColor: '#FF5B5C', //中奖后区块对应背景颜色
        outsideRadius: 140,	 //外圆的半径
        insideRadius: 30,	 //内圆的半径
        textRadius: 105,	 //奖品位置距离圆心的距离
        startAngle: 0,		 //开始角度
        isLock: false		 //false:停止; ture:旋转
    };

    constructor(injector: Injector) {
        super(injector);
    }

    ngOnInit() {
        this.drawLottery();
    }

    //画出转盘
    drawLottery(lottery_index?) {
        //this.go = document.getElementById('go');
        this.canvas = document.getElementById('lotterys');
        //alert(this.canvas)
        if (this.canvas.getContext) {
            //alert(11)
            this.ctx = this.canvas.getContext("2d");
            let arc = Math.PI / (this._lottery.title.length / 2); //根据奖品个数计算圆周角度
            this.ctx.clearRect(0, 0, this.w, this.h); //在给定矩形内清空一个矩形
            this.ctx.strokeStyle = '#e95455'; //strokeStyle 属性设置或返回用于笔触的颜色、渐变或模式  
            this.ctx.font = '16px Microsoft YaHei'; //font 属性设置或返回画布上文本内容的当前字体属性
            for (let i = 0; i < this._lottery.title.length; i++) {
                let angle = this._lottery.startAngle + i * arc;
                this.ctx.fillStyle = this._lottery.colors[i];

                //创建阴影（两者同时使用） shadowBlur:阴影的模糊级数   shadowColor:阴影颜色 【注：相当耗费资源】
                //ctx.shadowBlur = 1;  
                //ctx.shadowColor = "#fff";  

                this.ctx.beginPath();
                //arc(x,y,r,起始角,结束角,绘制方向) 方法创建弧/曲线（用于创建圆或部分圆）  
                this.ctx.arc(this.w / 2, this.h / 2, this._lottery.outsideRadius, angle, angle + arc, false);
                this.ctx.arc(this.w / 2, this.h / 2, this._lottery.insideRadius, angle + arc, angle, true);
                this.ctx.stroke();
                this.ctx.fill();
                this.ctx.save();

                //----绘制奖品开始----
                //中奖后改变背景色
                if (lottery_index != undefined && i == lottery_index) {
                    this.ctx.fillStyle = this._lottery.endColor;
                    this.ctx.fill();
                }
                this.ctx.fillStyle = "#fff";

                let text = this._lottery.title[i], line_height = 17, x, y;
                x = this.w / 2 + Math.cos(angle + arc / 2) * this._lottery.textRadius;
                y = this.h / 2 + Math.sin(angle + arc / 2) * this._lottery.textRadius;
                this.ctx.translate(x, y); //translate方法重新映射画布上的 (0,0) 位置
                this.ctx.rotate(angle + arc / 2 + Math.PI / 2); //rotate方法旋转当前的绘图
                this.ctx.fillText(text, -this.ctx.measureText(text).width / 2, 0); //measureText()方法返回包含一个对象，该对象包含以像素计的指定字体宽度
                this.ctx.restore(); //把当前画布返回（调整）到上一个save()状态之前 
                //----绘制奖品结束----
            }
        }
    }

    //旋转转盘  angles：角度; item：奖品位置; txt：提示语;
    rotateFn(item, angles, txt) {
        this._lottery.isLock = !this._lottery.isLock;
        //alert(this._lottery.isLock);
        //alert(this.$lottery.length);
        this.$lottery.stopRotate();
        this.$lottery.rotate({
            angle: 0,
            animateTo: angles + 1800,
            duration: 8000,
            callback: () => {
                //setCookie('LOTTERY_TOTAL_NUM', total_num, 24); //记录剩余次数
                //$modal.hide();
                this.drawLottery(item); //中奖后改变背景颜色
                //if(item == 3 || item == 7){
                //	$popover.show().find('.m4').show();
                //}else{
                //	$popover.show().find('.m5').show().find('font').text(txt);
                //	record_log(txt); //插入我的中奖纪录
                //}
                //changeNum(total_num);//更改抽奖次数
                this._lottery.isLock = !this._lottery.isLock;
                alert('抽奖完成' + this._lottery.isLock)
            }
        });
    }

    //随机数
    rnd(n, m) {
        return Math.floor(Math.random() * (m - n + 1) + n);
    }

    //开始抽奖
    lottery() {
        //alert(0)
        this.$lottery = $('#lotterys');
        if (this._lottery.isLock) {
            //showToast('心急吃不了热豆腐哦'); 
            alert('心急吃不了热豆腐哦');
            return;
        }
        //$modal.hide();
        //if (total_num <= 0) {//判断当天抽奖次数
        //    $popover.show().find('.m3').show();
        //    total_num = 0;
        //} else {
            //alert(1)
        let angels = [247, 202, 157, 112, 67, 22, 337, 292]; //对应角度
        this.drawLottery();
        //let item = this.rnd(0, 7);
        let item = 2;
        this.rotateFn(item, angels[item], this._lottery.title[item]);
        //alert(2)
        //total_num--;
        //}
    }
}