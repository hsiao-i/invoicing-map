<script setup>
const props = defineProps({
  singleCountyVotesData: {
    type: Object,
    required: true,
  },
});
/** 顯示顏色的寬度，依據不同政黨的% */
const barStyle = (party) => {
  const formatted = Math.round(props.singleCountyVotesData[`${party}PartyVotesPercentage`]);
  return formatted;
};
</script>
<template>
  <div class="flex items-center mb-2">
    <slot>
      <!-- <p class="w-1/5">{{ props.singleCountyVotesData.county }}</p> -->
    </slot>
    <div class="w-4/5 translate-y-2/4">
      <div class="flex h-2 mb-4 overflow-hidden text-xs bg-teal-200 rounded">
        <div
          :style="`width: ${barStyle('green')}%`"
          class="shadow-none flex flex-col text-center whitespace-nowrap
          text-white justify-center bg-green-500 border-r border-white"
        ></div>
        <div
          :style="`width: ${barStyle('blue')}%`"
          class="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-blue-500
          border-r border-white"
        ></div>
        <div
          :style="`width: ${barStyle('orange')}%`"
          class="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-orange-500 "
        ></div>
      </div>
    </div>
  </div>
</template>
