(function(e){function t(t){for(var s,o,c=t[0],i=t[1],u=t[2],p=0,d=[];p<c.length;p++)o=c[p],Object.prototype.hasOwnProperty.call(a,o)&&a[o]&&d.push(a[o][0]),a[o]=0;for(s in i)Object.prototype.hasOwnProperty.call(i,s)&&(e[s]=i[s]);l&&l(t);while(d.length)d.shift()();return n.push.apply(n,u||[]),r()}function r(){for(var e,t=0;t<n.length;t++){for(var r=n[t],s=!0,c=1;c<r.length;c++){var i=r[c];0!==a[i]&&(s=!1)}s&&(n.splice(t--,1),e=o(o.s=r[0]))}return e}var s={},a={app:0},n=[];function o(t){if(s[t])return s[t].exports;var r=s[t]={i:t,l:!1,exports:{}};return e[t].call(r.exports,r,r.exports,o),r.l=!0,r.exports}o.m=e,o.c=s,o.d=function(e,t,r){o.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},o.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},o.t=function(e,t){if(1&t&&(e=o(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(o.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var s in e)o.d(r,s,function(t){return e[t]}.bind(null,s));return r},o.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return o.d(t,"a",t),t},o.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},o.p="/v2/";var c=window["webpackJsonp"]=window["webpackJsonp"]||[],i=c.push.bind(c);c.push=t,c=c.slice();for(var u=0;u<c.length;u++)t(c[u]);var l=i;n.push([0,"chunk-vendors"]),r()})({0:function(e,t,r){e.exports=r("56d7")},"56d7":function(e,t,r){"use strict";r.r(t);r("e260"),r("e6cf"),r("cca6"),r("a79d");var s=r("2b0e"),a=r("7496"),n=r("40dc"),o=r("8336"),c=r("b0af"),i=r("99d9"),u=r("62ad"),l=r("a523"),p=r("ce7e"),d=r("4bd4"),f=r("132d"),g=r("f6c4"),h=r("490a"),m=r("0fd9"),b=r("8dd9"),y=r("a844"),v=r("2a7f"),w=(r("498a"),function(){var e=this,t=e._self._c;return t(a["a"],[t(n["a"],{attrs:{app:"",color:"primary",dark:""}},[t(v["a"],[e._v("Chatbot Interface")])],1),t(g["a"],[t(l["a"],{staticClass:"fill-height",attrs:{fluid:""}},[t(m["a"],{attrs:{justify:"center"}},[t(u["a"],{attrs:{cols:"12",sm:"10",md:"8",lg:"6"}},[t(c["a"],{staticClass:"elevation-12 chat-container"},[t(i["c"],{staticClass:"headline"},[e._v(" Chat with AI Assistant ")]),t(i["b"],{ref:"chatMessages",staticClass:"chat-messages"},[e._l(e.messages,(function(r,s){return t(b["a"],{key:s,class:["message-bubble mb-3",r.isUser?"user-message":"bot-message"],attrs:{color:r.isUser?"primary lighten-4":"grey lighten-3",rounded:""}},[t("div",{staticClass:"pa-3"},[t("div",{staticClass:"message-sender font-weight-bold"},[e._v(" "+e._s(r.isUser?"You":"AI Assistant")+" ")]),t("div",{staticClass:"message-content",domProps:{innerHTML:e._s(e.formatMessage(r.text))}})])])})),e.loading?t("div",{staticClass:"text-center my-4"},[t(h["a"],{attrs:{indeterminate:"",color:"primary"}})],1):e._e()],2),t(p["a"]),t(i["a"],[t(d["a"],{staticClass:"message-form",on:{submit:function(t){return t.preventDefault(),e.sendMessage.apply(null,arguments)}}},[t(m["a"],{attrs:{"no-gutters":""}},[t(u["a"],{attrs:{cols:"12"}},[t(y["a"],{attrs:{outlined:"",rows:"2","auto-grow":"","hide-details":"",placeholder:"Type your message here..."},on:{keydown:function(t){return!t.type.indexOf("key")&&e._k(t.keyCode,"enter",13,t.key,"Enter")?null:(t.preventDefault(),e.sendMessage.apply(null,arguments))}},model:{value:e.userInput,callback:function(t){e.userInput=t},expression:"userInput"}})],1),t(u["a"],{staticClass:"d-flex justify-end mt-2",attrs:{cols:"12"}},[t(o["a"],{attrs:{color:"primary",disabled:!e.userInput.trim()||e.loading},on:{click:e.sendMessage}},[t(f["a"],{attrs:{left:""}},[e._v("mdi-send")]),e._v(" Send ")],1)],1)],1)],1)],1)],1)],1)],1)],1)],1)],1)}),x=[],k=r("c7eb"),_=r("1da1"),I=(r("d9e2"),r("99af"),r("14d9"),r("ac1f"),r("5319"),r("bc3a")),O=r.n(I),j={name:"App",data:function(){return{userInput:"",messages:[{text:"Hello! I am your AI assistant. How can I help you today?",isUser:!1}],loading:!1,apiUrl:"http://localhost/chat",username:"user"}},methods:{sendMessage:function(){var e=this;return Object(_["a"])(Object(k["a"])().mark((function t(){var r,s;return Object(k["a"])().wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(e.userInput.trim()&&!e.loading){t.next=2;break}return t.abrupt("return");case 2:return r=e.userInput.trim(),e.messages.push({text:r,isUser:!0}),e.userInput="",e.loading=!0,e.$nextTick((function(){e.scrollToBottom()})),t.prev=7,t.next=10,O.a.post(e.apiUrl,{username:e.username,query:r});case 10:if(s=t.sent,"success"!==s.data.status){t.next=15;break}e.messages.push({text:s.data.message||"Sorry, I could not process your request.",isUser:!1}),t.next=16;break;case 15:throw new Error(s.data.message||"Unknown error");case 16:t.next=22;break;case 18:t.prev=18,t.t0=t["catch"](7),console.error("Error calling API:",t.t0),e.messages.push({text:"Sorry, there was an error processing your request. Please try again later.",isUser:!1});case 22:return t.prev=22,e.loading=!1,e.$nextTick((function(){e.scrollToBottom()})),t.finish(22);case 26:case"end":return t.stop()}}),t,null,[[7,18,22,26]])})))()},scrollToBottom:function(){if(this.$refs.chatMessages){var e=this.$refs.chatMessages.$el;e.scrollTop=e.scrollHeight}},formatMessage:function(e){return e.replace(/https?:\/\/[^\s]+/g,(function(e){return'<a href="'.concat(e,'" target="_blank">').concat(e,"</a>")})).replace(/\n/g,"<br>")}},mounted:function(){this.scrollToBottom()}},C=j,M=(r("d009"),r("2877")),T=Object(M["a"])(C,w,x,!1,null,null,null),P=T.exports,U=r("ce5b"),A=r.n(U);r("bf40");s["default"].config.productionTip=!1,s["default"].use(A.a),new s["default"]({vuetify:new A.a({theme:{dark:!1,themes:{light:{primary:"#1976D2",secondary:"#424242",accent:"#82B1FF",error:"#FF5252",info:"#2196F3",success:"#4CAF50",warning:"#FFC107"}}}}),render:function(e){return e(P)}}).$mount("#app")},ca04:function(e,t,r){},d009:function(e,t,r){"use strict";r("ca04")}});