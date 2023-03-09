'use strict';
// 更新用户关注人
const db = uniCloud.database();
const dbCmd = db.command; //数据库操作符, 用于增删
exports.main = async (event, context) => {
  //event为客户端上传的参数
  const {
    userId,
    followId
  } = event;

  const user = await db.collection('users').doc(userId).get(); //获取 user 对象
  const friends_ids = user.data[0].friends_ids;
  // 判断是否在 list 里, 不在就加入, 在就移除
  let new_friends_ids = null;
  if (friends_ids.includes(followId)) {
    new_friends_ids = dbCmd.pull(followId);
  } else {
    new_friends_ids = dbCmd.addToSet(followId)
  }
  await db.collection('users').doc(userId).update({
    friends_ids: new_friends_ids
  })
  //返回数据给客户端
  return {
    msg: '更新关注人成功',
    code: 200,
  }
};
