'use strict';
const db = uniCloud.database();
exports.main = async (event, context) => {
  const { userId } = event;

  const user = await db.collection('users').doc(userId).get();
  const friends_ids = user.data[0].friends_ids; // 获取用户 friends_id 列表
  console.log(friends_ids)
  //返回数据给客户端
  return {
    msg: '获取 friends_ids成功',
    code: 200,
    data: friends_ids
  }
};
