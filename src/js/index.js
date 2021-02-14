import './headNav.js';
// login部分
// 搜索框输入时
$(".home-search-ipt")[0].oninput = function () {

  if (!$(".home-search-ipt").val().trim()) {
    $(".placeholder").css("display", "block");
    $(".icon-sousuo").css("display", "block");
    $(".home-logo .common").empty().css("display", "none");
    return
  }
  $(".placeholder").css("display", "none");
  $(".icon-sousuo").css("display", "none");
  $(".home-logo .common").css('display', 'block');

  $(".common").append();
  jsonp({
    url: 'http://suggestion.baidu.com/su',
    jsonp: 'cb',
    jsonpCallback: 'hh',
    data: {
      wd: $(this).val(),
    },
    success(data) {
      let str = '';
      $(".home-logo .common").empty();
      data.s.forEach(val => {
        str += `<a href="#" > ${val}</a>`
      })
      $(".home-logo .common").append(str);

    }
  })

}
//封装jsonp请求数据
// url地址:http://suggestion.baidu.com/su

// -----请求参数-----
//    cb      回调函数
//    wd      关键词
function jsonp(options) {
  window[options.jsonpCallback] = options.success;
  let data = '';
  if (typeof options.data === 'string') {
    data = options.data;
  }
  if (Object.prototype.toString.call(options.data) === '[object Object]') {
    for (let k in options.data) {
      data += (k + '=' + options.data[k] + '&');
    }
    data = data.slice(0, -1);
  }
  const script = document.createElement("script");
  script.src = options.url + '?' + options.jsonp + '=' + options.jsonpCallback + '&' + data;
  document.body.appendChild(script);
  script.onload = function () {
    document.body.removeChild(script);
  }

}

// 切换天猫选项
console.log($(".home-search>span"));
$(".home-search span").click(function () {
  console.log($(this));
  $(this).addClass("active").siblings('span').removeClass('active');
})

// 点击叉，关闭二维码
$(".icon-cha").click(function () {
  $(".home-ewm").css('visibility', "hidden");
})

// 首页上面的轮播图
var mainSwiper = new Swiper('.main-swiper', {
  // direction: 'vertical', // 垂直切换选项
  loop: true, // 循环模式选项

  // 如果需要分页器
  pagination: {
    el: '.swiper-pagination',
    clickable: true,
  },

  // 如果需要前进后退按钮
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  // 自动轮播
  autoplay: {
    delay: 5000,
    stopOnLastSlide: false,
    disableOnInteraction: true,
  }
})
//鼠标覆盖停止自动切换
mainSwiper.el.onmouseover = function () {
  mainSwiper.autoplay.stop();
}

//鼠标离开开始自动切换
mainSwiper.el.onmouseout = function () {
  mainSwiper.autoplay.start();
}

// tamll-swiper
var tamllSwiper = new Swiper('.tamll-swiper', {
  loop: true, // 循环模式选项
  // 自动轮播
  autoplay: {
    delay: 5000,
    stopOnLastSlide: false,
    disableOnInteraction: true,
  },
  // 如果需要分页器
  pagination: {
    el: '.swiper-pagination',
    type: 'progressbar',
    clickable: true,

  },

  // 如果需要前进后退按钮
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  // 如果需要滚动条
  scrollbar: {
    el: '.swiper-scrollbar',
  },
})
//鼠标覆盖停止自动切换
tamllSwiper.el.onmouseover = function () {
  tamllSwiper.autoplay.stop();
}

//鼠标离开开始自动切换
tamllSwiper.el.onmouseout = function () {
  tamllSwiper.autoplay.start();
}

// 公告切换
$("#home-main .notice a").mouseover(function () {
  let index = $(this).index();
  $(this).children('.notice-cont').addClass('notice-cont-active')
  $(this).children('span').addClass('active');
  $(this).siblings('a').children('span').removeClass('active');
  $(this).siblings('a').children('.notice-cont').removeClass("notice-cont-active")
});
// 循环列出app图标
$("#home-main .app li").each(function (index, item) {
  $(item).find('.app-ico').css('background-position', '0 ' + index * -44 + 'px');
})
//有好货数据渲染
let goodsStr = '';
// 数据请求
$.ajax({
  url: './data/goods.json',
  method: 'get',
  success(data) {
    for (let i = 0, len = data.length; i < len; i++) {
      goodsStr += `
      <a href="./views/profile.html?${"goodsId=" + data[i].goodsId}" target="_blank">
        <img src="${data[i].img}" alt="">
        <h5>${data[i].title}</h5>
        <p>${data[i].desc}</p>
        <span class="iconfont ${data[i].love.iconfont}">  ${data[i].love.peopleNum + data[i].love.say}</span>
      </a>
    `
    }
    $(".goods .goods-cont").html(goodsStr);
  }
})
