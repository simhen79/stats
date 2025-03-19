
<template>
  <div class="ma-10">
    <div class="flex items-center justify-center mb-10">
      <p class="text-white">
        Last Updated: {{ date }}
      </p>
    </div>
    <div class="grid xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-1 sm:grid-cols-1 gap-4 p-4">
      <div class="place-items-center lg:mt-30">
        <div class="flex flex-col gap-10 place-items-center text-white font-bold mb-10">
          <div class="flex flex-col gap-0 place-items-center">
            <b class="text-6xl">{{ totals.totalBirdies }}</b>
            <p>Total Birdies</p>
          </div>
          <div class="flex flex-col gap-0 place-items-center">
            <b class="text-6xl">{{ totals.totalGames }}</b>
            <p>Total Games</p>
          </div>
          <div class="flex flex-col gap-0 place-items-center">
            <b class="text-6xl">{{ totals.avgRatio }}</b>
            <p>Avg birdies per round</p>
          </div>
        </div>
        <v-chart :option="birdieOptions" autoresize  class="pie-chart" />
        <v-chart :option="gameOptions" autoresize class="pie-chart" />
        <v-chart :option="ratioOptions" autoresize class="pie-chart" />
      </div>
      <div class="place-items-center mt-0">
        <v-chart :option="barOptions" autoresize class="chart" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { use } from 'echarts/core';
import { SVGRenderer } from "echarts/renderers";
import { BarChart, PieChart } from "echarts/charts";
import { TitleComponent, GridComponent, TooltipComponent, LegendComponent, DatasetComponent } from "echarts/components";
import {ref, provide, onMounted, watch} from "vue";
import useStats from "@/composables/stats.js";

use([
  BarChart,
  TitleComponent,
  TooltipComponent,
  LegendComponent,
  GridComponent,
  SVGRenderer,
  DatasetComponent,
  PieChart
]);

provide('THEME_KEY', 'dark');

onMounted(() => {
  getStats();
});

const { stats, date, topBirdies, topGames, topRatio, totals , getStats } = useStats();

const birdieOptions = ref({
  title: {
    text: 'Top 5 most birdies',
    textStyle: {
      color: '#fff',
      fontSize: '18px',
    },
    left: 'center'
  },
  tooltip: {
    trigger: 'item'
  },
  dataset: {
    dimensions: ['name', 'birdies'],
    source: topBirdies
  },
  series: [
    {
      type: 'pie',
      startAngle: 180,
      endAngle: 360,
      top: 0,
      height: '100%',
      width: '85%',
      left: 'center',
      center: ['50%', '70%'],
      radius: ['85%', '75%'],
      labelLine: {
        length: 20,
        showAbove: false,
      },
      labelLayout: {
        verticalAlign: 'bottom',
      },
      label: {
        position: 'outside',
        alignTo: 'none',
        color: '#FFF',
        fontSize: 10,
        rotate: 45,
        distanceToLabelLine: 5
      }
    }
  ]
});

const gameOptions = ref({
  title: {
    text: 'Top 5 most rounds',
    textStyle: {
      color: '#fff',
      fontSize: '18px',
    },
    left: 'center'
  },
  tooltip: {
    trigger: 'item'
  },
  dataset: {
    dimensions: ['name', 'games'],
    source: topGames
  },
  series: [
    {
      type: 'pie',
      startAngle: 180,
      endAngle: 360,
      top: 0,
      height: '100%',
      width: '85%',
      left: 'center',
      center: ['50%', '70%'],
      radius: ['85%', '75%'],
      labelLine: {
        length: 20,
        showAbove: false,
      },
      labelLayout: {
        verticalAlign: 'bottom',
      },
      label: {
        position: 'outside',
        alignTo: 'none',
        color: '#FFF',
        fontSize: 10,
        rotate: 45,
        distanceToLabelLine: 5
      }
    }
  ]
});

const ratioOptions = ref({
  title: {
    text: 'Top 5 birdies per round',
    textStyle: {
      color: '#fff',
      fontSize: '18px',
    },
    left: 'center'
  },
  tooltip: {
    trigger: 'item'
  },
  dataset: {
    dimensions: ['name', 'ratio'],
    source: topRatio
  },
  series: [
    {
      type: 'pie',
      startAngle: 180,
      endAngle: 360,
      top: 0,
      height: '100%',
      width: '85%',
      left: 'center',
      center: ['50%', '70%'],
      radius: ['85%', '75%'],
      labelLine: {
        length: 20,
        showAbove: false,
      },
      labelLayout: {
        verticalAlign: 'bottom',
      },
      label: {
        position: 'outside',
        alignTo: 'none',
        color: '#FFF',
        fontSize: 10,
        rotate: 45,
        distanceToLabelLine: 5
      }
    }
  ]
});

const barOptions = ref({
  title: {
    top: -5,
    text: 'Birdie stats',
    textStyle: {
      color: '#fff',
    },
    left: 'center'
  },
  tooltip: {
    trigger: 'axis',
    axisPointer: {
      type: 'shadow'
    }
  },
  legend: {
    top: 20,
    textStyle: {
      color: 'white'  // Change legend text color here
    }
  },
  grid: {
    left: '3%',
    right: '4%',
    bottom: '3%',
    containLabel: true
  },
  xAxis: {
    type: 'value'
  },
  yAxis: {
    type: 'category',
    axisLabel: {
      color: 'white',
      fontSize: 10,
      interval: 0
    }
  },
  series: [
    { type: 'bar', stack: 'total', emphasis: {
        focus: 'series'
      }}, { type: 'bar', stack: 'total',emphasis: {
        focus: 'series'
      } }, { type: 'bar', stack: 'total', emphasis: {
        focus: 'series'
      } }
  ],
  dataset: {
    // Provide a set of data.
    dimensions: ['name', 'games', 'birdies', 'ratio'],
    source: stats
  }
});

</script>

<style scoped>
  .chart {
    width: 95%;
    height: 100vh;
  }

  .pie-chart {
    width: 95%;
    height: 300px;
  }
</style>
