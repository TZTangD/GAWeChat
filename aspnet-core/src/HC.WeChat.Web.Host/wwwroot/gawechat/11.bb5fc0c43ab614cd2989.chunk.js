webpackJsonp([11],{tJ0U:function(l,n,u){"use strict";Object.defineProperty(n,"__esModule",{value:!0});var t=u("WT6e"),e=u("bfOx"),a=u("TToO"),i=u("1zMq"),o=(u("seLH"),u("fwo/")),c=function(l){function n(n,u,t,e){var a=l.call(this,n)||this;return a.wxService=u,a.router=t,a.shopService=e,a.myaddress="\u5b9a\u4f4d\u4e2d....",a.options={complete:function(l){a.myaddress=l.detail.detail},error:function(){a.myaddress="\u5b9a\u4f4d\u5931\u8d25"}},a.shops=[],a.hostUrl=o.a.remoteServiceBaseUrl,a}return Object(a.b)(n,l),n.prototype.ngOnInit=function(){var l=this;this.citylocation=new qq.maps.CityService(this.options),this.wxService.get().then(function(n){if(n){var u=encodeURIComponent(location.href.split("#")[0]);l.settingsService.getJsApiConfig(u).subscribe(function(n){n&&(n.jsApiList=["openLocation","getLocation"],wx.config(n.toJSON()),l.wxReady().then(function(n){n&&l.wxGetLocation()}),wx.error(function(){}))})}else console.warn("weixin\u6216qq map js\u52a0\u8f7d\u5931\u8d25")})},n.prototype.wxReady=function(){return new Promise(function(l,n){wx.ready(function(){l(!0)})})},n.prototype.getWXLocation=function(){var l=this;return new Promise(function(n,u){l.wxService.getLocation().then(function(u){l.gpslat=u.latitude,l.gpslong=u.longitude,l.wxService.translate(u.latitude,u.longitude).then(function(l){n(l)})})})},n.prototype.wxGetLocation=function(){var l=this;this.myaddress="\u5b9a\u4f4d\u4e2d....",this.getWXLocation().then(function(n){n&&n.length>0&&(l.latitude=n[0].lat,l.longitude=n[0].lng,l.getlocation(),l.getShops())})},n.prototype.getlocation=function(){var l=new qq.maps.LatLng(this.latitude,this.longitude);this.citylocation.searchCityByLatLng(l)},n.prototype.getShops=function(){var l=this;this.shopService.GetNearbyShopByLocationAsync({latitude:this.gpslat,longitude:this.gpslong,openId:this.settingsService.openId,tenantId:this.settingsService.tenantId}).subscribe(function(n){l.shops=n})},n.prototype.goShop=function(l){this.router.navigate(["/shops/shop",{shopId:l}])},n}(i.a),s=function(){},_=u("zRte"),r=u("HLxZ"),p=u("4nAk"),g=u("5EGS"),h=u("N8zv"),d=u("2Ii2"),f=u("k3g3"),w=u("3pCT"),y=u("c8+x"),v=u("HHg/"),m=u("1fry"),x=u("liB5"),b=u("XyN0"),S=u("RcBv"),L=u("JtMk"),k=u("gHyN"),j=u("XnYQ"),I=u("xMMZ"),B=u("Xjw4"),q=u("8aZ+"),H=u("2Ixu"),J=u("zZ88"),M=u("2rMK"),z=u("rz4f"),C=t._1({encapsulation:2,styles:[[".weui-cell_img{width:60px;height:60px;background:center center/cover no-repeat;position:relative;margin-right:10px}"]],data:{}});function O(l){return t._27(0,[(l()(),t._3(0,0,null,null,20,"a",[["class","weui-cell weui-cell_access"]],null,[[null,"click"]],function(l,n,u){var t=!0;return"click"===n&&(t=!1!==l.component.goShop(l.context.$implicit.id)&&t),t},null,null)),(l()(),t._25(-1,null,["\n            "])),(l()(),t._3(2,0,null,null,3,"div",[["class","weui-cell__hd weui-cell_img"]],null,null,null,null,null)),t._2(3,278528,null,0,B.p,[t.r,t.k,t.B],{ngStyle:[0,"ngStyle"]},null),t._19(4,{"background-image":0}),(l()(),t._25(-1,null,["\n            "])),(l()(),t._25(-1,null,["\n            "])),(l()(),t._3(7,0,null,null,9,"div",[["class","weui-cell__bd"]],null,null,null,null,null)),(l()(),t._25(-1,null,["\n                "])),(l()(),t._3(9,0,null,null,1,"p",[],null,null,null,null,null)),(l()(),t._25(10,null,["",""])),(l()(),t._25(-1,null,["\n                "])),(l()(),t._3(12,0,null,null,3,"p",[["style","font-size: 13px;color: #888888;"]],null,null,null,null,null)),(l()(),t._25(13,null,["\u5730\u5740\uff1a",""])),(l()(),t._3(14,0,null,null,0,"br",[],null,null,null,null,null)),(l()(),t._25(15,null,["\u7535\u8bdd\uff1a",""])),(l()(),t._25(-1,null,["\n            "])),(l()(),t._25(-1,null,["\n            "])),(l()(),t._3(18,0,null,null,1,"div",[["class","weui-cell__ft"]],null,null,null,null,null)),(l()(),t._25(19,null,["\n                ","\u7c73\n            "])),(l()(),t._25(-1,null,["\n        "]))],function(l,n){l(n,3,0,l(n,4,0,"url("+n.component.hostUrl+n.context.$implicit.coverPhoto+")"))},function(l,n){l(n,10,0,n.context.$implicit.name),l(n,13,0,n.context.$implicit.address),l(n,15,0,n.context.$implicit.tel),l(n,19,0,n.context.$implicit.distance)})}function R(l){return t._27(0,[(l()(),t._3(0,0,null,null,4,"div",[["class","weui-cells"]],null,null,null,null,null)),(l()(),t._25(-1,null,["\n        "])),(l()(),t.Y(16777216,null,null,1,null,O)),t._2(3,802816,null,0,B.l,[t.M,t.J,t.q],{ngForOf:[0,"ngForOf"]},null),(l()(),t._25(-1,null,["\n    "]))],function(l,n){l(n,3,0,n.component.shops)},null)}function Z(l){return t._27(0,[(l()(),t._3(0,0,null,null,1,"weui-loadmore",[["type","line"]],null,null,null,g.c,g.b)),t._2(1,49152,null,0,q.a,[H.a],{type:[0,"type"]},null)],function(l,n){l(n,1,0,"line")},null)}function N(l){return t._27(0,[(l()(),t._3(0,0,null,null,40,"Page",[["class","page"]],null,null,null,I.c,I.b)),t._2(1,278528,null,0,B.k,[t.q,t.r,t.k,t.B],{ngClass:[0,"ngClass"]},null),t._2(2,49152,null,0,J.a,[],{spacing:[0,"spacing"],ftBottom:[1,"ftBottom"],showTitle:[2,"showTitle"]},null),(l()(),t._25(-1,0,["\n    "])),(l()(),t._3(4,0,null,0,26,"div",[["class","weui-cells"],["style","margin-top: 0px;"]],null,null,null,null,null)),(l()(),t._25(-1,null,["\n        "])),(l()(),t._3(6,0,null,null,6,"div",[["class","weui-cell"],["style"," padding: 0px;"]],null,null,null,null,null)),(l()(),t._25(-1,null,["\n            "])),(l()(),t._3(8,0,null,null,3,"div",[["style","text-align: center; width: 100%;"]],null,null,null,null,null)),(l()(),t._25(-1,null,["\n                "])),(l()(),t._3(10,0,null,null,0,"img",[["src","./assets/images/shop/shop.jpg"],["style","width:100%;"]],null,null,null,null,null)),(l()(),t._25(-1,null,["\n            "])),(l()(),t._25(-1,null,["\n        "])),(l()(),t._25(-1,null,["\n        "])),(l()(),t._3(14,0,null,null,15,"div",[["class","weui-cell"],["style","font-size: 14px;"]],null,null,null,null,null)),(l()(),t._25(-1,null,["\n            "])),(l()(),t._3(16,0,null,null,3,"div",[["class","weui-cell__hd"]],null,null,null,null,null)),(l()(),t._25(-1,null,["\n                "])),(l()(),t._3(18,0,null,null,0,"img",[["alt",""],["src","./assets/images/shop/map-3-o.png"],["style","width:24px;margin-right:5px;display:block"]],null,null,null,null,null)),(l()(),t._25(-1,null,["\n            "])),(l()(),t._25(-1,null,["\n            "])),(l()(),t._3(21,0,null,null,4,"div",[["class","weui-cell__bd weui-cell_primary"]],null,null,null,null,null)),(l()(),t._25(-1,null,["\n                "])),(l()(),t._3(23,0,null,null,1,"p",[],null,null,null,null,null)),(l()(),t._25(24,null,["",""])),(l()(),t._25(-1,null,["\n            "])),(l()(),t._25(-1,null,["\n            "])),(l()(),t._3(27,0,null,null,1,"a",[["class","weui-cell__ft weui-cell_access"],["style","color: cornflowerblue"]],null,[[null,"click"]],function(l,n,u){var t=!0;return"click"===n&&(t=!1!==l.component.wxGetLocation()&&t),t},null,null)),(l()(),t._25(-1,null,["\n               \u91cd\u65b0\u5b9a\u4f4d\n            "])),(l()(),t._25(-1,null,["\n        "])),(l()(),t._25(-1,null,["\n    "])),(l()(),t._25(-1,0,["\n    "])),(l()(),t._3(32,0,null,0,1,"div",[["class","weui-cells__title"]],null,null,null,null,null)),(l()(),t._25(-1,null,["\u53ea\u663e\u793a\u9644\u8fd13\u516c\u91cc\u4ee5\u5185\u7684\u5e97\u94fa"])),(l()(),t._25(-1,0,["\n    "])),(l()(),t.Y(16777216,null,0,1,null,R)),t._2(36,16384,null,0,B.m,[t.M,t.J],{ngIf:[0,"ngIf"]},null),(l()(),t._25(-1,0,["\n    "])),(l()(),t.Y(16777216,null,0,1,null,Z)),t._2(39,16384,null,0,B.m,[t.M,t.J],{ngIf:[0,"ngIf"]},null),(l()(),t._25(-1,0,["\n"]))],function(l,n){var u=n.component;l(n,1,0,"badge"),l(n,2,0,!1,!0,!1),l(n,36,0,u.shops&&u.shops.length>0),l(n,39,0,!u.shops||0==u.shops.length)},function(l,n){l(n,24,0,n.component.myaddress)})}var T=t.Z("wechat-nearby-shop",c,function(l){return t._27(0,[(l()(),t._3(0,0,null,null,1,"wechat-nearby-shop",[],null,null,null,N,C)),t._2(1,114688,null,0,c,[t.p,M.a,e.k,z.a],null,null)],function(l,n){l(n,1,0)},null)},{},{},[]),A=u("7DMc"),E=u("xyZK"),F=u("qC7z"),X=u("d8Ej"),P=u("h6Rc"),U=u("m2JH"),W=u("XgZR"),Y=u("HHj+"),$=u("0QD/"),G=u("OE0E"),D=u("21kB"),K=u("8pYL"),Q=u("0ZqF"),V=u("F8WR"),ll=u("ezcZ"),nl=u("rIFS"),ul=u("400F"),tl=u("8LA8"),el=u("btaA"),al=u("IdTk"),il=u("K/46"),ol=u("YacR"),cl=u("edgN"),sl=u("25dH"),_l=u("HilQ"),rl=u("kdoh"),pl=u("jB/K"),gl=u("gjV/"),hl=u("eP9+"),dl=u("Bz7m"),fl=u("Jvmt"),wl=u("++5p"),yl=u("07TD"),vl=u("4EnL"),ml=u("2vjx"),xl=u("ruLn"),bl=u("Xis0"),Sl=u("VVDC"),Ll=u("4BBW"),kl=u("lJU6"),jl=u("fAE3"),Il=u("oEHv"),Bl=u("QoVb");u.d(n,"NearbyShopModuleNgFactory",function(){return ql});var ql=t._0(s,[],function(l){return t._11([t._12(512,t.j,t.W,[[8,[_.a,r.a,p.a,g.a,h.a,d.a,f.a,w.a,y.a,v.a,m.b,x.b,b.b,S.a,L.a,k.a,j.a,I.a,T]],[3,t.j],t.v]),t._12(4608,B.o,B.n,[t.s,[2,B.w]]),t._12(4608,A.v,A.v,[]),t._12(4608,A.e,A.e,[]),t._12(4608,E.a,E.a,[t.j,t.g,t.p]),t._12(4608,F.a,F.a,[t.j,t.g,t.p]),t._12(4608,X.a,X.a,[t.j,t.g,t.p]),t._12(4608,P.a,P.a,[t.j,t.g,t.p]),t._12(4608,U.a,U.a,[t.j,t.g,t.p]),t._12(4608,W.a,W.a,[]),t._12(4608,Y.a,Y.a,[]),t._12(4608,$.a,$.a,[G.b]),t._12(4608,M.a,M.a,[$.a]),t._12(4608,D.a,D.a,[]),t._12(4608,z.a,z.a,[K.a]),t._12(512,B.c,B.c,[]),t._12(512,A.t,A.t,[]),t._12(512,A.f,A.f,[]),t._12(512,e.n,e.n,[[2,e.s],[2,e.k]]),t._12(512,A.q,A.q,[]),t._12(512,Q.a,Q.a,[]),t._12(512,V.a,V.a,[]),t._12(512,ll.a,ll.a,[]),t._12(512,nl.a,nl.a,[]),t._12(512,ul.a,ul.a,[]),t._12(512,tl.a,tl.a,[]),t._12(512,el.a,el.a,[]),t._12(512,al.a,al.a,[]),t._12(512,il.a,il.a,[]),t._12(512,ol.a,ol.a,[]),t._12(512,cl.a,cl.a,[]),t._12(512,sl.a,sl.a,[]),t._12(512,_l.a,_l.a,[]),t._12(512,rl.a,rl.a,[]),t._12(512,pl.a,pl.a,[]),t._12(512,gl.a,gl.a,[]),t._12(512,hl.a,hl.a,[]),t._12(512,dl.a,dl.a,[]),t._12(512,fl.a,fl.a,[]),t._12(512,wl.a,wl.a,[]),t._12(512,yl.a,yl.a,[]),t._12(512,vl.a,vl.a,[]),t._12(512,ml.a,ml.a,[]),t._12(512,xl.a,xl.a,[]),t._12(512,bl.a,bl.a,[]),t._12(512,Sl.a,Sl.a,[]),t._12(512,Ll.a,Ll.a,[]),t._12(512,kl.b,kl.b,[]),t._12(512,jl.a,jl.a,[]),t._12(512,Il.a,Il.a,[]),t._12(512,Bl.a,Bl.a,[]),t._12(512,s,s,[]),t._12(1024,e.i,function(){return[[{path:"nearby",component:c}]]},[])])})}});