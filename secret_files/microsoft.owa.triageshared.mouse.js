﻿try { window.scriptsLoaded = window.scriptsLoaded || {}; window.scriptProcessStart = window.scriptProcessStart || {}; window.scriptProcessStart['microsoft.owa.triageshared.mouse.js'] = (new Date()).getTime();
Type.registerNamespace("_trs");_trs.b=function(n,t,i,r,u,f,e,o){this.w=Function.createDelegate(this,this.G);this.z=Function.createDelegate(this,this.E);_trs.b.initializeBase(this,[t]);this.A=n;this.l=i;this.q(u);this.x(f);this.m(e);this.n=r;var s=this;this.p(new _j.v(this.z,this.n.h,this.n,"CanExecute",function(){return s.n.b}));this.e=o;this.y();this.C()};_trs.b.prototype={A:null,n:null,e:null,i:null,u:null,a:function(){return this.e},c:function(){return this.u},x:function(n){if(this.u!==n){this.u=n;this.bs("HoverImage")}return n},d:function(){switch(this.l){case 5:this.e.r(this.k.bF());break;case 6:this.e.r(!0);break;default:break}},G:function(n,t){switch(this.l){case 5:this.m(this.k.V());this.q(this.k.U());this.x(this.k.T());this.e.c(this.k.o());this.e.j(this.k.o().q());break;case 3:var i=this.k;this.m(i.a());this.q(i.d());this.x(i.c());break;case 4:this.m(this.k.A());break;case 6:case 2:case 1:case 0:break}},bt:function(){this.i&&this.k.rpcl(this.i,this.w);var t;_a.h.a(t={val:this.e}),this.e=t.val;var n;_a.h.a(n={val:this.n}),this.n=n.val;_y.hP.prototype.bt.call(this)},E:function(){this.F();this.n.a();this.D()},D:function(){switch(this.l){case 6:var t=this.k;var n=t.g();if(n){this.e.c(n);this.e.j(!0)}break}},C:function(){switch(this.l){case 5:this.i=_ta.a.a;break;case 3:this.i=_ta.a.c;break;case 4:this.i=_ta.a.b;break;default:this.i=null;break}this.i&&this.k.apcl(this.i,this.w)},F:function(){var n="";switch(this.l){case 1:n="HoverDelete";break;case 2:n="HoverArchive";break;case 4:n="HoverReadUnread";break;case 3:n="HoverPinUnpin";break;case 5:n="HoverFlagUnflag";break;case 6:n="HoverMove";break}_h.l.a(_a.a.ba,n,2,1,null)}};_trs.d=function(n,t){_trs.d.initializeBase(this,[n]);this.a=!!t&&t.a().bk().Enabled};_trs.d.prototype={a:!1,I:function(){_fce.e.prototype.I.call(this);var n=this.W().a();if(n){n.bl(this);this.W().d()}}};_trs.e=function(){};_trs.e.load=function(){var i="HoverActionBarView.Mouse._tid1._tid2";new _j.d(i,function(){_trs.a.a[i]===undefined&&(_trs.a.a[i]=[[[-1,4,null,null,null,"ActionSource",null,_trs.a.g,0,null,null,null,"HV"],[-1,1,["IsSuperTriageFourEnabled"],[_trs.a.e],null,"ShouldStopPropagationOnLeftMouseDown",null,_trs.a.m,0,_trs.a.d(),null,!1],[-1,1,["IsSuperTriageFourEnabled"],[_trs.a.e],null,"ShouldStopPropagationOnLeftMouseClick",null,_trs.a.l,0,null,null,!1],[-1,0,["IsEnabled"],[_trs.a.u],null,"IsHidden",null,_trs.a.o,1,_trs.a.d(),null,!0],[-1,0,["Image"],[_trs.a.t],null,"ImageId",null,_trs.a.k,1,null,null,null],[-1,0,["HoverImage"],[_trs.a.r],null,"HoveredImageId",null,_trs.a.j,1,null,null,null],[-1,0,["ClickCommand"],[_trs.a.s],null,"ClickCommand",null,_trs.a.h,1,null,null,null],[-1,0,["Text"],[_trs.a.v],null,"Title",null,_trs.a.p,1,null,null,null]]]);var t=_trs.a.b.childNodes[0].cloneNode(!0);var n=new _fc.b(t.children[0]);n.bp=!0;n.A(-1);return new _j.a(t,[n])},"",_y.fN,_trs.d,function(n){return new _trs.d(n,_j.b.Instance.a(_a.f))},!1,!0,!1,0,_trs.a.a);var t="HoverActionBarView.Mouse._tid1";new _j.d(t,function(){_trs.a.a[t]===undefined&&(_trs.a.a[t]=[null]);var i=_trs.a.b.childNodes[1].cloneNode(!0);var n=new _fce.d(i.children[0]);return new _j.a(i,[n]).l({ListPanel:n})},"",_y.ei,_fce.a,function(n){return new _fce.a(n,_j.b.Instance.a(_ff.a))},!1,!0,!1,0,_trs.a.a);var n="HoverActionBarView.Mouse";new _j.d(n,function(){_trs.a.a[n]===undefined&&(_trs.a.a[n]=[[[-1,0,["OnHoverActions"],[_trs.a.q],null,"DataSource",null,_trs.a.n,1,null,null,null]]]);var i=_trs.a.b.childNodes[3].cloneNode(!0);var t=new _fce.a(i.children[0],_j.b.Instance.a(_ff.a));t.x(function(){var t=_trs.a.b.childNodes[2].cloneNode(!0).childNodes[0];var n=new _trs.d(t,_j.b.Instance.a(_a.f));n.y("HoverActionBarView.Mouse._tid1._tid2");return n});t.y("HoverActionBarView.Mouse._tid1");return new _j.a(i,[t])},"",_y.ei,_j.c,function(n){return new _j.c(n)},!1,!1,!1,0,_trs.a.a)};_trs.b.registerClass("_trs.b",_y.hP,_y.fN,_y.hL);_trs.d.registerClass("_trs.d",_fce.e);_trs.e.load();
window.scriptsLoaded['microsoft.owa.triageshared.mouse.js'] = 1; window.scriptProcessEnd = window.scriptProcessEnd || {}; window.scriptProcessEnd['microsoft.owa.triageshared.mouse.js'] = (new Date()).getTime(); } catch(e) { window.owaLastErrorReported = e; throw e; }