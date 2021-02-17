import './jquery-3.4.1.js';
import './headNav.js';
// 点击切换列表
$(".tab").on('click', 'span', function () {
  $(this).addClass('active-tab').siblings('span')
    .removeClass('active-tab')
})