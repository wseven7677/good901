# mail901

> 基于上下文的简易node业务框架

- 启动定时任务。

---

## dev


### quick start

```js
git clone
npm i
mkdir config
cd config
vi config.dafult.js // 创建你自己的配置文件，内容见下文

// back to root
// start your prj:

// METHOD 1:(just for development)
npm start

```


### config

```js
module.exports = (() => {
    return {
        host: '',
        port: '',

        mailAccount: {
            name: 'xx',
            user: 'xx@qq.com',
            pass: 'xx',
        },
    };
})();

```


### script
