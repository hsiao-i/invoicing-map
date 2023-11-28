<script setup>
import {
  onMounted, ref, computed, provide,
} from 'vue';
import axios from 'axios';
import Swal from 'sweetalert2';
import MapShow from '../components/MapShow.vue';
import ProgressPercentage from '../components/ProgressPercentage.vue';

/**
 * @typedef {Object} CountyData
 * @property {string} county - 縣市名稱
 * @property {number} orangePartyVotes - 親民黨的票數
 * @property {number} bluePartyVotes - 國民黨的票數
 * @property {number} greenPartyVotes - 民進黨的票數
 * @property {number} orangePartyVotesPercentage - 親民黨的票數百分比
 * @property {number} bluePartyVotesPercentage - 國民黨的票數百分比
 * @property {number} greenPartyVotesPercentage - 民進黨的票數百分比
 */
/** 縣市投票資料
 * @type {Array<CountyData>} CountyVotes
 */
const countyVotesData = ref([]);

const allCountyData = ref([]);

const getAllCounty = async () => {
  try {
    const res = await axios.get('/jsonData/AllCountyData.json');
    allCountyData.value = res.data;
  } catch {
    Swal.fire({ text: '縣市列表資料載入失敗', icon: 'error' });
  }
};

onMounted(() => {
  getAllCounty();
});

/** 取得選舉得票數資料 */
const getCountyVotes = async () => {
  try {
    const res = await axios.get('jsonData/votingResult.json');
    countyVotesData.value = res.data;
  } catch {
    Swal.fire({ text: '選舉票數資料載入失敗', icon: 'error' });
  }
};

onMounted(() => {
  getCountyVotes();
});

/** 整數轉為千分位 */
const toThousands = (num) => {
  const numStr = num.toString();
  const pattern = /(\d)(?=(?:\d{3})+(?!\d))/g;
  return numStr.replace(pattern, '$1,');
};

provide('toThousands', toThousands);

/** 格式化選舉資料，數字加千分位、小數點後兩位 */
const formattedCountyVotesData = computed(() => {
  const formattedData = countyVotesData.value.map((county) => ({
    county: county.county,
    orangePartyVotesNum: toThousands(county.orangePartyVotesNum),
    bluePartyVotesNum: toThousands(county.bluePartyVotesNum),
    greenPartyVotesNum: toThousands(county.greenPartyVotesNum),
    orangePartyVotesPercentage: county.orangePartyVotesPercentage.toFixed(1),
    bluePartyVotesPercentage: county.bluePartyVotesPercentage.toFixed(1),
    greenPartyVotesPercentage: county.greenPartyVotesPercentage.toFixed(1),
  }));
  return formattedData;
});

const nationWorldVotesData = computed(() => formattedCountyVotesData.value.find((county) => county.county === '全國'));

</script>
<template>
  <div class="container mx-auto px-3 py-10" id="check-2">
    <div class="flex flex-col md:flex-row gap-3">
      <div class="w-full md:w-1/3">
        <div class="border-2 border-black">
          <p class="text-center py-2 border-b-2 border-black">全台</p>
          <div class="p-5 border-b-2 border-black">
            <div class="w-full translate-y-2/4 relative">
              <template v-if="nationWorldVotesData">

                <div
                  class="flex h-6 mb-4 overflow-hidden text-xs bg-teal-200 rounded-full "
                >
                  <div
                    :style="`width: ${nationWorldVotesData.greenPartyVotesPercentage}%`"
                    class="shadow-none flex flex-col text-center whitespace-nowrap
                    justify-center bg-green-500 text-white "
                  >
                    <p class="cursor-default">

                      {{ nationWorldVotesData.greenPartyVotesPercentage }}%
                    </p>
                  </div>
                  <div
                    :style="`width: ${nationWorldVotesData.bluePartyVotesPercentage}%`"
                    class="shadow-none flex flex-col text-center whitespace-nowrap text-white
                    justify-center bg-blue-500"
                  >
                    <p class="cursor-default">

                      {{ nationWorldVotesData.bluePartyVotesPercentage }}%
                    </p>
                  </div>
                  <div
                    :style="`width: ${nationWorldVotesData.orangePartyVotesPercentage}%`"
                    class="shadow-none flex flex-col text-center whitespace-nowrap
                    text-white justify-center bg-orange-500"
                  >
                  <p class="cursor-default">
                    {{ nationWorldVotesData.orangePartyVotesPercentage }}%
                  </p>
                  </div>
                </div>
              </template>
            </div>
            <ul v-if="nationWorldVotesData" class="mt-7">
              <li class="flex justify-between items-center py-1">
                <div class="w-2/12">
                  <img src="../assets/images/greenCirclePortrait.png" alt="蔡英文圓形肖像" width="42"/>
                </div>
                <p class="w-5/12">蔡英文得票數</p>
                <p class="w-5/12 text-end text-green-500">
                  {{ nationWorldVotesData.greenPartyVotesNum }}
                </p>
              </li>
              <li class="flex justify-between items-center py-1">
                <div class="w-2/12">
                  <img src="../assets/images/blueCirclePortrait.png" alt="蔡英文圓形肖像" width="42"/>
                </div>
                <p class="w-5/12">韓國瑜得票數</p>
                <p class="w-5/12 text-end text-blue-500">
                  {{ nationWorldVotesData.bluePartyVotesNum }}
                </p>
              </li>
              <li class="flex justify-between items-center py-1">
                <div class="w-2/12">
                  <img src="../assets/images/orangeCirclePortrait.png" alt="蔡英文圓形肖像" width="42"/>
                </div>
                <p class="w-5/12">宋楚瑜得票數</p>
                <p class="w-5/12 text-end text-orange-500">
                  {{ nationWorldVotesData.orangePartyVotesNum }}
                </p>
              </li>

            </ul>
          </div>
          <div>
            <div class="flex text-gray-400 py-2">
              <p class="w-1/5 text-center">縣市</p>
              <p class="w-4/5 text-center">得票占比</p>
            </div>
            <div class="overflow-auto">
              <div class="h-[43vh] p-3">
                <ProgressPercentage
                  v-for="item in countyVotesData"
                  :key="item.county"
                  :singleCountyVotesData="item"
                >
                  <p class="w-1/5">{{ item.county }}</p>
                </ProgressPercentage>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="w-full md:w-2/3">
        <div class="bg-gray-100">
          <p class="text-center py-2 text-gray-500">滑鼠移入縣市可觀看詳細票數和比例</p>
          <MapShow :countyVotesData="countyVotesData"
          ></MapShow>
        </div>
      </div>
    </div>
  </div>
</template>
<style scope>
body {
  background-color: #fff;
}
</style>
