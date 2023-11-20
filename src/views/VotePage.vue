<script setup>
import { ref } from 'vue';

const firstPerson = ref('');
const secondPerson = ref('');
const thirdPerson = ref('');
const fourthPerson = ref('');

const names = ref([]);
// const names = ref(['于欣', '腦包', '汛鍼', '筱尹']);
const objCount = {
  0: 0,
  1: 0,
  2: 0,
  3: 0,
};
const randomArray = ref([]);
const isHidden = ref(true);
// let randomNum = 0;

const generateRandomNum = (min, max) => {
  const randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
  return randomNum;
};

// console.log(names.value);
const generateResult = () => {
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < 20; i++) {
    const num = generateRandomNum(0, 3);
    console.log(num);

    console.log(objCount);

    if (randomArray.value.length === 0) {
      const firstNum = generateRandomNum(1, 3);
      console.log(firstNum);
      randomArray.value.push(names.value[firstNum]);
      objCount[firstNum] = 1;
    }
    console.log(num);
    console.log(objCount[num]);
    if (objCount[num] === 0) {
      console.log(num);
      console.log(randomArray.value.length);
      if (names.value[randomArray.value.length] !== names.value[num]) {
        console.log(names.value[num]);
        randomArray.value.push(names.value[num]);
        objCount[num] = 1;
      }
    } else {
      objCount[num] += 1;
    }

    console.log(randomArray.value);
    if (randomArray.value.length === 4) {
      return;
    }
  }
};

const verify = () => {
  console.log('check');
  if (randomArray.value.length !== 4) generateResult();

  for (let i = 0; i < names.value.length; i += 1) {
    if (names.value[i] === randomArray.value[i]) {
      generateResult();
      return;
    }
  }
};

const click = () => {
  isHidden.value = false;
  names.value = [firstPerson.value, secondPerson.value, thirdPerson.value, fourthPerson.value];
  console.log(names.value);

  generateResult();
  if (randomArray.value.length !== 4) {
    generateResult();
  }
  verify();
  setTimeout(() => {
    isHidden.value = true;
  }, 1000);
};

// click();

</script>

<template>
  <div class="p-3">
    <div class="fixed top-0 left-0 w-screen h-screen" :class="{ 'hidden': isHidden }">
      <div class="absolute top-0 left-0 w-full h-full bg-black/60 flex justify-center items-center">
        <div class=" rounded-lg z-10 w-1/2 text-gray-500
        p-10 text-lg w-full max-w-sm bg-gray-100  items-center border border-8 border-red-300 ">
        <p class="text-center text-red-300 text-xl">抽選中</p>
        <span class="loader"></span>
      </div>
      </div>
    </div>
    <h2 class="text-center mb-3  text-xl font-bold text-white">交換禮物 🎀</h2>
    <div class="pb-12 border-b-2 border-white">

      <div class="flex justify-center">

        <ol class="list-decimal w-1/2 text-gray-500">
          <li class="mb-3 ">
            <input type="text" class=" h-10 rounded-lg bg-gray-50 ml-3 w-full p-3 shadow"
            v-model="firstPerson">
          </li>
          <li class="mb-3">
            <input type="text" class=" h-10 rounded-lg bg-gray-50 ml-3 w-full p-3 shadow"
            v-model="secondPerson">

          </li>
          <li class="mb-3">
            <input type="text" class=" h-10 rounded-lg bg-gray-50 ml-3 w-full p-3 shadow"
            v-model="thirdPerson">
          </li>
          <li class="mb-5">
            <input type="text" class="h-10 rounded-lg bg-gray-50 ml-3 w-full p-3 shadow"
            v-model="fourthPerson"
            >
          </li>
        </ol>
      </div>
      <div class="text-center">

        <button type="button" class="rounded-full bg-red-300
        w-1/2 h-10 text-lg font-semibold text-white hover:bg-red-400" @click="click">抽抽</button>
      </div>
    </div>

    <div class="mt-12" v-if="randomArray.length !== 0" :class="{ 'hidden': !isHidden}">
      <h2 class="text-center mb-3  text-xl font-bold text-gray-500">結果🙋‍♀️</h2>
      <div class="text-gray-500 mt-10 flex justify-center text-center">
        <p class="text-base text-xl w-1/4"
        v-for="(name, i) in names" :key="`${name}+${i}`">{{ name }}</p>
      </div>
      <div class="text-gray-500 mt-10 flex justify-center ">
        <div class=" mx-auto">

          <img src="../assets/images/arrow.svg" alt="箭頭" class="fill-gray-100">
        </div>
        <div class="mx-auto">

          <img src="../assets/images/arrow.svg" alt="箭頭">
        </div>
        <div class="mx-auto">

          <img src="../assets/images/arrow.svg" alt="箭頭">
        </div>
        <div class="mx-auto">

          <img src="../assets/images/arrow.svg" alt="箭頭">
        </div>

      </div>

      <div class="text-gray-500 mt-10 flex justify-center text-center">
        <template v-if="randomArray.length !== 0">

          <p class="text-base text-xl w-1/4"
          v-for="(result, i) in randomArray" :key="`${result}+${i}`">{{ result }}</p>
        </template>
      </div>
    </div>

  </div>
</template>

<style scope>
body {
  background: linear-gradient(to bottom, #d9a7c7, #fffcdc);
}

.loader {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  display: block;
  margin:15px auto;
  position: relative;
  background: #FFF;
  box-shadow: -24px 0 #FFF, 24px 0 #FFF;
  box-sizing: border-box;
  animation: shadowPulse 2s linear infinite;
}

@keyframes shadowPulse {
  33% {
    background: #FFF;
    box-shadow: -24px 0 rgb(254 205 211), 24px 0 #FFF;
  }
  66% {
    background: rgb(254 205 211);
    box-shadow: -24px 0 #FFF, 24px 0 #FFF;
  }
  100% {
    background: #FFF;
    box-shadow: -24px 0 #FFF, 24px 0 rgb(254 205 211);
  }
}
</style>
