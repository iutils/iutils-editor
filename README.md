# iutils-editor 
程序员工具 - 文本编辑器
  
   本编辑器主要是提供一种自定义编辑器的实现思路，代码完全开源，相比其他的编辑器主要优势是代码结果清晰，菜单定义采用JSON的结构，可以很方便修改和添加菜单。

菜单定义结构说明

```
//字段解释：group分组 type菜单类型 i字体图标 html自定义页面[可以省略] desc说明 init自定义方法[主要用户初始化绑定菜单的事件]
menus:[
  {
    group:[
      {type:"code",i:'am-icon-code',html:'',desc:'代码',init: function (editor) {}}
    ]
  }
]
```
按照这个规则就能很方便的新增和修改菜单了，是不是很简单 :smirk: 

# 演示地址
[http://iutils.oschina.io/iutils-editor](http://iutils.oschina.io/iutils-editor)

# 截图欣赏
![编辑器演示](https://git.oschina.net/uploads/images/2017/0421/172635_f8e49e9d_436098.png)

# 页面用法
```
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>iutils - 编辑器演示</title>
    <link rel="stylesheet" href="3rd-lib/amazeui/css/amazeui.min.css" />
    <link rel="stylesheet" href="css/iutilsEditor.css" />
    <script src="3rd-lib/jquery/2.2.3/jquery.min.js"></script>
    <script src="3rd-lib/amazeui/js/amazeui.min.js"></script>
    <script src="js/iutilsEditor.js"></script>
</head>
<body style="padding: 50px;">
    <p>iutils 编辑器演示</p>
    <textarea id="content" name="content"></textarea>

    <p>iutils 多编辑器演示</p>
    <textarea id="content2" name="content2"></textarea>
    <script>
        $(document).ready(function(){
            $("#content").iutilsEditor();

            $("#content2").iutilsEditor();
        });
    </script>
</body>
</html>
```
