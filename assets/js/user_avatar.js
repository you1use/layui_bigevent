$(function() {
  // 1.1 获取裁剪区域的 DOM 元素
  var $image = $('#image');
  // 1.2 配置选项
  const options = {
    // 纵横比(裁剪框的形状)
    // 1 相当于 1/1，比例可以自定义
    aspectRatio: 1,
    // 指定预览区域
    preview: '.img-preview'
  }

  // 1.3 创建裁剪区域
  $image.cropper(options);

  // 从layui 中获取 layer元素对象
  let layer = layui.layer;

  // 为上传按钮绑定点击事件
  $("#btnChooseImage").on('click', function() {
    // 触发 #file 的点击事件
    $('#file').click();
  });

  // 监听 #file 的 选择文件事件
  $('#file').on('change', function(e) {
    // 事件兼容写法
    e = e || window.event;

    // 获取用户选择的文件
    let filelist = e.target.files;
    if(filelist.length === 0) {
      return layer.msg('您未选择文件！');
    }

    // 拿到用户选中的文件
    let file = e.target.files[0];

    // 将文件 转化为 路径
    let newImgURL = URL.createObjectURL(file);

    // 重新初始化裁剪区域
    $image
      .cropper('destroy')    // 销毁旧的裁剪区域
      .attr('src', newImgURL)  // 重新设置图片路径
      .cropper(options);        // 重新初始化裁剪区域
  });

  // 点击确定按钮事件
  $('#btnUpload').on('click', function() {
    var dataURL = $image
      .cropper('getCroppedCanvas', { // 创建一个 Canvas 画布
        width: 100,
        height: 100
      })
      .toDataURL('image/png');       // 将 Canvas 画布上的内容，转化为 base64 格式的字符串
  
      $.ajax({
        method: 'POST',
        url: '/my/update/avatar',
        data: {
          avatar: dataURL
        },
        success: function(res) {
          if(res.status !== 0) {
            return layer.msg(res.message);
          }
          layer.msg(res.message);
          // 当前窗口是 iframe 框架
          // iframe 是处于 index.html页面中，通过 window.parent.方法() 调用index.html中的方法
          window.parent.getUserInfo();
        }
      })
    });
});