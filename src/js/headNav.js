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
})

// 判断用户是否已经登录过
let isLogin = JSON.parse(localStorage.getItem('isLogin'));
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