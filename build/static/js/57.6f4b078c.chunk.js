/*!
 * ****************************************
 * hash       : 18933c6e8f01a145ec56
 * name       : 57
 * file       : static/js/57.6f4b078c.chunk.js
 * author     : 张骥-Tom,高志文-Remady
 * repository : https://gitee.com/veryeast/ve_m_ssr.git
 * ****************************************
 */
webpackJsonp([57],{1312:function(e,t,n){var r=n(1313);"string"===typeof r&&(r=[[e.i,r,""]]);var o={};o.transform=void 0;n(618)(r,o);r.locals&&(e.exports=r.locals)},1313:function(e,t,n){t=e.exports=n(617)(!1),t.push([e.i,".imJaqRv{background-color:#fff;height:100%;font-size:.18rem;color:#333;text-align:center;display:-ms-flexbox;display:flex;-ms-flex-direction:column;flex-direction:column;-webkit-overflow-scrolling:touch}.yOa-GBy{padding:.25rem 0;color:#000;height:.225rem}._2r80gSG{height:.5rem;border-bottom:.01rem solid hsla(252,5%,79%,.3);padding:0 .2rem;display:-ms-flexbox;display:flex;-ms-flex-align:center;align-items:center;margin-bottom:.1rem}._2r80gSG input{width:100%;font-size:.14rem}._2NmMyEu{-ms-flex:1 1;flex:1 1;overflow-y:scroll}._2uWn1Ip{padding-left:.2rem}._2uWn1Ip .nHulV3s{text-align:left;padding-right:.2rem;font-size:.14rem;height:.4rem;line-height:.4rem;border-bottom:.01rem solid hsla(252,5%,79%,.3);white-space:nowrap;overflow:hidden;-o-text-overflow:ellipsis;text-overflow:ellipsis}.Vtn2jBD{border-bottom:.01rem solid #f0f0f0}.Vtn2jBD .am-icon{color:#555}.Vtn2jBD .am-navbar-title{font-size:.16rem;color:#333}.Vtn2jBD .am-navbar-right span{padding:.12rem;margin-right:-.12rem;font-size:.15rem;color:#ff4f00}",""]),t.locals={AddCompanyWrap:"imJaqRv",font:"yOa-GBy",inputBox:"_2r80gSG",ListBox:"_2NmMyEu",addCompanyItem:"_2uWn1Ip",connent:"nHulV3s",nav:"Vtn2jBD"}},637:function(e,t,n){"use strict";function r(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}function o(e,t){if(!e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called");return!t||"object"!==typeof t&&"function"!==typeof t?e:t}function a(e,t){if("function"!==typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t);e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}Object.defineProperty(t,"__esModule",{value:!0});var i,l,c,f,s=n(686),u=n.n(s),p=n(240),m=n.n(p),d=n(244),h=n.n(d),y=n(5),v=n.n(y),b=n(1312),g=n.n(b),x=n(241),_=n(163),C=function(){function e(e,t){for(var n=0;n<t.length;n++){var r=t[n];r.enumerable=r.enumerable||!1,r.configurable=!0,"value"in r&&(r.writable=!0),Object.defineProperty(e,r.key,r)}}return function(t,n,r){return n&&e(t.prototype,n),r&&e(t,r),t}}(),O=(i=Object(x.b)(function(e){return{SearchList:e.Privacy.SearchList}}))((f=c=function(e){function t(){var e,n,a,i;r(this,t);for(var l=arguments.length,c=Array(l),f=0;f<l;f++)c[f]=arguments[f];return n=a=o(this,(e=t.__proto__||Object.getPrototypeOf(t)).call.apply(e,[this].concat(c))),a.state={type:1},a.addCompany=function(e){var t=a;a.props.dispatch(Object(_.e)({id:e})).then(function(){h.a.info("\u6dfb\u52a0\u6210\u529f",2),setTimeout(function(){t.props.history.go(-1)},1200)})},a.onChangeName=function(){var e=a.refs.name.value;a.props.dispatch(Object(_.h)({name:e}))},i=n,o(a,i)}return a(t,e),C(t,[{key:"render",value:function(){var e=this,t=this.props.SearchList;return v.a.createElement("div",{className:g.a.AddCompanyWrap},v.a.createElement(u.a,{mode:"light",className:g.a.nav,icon:v.a.createElement(m.a,{type:"left"}),onLeftClick:function(){e.props.history.go(-1)}},"\u9690\u79c1\u8bbe\u7f6e"),v.a.createElement("div",{className:g.a.inputBox},v.a.createElement("input",{onChange:function(){return e.onChangeName()},ref:"name",type:"text",placeholder:"\u8f93\u5165\u4f60\u60f3\u5c4f\u853d\u7684\u516c\u53f8"})),v.a.createElement("div",{className:g.a.ListBox},t.map(function(t,n){return v.a.createElement("div",{key:n,onClick:function(){return e.addCompany(t.id)},className:g.a.addCompanyItem},v.a.createElement("div",{className:g.a.connent},t.value))})))}}]),t}(y.PureComponent),c.propTypes={},l=f))||l;t.default=O},686:function(e,t,n){"use strict";function r(e){return e&&e.__esModule?e:{default:e}}Object.defineProperty(t,"__esModule",{value:!0});var o=n(105),a=r(o),i=n(66),l=r(i),c=n(69),f=r(c),s=n(67),u=r(s),p=n(68),m=r(p),d=n(79),h=r(d),y=n(5),v=r(y),b=function(e,t){var n={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&t.indexOf(r)<0&&(n[r]=e[r]);if(null!=e&&"function"===typeof Object.getOwnPropertySymbols)for(var o=0,r=Object.getOwnPropertySymbols(e);o<r.length;o++)t.indexOf(r[o])<0&&(n[r[o]]=e[r[o]]);return n},g=function(e){function t(){return(0,l.default)(this,t),(0,u.default)(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return(0,m.default)(t,e),(0,f.default)(t,[{key:"render",value:function(){var e=this.props,t=e.prefixCls,n=e.className,r=e.children,o=e.mode,i=e.icon,l=e.onLeftClick,c=e.leftContent,f=e.rightContent,s=b(e,["prefixCls","className","children","mode","icon","onLeftClick","leftContent","rightContent"]);return v.default.createElement("div",(0,a.default)({},s,{className:(0,h.default)(n,t,t+"-"+o)}),v.default.createElement("div",{className:t+"-left",role:"button",onClick:l},i?v.default.createElement("span",{className:t+"-left-icon","aria-hidden":"true"},i):null,c),v.default.createElement("div",{className:t+"-title"},r),v.default.createElement("div",{className:t+"-right"},f))}}]),t}(v.default.Component);t.default=g,g.defaultProps={prefixCls:"am-navbar",mode:"dark",onLeftClick:function(){}},e.exports=t.default}});