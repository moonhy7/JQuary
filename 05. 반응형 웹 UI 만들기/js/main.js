$(function() {
    $(".main-visual-slide").bxSlider({
        auto:true,
        pause:200,
        autoHover:true,
        autoControls:true,
        autoControlsCombine:true
    });

    $("#notice-tab-wrap h4 a").on("click", tabmenu);

    function tabmenu(e) {
        e.preventDefalut();
        var $ts = $(this);
        var $next = $ts.parent().next();
        if($next.is(":hidden")) {
            $("#notice-tab-wrap h4 a").removeClass("on");
            $ts.addClass("on");
            $("#notice-tab-wrap > div:visible").hide();
            $next.show();
        }
    }

    $(".grid").isotope({
        itemSelector: ".grid-item",
        layoutMode: "fitRows"
    });
});