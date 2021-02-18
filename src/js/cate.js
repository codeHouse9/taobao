import './jquery-3.4.1.js';
import './headNav.js';
// 点击切换列表
$(".tab").on('click', 'span', function () {
  $(this).addClass('active-tab').siblings('span')
    .removeClass('active-tab')
})
//复制数据
$(".recom-list").append($('.list1').clone(true));
$(".data1").append($('.data1').html().repeat(14));
$(".data2").append($('.data2').html().repeat(14));
$(".data3").append($('.data3').html().repeat(8));
$(".data4").append($('.data4').html().repeat(11));
$(".data5").append($('.data5').html().repeat(14));
$(".cate").append($('.cate').html().repeat(3));