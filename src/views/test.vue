<template>
  <div class="trapezoid-container">
    <div class="mydemo">这是一行文字呢菜单树</div>

    <svg xmlns="http://www.w3.org/2000/svg" viewBox="20 -2 453.4 53.6">
	<path d="M 43 10 Q 36 21 31 29 L 22 43 Q 20 46 22 49 Q 23.6736 50.5 28.2261 50.5 L 458.774 50.5 Q 467 51 469 49 Q 472 47 472.375 41.0253 L 472 4 Q 472 3 471 1 Q 470 0 467 -1 L 51 0 Q 48 1 47 4 Z Z" stroke="#000000" stroke-width="1" fill="none"/>
</svg>

  </div>
</template>

<style scoped lang="scss">
.cls-1 {
  fill: none;
  stroke: #040000;
  stroke-miterlimit: 10;
  stroke-width: 1.7px;
}

.trapezoid-container {
  width: 840px;
  height: 60px;
  position: relative;
  top: 300px;
  left: 500px;

  svg {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  .mydemo {
    color: red;
    width: 100%;
    height: 100%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.5em; // 调整文字大小
    font-weight: bold; // 调整文字粗细
  }
}</style>