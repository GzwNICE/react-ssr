/*!
 * ****************************************
 * hash       : 2676a1b39e83985f1450
 * name       : 57
 * file       : static/js/57.3122a33e.chunk.js
 * author     : 黄超-Faker,运帅-Mark,朱少林-Grabb
 * repository : https://gitee.com/veryeast/ve_m_ssr.git
 * ****************************************
 */
webpackJsonp([57],{1311:function(e,t,n){var o=n(1312);"string"===typeof o&&(o=[[e.i,o,""]]);var r={};r.transform=void 0;n(612)(o,r);o.locals&&(e.exports=o.locals)},1312:function(e,t,n){t=e.exports=n(611)(!1),t.push([e.i,".imJaqRv{background-color:#fff;height:100%;font-size:.18rem;color:#333;text-align:center;display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;-webkit-overflow-scrolling:touch}.yOa-GBy{padding:.25rem 0;color:#000;height:.225rem}._2r80gSG{height:.5rem;border-bottom:.01rem solid hsla(252,5%,79%,.3);border-top:.01rem solid hsla(252,5%,79%,.3);padding:0 .2rem;display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;margin-bottom:.1rem}._2r80gSG input{width:100%;font-size:.14rem}._2NmMyEu{-ms-flex:1 1;flex:1 1;overflow-y:scroll}._2uWn1Ip{padding-left:.2rem}._2uWn1Ip .nHulV3s{text-align:left;padding-right:.2rem;font-size:.14rem;height:.4rem;line-height:.4rem;border-bottom:.01rem solid hsla(252,5%,79%,.3);white-space:nowrap;overflow:hidden;-o-text-overflow:ellipsis;text-overflow:ellipsis}",""]),t.locals={AddCompanyWrap:"imJaqRv",font:"yOa-GBy",inputBox:"_2r80gSG",ListBox:"_2NmMyEu",addCompanyItem:"_2uWn1Ip",connent:"nHulV3s"}},631:function(e,t,n){"use strict";function o(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function r(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!==typeof t&&"function"!==typeof t?e:t}function a(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var i,l,c,s,p=n(242),f=n.n(p),u=n(5),m=n.n(u),d=n(1311),h=n.n(d),y=n(239),b=n(162),g=function(){function e(e,t){for(var n=0;n<t.length;n++){var o=t[n];o.enumerable=o.enumerable||!1,o.configurable=!0,"value"in o&&(o.writable=!0),Object.defineProperty(e,o.key,o)}}return function(t,n,o){return n&&e(t.prototype,n),o&&e(t,o),t}}(),v=(i=Object(y.b)(function(e){return{SearchList:e.Privacy.SearchList}}))((s=c=function(e){function t(){var e,n,a,i;o(this,t);for(var l=arguments.length,c=Array(l),s=0;s<l;s++)c[s]=arguments[s];return n=a=r(this,(e=t.__proto__||Object.getPrototypeOf(t)).call.apply(e,[this].concat(c))),a.state={type:1},a.addCompany=function(e){var t=a;a.props.dispatch(Object(b.e)({id:e})).then(function(){f.a.info("\u6dfb\u52a0\u6210\u529f",2),setTimeout(function(){t.props.history.go(-1)},1200)})},a.onChangeName=function(){var e=a.refs.name.value;a.props.dispatch(Object(b.h)({name:e}))},i=n,r(a,i)}return a(t,e),g(t,[{key:"render",value:function(){var e=this,t=this.props.SearchList;return console.log(this.props),m.a.createElement("div",{className:h.a.AddCompanyWrap},m.a.createElement("div",{className:h.a.font},"\u201c\u4e0d\u8ba9\u8fd9\u4e9b\u4f01\u4e1a\u53d1\u73b0\u6211\u201d"),m.a.createElement("div",{className:h.a.inputBox},m.a.createElement("input",{onChange:function(){return e.onChangeName()},ref:"name",type:"text",placeholder:"\u8f93\u5165\u4f60\u60f3\u5c4f\u853d\u7684\u516c\u53f8"})),m.a.createElement("div",{className:h.a.ListBox},t.map(function(t,n){return m.a.createElement("div",{key:n,onClick:function(){return e.addCompany(t.id)},className:h.a.addCompanyItem},m.a.createElement("div",{className:h.a.connent},t.value))})))}}]),t}(u.PureComponent),c.propTypes={},l=s))||l;t.default=v}});