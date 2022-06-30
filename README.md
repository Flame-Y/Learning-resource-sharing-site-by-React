# 学习资源分享网站（React）使用引导

## 安装 / 启动项目

```
# 克隆项目
# github
git clone https://github.com/QingXia-Ela/Rhine-Lab-Theme-Index-Page.git
# gitee
git clone https://gitee.com/shiinafan/Rhine-Lab-Theme-Index-Page.git

# 进入项目目录
cd Rhine-Lab-Theme-Index-Page

# 安装依赖
npm install

# 可以通过如下操作解决 npm 下载速度慢的问题
npm install --registry=https://registry.npm.taobao.org

# 启动服务
npm start

```

#### 暂存问题

1.换肤功能仅限导航栏部分，不使用redux的情况没有较好的整体换色解决方案

2.在线运行时，接口无法正常请求，疑似后台接口没配置Nginx相关

3.普通用户无法进行按评论数从高到低返回的请求，无法实现热榜功能