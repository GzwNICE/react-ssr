/*!
 * ****************************************
 * hash       : 8e93567b1c1933e65887
 * name       : 55
 * file       : static/js/55.f3565d7e.chunk.js
 * author     : 张骥-Tom,高志文-Remady
 * repository : https://gitee.com/veryeast/ve_m_ssr.git
 * ****************************************
 */
webpackJsonp([55],{1097:function(e,t,a){"use strict";a.d(t,"c",function(){return o}),a.d(t,"b",function(){return l}),a.d(t,"a",function(){return c});var n=a(84),r=a.n(n),i=a(13),o=function(e){var t=r.a.get("captcha_key"),a=Object.assign({appid:1,return_type:"json",captcha_key:t},e);return Object(i.c)(":ve.sso/u/mobile_verify_code",a)},l=function(e){var t=r.a.get("captcha_key"),a=Object.assign({appid:1,return_type:"json",captcha_key:t},e);return Object(i.c)(":ve.mobile.interface/user/email_verify_code",a)},c=function(e){var t=r.a.get("captcha_key"),a=Object.assign({appid:1,return_type:"json",captcha_key:t},e);return Object(i.c)(":ve.mobile.interface/user/email_verify",a)}},1319:function(e,t,a){var n=a(1320);"string"===typeof n&&(n=[[e.i,n,""]]);var r={};r.transform=void 0;a(618)(n,r);n.locals&&(e.exports=n.locals)},1320:function(e,t,a){t=e.exports=a(617)(!1),t.push([e.i,"._1kBamd_{background-color:#fff;height:100%}._3YRUakB{padding:.25rem .3rem 0;margin-bottom:.4rem}._32upTlx{text-align:center;font-size:.13rem;color:hsla(0,0%,64%,.5);padding-top:.1rem}._32upTlx .In3zofP{font-size:.16rem;color:#4a4a4a;letter-spacing:.025rem;line-height:.26rem}._2ospt4i{-ms-flex-align:center;-ms-flex-pack:justify}._1x9UiIj,._2ospt4i{display:-ms-flexbox;display:flex;align-items:center;justify-content:space-between}._1x9UiIj{-ms-flex:1 1;flex:1 1;height:.5rem;border-bottom:.01rem solid hsla(252,5%,79%,.5);-ms-flex-align:center;-ms-flex-pack:justify;font-size:.16rem;color:#333}._1x9UiIj input{-ms-flex:1 1;flex:1 1;height:.4rem;font-size:.13rem}._1x9UiIj .jjPQUrV{width:.25rem}._1x9UiIj .jjPQUrV img{width:.2rem}._3Kayd5h{width:1.4rem;height:.5rem;padding-left:.1rem;line-height:.5rem;font-size:.15rem;color:#ff4f00}._3Kayd5h img{width:.7rem;height:.28rem}.T6MOHA8{padding:0 .3rem;height:.4rem;text-align:center;line-height:.4rem;font-size:.17rem;color:#fff}.T6MOHA8 p{background-color:#ff4f00;border-radius:.08rem}._3VOPRh0{color:#f48051!important}._370UdL_{color:hsla(0,0%,64%,.5)!important}",""]),t.locals={bindEmailWrap:"_1kBamd_",inputBox:"_3YRUakB",top:"_32upTlx",email:"In3zofP",userItem:"_2ospt4i",inputItem:"_1x9UiIj",changeimg:"jjPQUrV",clickBox:"_3Kayd5h",btn:"T6MOHA8",disable:"_3VOPRh0",disabledCode:"_370UdL_"}},640:function(e,t,a){"use strict";function n(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function r(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!==typeof t&&"function"!==typeof t?e:t}function i(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var o,l,c=a(686),s=a.n(c),u=a(244),f=a.n(u),d=a(5),m=a.n(d),p=a(241),h=a(73),b=a.n(h),_=a(1319),g=a.n(_),y=a(247),v=a(1097),x=function(){function e(e,t){for(var a=0;a<t.length;a++){var n=t[a];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,a,n){return a&&e(t.prototype,a),n&&e(t,n),t}}(),j=(o=Object(p.b)(function(e){return{auth:e.auth}}))(l=function(e){function t(){var e,a,i,o;n(this,t);for(var l=arguments.length,c=Array(l),s=0;s<l;s++)c[s]=arguments[s];return a=i=r(this,(e=t.__proto__||Object.getPrototypeOf(t)).call.apply(e,[this].concat(c))),i.state={disabled:!1,email:"",code:"",tipFont:"\u83b7\u53d6\u9a8c\u8bc1\u7801",disableCode:!0,index:60},i.onChange=function(){var e=i.refs.code.value;e.length>0&&i.setState({disable:!0}),i.setState({code:e})},i.emailOnchange=function(){var e=i.refs.email.value;e.length>0&&i.setState({disabled:!0,email:e})},i.Clear=function(){i.setState({disableCode:!0,index:60,tipFont:"\u83b7\u53d6\u9a8c\u8bc1\u7801"}),clearInterval(i.timer)},i.onBlurInput=function(){document.body.scrollTop=0},i.getCode=function(){if(!y.a.changeEmail(i.state.email))return f.a.info("\u8bf7\u8f93\u5165\u6b63\u786e\u7684\u90ae\u7bb1",2);if(i.state.disableCode){var e=function(e){Object(v.b)({email:i.state.email,tx_ticket:e.ticket,tx_randstr:e.randstr,tx_type:1}).then(function(e){var t=e.msg,a=e.errMsg;0===e.status?(t||a)&&f.a.fail(t||a,2):i.timer=setInterval(function(){if(i.state.index<=0)return i.Clear();i.setState({disableCode:!1,index:i.state.index-1,tipFont:"\u5df2\u53d1\u9001("+(i.state.index-1)+"s)"})},1e3)})};new window.TencentCaptcha("2096087700",function(t){0===t.ret&&e(t)}).show()}},i.bindEmail=function(){if(i.state.disabled){var e=i.state.email,t=i.state.code;y.a.changeEmail(e)?Object(v.a)({email:e,code:t,return_type:"json"}).then(function(t){var a=t.msg,n=t.errMsg;1!==t.status?(i.props.form.setFieldsValue({code:""}),(n||a)&&f.a.fail(n||a,2)):f.a.success("\u7ed1\u5b9a\u6210\u529f",2,function(){b.a.set("m:auth",Object.assign({},i.props.auth,{email:e})),i.props.dispatch({type:"CHANGE_BIND_EMAIL"}),i.props.history.goBack()})}).catch(function(e){return f.a.info(e.errMsg,2)}):f.a.info("\u8bf7\u8f93\u5165\u6b63\u786e\u7684\u90ae\u7bb1",2)}},o=a,r(i,o)}return i(t,e),x(t,[{key:"render",value:function(){var e=this,t=this.props.auth.email,a=t?m.a.createElement("div",null,m.a.createElement("p",null,"\u5f53\u524d\u7ed1\u5b9a\u90ae\u7bb1\uff1a",y.a.hidden_email(t),"\uff0c\u66f4\u6539\u540e\uff0c\u8bf7\u7528\u65b0\u90ae\u7bb1\u63a5\u6536\u6295\u9012\u7b80\u5386\u53cd\u9988\u901a\u77e5\u3001\u627e\u56de\u5bc6\u7801\u7b49")):m.a.createElement("div",null,"\u8bf7\u7ed1\u5b9a\u5e38\u7528\u90ae\u7bb1\uff0c\u7ed1\u5b9a\u540e\uff0c\u53ef\u7528\u4e8e\u63a5\u6536\u6295\u9012\u7b80\u5386\u53cd\u9988\u901a\u77e5\uff0c\u627e\u56de\u5bc6\u7801\u7b49");return m.a.createElement("div",{className:g.a.bindEmailWrap},m.a.createElement(s.a,{mode:"dark",onLeftClick:function(){e.props.history.go(-1)}},"\u7ed1\u5b9a\u90ae\u7bb1"),m.a.createElement("div",{className:g.a.inputBox},a,m.a.createElement("div",{className:g.a.userItem},m.a.createElement("div",{className:g.a.inputItem},m.a.createElement("input",{onChange:this.emailOnchange,ref:"email",placeholder:"\u8bf7\u8f93\u5165\u90ae\u7bb1",type:"text",onBlur:this.onBlurInput}))),m.a.createElement("div",{className:g.a.userItem},m.a.createElement("div",{className:g.a.inputItem},m.a.createElement("input",{onChange:this.onChange,ref:"code",placeholder:"\u8bf7\u8f93\u5165\u90ae\u7bb1\u9a8c\u8bc1\u7801",type:"text",onBlur:this.onBlurInput})),m.a.createElement("div",{onClick:this.getCode,id:"TencentCaptcha","data-appid":"2096087700","data-cbfn":"callbackdfws",className:g.a.clickBox+" "+(this.state.disableCode?null:g.a.disabledCode)},this.state.tipFont))),m.a.createElement("div",{onClick:this.bindEmail,className:g.a.btn+" "+(this.state.disabled?null:g.a.disable)},m.a.createElement("p",null,t?"\u66f4\u6539\u7ed1\u5b9a":"\u7acb\u5373\u7ed1\u5b9a")))}}]),t}(d.PureComponent))||l;t.default=j},686:function(e,t,a){"use strict";function n(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var r=a(105),i=n(r),o=a(66),l=n(o),c=a(69),s=n(c),u=a(67),f=n(u),d=a(68),m=n(d),p=a(79),h=n(p),b=a(5),_=n(b),g=function(e,t){var a={};for(var n in e)Object.prototype.hasOwnProperty.call(e,n)&&t.indexOf(n)<0&&(a[n]=e[n]);if(null!=e&&"function"===typeof Object.getOwnPropertySymbols)for(var r=0,n=Object.getOwnPropertySymbols(e);r<n.length;r++)t.indexOf(n[r])<0&&(a[n[r]]=e[n[r]]);return a},y=function(e){function t(){return(0,l.default)(this,t),(0,f.default)(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return(0,m.default)(t,e),(0,s.default)(t,[{key:"render",value:function(){var e=this.props,t=e.prefixCls,a=e.className,n=e.children,r=e.mode,o=e.icon,l=e.onLeftClick,c=e.leftContent,s=e.rightContent,u=g(e,["prefixCls","className","children","mode","icon","onLeftClick","leftContent","rightContent"]);return _.default.createElement("div",(0,i.default)({},u,{className:(0,h.default)(a,t,t+"-"+r)}),_.default.createElement("div",{className:t+"-left",role:"button",onClick:l},o?_.default.createElement("span",{className:t+"-left-icon","aria-hidden":"true"},o):null,c),_.default.createElement("div",{className:t+"-title"},n),_.default.createElement("div",{className:t+"-right"},s))}}]),t}(_.default.Component);t.default=y,y.defaultProps={prefixCls:"am-navbar",mode:"dark",onLeftClick:function(){}},e.exports=t.default}});