import './headNav.js';
import './jquery-3.4.1.js';
$(".lg-wrap .color ul").click(function (e) {
  $(e.target).addClass('color-active').siblings('li').removeClass('color-active');
})
$(".lg-wrap .lg-list").on('mouseenter', 'li', function (e) {
  $(e.target).addClass('lg-list-active').siblings('li').removeClass('lg-list-active')
  let src = $(e.target).children('img').attr('src');
  $(".lg-wrap .imgs>img").attr('src', src);
  $(".lg-wrap .imgs .show-lg-img").css('background-image', 'url(' + src + ')');
})
$(".lg-wrap .imgs").mousemove(function (e) {
  let x = e.clientX - this.offsetLeft;
  let y = e.clientY - this.offsetTop;
  $(".lg-wrap .imgs .show-lg-img").css({
    backgroundPositionX: - x - 20,
    backgroundPositionY: -y - 20
  })
})