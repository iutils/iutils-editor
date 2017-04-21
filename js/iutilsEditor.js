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
                        editor.find('.iutilsEditor-tools').on('click','button.code',function(){
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
                                editor.find('.iutilsEditor-tools').find(".am-btn-iutils").each(function(){
                                    if(!$(this).hasClass('active')){
                                        $(this).attr("disabled",true);
                                    }
                                });
                            }else{
                                $this.removeClass("active");
                                $iutilsEditorCode.hide();
                                $iutilsEditorContent.show();
                                //启用工具栏菜单
                                editor.find('.iutilsEditor-tools').find(".am-btn-iutils").each(function(){
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
                            var dropdownContent = buttton.next('.am-dropdown-content');
                            dropdownContent.on('click','button',function(){
                                if(editor.find(".iutilsEditor-code").val()!=""){
                                    var selObj = getSelObj();
                                    var currentEle=null;//当前元素
                                    if(selObj!=null){
                                        currentEle = $(selObj.baseNode.parentNode);
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
                            if(selObj!=null){
                                currentEle = $(selObj.baseNode.parentNode);
                            }
                            //点亮菜单
                            if(!$this.hasClass('active')){
                                if(currentEle!=null){
                                    if(currentEle.text()==selObj.toString()){
                                        currentEle.css("font-weight","bold");
                                        $this.addClass("active");
                                    }else{
                                        var html = currentEle.html();
                                        html = html.replace(new RegExp(selObj.toString(),"gm"),"<span style='font-weight:bold;'>"+selObj.toString()+"</span>");
                                        currentEle.html(html);
                                        $this.addClass("active");
                                    }
                                }
                            }else{
                                if(currentEle!=null){
                                    if(currentEle.text()==selObj.toString()){
                                        currentEle.css("font-weight","normal");
                                        $this.removeClass("active");
                                    }else{
                                        var html = currentEle.html();
                                        html = html.replace(new RegExp("<span style='font-weight:bold;'>"+selObj.toString()+"</span>","gm"),selObj.toString());
                                        currentEle.html(html);
                                        $this.removeClass("active");
                                    }
                                }
                            }
                        });
                    }},
                    {type:"italic",i:'am-icon-italic',desc:'斜体',init: function (editor) {
                        editor.find('.iutilsEditor-tools').on('click','button.italic',function(){
                            var $this = $(this);
                            var selObj = getSelObj();
                            var currentEle=null;//当前元素
                            if(selObj!=null){
                                currentEle = $(selObj.baseNode.parentNode);
                            }
                            //点亮菜单
                            if(!$this.hasClass('active')){
                                if(currentEle!=null){
                                    if(currentEle.text()==selObj.toString()){
                                        currentEle.css("font-style","italic");
                                        $this.addClass("active");
                                    }else{
                                        var html = currentEle.html();
                                        html = html.replace(new RegExp(selObj.toString(),"gm"),"<span style='font-style:italic;'>"+selObj.toString()+"</span>");
                                        currentEle.html(html);
                                        $this.addClass("active");
                                    }
                                }
                            }else{
                                if(currentEle!=null){
                                    if(currentEle.text()==selObj.toString()){
                                        currentEle.css("font-style","normal");
                                        $this.removeClass("active");
                                    }else{
                                        var html = currentEle.html();
                                        html = html.replace(new RegExp("<span style='font-style:italic;'>"+selObj.toString()+"</span>","gm"),selObj.toString());
                                        currentEle.html(html);
                                        $this.removeClass("active");
                                    }
                                }
                            }
                        });
                    }},
                    {type:"underline",i:'am-icon-underline',desc:'下划线',init: function (editor) {
                        editor.find('.iutilsEditor-tools').on('click','button.underline',function(){
                            var $this = $(this);
                            var selObj = getSelObj();
                            var currentEle=null;//当前元素
                            if(selObj!=null){
                                currentEle = $(selObj.baseNode.parentNode);
                            }
                            //点亮菜单
                            if(!$this.hasClass('active')){
                                if(currentEle!=null){
                                    if(currentEle.text()==selObj.toString()){
                                        currentEle.css("text-decoration","underline");
                                        $this.addClass("active");
                                        editor.find('.iutilsEditor-tools').find('button.strikethrough').removeClass("active");
                                    }else{
                                        var html = currentEle.html();
                                        html = html.replace(new RegExp(selObj.toString(),"gm"),"<span style='text-decoration:underline;'>"+selObj.toString()+"</span>");
                                        currentEle.html(html);
                                        $this.addClass("active");
                                        editor.find('.iutilsEditor-tools').find('button.strikethrough').removeClass("active");
                                    }
                                }
                            }else{
                                if(currentEle!=null){
                                    if(currentEle.text()==selObj.toString()){
                                        currentEle.css("text-decoration","none");
                                        $this.removeClass("active");
                                    }else{
                                        var html = currentEle.html();
                                        html = html.replace(new RegExp("<span style='text-decoration:underline;'>"+selObj.toString()+"</span>","gm"),selObj.toString());
                                        currentEle.html(html);
                                        $this.removeClass("active");
                                    }
                                }
                            }
                        });
                    }},
                    {type:"strikethrough",i:'am-icon-strikethrough',desc:'删除线',init: function (editor) {
                        editor.find('.iutilsEditor-tools').on('click','button.strikethrough',function(){
                            var $this = $(this);
                            var selObj = getSelObj();
                            var currentEle=null;//当前元素
                            if(selObj!=null){
                                currentEle = $(selObj.baseNode.parentNode);
                            }
                            //点亮菜单
                            if(!$this.hasClass('active')){
                                if(currentEle!=null){
                                    if(currentEle.text()==selObj.toString()){
                                        currentEle.css("text-decoration","line-through");
                                        $this.addClass("active");
                                        editor.find('.iutilsEditor-tools').find('button.underline').removeClass("active");
                                    }else{
                                        var html = currentEle.html();
                                        html = html.replace(new RegExp(selObj.toString(),"gm"),"<span style='text-decoration:line-through;'>"+selObj.toString()+"</span>");
                                        currentEle.html(html);
                                        $this.addClass("active");
                                        editor.find('.iutilsEditor-tools').find('button.underline').removeClass("active");
                                    }
                                }
                            }else{
                                if(currentEle!=null){
                                    if(currentEle.text()==selObj.toString()){
                                        currentEle.css("text-decoration","none");
                                        $this.removeClass("active");
                                    }else{
                                        var html = currentEle.html();
                                        html = html.replace(new RegExp("<span style='text-decoration:line-through;'>"+selObj.toString()+"</span>","gm"),selObj.toString());
                                        currentEle.html(html);
                                        $this.removeClass("active");
                                    }
                                }
                            }
                        });
                    }},
                    {type:"eraser",i:'am-icon-eraser',desc:'清除格式',init: function (editor) {
                        editor.find('.iutilsEditor-tools').on('click','button.eraser',function(){
                            var selObj = getSelObj();
                            var currentEle=null;//当前元素
                            if(selObj!=null){
                                currentEle = $(selObj.baseNode.parentNode);
                            }
                            if(currentEle!=null){
                                var text = currentEle.text();
                                currentEle.html(text);
                                currentEle.removeAttr("style");
                            }
                        });
                    }},
                    {type:"header",i:'am-icon-header',html:'<ul class="am-dropdown-content"><li><a href="#"><h1>标题1</h1></a></li><li><a href="#"><h2>标题2</h2></a></li><li><a href="#"><h3>标题3</h3></a></li><li><a href="#"><h4>标题4</h4></a></li><li><a href="#"><h5>标题5</h5></a></li><li><a href="#"><h6>标题6</h6></a></li></ul>',desc:'标题',
                        init: function (editor) {
                            var buttton = editor.find('.iutilsEditor-tools').find('button.header');
                            var dropdownContent = buttton.next('.am-dropdown-content');
                            dropdownContent.on('click','a',function(){
                                if(editor.find(".iutilsEditor-content").html()=="<div><br></div>"){
                                    editor.find(".iutilsEditor-content").html($(this).html());
                                }else{
                                    editor.find(".iutilsEditor-content").append($(this).html());
                                }
                                //关闭弹出框
                                buttton.parent().dropdown('close');
                            });
                    }}
                ]
            },
            {
                group:[
                    {type:"list-ul",i:'am-icon-list-ul',desc:'无序列表',init: function (editor) {
                        editor.find('.iutilsEditor-tools').on('click','button.list-ul',function(){
                            if(editor.find(".iutilsEditor-content").html()=="<div><br></div>"){
                                editor.find(".iutilsEditor-content").html('<ul><li><br></li></ul>');
                            }else{
                                editor.find(".iutilsEditor-content").append('<ul><li><br></li></ul>');
                            }
                        });
                    }},
                    {type:"list-ol",i:'am-icon-list-ol',desc:'有序列表',init: function (editor) {
                        editor.find('.iutilsEditor-tools').on('click','button.list-ol',function(){
                            if(editor.find(".iutilsEditor-content").html()=="<div><br></div>"){
                                editor.find(".iutilsEditor-content").html('<ol><li><br></li></ol>');
                            }else{
                                editor.find(".iutilsEditor-content").append('<ol><li><br></li></ol>');
                            }
                        })
                    }},
                    {type:"align-left",i:'am-icon-align-left',desc:'左对齐',init: function (editor) {
                        editor.find('.iutilsEditor-tools').on('click','button.align-left',function(){
                            var $this = $(this);
                            var selObj = getSelObj();
                            var currentEle=null;//当前元素
                            if(selObj!=null){
                                currentEle = $(selObj.baseNode.parentNode);
                            }
                            //点亮菜单
                            if(!$this.hasClass('active')){
                                if(currentEle!=null){
                                    if(currentEle.text()==selObj.toString()){
                                        currentEle.css("text-align","left");
                                        $this.addClass("active");
                                        editor.find('.iutilsEditor-tools').find('button.align-center').removeClass("active");
                                        editor.find('.iutilsEditor-tools').find('button.align-right').removeClass("active");
                                    }else{
                                        var html = currentEle.html();
                                        html = html.replace(new RegExp(selObj.toString(),"gm"),"<span style='text-align:left;'>"+selObj.toString()+"</span>");
                                        currentEle.html(html);
                                        $this.addClass("active");
                                        editor.find('.iutilsEditor-tools').find('button.align-center').removeClass("active");
                                        editor.find('.iutilsEditor-tools').find('button.align-right').removeClass("active");
                                    }
                                }
                            }else{
                                if(currentEle!=null){
                                    if(currentEle.text()==selObj.toString()){
                                        currentEle.css("text-align","inherit");
                                        $this.removeClass("active");
                                    }else{
                                        var html = currentEle.html();
                                        html = html.replace(new RegExp("<span style='text-align:left;'>"+selObj.toString()+"</span>","gm"),selObj.toString());
                                        currentEle.html(html);
                                        $this.removeClass("active");
                                    }
                                }
                            }
                        });
                    }},
                    {type:"align-center",i:'am-icon-align-center',desc:'居中',init: function (editor) {
                        editor.find('.iutilsEditor-tools').on('click','button.align-center',function(){
                            var $this = $(this);
                            var selObj = getSelObj();
                            var currentEle=null;//当前元素
                            if(selObj!=null){
                                currentEle = $(selObj.baseNode.parentNode);
                            }
                            //点亮菜单
                            if(!$this.hasClass('active')){
                                if(currentEle!=null){
                                    if(currentEle.text()==selObj.toString()){
                                        currentEle.css("text-align","center");
                                        $this.addClass("active");
                                        editor.find('.iutilsEditor-tools').find('button.align-left').removeClass("active");
                                        editor.find('.iutilsEditor-tools').find('button.align-right').removeClass("active");
                                    }else{
                                        var html = currentEle.html();
                                        html = html.replace(new RegExp(selObj.toString(),"gm"),"<span style='text-align:center;'>"+selObj.toString()+"</span>");
                                        currentEle.html(html);
                                        $this.addClass("active");
                                        editor.find('.iutilsEditor-tools').find('button.align-left').removeClass("active");
                                        editor.find('.iutilsEditor-tools').find('button.align-right').removeClass("active");
                                    }
                                }
                            }else{
                                if(currentEle!=null){
                                    if(currentEle.text()==selObj.toString()){
                                        currentEle.css("text-align","inherit");
                                        $this.removeClass("active");
                                    }else{
                                        var html = currentEle.html();
                                        html = html.replace(new RegExp("<span style='text-align:center;'>"+selObj.toString()+"</span>","gm"),selObj.toString());
                                        currentEle.html(html);
                                        $this.removeClass("active");
                                    }
                                }
                            }
                        });
                    }},
                    {type:"align-right",i:'am-icon-align-right',desc:'右对齐',init: function (editor) {
                        editor.find('.iutilsEditor-tools').on('click','button.align-right',function(){
                            var $this = $(this);
                            var selObj = getSelObj();
                            var currentEle=null;//当前元素
                            if(selObj!=null){
                                currentEle = $(selObj.baseNode.parentNode);
                            }
                            //点亮菜单
                            if(!$this.hasClass('active')){
                                if(currentEle!=null){
                                    if(currentEle.text()==selObj.toString()){
                                        currentEle.css("text-align","right");
                                        $this.addClass("active");
                                        editor.find('.iutilsEditor-tools').find('button.align-left').removeClass("active");
                                        editor.find('.iutilsEditor-tools').find('button.align-center').removeClass("active");
                                    }else{
                                        var html = currentEle.html();
                                        html = html.replace(new RegExp(selObj.toString(),"gm"),"<span style='text-align:right;'>"+selObj.toString()+"</span>");
                                        currentEle.html(html);
                                        $this.addClass("active");
                                        editor.find('.iutilsEditor-tools').find('button.align-left').removeClass("active");
                                        editor.find('.iutilsEditor-tools').find('button.align-center').removeClass("active");
                                    }
                                }
                            }else{
                                if(currentEle!=null){
                                    if(currentEle.text()==selObj.toString()){
                                        currentEle.css("text-align","inherit");
                                        $this.removeClass("active");
                                    }else{
                                        var html = currentEle.html();
                                        html = html.replace(new RegExp("<span style='text-align:right;'>"+selObj.toString()+"</span>","gm"),selObj.toString());
                                        currentEle.html(html);
                                        $this.removeClass("active");
                                    }
                                }
                            }
                        });
                    }},
                    {type:"text-height",i:'am-icon-text-height',desc:'文本高度',init: function (editor) {
                        editor.find('.iutilsEditor-tools').on('click','button.text-height',function(){
                            var selObj = getSelObj();
                            var currentEle=null;//当前元素
                            if(selObj!=null){
                                currentEle = $(selObj.baseNode.parentNode);
                            }
                            if(currentEle!=null){
                                var lineHeight = currentEle.css("line-height");
                                var index = lineHeight.lastIndexOf("px");
                                if(index>-1){
                                    lineHeight = parseInt(lineHeight.substring(0,index));
                                }else{
                                    lineHeight = parseInt(lineHeight);
                                }
                                currentEle.css("line-height",(lineHeight+1)+"px");
                            }
                        });
                    }},
                    {type:"text-width",i:'am-icon-text-width',desc:'文本宽度',init: function (editor) {
                        editor.find('.iutilsEditor-tools').on('click','button.text-width',function(){
                            var selObj = getSelObj();
                            var currentEle=null;//当前元素
                            if(selObj!=null){
                                currentEle = $(selObj.baseNode.parentNode);
                            }
                            if(currentEle!=null){
                                var letterSpacing = currentEle.css("letter-spacing");
                                var index = letterSpacing.lastIndexOf("px");
                                if(index>-1){
                                    letterSpacing = parseInt(letterSpacing.substring(0,index));
                                }else{
                                    letterSpacing = parseInt(letterSpacing);
                                }
                                currentEle.css("letter-spacing",(letterSpacing+1)+"px");
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
                            dropdownContent.on('click','button',function(){
                                var input = dropdownContent.find('input[type=text]');
                                var txt = input.eq(0).val();
                                var url = input.eq(1).val();
                                if(txt!="" && url!=""){
                                    if(editor.find(".iutilsEditor-content").html()=="<div><br></div>"){
                                        editor.find(".iutilsEditor-content").html('<div><a href="'+url+'" target="_blank">'+txt+'</a></div>');
                                    }else{
                                        editor.find(".iutilsEditor-content").append('<div><a href="'+url+'" target="_blank">'+txt+'</a></div>');
                                    }
                                }
                                //关闭弹出框
                                buttton.parent().dropdown('close');
                            });
                    }},
                    {type:"unlink",i:'am-icon-unlink',desc:'取消链接',init: function (editor) {
                        editor.find('.iutilsEditor-tools').find('button.unlink').on('click',function(){
                            var selObj = getSelObj();
                            var currentEle=null;//当前元素
                            if(selObj!=null){
                                currentEle = $(selObj.baseNode.parentNode);
                            }
                            if(currentEle!=null && currentEle.is('a')){
                                var html = currentEle.parent().html();
                                html = html.replace(new RegExp('<a href="'+currentEle.attr("href")+'" target="_blank">'+currentEle.html()+'</a>',"gm"),currentEle.html());
                                currentEle.parent().html(html);
                            }
                        });
                    }},
                    {type:"table",i:'am-icon-table',html:'<div class="am-dropdown-content" style="width: 291px;padding:10px;"><table class="choose-table" ><tbody><tr index="1"><td index="1"></td><td index="2"></td><td index="3"></td><td index="4"></td><td index="5"></td><td index="6"></td><td index="7"></td><td index="8"></td><td index="9"></td><td index="10"></td><td index="11"></td><td index="12"></td><td index="13"></td><td index="14"></td><td index="15"></td><td index="16"></td><td index="17"></td><td index="18"></td><td index="19"></td><td index="20"></td></tr><tr index="2"><td index="1"></td><td index="2"></td><td index="3"></td><td index="4"></td><td index="5"></td><td index="6"></td><td index="7"></td><td index="8"></td><td index="9"></td><td index="10"></td><td index="11"></td><td index="12"></td><td index="13"></td><td index="14"></td><td index="15"></td><td index="16"></td><td index="17"></td><td index="18"></td><td index="19"></td><td index="20"></td></tr><tr index="3"><td index="1"></td><td index="2"></td><td index="3"></td><td index="4"></td><td index="5"></td><td index="6"></td><td index="7"></td><td index="8"></td><td index="9"></td><td index="10"></td><td index="11"></td><td index="12"></td><td index="13"></td><td index="14"></td><td index="15"></td><td index="16"></td><td index="17"></td><td index="18"></td><td index="19"></td><td index="20"></td></tr><tr index="4"><td index="1"></td><td index="2"></td><td index="3"></td><td index="4"></td><td index="5"></td><td index="6"></td><td index="7"></td><td index="8"></td><td index="9"></td><td index="10"></td><td index="11"></td><td index="12"></td><td index="13"></td><td index="14"></td><td index="15"></td><td index="16"></td><td index="17"></td><td index="18"></td><td index="19"></td><td index="20"></td></tr><tr index="5"><td index="1"></td><td index="2"></td><td index="3"></td><td index="4"></td><td index="5"></td><td index="6"></td><td index="7"></td><td index="8"></td><td index="9"></td><td index="10"></td><td index="11"></td><td index="12"></td><td index="13"></td><td index="14"></td><td index="15"></td><td index="16"></td><td index="17"></td><td index="18"></td><td index="19"></td><td index="20"></td></tr><tr index="6"><td index="1"></td><td index="2"></td><td index="3"></td><td index="4"></td><td index="5"></td><td index="6"></td><td index="7"></td><td index="8"></td><td index="9"></td><td index="10"></td><td index="11"></td><td index="12"></td><td index="13"></td><td index="14"></td><td index="15"></td><td index="16"></td><td index="17"></td><td index="18"></td><td index="19"></td><td index="20"></td></tr><tr index="7"><td index="1"></td><td index="2"></td><td index="3"></td><td index="4"></td><td index="5"></td><td index="6"></td><td index="7"></td><td index="8"></td><td index="9"></td><td index="10"></td><td index="11"></td><td index="12"></td><td index="13"></td><td index="14"></td><td index="15"></td><td index="16"></td><td index="17"></td><td index="18"></td><td index="19"></td><td index="20"></td></tr><tr index="8"><td index="1"></td><td index="2"></td><td index="3"></td><td index="4"></td><td index="5"></td><td index="6"></td><td index="7"></td><td index="8"></td><td index="9"></td><td index="10"></td><td index="11"></td><td index="12"></td><td index="13"></td><td index="14"></td><td index="15"></td><td index="16"></td><td index="17"></td><td index="18"></td><td index="19"></td><td index="20"></td></tr><tr index="9"><td index="1"></td><td index="2"></td><td index="3"></td><td index="4"></td><td index="5"></td><td index="6"></td><td index="7"></td><td index="8"></td><td index="9"></td><td index="10"></td><td index="11"></td><td index="12"></td><td index="13"></td><td index="14"></td><td index="15"></td><td index="16"></td><td index="17"></td><td index="18"></td><td index="19"></td><td index="20"></td></tr><tr index="10"><td index="1"></td><td index="2"></td><td index="3"></td><td index="4"></td><td index="5"></td><td index="6"></td><td index="7"></td><td index="8"></td><td index="9"></td><td index="10"></td><td index="11"></td><td index="12"></td><td index="13"></td><td index="14"></td><td index="15"></td><td index="16"></td><td index="17"></td><td index="18"></td><td index="19"></td><td index="20"></td></tr><tr index="11"><td index="1"></td><td index="2"></td><td index="3"></td><td index="4"></td><td index="5"></td><td index="6"></td><td index="7"></td><td index="8"></td><td index="9"></td><td index="10"></td><td index="11"></td><td index="12"></td><td index="13"></td><td index="14"></td><td index="15"></td><td index="16"></td><td index="17"></td><td index="18"></td><td index="19"></td><td index="20"></td></tr><tr index="12"><td index="1"></td><td index="2"></td><td index="3"></td><td index="4"></td><td index="5"></td><td index="6"></td><td index="7"></td><td index="8"></td><td index="9"></td><td index="10"></td><td index="11"></td><td index="12"></td><td index="13"></td><td index="14"></td><td index="15"></td><td index="16"></td><td index="17"></td><td index="18"></td><td index="19"></td><td index="20"></td></tr><tr index="13"><td index="1"></td><td index="2"></td><td index="3"></td><td index="4"></td><td index="5"></td><td index="6"></td><td index="7"></td><td index="8"></td><td index="9"></td><td index="10"></td><td index="11"></td><td index="12"></td><td index="13"></td><td index="14"></td><td index="15"></td><td index="16"></td><td index="17"></td><td index="18"></td><td index="19"></td><td index="20"></td></tr><tr index="14"><td index="1"></td><td index="2"></td><td index="3"></td><td index="4"></td><td index="5"></td><td index="6"></td><td index="7"></td><td index="8"></td><td index="9"></td><td index="10"></td><td index="11"></td><td index="12"></td><td index="13"></td><td index="14"></td><td index="15"></td><td index="16"></td><td index="17"></td><td index="18"></td><td index="19"></td><td index="20"></td></tr><tr index="15"><td index="1"></td><td index="2"></td><td index="3"></td><td index="4"></td><td index="5"></td><td index="6"></td><td index="7"></td><td index="8"></td><td index="9"></td><td index="10"></td><td index="11"></td><td index="12"></td><td index="13"></td><td index="14"></td><td index="15"></td><td index="16"></td><td index="17"></td><td index="18"></td><td index="19"></td><td index="20"></td></tr></tbody></table><div class="choose-table-footer"><span>0</span><span> 行 </span><span>0</span><span> 列 </span></div></div>',desc:'表格',
                        init: function (editor) {

                    }},
                    {type:"smile",i:'am-icon-smile-o',html:'<ul class="am-dropdown-content" style="width: 320px;padding: 5px;">'+getSmile()+'</ul>',desc:'表情',init: function (editor) {
                        var buttton = editor.find('.iutilsEditor-tools').find('button.smile');
                        var dropdownContent = buttton.next('.am-dropdown-content');
                        dropdownContent.on('click','li',function(){
                            if(editor.find(".iutilsEditor-content").html()=="<div><br></div>"){
                                editor.find(".iutilsEditor-content").html($(this).html());
                            }else{
                                editor.find(".iutilsEditor-content").append($(this).html());
                            }
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
                    {type:"video",i:'am-icon-video-camera',html:'<div class="am-dropdown-content" style="width: 312px;"><form class="am-form am-form-horizontal"><div class="am-form-group"><div class="am-u-sm-12"><textarea rows="5"><iframe height=498 width=510 src=\'[视频地址]\' frameborder=0 \'allowfullscreen\'></iframe></textarea></div></div><div class="am-form-group"><div class="am-u-sm-12"><button type="button" class="am-btn am-btn-default am-btn-xs am-align-right" style="margin-bottom:0;">确认</button></div></div></form></div>',desc:'在线视频',
                        init: function (editor) {
                            var buttton = editor.find('.iutilsEditor-tools').find('button.video');
                            var dropdownContent = buttton.next('.am-dropdown-content');
                            dropdownContent.on('click','button',function(){
                                var textarea = dropdownContent.find("textarea");
                                if(textarea.val()!=""){
                                    if(editor.find(".iutilsEditor-content").html()=="<div><br></div>"){
                                        editor.find(".iutilsEditor-content").html(textarea.val());
                                    }else{
                                        editor.find(".iutilsEditor-content").append(textarea.val());
                                    }
                                }
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
                                    if(editor.find(".iutilsEditor-content").html()=="<div><br></div>"){
                                        editor.find(".iutilsEditor-content").html("<pre class='am-pre-scrollable'>"+textarea.val()+"</pre>");
                                    }else{
                                        editor.find(".iutilsEditor-content").append("<pre class='am-pre-scrollable'>"+textarea.val()+"</pre>");
                                    }
                                }
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
        var $textarea = $(this);
        $textarea.hide();
        //编辑器对象
        var editor = $textarea.next();
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
            $textarea.val($(this).val());//同步表单内容
        });
        content.on('keydown keyup',function(){
            code.val($(this).html());//同步到源码记录器
            $textarea.val($(this).html());//同步表单内容
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
            if(selObj!=null){
                currentEle = $(selObj.baseNode.parentNode);
            }
            if(currentEle!=null){
                //是否粗体
                if(currentEle.css("font-weight")=="bold"){
                    editor.find('.iutilsEditor-tools').find('button.bold').addClass("active");
                }else{
                    editor.find('.iutilsEditor-tools').find('button.bold').removeClass("active");
                }
                //是否斜体
                if(currentEle.css("font-style")=="italic"){
                    editor.find('.iutilsEditor-tools').find('button.italic').addClass("active");
                }else{
                    editor.find('.iutilsEditor-tools').find('button.italic').removeClass("active");
                }
                //是否下划线
                if(currentEle.css("text-decoration")=="underline"){
                    editor.find('.iutilsEditor-tools').find('button.underline').addClass("active");
                }else{
                    editor.find('.iutilsEditor-tools').find('button.underline').removeClass("active");
                }
                //是否删除线
                if(currentEle.css("text-decoration")=="line-through"){
                    editor.find('.iutilsEditor-tools').find('button.strikethrough').addClass("active");
                }else{
                    editor.find('.iutilsEditor-tools').find('button.strikethrough').removeClass("active");
                }
                //是否居左
                if(currentEle.css("text-align")=="left"){
                    editor.find('.iutilsEditor-tools').find('button.align-left').addClass("active");
                }else{
                    editor.find('.iutilsEditor-tools').find('button.align-left').removeClass("active");
                }
                //是否居中
                if(currentEle.css("text-align")=="center"){
                    editor.find('.iutilsEditor-tools').find('button.align-center').addClass("active");
                }else{
                    editor.find('.iutilsEditor-tools').find('button.align-center').removeClass("active");
                }
                //是否居右
                if(currentEle.css("text-align")=="right"){
                    editor.find('.iutilsEditor-tools').find('button.align-right').addClass("active");
                }else{
                    editor.find('.iutilsEditor-tools').find('button.align-right').removeClass("active");
                }
            }
        });
    }

    //获取表情包
    function getSmile(){
        var html='';
        for(var i=1;i<=130;i++){
            html+='<li class="smile"><img src="img/qq/'+i+'.gif" /></li>';
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
