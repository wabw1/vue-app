"use strict";const c=require("./validate.js"),a=require("./utils.js"),p=require("../../../../common/vendor.js"),g={name:"uniForms",emits:["validate","submit"],options:{virtualHost:!0},props:{value:{type:Object,default(){return null}},modelValue:{type:Object,default(){return null}},model:{type:Object,default(){return null}},rules:{type:Object,default(){return{}}},errShowType:{type:String,default:"undertext"},validateTrigger:{type:String,default:"submit"},labelPosition:{type:String,default:"left"},labelWidth:{type:[String,Number],default:""},labelAlign:{type:String,default:"left"},border:{type:Boolean,default:!1}},provide(){return{uniForm:this}},data(){return{formData:{},formRules:{}}},computed:{localData(){const e=this.model||this.modelValue||this.value;return e?a.deepCopy(e):{}}},watch:{rules:{handler:function(e,i){this.setRules(e)},deep:!0,immediate:!0}},created(){getApp().$vm.$.appContext.config.globalProperties.binddata||(getApp().$vm.$.appContext.config.globalProperties.binddata=function(i,t,r){if(r)this.$refs[r].setValue(i,t);else{let s;for(let u in this.$refs){const n=this.$refs[u];if(n&&n.$options&&n.$options.name==="uniForms"){s=n;break}}if(!s)return console.error("\u5F53\u524D uni-froms \u7EC4\u4EF6\u7F3A\u5C11 ref \u5C5E\u6027");s.setValue(i,t)}}),this.childrens=[],this.inputChildrens=[],this.setRules(this.rules)},methods:{setRules(e){this.formRules=Object.assign({},this.formRules,e),this.validator=new c.SchemaValidator(e)},setValue(e,i){let t=this.childrens.find(r=>r.name===e);return t?(this.formData[e]=a.getValue(e,i,this.formRules[e]&&this.formRules[e].rules||[]),t.onFieldChange(this.formData[e])):null},validate(e,i){return this.checkAll(this.formData,e,i)},validateField(e=[],i){e=[].concat(e);let t={};return this.childrens.forEach(r=>{const s=a.realName(r.name);e.indexOf(s)!==-1&&(t=Object.assign({},t,{[s]:this.formData[s]}))}),this.checkAll(t,[],i)},clearValidate(e=[]){e=[].concat(e),this.childrens.forEach(i=>{if(e.length===0)i.errMsg="";else{const t=a.realName(i.name);e.indexOf(t)!==-1&&(i.errMsg="")}})},submit(e,i,t){for(let r in this.dataValue)this.childrens.find(u=>u.name===r)&&this.formData[r]===void 0&&(this.formData[r]=this._getValue(r,this.dataValue[r]));return t||console.warn("submit \u65B9\u6CD5\u5373\u5C06\u5E9F\u5F03\uFF0C\u8BF7\u4F7F\u7528validate\u65B9\u6CD5\u4EE3\u66FF\uFF01"),this.checkAll(this.formData,e,i,"submit")},async checkAll(e,i,t,r){if(!this.validator)return;let s=[];for(let f in e){const l=this.childrens.find(o=>a.realName(o.name)===f);l&&s.push(l)}!t&&typeof i=="function"&&(t=i);let u;!t&&typeof t!="function"&&Promise&&(u=new Promise((f,l)=>{t=function(o,d){o?l(o):f(d)}}));let n=[],m=JSON.parse(JSON.stringify(e));for(let f in s){const l=s[f];let o=a.realName(l.name);const d=await l.onFieldChange(m[o]);if(d&&(n.push(d),this.errShowType==="toast"||this.errShowType==="modal"))break}Array.isArray(n)&&n.length===0&&(n=null),Array.isArray(i)&&i.forEach(f=>{let l=a.realName(f),o=a.getDataValue(f,this.localData);o!==void 0&&(m[l]=o)}),r==="submit"?this.$emit("submit",{detail:{value:m,errors:n}}):this.$emit("validate",n);let h={};return h=a.rawData(m,this.name),t&&typeof t=="function"&&t(n,h),u&&t?u:null},validateCheck(e){this.$emit("validate",e)},_getValue:a.getValue,_isRequiredField:a.isRequiredField,_setDataValue:a.setDataValue,_getDataValue:a.getDataValue,_realName:a.realName,_isRealName:a.isRealName,_isEqual:a.isEqual}};function _(e,i,t,r,s,u){return{}}const v=p._export_sfc(g,[["render",_],["__file","/Users/wangbo/Desktop/HBuilderProjects/login-app/uni_modules/uni-forms/components/uni-forms/uni-forms.vue"]]);wx.createComponent(v);
