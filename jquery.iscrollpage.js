(function($) {

    $.fn.iscrollpage = function(opt) {
        var settings = $.extend({
            'duration': 2000,
            'locationHash': true,
            'complete': function(){},
            'start': function(){}
        }, opt);

        $(this).click(function(e) {
            e.preventDefault();

            var _id = $(this).attr('href');
            var id = $(_id);

            $("html,body").animate({
                scrollTop: id.offset().top
            }, {
                duration: settings.duration,
                start: function(){
                    if (settings.locationHash)
                        window.location.hash = _id;
                },
                complete: function() {
                    settings.complete();
                }
            });
        });
    };

}(jQuery));