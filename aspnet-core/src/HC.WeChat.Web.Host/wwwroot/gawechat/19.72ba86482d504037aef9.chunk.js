webpackJsonp([19],{"53L5":function(l,n,t){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var i=t("WT6e"),e=t("bfOx"),u=t("TToO"),a=t("XuoP"),o=t("1zMq"),c=t("fwo/"),s=t("lJU6"),r=t("OE0E"),_=function(l){function n(n,t,i,e,u,o){var s=l.call(this,n)||this;return s.router=t,s.sanitizer=i,s.articleService=e,s.srv=u,s.wxService=o,s.activityList=[],s.statisticalDetail=new a.s,s.pageModel=new a.m,s.hostUrl=c.a.remoteServiceBaseUrl,s}return Object(u.b)(n,l),n.prototype.ngOnInit=function(){this.pageModel.isLast=!1,this.GetPagedArticles()},n.prototype.onLoadMore=function(l){this.pageModel.pageIndex++,this.pageModel.isLast?l.setFinished():(this.GetPagedArticles(),l.resolveLoading())},n.prototype.GetPagedArticles=function(){var l=this,n={};this.settingsService.tenantId&&(n.tenantId=this.settingsService.tenantId),n.pageIndex=this.pageModel.pageIndex,n.pageSize=this.pageModel.pageSize;var t=new RegExp("&ldquo;","g"),i=new RegExp("&rdquo;","g");this.articleService.GetPagedArticles(n).subscribe(function(n){var e;n.filter(function(l){l.content=l.content.replace(/<\/?[^>]*>/g,"").replace(t,"").replace(i,"")}),(e=l.activityList).push.apply(e,n),n&&n.length<l.pageModel.pageSize&&(l.pageModel.isLast=!0)})},n.prototype.goDetailActivity=function(l,n,t){var i=this;1==n?(this.statisticalDetail.articleId=l,this.statisticalDetail.type=1,this.statisticalDetail.openId=this.settingsService.openId,this.articleService.AddStatisticalAsync(this.statisticalDetail).subscribe(function(n){n&&0===n.code?i.router.navigate(["/activities/activity-detail",{id:l}]):i.srv.warn("\u8bf7\u91cd\u8bd5")})):location.href=t},n}(o.a),d=(t("HUv8"),function(l){function n(n,t,i,e,u,o){var c=l.call(this,n)||this;return c.router=t,c.articleService=i,c.srv=e,c.route=u,c.sanitizer=o,c.activity=new a.b,c.id=c.route.snapshot.params.id,c.statisticalDetail=new a.s,c.isGood=!1,c}return Object(u.b)(n,l),n.prototype.ngOnInit=function(){var l=this,n={id:this.id};this.settingsService.tenantId&&(n.tenantId=this.settingsService.tenantId),this.articleService.GetArticleById(n).subscribe(function(n){var t=n.content.indexOf("<body>")+"<body>".length,i=n.content.indexOf("</body>");n.content=n.content.substring(t,i).replace(/gawechat\//g,""),l.activity=n}),this.GetIsGoodAsync()},n.prototype.assembleHTML=function(l){return this.sanitizer.bypassSecurityTrustHtml(l)},n.prototype.GetIsGoodAsync=function(){var l=this,n={id:this.id};this.settingsService.tenantId&&(n.tenantId=this.settingsService.tenantId),n.openId=this.settingsService.openId,n.articleId=this.id,this.articleService.GetIsGoodAsync(n).subscribe(function(n){l.isGood=n})},n.prototype.addGood=function(){var l=this;this.statisticalDetail.articleId=this.id,this.statisticalDetail.type=2,this.statisticalDetail.openId=this.settingsService.openId,this.isGood||(this.isGood=!0,this.activity.goodTotal++),this.articleService.AddGoodAsync(this.statisticalDetail).subscribe(function(n){n&&0===n.code||(l.isGood=!1,l.activity.goodTotal--,l.srv.warn("\u8bf7\u91cd\u8bd5"))})},n}(o.a)),p=function(){},g=t("zRte"),v=t("HLxZ"),h=t("4nAk"),f=t("5EGS"),y=t("N8zv"),m=t("2Ii2"),b=t("k3g3"),x=t("3pCT"),w=t("c8+x"),I=t("HHg/"),M=t("1fry"),S=t("liB5"),k=t("XyN0"),G=t("RcBv"),A=t("JtMk"),T=t("gHyN"),L=t("XnYQ"),j=t("xMMZ"),z=t("8aZ+"),D=t("2Ixu"),H=t("Xjw4"),J=t("zZ88"),O=t("Z52J"),B=t("AqMN"),Z=t("vCwQ"),q=t("m2JH"),E=t("2rMK"),F=i._1({encapsulation:2,styles:[[".swiper-slide{width:100%;height:200px;line-height:200px;text-align:center;background:#93ff93}.weui-media-box_appmsg .weui-media-box__thumb{width:100%;height:100%;vertical-align:top}.weui-cell_img{width:60px;height:60px;background:center center/cover no-repeat;position:relative;margin-right:10px}.weui-media-box_appmsg{padding-top:7px;padding-bottom:7px}"]],data:{}});function P(l){return i._27(0,[(l()(),i._3(0,0,null,null,1,"weui-loadmore",[["type","line"]],null,null,null,f.c,f.b)),i._2(1,49152,null,0,z.a,[D.a],{type:[0,"type"]},null)],function(l,n){l(n,1,0,"line")},null)}function Y(l){return i._27(0,[(l()(),i._3(0,0,null,null,21,"a",[["class","weui-media-box weui-media-box_appmsg"],["href","javascript:void(0);"]],null,[[null,"click"]],function(l,n,t){var i=!0;return"click"===n&&(i=!1!==l.component.goDetailActivity(l.context.$implicit.id,l.context.$implicit.linkType,l.context.$implicit.linkAddress)&&i),i},null,null)),(l()(),i._25(-1,null,["\n                    "])),(l()(),i._25(-1,null,["\n                    "])),(l()(),i._3(3,0,null,null,3,"div",[["class","weui-media-box__hd weui-cell_img"]],null,null,null,null,null)),i._2(4,278528,null,0,H.p,[i.r,i.k,i.B],{ngStyle:[0,"ngStyle"]},null),i._19(5,{"background-image":0}),(l()(),i._25(-1,null,["\n                    "])),(l()(),i._25(-1,null,["\n                    "])),(l()(),i._25(-1,null,["\n                    "])),(l()(),i._3(9,0,null,null,7,"div",[["class","weui-media-box__bd"]],null,null,null,null,null)),(l()(),i._25(-1,null,["\n                        "])),(l()(),i._3(11,0,null,null,1,"h4",[["class","weui-media-box__title"]],null,null,null,null,null)),(l()(),i._25(12,null,["",""])),(l()(),i._25(-1,null,["\n                        "])),(l()(),i._3(14,0,null,null,1,"p",[["class","weui-media-box__desc"]],null,null,null,null,null)),(l()(),i._25(15,null,["",""])),(l()(),i._25(-1,null,["\n                    "])),(l()(),i._25(-1,null,["\n                    "])),(l()(),i._3(18,0,null,null,2,"div",[["class","weui-media-box__ft"],["style","font-size: 14px;"]],null,null,null,null,null)),(l()(),i._25(19,null,["\n                        ","\n                    "])),i._20(20,2),(l()(),i._25(-1,null,["\n                "]))],function(l,n){l(n,4,0,l(n,5,0,"url("+n.component.hostUrl+n.context.$implicit.coverPhoto+")"))},function(l,n){l(n,12,0,n.context.$implicit.title),l(n,15,0,n.context.$implicit.content),l(n,19,0,i._26(n,19,0,l(n,20,0,i._15(n.parent,0),n.context.$implicit.pushTime,"yyyy-MM-dd")))})}function R(l){return i._27(0,[i._18(0,H.e,[i.s]),i._23(402653184,1,{il:0}),(l()(),i._3(2,0,null,null,29,"Page",[["class","page"]],null,null,null,j.c,j.b)),i._2(3,278528,null,0,H.k,[i.q,i.r,i.k,i.B],{ngClass:[0,"ngClass"]},null),i._2(4,49152,null,0,J.a,[],{title:[0,"title"],spacing:[1,"spacing"],showTitle:[2,"showTitle"]},null),(l()(),i._25(-1,0,["\n    "])),(l()(),i._25(-1,0,["\n    "])),(l()(),i._3(7,0,null,0,22,"div",[["class","weui-panel weui-panel_access"]],null,null,null,null,null)),(l()(),i._25(-1,null,["\n        "])),(l()(),i._3(9,0,null,null,6,"div",[["class","weui-cell"],["style"," padding-bottom: 0px; padding-top: 0px; padding-left: 0px; padding-right: 0px;"]],null,null,null,null,null)),(l()(),i._25(-1,null,["\n            "])),(l()(),i._3(11,0,null,null,3,"div",[["style","text-align: center; width: 100%;"]],null,null,null,null,null)),(l()(),i._25(-1,null,["\n                "])),(l()(),i._3(13,0,null,null,0,"img",[["src","assets/images/activity/activitybanner.jpg"],["style","width:100%;"]],null,null,null,null,null)),(l()(),i._25(-1,null,["\n            "])),(l()(),i._25(-1,null,["\n        "])),(l()(),i._25(-1,null,["\n        "])),(l()(),i._3(17,0,null,null,11,"div",[["class","weui-panel__bd"]],null,null,null,null,null)),(l()(),i._25(-1,null,["\n            "])),(l()(),i.Y(16777216,null,null,1,null,P)),i._2(20,16384,null,0,H.m,[i.M,i.J],{ngIf:[0,"ngIf"]},null),(l()(),i._25(-1,null,["\n            "])),(l()(),i._3(22,0,null,null,5,"weui-infiniteloader",[["class","inf"]],[[2,"weui-infiniteloader",null],[4,"height",null]],[[null,"loadmore"]],function(l,n,t){var i=!0;return"loadmore"===n&&(i=!1!==l.component.onLoadMore(t)&&i),i},T.c,T.b)),i._2(23,770048,[[1,4],["comp",4]],0,O.a,[i.k,i.x,B.a],null,{loadmore:"loadmore"}),(l()(),i._25(-1,0,["\n                "])),(l()(),i.Y(16777216,null,0,1,null,Y)),i._2(26,802816,null,0,H.l,[i.M,i.J,i.q],{ngForOf:[0,"ngForOf"]},null),(l()(),i._25(-1,0,["\n            "])),(l()(),i._25(-1,null,["\n        "])),(l()(),i._25(-1,null,["\n    "])),(l()(),i._25(-1,0,["\n    "])),(l()(),i._25(-1,0,["\n"]))],function(l,n){var t=n.component;l(n,3,0,"Scan"),l(n,4,0,"\u8425\u9500\u6d3b\u52a8",!1,!1),l(n,20,0,!t.activityList||0==t.activityList.length),l(n,23,0),l(n,26,0,t.activityList)},function(l,n){l(n,22,0,!0,i._15(n,23).config.height)})}var $=i.Z("activity",_,function(l){return i._27(0,[(l()(),i._3(0,0,null,null,1,"activity",[],null,null,null,R,F)),i._2(1,114688,null,0,_,[i.p,e.k,r.c,Z.a,q.a,E.a],null,null)],function(l,n){l(n,1,0)},null)},{},{},[]),C=i._1({encapsulation:2,styles:[[".read{padding-left:10px;color:#999;font-size:13px}.good{padding-right:10px;color:#999;font-size:13px}body,html{overflow:auto}"]],data:{}});function N(l){return i._27(0,[(l()(),i._3(0,0,null,null,1,"weui-loadmore",[["type","line"]],null,null,null,f.c,f.b)),i._2(1,49152,null,0,z.a,[D.a],{type:[0,"type"]},null)],function(l,n){l(n,1,0,"line")},null)}function X(l){return i._27(0,[(l()(),i._3(0,0,null,null,0,"div",[],[[8,"innerHTML",1]],null,null,null,null))],null,function(l,n){var t=n.component;l(n,0,0,t.assembleHTML(t.activity.content))})}function Q(l){return i._27(0,[(l()(),i._3(0,0,null,null,3,"div",[["class","placeholder good"]],null,null,null,null,null)),(l()(),i._25(-1,null,["\n        "])),(l()(),i._3(2,0,null,null,0,"img",[["alt",""],["src","assets/images/activity/heartFalse.png"],["style","width:16px;"]],null,[[null,"click"]],function(l,n,t){var i=!0;return"click"===n&&(i=!1!==l.component.addGood()&&i),i},null,null)),(l()(),i._25(3,null,[" ","\n    "]))],null,function(l,n){l(n,3,0,n.component.activity.goodTotal)})}function U(l){return i._27(0,[(l()(),i._3(0,0,null,null,3,"div",[["class","placeholder good"]],null,null,null,null,null)),(l()(),i._25(-1,null,["\n        "])),(l()(),i._3(2,0,null,null,0,"img",[["alt",""],["src","assets/images/activity/heartTrue.png"],["style","width:16px;"]],null,[[null,"click"]],function(l,n,t){var i=!0;return"click"===n&&(i=!1!==l.component.addGood()&&i),i},null,null)),(l()(),i._25(3,null,[" ","\n    "]))],null,function(l,n){l(n,3,0,n.component.activity.goodTotal)})}function K(l){return i._27(0,[(l()(),i.Y(16777216,null,null,1,null,N)),i._2(1,16384,null,0,H.m,[i.M,i.J],{ngIf:[0,"ngIf"]},null),(l()(),i._25(-1,null,["\n"])),(l()(),i.Y(16777216,null,null,1,null,X)),i._2(4,16384,null,0,H.m,[i.M,i.J],{ngIf:[0,"ngIf"]},null),(l()(),i._25(-1,null,["\n"])),(l()(),i._3(6,0,null,null,0,"br",[],null,null,null,null,null)),(l()(),i._25(-1,null,["\n"])),(l()(),i._3(8,0,null,null,13,"div",[["class","weui-flex"]],null,null,null,null,null)),(l()(),i._25(-1,null,["\n    "])),(l()(),i._3(10,0,null,null,4,"div",[["class","weui-flex__item"]],null,null,null,null,null)),(l()(),i._25(-1,null,["\n        "])),(l()(),i._3(12,0,null,null,1,"div",[["class","placeholder read"]],null,null,null,null,null)),(l()(),i._25(13,null,["\u9605\u8bfb ",""])),(l()(),i._25(-1,null,["\n    "])),(l()(),i._25(-1,null,["\n    "])),(l()(),i.Y(16777216,null,null,1,null,Q)),i._2(17,16384,null,0,H.m,[i.M,i.J],{ngIf:[0,"ngIf"]},null),(l()(),i._25(-1,null,["\n    "])),(l()(),i.Y(16777216,null,null,1,null,U)),i._2(20,16384,null,0,H.m,[i.M,i.J],{ngIf:[0,"ngIf"]},null),(l()(),i._25(-1,null,["\n"])),(l()(),i._25(-1,null,["\n"])),(l()(),i._3(23,0,null,null,0,"br",[],null,null,null,null,null)),(l()(),i._25(-1,null,["\n"])),(l()(),i._3(25,0,null,null,4,"div",[["class","weui-footer"]],null,null,null,null,null)),(l()(),i._25(-1,null,["\n    "])),(l()(),i._3(27,0,null,null,1,"p",[["class","weui-footer__text"]],null,null,null,null,null)),(l()(),i._25(-1,null,["\u5e7f\u5b89\u70df\u8349 | \u6e20\u6c5f\u70df\u8bed"])),(l()(),i._25(-1,null,["\n"]))],function(l,n){var t=n.component;l(n,1,0,!t.activity),l(n,4,0,t.activity.content),l(n,17,0,!t.isGood),l(n,20,0,t.isGood)},function(l,n){l(n,13,0,n.component.activity.readTotal)})}var V=i.Z("activity-detail",d,function(l){return i._27(0,[(l()(),i._3(0,0,null,null,1,"activity-detail",[],null,null,null,K,C)),i._2(1,114688,null,0,d,[i.p,e.k,Z.a,q.a,e.a,r.c],null,null)],function(l,n){l(n,1,0)},null)},{},{},[]),W=t("7DMc"),ll=t("xyZK"),nl=t("qC7z"),tl=t("d8Ej"),il=t("h6Rc"),el=t("XgZR"),ul=t("HHj+"),al=t("0QD/"),ol=t("21kB"),cl=t("8pYL"),sl=t("0ZqF"),rl=t("F8WR"),_l=t("ezcZ"),dl=t("rIFS"),pl=t("400F"),gl=t("8LA8"),vl=t("btaA"),hl=t("IdTk"),fl=t("K/46"),yl=t("YacR"),ml=t("edgN"),bl=t("25dH"),xl=t("HilQ"),wl=t("kdoh"),Il=t("jB/K"),Ml=t("gjV/"),Sl=t("eP9+"),kl=t("Bz7m"),Gl=t("Jvmt"),Al=t("++5p"),Tl=t("07TD"),Ll=t("4EnL"),jl=t("2vjx"),zl=t("ruLn"),Dl=t("Xis0"),Hl=t("VVDC"),Jl=t("4BBW"),Ol=t("fAE3"),Bl=t("oEHv"),Zl=t("QoVb");t.d(n,"ActivitiesModuleNgFactory",function(){return ql});var ql=i._0(p,[],function(l){return i._11([i._12(512,i.j,i.W,[[8,[g.a,v.a,h.a,f.a,y.a,m.a,b.a,x.a,w.a,I.a,M.b,S.b,k.b,G.a,A.a,T.a,L.a,j.a,$,V]],[3,i.j],i.v]),i._12(4608,H.o,H.n,[i.s,[2,H.w]]),i._12(4608,W.v,W.v,[]),i._12(4608,W.e,W.e,[]),i._12(4608,ll.a,ll.a,[i.j,i.g,i.p]),i._12(4608,nl.a,nl.a,[i.j,i.g,i.p]),i._12(4608,tl.a,tl.a,[i.j,i.g,i.p]),i._12(4608,il.a,il.a,[i.j,i.g,i.p]),i._12(4608,q.a,q.a,[i.j,i.g,i.p]),i._12(4608,el.a,el.a,[]),i._12(4608,ul.a,ul.a,[]),i._12(4608,al.a,al.a,[r.b]),i._12(4608,E.a,E.a,[al.a]),i._12(4608,ol.a,ol.a,[]),i._12(4608,Z.a,Z.a,[cl.a]),i._12(512,H.c,H.c,[]),i._12(512,W.t,W.t,[]),i._12(512,W.f,W.f,[]),i._12(512,e.n,e.n,[[2,e.s],[2,e.k]]),i._12(512,W.q,W.q,[]),i._12(512,sl.a,sl.a,[]),i._12(512,rl.a,rl.a,[]),i._12(512,_l.a,_l.a,[]),i._12(512,dl.a,dl.a,[]),i._12(512,pl.a,pl.a,[]),i._12(512,gl.a,gl.a,[]),i._12(512,vl.a,vl.a,[]),i._12(512,hl.a,hl.a,[]),i._12(512,fl.a,fl.a,[]),i._12(512,yl.a,yl.a,[]),i._12(512,ml.a,ml.a,[]),i._12(512,bl.a,bl.a,[]),i._12(512,xl.a,xl.a,[]),i._12(512,wl.a,wl.a,[]),i._12(512,Il.a,Il.a,[]),i._12(512,Ml.a,Ml.a,[]),i._12(512,Sl.a,Sl.a,[]),i._12(512,kl.a,kl.a,[]),i._12(512,Gl.a,Gl.a,[]),i._12(512,Al.a,Al.a,[]),i._12(512,Tl.a,Tl.a,[]),i._12(512,Ll.a,Ll.a,[]),i._12(512,jl.a,jl.a,[]),i._12(512,zl.a,zl.a,[]),i._12(512,Dl.a,Dl.a,[]),i._12(512,Hl.a,Hl.a,[]),i._12(512,Jl.a,Jl.a,[]),i._12(512,s.b,s.b,[]),i._12(512,Ol.a,Ol.a,[]),i._12(512,Bl.a,Bl.a,[]),i._12(512,Zl.a,Zl.a,[]),i._12(512,p,p,[]),i._12(1024,e.i,function(){return[[{path:"",redirectTo:"activity"},{path:"activity",component:_},{path:"activity-detail",component:d}]]},[])])})}});