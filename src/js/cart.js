import './headNav.js';
// 获取本地用户数据
let acount = localStorage.getItem('acount');
acount = JSON.parse(acount);
// 获取当前账号的商品数据
let isLogin = localStorage.getItem('isLogin');
isLogin = JSON.parse(isLogin);
if (acount) {
  let item = acount.find(item => {
    return (item.user === isLogin.user && item.pass === isLogin.pass)
  })
  // 渲染数据
  function updata(data) {
    let str = '';
    data.forEach(data => {
      str += `
    <li class="nowShop ${"id" + data.id}">
      <h3>
        <input type="checkbox">
        <span></span> 店铺：
        <a href="./detail.html?pid=${data.id}">${data.store}旗舰</a>
        <i></i>
      </h3>
      <div class="shop-infos">
        <input type="checkbox">
        <div class="imgs">
          <img src="${data.img}" alt="">
        </div>
        <div class="tit">
          <a href="./detail.html?pid=${data.id}">${data.title}</a>
          <div class="small-ico">
            <img src="../img/cart/small-ico (1).png" alt="">
            <img src="../img/cart/small-ico (2).png" alt="">
            <img src="../img/cart/small-ico (3).png" alt="">
          </div>
        </div>
        <div class="alter">
          <div class="pend"></div>
          <div class="size">大小：${data.size}</div>
          <div class="color">颜色：${data.color}</div>
          <div class="alter-cont">
            <div class="angle"></div>
            <div class="left">暂不支持修改，哈哈哈，有点累了<button class="closeThis">关闭</button></div>
          </div>
        </div>
        <div class="unit-price">
          <span class="old-price">￥${data.price.toFixed(2)}</span>
          <span class="new-price">￥<i class="nowPrice">${data.taobaoPrice.toFixed(2)}</i></span>
        </div>
        <div class="number">
          <div class="change">
            <button class="num-div"> - </button>
            <input type="text" value="${data.num}" class="now-num">
            <button class="num-add"> + </button>
          </div>
          <div class="limit">限购<span class="data-max-num">${data.limit}</span>件</div>
        </div>
        <div class="amount">￥<span class="amountPrice">${(data.num * data.taobaoPrice).toFixed(2)}</span></div>
        <div class="operating">
          <button>移入收藏夹</button>
          <button class="delShop">删除</button>
          <button>相似宝贝</button>
        </div>
      </div>
    </li>
    `;
    })
    $('.bd-cont').html(str);
  }
  updata(item.shop);
  window.addEventListener('storage', function (e) {
    let data = JSON.parse(e.newValue);
    if (data) {
      updata(data[0].shop);
      //
      if ($('#selectAll').prop('checked')) {
        $('.bd-cont input[type=checkbox]').prop('checked', true);
      }
    } else {
      $('.bd-cont').html('');
    }
  })
}

// 修改商品数量
let maxNum, shopNum, total = 0, selected;
// 减
$('.num-div').click(function () {
  shopNum = parseInt($(this).siblings('.now-num').val());
  maxNum = parseInt($(this).parents('.change').siblings('.limit').find('.data-max-num').text())
  shopNum--;

  if (shopNum < maxNum) {
    $(this).siblings('.num-add').css({
      'color': '#3c3c3c',
      'cursor': 'pointer'
    })
    $(this).siblings('.num-add').attr('disabled', false);
  }
  if (shopNum < 1) {
    $(this).css({
      'color': '#ccc',
      'cursor': 'not-allowed'
    });
    $(this).attr('disabled', true);
    return
  }
  $(this).siblings('.now-num').val(shopNum);
  let newPrice = $(this).parents('.number').prev('.unit-price').find('.nowPrice').text();
  $(this).parents('.number').siblings('.amount').children('.amountPrice').text(parseFloat(shopNum * newPrice).toFixed(2));
  // 已选商品数量
  selected = $('.bd-cont .shop-infos input[type=checkbox]:checked');
  // 总价
  selected.each((index, item) => {
    total += parseFloat($(item).siblings('.amount').find('.amountPrice').text());
  })
  $('.totalPrice').text(total.toFixed(2));
  total = 0;
  // 存储数量
  let data = acount.find(item => {
    return (item.user === isLogin.user && item.pass === isLogin.pass)
  })
  data.shop.forEach(item => {
    let id = $(this).parents('.nowShop')[0].className;
    id = id.slice(id.indexOf(' ')).trim();
    if ('id' + item.id == id) {
      item.num = shopNum;
      console.log(item.num);
    }
  })
  localStorage.setItem('acount', JSON.stringify(acount));
})

