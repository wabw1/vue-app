'use strict';
const db = uniCloud.database(); // 混用一个数据库

exports.main = async (event, context) => {
  const postCollection = db.collection('post');
  // 获取指定 id 帖子
  const res = await postCollection.doc(event.id).get(); // 获取指定 id

  //返回obj给客户端
  return {
    msg: "获取指定 id 成功",
    code: 200,
    data: res.data
  };
};
