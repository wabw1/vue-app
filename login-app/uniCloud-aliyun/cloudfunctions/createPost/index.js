'use strict';
const db = uniCloud.database()
exports.main = async (event, context) => {
  const postCollection = db.collection('post');
  const { userId, content, images } = event; //用户传来的信息
  await postCollection.add({
    name: userId, //是人名...
    text: content,
    time: new Date().toLocaleString(),
    imgSrc: images,
    avaSrc: 'https://cdn.pixabay.com/photo/2021/11/12/03/04/woman-6787784_1280.png',
    thumbup: 0,
    thumbdown: 0,
    commentCnt: 0
  })

  //返回数据给客户端
  return {
    code: '200',
    msg: '上传 post 成功'
  }
};
