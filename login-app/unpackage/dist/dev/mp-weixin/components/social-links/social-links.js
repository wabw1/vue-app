"use strict";const e=require("../../common/vendor.js"),l={name:"social-links",data(){return{}},methods:{loginWx(){console.log("\u5FAE\u4FE1\u767B\u5F55...")},loginQQ(){console.log("QQ\u767B\u5F55...")},loginWb(){console.log("\u5FAE\u535A\u767B\u5F55...")}}};function c(r,i,t,a,g,o){return{a:e.o((...n)=>o.loginWx&&o.loginWx(...n)),b:e.o((...n)=>o.loginQQ&&o.loginQQ(...n)),c:e.o((...n)=>o.loginWb&&o.loginWb(...n))}}const s=e._export_sfc(l,[["render",c],["__file","/Users/wangbo/Desktop/HBuilderProjects/login-app/components/social-links/social-links.vue"]]);wx.createComponent(s);