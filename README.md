# iutils-editor 程序员工具 - 文本编辑器
本编辑器主要是提供一种自定义编辑器的实现思路，代码完全开源，相比其他的编辑器主要优势是代码结果清晰，菜单定义采用JSON的结构，可以很方便修改和添加菜单。
菜单定义结构说明
//字段解释：group分组 type菜单类型 i字体图标 html自定义页面 desc说明 init自定义方法
menus:[
  {
    group:[
      {type:"code",i:'am-icon-code',desc:'代码',init: function (editor) {}}
    ]
  }
]
