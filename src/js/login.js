import './jquery-3.4.1.js';
// 判断用户是否登录过
let isLogin = JSON.parse(localStorage.getItem('isLogin'));
if (isLogin) {
  if (isLogin.logined) {
    console.log(isLogin.logined);
    $("#login-name").val(isLogin.user);
    $("#login-pass").val(isLogin.pass);
  } else {
    alert('已登录 跳转中...')
    location.href = '../index.html';
  }
}
// 切换登录方式
$('#main .tit span').click(function () {
  $(this).addClass('active').siblings('span').removeClass('active');
  $('#main form').eq($(this).index()).css('display', 'block').siblings('form').css('display', 'none');
})
// 点击登录
$("#pass-login").click(function () {
  let user = $('#login-name').val().trim();
  let pass = $("#login-pass").val().trim();
  let acount = JSON.parse(localStorage.getItem('acount'));
  if (acount) {
    let flag = acount.find(item => {
      return (user === item[0] && pass === item[1]);
    })
    if (flag) {
      localStorage.setItem('isLogin', '{"logined": true, "user": "' + user + '" , "pass": "' + pass + '"}')
      $(this).text('登陆中...');
      setTimeout(() => {
        location.href = '../index.html';
      }, 1000);
    } else {
      alert('用户名或密码错误');
    }
  } else {
    alert('用户不存在，前往注册...');
    location.href = 'views/register.html';
  }
})