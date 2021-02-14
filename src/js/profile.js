import './headNav.js';
let href = location.href;
let goodsId = href.slice(href.indexOf('goodsId'));
goodsId = goodsId.slice(goodsId.indexOf('=') + 1) - 1;
// 根据goodsId请求数据
$.ajax({
  url: '../data/goods.json',
  method: 'get',
  success(data) {
    let profileStr = '';
    profileStr += `
      <a href="./detail.html?pid=${data[goodsId].pId}" class="profile-info-img">
        <img src="${data[goodsId].img}" alt="">
      </a>
      <div class="desc">
        <a href="./detail.html?pid=${data[goodsId].pId}">
          <h5>${data[goodsId].title}</h5>
        </a>
        <strong>${data[goodsId].pRecom}</strong>
        <p>${data[goodsId].PDesc}</p>
        <a href="./detail.html?pid=${data[goodsId].pId}" class="btn">
          <span class="price">￥${data[goodsId].price}</span>
          <span class="look">查看宝贝 > </span>
        </a>
        <span class="iconfont like ${data[goodsId].love.iconfont}">${data[goodsId].love.peopleNum + data[goodsId].love.say}</span>
    </div>
    `;
    $('.profile-info').html(profileStr);
    $(this).css('display', 'block');
    $(".profile-info").ready(function () {
      $(this).css('display', 'block');
    })
    // 渲染推荐
    profileStr = '';
    for (let i = 0, len = data[goodsId].plike.length; i < len; i++) {
      profileStr += `
      <a href="./detail.html?pid=${data[goodsId].plike[i].pId}">
        <img src="${data[goodsId].plike[i].img}" alt="">
        <h5>${data[goodsId].plike[i].title}</h5>
         <p>"${data[goodsId].plike[i].desc}</p>
        <div>
          <span>${data[goodsId].plike[i].price}</span>
          <strong>${data[goodsId].plike[i].say}</strong>
        </div>
      </a>
    `;
      profileStr += profileStr;
    }
    $(".profile-like-cont").html(profileStr);
  }
})