import './headNav.js';
(function () {
  let acount = JSON.parse(localStorage.getItem('acount'));
  $('.mfzc').click(function (e) {
    return false;
  })
  $(".isLogin .qdl").click(function () {
    location.href = './login.html';
    return false;
  })
  $('#reg-main .reg-enter').click(function () {
    let user = $('#reg-main #user').val().trim()
    let pass = $("#reg-main #pass").val().trim();
    if (!(user && pass)) {
      alert('请输入完整');
      return
    }
    if (acount) {
      let flag = acount.find(item => {
        return user === item[0];
      })
      if (flag) {
        alert('用户已存在，请重新输入')
        return;
      }
      else {
        acount.push([user, pass, '../../img/home/b1.jpg']);
        localStorage.setItem('acount', JSON.stringify(acount));
        alert('注册成功！点击跳转至登录');
        location.href = 'login.html';
      }
    } else {
      acount = [];
      acount.push([user, pass]);
      localStorage.setItem('acount', JSON.stringify(acount));
      alert('注册成功！点击跳转至登录');
      location.href = 'login.html';
    }
  })
})();