(function(win, $) {
    var $html = $("html");
    //pc, tablet, mobile의 가로길이 설정
    var deviceSize = {
        pc: 1009,
        tablet: 801,
        mobile:800
    };

    //pc, tablet에서 스크롤바 표출
    function scrollShowHide(status) {
        $html.css({
            "overflow-y" : status
        });
        //현재 웹 문서의 가로길이 반환
        return $html.width();
    }

    var sc_w1 = scrollShowHide("hidden");
    var sc_w2 = scrollShowHide("scroll");
    var sc_w3 = sc_w1 - sc_w2;

    if(sc_w3 > 0) {
        deviceSize.pc = deviceSize.pc - sc_w3;
        deviceSize.tablet = deviceSize.tablet - sc_w3;
        deviceSize.mobile = deviceSize.mobile - sc_w3;
    }

    //브라우저 사이즈 변경 이벤트 등록
    $(win).on("resize", function() {
        //브라우저 사이즈 값
        var w_size = $(win).width();
        //브라우저 사이즈가 pc 사이즈면서 pc클래스가 없을 때
        //pc사이즈 됐을 때 동작
        if(w_size >= deviceSize.pc && !$("html").hasClass("pc")) {
            //pc클래스 추가 mobile, tablet클래스 제거
            $html.removeClass("mobile tablet").addClass("pc");
            //스크롤바 생성
            scrollShowHide("scroll");
        //브라우저 사이즈가 pc 사이즈보다 작고 tablet 사이즈, tablet 클래스가 없을 떄
        //tablet 사이즈로 변경됐을 때 동작
        } else if(w_size < deviceSize.pc && w_size >= deviceSize.tablet && !$("html").hasClass("tablet")) {
            //tablet클래스 추가 pc, mobile 클래스 제거
            $html.removeClass("mobile pc").addClass("tablet");
            //스클롤바 생성
            scrollShowHide("scroll");
        //브라우저 사이즈가 mobile 사이즈면서 mobile 클래스가 없을 때
        //mobile사이즈로 변경됐을 때 동작
        } else if(w_size <= deviceSize.mobile && !$("html").hasClass("mobile")) {
            //mobile 클래스 추가 tablet, pc 클래스 제거
            $html.removeClass("tablet pc").addClass("mobile");
            //.mobile-menu-wrap의 left값 가져옴
            var menu_pos = parseInt($(".moblie-menu-wrap").css("left"));
            //.mobile-menu-wrap의 left값이 0보다 클 때 스크롤바 숨김 처리
            if(menu_pos >= 0) {
                scrollShowHide("hidden");
            }
        }
    });

    $(function() {
        //브라우저 사이즈 조절 강제 이벤트 발생
        $(win).trigger("resize");
        
        $(document).on("mouseover focus", ".pc #gnb>ul>li>a, .tablet #gnb>ul>li>a", gnbPlay);

        $(document).on("click", ".mobile #gnb>ul>li:not(.no-sub)>a", gnbPlay);

        function gnbPlay() {
            var $ts = $(this);
            if($("html").hasClass("mobile")) {
                $(".moblie #gnb>ul>li>a").removeClass("on");
                $("#gnb ul ul:visible").slideUp(300);
                if($ts.next().is(":hidden")) {
                    $ts.addClass("on");
                    $ts.next().stop(true, true).slideDown(300);
                }
            } else {
                $("#gnb ul ul:visible").slideUp(300);
                $ts.next().stop(true, true).slideDown(300);
            }
        }

        $(document).on("mouseleave", "pc #gnb, .tablet #gnb", gnbleave);

        function gnbleave() {
            $("#gnb ul ul:visible").slideUp(300);
            $("#gnb>ul>li>a").removeClass("on");
        }

        $(".moblie-menu-open button").on("click", function() {
            $(".moblie-menu-wrap").animate({
                "left" : 0
            }, 200);
            scrollShowHide("hidden");
        });

        $(".moblie-menu-close button").on("click", function() {
            scrollShowHide("scroll");
            gnbleave();
        });
    });
}(window, jQuery));