// 加
$(".num-add").on('click', function (e) {
  shopNum = parseInt($(this).siblings('.now-num').val());
  maxNum = parseInt($(this).parents('.change').siblings('.limit').find('.data-max-num').text())
  shopNum++;
  if (shopNum >= 1) {
    $(this).siblings('.num-div').css({
      'color': '#3c3c3c',
      'cursor': 'pointer'
    })
    $(this).siblings('.num-div').attr('disabled', false);
  }
  if (shopNum > maxNum) {
    $(this).css({
      'color': '#ccc',
      'cursor': 'not-allowed'
    });
    $(this).attr('disabled', true);
    return;
  }
  $(this).siblings('.now-num').val(shopNum);
  let newPrice = $(this).parents('.number').prev('.unit-price').find('.nowPrice').text();
  $(this).parents('.number').siblings('.amount').children('.amountPrice').text(parseFloat(shopNum * newPrice).toFixed(2));
  // 已选商品数量
  selected = $('.bd-cont .shop-infos input[type=checkbox]:checked');
  // 总价
  selected.each((index, item) => {
    total += parseFloat($(item).siblings('.amount').find('.amountPrice').text());
  })
  $('.totalPrice').text(total.toFixed(2));
  total = 0;
  // 存储数量
  let data = acount.find(item => {
    return (item.user === isLogin.user && item.pass === isLogin.pass)
  })
  data.shop.forEach(item => {
    let id = $(this).parents('.nowShop')[0].className;
    id = id.slice(id.indexOf(' ')).trim();
    if ('id' + item.id == id) {
      item.num = shopNum;
      console.log(item.num);
    }
  })
  localStorage.setItem('acount', JSON.stringify(acount));
})
// 超出库存限制
$(".now-num").focus(function () {
  shopNum = $(this).val();
})
$('.now-num').change(function () {
  if (parseInt($(this).val()) > parseInt($(this).parents('.change').siblings('.limit').find('.data-max-num').text())) {
    alert('商品数量超出限制！');
    $(this).val(shopNum);
  } else if (parseInt($(this).val()) < 1) {
    alert('商品数量不能少于1件');
    $(this).val(shopNum);
  } else {
    // 已选商品数量
    selected = $('.bd-cont .shop-infos input[type=checkbox]:checked');
    let newPrice = $(this).parents('.number').prev('.unit-price').find('.nowPrice').text();
    $(this).parents('.number').siblings('.amount').children('.amountPrice').text(parseFloat($(this).val() * newPrice).toFixed(2));
    // 总价
    selected.each((index, item) => {
      total += parseFloat($(item).siblings('.amount').find('.amountPrice').text());
    })
    $('.totalPrice').text(total.toFixed(2));
    total = 0;
    // 存储数量
    shopNum = parseInt($(this).val());
    let data = acount.find(item => {
      return (item.user === isLogin.user && item.pass === isLogin.pass)
    })
    data.shop.forEach(item => {
      let id = $(this).parents('.nowShop')[0].className;
      id = id.slice(id.indexOf(' ')).trim();
      if ('id' + item.id == id) {
        item.num = shopNum;
        console.log(item.num);
      }
    })
    localStorage.setItem('acount', JSON.stringify(acount));
  }
})
let checkLen;
// 删除商品
$(".delShop").click(function () {
  $(this).closest('.nowShop').remove();
  checkLen = $('.bd-cont input[type=checkbox]').length;
  if ($('.bd-cont input[type=checkbox]:checked').length === checkLen) {
    $('#selectAll').prop('checked', true);
    $('#selectAll2').prop('checked', true);
  } else {
    $('#selectAll').prop('checked', false);
    $('#selectAll2').prop('checked', false);
  }
  // 已选商品数量
  selected = $('.bd-cont .shop-infos input[type=checkbox]:checked');
  $(".selecedNum").text(selected.length);
  // 总价
  selected.each((index, item) => {
    total += parseFloat($(item).siblings('.amount').find('.amountPrice').text());
  })
  $('.totalPrice').text(total.toFixed(2));
  total = 0;
  if (selected.length) {
    $('.settle').css('backgroundColor', '#f40');
  } else {
    $('.settle').css('backgroundColor', '#b0b0b0');
  }
})
// 修改商品
$(".alter .pend").mouseover(function () {
  $(this).css({
    'background': '#f40'
  })
  $(this).text('修改');
})
$(".alter .pend").click(function () {
  $(this).siblings(".alter-cont").css('display', 'block');
})
$(".closeThis").click(function () {
  $(this).parents('.alter-cont').css('display', 'none');
})
// 全选商品
$('#selectAll').click(function () {
  $('#selectAll2').prop('checked', $(this).prop('checked'));
  $('.bd-cont input[type=checkbox]').prop('checked', $(this).prop('checked'));
  // 已选商品数量
  selected = $('.bd-cont .shop-infos input[type=checkbox]:checked');
  $(".selecedNum").text(selected.length);
  // 总价
  selected.each((index, item) => {
    total += parseFloat($(item).siblings('.amount').find('.amountPrice').text());
  })
  $('.totalPrice').text(total.toFixed(2));
  total = 0;
  if (selected.length) {
    $('.settle').css('backgroundColor', '#f40');
  } else {
    $('.settle').css('backgroundColor', '#b0b0b0');
  }
})
$('#selectAll2').click(function () {
  $('#selectAll').click();
})
// 单选
$('.bd-cont input[type=checkbox]').click(function () {
  checkLen = $('.bd-cont input[type=checkbox]').length;
  let nowCheckBox = $(this).parents('.shop-infos').prev('h3').children('input[type=checkbox]').length ? $(this).parents('.shop-infos').prev('h3').children('input[type=checkbox]') : $(this).parent('h3').next('.shop-infos').find('input[type=checkbox]');
  nowCheckBox.prop('checked', $(this).prop('checked'));
  if ($('.bd-cont input[type=checkbox]:checked').length === checkLen) {
    $('#selectAll').prop('checked', true);
    $('#selectAll2').prop('checked', true);
  } else {
    $('#selectAll').prop('checked', false);
    $('#selectAll2').prop('checked', false);
  }
  // 已选商品数量
  selected = $('.bd-cont .shop-infos input[type=checkbox]:checked');
  $(".selecedNum").text(selected.length);
  // 总价
  selected.each((index, item) => {
    total += parseFloat($(item).siblings('.amount').find('.amountPrice').text());
  })
  $('.totalPrice').text(total.toFixed(2));
  total = 0;
  if (selected.length) {
    $('.settle').css('backgroundColor', '#f40');
  } else {
    $('.settle').css('backgroundColor', '#b0b0b0');
  }
})
// 结算
$('.settle').click(function () {
  console.log(selected);
  if (selected) {
    if (selected.length) {
      alert('结算成功！\n商品 ' + $('.selecedNum').text() + '件     数量：' + $('.cartNum').text() + '    总价：' + $('.totalPrice').text())
    } else {
      alert('请选择商品!');
    }
  } else {
    alert('请选择商品!');
  }
});
