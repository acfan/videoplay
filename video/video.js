	var left=200;
	var vtop=200;
	var width=853;
	var height=520;

	var videoHeight=480;
	var controlHeight=40;

	var sendWidth=853;
	var sendHeight=80;

	var color="blue";
	var videoOpacity=0.6;

	var url;//url ajax

	var htmljson=$( "#json").text();//保存在一个id为json的隐藏div里面
	var json=eval("("+htmljson+")");//json

	var av=$( "#av").text();
	/*
	av:av,//av hao
        		text : text, //text
        		avtime : avtime, //swap
        		color:color,
        		style:style,
        		time:time

	*/


	var videoDiv=$( "<div id=video ></div>");
	var video=$( "<video autoplay ></video>");
	var control=$( "<div id=control></div>");



	videoDiv.css({
		"position":"absolute",
		"left":left,
		"top":vtop,
		"width":width,
		"height":height,
		"overflow":"hidden",
	});
	video.css({
		"position":"absolute",
		"width":width,
		"height":videoHeight,
	});
	control.css({
		"position":"absolute",
		"top":videoHeight,
		"width":width,
		"height":controlHeight,
		"background-color":color,
		"opacity":videoOpacity,
	});

	video.appendTo(videoDiv);
	control.appendTo(videoDiv);
	videoDiv.appendTo("body");





	var range=$( "<input type=range min=0 max=1000 step=1>");
	range.css({
		"position":"absolute",
		"opacity":0.7,
		"width":width*3/5,
		"height":5,
		"left":35,
		"top":15,
		"background-color":"rgba(0,0,0,0.5)",
	});
	range.appendTo(control);

	var ctime=0;
	var dtime=0;
	var all;
	var swap=0;

	video[0].ontimeupdate=function(){
		ctime=video[0].currentTime;
		dtime=video[0].duration;
		all=ctime;
		var value=1000*ctime/dtime;
		range.val(value);

		


		c=Math.floor(ctime);
		d=Math.floor(dtime);
		c=timef(c);
		d=timef(d);
		showTime.text(c+"/"+d);
	

//////danmu///
/*
弹幕JSON 格式 为 a1{sxss{},ssss,ssss},a2{xxxx}

*/
//////
	all=Math.floor(all);
	swap=Math.floor(swap);
	if(all>swap){

		//console.log(swap);
		var aswap="a"+swap;
		//{a2:[{text:text,style:style,color:color}{text:text,style:style,color:color}],a7:[{text:text,style:style,color:color}]}
		if(json.hasOwnProperty(aswap)){
			var m=json[aswap];
			  //for(var key in json[avtime]){
			  	for(var key in m){
			  		var textValue=m[key]["text"];
			  		var styleValue=m[key]["style"];
			  		var colorValue=m[key]["color"];
			  		sendDanmu(textValue,styleValue,colorValue);

			  	}

		}

		swap=all;
	}else{
		swap=all;
		//console.log("xx");
	}



///////




	}






	range.change(function(){
		var value=range.val();
		ctime=dtime*value/1000;
		video[0].currentTime=ctime;
		video[0].play();
	})


	var videoPlay=$( "<div id=start >▶</div>");
	videoPlay.css({
		"position":"absolute",
		"top":8,
		"left":15,
		"width":40,
		"height":30,
		"control":"black",
	})
	videoPlay.appendTo(control);
	videoPlay.toggle(
		function(){
			video[0].pause();
			videoPlay.text("▍▍");
		},
		function(){
			video[0].play();
			videoPlay.text("▶");
		}
		);
	video[0].onpause=function(){
		videoPlay.text("▍▍");
	}





	var showTime=$( "<div id=showTime></div>");
	showTime.css({
		"position":"absolute",
		"left": 570,
		"top":10,

	});
	showTime.appendTo(control);


	var loopVideo=$( "<button ip=loopVideo>洗脑</button>");
	loopVideo.css({
		"position":"absolute",
		"left": 670,
		"top":7,
		"width":40,
		"height":25,
		"font-size":10,
		"white-space":"nowrap",
		"opacity":0.6,
	});
	loopVideo.appendTo(control);
	loopVideo.toggle(
		function(){
			video[0].loop="true";
			loopVideo.css("box-shadow","1px 1px 1px #f90000")
		},
		function(){
			video[0].loop="false";
			loopVideo.css("box-shadow","")


		}
		)



	var volumeVideo=$( "<button ip=volumeVideo>♪</button>");
	volumeVideo.css({
		"position":"absolute",
		"left": 710,
		"top":7,
		"width":35,
		"height":25,
		"font-size":18,
		"white-space":"nowrap",
		"opacity":0.6,
	});
	volumeVideo.appendTo(control);
	volumeVideo.toggle(
		function(){
			video[0].muted="true";
			volumeVideo.css("box-shadow","1px 1px 1px #f90000");
			volumeVideo.text("✖");
		},
		function(){
			video[0].muted="";
			volumeVideo.css("box-shadow","")
			volumeVideo.text("♪");


		}


		)	

	var volumeRange=$( "<input type=range id=volumeRange step=0 min=0 max=100>");
	volumeRange.css({
		"position":"absolute",
		"top":10,
		"left":750,
		"width":80,
		"height":10,
		"opacity":0.3,
		"color":"black",
		"transform":"rotate(5)",
		
	});
	volumeRange.appendTo(control);
	volumeRange.change(function(){
		value=volumeRange.val();
		value=value/100;
		video[0].volume=value;
	})







	function timef(t){
		if(t>3600){
			h=Math.floor(t/3600);
			h=addzero(h);
			m=Math.floor((t-3600*h)/60);
			m=addzero(m);
			s=t-3600*h-60*m;
			s=addzero(s);
			return h+":"+m+":"+s;
		}else if(t>60){
			m=Math.floor(t/60);
			m=addzero(m);
			s=t-60*m;
			s=addzero(s);
			return m+":"+s;

		}else if(t>0){
			s=addzero(t);
			return "00:"+s;
		}else{
			return "00:00";
		}


	}

	function addzero(z){
		if(z>0&&z<10){
			return "0"+z;
		}else{
			return z;
		}
	}

	function src(src){
		video.attr("src",src);

	}
	




		var sendDiv=$( "<div id=sendDiv></id>")
		var sendText=$( "<input type=text name=text>");
		var sendColor=$( "<input type=color name=color>");
		var sendStyle=$( "<p>G<input type=radio name=style value=2>T<input type=radio name=style value=1>P<input type=radio checked=checked name=style value=0 ></p> ");
		var styleDiv=$("<div id=styleDiv></div>")
		var sendButton=$( "<button id=button >Send</button>");

		sendDiv.css({
			"width":sendWidth,
			"height":sendHeight,
			"position":"absolute",
			"top":vtop+height,
			"left":left,
			"background-color":color,
			"opacity":videoOpacity,

		});
		sendText.css({
			"width":300,
			"height":40,
			"position":"absolute",
			"top":10,
			"left":400,
		});
		sendButton.css({
			"position":"absolute",
			"top":10,
			"left":720,
			"width":60,
			"hight":40,
		});
		sendColor.css({
			"position":"absolute",
			"top":10,
			"left":250,
			"width":50,
			"height":30,		
		});
		styleDiv.css({
			"position":"absolute",
			"top":30,
			"left":20,
			"width":200,
			"height":60,
		})


		sendButton.appendTo(sendDiv);
		sendText.appendTo(sendDiv);
		sendStyle.appendTo(styleDiv);
		styleDiv.appendTo(sendDiv);
		sendColor.appendTo(sendDiv);
		sendDiv.appendTo("body");





		sendColor.change(function(){
			colorValue=sendColor.val();
			sendText.css("color",colorValue);
		});

		sendButton.click(function(){
			textValue=sendText.val();
			colorValue=sendColor.val();
			t=Math.floor(video[0].currentTime);
			styleValue=$(":radio:checked").val();
			
			//console.log(textValue+":"+styleValue+":"+colorValue);

			sendDanmu(textValue,styleValue,colorValue);
			sendText.val("");
			ajax(textValue,styleValue,colorValue,t);

		});


		setInterval(danmu,1000);
		function danmu(){

			
			t=Math.floor(video[0].currentTime);

			//send();

		}

		function sendDanmu(text,style,color){
			if(style==0){//Normal
			//	console.log(text+":"+style+":"+color);

				height=videoHeight;
				h=Math.floor(Math.random()*(height-30));
				var p=$( "<p id=zd></p>");// zd is danmu
				p.text(text);
				p.css({
					"position":"absolute",
					"top":h,
					"left":width,
					"white-space":"nowrap",
					"color":color,
				});
				p.appendTo(videoDiv);
				p.animate({left:"-350px"},5000,function(){
					this.remove();
				});
			}else if(style==1){//Stop
					height=videoHeight;
				h=Math.floor(Math.random()*(height-325)+250);
				var p=$( "<p id=zd></p>");// zd is danmu
				p.text(text);
				p.css({
					"position":"absolute",
					"top":h,
					"left":width/3,
					"white-space":"nowrap",
					"color":color,
				});
				p.appendTo(videoDiv);
				setTimeout(function(){
					p.remove();
				},3000)


			}else{//Hight speed
					height=videoHeight;
				h=Math.floor(Math.random()*height-30);
				var p=$( "<p id=zd></p>");// zd is danmu
				p.text(text);
				p.css({
					"position":"absolute",
					"top":h,
					"left":width,
					"white-space":"nowrap",
					"color":color,
				});
				p.appendTo(videoDiv);
				p.animate({left:"-350px"},2000,function(){
					this.remove();
				});

			}

		}
		function ajax(text,style,color,t){
			var time = Date.parse(new Date());
    		time=time/1000;
    //console.log(avtime);
    		$.post(url,{
        		av:av,//id
        		text : text, //text
        		avtime : avtime, //swap
        		color:color,
        		style:style,
        		time:time

      		},function(data,textStatus){
        		var change=data;//非同步！先不用！
        		console.log(change);
      		}

    	)//need change! URL 必须修改

	}


