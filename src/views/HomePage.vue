<script setup>
</script>
<template>
  <!-- <div class="red-block -z-50">

  </div> -->
  <div class="container mx-auto z-10">
    <div class="sm:min-h-[85vh] min-h-[79vh] flex md:flex-row flex-col items-center justify-center">
      <div class="px-3">
        <img src="../assets/images/electionLogo.png" alt="開票地圖logo" class="mb-5">
      </div>
      <div class="px-3">
        <img src="../assets/images/candidates.png" alt="總統候選人們" >
      </div>
    </div>
  </div>
</template>

<style scope lang="scss">
body {
      overflow-x: hidden; /* 隐藏横向滚动条 */
    }

    .triangle-bg {
      position: relative;
      /* background-color: #4CAF50;  */
      /* 背景颜色 */
      height: 82vh; /* 100% 视口高度 */
    }

    /* Right triangle with longer base */
    .triangle-bg::before {
      content: '';
      position: absolute;
      top: 3vh;
      right: 0;
      width: 0;
      height: 0;
      border-style: solid;
      border-width: 0 100vw 79.5vh 0 ; /* 左上右下，底边长度是斜边的两倍 */
      background-color: #E72F00;
      border-color: transparent #fff transparent  transparent ; /* 透明透明透明白色 */
    }
    .red-block {
      width: 118vh;
      height: 83vh;
      background-image: url(../assets/images/redBlock.png); //換成自己的圖片
      background-repeat: no-repeat;
      background-size: 100% auto;
      background-position: center;
    }
</style>
