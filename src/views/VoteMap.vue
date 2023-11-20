<script setup>
// import axios from 'axios';
import { onMounted } from 'vue';
import * as d3 from 'd3';
import * as topojson from 'topojson-client';

// const taiwanCountyData = ref([]);
// const getTaiwanCounty = async () => {
//   try {
//     const res = await axios.get('src/jsonData/taiwanCounty_topojson.json');
//     taiwanCountyData.value = res.data;
//     console.log(taiwanCountyData.value);
//   } catch (err) {
//     console.log(err);
//   }
// };
// const mapSvg = d3.select('svg.map');

// const zoomed = function () {
//   const mapSvg = d3.select('svg.map');
//   mapSvg.attr('transform', d3.zoomTransform(this));
// };

// const zoom = () => {
//   d3.zoom()
//     .scaleExtent([1, 10]) // 可放大倍率
//     .on('zoom', zoomed);
// };

/** 地圖縮放 */
// const zoomMap = (mapSvg) => {
//   const zoomed = function () {
//     mapSvg.attr('transform', d3.zoomTransform(this));
//   };

//   const zoom = d3.zoom()
//     .scaleExtent([1, 6])
//     .on('zoom', zoomed);

//   mapSvg.call(zoom);
// };
const height = 500;
const width = 500;

/** 繪製台灣地圖 */
const drawTaiwanCounty = () => {
  const projection = d3.geoMercator()
    .center([123, 24])
    .scale(5000);
    // .translate([width / 2, height / 2]);

  const path = d3.geoPath(projection);

  const mapSvg = d3.select('svg.map');

  // function zoomed() {
  //   // const mapSvg = d3.select('svg.map');
  //   mapSvg.attr('transform', d3.zoomTransform(this));
  // }

  // // const zoom = () => {
  // function zoom() {
  //   d3.zoom()
  //     .scaleExtent([1, 10]) // 可放大倍率
  //     .on('zoom', zoomed);
  // }

  // function clicked(event, d) {
  //   const [[x0, y0], [x1, y1]] = d3.geoPath().bounds(d);
  //   event.stopPropagation();
  //   mapSvg.selectAll('path').transition().style('fill', null);
  //   d3.select(this).transition().style('fill', 'pink');
  //   mapSvg.transition().duration(750).call(
  //     zoom.transform,
  //     d3.zoomIdentity
  //       .translate(width / 2, height / 2)
  //       .scale(Math.min(8, 0.9 / Math.max((x1 - x0) / width, (y1 - y0) / height)))
  //       .translate(-(x0 + x1) / 2, -(y0 + y1) / 2),
  //     d3.pointer(event, mapSvg.node()),
  //   );
  // }

  // 顯示地圖上縣市
  d3.json('/jsonData/taiwanCounty_topojson.json').then((data) => {
    console.log(data);
    const geometries = topojson.feature(data, data.objects.COUNTY_MOI_1090820);

    const mapOfCounty = mapSvg
      .append('g')
      .selectAll('path')
      .data(geometries.features)
      .join('path')
      .attr('fill', '#69b3a2')
      .attr('d', path)
      .style('stroke', '#fff')
      .attr('county-name', (d) => d.properties.COUNTYNAME);
    // .on('click', (event, d) => clicked(event, d));

    function zoomed() {
      // mapSvg.attr('transform', event.transform);
      mapSvg.attr('transform', d3.zoomTransform(this).toString());
    }
    const zoom = d3.zoom().scaleExtent([1, 10]).on('zoom', zoomed);
    mapSvg.call(zoom);
    // function zoomed() {
    // // const mapSvg = d3.select('svg.map');
    //   mapSvg.attr('transform', d3.zoomTransform(this));
    // }

    // // const zoom = () => {
    // function zoom() {
    //   d3.zoom()
    //     .scaleExtent([1, 10]) // 可放大倍率
    //     .on('zoom', zoomed);

    //   mapSvg.call(zoom);
    // }

    function clicked(event, d) {
      const [[x0, y0], [x1, y1]] = d3.geoPath().bounds(d);
      event.stopPropagation();
      mapOfCounty.transition().style('fill', null);
      d3.select(this).transition().style('fill', 'pink');

      const [targetX, targetY] = d3.pointer(event, mapSvg.node());
      console.log(targetX, targetY);

      mapSvg.transition().duration(750).call(
        zoom.transform,
        d3.zoomIdentity
          .translate(width / 2, height / 2)
          .scale(Math.min(6.5, 0.9 / Math.max((x1 - x0) / width, (y1 - y0) / height)))
          .translate((-(x0 + x1) / 2) + 50, (-(y0 + y1) / 2) - 100),
        // .translate(-targetX + 230, -targetY + 210),
        // d3.pointer(event, mapSvg.node()),
      );
    }

    mapOfCounty.on('click', clicked);

    function reset() {
      mapOfCounty.transition().style('fill', null);
      mapSvg.transition().duration(750).call(
        zoom.transform,
        d3.zoomIdentity,
        d3.zoomTransform(mapSvg.node()).invert([width / 2, height / 2]),
      );
    }
    mapSvg.on('click', reset);
    // mapOfCounty.on('click', (event, d) => clicked(event, d));

    // mapSvg.call(zoom);
    // mapSvg.on('click', (event, d) => clicked(event, d));
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

  // zoomMap(mapSvg);
  // clickAndZoomInMap(500, 500);

  // const zoomed = function () {
  // function zoomed() {
  //   // const mapSvg = d3.select('svg.map');
  //   mapSvg.attr('transform', d3.zoomTransform(this));
  // }

  // // const zoom = () => {
  // function zoom() {
  //   d3.zoom()
  //     .scaleExtent([1, 10]) // 可放大倍率
  //     .on('zoom', zoomed);
  // }

  // mapSvg.call(zoom);

  // function clicked(event, d) {
  //   const [[x0, y0], [x1, y1]] = d3.geoPath().bounds(d);
  //   event.stopPropagation();
  //   mapSvg.selectAll('path').transition().style('fill', null);
  //   d3.select(this).transition().style('fill', 'pink');
  //   mapSvg.transition().duration(750).call(
  //     zoom.transform,
  //     d3.zoomIdentity
  //       .translate(width / 2, height / 2)
  //       .scale(Math.min(8, 0.9 / Math.max((x1 - x0) / width, (y1 - y0) / height)))
  //       .translate(-(x0 + x1) / 2, -(y0 + y1) / 2),
  //     d3.pointer(event, mapSvg.node()),
  //   );
  // }

  // mapSvg.on('click', (event, d) => clicked(event, d));
};

// const zoomed = () => {
//   const mapSvg = d3.select('svg.map');
//   mapSvg.attr('transform', d3.zoomTransform(this));
// };

// const zoom = () => {
//   d3.zoom()
//     .scaleExtent([1, 8])
//     .on('zoom', zoomed);
// };

onMounted(() => {
  // getTaiwanCounty();
  drawTaiwanCounty();
});
</script>
<template>
  <div class="container mx-auto">
    <svg width="500" height="500" viewBox="0 0 500 500"
    style="border: 1px solid #fff;" class="map bg-gray-100">
    </svg>
    <h1 class="text-3xl font-bold underline " >
    Hello world!
    </h1>
  </div>
</template>
<style scope>
body {
  background-color: #fff;
}
</style>
