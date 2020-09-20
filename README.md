



# CUMTB学生外出申请系统



## 项目背景

时至九月，各大高校陆续开学，但由于疫情尚未结束，高校均对学生采取封闭式管理，倡导“非必要不外出”，对广大学子的正常生活产生了一定影响。

以我校为例，学生外出需**提前一天**向学院递交**纸质申请书**，由辅导员和学院**签字、盖章**后，方可外出。需要外出的同学经常由于上课而抽不出时间去递交申请、遇到周末或辅导员外出处理其他事务不在办公室的情况也无法进行盖章审批，整个申请和审批流程较为繁琐。

类似情况在全国各大高校屡见不鲜，因此，教育部近日也提出：希望各地各高校，动态调整校园管控措施，积极运用信息化手段，简化学生外出审批程序，切实方便学生进出校门。

基于以上原因，作者使用**云开发+微信小程序**开发了本项目，在参赛之余，也将联系学校将该小程序上线使用，简化外出审批流程，方便同学们外出，同时减轻纸质申请审批流程给辅导员及学校行政管理人员带来的不必要的工作负担。



## 目标用户

本小程序目标用户为中国矿业大学（北京）全体本科生和对应的辅导员。

（项目代码已开源至[github](https://github.com/RanchoTuring/GoOutApproval)，欢迎感兴趣的同学基于本项目构建自己学校的外出申请系统~）



## 应用场景

本项目用于高校疫情管控期间，我校学生申请外出和辅导员对外出申请进行审批。

首次登陆时，学生/辅导员需输入学号/辅导员授权号，进行微信号身份绑定，完成绑定后，在之后进入小程序后，将直接进入相应的页面。

学生可在学生端，进行外出申请的提交、查看自己的申请记录、外出时出示外出许可。

辅导员可在管理端，查看自己分管的学生提交的外出申请，对申请进行审批或查看已处理的申请。



## 项目架构

本项目基于“云开发+微信小程序”进行开发，使用小程序和colorui搭建了项目的前端页面，依赖云开发提供的云函数、云数据库、云存储等能力进行后台的数据处理和持久化。

项目按照不同的功能，将页面划分成了不同的模块，结构如下：

![外出申请系统](http://mmbiz.qpic.cn/mmbiz_png/MuTcic7XTgRGI0eujsjSJxoAEuyRLVVqoKpSVdYHeyGmBhpsqICDtHmbU6LrEdibDvIk1oUomJ8DEiaHic7eBGTmxA/0?wx_fmt=png)



## 逻辑流程

![绘图1](http://mmbiz.qpic.cn/mmbiz_png/MuTcic7XTgRGI0eujsjSJxoAEuyRLVVqo0vzJtBmwFMD124FzfWAB8ib4ADqGCbqJqribGASrcXIVSbCTxIpZJNOA/0?wx_fmt=png)



## 设计思路

### 功能实现

项目中综合运用了云开发的**云函数、云数据库和云存储**三大能力，基于用户的学号/授权号来进行数据的定向分发。

在用户登录时，使用**云函数**来获取所需的用户微信号的各项信息。

学生端提交的申请，会从学生的学号中，提取出相应信息，分学院、分年级，存入对应的**云数据库**，申请中所需的证明材料，会传入**云存储**中进行存储，并将url存入云数据库中，方便后续使用和展示。

管理端会根据辅导员授权号，从对应的数据库中，拉取出该辅导员分管的某学院某一年级的所有学生提交的申请，审批后，重新写入该数据库。

学生出示外出许可时，会根据该许可有效期和当前的时间进行判断，如果当前时间在有效期内，会显示“允许外出”，否则显示“禁止外出”（代表许可已过期或尚未到达生效时间）。



### 申请分发

我校对学生的管理是由2~3个辅导员一起分管某一学院xx年级，其中某个辅导员可能会主要负责某几个专业。

结合项目需求，为了让申请更快的得到审批，对提交的请求只进行“学院+年级”粒度的划分，这样能保证一个请求，会有多个辅导员可以进行审批。

同时，考虑到性能上的优化，我们按照“学院年级”，在云数据库中创建不同的集合，不同学院不同年级的同学和辅导员，在不同的集合中进行数据的读写。

![image-20200920002051931](http://mmbiz.qpic.cn/mmbiz_png/MuTcic7XTgRGI0eujsjSJxoAEuyRLVVqoZVmmsbOSBKF3uOnQP6fQoicTzZzbnjYEZ8URL2sFUQplCdibDia6cymgg/0?wx_fmt=png)

如上图，我们根据用户微信号绑定的学号，可以知道他的学院和年级信息，从而获取到需要操作的数据库集合的名称。



### UI和logo设计

在小程序页面中，主要使用四种颜色：

![image-20200920003754794](http://mmbiz.qpic.cn/mmbiz_png/MuTcic7XTgRGI0eujsjSJxoAEuyRLVVqoqsbmzrJWV7amVMT2DDE1QRPJe4FL2cdg4SbxajibQtHIRSF7tZwbBPg/0?wx_fmt=png)



同时参考校徽，进行了logo的设计

![image-20200920004332366](http://mmbiz.qpic.cn/mmbiz_png/MuTcic7XTgRGI0eujsjSJxoAEuyRLVVqoRTrdBicekvzqngr0Ao0HYntUAwNBVRNun6BHXDsAfPdaojSDgNjp3icA/0?wx_fmt=png)



## 用户界面截图

### 身份绑定页面

![image-20200920010244779](http://mmbiz.qpic.cn/mmbiz_png/MuTcic7XTgRGI0eujsjSJxoAEuyRLVVqo9kLOLk8pOdrsDuShgqUNDd4N45ibmaZPaM2RC0XjoicYR5Yf0do7dGaA/0?wx_fmt=png)



### 学生端

![img](http://phototj.photo.store.qq.com/psc?/V10pVx8T0buzUV/bqQfVz5yrrGYSXMvKr.cqZhyjdJ5wv6.EfK9nC7KPHYlV93YjEP*KuLJ7BQUtYn24vbAMrXmldj2C2IyxfQXw12Sj1X12NUrv.UL9mRoWbM!/b&bo=OASABzgEgAcRECc!&rf=viewer_311)

![img](http://a1.qpic.cn/psc?/V10pVx8T0buzUV/bqQfVz5yrrGYSXMvKr.cqbpQ1claypYkhj0r4Im1Y8bJNLcrhezYOrk5pQ6XOCFH9R5fiGQeJj5nfVXPlv0eLkxACA0pTXfCVTOVLOHl.CM!/b&ek=1&kp=1&pt=0&bo=OASABzgEgAcRECc!&tl=1&vuin=313561344&tm=1600531200&sce=50-1-1&rf=viewer_311)

![img](http://a1.qpic.cn/psc?/V10pVx8T0buzUV/bqQfVz5yrrGYSXMvKr.cqQcAGVN0xGALSPthTXIYgqse17s4aODL8pnUkn1vBIWghIYN5pvF20Ku7ZkNUlcJCOx4uJcOqTcVKxi4iW6L.kc!/b&ek=1&kp=1&pt=0&bo=OASABzgEgAcRECc!&tl=1&vuin=313561344&tm=1600531200&sce=50-1-1&rf=viewer_311)

![img](http://a1.qpic.cn/psc?/V10pVx8T0buzUV/bqQfVz5yrrGYSXMvKr.cqX0UKAAytprXPLg0lqBOSCQKjs66okblnx63cTaosluCBAN9fmL05hOMC2rWRnzkEyqVQHOUnoQZ1QrIzODrd*s!/b&ek=1&kp=1&pt=0&bo=OASABzgEgAcRECc!&tl=1&vuin=313561344&tm=1600531200&sce=50-1-1&rf=viewer_311)



### 管理端

![img](http://a1.qpic.cn/psc?/V10pVx8T0buzUV/bqQfVz5yrrGYSXMvKr.cqUqH5japGpwTPp23*o1bVmOoa.zStlVtME5a6smjSmwe69OzOhCQmVlY2uTXkenBjgHRJwGERznYV1ez4bRWo04!/b&ek=1&kp=1&pt=0&bo=OAQkCTgEJAkRECc!&tl=1&vuin=313561344&tm=1600531200&sce=50-1-1&rf=viewer_311)

![image-20200920010145393](http://mmbiz.qpic.cn/mmbiz_png/MuTcic7XTgRGI0eujsjSJxoAEuyRLVVqoPLiav0Z72iablRYgJLqmOCpKcaXGkeyGSD8gMmzrotUiczZWic33zSGBWw/0?wx_fmt=png)


![img](http://a1.qpic.cn/psc?/V10pVx8T0buzUV/bqQfVz5yrrGYSXMvKr.cqT9NCzXRkVbQctcqrgSvk8z2PXteJMS.0YU8B6X0D7JEEglC0v36NZihSPa0p3sDZ05R*L73fihtnrOx3VT1n9k!/b&ek=1&kp=1&pt=0&bo=OAQkCTgEJAkRECc!&tl=1&vuin=313561344&tm=1600531200&sce=50-1-1&rf=viewer_311)

![img](http://a1.qpic.cn/psc?/V10pVx8T0buzUV/bqQfVz5yrrGYSXMvKr.cqTR4N5MurymlE8MM.FEF1lRs6ola17i4YW5YPCHWzEj3MqtSCB4hWi.YWTfH99.4DdrOv7B2dyzWPBlsFHH36e4!/b&ek=1&kp=1&pt=0&bo=OAQkCTgEJAkRECc!&tl=1&vuin=313561344&tm=1600531200&sce=50-1-1&rf=viewer_311)

![image-20200920010217758](http://mmbiz.qpic.cn/mmbiz_png/MuTcic7XTgRGI0eujsjSJxoAEuyRLVVqoZibiaRbnRiacQlg6ZF5pr5sgEASaUorXvbRxd2nIMqwqeqda8b6Bq0x1Q/0?wx_fmt=png)



## more

由于本项目是针对特定群体开发，数据处理逻辑、数据库配置都与我校学号强相关，校外用户无法正常使用本小程序，因此没有提供线上版本供大家体验，只提供了体验版本供评委审核使用。

不过上文中已经提供了本项目的github链接，感兴趣的同学可以自己clone源代码来部署体验~（欢迎star和fork
