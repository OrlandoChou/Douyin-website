$('.comment-tab-icon-box').click(function() {
    closeComment();
});
$('.open-comment-icon').click(function() {
    openComment();
});
function closeComment() {
    $('.video-comment-box').css('display', 'none');
    $('.open-comment-box').css('display', 'flex');
}
function openComment() {
    $('.video-comment-box').css('display', 'flex');
    $('.open-comment-box').css('display', 'none');
}
$(document).ready(function () {
    videoPlay();  
    var video = $('#myVideo')[0];
    if (video.paused) {
        $('.play-icon').css('display', 'none');
        $('.stop-icon').css('display', 'inline-block');
    } else {
        $('.play-icon').css('display', 'inline-block');
        $('.stop-icon').css('display', 'none');
    }
});
// 播放暂停
$(document).ready(function () {
    $('.open-comment-box').on('click', function(event) {
        event.stopPropagation();
    });
    $('.setting-play-box').on('click', function() {
        if ($('.play-icon').is(':visible')) {
            videoPause();
        } else {
            videoPlay();
        }
    }); 
});
function videoPlay() {
    var video = $('#myVideo')[0]; 
    video.play();
    $('.play-icon, .stop-icon').toggle();
}
function videoPause() {
    var video = $('#myVideo')[0];
    video.pause();
    $('.play-icon, .stop-icon').toggle();
}
// 空格控制播放暂停
$(document).ready(function() {
    $(document).on('keydown', function (event) {
        if (event.key === ' ') {
            var video = $('#myVideo')[0];
            if (video.paused) {
                videoPlay();
            } else {
                videoPause();
            }             
        }
    }); 
});
// 网页全屏与退出
$(document).ready(function() {
    $('.setting-webpage-box').on('click', function() {
        if ($('.full-webpage-icon').is(':visible')) {
            enterPageFull();
        } else {
            exitPageFull();
        }
    });
});
function enterPageFull() {
    $('.full-webpage-icon, .exit-full-webpage-icon').toggle();
    var element = $('.video-center');
    element.data('original-styles', element.attr('style') || '');

    element.css({
        'position': 'fixed',
        'top': 0,
        'left': 0,
        'bottom': 0,
        'width': '100vw',
        'height': '100vh',
        'margin': 0,
        'padding': 0,
        'overflow': 'hidden',
        'z-index': 9999,
        'max-height': '100vh'
    });

    var offset = element.offset();
    element.css({
        'position': 'fixed',
        'top': offset.top,
        'left': offset.left
    });
}
function exitPageFull() {
    $('.full-webpage-icon, .exit-full-webpage-icon').toggle();
    var element = $('.video-center');
    element.attr('style', element.data('original-styles'));
}
// 视频全屏与退出
$(document).ready(function () {
    $('.setting-page-box').on('click', function() {
        if ($('.full-page-icon').is(':visible')) {
            enterScreenFull();
        } else {
            exitScreenFull();
        }
    });
});
function enterScreenFull() {
    $('.full-page-icon, .exit-full-page-icon').toggle();
    var element = $('.video-center')[0];
    if (element.requestFullscreen) {
        element.requestFullscreen();
    } else if (element.mozRequestFullScreen) { // Firefox
        element.mozRequestFullScreen();
    } else if (element.webkitRequestFullscreen) { // Chrome, Safari and Opera
        element.webkitRequestFullscreen();
    } else if (element.msRequestFullscreen) { // IE/Edge
        element.msRequestFullscreen();
    }
    console.log('enter');
}
function exitScreenFull() {
    $('.full-page-icon, .exit-full-page-icon').toggle();
    if (document.exitFullscreen) {
        document.exitFullscreen();
    } else if (document.mozCancelFullScreen) { // Firefox
        document.mozCancelFullScreen();
    } else if (document.webkitExitFullscreen) { // Chrome, Safari and Opera
        document.webkitExitFullscreen();
    } else if (document.msExitFullscreen) { // IE/Edge
        document.msExitFullscreen();
    }
    console.log('exit');
}

function setIconChange() {


    $(document).ready(function() {
        $('.danmu-icon-open-close-box').on('click', function() {
            $('.danmu-opened-icon, .danmu-closed-icon').toggle();
        });
    });
    // 按钮切换
    $(document).ready(function() {
        $('.switch').click(function() {
            var $slider = $(this).find('.switch-slider');
            var isActive = $slider.position().left > 4;
    
            if (isActive) {
                // 如果开关是打开的状态，关闭它
                $slider.animate({left: '2px'}, 300);
                $(this).css('background-color', '#ccc');
            } else {
                // 如果开关是关闭的状态，打开它
                $slider.animate({left: '12px'}, 300);
                $(this).css('background-color', '#FF3366');
            }
        });
    });
}
setIconChange();

