<template>
  <footer class="bg-black py-5 px-3 ">
    <div class="container flex justify-between md:flex-row flex-col">
      <div class="mb-3 md:mb-0">
        <RouterLink to="/voteMap" class="flex items-center ">
          <p class="text-white">開票地圖</p>
          <img src="../assets/images/redArrowBtn.png" alt="進入開票地圖箭頭" width="100">
        </RouterLink>

      </div>
      <p class="text-white text-sm">此專案僅作為作品集使用，採用
        <a href="https://2023.thef2e.com/users/12061579704049918951" target="_blank" class="text-blue-400">樹懶設計</a> 設計稿，並參考
        <a href="https://web.cw.com.tw/2020-taiwan-presidential-election/" target="_blank" class="text-blue-400">天下雜誌 2020 開票地圖</a>
      </p>
    </div>
  </footer>
</template>
