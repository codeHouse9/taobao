import './headNav.js';
import './jquery-3.4.1.js';
let sizeVal, colorVal, fqgm;
let shopNum = parseInt($('.now-num').val());
$(".lg-wrap .color ul").click(function (e) {
  $(e.target).addClass('color-active').siblings('li').removeClass('color-active');
  colorVal = $(e.target).text();
})
$(".delivery .size .ass").on('click', 'a', function (e) {
  $(e.target).addClass('active').siblings('a').removeClass('active');
  sizeVal = $(e.target).text();
})
$(".lg-wrap .data-lg-list").on('mouseenter', 'li', function (e) {
  $(e.target).addClass('lg-list-active').siblings('li').removeClass('lg-list-active')
  let src = $(e.target).children('img').attr('src');
  $(".lg-wrap >.lg-imgs >.imgs>img").attr('src', src);
})

$(".lg-wrap>.lg-imgs>.imgs").mousemove(function (e) {
  let x = e.clientX - this.offsetLeft;
  let y = e.clientY - this.offsetTop;
  $(".lg-wrap .imgs .show-lg-img").css({
    backgroundPositionX: - x - 20,
    backgroundPositionY: -y - 20
  })
})

$(".lg-wrap>.lg-imgs>.imgs").mouseover(function () {
  let src = $(this).children('img').attr('src');
  $(".lg-wrap>.lg-imgs>.imgs>.show-lg-img").css('background-image', "url(" + src + ")");
})

// 获取请求数据的pid
let search = location.search;
// 数据有限，巧妙使用
search = search.slice(search.indexOf('#'));
// 修改商品数量
let maxNum;

// 减
$('.num-div').click(function () {
  shopNum = parseInt($('.now-num').val());
  maxNum = parseInt($('.data-max-num').text());
  shopNum--;
  $('.now-num').val(shopNum);
  if (shopNum < maxNum) {
    $('.num-add').css({
      'color': '#3c3c3c',
      'cursor': 'pointer'
    })
    $('.num-add').attr('disabled', false);
  }
  if (shopNum <= 1) {
    $(this).css({
      'color': '#ccc',
      'cursor': 'not-allowed'
    });
    $(this).attr('disabled', true);
  }
})
// 加
$('.num-add').click(function () {
  shopNum = parseInt($('.now-num').val());
  maxNum = parseInt($('.data-max-num').text());
  shopNum++;
  $('.now-num').val(shopNum);
  if (shopNum >= 1) {
    $('.num-div').css({
      'color': '#3c3c3c',
      'cursor': 'pointer'
    })
    $('.num-div').attr('disabled', false);
  }
  if (shopNum >= maxNum) {
    $(this).css({
      'color': '#ccc',
      'cursor': 'not-allowed'
    });
    $(this).attr('disabled', true);
  }
})
// 超出库存限制
$(".now-num").focus(function () {
  shopNum = $(this).val();
})
$(".now-num").change(function () {
  if (parseInt($(this).val()) > parseInt($('.data-max-num').text())) {
    alert('商品数量超出限制！');
    $(this).val(shopNum);
  } else if (parseInt($(this).val()) < 1) {
    alert('商品数量不能少于1件');
    $(this).val(shopNum);
  }
})

// 花呗分期
$(".data-infos-huabei").on('click', 'li', function (e) {
  if (e.target.tagName == 'LI') {
    $(e.target).css('border', '1px solid #f40').siblings('li').css('border-color', '');
    fqgm = $(e.target).find('em').text();
  }
})
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
          sizeVal = $('.active').text();
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
        // 存储数据到本地
        // 立即购买
        $(".ljgm").click(function () {
          // 判断是否已登录
          let acount = localStorage.getItem('acount');
          if (!acount) {
            let cfm = confirm('您还未登录！\n 是否前往登录？');
            if (cfm) {
              location.href = './login.html';
            }
            return false;
          }
          if (sizeVal && colorVal && shopNum && fqgm) {
            alert('购买成功！支付：' + item.info.taobaoPrice + '元');
          } else {
            alert('请把参数填完整！')
          }
        })
        // 加入购物车
        // console.log(item);
        $(".addCart").click(function () {
          // 判断是否已登录
          let acount = localStorage.getItem('acount');
          if (!acount) {
            let cfm = confirm('您还未登录！\n 是否前往登录？');
            if (cfm) {
              location.href = './login.html';
            }
            return false;
          }
          if (sizeVal && colorVal && shopNum && fqgm) {
            let acount = localStorage.getItem('acount');
            acount = JSON.parse(acount);
            let isLogin = localStorage.getItem('isLogin');
            isLogin = JSON.parse(isLogin);
            let data = acount.find(data => {
              return (data.user === isLogin.user && data.pass === isLogin.pass);
            })
            if (data) {
              if (!data.shop) {
                data.shop = [];
                data.shop.push({
                  id: item.pid,
                  store: item.info.storeName,
                  img: item.lgImgs,
                  title: item.info.title,
                  price: item.info.price,
                  taobaoPrice: item.info.taobaoPrice,
                  size: sizeVal,
                  limit: item.info.maxNum,
                  color: colorVal,
                  num: shopNum,
                  stagimg: fqgm
                });
              } else {
                let flag = false;
                for (let i = 0; i < data.shop.length; i++) {
                  if (data.shop[i].store === item.info.storeName) {
                    data.shop[i].num += parseInt(shopNum);
                    if (data.shop[i].num >= item.info.maxNum) {
                      data.shop[i].num = parseInt(item.info.maxNum);
                    }
                    flag = true;
                    break;
                  }
                }
                if (!flag) {
                  data.shop.push({
                    id: item.pid,
                    store: item.info.storeName,
                    img: item.lgImgs,
                    title: item.info.title,
                    price: item.info.price,
                    taobaoPrice: item.info.taobaoPrice,
                    size: sizeVal,
                    limit: item.info.maxNum,
                    color: colorVal,
                    num: shopNum,
                    stagimg: fqgm
                  });
                }
              }
            }
            localStorage.setItem('acount', JSON.stringify(acount));
            // 更新购物车数据
            function changeNum(data) {
              return data.reduce((total, data) => {
                if (data.user === isLogin.user && data.pass === isLogin.pass) {
                  if (data.shop) {
                    data.shop.forEach(item => {
                      total += item.num;
                    })
                    data.total = total;
                    localStorage.setItem('acount', JSON.stringify(acount));
                    return total;
                  }
                }
              }, 0)
            }
            $(".cartNum").text(changeNum(acount));

            window.addEventListener('storage', function (e) {
              console.log(1);
              $(".cartNum").text(changeNum(data));
            })
            alert('添加购物车成功！');
            location.href = './cart.html';
          } else {
            alert('请把参数填完整！')
          }
        })
      }
    })
  }
})