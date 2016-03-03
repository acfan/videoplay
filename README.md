# videoplay
video play for HTML
播放



首先设置src（"视屏地址"）;//mp4 格式



弹幕

在你要显示的页面中将弹幕放在一个div中id为json，如下：

<div id=json style=display:none>
{"a2":[{text:111,style:1,color:"#00ff00"},{text:111,style:0,color:"#f0f0f"}],"a6":[{text:111,style:0,color:"#f0f0f"}]}
</div>

弹幕格式：

a2表示第二秒，

{text:弹幕,style:发送弹幕的方式,color:"弹幕颜色#ffffff"}；

同一秒有多条弹幕时

"a2":[{text:111,style:1,color:"#00ff00"},{text:111,style:0,color:"#f0f0f"}]











AJAX

在video里面里面有一个参数

var url;

改为var url="http://你想AJAX提交的页面即可";

ajax传入值：



post方法下：

（以下请在后端页面设置以下参数 PHP下：$_POST['av'],$_POST['text'],$_POST['avtime'],$_POST['color'],$_POST['style'],$_POST['time'];）

别忘了在页面里面设置av号(id号）

<div id="av">

10086

</div>

av:av,//视屏的id 

text : text, //text 弹幕
avtime : avtime, //swap 发送弹幕时的时间
color:color, //颜色
style:style, //形式

time:time  //此time为发送弹幕的时间ajax函数里面已经写好
