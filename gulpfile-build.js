// 加载模块
const load = require('gulp-load-plugins')();
const del = require('del');
const { task, src, dest, watch, series, parallel } = require('gulp');
// 删除dest文件
task('delDist', async () => {
  await del('./dist')
})
// 处理sass
task('sass', async () => {
  src('./src/style/**/*.*')
    .pipe(load.rev())
    .pipe(load.sass())
    .pipe(load.minifyCss())
    .pipe(dest('./dist/style'))
    .pipe(load.rev.manifest())
    .pipe(dest('./rev/css'))
})

// 处理 js
task('js', async () => {
  src('./src/js/**/*.js')
    .pipe(load.rev())
    .pipe(load.babel({
      presets: ['@babel/env']
    }))
    .pipe(load.uglify())
    .pipe(dest('./dist/js'))
    .pipe(load.rev.manifest())
    .pipe(dest('./rev/js'))
})
// 处理image
task('img', async () => {
  src('./src/img/**/*')
    .pipe(load.rev())
    .pipe(load.imageminChangba())
    .pipe(dest('./dist/img'))
    .pipe(load.rev.manifest())
    .pipe(dest('./rev/img'))
})

// 处理 html
task('html', async () => {
  setTimeout(() => {
    src(['./rev/**/*.json', './src/index.html'])
      .pipe(load.revCollector({ replaceReved: true }))
      // 执行数据
      .pipe(load.minifyHtml())
      .pipe(dest('./dist'))
  }, 3000);
})
// 处理views
task('views', async () => {
  src(['./rev/**/*.json', './src/views/**/*.html'])
    .pipe(load.revCollector({ replaceReved: true }))
    .pipe(load.minifyHtml())
    .pipe(dest('./dist/views'))
})
// 移动图标
task('ico', async () => {
  src('./src/favicon.ico')
    .pipe(dest('./dist'))
})

task('build', series('delDist', 'img', 'sass', 'js', 'ico', 'html', 'views'))