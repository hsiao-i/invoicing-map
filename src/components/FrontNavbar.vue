<template>
  <div class="border-b-2 border-black">
    <div class="container mx-auto px-3">
      <div class="flex justify-between py-5">
        <h1>
          <RouterLink to="/">
            <img src="../assets/images/electionLogo.png" alt="2020總統大選開票地圖" width="300">
          </RouterLink>
        </h1>
        <nav>
          <!-- <RouterLink to="/">Home</RouterLink> -->
          <RouterLink to="/voteMap">開票地圖</RouterLink>
        </nav>
      </div>
    </div>
  </div>
</template>
