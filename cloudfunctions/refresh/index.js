// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init()
const db = cloud.database()

/**
 * 更新数据库结构
 * 
 * 每次上传数据后通过调试方式调用该云函数，更新辅助查询的各个数据库
 * 
 */

// 云函数入口函数
exports.main = async (event, context) => {
  let entryDateMap = {}
  let graduationDateMap = {}
  let collegeMap = {}

  const LIMIT = 100
  let skip = 0
  let partOfResult = []
  // 遍历整个数据库
  do {
    //每次查询100条数据并返回结果
    let records = await db.collection('origin-data').skip(skip * LIMIT).limit(LIMIT).get()
    skip++
    partOfResult = records.data
    // 去重的工作
    partOfResult.forEach(k => {
      
      //转化为字符串
      k.entryDate = '' + k.entryDate
      //改变格式，防止有1207这样的日期出现
      k.entryDate = k.entryDate.length === 4 ? '20' + k.entryDate : k.entryDate
      if(k.entryDate){
        //entryDate不是空，加入到entryMap中
        //以键值对的形式存放已经出现的entryDate
        entryDateMap[k.entryDate] = true
      }

      k.graduationDate = '' + k.graduationDate
      k.graduationDate = k.graduationDate.length === 4 ? '20' + k.graduationDate : k.graduationDate
      if(k.graduationDate){
        graduationDateMap[k.graduationDate] = true
      }
      //collegeMap中没有出现相应的college，则把college加入到collegeMap中
      if(!collegeMap[k.college]){
        collegeMap[k.college] = {}
      }
      //在college下添加majority
      collegeMap[k.college][k.majority] = true
    });
  } while (partOfResult.length !== 0)

  //await db.collection('helper-data').remove()
  await db.collection('helper-data').add({data:{
    entryDate:Object.keys(entryDateMap),
    graduationDate:Object.keys(graduationDateMap),
    collegeMap
  }})

  return {
    entryDateMap, graduationDateMap, collegeMap
  }

}