// 判断用户执行的gulp命令是什么
const argv = process.argv[2];
// 根据命令，执行不同的文件
switch (argv) {
  case 'start':
    require('./gulpfile-dev.js')
    break;
  case 'build':
    require('./gulpfile-build.js')
    break;
  default:
    break;
}

