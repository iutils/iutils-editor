/**
 * 程序员工具自己的编辑器
 * 可以定义组件
 */
;(function($) {
    var defaults = {
        menus: [
            //字段解释：group分组 type菜单类型 i字体图标 html自定义页面 desc说明 init自定义方法
            {
                group:[
                    {type:"code",i:'am-icon-code',desc:'代码',init: function (editor) {
                        var tools = editor.find('.iutilsEditor-tools');
                        tools.on('click','button.code',function(){
                            var $this = $(this);
                            //源码对象
                            var $iutilsEditorCode = editor.find(".iutilsEditor-code");
                            //内容对象
                            var $iutilsEditorContent = editor.find(".iutilsEditor-content");
                            //点亮菜单
                            if(!$this.hasClass('active')){
                                $this.addClass("active");
                                $iutilsEditorContent.hide();
                                $iutilsEditorCode.show();
                                //禁用工具栏菜单
                                tools.find(".am-btn-iutils").each(function(){
                                    if(!$(this).hasClass('active')){
                                        $(this).attr("disabled",true);
                                    }
                                });
                            }else{
                                $this.removeClass("active");
                                $iutilsEditorCode.hide();
                                $iutilsEditorContent.show();
                                //启用工具栏菜单
                                tools.find(".am-btn-iutils").each(function(){
                                    $(this).attr("disabled",false);
                                });
                            }
                        });
                    }}
                ]
            },
            {
                group:[
                    {type:"font",i:'am-icon-font',html:'<div class="am-dropdown-content"><form class="am-form am-form-horizontal"><div class="am-form-group"><label class="am-u-sm-4 am-form-label">字体：</label><div class="am-u-sm-8"><input type="text" placeholder="如：宋体" value="宋体"></div></div><div class="am-form-group"><label class="am-u-sm-4 am-form-label">字号：</label><div class="am-u-sm-8"><input type="text" placeholder="如：16" value="16"></div></div><div class="am-form-group"><label class="am-u-sm-4 am-form-label">颜色：</label><div class="am-u-sm-8"><input type="text" placeholder="如：#000" value="#000"></div></div><div class="am-form-group"><label class="am-u-sm-4 am-form-label">背景颜色：</label><div class="am-u-sm-8"><input type="text" placeholder="如：#fff" value="#fff"></div></div><div class="am-form-group"><div class="am-u-sm-12"><button type="button" class="am-btn am-btn-default am-btn-xs am-align-right" style="margin-bottom:0;">确认</button></div></div></form></div>',desc:'字体设置',
                        init: function (editor) {
                            var buttton = editor.find('.iutilsEditor-tools').find('button.font');
                            var currentEle=null;//当前元素
                            buttton.on('click',function(){
                                var selObj = getSelObj();
                                if(selObj!=null && selObj.baseNode!=null){
                                    currentEle = $(selObj.baseNode.parentNode);
                                }
                            });
                            var dropdownContent = buttton.next('.am-dropdown-content');
                            dropdownContent.on('click','button',function(){
                                if(editor.find(".iutilsEditor-code").val()!=""){
                                    //判断当前节点是否可操作
                                    if(!isEleOp(currentEle)){
                                        return;
                                    }
                                    if(currentEle!=null){
                                        dropdownContent.find('input[type=text]').each(function(index){
                                            var val = $(this).val();
                                            if(val!=""){
                                                if(index==0){
                                                    currentEle.css("font-family",val);
                                                }else if(index==1){
                                                    currentEle.css("font-size",val+"px");
                                                }
                                                else if(index==2){
                                                    currentEle.css("color",val);
                                                }
                                                else if(index==3){
                                                    currentEle.css("background-color",val);
                                                }
                                            }
                                        });
                                        //同步数据
                                        syncData(editor);
                                    }
                                }
                                //关闭弹出框
                                buttton.parent().dropdown('close');
                            });
                    }},
                    {type:"bold",i:'am-icon-bold',desc:'粗体',init: function (editor) {
                        editor.find('.iutilsEditor-tools').on('click','button.bold',function(){
                            var $this = $(this);
                            var selObj = getSelObj();
                            var currentEle=null;//当前元素
                            if(selObj!=null && selObj.baseNode!=null){
                                currentEle = $(selObj.baseNode.parentNode);
                            }
                            //判断当前节点是否可操作
                            if(!isEleOp(currentEle)){
                                return;
                            }
                            //点亮菜单
                            if(!$this.hasClass('active')){
                                if(currentEle!=null){
                                    if(currentEle.text().trim()==selObj.toString().trim()){
                                        currentEle.css("font-weight","bold");
                                        $this.addClass("active");
                                    }else{
                                        var html = currentEle.html();
                                        html = html.replace(new RegExp(selObj.toString(),"gm"),"<span style='font-weight:bold;'>"+selObj.toString()+"</span>");
                                        currentEle.html(html);
                                        $this.addClass("active");
                                    }
                                    //同步数据
                                    syncData(editor);
                                }
                            }else{
                                if(currentEle!=null){
                                    if(currentEle.text().trim()==selObj.toString().trim()){
                                        currentEle.css("font-weight","normal");
                                        $this.removeClass("active");
                                    }else{
                                        var html = currentEle.html();
                                        html = html.replace(new RegExp("<span style='font-weight:bold;'>"+selObj.toString()+"</span>","gm"),selObj.toString());
                                        currentEle.html(html);
                                        $this.removeClass("active");
                                    }
                                    //同步数据
                                    syncData(editor);
                                }
                            }
                        });
                    }},
                    {type:"italic",i:'am-icon-italic',desc:'斜体',init: function (editor) {
                        editor.find('.iutilsEditor-tools').on('click','button.italic',function(){
                            var $this = $(this);
                            var selObj = getSelObj();
                            var currentEle=null;//当前元素
                            if(selObj!=null && selObj.baseNode!=null){
                                currentEle = $(selObj.baseNode.parentNode);
                            }
                            //判断当前节点是否可操作
                            if(!isEleOp(currentEle)){
                                return;
                            }
                            //点亮菜单
                            if(!$this.hasClass('active')){
                                if(currentEle!=null){
                                    if(currentEle.text().trim()==selObj.toString().trim()){
                                        currentEle.css("font-style","italic");
                                        $this.addClass("active");
                                    }else{
                                        var html = currentEle.html();
                                        html = html.replace(new RegExp(selObj.toString(),"gm"),"<span style='font-style:italic;'>"+selObj.toString()+"</span>");
                                        currentEle.html(html);
                                        $this.addClass("active");
                                    }
                                    //同步数据
                                    syncData(editor);
                                }
                            }else{
                                if(currentEle!=null){
                                    if(currentEle.text().trim()==selObj.toString().trim()){
                                        currentEle.css("font-style","normal");
                                        $this.removeClass("active");
                                    }else{
                                        var html = currentEle.html();
                                        html = html.replace(new RegExp("<span style='font-style:italic;'>"+selObj.toString()+"</span>","gm"),selObj.toString());
                                        currentEle.html(html);
                                        $this.removeClass("active");
                                    }
                                    //同步数据
                                    syncData(editor);
                                }
                            }
                        });
                    }},
                    {type:"underline",i:'am-icon-underline',desc:'下划线',init: function (editor) {
                        var tools = editor.find('.iutilsEditor-tools');
                        tools.on('click','button.underline',function(){
                            var $this = $(this);
                            var selObj = getSelObj();
                            var currentEle=null;//当前元素
                            if(selObj!=null && selObj.baseNode!=null){
                                currentEle = $(selObj.baseNode.parentNode);
                            }
                            //判断当前节点是否可操作
                            if(!isEleOp(currentEle)){
                                return;
                            }
                            //点亮菜单
                            if(!$this.hasClass('active')){
                                if(currentEle!=null){
                                    if(currentEle.text().trim()==selObj.toString().trim()){
                                        currentEle.css("text-decoration","underline");
                                        $this.addClass("active");
                                        tools.find('button.strikethrough').removeClass("active");
                                    }else{
                                        var html = currentEle.html();
                                        html = html.replace(new RegExp(selObj.toString(),"gm"),"<span style='text-decoration:underline;'>"+selObj.toString()+"</span>");
                                        currentEle.html(html);
                                        $this.addClass("active");
                                        tools.find('button.strikethrough').removeClass("active");
                                    }
                                    //同步数据
                                    syncData(editor);
                                }
                            }else{
                                if(currentEle!=null){
                                    if(currentEle.text().trim()==selObj.toString().trim()){
                                        currentEle.css("text-decoration","none");
                                        $this.removeClass("active");
                                    }else{
                                        var html = currentEle.html();
                                        html = html.replace(new RegExp("<span style='text-decoration:underline;'>"+selObj.toString()+"</span>","gm"),selObj.toString());
                                        currentEle.html(html);
                                        $this.removeClass("active");
                                    }
                                    //同步数据
                                    syncData(editor);
                                }
                            }
                        });
                    }},
                    {type:"strikethrough",i:'am-icon-strikethrough',desc:'删除线',init: function (editor) {
                        var tools = editor.find('.iutilsEditor-tools');
                        tools.on('click','button.strikethrough',function(){
                            var $this = $(this);
                            var selObj = getSelObj();
                            var currentEle=null;//当前元素
                            if(selObj!=null && selObj.baseNode!=null){
                                currentEle = $(selObj.baseNode.parentNode);
                            }
                            //判断当前节点是否可操作
                            if(!isEleOp(currentEle)){
                                return;
                            }
                            //点亮菜单
                            if(!$this.hasClass('active')){
                                if(currentEle!=null){
                                    if(currentEle.text().trim()==selObj.toString().trim()){
                                        currentEle.css("text-decoration","line-through");
                                        $this.addClass("active");
                                        tools.find('button.underline').removeClass("active");
                                    }else{
                                        var html = currentEle.html();
                                        html = html.replace(new RegExp(selObj.toString(),"gm"),"<span style='text-decoration:line-through;'>"+selObj.toString()+"</span>");
                                        currentEle.html(html);
                                        $this.addClass("active");
                                        tools.find('button.underline').removeClass("active");
                                    }
                                    //同步数据
                                    syncData(editor);
                                }
                            }else{
                                if(currentEle!=null){
                                    if(currentEle.text().trim()==selObj.toString().trim()){
                                        currentEle.css("text-decoration","none");
                                        $this.removeClass("active");
                                    }else{
                                        var html = currentEle.html();
                                        html = html.replace(new RegExp("<span style='text-decoration:line-through;'>"+selObj.toString()+"</span>","gm"),selObj.toString());
                                        currentEle.html(html);
                                        $this.removeClass("active");
                                    }
                                    //同步数据
                                    syncData(editor);
                                }
                            }
                        });
                    }},
                    {type:"eraser",i:'am-icon-eraser',desc:'清除格式',init: function (editor) {
                        editor.find('.iutilsEditor-tools').on('click','button.eraser',function(){
                            var selObj = getSelObj();
                            var currentEle=null;//当前元素
                            if(selObj!=null && selObj.baseNode!=null){
                                currentEle = $(selObj.baseNode.parentNode);
                            }
                            //判断当前节点是否可操作
                            if(!isEleOp(currentEle)){
                                return;
                            }
                            if(currentEle!=null){
                                var text = currentEle.text();
                                currentEle.html(text);
                                currentEle.removeAttr("style");
                                //同步数据
                                syncData(editor);
                            }
                        });
                    }},
                    {type:"header",i:'am-icon-header',html:'<ul class="am-dropdown-content"><li><a href="#"><h1>标题1</h1></a></li><li><a href="#"><h2>标题2</h2></a></li><li><a href="#"><h3>标题3</h3></a></li><li><a href="#"><h4>标题4</h4></a></li><li><a href="#"><h5>标题5</h5></a></li><li><a href="#"><h6>标题6</h6></a></li></ul>',desc:'标题',
                        init: function (editor) {
                            var buttton = editor.find('.iutilsEditor-tools').find('button.header');
                            var dropdownContent = buttton.next('.am-dropdown-content');
                            dropdownContent.on('click','a',function(){
                                var content = editor.find(".iutilsEditor-content");
                                if(content.html()=="<div><br></div>"){
                                    content.html($(this).html());
                                }else{
                                    content.append($(this).html());
                                }
                                //关闭弹出框
                                buttton.parent().dropdown('close');
                                //同步数据
                                syncData(editor);
                            });
                    }}
                ]
            },
            {
                group:[
                    {type:"list-ul",i:'am-icon-list-ul',desc:'无序列表',init: function (editor) {
                        editor.find('.iutilsEditor-tools').on('click','button.list-ul',function(){
                            var content = editor.find(".iutilsEditor-content");
                            if(content.html()=="<div><br></div>"){
                                content.html('<ul class="no-op"><li><br></li></ul>');
                            }else{
                                content.append('<ul class="no-op"><li><br></li></ul>');
                            }
                            //同步数据
                            syncData(editor);
                        });
                    }},
                    {type:"list-ol",i:'am-icon-list-ol',desc:'有序列表',init: function (editor) {
                        editor.find('.iutilsEditor-tools').on('click','button.list-ol',function(){
                            var content = editor.find(".iutilsEditor-content");
                            if(content.html()=="<div><br></div>"){
                                content.html('<ol class="no-op"><li><br></li></ol>');
                            }else{
                                content.append('<ol class="no-op"><li><br></li></ol>');
                            }
                            //同步数据
                            syncData(editor);
                        })
                    }},
                    {type:"align-left",i:'am-icon-align-left',desc:'左对齐',init: function (editor) {
                        var tools = editor.find('.iutilsEditor-tools');
                        tools.on('click','button.align-left',function(){
                            var $this = $(this);
                            var selObj = getSelObj();
                            var currentEle=null;//当前元素
                            if(selObj!=null && selObj.baseNode!=null){
                                currentEle = $(selObj.baseNode.parentNode);
                            }
                            //判断当前节点是否可操作
                            if(!isEleOp(currentEle)){
                                return;
                            }
                            //点亮菜单
                            if(!$this.hasClass('active')){
                                if(currentEle!=null){
                                    if(currentEle.text().trim()==selObj.toString().trim()){
                                        currentEle.css("text-align","left");
                                        $this.addClass("active");
                                        tools.find('button.align-center').removeClass("active");
                                        tools.find('button.align-right').removeClass("active");
                                    }else{
                                        var html = currentEle.html();
                                        html = html.replace(new RegExp(selObj.toString(),"gm"),"<span style='text-align:left;'>"+selObj.toString()+"</span>");
                                        currentEle.html(html);
                                        $this.addClass("active");
                                        tools.find('button.align-center').removeClass("active");
                                        tools.find('button.align-right').removeClass("active");
                                    }
                                    //同步数据
                                    syncData(editor);
                                }
                            }else{
                                if(currentEle!=null){
                                    if(currentEle.text().trim()==selObj.toString().trim()){
                                        currentEle.css("text-align","inherit");
                                        $this.removeClass("active");
                                    }else{
                                        var html = currentEle.html();
                                        html = html.replace(new RegExp("<span style='text-align:left;'>"+selObj.toString()+"</span>","gm"),selObj.toString());
                                        currentEle.html(html);
                                        $this.removeClass("active");
                                    }
                                    //同步数据
                                    syncData(editor);
                                }
                            }
                        });
                    }},
                    {type:"align-center",i:'am-icon-align-center',desc:'居中',init: function (editor) {
                        var tools = editor.find('.iutilsEditor-tools');
                        tools.on('click','button.align-center',function(){
                            var $this = $(this);
                            var selObj = getSelObj();
                            var currentEle=null;//当前元素
                            if(selObj!=null && selObj.baseNode!=null){
                                currentEle = $(selObj.baseNode.parentNode);
                            }
                            //判断当前节点是否可操作
                            if(!isEleOp(currentEle)){
                                return;
                            }
                            //点亮菜单
                            if(!$this.hasClass('active')){
                                if(currentEle!=null){
                                    if(currentEle.text().trim()==selObj.toString().trim()){
                                        currentEle.css("text-align","center");
                                        $this.addClass("active");
                                        tools.find('button.align-left').removeClass("active");
                                        tools.find('button.align-right').removeClass("active");
                                    }else{
                                        var html = currentEle.html();
                                        html = html.replace(new RegExp(selObj.toString(),"gm"),"<span style='text-align:center;'>"+selObj.toString()+"</span>");
                                        currentEle.html(html);
                                        $this.addClass("active");
                                        tools.find('button.align-left').removeClass("active");
                                        tools.find('button.align-right').removeClass("active");
                                    }
                                    //同步数据
                                    syncData(editor);
                                }
                            }else{
                                if(currentEle!=null){
                                    if(currentEle.text().trim()==selObj.toString().trim()){
                                        currentEle.css("text-align","inherit");
                                        $this.removeClass("active");
                                    }else{
                                        var html = currentEle.html();
                                        html = html.replace(new RegExp("<span style='text-align:center;'>"+selObj.toString()+"</span>","gm"),selObj.toString());
                                        currentEle.html(html);
                                        $this.removeClass("active");
                                    }
                                    //同步数据
                                    syncData(editor);
                                }
                            }
                        });
                    }},
                    {type:"align-right",i:'am-icon-align-right',desc:'右对齐',init: function (editor) {
                        var tools = editor.find('.iutilsEditor-tools');
                        tools.on('click','button.align-right',function(){
                            var $this = $(this);
                            var selObj = getSelObj();
                            var currentEle=null;//当前元素
                            if(selObj!=null && selObj.baseNode!=null){
                                currentEle = $(selObj.baseNode.parentNode);
                            }
                            //判断当前节点是否可操作
                            if(!isEleOp(currentEle)){
                                return;
                            }
                            //点亮菜单
                            if(!$this.hasClass('active')){
                                if(currentEle!=null){
                                    if(currentEle.text().trim()==selObj.toString().trim()){
                                        currentEle.css("text-align","right");
                                        $this.addClass("active");
                                        tools.find('button.align-left').removeClass("active");
                                        tools.find('button.align-center').removeClass("active");
                                    }else{
                                        var html = currentEle.html();
                                        html = html.replace(new RegExp(selObj.toString(),"gm"),"<span style='text-align:right;'>"+selObj.toString()+"</span>");
                                        currentEle.html(html);
                                        $this.addClass("active");
                                        tools.find('button.align-left').removeClass("active");
                                        tools.find('button.align-center').removeClass("active");
                                    }
                                    //同步数据
                                    syncData(editor);
                                }
                            }else{
                                if(currentEle!=null){
                                    if(currentEle.text().trim()==selObj.toString().trim()){
                                        currentEle.css("text-align","inherit");
                                        $this.removeClass("active");
                                    }else{
                                        var html = currentEle.html();
                                        html = html.replace(new RegExp("<span style='text-align:right;'>"+selObj.toString()+"</span>","gm"),selObj.toString());
                                        currentEle.html(html);
                                        $this.removeClass("active");
                                    }
                                    //同步数据
                                    syncData(editor);
                                }
                            }
                        });
                    }}
                ]
            },
            {
                group:[
                    {type:"link",i:'am-icon-link',html:'<div class="am-dropdown-content"><form class="am-form am-form-horizontal"><div class="am-form-group"><div class="am-u-sm-12"><input type="text" placeholder="程序员工具" value="文本"></div></div><div class="am-form-group"><div class="am-u-sm-12"><input type="text" placeholder="http://iutils.cn" value="http://"></div></div><div class="am-form-group"><div class="am-u-sm-12"><button type="button" class="am-btn am-btn-default am-btn-xs am-align-right" style="margin-bottom:0;">确认</button></div></div></form></div>',desc:'链接',
                        init: function (editor) {
                            var buttton = editor.find('.iutilsEditor-tools').find('button.link');
                            var dropdownContent = buttton.next('.am-dropdown-content');
                            var currentEle=null;//当前元素
                            buttton.on('click',function(){
                                var selObj = getSelObj();
                                if(selObj!=null && selObj.baseNode!=null){
                                    currentEle = $(selObj.baseNode.parentNode);
                                }
                                //判断当前节点是否可操作
                                if(!isEleOp(currentEle)){
                                    return;
                                }
                                //初始化选中连接
                                if(currentEle!=null){
                                    var input = dropdownContent.find('input[type=text]');
                                    if(currentEle.is('a')){
                                        input.eq(0).val(currentEle.html());
                                        input.eq(1).val(currentEle.attr("href"))
                                    }else{
                                        input.eq(0).val(selObj.toString());
                                        input.eq(1).val("http://");
                                    }
                                    //同步数据
                                    syncData(editor);
                                }
                            });
                            dropdownContent.on('click','button',function(){
                                var input = dropdownContent.find('input[type=text]');
                                var txt = input.eq(0).val();
                                var url = input.eq(1).val();
                                if(txt!="" && url!=""){
                                    if(currentEle!=null){
                                        if(currentEle.is('a')){
                                            currentEle.html(txt);
                                            currentEle.attr("href",url);
                                        }else{
                                            var html = currentEle.html();
                                            html = html.replace(new RegExp(txt,"gm"),"<a href='"+url+"' target='_blank'>"+txt+"</a>");
                                            currentEle.html(html);
                                        }
                                    }else{
                                        var content = editor.find(".iutilsEditor-content");
                                        if(content.html()=="<div><br></div>"){
                                            content.html('<div><a href="'+url+'" target="_blank">'+txt+'</a></div>');
                                        }else{
                                            content.append('<div><a href="'+url+'" target="_blank">'+txt+'</a></div>');
                                        }
                                    }
                                    //同步数据
                                    syncData(editor);
                                }
                                //关闭弹出框
                                buttton.parent().dropdown('close');
                            });
                    }},
                    {type:"unlink",i:'am-icon-unlink',desc:'取消链接',init: function (editor) {
                        editor.find('.iutilsEditor-tools').find('button.unlink').on('click',function(){
                            var selObj = getSelObj();
                            var currentEle=null;//当前元素
                            if(selObj!=null && selObj.baseNode!=null){
                                currentEle = $(selObj.baseNode.parentNode);
                            }
                            //判断当前节点是否可操作
                            if(!isEleOp(currentEle)){
                                return;
                            }
                            if(currentEle!=null && currentEle.is('a')){
                                var html = currentEle.parent().html();
                                html = html.replace(new RegExp('<a href="'+currentEle.attr("href")+'" target="_blank">'+currentEle.html()+'</a>',"gm"),currentEle.html());
                                currentEle.parent().html(html);
                                //同步数据
                                syncData(editor);
                            }
                        });
                    }},
                    {type:"table",i:'am-icon-table',html:'<div class="am-dropdown-content" style="width: 291px;padding:10px;"><table class="choose-table no-op"><tbody class="no-op"><tr class="no-op" index="1"><td class="no-op" index="1"></td><td class="no-op" index="2"></td><td class="no-op" index="3"></td><td class="no-op" index="4"></td><td class="no-op" index="5"></td><td class="no-op" index="6"></td><td class="no-op" index="7"></td><td class="no-op" index="8"></td><td class="no-op" index="9"></td><td class="no-op" index="10"></td><td class="no-op" index="11"></td><td class="no-op" index="12"></td><td class="no-op" index="13"></td><td class="no-op" index="14"></td><td class="no-op" index="15"></td><td class="no-op" index="16"></td><td class="no-op" index="17"></td><td class="no-op" index="18"></td><td class="no-op" index="19"></td><td class="no-op" index="20"></td></tr><tr class="no-op" index="2"><td class="no-op" index="1"></td><td class="no-op" index="2"></td><td class="no-op" index="3"></td><td class="no-op" index="4"></td><td class="no-op" index="5"></td><td class="no-op" index="6"></td><td class="no-op" index="7"></td><td class="no-op" index="8"></td><td class="no-op" index="9"></td><td class="no-op" index="10"></td><td class="no-op" index="11"></td><td class="no-op" index="12"></td><td class="no-op" index="13"></td><td class="no-op" index="14"></td><td class="no-op" index="15"></td><td class="no-op" index="16"></td><td class="no-op" index="17"></td><td class="no-op" index="18"></td><td class="no-op" index="19"></td><td class="no-op" index="20"></td></tr><tr class="no-op" index="3"><td class="no-op" index="1"></td><td class="no-op" index="2"></td><td class="no-op" index="3"></td><td class="no-op" index="4"></td><td class="no-op" index="5"></td><td class="no-op" index="6"></td><td class="no-op" index="7"></td><td class="no-op" index="8"></td><td class="no-op" index="9"></td><td class="no-op" index="10"></td><td class="no-op" index="11"></td><td class="no-op" index="12"></td><td class="no-op" index="13"></td><td class="no-op" index="14"></td><td class="no-op" index="15"></td><td class="no-op" index="16"></td><td class="no-op" index="17"></td><td class="no-op" index="18"></td><td class="no-op" index="19"></td><td class="no-op" index="20"></td></tr><tr class="no-op" index="4"><td class="no-op" index="1"></td><td class="no-op" index="2"></td><td class="no-op" index="3"></td><td class="no-op" index="4"></td><td class="no-op" index="5"></td><td class="no-op" index="6"></td><td class="no-op" index="7"></td><td class="no-op" index="8"></td><td class="no-op" index="9"></td><td class="no-op" index="10"></td><td class="no-op" index="11"></td><td class="no-op" index="12"></td><td class="no-op" index="13"></td><td class="no-op" index="14"></td><td class="no-op" index="15"></td><td class="no-op" index="16"></td><td class="no-op" index="17"></td><td class="no-op" index="18"></td><td class="no-op" index="19"></td><td class="no-op" index="20"></td></tr><tr class="no-op" index="5"><td class="no-op" index="1"></td><td class="no-op" index="2"></td><td class="no-op" index="3"></td><td class="no-op" index="4"></td><td class="no-op" index="5"></td><td class="no-op" index="6"></td><td class="no-op" index="7"></td><td class="no-op" index="8"></td><td class="no-op" index="9"></td><td class="no-op" index="10"></td><td class="no-op" index="11"></td><td class="no-op" index="12"></td><td class="no-op" index="13"></td><td class="no-op" index="14"></td><td class="no-op" index="15"></td><td class="no-op" index="16"></td><td class="no-op" index="17"></td><td class="no-op" index="18"></td><td class="no-op" index="19"></td><td class="no-op" index="20"></td></tr><tr class="no-op" index="6"><td class="no-op" index="1"></td><td class="no-op" index="2"></td><td class="no-op" index="3"></td><td class="no-op" index="4"></td><td class="no-op" index="5"></td><td class="no-op" index="6"></td><td class="no-op" index="7"></td><td class="no-op" index="8"></td><td class="no-op" index="9"></td><td class="no-op" index="10"></td><td class="no-op" index="11"></td><td class="no-op" index="12"></td><td class="no-op" index="13"></td><td class="no-op" index="14"></td><td class="no-op" index="15"></td><td class="no-op" index="16"></td><td class="no-op" index="17"></td><td class="no-op" index="18"></td><td class="no-op" index="19"></td><td class="no-op" index="20"></td></tr><tr class="no-op" index="7"><td class="no-op" index="1"></td><td class="no-op" index="2"></td><td class="no-op" index="3"></td><td class="no-op" index="4"></td><td class="no-op" index="5"></td><td class="no-op" index="6"></td><td class="no-op" index="7"></td><td class="no-op" index="8"></td><td class="no-op" index="9"></td><td class="no-op" index="10"></td><td class="no-op" index="11"></td><td class="no-op" index="12"></td><td class="no-op" index="13"></td><td class="no-op" index="14"></td><td class="no-op" index="15"></td><td class="no-op" index="16"></td><td class="no-op" index="17"></td><td class="no-op" index="18"></td><td class="no-op" index="19"></td><td class="no-op" index="20"></td></tr><tr class="no-op" index="8"><td class="no-op" index="1"></td><td class="no-op" index="2"></td><td class="no-op" index="3"></td><td class="no-op" index="4"></td><td class="no-op" index="5"></td><td class="no-op" index="6"></td><td class="no-op" index="7"></td><td class="no-op" index="8"></td><td class="no-op" index="9"></td><td class="no-op" index="10"></td><td class="no-op" index="11"></td><td class="no-op" index="12"></td><td class="no-op" index="13"></td><td class="no-op" index="14"></td><td class="no-op" index="15"></td><td class="no-op" index="16"></td><td class="no-op" index="17"></td><td class="no-op" index="18"></td><td class="no-op" index="19"></td><td class="no-op" index="20"></td></tr><tr class="no-op" index="9"><td class="no-op" index="1"></td><td class="no-op" index="2"></td><td class="no-op" index="3"></td><td class="no-op" index="4"></td><td class="no-op" index="5"></td><td class="no-op" index="6"></td><td class="no-op" index="7"></td><td class="no-op" index="8"></td><td class="no-op" index="9"></td><td class="no-op" index="10"></td><td class="no-op" index="11"></td><td class="no-op" index="12"></td><td class="no-op" index="13"></td><td class="no-op" index="14"></td><td class="no-op" index="15"></td><td class="no-op" index="16"></td><td class="no-op" index="17"></td><td class="no-op" index="18"></td><td class="no-op" index="19"></td><td class="no-op" index="20"></td></tr><tr class="no-op" index="10"><td class="no-op" index="1"></td><td class="no-op" index="2"></td><td class="no-op" index="3"></td><td class="no-op" index="4"></td><td class="no-op" index="5"></td><td class="no-op" index="6"></td><td class="no-op" index="7"></td><td class="no-op" index="8"></td><td class="no-op" index="9"></td><td class="no-op" index="10"></td><td class="no-op" index="11"></td><td class="no-op" index="12"></td><td class="no-op" index="13"></td><td class="no-op" index="14"></td><td class="no-op" index="15"></td><td class="no-op" index="16"></td><td class="no-op" index="17"></td><td class="no-op" index="18"></td><td class="no-op" index="19"></td><td class="no-op" index="20"></td></tr><tr class="no-op" index="11"><td class="no-op" index="1"></td><td class="no-op" index="2"></td><td class="no-op" index="3"></td><td class="no-op" index="4"></td><td class="no-op" index="5"></td><td class="no-op" index="6"></td><td class="no-op" index="7"></td><td class="no-op" index="8"></td><td class="no-op" index="9"></td><td class="no-op" index="10"></td><td class="no-op" index="11"></td><td class="no-op" index="12"></td><td class="no-op" index="13"></td><td class="no-op" index="14"></td><td class="no-op" index="15"></td><td class="no-op" index="16"></td><td class="no-op" index="17"></td><td class="no-op" index="18"></td><td class="no-op" index="19"></td><td class="no-op" index="20"></td></tr><tr class="no-op" index="12"><td class="no-op" index="1"></td><td class="no-op" index="2"></td><td class="no-op" index="3"></td><td class="no-op" index="4"></td><td class="no-op" index="5"></td><td class="no-op" index="6"></td><td class="no-op" index="7"></td><td class="no-op" index="8"></td><td class="no-op" index="9"></td><td class="no-op" index="10"></td><td class="no-op" index="11"></td><td class="no-op" index="12"></td><td class="no-op" index="13"></td><td class="no-op" index="14"></td><td class="no-op" index="15"></td><td class="no-op" index="16"></td><td class="no-op" index="17"></td><td class="no-op" index="18"></td><td class="no-op" index="19"></td><td class="no-op" index="20"></td></tr><tr class="no-op" index="13"><td class="no-op" index="1"></td><td class="no-op" index="2"></td><td class="no-op" index="3"></td><td class="no-op" index="4"></td><td class="no-op" index="5"></td><td class="no-op" index="6"></td><td class="no-op" index="7"></td><td class="no-op" index="8"></td><td class="no-op" index="9"></td><td class="no-op" index="10"></td><td class="no-op" index="11"></td><td class="no-op" index="12"></td><td class="no-op" index="13"></td><td class="no-op" index="14"></td><td class="no-op" index="15"></td><td class="no-op" index="16"></td><td class="no-op" index="17"></td><td class="no-op" index="18"></td><td class="no-op" index="19"></td><td class="no-op" index="20"></td></tr><tr class="no-op" index="14"><td class="no-op" index="1"></td><td class="no-op" index="2"></td><td class="no-op" index="3"></td><td class="no-op" index="4"></td><td class="no-op" index="5"></td><td class="no-op" index="6"></td><td class="no-op" index="7"></td><td class="no-op" index="8"></td><td class="no-op" index="9"></td><td class="no-op" index="10"></td><td class="no-op" index="11"></td><td class="no-op" index="12"></td><td class="no-op" index="13"></td><td class="no-op" index="14"></td><td class="no-op" index="15"></td><td class="no-op" index="16"></td><td class="no-op" index="17"></td><td class="no-op" index="18"></td><td class="no-op" index="19"></td><td class="no-op" index="20"></td></tr><tr class="no-op" index="15"><td class="no-op" index="1"></td><td class="no-op" index="2"></td><td class="no-op" index="3"></td><td class="no-op" index="4"></td><td class="no-op" index="5"></td><td class="no-op" index="6"></td><td class="no-op" index="7"></td><td class="no-op" index="8"></td><td class="no-op" index="9"></td><td class="no-op" index="10"></td><td class="no-op" index="11"></td><td class="no-op" index="12"></td><td class="no-op" index="13"></td><td class="no-op" index="14"></td><td class="no-op" index="15"></td><td class="no-op" index="16"></td><td class="no-op" index="17"></td><td class="no-op" index="18"></td><td class="no-op" index="19"></td><td class="no-op" index="20"></td></tr></tbody></table><div class="choose-table-footer"><span>0</span><span> 行 </span><span>0</span><span> 列 </span></div></div>',desc:'表格',
                        init: function (editor) {
                            var buttton = editor.find('.iutilsEditor-tools').find('button.table');
                            var dropdownContent = buttton.next('.am-dropdown-content');
                            dropdownContent.on('mousemove','td',function(){
                                var col = parseInt($(this).attr("index"));
                                var row = parseInt($(this).parent().attr("index"));
                                dropdownContent.find("td").removeClass("active");
                                for(var i=0;i<row;i++){
                                    for(var j=0;j<col;j++){
                                        dropdownContent.find("tr").eq(i).find("td").eq(j).addClass("active");
                                    }
                                }
                            });
                            dropdownContent.on('mouseleave','td',function(){
                                dropdownContent.find("td").removeClass("active");
                            });
                            dropdownContent.on('click','td',function(){
                                var col = parseInt($(this).attr("index"));
                                var row = parseInt($(this).parent().attr("index"));
                                var table = '<table class="am-table am-table-bordered">';
                                for(var i=0;i<row;i++){
                                    table += '<tr>';
                                    for(var j=0;j<col;j++){
                                        table += '<td>&nbsp;</td>';
                                    }
                                    table += '</tr>';
                                }
                                table += '</table>';
                                var content = editor.find(".iutilsEditor-content");
                                if(content.html()=="<div><br></div>"){
                                    content.html(table);
                                }else{
                                    content.append(table);
                                }
                                //同步数据
                                syncData(editor);
                                //关闭弹出框
                                buttton.parent().dropdown('close');
                            });
                    }},
                    {type:"smile",i:'am-icon-smile-o',html:'<ul class="am-dropdown-content" style="width: 320px;padding: 5px;">'+getSmile()+'</ul>',desc:'表情',init: function (editor) {
                        var buttton = editor.find('.iutilsEditor-tools').find('button.smile');
                        var dropdownContent = buttton.next('.am-dropdown-content');
                        dropdownContent.on('click','li',function(){
                            var content = editor.find(".iutilsEditor-content");
                            if(content.html()=="<div><br></div>"){
                                content.html($(this).html());
                            }else{
                                content.append($(this).html());
                            }
                            //同步数据
                            syncData(editor);
                            //关闭弹出框
                            buttton.parent().dropdown('close');
                        });
                    }},
                    {type:"picture",i:'am-icon-picture-o',desc:'图片',init: function (editor) {
                        var buttton = editor.find('.iutilsEditor-tools').find('button.picture');
                        //插入隐藏input file
                        var fileId = parseInt(Math.random()*1000);
                        $('<input type="file" id="file'+fileId+'" name="file" accept="image/png,image/jpeg,image/gif" style="display:none;" />').insertAfter(buttton);
                        buttton.on('click',function(){
                            $("#file"+fileId).click();
                        });
                        //监听后上传图片 此处依赖ajaxfileupload.js插件
                        $("#file"+fileId).change(function(){
                            $.ajaxFileUpload({
                                url: ctx+'/upload/local',
                                type: 'post',
                                secureuri: false,
                                fileElementId: 'file'+fileId,
                                dataType: 'text',
                                success: function (data, status){
                                    data = JSON.parse(data.replace(/<[^>]+>/g,""));
                                    if(data.ret==1){
                                        //上传成功

                                    }else{
                                        alert(data.msg);
                                    }
                                },
                                error: function (data, status, e){
                                    alert("上传失败");
                                }
                            });
                        });
                    }},
                    {type:"folder",i:'am-icon-folder-o',desc:'文件',init: function (editor) {
                        var buttton = editor.find('.iutilsEditor-tools').find('button.folder');
                        //插入隐藏input file
                        var fileId = parseInt(Math.random()*1000);
                        $('<input type="file" id="file'+fileId+'" name="file" style="display:none;" />').insertAfter(buttton);
                        buttton.on('click',function(){
                            $("#file"+fileId).click();
                        });
                        //监听后上传文件 此处依赖ajaxfileupload.js插件
                        $("#file"+fileId).change(function(){
                            $.ajaxFileUpload({
                                url: ctx+'/upload/local',
                                type: 'post',
                                secureuri: false,
                                fileElementId: 'file'+fileId,
                                dataType: 'text',
                                success: function (data, status){
                                    data = JSON.parse(data.replace(/<[^>]+>/g,""));
                                    if(data.ret==1){
                                        //上传成功

                                    }else{
                                        alert(data.msg);
                                    }
                                },
                                error: function (data, status, e){
                                    alert("上传失败");
                                }
                            });
                        });
                    }},
                    {type:"video",i:'am-icon-video-camera',html:'<div class="am-dropdown-content" style="width: 312px;"><form class="am-form am-form-horizontal"><div class="am-form-group"><div class="am-u-sm-12"><textarea rows="5"><iframe class="no-op" height="498" width="510" src="[视频地址]" frameborder=0 allowfullscreen></iframe></textarea></div></div><div class="am-form-group"><div class="am-u-sm-12"><button type="button" class="am-btn am-btn-default am-btn-xs am-align-right" style="margin-bottom:0;">确认</button></div></div></form></div>',desc:'在线视频',
                        init: function (editor) {
                            var buttton = editor.find('.iutilsEditor-tools').find('button.video');
                            var dropdownContent = buttton.next('.am-dropdown-content');
                            dropdownContent.on('click','button',function(){
                                var textarea = dropdownContent.find("textarea");
                                if(textarea.val()!=""){
                                    var content = editor.find(".iutilsEditor-content");
                                    if(content.html()=="<div><br></div>"){
                                        content.html(textarea.val());
                                    }else{
                                        content.append(textarea.val());
                                    }
                                }
                                //同步数据
                                syncData(editor);
                                //关闭弹出框
                                buttton.parent().dropdown('close');
                            });
                    }},
                    {type:"terminal",i:'am-icon-terminal',html:'<div class="am-dropdown-content" style="width: 312px;"><form class="am-form am-form-horizontal"><div class="am-form-group"><div class="am-u-sm-12"><textarea rows="5"></textarea></div></div><div class="am-form-group"><div class="am-u-sm-12"><button type="button" class="am-btn am-btn-default am-btn-xs am-align-right" style="margin-bottom:0;">确认</button></div></div></form></div>',desc:'插入代码',
                        init: function (editor) {
                            var buttton = editor.find('.iutilsEditor-tools').find('button.terminal');
                            var dropdownContent = buttton.next('.am-dropdown-content');
                            dropdownContent.on('click','button',function(){
                                var textarea = dropdownContent.find("textarea");
                                if(textarea.val()!=""){
                                    var content = editor.find(".iutilsEditor-content");
                                    if(content.html()=="<div><br></div>"){
                                        content.html("<pre class='am-pre-scrollable'>"+textarea.val()+"</pre>");
                                    }else{
                                        content.append("<pre class='am-pre-scrollable'>"+textarea.val()+"</pre>");
                                    }
                                }
                                //同步数据
                                syncData(editor);
                                //关闭弹出框
                                buttton.parent().dropdown('close');
                            });
                    }}
                ]
            },
            {
                group:[
                    //{type:"undo",i:'am-icon-undo',desc:'撤销',init: function (editor) {
                    //
                    //}},
                    //{type:"repeat",i:'am-icon-repeat',desc:'重复',init: function (editor) {
                    //
                    //}},
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

    $.fn.iutilsEditor = function (options) {
        var settings = $.extend({},defaults, options);
        //初始化界面
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
        html += '</div></div><textarea class="iutilsEditor-code"></textarea><div class="iutilsEditor-content" contenteditable="true"></div></div>';
        $(html).insertAfter(this);
        //隐藏定位元素
        var textarea = $(this);
        textarea.hide();
        //编辑器对象
        var editor = textarea.next();
        //初始化菜单绑定
        for(var i=0;i<settings.menus.length;i++){
            var groups = settings.menus[i].group;
            for(var j=0;j<groups.length;j++){
                var menu = groups[j];
                menu.init && menu.init(editor);
            }
        }
        //绑定事件
        $(document.body).on('click','.am-dropdown',function(){
            var $this = $(this);
            $($this).dropdown('open');
        });
        //监听源码和内容同步
        var code = editor.find(".iutilsEditor-code");
        var content = editor.find(".iutilsEditor-content");
        code.on('keydown keyup',function(){
            content.html($(this).val());//同步到内容面板
            textarea.val($(this).val());//同步表单内容
        });
        content.on('keydown keyup',function(){
            code.val($(this).html());//同步到源码记录器
            textarea.val($(this).html());//同步表单内容
            if($(this).html()=="" || $(this).html()=="<br>"){
                content.html("<div><br></div>");
            }
        });
        //初始化内容
        content.html("<div><br></div>");
        //绑定按钮状态监听
        content.mouseup(function(){
            var selObj = getSelObj();
            var currentEle=null;//当前元素
            if(selObj!=null && selObj.baseNode!=null){
                currentEle = $(selObj.baseNode.parentNode);
            }
            if(currentEle!=null){
                var tools = editor.find('.iutilsEditor-tools');
                //是否粗体
                if(currentEle.css("font-weight")=="bold"){
                    tools.find('button.bold').addClass("active");
                }else{
                    tools.find('button.bold').removeClass("active");
                }
                //是否斜体
                if(currentEle.css("font-style")=="italic"){
                    tools.find('button.italic').addClass("active");
                }else{
                    tools.find('button.italic').removeClass("active");
                }
                //是否下划线
                if(currentEle.css("text-decoration")=="underline"){
                    tools.find('button.underline').addClass("active");
                }else{
                    tools.find('button.underline').removeClass("active");
                }
                //是否删除线
                if(currentEle.css("text-decoration")=="line-through"){
                    tools.find('button.strikethrough').addClass("active");
                }else{
                    tools.find('button.strikethrough').removeClass("active");
                }
                //是否居左
                if(currentEle.css("text-align")=="left"){
                    tools.find('button.align-left').addClass("active");
                }else{
                    tools.find('button.align-left').removeClass("active");
                }
                //是否居中
                if(currentEle.css("text-align")=="center"){
                    tools.find('button.align-center').addClass("active");
                }else{
                    tools.find('button.align-center').removeClass("active");
                }
                //是否居右
                if(currentEle.css("text-align")=="right"){
                    tools.find('button.align-right').addClass("active");
                }else{
                    tools.find('button.align-right').removeClass("active");
                }
            }
        });
    }

    //同步数据
    function syncData(editor){
        var code = editor.find(".iutilsEditor-code");//源码对象
        var content = editor.find(".iutilsEditor-content");//内容对象
        var textarea = editor.prev();//源码存放对象
        code.val(content.html());//同步到源码记录器
        textarea.val(content.html());//同步表单内容
    }

    //判断当前节点是否可以操作
    function isEleOp(currentEle){
        if(currentEle!=null && !currentEle.hasClass("iutilsEditor-content") && !currentEle.hasClass("iutilsEditor") && !currentEle.hasClass("no-op")){
            return true;//可操作
        }else{
            return false;//可操作
        }
    }

    //获取表情包
    function getSmile(){
        var html='';
        for(var i=1;i<=130;i++){
            html+='<li class="smile"><img class="no-op" src="img/qq/'+i+'.gif" /></li>';
        }
        return html;
    }
    //获取选中的内容
    function getSelObj(){
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
})(jQuery);
