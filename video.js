var left=200;
	var vtop=200;
	var width=853;
	var height=530;

	var videoHeight=480;
	var controlHeight=40;

	var videoDiv=$( "<div id=video ></div>");
	var video=$( "<video autoplay ></video>");
	var control=$( "<div id=control></div>");



	videoDiv.css({
		"position":"absolute",
		"left":left,
		"top":vtop,
		"width":width,
		"height":height,
		"border-radius":4,
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
		"background-color":"blue",
		"opacity":0.5,
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

	video[0].ontimeupdate=function(){
		ctime=video[0].currentTime;
		dtime=video[0].duration;
		var value=1000*ctime/dtime;
		range.val(value);

		c=Math.floor(ctime);
		d=Math.floor(dtime);
		c=timef(c);
		d=timef(d);
		showTime.text(c+"/"+d);
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
	