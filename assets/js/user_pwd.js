$(function() {
  let form = layui.form;
  // 自定义校验规则
  form.verify({
    pwd:  [
      /^[\S]{6,12}$/
      ,'密码必须6到12位，且不能出现空格'
    ],
    // value 就是 使用该验证对象的input框中的值
    samePwd: function(value) {
      if(value !== $('[name=oldPwd]').val()) {
        return '新密码不能和旧密码相同！'
      }
    },
    rePwd: function(value) {
      if(value !== $('[name="newPwd"]').val()) {
        return '两次密码不一致！'
      }
    }
  });


  // 点击修改密码事件
  $('.layui-form').on('submit', function(e) {
    // 事件兼容写法
    e = e || window.event;

    // 取消表单默认提交行为
    e.preventDefault();

    $.ajax({
      method: 'POST',
      url: '/my/updatepwd',
      data: $(this).serialize(),
      success: function(res) {
        if(res.status !== 0) {
          return layui.layer.msg(res.message);
        }
        layui.layer.msg(res.message);

        // 重置表单
        // 通过[0]转换成 原生js对象
        $('.layui-form')[0].reset();
      }
    })
  });
});