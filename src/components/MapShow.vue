<script setup>
import { onMounted, inject, ref } from 'vue';
import * as d3 from 'd3';
import * as topojson from 'topojson-client';

const props = defineProps({
  countyVotesData: {
    type: Array,
    required: true,
  },
});

const toThousands = inject('toThousands');

const screenWidth = ref(window.innerWidth);

const height = 1200;
const width = 1200;

/** 繪製台灣地圖 */
const drawTaiwanCounty = () => {
  const projection = d3.geoMercator()
    .center([123, 24])
    .scale(5000);

  const path = d3.geoPath(projection);

  const mapSvg = d3.select('svg.map');

  // 加上 tooltip
  const tooltipDiv = d3.select('#mapTooltipDiv')
    .attr('class', 'absolute w-full')
    .append('div')
    .attr('id', 'tooltip')
    .attr('style', 'position:relative; opacity:0;');

  const colorScales = {
    orange: d3.scaleLinear()
      .domain([40, 50.33, 66.66])
      .range(['#fdba74', '#fb923c', '#f97316']),

    blue: d3.scaleLinear()
      .domain([40, 50.33, 66.66])
      .range(['#bfdbfe', '#60a5fa', '#3b82f6']),

    green: d3.scaleLinear()
      .domain([40, 50.33, 66.66])
      .range(['#6ee7b7', '#4ade80', '#16a34a']),
  };

  // 顯示地圖上縣市
  d3.json('/jsonData/taiwanCounty_topojson.json').then((data) => {
    const geometries = topojson.feature(data, data.objects.COUNTY_MOI_1090820);

    const mapOfCounty = mapSvg
      .append('g')
      .selectAll('path')
      .data(geometries.features)
      .join('path')
      .attr('fill', '#69b3a2')
      .attr('d', path)
      .style('stroke', '#fff')
      .style('stroke-width', 0.5)
      .attr('county-name', (d) => d.properties.COUNTYNAME)
      .style('fill', (d) => {
        const countyVoteInfo = props.countyVotesData.find((county) => county.county === d.properties.COUNTYNAME);

        if (countyVoteInfo.greenPartyVotesPercentage
        > countyVoteInfo.bluePartyVotesPercentage && countyVoteInfo.orangePartyVotesPercentage) {
          return colorScales.green(countyVoteInfo.greenPartyVotesPercentage);
        } if (countyVoteInfo.bluePartyVotesPercentage > countyVoteInfo.orangePartyVotesPercentage) {
          return colorScales.blue(countyVoteInfo.bluePartyVotesPercentage);
        }
        return colorScales.orange(countyVoteInfo.orangePartyVotesPercentage);
      });

    // 調整金門馬祖位置
    d3.select('path[county-name="金門縣"]').style(
      'transform',
      'translate(35%, 8%)',
    );
    d3.select('path[county-name="連江縣"]').style(
      'transform',
      'translate(-11%, 38%)',
    );

    mapOfCounty
      .on('mouseover', (e, d) => {
        const hoverCounty = d.properties.COUNTYNAME;
        const hoverCountyVotesInfo = props.countyVotesData.find((county) => county.county === hoverCounty);

        /** tooltip 顯示的 html 內容 */
        const votesInfoTooltip = `<div class="w-1/2 md:w-1/3 bg-white z-10"><p class="text-center py-2 border-b-2 border-black">${hoverCountyVotesInfo.county}</p>
        <div class="p-3">
          <div class="w-full translate-y-2/4 relative">
              <div
                class="flex h-6 mb-4 overflow-hidden text-xs bg-teal-200 rounded-full"
              >
                <div
                  style="width: ${Number(hoverCountyVotesInfo.greenPartyVotesPercentage).toFixed(1)}%"
                  class="shadow-none flex flex-col text-center whitespace-nowrap
                    justify-center bg-green-500 text-white "
                >
                  <p class="cursor-default">

                    ${(hoverCountyVotesInfo.greenPartyVotesPercentage).toFixed(1)}%
                  </p>
                </div>
                <div
                  style="width: ${Number(hoverCountyVotesInfo.bluePartyVotesPercentage).toFixed(1)}%"
                  class="shadow-none flex flex-col text-center whitespace-nowrap text-white
                  justify-center bg-blue-500"
                >
                  <p class="cursor-default">

                    ${(hoverCountyVotesInfo.bluePartyVotesPercentage).toFixed(1)}%
                  </p>
                </div>
                <div
                  style="width: ${Number(hoverCountyVotesInfo.orangePartyVotesPercentage).toFixed(1)}%"
                  class="shadow-none flex flex-col text-center whitespace-nowrap
                  text-white justify-center bg-orange-500 text-white"
                >
                <p class="cursor-default">

                  ${(hoverCountyVotesInfo.orangePartyVotesPercentage).toFixed(1)} %
                </p>
                </div>
              </div>
           
          </div>
          <ul v-if="hoverCountyVotesInfo" class="mt-7">
            <li class="flex justify-between items-center py-1">
              <div class="w-2/12 md:block hidden">
                <img src="src/assets/images/greenCirclePortrait.png" alt="蔡英文圓形肖像" width="42"/>
              </div>
              <p class="w-5/12 ml-1 text-center">蔡英文<br />得票數</p>
              <p class="w-5/12 text-end text-green-500">
                ${toThousands(hoverCountyVotesInfo.greenPartyVotesNum)}
              </p>
            </li>
            <li class="flex justify-between items-center py-1">
              <div class="w-2/12 md:block hidden">
                <img src="src/assets/images/blueCirclePortrait.png" alt="韓國瑜圓形肖像" width="42" />
              </div>
              <p class="w-5/12 ml-1 text-center">韓國瑜<br />得票數</p>
              <p class="w-5/12 text-end text-blue-500">
                ${toThousands(hoverCountyVotesInfo.bluePartyVotesNum)}
              </p>
            </li>
            <li class="flex justify-between items-center py-1">
              <div class="w-2/12 md:block hidden">
                <img src="src/assets/images/orangeCirclePortrait.png" alt="宋楚瑜圓形肖像" width="42"/>
              </div>
              <p class="w-5/12 ml-1 text-center">宋楚瑜<br />得票數</p>
              <p class="w-5/12 text-end text-orange-500">
                ${toThousands(hoverCountyVotesInfo.orangePartyVotesNum)}
              </p>
            </li>

          </ul>
        </div></div>`;
        tooltipDiv
          .style('opacity', 1)
          .html(votesInfoTooltip)
          .style('fill', 'black');
      });

    // 調整 tooltip 位置
    function updateTooltipPosition() {
      if (screenWidth.value < 768) {
        tooltipDiv.style('left', '46.5%');
      } else {
        tooltipDiv.style('left', '64.5%');
      }
    }
    mapOfCounty
      .on('mouseenter', function () {
        // 將 tooltip 固定在右側 (還需監聽螢幕寬度)
        tooltipDiv.style('top', '-299px');
        updateTooltipPosition();

        window.addEventListener('resize', () => {
          screenWidth.value = window.innerWidth;
          updateTooltipPosition();
        });

        d3.select(this)
          .raise()
          .style('stroke', 'black');
      })
      .on('mouseleave', function () {
        // 將 stroke 顏色還原為白色
        d3.select(this)
          .style('stroke', 'white');

        // 將選中的元素移回到最底層
        d3.select(this)
          .lower();
      });

    function zoomed() {
      mapSvg.attr('transform', d3.zoomTransform(this).toString());
    }
    const zoom = d3.zoom().scaleExtent([1, 6]).on('zoom', zoomed);
    mapSvg.call(zoom);

    function clicked(event, d) {
      const [[x0, y0], [x1, y1]] = d3.geoPath().bounds(d);
      event.stopPropagation();

      const [targetX, targetY] = d3.pointer(event, mapSvg.node());

      mapSvg.transition().duration(750).call(
        zoom.transform,
        d3.zoomIdentity
          .translate(targetX, targetY)
          .scale(Math.min(6.5, 0.9 / Math.max((x1 - x0) / width, (y1 - y0) / height)))

          .translate(-targetX + 300, -targetY + 250),
      );
    }

    mapOfCounty.on('click', clicked);

    function reset() {
      mapSvg.transition().duration(750).call(
        zoom.transform,
        d3.zoomIdentity,
        d3.zoomTransform(mapSvg.node()).invert([width / 2, height / 2]),
      );
    }
    mapSvg.on('click', reset);
  });

  // 顯示地圖上鄉里
  d3.json('/jsonData/taiwanTown_topojson.json').then((data) => {
    const geometries = topojson.feature(data, data.objects.TOWN_MOI_1120825);
    mapSvg
      .append('g')
      .selectAll('path')
      .data(geometries.features)
      .join('path')
      .attr('fill', '#69b3a2')
      .attr('d', path)
      .style('stroke', '#d9d9d9')
      .attr('town-name', (d) => d.properties.TOWNNAME)
      .attr('county-of-town', (d) => d.properties.COUNTYNAME)
      .style('display', 'none');
  });
};

