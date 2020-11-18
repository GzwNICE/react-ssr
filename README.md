# react-ssr

#### 项目介绍
ssr触屏版

## 测试发布
    执行npm run build:test之后把build中资源放到m_veryeast_cn/webroot/v2中
## 预发布/
    执行npm run build:pre之后把build中资源文件放到m_veryeast_cn/webroot/v2中，构建ve_m_ssr和m_veryeast_cn预发布环境
## 生产发布
    执行npm run build:pre之后把build中资源文件放到m_veryeast_cn/webroot/v2中，构建ve_m_ssr和m_veryeast_cn预生产环境

index.production.html 是构建时用到的html
这个master权限我有

#### 使用说明
1. 客户端运行 npm run start：client 运行之后 使用http://m.veryeast.cn:3000/
2. 服务端运行 npm run start 运行之后 使用http://m.veryeast.cn:3001/
3. 测试使用： http://m.veryeast.cn/

#### 代码书写注意事项
1. window在服务端是undefined，所以compentWillMount里面还有render里面不要使用
2. 在服务端就要加载好的数据在compentWillMount里调用，其他页面初始化加载的数据在compentDidMount里调用


ResumeInfo/ResumeIntention   暂时用的ResumeInfo的同一个less
