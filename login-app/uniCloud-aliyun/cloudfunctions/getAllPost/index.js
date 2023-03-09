'use strict';
const db = uniCloud.database(); // 混用一个数据库

exports.main = async (event, context) => {
  // 新添加一条数据
  const postCollection = db.collection('post');
  const res = await postCollection.get(); // 获取所有

  //返回allpost 的数组给前端
  return res.data;
};
