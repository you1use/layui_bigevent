// 每次调用 ajax请求，都会先调用 ajaxPrefilter 这个函数
// 在这个函数中，可以拿到我们给 ajax提供的配置对象
$.ajaxPrefilter(function(options) {
  // console.log(options);
  // 为所有请求 拼接上完整的路径
  options.url = 'http://api-breakingnews-web.itheima.net' + options.url;

});