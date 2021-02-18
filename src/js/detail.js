import './headNav.js';
import './jquery-3.4.1.js';
$(".lg-wrap .color ul").click(function (e) {
  $(e.target).addClass('color-active').siblings('li').removeClass('color-active');
})
$(".delivery .size .ass").on('click', 'a', function (e) {
  $(e.target).addClass('active').siblings('a').removeClass('active');
})
$(".lg-wrap .data-lg-list").on('mouseenter', 'li', function (e) {
  $(e.target).addClass('lg-list-active').siblings('li').removeClass('lg-list-active')
  let src = $(e.target).children('img').attr('src');
  $(".lg-wrap >.lg-imgs >.imgs>img").attr('src', src);
})
$(".lg-wrap>.lg-imgs>.imgs").mouseover(function () {
  let src = $(this).children('img').attr('src');
  $(".lg-wrap>.lg-imgs>.imgs>.show-lg-img").css('backgroundImage', 'url(' + src + ')');
})
$(".lg-wrap>.lg-imgs>.imgs").mousemove(function (e) {
  let x = e.clientX - this.offsetLeft;
  let y = e.clientY - this.offsetTop;
  $(".lg-wrap .imgs .show-lg-img").css({
    backgroundPositionX: - x - 20,
    backgroundPositionY: -y - 20
  })
})

// 获取请求数据的pid
let search = location.search;
// 数据有限，巧妙使用
search = search.slice(search.indexOf('#'));
console.log(search);
// 渲染数据
$.ajax({
  url: '../data/detail.json',
  method: 'get',
  success(data) {
    let dataStr = '';
    data.forEach(item => {
      if (item.pid == search) {
        if (!item.headList) {
          $(".data-list").css({
            'display': 'none'
          })
          $(".main-head").css('backgroundImage', 'url(' + item.changeImg + ')');
        }
        $(".data-lgImgs").attr('src', item.lgImgs);
        $(".show-lg-img").css('background-image', 'url(' + item.lgImgs + ')');

        dataStr = '';
        for (let i = 0; i < item.lgList.length; i++) {
          dataStr += `
          <li>
           <img src="${item.lgList[i]}" alt="">
          </li> 
         `;
        }
        $(".data-lg-list").html(dataStr);

        $(".data-collect").text(item.collect);
        $(".data-infos-title").text(item.info.title);
        $(".data-infos-logo").attr('src', item.info.logo);
        $(".data-info-xc").text(item.info.xc);
        $(".data-infos-price").text(item.info.price);
        $(".data-infos-pl").text(item.info.pl);
        dataStr = '';
        for (let i = 0; i < item.head.length; i++) {
          dataStr += `
            <li>
             <a href="#"> ${item.head[i]}</a>
           </li>
          `;
        }
        $(".data-list").html(dataStr);
        $(".data-list>li").eq(0).find('a').append("<span class='iconfont icon-xiajiantou'></span>")
        $(".data-list>li").eq(5).find('a').append("<span class='iconfont icon-xiajiantou'></span>")
        $(".data-infos-jy").text(item.info.jy);
        $(".data-infos-taobao-price").text(item.info.taobaoPrice);
        dataStr = '';
        for (let i = 0; i < item.info.size.length; i++) {
          dataStr += `
            <a>${item.info.size[i]}</a>
            `;
        }
        $(".delivery .size .ass").html(dataStr);
        if (item.info.size.length == 1) {
          $(".delivery .size .ass a").addClass('active');
        }
        dataStr = '';
        for (let i = 0; i < item.info.color.length; i++) {
          dataStr += `
             <li>${item.info.color[i]}</li>
            `;
        }
        $(".data-infos-color").html(dataStr);
        $('.data-max-num').text(item.info.maxNum);
        dataStr = '';
        for (let i = 0; i < item.info.huabei.length; i++) {
          dataStr += `
            <li>￥<em>${item.info.huabei[i]}</em> x3期(含手续费)</li>
            `;
        }
        $(".data-infos-huabei").html(dataStr);
        $(".data-info-old").text(item.info.old)
        $(".data-infos-storeName").text(item.info.storeName);
        dataStr = '';
        for (let i = 0; i < item.info.promise; i++) {
          dataStr += `
            <img src="../img/detail/store-g.gif" alt="">
            `;
        }
        $(".data-inofs-promise").html(dataStr);
        $(".data-infos-storeboss").text(item.info.storeboss)
      }
    })
  }
})