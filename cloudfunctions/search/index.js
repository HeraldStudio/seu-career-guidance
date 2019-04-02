// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
db = cloud.datebase()
// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  // openid: wxContext.OPENID,
  // appid: wxContext.APPID,
  // unionid: wxContext.UNIONID,
  // TODO: 鉴权

  let {college, majority, entryDate, graduationDate, schoolnum, name, jydw} = event

  if(schoolnum){
    db.collection('origin-data').where({schoolnum})
  }
}