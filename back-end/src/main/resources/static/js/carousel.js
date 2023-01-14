$(function() {
    var cont = $('.container')
    var btns = $('.button')
    var prev = $('.prev')
    var next = $('.next')
    var currentTab = 1

    prev.click(function() {
        if(currentTab != 1) {
            currentTab--;
            btns.removeClass("selected");
            $(btns[currentTab-1]).addClass("selected");
            cont.css("transitionDuration", "700ms");
            cont.css("transform", "translateX("+ -1004*(currentTab-1) +"px)")
        }
    })
    next.click(function() {
        if(currentTab != 4) {
            currentTab++;
            btns.removeClass("selected");
            $(btns[currentTab-1]).addClass("selected");
            cont.css("transitionDuration", "700ms");
            cont.css("transform", "translateX("+ -1004*(currentTab-1) +"px)")
        }
    })
    btns.click(function () {
        currentTab = $(this).attr("id");
        btns.removeClass("selected");
        $(this).addClass("selected");
        cont.css("transitionDuration", "700ms");
        cont.css("transform", "translateX("+ -1004*(currentTab-1) +"px)");
    })
});