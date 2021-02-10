// 加载模块 注意调用这个函数得到一个对象
const load = require('gulp-load-plugins')();
const del = require('del');
// 解构gulp
const { task, src, dest, watch, series, parallel } = require('gulp');

// 开启任务

// 删除dist文件
task('delDist', async () => {
  await del('./dist')
})

// 移动style
// task('style', async () => {
//.pipe(load.sass())
//   src('./src/style/**/*.scss')
// })
task('concatCss', async () => {
  src('./src/style/**/*.*')
    .pipe(load.sass())
    .pipe(dest('./dist/style'))
    .pipe(load.connect.reload())

})

// 移动js
task('js', async () => {
  src('./src/js/**/*.js')
    .pipe(dest('./dist/js'))
    .pipe(load.connect.reload())
})

// 移动img
task('img', async () => {
  src('./src/img/**/*.*')
    .pipe(dest('./dist/img'))
    .pipe(load.connect.reload())
})

// 移动html
task('html', async () => {
  src('./src/index.html')
    .pipe(load.fileInclude())
    .pipe(dest('./dist'))
    .pipe(load.connect.reload())

})

task('views', async () => {
  src('./src/views/**/*.html')
    .pipe(load.fileInclude())
    .pipe(dest('./dist/views'))
    .pipe(load.connect.reload())
})
// 移动图标
task('ico', async () => {
  src('./src/favicon.ico')
    .pipe(dest('./dist'))
})

// 移动数据
task('data', async () => {
  src('./src/data/**/*.json')
    .pipe(dest('./dist/data'))
    .pipe(load.connect.reload())
})
// 监听文件变换
task('watch', async () => {
  watch('./src/style/**/*.scss', series('concatCss'))
  watch('./src/js/**/*.js', series('js'))
  watch('./src/img/**/*.*', series('img'))
  watch('./src/index.html', series('html'))
  watch('./src/views/**/*.html', series('views', 'html'))
  watch('./src/data/**/*.json', series('data'))
})

// 开启服务
task('server', async () => {
  load.connect.server({
    root: './dist',
    port: 3000,
    livereload: true
  })
})

// 合并任务
task('start', series('delDist', 'img', 'data', 'concatCss', 'html', 'ico', 'views', 'js', 'server', 'watch'));
