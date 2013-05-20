# 无刷新跨域传输数据

如果是 get，那么使用 [jsonp](http://zh.wikipedia.org/wiki/JSONP) 形式；如果是 post，那么使用 [window.name](http://www.cnblogs.com/rainman/archive/2011/02/21/1960044.html) 形式。

`jsonp` 形式简单，只是顺便支持而已。

`window.name` 网上的文章有很多，上面给出的链接是一篇简短的实现说明。基本原理是 `window.name` 可以在 `location` 改变后保持不变。

## API

`transfer(url, callback(data), options);`

`options` 参数是一个可选的配置项，可对 `jsonp` 时的 `callbackTag` 和 `callbackName` 以及 `window.name` 时的 `data` 和 `localProxy` 进行配置。

- `callbackTag` 是指用 `jsonp` 时用什么参数来表明这是一个回调函数字段，默认是 `callback`。
- `callbackName` 则是回调函数字段中的值部分，默认是 `'transfer_' + new Date().getTime()`。
- 'data` 是一个简单的 JSON 对象，用来存放需要 post 的数据。
- `localProxy` 是用来做 post 跨域处理的当前域名的代理页面，默认是 `/favicon.ico`。


## 使用

```javascript
// this will be jsonp
transfer('http://127.0.0.1/action.php', function(data) {
    console.log(data);
});

// this will use window.name
transfer('http://127.0.0.1/action.php', function(data) {
        console.log(data);
    },
    {
        data: {'key': 'happy'}
    }
);
```
