$(function() {
  // 从layui中获取表单元素对象
  let form = layui.form;
  form.verify({
    nickname: function(value) {
      if(value.length < 6) {
        return '昵称长度必须在 1 ~ 6 个字符之间';
      }
    }
  });

  // 从layui中获取弹框元素对象
  let layer = layui.layer;
  // 获取用户基本信息
  function initUserInfo() {
    $.ajax({
      method: 'GET',
      url: '/my/userinfo',
      success: function(res) {
        if(res.status !== 0) {
          return layer.msg(res.message);
        }
        layer.msg(res.message);

        // form.val() 可以为表单快速赋值
        // 参数一：是lay-filter属性 绑定的 form名称
        // 参数二：赋值的参数
        form.val('formUserInfo',res.data);
      }
    });
  }
  
  initUserInfo();

  // 点击重置事件
  $('#btnReset').on('click', function(e) {
    // 事件对象兼容写法
    e = e || window.event;

    // 取消重置按钮的重置行为
    e.preventDefault();

    initUserInfo();
  });

  // 监听表单提交事件
  $('.layui-form').on('submit', function(e) {
    // 事件兼容写法
    e = e || window.event;

    // 取消表单默认提交行为
    e.preventDefault();

    $.ajax({
      method: 'POST',
      url: '/my/userinfo',
      data: $(this).serialize(),
      success: function(res) {
        if(res.status !== 0) {
          return layer.msg(res.message);
        }
        layer.msg(res.message);

        // 调用父页面（index.html）中的方法，重新渲染用户的头像和用户的信息
        // 因为当前页面时处于 iframe 框架中，window 就表示 iframe
        // 而 iframe 是处于 index.html 中，所以可以 通过 window.parent.方法() 来调用 index.html 中的方法
        window.parent.getUserInfo();
      }
    })
  });
});