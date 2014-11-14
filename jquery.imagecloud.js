/*
 * ImageCloud - jQuery plugin 2.1.0
 *
 * Developed by Alvaro Montoro (alvaromontoro@gmail.com)
 *
 * Licensed under the GPL license:
 *   http://www.gnu.org/licenses/gpl.html
 *
 */
 
;(function ($) {

	var numImageClouds = 0;

    $.fn.imageCloud=function (options) {
	
        return this.each(function () {
        
			var settings={
				'width': 600,
				'height': 400,
				'link': false,
				'color': '#800000',
				'speed': 250,
				'borderSize': 6,
				'borderStyle': 'solid',
				'borderRadius': 0
			};
		
            function ic_collision(auxX, auxY, sizeX, sizeY, arrFrames, auxSettings) {
			
				// check that the image is within limits of the frame
                if (auxX/1+sizeX/1+auxSettings.borderSize*2 > auxSettings.width) { return 1; }
                if (auxY/1+sizeY/1+auxSettings.borderSize*2 > auxSettings.height) { return 1; }
                if (auxY < 0 || auxX < 0) { return 1; }

				// compare it to the rest of the images, to make sure that no one overlaps
                for (x=0; x < arrFrames.length; x++) {

                    var a1=arrFrames[x].posX;
                    var a2=arrFrames[x].posY;
                    var b1=auxX;
                    var b2=auxY;
                    var awidth=arrFrames[x].width;
                    var aheight=arrFrames[x].height;
                    var bwidth=sizeX;
                    var bheight=sizeY;

                    if (b1>=a1 && b1<=a1+awidth+15 && b2>=a2 && b2<=a2+aheight+15) { return 1; }
                    if (a1>=b1 && a1<=b1+bwidth+15 && a2>=b2 && a2<=b2+bheight+15) { return 1; }
                    if (b1>=a1 && b1<=a1+awidth+15 && a2>=b2 && a2<=b2+bheight+15) { return 1; }
                    if (a1>=b1 && a1<=b1+bwidth+15 && b2>=a2 && b2<=a2+aheight+15) { return 1; }
                    
                }
                
                return 0;
                
            }
            
            function ic_calculatePosition(arrFrames, activeFrame, attempt, targetSize, currentImage, tryAttempt) {

                if (currentImage == 0) {
				
                    arrFrames.push({
						posX: 0,
						posY: 0,
						bgPosX: 0,
						bgPosY: 0,
						width: targetSize.width,
						height: targetSize.height
					});

                    return 1;

                } else if (activeFrame > 0) {
					
					var ic_posX = 0; var ic_posY = 0;
					
					switch (tryAttempt) {
						case 0: {
							ic_posX=Math.floor(Math.random() * (arrFrames[activeFrame-1].posX/1+arrFrames[activeFrame-1].width/1));
							ic_posY=arrFrames[activeFrame-1].posY/1+arrFrames[activeFrame-1].height/1+20;
							break;
						}
						case 1: {
							ic_posX=Math.floor(Math.random() * (arrFrames[activeFrame-1].posX/1+arrFrames[activeFrame-1].width/1));
							ic_posY=arrFrames[activeFrame-1].posY/1 - arrFrames[activeFrame-1].height/1- 20;
							break;
						}
						case 2: {
							ic_posX=arrFrames[activeFrame-1].posX/1+arrFrames[activeFrame-1].width/1+20;
							ic_posY=Math.floor(Math.random() * (arrFrames[activeFrame-1].posY/1+arrFrames[activeFrame-1].height/1));
							break;
						}
						case 3: {
							ic_posX=arrFrames[activeFrame-1].posX/1 - arrFrames[activeFrame-1].width/1 - 20;
							ic_posY=Math.floor(Math.random() * (arrFrames[activeFrame-1].posY/1+arrFrames[activeFrame-1].height/1));
							break;
						}
					}

					if (ic_collision(ic_posX, ic_posY, targetSize.width, targetSize.height, arrFrames, settings) == 1) { return 0; }
					
					var ic_bgPosX=(Math.floor(Math.random() * (targetSize.width - ic_arrayImages[currentImage].width)));
					var ic_bgPosY=(Math.floor(Math.random() * (targetSize.height - ic_arrayImages[currentImage].height)));

					ic_bgPosX=ic_bgPosX - ic_bgPosX % 5;
					ic_bgPosY=ic_bgPosY - ic_bgPosY % 5;

					// save the frame in the list of frames
					arrFrames.push({
						posX: ic_posX,
						posY: ic_posY,
						bgPosX: ic_bgPosX,
						bgPosY: ic_bgPosY,
						width: targetSize.width,
						height: targetSize.height
					});

					return 1;
					
                }
                
                return 0;
            }

            // extend the default settings
            if ( options ) {
                $.extend( settings, options );
            };

            var $this=$(this);
            var ic_strCloud="";
            var ic_exit = false;
            var ic_currentImage=0;
            var ic_arrayImages;
            var ic_arrayFrames=new Array();
            // these are the default sizes for the frames (width x height)
            var ic_imageSizes =[[50,50], [60,60], [70,70], [80,80], [90,90], [100,100], [120,120], [50,60], [70,50], [80,120], [50,100], [60,150], [150,80], [120,80], [100,60], [150,50], [50,150]];

            // change the target div to the required size
            if ($this.css("position") != "absolute") { $this.css("position", "relative"); };
            $this.css({ overflow: "visible", height: settings.height, width: settings.width }).addClass("imagecloud");

            // get all the images inside the div
            ic_arrayImages=$this.find("img");

            // while there are images, we put them in the cloud
            while (!ic_exit && ic_currentImage < ic_arrayImages.length) {

                var auxIc_currentImage=ic_currentImage;
                var ic_validPos=0;
                var ic_imageType = Math.floor(Math.random()*(ic_imageSizes.length));
				var ic_targetSize = { width: ic_imageSizes[ic_imageType][0], height:ic_imageSizes[ic_imageType][1] }
                
                // BEGINNING OF calculateCoordinates
                while (auxIc_currentImage > -1) {

                    var auxAttempts=0;
                    var auxMaxAttempsPerSector=100;

                    while (auxAttempts < auxMaxAttempsPerSector*4) {
                        ic_validPos=ic_calculatePosition(ic_arrayFrames, auxIc_currentImage, auxAttempts, ic_targetSize, ic_currentImage, auxAttempts%4);
                        if (ic_validPos==1) { auxAttempts=1000; auxIc_currentImage=-1000; }
                        auxAttempts++;
                    }

                    auxIc_currentImage--;
                }
                // END OF calculateCoordinates
                
                if (ic_validPos == 1) {
				
					ic_strCloud += '<div id="ic' + numImageClouds + '_i'+ic_currentImage+'" ' +
					                  ' class="ci_imagen" ' +
									  ' style="overflow:hidden;position:absolute;border-radius:' + settings.borderRadius + 'px;-moz-border-radius:' + settings.borderRadius + 'px;-webkit-border-radius:' + settings.borderRadius + 'px;border:' + settings.borderSize + 'px ' + settings.borderStyle + ' ' + settings.color + ';cursor:pointer;top:'+ ic_arrayFrames[ic_arrayFrames.length-1].posY +'px;left:'+ ic_arrayFrames[ic_arrayFrames.length-1].posX +'px;width:' + ic_arrayFrames[ic_arrayFrames.length-1].width +'px;height:'+ic_arrayFrames[ic_arrayFrames.length-1].height+'px;" ' +
									  ' data-width="' + ic_arrayFrames[ic_arrayFrames.length-1].width + '" ' +
									  ' data-height="' + ic_arrayFrames[ic_arrayFrames.length-1].height + '" ' +
									  ' data-posy="' + ic_arrayFrames[ic_arrayFrames.length-1].posY + '" ' +
									  ' data-posx="' + ic_arrayFrames[ic_arrayFrames.length-1].posX + '" ' +
									  ' data-bgposx="' + ic_arrayFrames[ic_arrayFrames.length-1].bgPosX + '" ' +
									  ' data-bgposy="' + ic_arrayFrames[ic_arrayFrames.length-1].bgPosY + '" ' +
									  ' data-picwidth="' + ic_arrayImages[ic_currentImage].width + '" ' +
									  ' data-picheight="' + ic_arrayImages[ic_currentImage].height + '" ';
					if (settings.link && ic_arrayImages[ic_currentImage].title) { ic_strCloud+=' onclick="window.location=\''+ic_arrayImages[ic_currentImage].title+'\'" '; }
					ic_strCloud += '><img src="'+ic_arrayImages[ic_currentImage].src+'" width="'+ic_arrayImages[ic_currentImage].width+'" height="'+
								 ic_arrayImages[ic_currentImage].height+'" style="position:absolute;left: '+ic_arrayFrames[ic_arrayFrames.length-1].bgPosX+'px;top:'+
								 ic_arrayFrames[ic_arrayFrames.length-1].bgPosY+'px;" /></div>\n';
								 
                    ic_currentImage++;
                } else {
                    ic_exit = true;
                }
                
            }

            // display the images
			$this.html(ic_strCloud);

            $(this).find(".ci_imagen").mouseenter(function() {
                       
                        if (!this.ao) {
                            this.ao={id:this.id, ft:$(this).data("posy"), fl:$(this).data("posx"), fh:$(this).data("height"), fw:$(this).data("width"), bt:$(this).data("bgposy"), bl:$(this).data("bgposx"), bh:$(this).data("picheight"), bw:$(this).data("picwidth"), st:0};
                        }
                       
                        $(this.ao).stop(true, false).animate({
                            st: 100
                        }, {
                            duration: settings.speed,

                            step: function(now,fx) {
                               
                                var changeT=Math.floor((fx.elem.bt)*(now/100));
                                var changeL=Math.floor((fx.elem.bl)*(now/100));
                                $("#"+fx.elem.id).css({
                                    width: fx.elem.fw+(fx.elem.bw-fx.elem.fw)*(now/100),
                                    height: fx.elem.fh+(fx.elem.bh-fx.elem.fh)*(now/100),
                                    top: fx.elem.ft+changeT,
                                    left: fx.elem.fl+changeL,
                                    zIndex:99999

                                }).find("img").css({
                                    top: fx.elem.bt - changeT,
                                    left: fx.elem.bl - changeL
                                });
                            }
                        }, 'linear');
                       
                    }).mouseleave(function() {
                       
					    var auxElem = "";
						
                        $(this.ao).stop(true, false).animate(
							{ st: 0 }, 
							{
								duration: settings.speed,
								step: function(now,fx) {
									auxElem = fx.elem.id;
									var changeT=Math.floor((fx.elem.bt)*(now/100));
									var changeL=Math.floor((fx.elem.bl)*(now/100));
									$("#"+fx.elem.id).css({
										width: fx.elem.fw+(fx.elem.bw-fx.elem.fw)*(now/100),
										height: fx.elem.fh+(fx.elem.bh-fx.elem.fh)*(now/100),
										top: fx.elem.ft+changeT,
										left: fx.elem.fl+changeL,
										zIndex:99998
									}).find("img").css({
										top: fx.elem.bt - changeT,
										left: fx.elem.bl - changeL
									});
								}, 
								easing: 'linear', 
								complete: function() { 
									$("#" + auxElem).css({zIndex:9999}); 
								}
							}
						);
                       
                    });
					
			numImageClouds++;
        });

    };
})(jQuery);

$(document).ready(function() { $(".imagecloud").imageCloud(); });
