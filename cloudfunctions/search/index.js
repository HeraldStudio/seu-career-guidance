// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()
// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  // openid: wxContext.OPENID,
  // appid: wxContext.APPID,
  // unionid: wxContext.UNIONID,
  // TODO: 鉴权

  let {college, majority, entryDate, graduationDate, schoolnum, name, sjgzdwmc, degree ,page=1, pagesize=100} = event

  if(schoolnum){
    let res = await db.collection('origin-data').where({schoolnum}).get()
    return {list:res.data}
  }

  if(name){
    let res = await db.collection('origin-data').where({name}).get()
    return {list:res.data}
  }



  // 以下为模糊查询
  let query = {
    college, majority, entryDate, graduationDate, degree,
    sjgzdwmc: sjgzdwmc ? db.RegExp({
      regexp: `.*${sjgzdwmc}.*`,
      options: 'i',
    }):undefined
  }

  let count = (await db.collection('origin-data').where(query).count()).total
  pagesize = pagesize > 100 ? 100 : pagesize
  let res = await db.collection('origin-data').where(query).skip((page-1)*pagesize).limit(pagesize).get()

  return {
    count,
    list:res.data
  }

}