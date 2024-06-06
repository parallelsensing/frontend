<template>
  <div id="smartTown">这是智能雷达产品说明</div>
  <div id="jumpto_manage">
    <button
      @click = "jumpto_product"
      class="btn btn-default btn-sm"
      onmouseenter="this.style.borderColor='#ffffff'; this.style.backgroundColor='#ffffff'; this.style.color='#000000';"
      onmouseleave="this.style.backgroundColor='transparent'; this.style.borderColor='#ffffff'; this.style.color='#000000';"
    >跳转至管理页面
    </button>
  </div>
</template>

<script setup name="smartTown">
function jumpto_product(){
  const returnUrl = window.location.href;
  window.location.href = 'https://www.parallelsensing.com/' ;
}

</script>

