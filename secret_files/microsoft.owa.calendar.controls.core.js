﻿try { window.scriptsLoaded = window.scriptsLoaded || {}; window.scriptProcessStart = window.scriptProcessStart || {}; window.scriptProcessStart['microsoft.owa.calendar.controls.core.js'] = (new Date()).getTime();
function CalendarControlsCoreComponent(){}CalendarControlsCoreComponent.$$cctor=function(){_a.u.a().a(CalendarControlsCoreComponent)};CalendarControlsCoreComponent.prototype={a:function(n,t,i){n.e(_ca.b).a()},b:function(){return null}};Type.registerNamespace("_ca");_ca.k=function(){};_ca.k.prototype={date:1,time:2,month:4};_ca.k.registerEnum("_ca.k",!1);_ca.b=function(){this.f=Function.createDelegate(this,this.j);this.d=_a.c.a();_ca.b.initializeBase(this)};_ca.b.prototype={a:null,c:0,i:function(n){this.ez("CalendarTimeChanged",n);++this.c==1&&this.h()},k:function(n){this.eA("CalendarTimeChanged",n);--this.c||this.g()},b:function(n){this.ez("CalendarDateChanged",n);++this.c==1&&this.h()},e:function(n){this.eA("CalendarDateChanged",n);--this.c||this.g()},h:function(){if(!this.a){this.d=_a.c.a();this.a=_j.n.a().e(_a.a.b,"CalendarDateTimeNotification",this.f,6e4)}},g:function(){this.a&&(this.a=_j.n.a().b(this.a))},j:function(){var n=_a.c.a();var t=!!this.d.k(n);this.d=n;this.eF("CalendarTimeChanged",this,n);t&&this.eF("CalendarDateChanged",this,n)}};_ca.c=function(n,t){_ca.c.initializeBase(this,[n,t]);this.y("DatePickerView")};_ca.c.prototype={e:null,l:null,g:function(n){if(!this.e||!this.e.C(n)){this.e=n;this.bs("SelectedDate")}return n},h:function(n){if(this.l!==n){this.l=n;this.bs("PickerAriaLabel")}return n}};_ca.e=function(n,t){_ca.e.initializeBase(this,[n]);this.bP=t;this.x=22};_ca.e.prototype={k:null,bP:null,bd:null,bb:!0,j:!1,f:!1,s:null,x:0,t:null,a:function(){return this.ew(_ca.e.b)},d:function(n){if(_a.c.c(this.a(),n)||!this.j&&!n)return n;this.ev(_ca.e.b,n);return n},b:function(){return this.bb},c:function(n){if(n!==this.bb){this.bb=n;this.bs("IsEnabled")}return n},i:function(n){if(this.j!==n){this.j=n;this.bs("CanSelectNone")}return n},bg:function(n){if(n!==this.k){this.k=n;this.bs("SuggestedDate")}return n},q:function(){return this.ew(_ca.e.a)},be:function(n){this.ev(_ca.e.a,n);return n},bQ:function(n){if(this.q()&&!_j.t.a(this.q()))return n;var t=n.toLowerCase();switch(t){case"date":this.be(1);break;case"time":this.be(2);break}this.bd=t;return n},r:function(){this.s||this.co();return this.s},G:function(){_j.c.prototype.G.call(this);this.bd!=="date"&&this.bd!=="time"&&this.bQ("date");if(this.t&&this.x!==22){var n=this.t.z;_j.k.a(n,"height",this.x+"px")}},I:function(){_j.c.prototype.I.call(this);var n=this.C;this.t=n?n.a("PickerCoreView"):null},co:function(){this.s=_bc.r.isInstanceOfType(this.W())?this.W().bI():this.bP}};_ca.g=function(n){_ca.g.initializeBase(this,[n]);this.y("MonthPickerView")};_ca.g.prototype={cm:0,n:"monthPickerCurrentDay ms-font-weight-semibold ms-font-color-white ms-bg-color-themePrimary",cJ:!1,cM:null,bJ:function(){return this.cM},cN:function(n){this.cM=n;return n},cl:function(){return this.cm},ed:function(n){this.cm!==n&&(this.cm=n);return n}};_ca.l=function(){};_ca.l.prototype={a:function(n,t){var i=n;return i===1604?_u.c.Da:i},b:function(n,t){throw Error.notImplemented();}};_ca.j=function(){};_ca.j.prototype={a:function(n,t){t===null&&(t=!0);var i=n;return i>=0&&i<=11?t?_a.c.bb(i):_a.eg.toString(i):""},b:function(n,t){throw Error.notImplemented();}};_ca.i=function(n){_ca.i.initializeBase(this,[n]);this.f=new _j.l;this.e=new _j.l;this.d=new _j.l;var t=_a.c.a();this.i=1900;this.h=t.f();this.c=1604;this.b=t.d();this.a=t.j()};_ca.i.prototype={c:0,b:0,a:0,l:null,f:null,p:function(n){if(this.c!==n){this.c=n;this.g();this.bs("SelectedYear")}return n},i:0,h:0,e:null,o:function(n){if(this.b!==n){this.b=n;this.g();this.bs("SelectedMonth")}return n},d:null,m:function(n){if(this.a!==n){this.a=n;this.k();this.bs("SelectedDay")}return n},O:function(){_j.c.prototype.O.call(this);if(this.C){for(var e=50,f=129,s=60,n=0,o=_a.c.cj(),i=o,u=i.length,t=0;t<u;++t){var r=i[t];switch(r){case 7:n=this.j("DayPicker",e,n);break;case 6:n=this.j("MonthPicker",f,n);break;case 5:n=this.j("YearPicker",s,n);break}}this.n()}},Z:function(){_j.h.prototype.Z.call(this);if(this.W()){var n=this.W();var t=new _a.c(this.c,this.b,this.a);if(n.k(t)){this.c=n.f();this.b=n.d();this.a=n.j()}this.g();this.bv("SelectedYear","SelectedMonth")}else this.k()},j:function(n,t,i){var u=10;var r=this.C.a(n);_j.k.a(r.z,_fc.l.a(),i+"px");_j.k.a(r.z,"position","absolute");r.z.style.width=t.toString()+"px";return i+t+u},n:function(){var i=new _j.q;i.c(1604);for(var t=this.h;t>=this.i;t--)i.c(t);this.f.m(i.j());for(var r=new _j.q,n=0;n<12;n++)r.c(n);this.e.m(r.j());this.g()},k:function(){var t=this.W();var n=new _a.c(this.c,this.b,this.a);(!t||n.k(t))&&this.ba(n)},g:function(){for(var t=_a.c.q(this.b,this.c),i=this.a,r=new _j.q,n=1;n<=t;n++)r.c(n);this.d.f();this.d.m(r.j());this.m(i>t?t:i);this.k()}};_ca.d=function(n,t){_ca.d.initializeBase(this,[n,t]);this.y("TimePickerView")};_ca.d.prototype={e:null,o:null,n:null,m:0,g:function(n){this.e=n;this.bs("SelectedTime");return n},l:function(n){if(this.o!==n){this.o=n;this.bs("TextBoxAriaLabel")}return n},h:function(n){if(this.n!==n){this.n=n;this.bs("DropDownButtonTitle")}return n},p:function(n){if(this.m!==n){this.m=n;this.bs("CustomTimeIntervalMinutes")}return n}};_ca.f=function(n,t,i){this.r=Function.createDelegate(this,this.u);this.e=new _j.l;_ca.f.initializeBase(this,[n]);this.y("Pivot");this.o=t.j()&&i.a()!=="Mouse"};_ca.f.prototype={o:!1,c:null,b:0,d:null,a:null,f:null,g:!1,m:null,h:!1,l:!1,k:null,q:function(n){if(this.c!==n){if(n)for(var r=n,u=r.length,t=0;t<u;++t){var i=r[t];if(!i.a)throw Error.argumentNull("Data field in the pivot option cannot be empty.");if(!Object.getType(i.a).inheritsFrom(_a.bB))throw Error.argument("Data field in the pivot option must inherit from the view model base class.");}this.c=n;this.j();this.bs("Options")}return n},cs:function(){return this.k},Q:function(n){if(this.k!==n){this.k=n;this.bs("AriaLabel")}return n},n:function(n){if(this.b!==n){this.b=n;if(this.Y()){this.t();this.j()}this.bs("SelectedOptionIndex")}return n},i:function(n){this.m!==n&&(this.m=n);return n},p:function(n){this.h!==n&&(this.h=n);return n},s:function(n){this.l!==n&&(this.l=n);return n},w:function(n){this.f!==n&&(this.f=n);return n},O:function(){_j.c.prototype.O.call(this);this.d=this.C.a("PivotMenu");this.a=this.C.a("ContentConductor");this.a.bJ(this.r);this.f&&(this.a.I=this.f);if(!this.h&&this.d.bb()&&this.o){var n=this;_b.h.a(this.bj(),function(t){n.v(t)},null,!1,!1)}},G:function(){_j.c.prototype.G.call(this);this.t();this.j()},Z:function(){_j.h.prototype.Z.call(this);this.j()},t:function(){if(this.c&&this.b>this.c.length-1)throw Error.argumentOutOfRange("Cannot assign a selected option for the pivot that is outside the range of total options.");},j:function(){this.c&&this.c.length>0&&this.b>=0&&!this.g&&(this.e.x.length?this.e.q(0,this.c[this.b].a):this.e.a(this.c[this.b].a))},v:function(n){var u=this.b;var i=n.e();if(this.d.bk(n)){var r=this;_b.h.f(this.bj(),function(n){r.d.dt(n);var t=n.e()-i;_j.k.a(r.a.z,_b.m.a(),_b.m.c(t,0));_j.k.a(r.a.z,_b.m.d(),_b.m.a()+" 0s")},null);var t=this;_b.h.c(this.bj(),function(n){_b.h.b(t.bj(),null);t.g=!0;t.d.ds(n);if(u===t.b){_j.k.a(t.a.z,_b.m.a(),_b.m.c(0,0));_j.k.a(t.a.z,_b.m.d(),_b.m.a()+" 250ms");t.g=!1}else{var e=n.e()-i;_j.k.a(t.a.z,_fc.l.a(),e.toString()+"px");_j.k.a(t.a.z,_b.m.a(),"");_j.k.a(t.a.z,_b.m.d(),"");var r=31;var f=28;if(n.e()>i){r=32;f=27}t.a.g=function(){return new _ff.h(f,r)};t.g=!1;t.j();t.a.g=null}},null)}},u:function(){_j.k.a(this.a.z,_fc.l.a(),"")}};_ca.h=function(){this.c=Function.createDelegate(this,this.d);_ca.h.initializeBase(this)};_ca.h.prototype={b:!1,a:null,bb:function(){_j.bV.prototype.bb.call(this);this.X.f(this.c)},bd:function(){this.X.i(this.c);_j.bV.prototype.bd.call(this)},bf:function(n){_j.bV.prototype.bf.call(this,n);if(!_fce.g.isInstanceOfType(n))throw Error.argumentType("AttachedControl");},d:function(){if(this.X.c()>0){if(!this.b){this.X.bm(this.a);this.b=!0}}else if(this.b){this.X.by(this.a);this.b=!1}}};_ca.a=function(){};_ca.a.$$cctor=function(){_ca.a._I()};_ca.a.q=function(){var n=window.document.createElement("DIV");n.innerHTML="<div> <span></span> </div><div> <span class='_ca_2'></span> </div><div> <label> <span class='reminder-label label ms-font-s ms-font-weight-semilight'></span> <div></div> <div></div> <div></div> </label> </div><div> <div></div> <div class='_ca_3'></div> </div>";_j.h.a().appendChild(n);return n};_ca.a.k=function(n){return n.W()};_ca.a.G=function(n){return n.l};_ca.a.L=function(n){return n.f};_ca.a.K=function(n){return n.c};_ca.a.h=function(n){return n.b()};_ca.a.H=function(n){return n.e};_ca.a.J=function(n){return n.b};_ca.a.F=function(n){return n.d};_ca.a.I=function(n){return n.a};_ca.a.m=function(n){return n.l};_ca.a.B=function(n){return n.c};_ca.a.D=function(n){return n.b};_ca.a.r=function(n){return n.c};_ca.a.A=function(n){return n.h};_ca.a.C=function(n){return n.m};_ca.a.y=function(n){return n.cs()};_ca.a.z=function(n){return n.e};_ca.a.g=function(n,t){n.a(t)};_ca.a.i=function(n,t){n.c(t)};_ca.a.O=function(n,t){n.p(t)};_ca.a.j=function(n,t){n.d(t)};_ca.a.N=function(n,t){n.o(t)};_ca.a.M=function(n,t){n.m(t)};_ca.a.x=function(n,t){n.J(t)};_ca.a.s=function(n,t){n.j(t)};_ca.a.E=function(n,t){n.n(t)};_ca.a.t=function(n,t){n.e(t)};_ca.a.u=function(n,t){n.cm=t};_ca.a.w=function(n,t){n.bD(t)};_ca.a.v=function(n,t){n.Q(t)};_ca.a.P=function(n,t){n.b(t)};_ca.a.o=function(){_ca.a.e||(_ca.a.e=new _ca.l);return _ca.a.e};_ca.a.n=function(){_ca.a.d||(_ca.a.d=new _ca.j);return _ca.a.d};_ca.a.p=function(){_ca.a.f||(_ca.a.f=new _b.ba);return _ca.a.f};_ca.a.l=function(){_ca.a.c||(_ca.a.c=new _fc.k);return _ca.a.c};_ca.a._I=function(){var r="SplitDatePicker.YearTemplate";new _j.d(r,function(){_ca.a.a[r]===undefined&&(_ca.a.a[r]=[[[-1,1,["DataContext"],[_ca.a.k],null,"Text",null,_ca.a.g,1,_ca.a.o(),null,null]]]);var n=_ca.a.b.childNodes[0].cloneNode(!0);var t=new _fc.a(n.children[0]);return new _j.a(n,[t])},"",Object,_j.h,null,!1,!1,!1,0,_ca.a.a);var u="SplitDatePicker.MonthTemplate";new _j.d(u,function(){_ca.a.a[u]===undefined&&(_ca.a.a[u]=[[[-1,1,["DataContext"],[_ca.a.k],null,"Text",null,_ca.a.g,1,_ca.a.n(),null,null]]]);var n=_ca.a.b.childNodes[0].cloneNode(!0);var t=new _fc.a(n.children[0]);return new _j.a(n,[t])},"",Object,_j.h,null,!1,!1,!1,0,_ca.a.a);var i="SplitDatePicker.DayTemplate";new _j.d(i,function(){_ca.a.a[i]===undefined&&(_ca.a.a[i]=[[[-1,1,["DataContext"],[_ca.a.k],null,"Text",null,_ca.a.g,1,_ca.a.p(),null,null]]]);var n=_ca.a.b.childNodes[1].cloneNode(!0);var t=new _fc.a(n.children[0]);return new _j.a(n,[t])},"",Object,_j.h,null,!1,!1,!1,0,_ca.a.a);var n="SplitDatePicker";new _j.d(n,function(){_ca.a.a[n]===undefined&&(_ca.a.a[n]=[[[-1,1,["Label"],[_ca.a.G],null,"Text",null,_ca.a.g,1,null,null,null]],[[-1,1,["YearOptions"],[_ca.a.L],null,"Options",null,_ca.a.i,1,null,null,null],[-1,1,["SelectedYear"],[_ca.a.K],_ca.a.O,"SelectedValue",_ca.a.h,_ca.a.j,2,null,null,null]],[[-1,1,["MonthOptions"],[_ca.a.H],null,"Options",null,_ca.a.i,1,null,null,null],[-1,1,["SelectedMonth"],[_ca.a.J],_ca.a.N,"SelectedValue",_ca.a.h,_ca.a.j,2,null,null,null]],[[-1,1,["DayOptions"],[_ca.a.F],null,"Options",null,_ca.a.i,1,null,null,null],[-1,1,["SelectedDay"],[_ca.a.I],_ca.a.M,"SelectedValue",_ca.a.h,_ca.a.j,2,null,null,null]]]);var r=_ca.a.b.childNodes[2].cloneNode(!0);var u=new _fce.k(_j.a.a(r,[0,3]));u.a("SplitDatePicker.DayTemplate");u.l=!0;u.S("SplitDatePicker.Label");var t=new _fce.k(_j.a.a(r,[0,2]));t.a("SplitDatePicker.MonthTemplate");t.l=!0;t.S("SplitDatePicker.Label");var i=new _fce.k(_j.a.a(r,[0,1]));i.a("SplitDatePicker.YearTemplate");i.l=!0;i.S("SplitDatePicker.Label");var f=new _fc.a(_j.a.a(r,[0,0]));f.N("SplitDatePicker.Label");f.L(!0);return new _j.a(r,[f,i,t,u]).l({YearPicker:i,MonthPicker:t,DayPicker:u})},"",_a.c,_ca.i,function(n){return new _ca.i(n)},!0,!1,!1,0,_ca.a.a);var t="Pivot";new _j.d(t,function(){_ca.a.a[t]===undefined&&(_ca.a.a[t]=[[[-1,1,["HidePivotMenu"],[_ca.a.m],null,"IsHidden",null,_ca.a.x,1,null,null,!0],[-1,1,["Options"],[_ca.a.B],null,"Options",null,_ca.a.s,1,null,null,null],[-1,1,["SelectedOptionIndex"],[_ca.a.D],_ca.a.E,"SelectedOptionIndex",_ca.a.r,_ca.a.t,2,null,null,0],[-1,1,["DisableSurfaceSwipe"],[_ca.a.A],null,"TouchDisabled",null,_ca.a.u,1,_ca.a.l(),null,!1],[-1,1,["PivotMenuCss"],[_ca.a.C],null,"CssClass",null,_ca.a.w,1,null,null,null],[-1,1,["AriaLabel"],[_ca.a.y],null,"AriaLabel",null,_ca.a.v,1,null,null,null]],[[-1,1,["ConductorStack"],[_ca.a.z],null,"ActiveNavigationStack",null,_ca.a.P,1,null,null,null],[-1,5,["HidePivotMenu"],[_ca.a.m],null,"_ca_4",null,null,1,_ca.a.l(),null,null]]]);var i=_ca.a.b.childNodes[3].cloneNode(!0);var r=new _n.g(i.children[1],_j.b.Instance.a(_n.f),_j.b.Instance.a(_b.a));var n=new _fce.x(i.children[0],_j.b.Instance.a(_ff.a),_j.b.Instance.a(_j.p),_j.b.Instance.a(_ff.l),_j.b.Instance.a(_ff.b));n.E(30);return new _j.a(i,[n,r]).l({PivotMenu:n,ContentConductor:r})},"",Object,_ca.f,function(n){return new _ca.f(n,_j.b.Instance.a(_j.o),_j.b.Instance.a(_y.a))},!1,!1,!1,0,_ca.a.a)};CalendarControlsCoreComponent.registerClass("CalendarControlsCoreComponent",null,_a.ic,_j.ce);_ca.b.registerClass("_ca.b",_a.bB);_ca.e.registerClass("_ca.e",_j.c);_ca.c.registerClass("_ca.c",_ca.e);_ca.g.registerClass("_ca.g",_j.c);_ca.l.registerClass("_ca.l",null,_j.bQ);_ca.j.registerClass("_ca.j",null,_j.bQ);_ca.i.registerClass("_ca.i",_j.c);_ca.d.registerClass("_ca.d",_ca.e);_ca.f.registerClass("_ca.f",_j.c);_ca.h.registerClass("_ca.h",_j.bV);CalendarControlsCoreComponent.$$cctor();_ca.e.b=new _a.e("SelectedValue",_a.c,_ca.e);_ca.e.a=new _a.e("DateTimeType",_ca.k,_ca.e);_ca.a.b=_ca.a.q();_ca.a.e=null;_ca.a.d=null;_ca.a.f=null;_ca.a.c=null;_ca.a.a={};_ca.a.$$cctor();
window.scriptsLoaded['microsoft.owa.calendar.controls.core.js'] = 1; window.scriptProcessEnd = window.scriptProcessEnd || {}; window.scriptProcessEnd['microsoft.owa.calendar.controls.core.js'] = (new Date()).getTime(); } catch(e) { window.owaLastErrorReported = e; throw e; }