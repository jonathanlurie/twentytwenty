(function($){

    $.fn.twentytwenty = function(options) {
        var options = $.extend({default_offset_pct: 0.5, orientation: 'horizontal'}, options);
        return this.each(function() {

            var sliderPct = options.default_offset_pct;
            var container = $(this);
            var sliderOrientation = options.orientation;
            var beforeDirection = (sliderOrientation === 'vertical') ? 'down' : 'left';
            var afterDirection = (sliderOrientation === 'vertical') ? 'up' : 'right';
            

            container.wrap("<div class='twentytwenty-wrapper twentytwenty-" + sliderOrientation + "'></div>");
            var beforeImg = container.find("img:first");
            var afterImg = container.find("img:last");
            container.append("<div class='twentytwenty-handle'></div>");
            var slider = container.find(".twentytwenty-handle");
            slider.append("<img class='twentytwenty-" + beforeDirection + "-arrow' src='img/pitch-15.svg'></img>");
            slider.append("<img class='twentytwenty-" + afterDirection + "-arrow' src='img/attraction-15.svg'></img>");
            container.addClass("twentytwenty-container");
            beforeImg.addClass("twentytwenty-before");
            afterImg.addClass("twentytwenty-after");

            var rightArrow = container.find(".twentytwenty-right-arrow");
            rightArrow.on("mouseup", function(e){
                beforeImg.addClass("smoothtransition");
                adjustSlider(1);
            });


            var rightArrow = container.find(".twentytwenty-left-arrow");
            rightArrow.on("mouseup", function(e){
                beforeImg.addClass("smoothtransition");
                adjustSlider(0);
            });

            var calcOffset = function(dimensionPct) {
                var w = beforeImg.width();
                var h = beforeImg.height();
                return {
                    w: w+"px",
                    h: h+"px",
                    cw: (dimensionPct*w)+"px",
                    ch: (dimensionPct*h)+"px"
                };
            };

            var adjustContainer = function(offset) {
                if (sliderOrientation === 'vertical') {
                    beforeImg.css("clip", "rect(0,"+offset.w+","+offset.ch+",0)");
                }
                else {
                    beforeImg.css("clip", "rect(0,"+offset.cw+","+offset.h+",0)");
                }
                container.css("height", offset.h);
            };

            var adjustSlider = function(pct) {
                var offset = calcOffset(pct);
                slider.css((sliderOrientation==="vertical") ? "top" : "left", (sliderOrientation==="vertical") ? offset.ch : offset.cw);
                adjustContainer(offset);
            }

            $(window).on("resize.twentytwenty", function(e) {
                adjustSlider(sliderPct);
            });

            var offsetX = 0;
            var imgWidth = 0;

            $(window).trigger("resize.twentytwenty");
        });
    };

})(jQuery);
