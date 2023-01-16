
  ;(function(){
  let u=void 0,isReady=false,onReadyCallbacks=[],isServiceReady=false,onServiceReadyCallbacks=[];
  const __uniConfig = {"pages":[],"globalStyle":{"homeButton":true,"navigationBar":{"type":"default","backgroundColor":"#82AAE3","titleColor":"#fff"},"isNVue":false},"nvue":{"compiler":"uni-app","styleCompiler":"uni-app","flex-direction":"column"},"renderer":"auto","appname":"todo-list","splashscreen":{"alwaysShowBeforeRender":true,"autoclose":true},"compilerVersion":"3.6.17","entryPagePath":"pages/home/home","entryPageQuery":"","realEntryPagePath":"","networkTimeout":{"request":60000,"connectSocket":60000,"uploadFile":60000,"downloadFile":60000},"tabBar":{"position":"bottom","color":"#7A7E83","selectedColor":"#82AAE3","borderStyle":"black","blurEffect":"none","fontSize":"10px","iconWidth":"24px","spacing":"3px","height":"50px","backgroundColor":"#ffffff","list":[{"pagePath":"pages/home/home","iconPath":"/static/icons/home.png","selectedIconPath":"/static/icons/home_ac.png","text":"首页"},{"pagePath":"pages/story/story","iconPath":"/static/icons/star.png","selectedIconPath":"/static/icons/star_ac.png","text":"动态"},{"pagePath":"pages/message/message","iconPath":"/static/icons/message.png","selectedIconPath":"/static/icons/message_ac.png","text":"消息"},{"pagePath":"pages/profile/profile","iconPath":"/static/icons/me.png","selectedIconPath":"/static/icons/me_ac.png","text":"我的"}],"selectedIndex":0,"shown":true},"locales":{},"darkmode":false,"themeConfig":{}};
  const __uniRoutes = [{"path":"pages/home/home","meta":{"isQuit":true,"isEntry":true,"isTabBar":true,"tabBarIndex":0,"navigationBar":{"titleText":"首页","type":"default","titleColor":"#fff","buttons":[{"fontSrc":"/static/iconfont.ttf","text":"","width":"40px","fontSize":"34px","color":"#fff","background":"rgba(0,0,0,0)"}],"searchInput":{"autoFocus":false,"align":"center","color":"#000","backgroundColor":"#fff","borderRadius":"6px","placeholder":"搜索帖子","placeholderColor":"#CCCCCC","disabled":true}},"isNVue":false}},{"path":"pages/story/story","meta":{"isQuit":true,"isTabBar":true,"tabBarIndex":1,"enablePullDownRefresh":true,"navigationBar":{"titleText":"动态","type":"default","buttons":[{"type":"share","fontSize":"27px","text":""}],"autoBackButton":true},"isNVue":false}},{"path":"pages/home/search-detail/search-detail","meta":{"navigationBar":{"titleText":"搜索","type":"default","titleColor":"#fff","buttons":[{"fontSrc":"/static/uni.ttf","text":"","width":"auto","fontSize":"28px","color":"#fff"}],"searchInput":{"autoFocus":true,"align":"center","color":"#000","backgroundColor":"#fff","borderRadius":"6px","placeholder":"搜索帖子 ","placeholderColor":"#CCCCCC","disabled":false}},"isNVue":false}},{"path":"pages/message/message","meta":{"isQuit":true,"isTabBar":true,"tabBarIndex":2,"navigationBar":{"titleText":"消息","type":"default"},"isNVue":false}},{"path":"pages/profile/profile","meta":{"isQuit":true,"isTabBar":true,"tabBarIndex":3,"navigationBar":{"titleText":"我的","type":"default"},"isNVue":false}},{"path":"pages/login/login-pwd","meta":{"navigationBar":{"titleText":"密码","type":"default"},"isNVue":false}},{"path":"pages/login/login-sms","meta":{"navigationBar":{"titleText":"验证码","type":"default"},"isNVue":false}},{"path":"pages/search/search","meta":{"navigationBar":{"titleText":"搜索页","style":"default","type":"default"},"isNVue":false}}].map(uniRoute=>(uniRoute.meta.route=uniRoute.path,__uniConfig.pages.push(uniRoute.path),uniRoute.path='/'+uniRoute.path,uniRoute));
  __uniConfig.styles=[];//styles
  __uniConfig.onReady=function(callback){if(__uniConfig.ready){callback()}else{onReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"ready",{get:function(){return isReady},set:function(val){isReady=val;if(!isReady){return}const callbacks=onReadyCallbacks.slice(0);onReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
  __uniConfig.onServiceReady=function(callback){if(__uniConfig.serviceReady){callback()}else{onServiceReadyCallbacks.push(callback)}};Object.defineProperty(__uniConfig,"serviceReady",{get:function(){return isServiceReady},set:function(val){isServiceReady=val;if(!isServiceReady){return}const callbacks=onServiceReadyCallbacks.slice(0);onServiceReadyCallbacks.length=0;callbacks.forEach(function(callback){callback()})}});
  service.register("uni-app-config",{create(a,b,c){if(!__uniConfig.viewport){var d=b.weex.config.env.scale,e=b.weex.config.env.deviceWidth,f=Math.ceil(e/d);Object.assign(__uniConfig,{viewport:f,defaultFontSize:16})}return{instance:{__uniConfig:__uniConfig,__uniRoutes:__uniRoutes,global:u,window:u,document:u,frames:u,self:u,location:u,navigator:u,localStorage:u,history:u,Caches:u,screen:u,alert:u,confirm:u,prompt:u,fetch:u,XMLHttpRequest:u,WebSocket:u,webkit:u,print:u}}}}); 
  })();
  