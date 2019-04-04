// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  const wxContext = cloud.getWXContext()
  let openid = wxContext.OPENID
  let {cardnum=null, name} = event

  if(cardnum){
    await db.collection('authority').add({data:{cardnum, name, openid}})
  } else {
    let record = await db.collection('authority').where({openid}).get()
    if(record.data.length === 0){
      return 'ids-error'
    }
    cardnum = record.data[0].cardnum
  }

  let allow = await db.collection('allowed-user').where({cardnum}).get()
  if(allow.data.length === 0){
    return 'forbidden'
  }

  return 'success'

}