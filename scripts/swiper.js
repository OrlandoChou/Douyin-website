var swiper = new Swiper(".mySwiper", {
    direction: "vertical",
    mousewheel: {
        forceToAxis: true,
    },
    keyboard: {
        enabled: true,
        onlyInViewport: true,
    },
    on: {
        slideChange: function () {
            var currentIndex = swiper.activeIndex;
            var video = $("#myVideo")[0];

            if ($(".swiper-slide").eq(currentIndex).find("video").length > 0) {
                // 当前slide包含video，播放视频
                video.play();
            } else {
                // 当前slide不包含video，暂停视频
                video.pause();
            }
        },
    },
});
let isSliding = false;

function handleSlide(action) {
if (!isSliding) {
    isSliding = true;
    action();
}
}

swiper.on('slideChangeTransitionEnd', function () {
    isSliding = false;
});

// 阻止在 .video-comment-box 内部的滚动行为
swiper.el.addEventListener('mousewheel', function (event) {
    console.log('滚动了');
    // 检查事件的目标是否在 .video-comment-box 内
    if (event.target.closest('.video-comment-box')) {
        event.stopPropagation();  // 阻止事件传播
        console.log('阻止了滚动');
    }
});

document.querySelector('.last-video-icon-box').addEventListener('click', function() {
    handleSlide(() => swiper.slidePrev());
});

document.querySelector('.next-video-icon-box').addEventListener('click', function() {
    handleSlide(() => swiper.slideNext());
});