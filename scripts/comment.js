commentInit();
function commentInit() { 
    $(document).ready(function() {
        $('.like-comment-icon-box').click(function() {
            // 检查红色点赞图标是否显示
            if ($('.red-like-comment-icon', this).is(':visible')) {
                // 如果红色图标显示，则表示取消点赞，恢复原来的图标，并减少点赞数量
                $('.red-like-comment-icon', this).hide();
                $('.like-comment-icon', this).show();
                var likeCount = parseInt($('.like-comment-icon-label', this).text());
                $('.like-comment-icon-label', this).text(likeCount - 1);
                
            } else {
                // 如果红色图标隐藏，则表示点赞，切换图标，并增加点赞数量
                $('.red-like-comment-icon', this).show();
                $('.like-comment-icon', this).hide();
                var likeCount = parseInt($('.like-comment-icon-label', this).text());
                $('.like-comment-icon-label', this).text(likeCount + 1);
            }
        });
    });
    
    $(document).ready(function() {
        $('.share-comment-icon-box').on('click', function() {
            // Find the ID of the associated .user-comment element
            var commentId = $(this).closest('.comment-icon-box').attr('id');
            
            // Use the ID to find the .user-comment element and get its text
            var commentText = $('#' + commentId + '.user-comment').text();
            
            // Create a temporary input element to copy the text to the clipboard
            var tempInput = $('<input>');
            $('body').append(tempInput);
            tempInput.val(commentText).select();
            document.execCommand('copy');
            tempInput.remove();
            
            // Optionally, alert the user that the text has been copied
            alert('文本 \“' + commentText +'\” 已分享到剪贴板');
        });
    });
}
$(document).ready(function() {
    $('.comment-send-input').on('input', function() {
        if ($(this).val().trim() !== '') {
            $('#comment-send-enter').show();
        } else {
            $('#comment-send-enter').hide();
        }
    });
});
$(document).ready(function() {
    $('#comment-send-enter').on('click', function() {
        var myWord = $('.comment-send-input').val().trim();
        commentText =
            `
            <div id="mine" class="user-comment-box">
                <div id="mine" class="user-comment-image-box">
                    <img id="mine" src="icon/mine.jpeg">
                </div>
                <div id="mine" class="user-comment-info-box">
                    <div id="mine" class="user-box">
                        <div id="mine" class="user-name">Orlandz🎈</div>
                        <div id="mine" class="user-comment">${myWord}</div>
                        <div id="mine" class="user-time">今天${getCurrentTime24h()} &#183; 浙江</div>
                        <div id="mine" class="user-comment-icon-box">
                            <div id="mine" class="reply-comment-icon-box comment-icon-box">
                                <div class="reply-comment-icon comment-icon"></div>
                                <div class="reply-comment-icon-label comment-icon-label">回复</div>
                            </div>
                            <div id="mine" class="share-comment-icon-box comment-icon-box">
                                <div class="share-comment-icon comment-icon"></div>
                                <div class="share-comment-icon-label comment-icon-label">分享</div>
                            </div>
                            <div id="mine" class="like-comment-icon-box comment-icon-box">
                                <div class="like-comment-icon comment-icon"></div>
                                <div class="red-like-comment-icon comment-icon" style="display: none;"></div>
                                <div class="like-comment-icon-label comment-icon-label">0</div>
                            </div>
                            <div id="mine" class="dislike-comment-icon-box comment-icon-box">
                                <div class="dislike-comment-icon comment-icon"></div>
                                <div class="full-dislike-comment-icon comment-icon" style="display: none;"></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>            
            `
        if (commentText !== '') {
            $('.comment-text-inside-box').html(function(index, currentContent) {
                return currentContent + commentText;
            });
            $('.comment-send-input').val(''); // Optionally clear the input field after appending
        }
        $('#comment-send-enter').hide();
        commentInit();
        var Count = parseInt($('.comment-number').text());
        $('.comment-number').text(Count + 1);
    });
});
function getCurrentTime24h() {
    var now = new Date();
    var hours = now.getHours();
    var minutes = now.getMinutes();
    minutes = minutes < 10 ? '0' + minutes : minutes; // Add leading zero to minutes if necessary
    return hours + ':' + minutes;
}

$(document).ready(function(){
    // 点击显示按钮时
    $('.others-show-box').click(function(){
        // 显示同一个父类中的所有others-box
        $(this).closest('.user-comment-info-box').find('.others-box').show();
        // 隐藏显示按钮
        $(this).hide();
        // 显示隐藏按钮
        $(this).siblings('.others-hidden-box').show();
    });

    // 点击隐藏按钮时
    $('.others-hidden-box').click(function(){
        // 隐藏同一个父类中的所有others-box
        $(this).closest('.user-comment-info-box').find('.others-box').hide();
        // 隐藏隐藏按钮
        $(this).hide();
        // 显示显示按钮
        $(this).siblings('.others-show-box').show();
    });
});
$(document).ready(function(){
    // 定义变量用于保存原始的评论内容和时间
    var originalComment = '';
    var originalTime = '';

    // 折叠评论的函数
    function foldComment(commentBox) {
        // 保存原始内容
        originalComment = commentBox.find('.user-comment').text();
        originalTime = commentBox.find('.user-time').text();

        // 执行折叠操作
        commentBox.find('.reply-comment-icon-box').hide();
        commentBox.find('.share-comment-icon-box').hide();
        commentBox.find('.dislike-comment-icon').hide();
        commentBox.find('.full-dislike-comment-icon').show();
        commentBox.find('.user-comment').text('该评论已被折叠');
        commentBox.find('.user-time').text('');
    }

    // 恢复评论的函数
    function unfoldComment(commentBox) {
        // 恢复原始内容
        commentBox.find('.reply-comment-icon-box').show();
        commentBox.find('.share-comment-icon-box').show();
        commentBox.find('.dislike-comment-icon').show();
        commentBox.find('.full-dislike-comment-icon').hide();
        commentBox.find('.user-comment').text(originalComment);
        commentBox.find('.user-time').text(originalTime);
    }

    // 点击事件绑定
    $('.dislike-comment-icon-box').click(function(){
        var commentBox = $(this).closest('.user-box');
        if (commentBox.find('.user-comment').text() === '该评论已被折叠') {
            unfoldComment(commentBox); // 如果评论已被折叠，则展开评论
        } else {
            foldComment(commentBox); // 如果评论未折叠，则折叠评论
        }
    });
});