onMounted(() => {
  drawTaiwanCounty();
});
</script>

<template>

  <div class="overflow-hidden relative">
    <div class="absolute top-3 left-3 z-10">
      <button type="button" >

        <span class="material-icons-outlined " style="font-size: 30px;">
          arrow_back
        </span>
      </button>
    </div>

    <svg width="100%" height="80vh" viewBox="170 110 300 350" class="map">
    </svg>
    <div id="mapTooltipDiv" ></div>
    <div class="absolute top-3 right-3">
      <p class="text-sm text-end">民進黨</p>
      <div class="flex mb-3">
        <div class="w-6 h-6 bg-green-400"></div>
        <div class="w-6 h-6 bg-green-500"></div>
        <div class="w-6 h-6 bg-green-600"></div>
      </div>
      <p class="text-sm text-end">國民黨</p>
      <div class="flex mb-3">
        <div class="w-6 h-6 bg-blue-400"></div>
        <div class="w-6 h-6 bg-blue-500"></div>
        <div class="w-6 h-6 bg-blue-600"></div>
      </div>
      <p class="text-sm text-end">親民黨</p>
      <div class="flex">
        <div class="w-6 h-5 bg-orange-300 text-[10px] text-white flex items-center">40%</div>
        <div class="w-6 h-5 bg-orange-400"></div>
        <div class="w-6 h-5 bg-orange-500 text-[10px] text-white flex items-center">70%</div>
      </div>
    </div>
  </div>
</template>
<style scope>
  .custom_tooltip {
    position: absolute;
    text-align: left;
    width: max-content;
    padding: 10px;
    font: 10px;
    background: #f0eeeb;
    color: dimgray;
    border: 1px solid dimgray;
    border-radius: 3px;
    pointer-events: none;
  }
</style>
