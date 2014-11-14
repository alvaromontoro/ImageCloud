/* ImageCloud 2.1.1 - Alvaro Montoro (alvaromontoro@gmail.com) */
(function(e){var t=0;e.fn.imageCloud=function(n){return this.each(function(){function i(e,t,n,r,i,s){if(e+n+s.borderSize*2>s.width){return 1}if(t+r+s.borderSize*2>s.height){return 1}if(t<0||e<0){return 1}for(x=0;x<i.length;x++){var o=i[x].posX;var u=i[x].posY;var a=e;var f=t;var l=i[x].width;var c=i[x].height;var h=n;var p=r;if(a>=o&&a<=o+l+15&&f>=u&&f<=u+c+15){return 1}if(o>=a&&o<=a+h+15&&u>=f&&u<=f+p+15){return 1}if(a>=o&&a<=o+l+15&&u>=f&&u<=f+p+15){return 1}if(o>=a&&o<=a+h+15&&f>=u&&f<=u+c+15){return 1}}return 0}function s(e,t,n,s,o,u){if(o==0){e.push({posX:0,posY:0,bgPosX:0,bgPosY:0,width:s.width,height:s.height});return 1}else if(t>0){var a=0;var f=0;switch(u){case 0:{a=Math.floor(Math.random()*(e[t-1].posX+e[t-1].width));f=e[t-1].posY+e[t-1].height+20;break};case 1:{a=Math.floor(Math.random()*(e[t-1].posX+e[t-1].width));f=e[t-1].posY-e[t-1].height-20;break};case 2:{a=e[t-1].posX+e[t-1].width+20;f=Math.floor(Math.random()*(e[t-1].posY+e[t-1].height));break};case 3:{a=e[t-1].posX-e[t-1].width-20;f=Math.floor(Math.random()*(e[t-1].posY+e[t-1].height));break}}if(i(a,f,s.width,s.height,e,r)==1){return 0}var c=Math.floor(Math.random()*(s.width-l[o].width));var h=Math.floor(Math.random()*(s.height-l[o].height));c=c-c%5;h=h-h%5;e.push({posX:a,posY:f,bgPosX:c,bgPosY:h,width:s.width,height:s.height});return 1}return 0}var r={width:600,height:400,link:false,color:"#800000",speed:250,borderSize:6,borderStyle:"solid",borderRadius:0};if(n){e.extend(r,n)}var o=e(this);var u="";var a=false;var f=0;var l;var c=new Array;var h=[[50,50],[60,60],[70,70],[80,80],[90,90],[100,100],[120,120],[50,60],[70,50],[80,120],[50,100],[60,150],[150,80],[120,80],[100,60],[150,50],[50,150]];if(o.css("position")!="absolute"){o.css("position","relative")}o.css({overflow:"visible",height:r.height,width:r.width}).addClass("imagecloud");l=o.find("img");while(!a&&f<l.length){var p=f;var d=0;var v=Math.floor(Math.random()*h.length);var m={width:h[v][0],height:h[v][1]};while(p>-1){var g=0;var y=100;while(g<y*4){d=s(c,p,g,m,f,g%4);if(d==1){g=1e3;p=-1e3}g++}p--}if(d==1){u+='<div id="ic'+t+"_i"+f+'" '+' class="ci_imagen" '+' style="overflow:hidden;position:absolute;border-radius:'+r.borderRadius+"px;-moz-border-radius:"+r.borderRadius+"px;-webkit-border-radius:"+r.borderRadius+"px;border:"+r.borderSize+"px "+r.borderStyle+" "+r.color+";cursor:pointer;top:"+c[c.length-1].posY+"px;left:"+c[c.length-1].posX+"px;width:"+c[c.length-1].width+"px;height:"+c[c.length-1].height+'px;" '+' data-width="'+c[c.length-1].width+'" '+' data-height="'+c[c.length-1].height+'" '+' data-posy="'+c[c.length-1].posY+'" '+' data-posx="'+c[c.length-1].posX+'" '+' data-bgposx="'+c[c.length-1].bgPosX+'" '+' data-bgposy="'+c[c.length-1].bgPosY+'" '+' data-picwidth="'+l[f].width+'" '+' data-picheight="'+l[f].height+'" ';if(r.link&&l[f].title){u+=" onclick=\"window.location='"+l[f].title+"'\" "}u+='><img src="'+l[f].src+'" width="'+l[f].width+'" height="'+l[f].height+'" style="position:absolute;left: '+c[c.length-1].bgPosX+"px;top:"+c[c.length-1].bgPosY+'px;" /></div>\n';f++}else{a=true}}o.html(u);e(this).find(".ci_imagen").mouseenter(function(){if(!this.ao){this.ao={id:this.id,ft:e(this).data("posy"),fl:e(this).data("posx"),fh:e(this).data("height"),fw:e(this).data("width"),bt:e(this).data("bgposy"),bl:e(this).data("bgposx"),bh:e(this).data("picheight"),bw:e(this).data("picwidth"),st:0}}e(this.ao).stop(true,false).animate({st:100},{duration:r.speed,step:function(t,n){var r=Math.floor(n.elem.bt*(t/100));var i=Math.floor(n.elem.bl*(t/100));e("#"+n.elem.id).css({width:n.elem.fw+(n.elem.bw-n.elem.fw)*(t/100),height:n.elem.fh+(n.elem.bh-n.elem.fh)*(t/100),top:n.elem.ft+r,left:n.elem.fl+i,zIndex:99999}).find("img").css({top:n.elem.bt-r,left:n.elem.bl-i})}},"linear")}).mouseleave(function(){var t="";e(this.ao).stop(true,false).animate({st:0},{duration:r.speed,step:function(n,r){t=r.elem.id;var i=Math.floor(r.elem.bt*(n/100));var s=Math.floor(r.elem.bl*(n/100));e("#"+r.elem.id).css({width:r.elem.fw+(r.elem.bw-r.elem.fw)*(n/100),height:r.elem.fh+(r.elem.bh-r.elem.fh)*(n/100),top:r.elem.ft+i,left:r.elem.fl+s,zIndex:99998}).find("img").css({top:r.elem.bt-i,left:r.elem.bl-s})},easing:"linear",complete:function(){e("#"+t).css({zIndex:9999})}})});t++})}})(jQuery);$(document).ready(function(){$(".imagecloud").imageCloud()})