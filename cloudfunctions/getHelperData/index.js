// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()

// 云函数入口函数
exports.main = async (event, context) => {
  let res = await db.collection('helper-data').get()
  let entryDate = []
  res.data[0].entryDate.forEach(element => {
    if(element  !== 'undefined' && (+element) < 209999){
      entryDate.push(element)
    }
  });
  res.data[0].entryDate = entryDate
  return res.data[0]
}