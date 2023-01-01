"use strict";const e=require("../../common/vendor.js"),u={data(){return{formData:{username:"",passward:""},userData:{},rules:{username:{rules:[{required:!0,errorMessage:"\u4E0D\u80FD\u4E3A\u7A7A"}]},password:{rules:[{required:!0,errorMessage:"\u4E0D\u80FD\u4E3A\u7A7A"},{minLength:3,maxLength:10,errorMessage:"\u5BC6\u7801\u957F\u5EA6\u5728 {minLength} \u5230 {maxLength} \u4E2A\u5B57\u7B26"}]}}}},methods:{goBack(){e.index.navigateBack()},loginCaptcha(){e.index.navigateTo({url:"/pages/login/login-sms"})},forgetPwd(){e.index.showToast({title:"\u5FD8\u8BB0\u5BC6\u7801",icon:"error"})},loginPwd(){this.$refs.form.validate().then(n=>{console.log("\u8868\u5355\u4FE1\u606F\uFF1A",n),this.userData=n,e.index.showLoading({title:"\u767B\u9646\u6210\u529F\uFF0C\u8DF3\u8F6C\u5230\u9996\u9875..."}),setTimeout(()=>{e.index.hideLoading(),e.index.navigateTo({url:"/pages/message/message"})},1e3)}).catch(n=>{console.log("\u6821\u9A8C\u5931\u8D25,\u9519\u8BEF\u4FE1\u606F\uFF1A",n)})}}};if(!Array){const n=e.resolveComponent("uni-icons"),i=e.resolveComponent("uni-easyinput"),a=e.resolveComponent("uni-forms-item"),t=e.resolveComponent("social-links"),s=e.resolveComponent("uni-forms");(n+i+a+t+s)()}const m=()=>"../../uni_modules/uni-icons/components/uni-icons/uni-icons.js",c=()=>"../../uni_modules/uni-easyinput/components/uni-easyinput/uni-easyinput.js",l=()=>"../../uni_modules/uni-forms/components/uni-forms-item/uni-forms-item.js",p=()=>"../../components/social-links/social-links.js",_=()=>"../../uni_modules/uni-forms/components/uni-forms/uni-forms.js";Math||(m+c+l+p+_)();function d(n,i,a,t,s,r){return{a:e.o(r.goBack),b:e.p({type:"closeempty",size:"60rpx"}),c:e.o(o=>s.formData.username=o),d:e.p({inputBorder:!1,placeholder:"\u6635\u79F0/\u624B\u673A\u53F7/\u90AE\u7BB1",placeholderStyle:"font-size:16px",modelValue:s.formData.username}),e:e.p({name:"username"}),f:e.o(o=>s.formData.password=o),g:e.p({inputBorder:!1,type:"password",placeholder:"\u8BF7\u8F93\u5165\u5BC6\u7801",placeholderStyle:"font-size:16px",modelValue:s.formData.password}),h:e.o((...o)=>r.forgetPwd&&r.forgetPwd(...o)),i:e.p({name:"password"}),j:e.o((...o)=>r.loginPwd&&r.loginPwd(...o)),k:e.o((...o)=>r.loginCaptcha&&r.loginCaptcha(...o)),l:e.sr("form","ed63c5a0-1"),m:e.p({rules:s.rules,model:s.formData})}}const g=e._export_sfc(u,[["render",d],["__scopeId","data-v-ed63c5a0"],["__file","/Users/wangbo/Desktop/HBuilderProjects/login-app/pages/login/login-pwd.vue"]]);wx.createPage(g);