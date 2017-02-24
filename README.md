#面向工建企业的协同办公系统（V层）

基于[dva](https://github.com/dvajs/dva)、[lumen](https://lumen.laravel.com/)的简单毕业设计。

***

##项目简介
* **项目名称：**面向工建企业的协同办公系统
* **项目分析：**简单的协同办公（即OA）系统
* **项目特性：**集成仓储管理功能，实现浅度即时通信
* **项目预期：**前端采用[dva](https://github.com/dvajs/dva)框架，引用[ANT DESIGN](https://ant.design/index-cn)组件实现单页应用效果；后台采用[lumen](https://lumen.laravel.com/)框架，前后对接时数据格式统一为`JSON`
* **项目环境：**前端开发均在`node.js`环境下

***

##项目思路
本项目拟采用V层分离设计方案，后台`API`尽量向`RESTful`靠拢，对于即时通讯拟采用`WebSocket`协议实现，用户认证拟采用`token`令牌实现。旨在现将该项目放至`GitHub`，在学习实践过程中熟悉`GitHub`，欢迎大牛批评指正，在此谢过。

###Todo
- [ ] 注册页面
- [ ] 登录页面
- [x] dashbord页面
  - [x] 公告轮播
  - [x] 任务卡片
- [x] 最新公告页面
  - [ ] 增删改查
  - [ ] 交互动效
- [x] 任务清单页面
  - [x] 增删改查
  - [ ] 交互动效
- [x] 部门情况页面
  - [ ] 增删改查
  - [ ] 交互动效
- [x] 职员列表页面
  - [ ] 增删改查
  - [ ] 交互动效
- [x] 仓储管理页面
  - [ ] 增删改查
  - [ ] 交互动效

***
> In me the tiger sniffs the rose.

—— *by Siegfried Sassoon*, **In Me, Past, Present, Future Meet**

