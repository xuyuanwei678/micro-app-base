// rem等比适配配置文件
// 基准大小
// baseSize = 16 （fontSize = 16）
// 设置 rem 函数
function setRem() {
    // 当前页面宽度相对于 1920宽的缩放比例，可根据自己需要修改。
    const scale = document.documentElement.clientWidth / 1920; //当前设计稿为1920  如果是750则 替换为 750
    // 设置页面根节点字体大小（“Math.min(scale, 2)” 指最高放大比例为2，可根据实际业务需求调整）
    document.documentElement.style.fontSize = 100 * Math.min(scale, 2) + 'px';
  }
  // 初始化
  setRem();
  // 改变窗口大小时重新设置 rem
  window.onresize = function () {
    setRem();
    // window.location.reload();
  };