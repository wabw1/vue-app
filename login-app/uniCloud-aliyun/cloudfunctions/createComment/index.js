'use strict';
exports.main = async (event, context) => {
  // 创建一个 comment:{
  // userId:'999',
  // userName:"匿名",
  // text:''
  // }

  console.log('event : ', event)

  //返回数据给客户端
  return event
};
