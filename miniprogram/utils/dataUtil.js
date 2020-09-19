//从id 中获取应该存入的数据库
//如学号为：171041020x  应该存入  0417 数据库
//授权码为  xxxx0417 的老师应该从  0417 数据库拉取数据
function getDBById(id, type) {
  if (type == 0) {
    return id.substr(3, 2) + id.substr(0, 2)
  } else {
    return id.substr(4, 4)
  }
}
//获取当前时间
//格式：2020/9/18 20:03:03
function getNowTime() {
  let now = new Date()
  let time = new Array(3)
  time[0] = now.getHours()
  time[1] = now.getMinutes()
  time[2] = now.getSeconds()

  for(let i=0;i<3;i++){
    if(time[i]<10){
      time[i]='0'+time[i]
    }
  }
  return now.toLocaleDateString() + ' ' + time.join(':')
}
export{getNowTime,getDBById}