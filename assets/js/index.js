$(function() {
  // 调用 gitUserInfo 获取用户基本信息
  getUserInfo();
});

// 获取用户的基本信息
function getUserInfo() {
  $.ajax({
    method: 'GET',
    url: '/my/userinfo',
    success: function(res) {
      // console.log(res);
      if(res.status !== 0) {
        return layui.layer.msg(res.message);
      }
      // 调用 renderAvater 渲染用户头像和名称
      renderAvater(res.data);
    },
    // 因为每个 有有权限的路径都需要是用 complete 回调函数，所以可以直接在 baseApi.js中全局挂载，不需要重复写
    // 无论成功或失败，都会调用 该回调函数
    // complete: function(res) {
    //   // 在 complete 回调函数中， 可以使用 res.responseJSON 拿到服务器响应回来的数据
    //   if(res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
    //     // 强制清空token
    //     localStorage.removeItem('token');
    //     // 2. 强制跳转到登录页面
    //     location.href = 'http://127.0.0.1:5500/layui_bigevent/login.html';
    //   }
    // }
  });
}

// 渲染用户头像和名称
function renderAvater(user) {
  // 获取 该用户的 名称
  let name = user.nickname || user.username;
  // 设置欢迎文本内容
  $('#welcome').html('欢迎 &nbsp;&nbsp;'+ name);
  // 按需渲染头像
  // 判断用户是否上传了头像
  if(user.user_pic !== null) {
    // 如果没有头像信息，则隐藏 img 标签，显示 .text-avatar盒子
    $('.layui-nav-img').attr('src', user.user_pic).show();
    $('.text-avatar').hide();
  } else {
    // 获取 名称的首个字符,转换成大写字符
    let first = name[0].toUpperCase();
    // 如果没有头像信息，则隐藏 img 标签，显示 .text-avatar盒子
    $('.layui-nav-img').hide();
    $('.text-avatar').html(first).show();
  }
}