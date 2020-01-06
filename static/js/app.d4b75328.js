(function(e){function t(t){for(var n,i,o=t[0],c=t[1],u=t[2],p=0,d=[];p<o.length;p++)i=o[p],Object.prototype.hasOwnProperty.call(a,i)&&a[i]&&d.push(a[i][0]),a[i]=0;for(n in c)Object.prototype.hasOwnProperty.call(c,n)&&(e[n]=c[n]);l&&l(t);while(d.length)d.shift()();return s.push.apply(s,u||[]),r()}function r(){for(var e,t=0;t<s.length;t++){for(var r=s[t],n=!0,o=1;o<r.length;o++){var c=r[o];0!==a[c]&&(n=!1)}n&&(s.splice(t--,1),e=i(i.s=r[0]))}return e}var n={},a={app:0},s=[];function i(t){if(n[t])return n[t].exports;var r=n[t]={i:t,l:!1,exports:{}};return e[t].call(r.exports,r,r.exports,i),r.l=!0,r.exports}i.m=e,i.c=n,i.d=function(e,t,r){i.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},i.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(e,t){if(1&t&&(e=i(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(i.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var n in e)i.d(r,n,function(t){return e[t]}.bind(null,n));return r},i.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return i.d(t,"a",t),t},i.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},i.p="";var o=window["webpackJsonp"]=window["webpackJsonp"]||[],c=o.push.bind(o);o.push=t,o=o.slice();for(var u=0;u<o.length;u++)t(o[u]);var l=c;s.push([0,"chunk-vendors"]),r()})({0:function(e,t,r){e.exports=r("56d7")},"034f":function(e,t,r){"use strict";var n=r("8a23"),a=r.n(n);a.a},"56d7":function(e,t,r){"use strict";r.r(t);r("e260"),r("e6cf"),r("cca6"),r("a79d");var n=r("2b0e"),a=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"app"}},[e._m(0),n("v-app",[n("v-content",[n("v-container",[n("img",{attrs:{src:r("cf05"),height:"50px"}}),n("router-view")],1)],1)],1)],1)},s=[function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("head",[r("link",{attrs:{href:"https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons",rel:"stylesheet"}})])}],i=(r("99af"),{name:"App",data:function(){return{title:"App-web-mfa"}},errorCaptured:function(e,t,r){alert("[Vue warn]: Unexpected error in ".concat(r,":\n      ").concat(e))}}),o=i,c=(r("034f"),r("2877")),u=r("6544"),l=r.n(u),p=r("7496"),d=r("a523"),v=r("a75b"),f=Object(c["a"])(o,a,s,!1,null,null,null),h=f.exports;l()(f,{VApp:p["a"],VContainer:d["a"],VContent:v["a"]});var m=r("8c4f"),b=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",[r("h1",[e._v("Activate MFA")]),r("v-divider",{staticClass:"mt-3 mb-2"}),r("v-dialog",{attrs:{persistent:"",width:"600"},model:{value:e.mfaActivated,callback:function(t){e.mfaActivated=t},expression:"mfaActivated"}},[r("v-card",[r("v-card-title",{staticClass:"headline grey lighten-2"},[e._v(" MFA verification ")]),r("v-text-field",{staticClass:"ma-3",attrs:{id:"mfaCode",rules:[e.rules.required],label:"MFA code"},model:{value:e.mfaCode,callback:function(t){e.mfaCode=t},expression:"mfaCode"}}),r("v-card-actions",[r("v-spacer"),r("v-btn",{on:{click:function(t){e.mfaToken="",e.mfaCode=""}}},[e._v(" Cancel ")]),r("v-btn",{attrs:{id:"confirmMfa"},on:{click:function(t){return e.confirmMFA()}}},[e._v(" Ok ")])],1)],1)],1),r("v-form",{ref:"form",on:{submit:function(e){e.preventDefault()}},model:{value:e.validForm,callback:function(t){e.validForm=t},expression:"validForm"}},[r("v-text-field",{attrs:{id:"username",rules:[e.rules.required],label:"Username"},model:{value:e.username,callback:function(t){e.username=t},expression:"username"}}),r("Password",{model:{value:e.password,callback:function(t){e.password=t},expression:"password"}}),r("v-text-field",{attrs:{id:"phone",rules:[e.rules.required],label:"Phone number"},model:{value:e.phone,callback:function(t){e.phone=t},expression:"phone"}}),r("v-btn",{attrs:{id:"submitButton",disabled:!e.validForm||e.submitting},on:{click:e.submit}},[e._v(" Activate ")])],1),r("v-divider",{staticClass:"mt-3 mb-2"}),r("router-link",{attrs:{to:{name:"Deactivate"}}},[r("h3",[e._v("Go to Deactivation")])]),r("Alerts",{attrs:{successMsg:e.success,errorMsg:e.error}}),e.recoveryCodes?r("div",{attrs:{id:"recovery"}},[r("b",[e._v("Here are your MFA recovery codes:")]),r("div",[e._v(e._s(e.recoveryCodes))])]):e._e()],1)},y=[],g=(r("d3b7"),r("25f0"),r("96cf"),function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",[r("v-text-field",{attrs:{id:"password",value:e.value,appendIcon:e.visiblePass?"lock_open":"lock",type:e.visiblePass?"text":"password",rules:[e.rules.required],label:"Password"},on:{input:function(t){return e.$emit("input",t)},"click:append":function(){return e.visiblePass=!e.visiblePass}}})],1)}),x=[],w={props:{value:{type:String,default:""}},data:function(){return{visiblePass:!1,rules:{required:function(e){return!!e||"This field is required."}}}}},k=w,A=r("8654"),_=Object(c["a"])(k,g,x,!1,null,null,null),R=_.exports;l()(_,{VTextField:A["a"]});var C=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",[r("v-divider",{staticClass:"mt-3 mb-2"}),e.alertMsg?r("v-alert",{attrs:{type:e.alertType,transition:"scale-transition"}},[r("span",{domProps:{innerHTML:e._s(e.alertMsg)}})]):e._e()],1)},M=[],T={props:{errorMsg:{type:String,default:""},successMsg:{type:String,default:""}},computed:{alertMsg:function(){return""!==this.successMsg?this.successMsg:""!==this.errorMsg?this.errorMsg:""},alertType:function(){return""!==this.successMsg?"success":"error"}}},F=T,P=r("0798"),V=r("ce7e"),O=Object(c["a"])(F,C,M,!1,null,null,null),E=O.exports;l()(O,{VAlert:P["a"],VDivider:V["a"]});var j=r("d4ec"),q=r("bee2"),D=r("a966"),S=r.n(D),I=function(){function e(t){Object(j["a"])(this,e),this.appId="pryv-app-web-mfa",this.serviceInfoUrl=t.pryvServiceInfoUrl||"https://reg.pryv.me/service/info"}return Object(q["a"])(e,[{key:"init",value:function(){return regeneratorRuntime.async((function(e){while(1)switch(e.prev=e.next){case 0:return this.pryv=new S.a(this.serviceInfoUrl),e.next=3,regeneratorRuntime.awrap(this.pryv.init());case 3:case"end":return e.stop()}}),null,this)}}]),e}(),$=I,U={components:{Password:R,Alerts:E},data:function(){return{password:"",personalToken:"",mfaToken:"",mfaCode:"",recoveryCodes:null,username:"",phone:"",error:"",success:"",submitting:!1,ctx:{},rules:{required:function(e){return!!e||"This field is required."}},validForm:!1}},computed:{mfaActivated:{get:function(){return""!==this.mfaToken}}},created:function(){return regeneratorRuntime.async((function(e){while(1)switch(e.prev=e.next){case 0:return this.ctx=new $(this.$route.query),e.next=3,regeneratorRuntime.awrap(this.ctx.init());case 3:case"end":return e.stop()}}),null,this)},methods:{submit:function(){return regeneratorRuntime.async((function(e){while(1)switch(e.prev=e.next){case 0:if(!this.$refs.form.validate()){e.next=17;break}return this.submitting=!0,e.prev=2,e.next=5,regeneratorRuntime.awrap(this.ctx.pryv.login(this.username,this.password,this.ctx.appId));case 5:return this.personalToken=e.sent,e.next=8,regeneratorRuntime.awrap(this.ctx.pryv.mfaActivate(this.username,this.personalToken,this.phone));case 8:this.mfaToken=e.sent,e.next=14;break;case 11:e.prev=11,e.t0=e["catch"](2),this.error=e.t0.toString();case 14:return e.prev=14,this.submitting=!1,e.finish(14);case 17:case"end":return e.stop()}}),null,this,[[2,11,14,17]])},confirmMFA:function(){return regeneratorRuntime.async((function(e){while(1)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,regeneratorRuntime.awrap(this.ctx.pryv.mfaConfirm(this.username,this.mfaToken,this.mfaCode));case 3:this.recoveryCodes=e.sent,this.success="MFA activated!",e.next=10;break;case 7:e.prev=7,e.t0=e["catch"](0),this.error=e.t0.toString();case 10:return e.prev=10,this.mfaToken="",this.mfaCode="",e.finish(10);case 14:case"end":return e.stop()}}),null,this,[[0,7,10,14]])}}},z=U,B=r("8336"),G=r("b0af"),H=r("99d9"),J=r("169a"),L=r("4bd4"),N=r("2fa4"),K=Object(c["a"])(z,b,y,!1,null,null,null),Q=K.exports;l()(K,{VBtn:B["a"],VCard:G["a"],VCardActions:H["a"],VCardTitle:H["b"],VDialog:J["a"],VDivider:V["a"],VForm:L["a"],VSpacer:N["a"],VTextField:A["a"]});var W=function(){var e=this,t=e.$createElement,r=e._self._c||t;return r("div",[r("h1",[e._v("Deactivate MFA")]),r("v-divider",{staticClass:"mt-3 mb-2"}),r("v-form",{ref:"form",on:{submit:function(e){e.preventDefault()}},model:{value:e.validForm,callback:function(t){e.validForm=t},expression:"validForm"}},[r("input",{directives:[{name:"model",rawName:"v-model",value:e.recovery,expression:"recovery"}],attrs:{id:"checkbox",type:"checkbox"},domProps:{checked:Array.isArray(e.recovery)?e._i(e.recovery,null)>-1:e.recovery},on:{change:function(t){var r=e.recovery,n=t.target,a=!!n.checked;if(Array.isArray(r)){var s=null,i=e._i(r,s);n.checked?i<0&&(e.recovery=r.concat([s])):i>-1&&(e.recovery=r.slice(0,i).concat(r.slice(i+1)))}else e.recovery=a}}}),r("label",{attrs:{for:"checkbox"}},[e._v(" Use recovery code")]),r("v-text-field",{attrs:{id:"username",rules:[e.rules.required],label:"Username"},model:{value:e.username,callback:function(t){e.username=t},expression:"username"}}),e.recovery?r("div",[r("Password",{model:{value:e.password,callback:function(t){e.password=t},expression:"password"}}),r("v-text-field",{attrs:{id:"recoveryCode",rules:[e.rules.required],label:"Recovery code"},model:{value:e.recoveryCode,callback:function(t){e.recoveryCode=t},expression:"recoveryCode"}})],1):r("div",[r("v-text-field",{attrs:{id:"token",rules:[e.rules.required],label:"Personal token"},model:{value:e.personalToken,callback:function(t){e.personalToken=t},expression:"personalToken"}})],1),r("v-btn",{attrs:{id:"submitButton",disabled:!e.validForm||e.submitting},on:{click:e.submit}},[e._v(" Deactivate ")])],1),r("v-divider",{staticClass:"mt-3 mb-2"}),r("router-link",{attrs:{to:{name:"Activate"}}},[r("h3",[e._v("Go to Activation")])]),r("Alerts",{attrs:{successMsg:e.success,errorMsg:e.error}})],1)},X=[],Y={components:{Password:R,Alerts:E},data:function(){return{username:"",password:"",personalToken:"",error:"",success:"",submitting:!1,ctx:{},recovery:!1,recoveryCode:"",rules:{required:function(e){return!!e||"This field is required."}},validForm:!1}},created:function(){return regeneratorRuntime.async((function(e){while(1)switch(e.prev=e.next){case 0:return this.ctx=new $(this.$route.query),e.next=3,regeneratorRuntime.awrap(this.ctx.init());case 3:case"end":return e.stop()}}),null,this)},methods:{submit:function(){return regeneratorRuntime.async((function(e){while(1)switch(e.prev=e.next){case 0:if(!this.$refs.form.validate()){e.next=20;break}if(this.submitting=!0,e.prev=2,!this.recovery){e.next=9;break}return e.next=6,regeneratorRuntime.awrap(this.ctx.pryv.mfaRecover(this.username,this.password,this.ctx.appId,this.recoveryCode));case 6:this.success=e.sent,e.next=12;break;case 9:return e.next=11,regeneratorRuntime.awrap(this.ctx.pryv.mfaDeactivate(this.username,this.personalToken));case 11:this.success=e.sent;case 12:e.next=17;break;case 14:e.prev=14,e.t0=e["catch"](2),this.error=e.t0.toString();case 17:return e.prev=17,this.submitting=!1,e.finish(17);case 20:case"end":return e.stop()}}),null,this,[[2,14,17,20]])}}},Z=Y,ee=Object(c["a"])(Z,W,X,!1,null,null,null),te=ee.exports;l()(ee,{VBtn:B["a"],VDivider:V["a"],VForm:L["a"],VTextField:A["a"]}),n["a"].use(m["a"]);var re=new m["a"]({mode:"history",base:"mfa",routes:[{path:"/",redirect:{name:"Activate"}},{path:"/activate",name:"Activate",component:Q},{path:"/deactivate",name:"Deactivate",component:te}]}),ne=r("f309");r("bf40");n["a"].use(ne["a"]);var ae=new ne["a"]({});n["a"].config.productionTip=!1,new n["a"]({router:re,vuetify:ae,render:function(e){return e(h)}}).$mount("#app")},"8a23":function(e,t,r){},a966:function(e,t,r){r("d3b7"),r("5319"),r("96cf");var n=r("970b"),a=r("5bc3"),s=r("db82"),i=function(){"use strict";function e(t){n(this,e),this.serviceInfoUrl=t}return a(e,[{key:"init",value:function(){var e,t=this;return regeneratorRuntime.async((function(r){while(1)switch(r.prev=r.next){case 0:return r.next=2,regeneratorRuntime.awrap(s.get(this.serviceInfoUrl));case 2:e=r.sent,this.apiUrl=e.body.api,this.apiEndpoint=function(e){return t.apiUrl.replace("{username}",e)};case 5:case"end":return r.stop()}}),null,this)}},{key:"login",value:function(e,t,r){var n;return regeneratorRuntime.async((function(a){while(1)switch(a.prev=a.next){case 0:return a.prev=0,a.next=3,regeneratorRuntime.awrap(s.post("".concat(this.apiEndpoint(e),"/auth/login")).send({username:e,password:t,appId:r}));case 3:return n=a.sent,a.abrupt("return",n.body.token);case 7:if(a.prev=7,a.t0=a["catch"](0),null==a.t0.response||302!==a.t0.response.status){a.next=13;break}throw new Error("MFA already active.");case 13:throw a.t0;case 14:case"end":return a.stop()}}),null,this,[[0,7]])}},{key:"fetchProfile",value:function(e,t){var r,n;return regeneratorRuntime.async((function(a){while(1)switch(a.prev=a.next){case 0:return a.next=2,regeneratorRuntime.awrap(s.get("".concat(this.apiEndpoint(e),"/profile/private")).set("Authorization",t));case 2:return r=a.sent,n=r.body.profile,a.abrupt("return",n.mfa);case 5:case"end":return a.stop()}}),null,this)}},{key:"checkAccess",value:function(e,t){return regeneratorRuntime.async((function(r){while(1)switch(r.prev=r.next){case 0:return r.next=2,regeneratorRuntime.awrap(s.get("".concat(this.apiEndpoint(e),"/access-info")).set("Authorization",t));case 2:case"end":return r.stop()}}),null,this)}},{key:"mfaActivate",value:function(e,t,r){var n;return regeneratorRuntime.async((function(a){while(1)switch(a.prev=a.next){case 0:return a.prev=0,a.next=3,regeneratorRuntime.awrap(s.post("".concat(this.apiEndpoint(e),"/mfa/activate")).send({phone_number:r}).set("Authorization",t));case 3:return n=a.sent,a.abrupt("return",n.body.mfaToken);case 7:if(a.prev=7,a.t0=a["catch"](0),null==a.t0.response||null==a.t0.response.body||null==a.t0.response.body.mfaToken){a.next=13;break}return a.abrupt("return",a.t0.response.body.mfaToken);case 13:throw a.t0;case 14:case"end":return a.stop()}}),null,this,[[0,7]])}},{key:"mfaConfirm",value:function(e,t,r){var n;return regeneratorRuntime.async((function(a){while(1)switch(a.prev=a.next){case 0:return a.next=2,regeneratorRuntime.awrap(s.post("".concat(this.apiEndpoint(e),"/mfa/confirm")).send({code:r}).set("Authorization",t));case 2:return n=a.sent,a.abrupt("return",n.body.recoveryCodes);case 4:case"end":return a.stop()}}),null,this)}},{key:"mfaChallenge",value:function(e,t){return regeneratorRuntime.async((function(r){while(1)switch(r.prev=r.next){case 0:return r.next=2,regeneratorRuntime.awrap(s.post("".concat(this.apiEndpoint(e),"/mfa/challenge")).set("Authorization",t));case 2:case"end":return r.stop()}}),null,this)}},{key:"mfaVerify",value:function(e,t,r){var n;return regeneratorRuntime.async((function(a){while(1)switch(a.prev=a.next){case 0:return a.next=2,regeneratorRuntime.awrap(s.post("".concat(this.apiEndpoint(e),"/mfa/verify")).send({code:r}).set("Authorization",t));case 2:return n=a.sent,a.abrupt("return",n.body.token);case 4:case"end":return a.stop()}}),null,this)}},{key:"mfaDeactivate",value:function(e,t){var r;return regeneratorRuntime.async((function(n){while(1)switch(n.prev=n.next){case 0:return n.next=2,regeneratorRuntime.awrap(s.post("".concat(this.apiEndpoint(e),"/mfa/deactivate")).set("Authorization",t));case 2:return r=n.sent,n.abrupt("return",r.body.message);case 4:case"end":return n.stop()}}),null,this)}},{key:"mfaRecover",value:function(e,t,r,n){var a;return regeneratorRuntime.async((function(i){while(1)switch(i.prev=i.next){case 0:return i.next=2,regeneratorRuntime.awrap(s.post("".concat(this.apiEndpoint(e),"/mfa/recover")).send({username:e,password:t,appId:r,recoveryCode:n}));case 2:return a=i.sent,i.abrupt("return",a.body.message);case 4:case"end":return i.stop()}}),null,this)}}]),e}();e.exports=i},cf05:function(e,t,r){e.exports=r.p+"static/img/logo.54cacaa3.png"}});
//# sourceMappingURL=app.d4b75328.js.map