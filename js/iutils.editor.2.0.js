/**
 * 程序员工具自己的编辑器
 * 可以定义组件 2.0
 */
;(function($) {
    var cursor;//光标对象
    var defaults = {
        //自定义菜单列表
        menus: [
            {group:[
                {type:"eraser",i:'am-icon-eraser',desc:'清除格式',init: function (editor) {
                    editor.find('.iutilsEditor-tools').on('click','button.eraser',function(){
                        console.log(cursor);
                        var selObj = getSelObj();
                        console.log(selObj);
                        syncData(editor);//同步数据
                    });
                }}
            ]},
            {group:[
                {type:"bold",i:'am-icon-bold',desc:'粗体',init: function (editor) {

                }},
                {type:"italic",i:'am-icon-italic',desc:'斜体',init: function (editor) {

                }},
                {type:"underline",i:'am-icon-underline',desc:'下划线',init: function (editor) {

                }},
                {type:"strikethrough",i:'am-icon-strikethrough',desc:'删除线',init: function (editor) {

                }}
            ]},
            {
                group:[
                    {type:"expand",i:'am-icon-expand',desc:'全屏',init: function (editor) {
                        editor.find('.iutilsEditor-tools').on('click','button.expand',function(){
                            var $this = $(this);
                            if(!$this.hasClass('active')){
                                $this.addClass("active");
                                $this.find("i").addClass("am-icon-compress").removeClass("am-icon-expand");
                                editor.addClass("iutilsEditor-fullscreen");
                            }else{
                                $this.removeClass("active");
                                editor.removeClass("iutilsEditor-fullscreen");
                                $this.find("i").addClass("am-icon-expand").removeClass("am-icon-compress");
                            }
                        });
                    }}
                ]
            }
        ]
    };


    //对外函数
    $.fn.createEditor = function (options) {
        var settings = $.extend({},defaults, options);
        //创建界面
        var html = '<div class="iutilsEditor"><div class="iutilsEditor-tools"><div class="am-btn-toolbar">';
        for(var i=0;i<settings.menus.length;i++){
            var groups = settings.menus[i].group;
            html += '<div class="am-btn-group am-btn-group-xs">';
            for(var j=0;j<groups.length;j++){
                var menu = groups[j];
                if(menu.html){
                    html += '<div class="am-dropdown" data-am-dropdown><button type="button" class="am-btn am-btn-iutils am-dropdown-toggle '+menu.type+'" title="'+menu.desc+'"><i class="'+menu.i+'"></i></button>'+menu.html+'</div>';
                }else{
                    html += '<button type="button" class="am-btn am-btn-iutils '+menu.type+'" title="'+menu.desc+'"><i class="'+menu.i+'"></i></button>';
                }
            }
            html += '</div>';
        }
        html += '</div></div><div class="iutilsEditor-content" contenteditable="true"></div></div>';
        $(html).insertAfter(this);
        //隐藏本身
        var $this = $(this);
        $this.hide();
        //编辑器对象
        var editor = $this.next();
        //初始化菜单绑定
        for(var i=0;i<settings.menus.length;i++){
            var groups = settings.menus[i].group;
            for(var j=0;j<groups.length;j++){
                var menu = groups[j];
                menu.init && menu.init(editor);
            }
        }
        var editorPanel = editor.find(".iutilsEditor-content");
        editorPanel.on('keydown keyup',function(){
            $this.val($(this).html());//同步内容
            if($(this).html()=="" || $(this).html()=="<br>"){
                editorPanel.html("<div><br></div>");
            }
        });
        //初始化内容
        editorPanel.html("<div><br></div>");
        //监听光标所在的位置
        editorPanel.on('click',function(e){
            cursor = $(e.target);
        });
        //绑定下拉事件
        $(document.body).on('click','.am-dropdown',function(){
            var $this = $(this);
            $($this).dropdown('open');
        });


    };

    //同步数据
    function syncData(editor){
        var content = editor.find(".iutilsEditor-content");//内容对象
        var textarea = editor.prev();//源码存放对象
        textarea.val(content.html());//同步表单内容
    }
    //获取选中的对象
    function getSelectObj(){
        var selObj;
        if (window.getSelection) {
            selObj = window.getSelection();
        } else if (window.document.getSelection) {
            selObj = window.document.getSelection();
        } else if (window.document.selection) {
            selObj = window.document.selection.createRange();
        }
        return selObj;
    }
    //获取选中的文字
    function getSelectText(){
        var selObj=null,text=null;
        if (window.getSelection) {
            selObj = window.getSelection();
        } else if (window.document.getSelection) {
            selObj = window.document.getSelection();
        } else if (window.document.selection) {
            selObj = window.document.selection.createRange();
        }
        var currentEle=null;//当前元素
        if(selObj!=null && selObj.baseNode!=null){
            currentEle = $(selObj.baseNode.parentNode);
        }
        if(currentEle!=null){
            text = currentEle.text();
        }
        return text;
    }

})(jQuery);