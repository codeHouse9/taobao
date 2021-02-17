import './jquery-3.4.1.js';
import './headNav.js';
// 获取参数
let search = location.search.slice(location.search.indexOf('#'))
console.log(search);
// 请求数据
$.ajax({
  url: '../data/profile2.json',
  method: 'get',
  success(data) {
    // 渲染搜索下的推荐数据
    let listStr = '';
    for (let i = 0; i < 11; i++) {
      listStr += `
        <a href="./profile2.html?id=${i}">${data.list[i]}</a>
      `;
    }
    $(".serach-list").html(listStr);
    $('.maybe-as').html(listStr);
    // 列表数据
    listStr = '';
    data = data.recom[search];
    $('.to-search').val(data.info);
    for (let i = 0, len = data.cont.length; i < len; i++) {
      listStr += `
      <li>
        <a href="./detail.html?pid=${data.cont[i].pid}">
          <img src="${data.cont[i].img}" alt="">
          <div class="profile2-cont">
            <p class="price">￥${data.cont[i].price}<span>包邮</span></p>
            <h5>${data.cont[i].tit}</h5>
            <p class="sell">
              <span>${data.cont[i].shop}</span>
              <i>${data.cont[i].people}人付款</i>
            </p>
            <div class="logo">
              <span class="logo1"></span>
              <span class="logo2" style="display:${data.cont[i].isShow ? ' inline-block;' : 'none'}"></span>
              <div class="pf">如实描述：${data.cont[i].descPf} <i class="iconfont change-ico icon-xiajiantou"></i>
                <div class="pf-dask">
                  <p>服务态度：${data.cont[i].serverPf}</p>
                  <p>发货速度：${data.cont[i].suduPf}</p>
                </div>
              </div>
            </div>
          </div>
        </a>
      </li>
      `;
      listStr += listStr;
    }
    $('.profile2-recom').html(listStr);
  }
})
// 是否固定头部
window.onscroll = function () {
  if (this.scrollY >= 200) {
    $(".profile2-head-cont").css('margin-top', '15px');
    $(".serach-list").css('visibility', 'hidden');
    $('.profile2-head').css({
      position: 'fixed',
      top: '0px',
      height: '90px'
    })
  } else {
    $(".profile2-head-cont").css('margin-top', '0px');
    $(".serach-list").css('visibility', 'visible');
    $('.profile2-head').css({
      position: 'relative',
      top: '35px',
      height: '107px'
    })

  }
}