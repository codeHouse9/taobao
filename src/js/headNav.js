import "./jquery-3.4.1.js";
//地址
if (localStorage.getItem('address')) {
  $("#head .address_tit strong").text(localStorage.getItem('address'));
}

$("#head .address a").click(function () {
  $("#head .address_tit strong").text($(this).text());
  localStorage.setItem('address', $(this).text())
  location.reload();
})
// 退出登录
$(".user-info .tuichu").click(function () {
  let isLogin = JSON.parse(localStorage.getItem('isLogin'));
  isLogin.logined = "false";
  localStorage.setItem('isLogin', JSON.stringify(isLogin));
  $(".to-login").css('display', 'block');
  $('.isLogin .user').css('display', 'none');
  $(".home-user").text('游客');
})

// 判断用户是否已经登录过
let isLogin = JSON.parse(localStorage.getItem('isLogin'));
let acount = JSON.parse(localStorage.getItem('acount'));
if (isLogin) {
  if (isLogin.logined == true) {
    $(".to-login").css('display', 'none');
    $(".isLogin .user .user-name").text(isLogin.user);
    $('.isLogin .user').css('display', 'block');
  } else {
    $(".to-login").css('display', 'block');
    $('.isLogin .user').css('display', 'none');
  }
}
if (isLogin && acount) {
  // 更新购物车数据
  function changeNum(data) {
    let val = data.reduce((total, data) => {
      if (data.user === isLogin.user && data.pass === isLogin.pass) {
        if (data.shop) {
          data.shop.forEach(item => {
            total = total || 0;
            total += item.num;
          })
          data.total = total;
          localStorage.setItem('acount', JSON.stringify(acount));
          return total;
        }
      }
      return total;
    }, 0)
    return val;
  }
  $(".cartNum").text(changeNum(acount));
  window.addEventListener('storage', function (e) {
    let data = localStorage.getItem('acount', acount);
    data.forEach(item => {
      if (item.user === isLogin.user && item.pass === isLogin.pass) {
        $(".cartNum").text(parseInt(item.total) || 0);
      }
    })
  })
}