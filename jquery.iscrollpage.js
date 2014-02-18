(function($) {

    var mem = 0;
    var isBlock = false;

    $.fn.iscrollpage = function(opt) {
        var settings = $.extend({
            'duration': 2000,
            'locationHash': true,
            'complete': function(){},
            'start': function(){},
            'always': function(){},
            'element': "section"
        }, opt);

        var _this = $(this);

        var a = new Array();
        var b = new Array();
        $(settings.element).each(function(i, e){
            var tmp = $(e);
            a.push(tmp.offset().top);
            b.push(tmp.attr("id"));
        });

        $(document).scroll(function() {
            var _win = $(window);
            var topView = _win.scrollTop();

            if (topView > 0 && topView > mem && !isBlock) {
                isBlock = true;

                for (var i = 0; i <= a.length; i++) {

                    if (a[i] > mem) {
                        mem = a[i];
                        _this._scroll(settings, mem, b[i]);
                        break;
                    }
                }
            }

            if (topView > 0 && topView < mem && !isBlock) {
                isBlock = true;
                for (var i = (a.length - 1); i >= 0; i--) {

                    if (a[i] < mem) {
                        mem = a[i];
                        _this._scroll(settings, mem, b[i]);
                        break;
                    }
                }
            }
        });

        $(this).click(function(e) {
            e.preventDefault();

            var _id = $(this).data('ref');
            console.log(_id);
            var id = $(_id);

            isBlock = true;
            _this._scroll(settings, id, _id);
        });
    };

    $.fn._scroll = function(settings, id, _id) {
        $("html,body").animate({
            scrollTop: (typeof id == 'object') ? id.offset().top : id
        }, {
            duration: settings.duration,
            start: function() {
                mem = (typeof id == 'object') ? id.offset().top : id;
                console.log("f:" + mem);
            },
            complete: function() {
                if (settings.locationHash)
                    window.location.hash = _id;

                settings.complete();
            },
            always: function() {
                isBlock = false;
            }
        });
    }

}(jQuery));