function adjustBoxSize() {
    var videoSettingBoxWidth = $('.video-setting-box').width();

    if (videoSettingBoxWidth < 800) {
        $('.setting-danmu-inside-box').css({
            'width': '32px',
            'height': '32px',
            'border': 'none'
        });
        $('.danmu-long').css('display', 'none');
        $('.danmu-short').css('display', 'flex');
    } else {
        $('.setting-danmu-inside-box').css({
            'width': '260px',
            'height': '32px',
            'border': '2px solid rgba(255, 255, 255, 0.3)',
            'border-radius': '8px'
        });
        $('.danmu-long').css('display', 'flex');
        $('.danmu-short').css('display', 'none');
    }
}
$(document).ready(function() {
    adjustBoxSize();

    // 在窗口大小变化时调用
    $(window).resize(function() {
        adjustBoxSize();
    });
});
function setTime() {
    $(document).ready(function(){
        var video = $('#myVideo')[0];
    
        // 将时间格式化为 00:00 的形式
        function formatTime(seconds) {
            var minutes = Math.floor(seconds / 60);
            var seconds = Math.floor(seconds % 60);
            if (minutes < 10) minutes = "0" + minutes;
            if (seconds < 10) seconds = "0" + seconds;
            return minutes + ":" + seconds;
        }
    
        // 更新当前时间和总时间
        function updateVideoTime() {
            var currentTime = formatTime(video.currentTime);
            var duration = formatTime(video.duration);
            $('.setting-time-box').text(currentTime + " / " + duration);
        }
    
        // 监听时间更新事件
        video.addEventListener('timeupdate', updateVideoTime);
    
        // 初始化总时长（当视频元数据加载完时）
        video.addEventListener('loadedmetadata', updateVideoTime);
    
        let clickTimer = null;
        let wasDoubleClick = false;  // 标志位，用于跟踪是否发生了双击
    
        $('.video-playing-box').on('click', function() {
            // 如果已经发生了双击，跳过单击事件
            if (wasDoubleClick) {
                wasDoubleClick = false; // 重置标志位
                return;
            }
    
            clickTimer = setTimeout(function() {
                if (!wasDoubleClick) {  // 仅在没有双击时执行
                    if (video.paused) {
                        videoPlay();
                    } else {
                        videoPause();
                    }
                }
            }, 200);  // 设置合理的延迟
        });
    
        $('.video-playing-box').on('dblclick', function() {
            clearTimeout(clickTimer);  // 清除单击事件的定时器
            wasDoubleClick = true;  // 标记为已双击
            setLike();
        });
        

    });    
}
setTime();
// 视频速度调节
$(document).ready(function() {
    $('input[name="choice"]').on('change', function() {
        var speed = $(this).val();
        $('.js-speed-label-text').text(speed + 'x');
        $('#myVideo')[0].playbackRate = parseFloat(speed);
    });
});
// 视频音量调节
$(document).ready(function() {
    $('.voice-control-input').on('input', function() {
        var value = $(this).val();
        $('.voice-value-label').text(value);
        $('#myVideo')[0].volume = value / 100;
        if (value == 0) {
            $('.voice-low-icon').css('display', 'inline-block');
            $('.voice-middle-icon').css('display', 'none');
            $('.voice-high-icon').css('display', 'none');
        } else if(value > 0 && value <= 50) {
            $('.voice-low-icon').css('display', 'none');
            $('.voice-middle-icon').css('display', 'inline-block');
            $('.voice-high-icon').css('display', 'none');
        } else {
            $('.voice-low-icon').css('display', 'none');
            $('.voice-middle-icon').css('display', 'none');
            $('.voice-high-icon').css('display', 'inline-block');
        }
    });
    $('.voice-value-label').text($('.voice-control-input').val());
    $('#myVideo')[0].volume = $('.voice-control-input').val() / 100; 
});
// 视频进度调节
$(document).ready(function() {
    var video = $("#myVideo")[0];
    var slider = $(".time-control-input");

    video.onloadedmetadata = function() {
        slider.attr("max", video.duration);
    };
    slider.on("input", function() {
        video.currentTime = slider.val();
    });
    video.ontimeupdate = function() {
        slider.val(video.currentTime);
    };
});
$(document).ready(function () {
    $('.like-switch-icon, .red-like-switch-icon').on('click', function(event) {
        event.stopPropagation();
    });
    $('.like-switch-icon').on('click', function() {
        setLike();
    });
    $('.red-like-switch-icon').on('click', function() {
        setDisike();
    });
});
function setLike() {
    $('.like-switch-icon').css('display', 'none');
    $('.red-like-switch-icon').css('display', 'inline-block');
}

function setDisike() {
    $('.like-switch-icon').css('display', 'inline-block');
    $('.red-like-switch-icon').css('display', 'none');
}
$(document).ready(function () {
    $('.comment-switch-icon').on('click', function(event) {
        event.stopPropagation();
    });
    $('.comment-switch-icon').on('click', function() {
        if ($('.video-comment-box').is(':visible')) {
            closeComment()
        }else {
            openComment();
        }
            
    });
});
$(document).ready(function () {
    $('.concern-switch-icon, .yellow-concern-switch-icon').on('click', function(event) {
        event.stopPropagation();
    });
    $('.concern-switch-icon').on('click', function() {
        setConcern();
    });
    $('.yellow-concern-switch-icon').on('click', function() {
        setDisConcern();
    });
});
function setConcern() {
    $('.concern-switch-icon').css('display', 'none');
    $('.yellow-concern-switch-icon').css('display', 'inline-block');
}
function setDisConcern() {
    $('.concern-switch-icon').css('display', 'inline-block');
    $('.yellow-concern-switch-icon').css('display', 'none');
}