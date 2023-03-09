'use strict';
exports.main = async (event, context) => {
  const postCollection = db.collection('comments');
  // 获取指定 id 的评论
  const res = await postCollection.doc(event.id).get();

  //返回数据给客户端
  return {
    msg: "获取当前 id 的帖子评论成功",
    code: 200,
    data: res.data
  };
};
