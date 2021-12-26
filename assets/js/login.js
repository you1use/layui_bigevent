$(function() {
  // 点击去注册切换显示内容
  $('.reg-btn').on('click', function() {
    $('.login-box').hide();
    $('.reg-box').show();
  });
  // 点击去登录切换显示内容
  $('.login-btn').on('click', function() {
    $('.login-box').show();
    $('.reg-box').hide();
  });

  // 从layui中 获取表单元素
  let form = layui.form;
  // form.verify() 函数可以自定义校验规则
  form.verify({
    // 自定义密码校验规则
    pad: [
      /^[\S]{6,12}$/
      ,'密码必须6到12位，且不能出现空格'
    ],

    // 自定义确认密码校验规则
    // value 是确认密码输入框的内容
    copad: function(value) {
      // 获取 密码框的内容
      let pwd = $('.reg-box [name=pad]').val();
      // 判断两个值是否一致
      if(pwd != value) {
        return '两次密码输入不一致！'
      }
    }
  });

  // 从layui中 获取 layer对象
  let layer = layui.layer;

  // 监听注册表单的提交事件
  $('#reg-form').on('submit', function(e) {
    // 事件兼容性写法
    e = e || window.event;

    // 取消表单默认提交行为
    e.preventDefault();

    // 获取表单内容，定义参数
    let data = {username:$('#reg-form [name=username]').val(), password:$('#reg-form [name=password]').val()};
    // 发起请求
    $.post('/api/reguser', data, function(res) {
      if(res.status !== 0) {
        return layer.msg(res.message);
      }
      layer.msg('注册成功，请登录');

      // 自动触发点击去登录按钮
      $('.login-btn').click();
    });
  });

  // 监听登录表单的登录事件
  $('#login-form').submit(function(e) {
    // 事件兼容性写法
    e = e || window.event;

    // 取消表单默认提交刷新事件
    e.preventDefault();

    $.ajax({
      method: 'POST',
      url: '/api/login',
      // 快速获取表单内容
      data: $(this).serialize(),
      success: function(res) {
        if(res.status !== 0) {
          return layer.msg('登录失败！');
        }
        layer.msg('登录成功！');

        // 将登录成功的 token 字符串 保存到 
        localStorage.setItem('token', res.token);

        // 跳转到后台主页
        location.href = 'http://127.0.0.1:5500/layui_bigevent/index.html';
      }
    });
  });
});