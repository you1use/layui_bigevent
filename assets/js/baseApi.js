// 每次调用 ajax请求，都会先调用 ajaxPrefilter 这个函数
// 在这个函数中，可以拿到我们给 ajax提供的配置对象
$.ajaxPrefilter(function(options) {
  // console.log(options);
  // 为所有请求 拼接上完整的路径
  options.url = 'http://api-breakingnews-web.itheima.net' + options.url;

  // 为统一有权限接口 设置 headers 请求头
  if(options.url.indexOf('/my/') !== -1) {
    options.headers = {
      Authorization: localStorage.getItem('token') || ''
    }
  }

  // 全局统一挂载 complete 回调函数
  options.complete = function(res) {
    // 在 complete 回调函数中，可以使用 res.responseJSON 拿到服务器响应回来的数据
    if(res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
      // 强制清空token
      localStorage.removeItem('token');
      // 强制跳转登录页面
      location.href = 'http://127.0.0.1:5500/layui_bigevent/login.html'
    }
  }
});