import './headNav.js';
// login部分
// 搜索框输入时
function reqData(dom, val) {
  if (!val) {
    $(dom).find('.placeholder').css("display", "block");
    $(dom).find('.icon-sousuo').css("display", "block");
    $(dom).find('.common').empty().css("display", "none");
    return
  }
  $(dom).find('.placeholder').css("display", "none");
  $(dom).find('.icon-sousuo').css("display", "none");
  $(dom).find('.common').css('display', 'block');
  jsonp({
    url: 'http://suggestion.baidu.com/su',
    jsonp: 'cb',
    jsonpCallback: 'hh',
    data: {
      wd: val
    },
    success(data) {
      let str = '';
      $(dom).find('.common').empty();
      data.s.forEach(val => {
        str += `<a href="#" > ${val}</a>`
      })
      $(dom).find('.common').append(str);

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
// 防抖
function debounce(cb, delay = 300, dom = undefined, val = undefined) {
  let timer = null;
  return function () {
    clearTimeout(timer);
    timer = setTimeout(() => {
      cb(dom, val);
    }, delay);
  }
}

$(".home-search-ipt")[0].oninput = function () {
  var db1 = debounce(reqData, 500, '.home-logo', $('.home-search-ipt').val().trim());
  db1();
}

$(".home-search-ipt2")[0].oninput = function () {
  var db2 = debounce(reqData, 300, '.home-search-dask', $('.home-search-ipt2').val().trim());
  db2();
}


// 切换天猫选项
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
        <img src="${data[i].img2}" alt="">
        <h5>${data[i].title}</h5>
        <p>${data[i].desc}</p>
        <span class="iconfont ${data[i].love.iconfont}">  ${data[i].love.peopleNum + data[i].love.say}</span>
      </a>
    `
    }
    $(".goods .goods-cont").html(goodsStr);
  }
})
// 懒加载图片
function loadImage(dom, data) {
  var img = [], imgData = [],
    showImage = new Image();
  for (let i = 0; i < data.length; i++) {
    imgData.push(data[i].img);
  }
  imgData = imgData.concat(imgData);
  var imgLen = imgData.length;
  showImage.src = './img/home/reload.gif';
  $(dom).append(showImage);
  for (let i = 0; i < imgLen; i++) {
    img[i] = new Image()
    img[i].src = imgData[i]
    $(img[i]).on('load', function () {
      setTimeout(() => {
        $(dom).eq(i).empty();
        $(dom).eq(i).append(img[i]);
      }, 2000);
    })
  }
}
// 渲染热卖单品数据
$.ajax({
  url: './data/popular.json',
  method: 'get',
  success(data) {
    let popularStr = '';
    for (let i = 0, len = data.length; i < len; i++) {
      popularStr += `
        <li>
          <a href="./views/detail.html?pid=${data[i].pid}">
            <div class="imgs"></div>
            <p class="popular-desc"><img src="${data[i].descImg}" alt="" style="display: ${data[i].descImg ? "inline-block" : "none"}">${data[i].desc}</p>
            <p class="popular-liked">
              评价<span>${data[i].evaluation}</span> 收藏 <em>${data[i].favorites}</em>
            </p>
            <p class="popular-price">
              <i>￥</i><em>${data[i].newPrice}</em>
              <span style="display:${data[i].oldPrice ? "inline-block" : "none"}">￥${data[i].oldPrice}</span>
              <strong>月销${data[i].sell}笔</strong>
            </p>
          </a>
        </li>
      `;
    }
    popularStr += popularStr;
    $(".popular-cont").html(popularStr);
    $(".popular-cont").ready(function () {
      loadImage('.popular-cont li a .imgs', data);
    })
  }
})
// 渲染热卖单品列表数据
$.ajax({
  url: './data/profile2.json',
  method: 'get',
  success(data) {
    console.log(data);
    let str = '';
    for (let i = 0; i < data.list.length; i++) {
      str += `
       <a href="./views/profile2.html?id=${i}" target="blanck">${data.list[i]}</a>
      `;
    }
    $('.popular-link').html(str);
  }
})
// 渲染猜你喜欢数据
$.ajax({
  url: './data/mayLike.json',
  method: 'get',
  success(data) {
    let mayLikeStr = '';
    for (let i = 0, len = data.length; i < len; i++) {
      mayLikeStr += `
        <li>
          <a href="./views/detail.html?pid=${data[i].pid}">
            <img src="${data[i].img}" alt="">
            <h4><img src="./img/home/may-like-bdy.png" style="display:${data[i].titleImg ? 'inline-block' : 'none'}" alt=""> ${data[i].title}
            </h4>
            <p>
              <i>￥</i><span class="price">${data[i].price}</span>
              <strong>销量:${data[i].sell}</strong>
            </p>
            <div class="dask"></div>
          </a>
        </li>
      `;
      mayLikeStr += mayLikeStr;
    }
    $(".may-like-cont").html(mayLikeStr);
  }
})
// 滚动窗口显示搜索框
let throttlingFn = throttling(scrollWindow, 200, window);
window.onscroll = function () {
  throttlingFn();

}

// 节流
function throttling(cb, delay = 300, dom) {
  let timer = null, lastTimer = null;
  return function () {
    let nowTimer = Date.now();
    if (lastTimer && nowTimer < lastTimer + delay) {
      clearTimeout(timer);
      timer = setTimeout(() => {
        lastTimer = Date.now();
        cb(dom);
      }, delay);
    } else {
      lastTimer = nowTimer;
      cb(dom);
    }
  }

}
// 节流滚动窗口
function scrollWindow(dom) {
  if (dom.scrollY >= 160) {
    $('.search-dask').css('display', 'block');
  } else {
    $('.search-dask').css('display', 'none');
  }
  //滚动定位侧边栏
  if (-dom.scrollY >= -400) {
    $(".miaodian").css({
      position: 'absolute',
      top: 440 + 'px'
    });
  } else {
    $(".miaodian").css({
      position: 'fixed',
      top: '36px'
    });
  }
  // 显示或隐藏返回顶部
  if (-dom.scrollY >= -670) {
    $('a.to-top').css('display', 'none');
  } else {
    $('a.to-top').css('display', 'block');
  }
}
//锚点处理
$(".miaodian").on('click', 'a', function (e) {
  let target = $(e.target).attr('idx');
  let top = 0;
  switch (target) {
    case '#goods':
      top = $(target).offset().top - 54;
      window.scrollTo(0, top);
      break;
    case '#featured-goods':
      top = $(target).offset().top - 54;
      window.scrollTo(0, top);
      break;
    case '#popular':
      top = $(target).offset().top - 54;
      window.scrollTo(0, top);
      break;
    case '#may-like':
      top = $(target).offset().top - 54;
      window.scrollTo(0, top);
      break;
    default:
      break;
  }

})
