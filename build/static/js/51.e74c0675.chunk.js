/*!
 * ****************************************
 * hash       : 4eb8e5b37323ce32b4f3
 * name       : 51
 * file       : static/js/51.e74c0675.chunk.js
 * author     : 黄超-Faker,运帅-Mark,朱少林-Grabb
 * repository : https://gitee.com/veryeast/ve_m_ssr.git
 * ****************************************
 */
webpackJsonp([51],{1015:function(e,t,n){"use strict";n.d(t,"d",function(){return p}),n.d(t,"e",function(){return d}),n.d(t,"c",function(){return m}),n.d(t,"f",function(){return h}),n.d(t,"h",function(){return g}),n.d(t,"g",function(){return b}),n.d(t,"b",function(){return A}),n.d(t,"a",function(){return w}),n.d(t,"l",function(){return y}),n.d(t,"j",function(){return v}),n.d(t,"i",function(){return k}),n.d(t,"k",function(){return C});var a=n(81),r=n.n(a),s=n(248),o=n.n(s),i=n(16),c=n(1022),u=n.n(c),l=n(249),f=n.n(l),p=function(e){return Object(i.c)(":ve.mobile.interface/user/login",e).then(function(e){if(0!==e.status)return r.a.set("m:auth",e.data),o.a.set("ticket",e.data.user_ticket),e.data;throw e})},d=function(e){return Object(i.c)(":ve.mobile.interface/user/code_login",e).then(function(e){if(0!==e.status)return r.a.set("m:auth",e.data),o.a.set("ticket",e.data.user_ticket),e.data;throw e})},m=function(e){return Object(i.c)(":ve.mobile.interface/user/find",e).then(function(e){if(0!==e.status)return r.a.set("m:auth",e.data),o.a.set("ticket",e.data.user_ticket),e;throw e})},h=function(e){return Object(i.c)(":ve.mobile.interface/user/logout",e).then(function(e){if(0!==e.status)return r.a.remove("m:auth"),o.a.remove("ticket"),o.a.remove("user_ticket"),e.data;throw e})},g=function(e){return Object(i.c)(":ve.mobile.interface/user/register",e).then(function(e){if(0!==e.status)return r.a.set("m:auth",e.data),o.a.set("ticket",e.data.user_ticket),e;throw e})},b=function(e){var t=o.a.get("captcha_key");return f()({url:Object(i.d)(":ve.sso/user/mobile_code"),credentials:"include",method:"post",data:Object(i.b)(Object.assign({appid:1,return_type:"json",captcha_key:t},e))}).then(function(e){return e.data})},A=function(e){return Object(i.c)(":ve.mobile.interface/user/rest_password",e).then(function(e){if(0!==e.status)return e;throw e})},w=function(e){return f()({url:Object(i.d)(":ve.m/client-service/api/mobile"),credentials:"include",method:"post",data:Object(i.b)(Object.assign({},e))}).then(function(e){return e.data})},y=function(e){return fetch("https://activity.veryeast.cn/wechat/get-sign-package?url="+e).then(function(e){return e.json()}).then(function(e){if(1===e.status)return e;throw e})},v=function(e,t){return{title:"\u804c\u4f4d\u63a8\u8350\uff1a"+e,desc:t+"\u6b63\u5728\u62db\u8058\u4eba\u624d\uff0c\u673a\u4f1a\u7279\u522b\u597d\uff0c\u63a8\u8350\u4f60\u53bb\u8bd5\u8bd5~",link:window.location.href,imgUrl:u.a,type:"link"}},k=function(e,t){return{title:"\u804c\u4f4d\u63a8\u8350\uff1a"+t+"\u6b63\u5728\u62db\u8058"+e+"\uff0c\u63a8\u8350\u4f60\u53bb\u8bd5\u8bd5~",link:window.location.href,imgUrl:u.a,type:"link"}},C=function(e){return{debug:!1,appId:e.appId,timestamp:e.timestamp,nonceStr:e.nonceStr,signature:e.signature,jsApiList:["onMenuShareTimeline","onMenuShareAppMessage","onMenuShareQQ","onMenuShareQZone"]}}},1022:function(e,t,n){e.exports=n.p+"static/media/logo.ad3a431b.jpg"},1060:function(e,t){e.exports="data:image/png;base64,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"},1061:function(e,t){e.exports="data:image/png;base64,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"},1289:function(e,t,n){var a=n(1290);"string"===typeof a&&(a=[[e.i,a,""]]);var r={};r.transform=void 0;n(612)(a,r);a.locals&&(e.exports=a.locals)},1290:function(e,t,n){t=e.exports=n(611)(!1),t.push([e.i,"._23bm7w8{background-color:#fff;height:100%}._1Gwe6FF{padding:.25rem .3rem 0;margin-bottom:.4rem}.HzJZs-3{height:.5rem;border-bottom:.01rem solid hsla(252,5%,79%,.5);display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;-ms-flex-pack:justify;justify-content:space-between;font-size:.16rem;color:#333}.HzJZs-3 input{-ms-flex:1 1;flex:1 1;height:.4rem;font-size:.13rem}.HzJZs-3 ._3xyILGr{width:.25rem}.HzJZs-3 ._3xyILGr img{width:.2rem}.DPGnJHy{padding:0 .3rem;height:.4rem;text-align:center;line-height:.4rem;font-size:.17rem;color:#fff}.DPGnJHy p{background-color:#ff4f00;border-radius:.08rem}._3DH7vuh{color:#f48051!important}",""]),t.locals={ChangePasswprdWrap:"_23bm7w8",inputBox:"_1Gwe6FF",inputItem:"HzJZs-3",changeimg:"_3xyILGr",btn:"DPGnJHy",disable:"_3DH7vuh"}},632:function(e,t,n){"use strict";function a(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function r(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!==typeof t&&"function"!==typeof t?e:t}function s(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var o,i,c=n(675),u=n.n(c),l=n(242),f=n.n(l),p=n(5),d=n.n(p),m=n(239),h=n(1289),g=n.n(h),b=n(1060),A=n.n(b),w=n(1061),y=n.n(w),v=n(1015),k=n(82),C=n(81),E=n.n(C),S=function(){function e(e,t){for(var n=0;n<t.length;n++){var a=t[n];a.enumerable=a.enumerable||!1,a.configurable=!0,"value"in a&&(a.writable=!0),Object.defineProperty(e,a.key,a)}}return function(t,n,a){return n&&e(t.prototype,n),a&&e(t,a),t}}(),J=(o=Object(m.b)(function(e){return{}}))(i=function(e){function t(){var e,n,s,o;a(this,t);for(var i=arguments.length,c=Array(i),u=0;u<i;u++)c[u]=arguments[u];return n=s=r(this,(e=t.__proto__||Object.getPrototypeOf(t)).call.apply(e,[this].concat(c))),s.state={disable:!1,oldPassword:null,password:null,NewPassword:null,type1:!1,type2:!1,type3:!1},s.changeType=function(e){"type1"===e&&s.setState({type1:!s.state.type1}),"type2"===e&&s.setState({type2:!s.state.type2}),"type3"===e&&s.setState({type3:!s.state.type3})},s.passworOnchange=function(){var e=s.refs.oldPassword.value,t=s.refs.password.value,n=s.refs.NewPassword.value;e.length>0&&s.setState({oldPassword:e}),t.length>0&&s.setState({password:t}),n.length>0&&s.setState({NewPassword:n}),e.length>0&&t.length>0&&n.length>0&&s.setState({disable:!0})},s.handleChange=function(){if(s.state.disable){if(s.state.password!==s.state.NewPassword)return f.a.info("\u4e24\u6b21\u5bc6\u7801\u8f93\u5165\u4e0d\u4e00\u6837",2);if(s.state.oldPassword===s.state.NewPassword)return f.a.info("\u65b0\u5bc6\u7801\u548c\u5c31\u5bc6\u7801\u4e0d\u80fd\u76f8\u540c",2);if(s.state.password.length<6)return f.a.info("\u5bc6\u7801\u683c\u5f0f\u4e3a6-20\u4e2a\u5b57\u6bcd\u6216\u6570\u5b57",2);Object(v.b)({old_password:s.state.oldPassword,new_password:s.state.NewPassword}).then(function(e){e.status&&(f.a.info(e.msg,2),s.props.dispatch(k.g),E.a.remove("m:auth"),setTimeout(function(){s.props.history.replace("/tabs/user")},1200))}).catch(function(e){2002===e.errCode&&(s.props.dispatch(k.g),E.a.remove("m:auth"),f.a.info(e.errMsg,2),setTimeout(function(){s.props.history.replace("/tabs/user")},1200)),f.a.info(e.errMsg,2)})}},o=n,r(s,o)}return s(t,e),S(t,[{key:"render",value:function(){var e=this;return d.a.createElement("div",{className:g.a.ChangePasswprdWrap},d.a.createElement(u.a,{mode:"dark",onLeftClick:function(){e.props.history.go(-1)}},"\u4fee\u6539\u5bc6\u7801"),d.a.createElement("div",{className:g.a.inputBox},d.a.createElement("div",{className:g.a.inputItem},d.a.createElement("input",{onChange:this.passworOnchange,ref:"oldPassword",placeholder:"\u8bf7\u8f93\u5165\u539f\u59cb\u5bc6\u7801",type:this.state.type1?"text":"password"}),d.a.createElement("div",{onClick:function(){return e.changeType("type1")},className:g.a.changeimg},d.a.createElement("img",{src:this.state.type1?y.a:A.a,alt:""}))),d.a.createElement("div",{className:g.a.inputItem},d.a.createElement("input",{onChange:this.passworOnchange,ref:"password",placeholder:"\u65b0\u5bc6\u7801\uff086-20\u4e2a\u5b57\u6bcd\u6216\u6570\u5b57\uff09",maxLength:"20",type:this.state.type2?"text":"password"}),d.a.createElement("div",{onClick:function(){return e.changeType("type2")},className:g.a.changeimg},d.a.createElement("img",{src:this.state.type2?y.a:A.a,alt:""}))),d.a.createElement("div",{className:g.a.inputItem},d.a.createElement("input",{onChange:this.passworOnchange,ref:"NewPassword",placeholder:"\u518d\u6b21\u8f93\u5165\u65b0\u5bc6\u7801",maxLength:"20",type:this.state.type3?"text":"password"}),d.a.createElement("div",{onClick:function(){return e.changeType("type3")},className:g.a.changeimg},d.a.createElement("img",{src:this.state.type3?y.a:A.a,alt:""})))),d.a.createElement("div",{onClick:this.handleChange,className:g.a.btn+" "+(this.state.disable?null:g.a.disable)},d.a.createElement("p",null,"\u4fee\u6539")))}}]),t}(p.PureComponent))||i;t.default=J},675:function(e,t,n){"use strict";function a(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var r=n(103),s=a(r),o=n(65),i=a(o),c=n(68),u=a(c),l=n(66),f=a(l),p=n(67),d=a(p),m=n(77),h=a(m),g=n(5),b=a(g),A=function(e,t){var n={};for(var a in e)Object.prototype.hasOwnProperty.call(e,a)&&t.indexOf(a)<0&&(n[a]=e[a]);if(null!=e&&"function"===typeof Object.getOwnPropertySymbols)for(var r=0,a=Object.getOwnPropertySymbols(e);r<a.length;r++)t.indexOf(a[r])<0&&(n[a[r]]=e[a[r]]);return n},w=function(e){function t(){return(0,i.default)(this,t),(0,f.default)(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return(0,d.default)(t,e),(0,u.default)(t,[{key:"render",value:function(){var e=this.props,t=e.prefixCls,n=e.className,a=e.children,r=e.mode,o=e.icon,i=e.onLeftClick,c=e.leftContent,u=e.rightContent,l=A(e,["prefixCls","className","children","mode","icon","onLeftClick","leftContent","rightContent"]);return b.default.createElement("div",(0,s.default)({},l,{className:(0,h.default)(n,t,t+"-"+r)}),b.default.createElement("div",{className:t+"-left",role:"button",onClick:i},o?b.default.createElement("span",{className:t+"-left-icon","aria-hidden":"true"},o):null,c),b.default.createElement("div",{className:t+"-title"},a),b.default.createElement("div",{className:t+"-right"},u))}}]),t}(b.default.Component);t.default=w,w.defaultProps={prefixCls:"am-navbar",mode:"dark",onLeftClick:function(){}},e.exports=t.default}});