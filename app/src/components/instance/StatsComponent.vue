<template>
  <div class="stats-container">
    <div class="row justify-between items-center">
      <p class="title">Статистика</p>
      <div class="row">
        <Select v-model="statsWindow" :options="windowOptions" map-options />
        <Select v-model="chartType" :options="typeOptions" map-options />
      </div>
    </div>
    <div ref="highcharts-container" class="chart" />
  </div>
</template>

<script setup lang="ts">
import { InstanceStatus, StatusStatsOut } from 'src/api';
import StatsWindow from 'src/types/StatsWindow.type';
import { computed, onMounted, ref, useTemplateRef, watch } from 'vue';
import Highcharts, { Options } from 'highcharts';
import Select from '../Select.vue';
import moment from 'moment';
import useStatsWindow from 'src/composables/useStatsWindow';

const stats = defineModel<StatusStatsOut>('stats');
const statsWindow = defineModel<StatsWindow>('statsWindow');
const chartType = defineModel<'bar' | 'line'>('chartType');

const chart = useTemplateRef('highcharts-container');

const typeOptions = [
  {
    value: 'bar',
    label: 'Распределение',
  },
  {
    value: 'line',
    label: 'Таймлайн',
  },
];

const windowOptions = [
  {
    value: StatsWindow['3h'],
    label: '3 часа',
  },
  {
    value: StatsWindow['6h'],
    label: '6 hours',
  },
  {
    value: StatsWindow['12h'],
    label: '12 часов',
  },
  {
    value: StatsWindow['1d'],
    label: '1 день',
  },
  {
    value: StatsWindow['1w'],
    label: '1 неделя',
  },
];

const options = ref<Options>({});

const updateOptions = () => {
  if (chartType.value == 'bar') {
    options.value = {
      chart: {
        type: 'column',
        styledMode: true,
      },
      title: {
        text: 'Общая пропорция статусов агента',
      },
      xAxis: {
        categories: Object.keys(stats.value!.seconds_by_status),
        crosshair: true,
        accessibility: {
          description: 'Статусы',
        },
      },
      yAxis: {
        min: 0,
        title: {
          text: '%',
        },
        max: 100,
      },
      tooltip: {
        valueSuffix: ' %',
      },
      plotOptions: {
        column: {
          pointPadding: 0.2,
          borderWidth: 0,
        },
      },
      credits: { enabled: false },
      series: [
        {
          name: 'Общая пропорция статуса агента',
          color: 'rgba(255, 255, 255, 0.25)',
          data: Object.values(stats.value!.seconds_by_status).map((num) => {
            return (num / stats.value!.total_seconds).toPrecision(4) * 100;
          }),
        },
      ],
    };
  } else {
    const getColor = (color: InstanceStatus) => {
      switch (color) {
        case InstanceStatus.Active:
          return '#0f0';
        case InstanceStatus.Inactive:
          return '#ccc';
        case InstanceStatus.Error:
          return '#f00';
        case InstanceStatus.NotEnoughBalance:
          return '#a00';
        case InstanceStatus.Provisioning:
          return '#a2a800';
        case InstanceStatus.Updating:
          return '#f6ff00';
        default:
          return '#000';
      }
    };

    const series = Object.values(InstanceStatus)
      .map((key) => {
        if (key == InstanceStatus.Paused) return; // deprecated. I'm sorry for this xd
        const segments = stats.value?.segments?.filter(({ status }) => {
          return status == key;
        });
        return {
          name: key,
          color: getColor(key),
          label: key,
          data:
            segments?.length! > 0
              ? segments
                  ?.map(({ start, end }) => {
                    return [
                      [start, 1],
                      [end, 1],
                    ];
                  })
                  .flat(1)
              : [],
        };
      })
      .filter((key) => {
        return !!key;
      });
    options.value = {
      chart: {
        styledMode: true,
        type: 'spline',
      },
      credits: { enabled: false },
      title: {
        text: 'Таймлайн статусов агента',
      },

      yAxis: {
        min: 0,
        max: 2,
        visible: false,
      },

      xAxis: {
        type: 'datetime',
        min: useStatsWindow(statsWindow.value!, moment()).toISOString(),
        max: moment().toISOString(),
      },

      legend: {
        layout: 'vertical',
        align: 'right',
        verticalAlign: 'top',
      },

      plotOptions: {
        series: {
          label: {
            connectorAllowed: false,
          },
        },
      },

      series,

      responsive: {
        rules: [
          {
            condition: {
              maxWidth: 500,
            },
            chartOptions: {
              legend: {
                layout: 'horizontal',
                align: 'center',
                verticalAlign: 'bottom',
              },
            },
          },
        ],
      },
    };
  }
};

watch([chartType, stats, statsWindow], () => {
  updateOptions();
});

watch(options, (newOptions) => {
  Highcharts.chart(chart.value as HTMLElement, newOptions);
});

onMounted(() => {
  updateOptions();
  Highcharts.chart(chart.value as HTMLElement, options.value);
});
</script>

<style lang="scss" scoped>
.stats-container {
  .title {
    font-size: var(--font-size-sm);
    font-weight: 600;
    padding-left: var(--spacing-xs);
    margin-bottom: 0;
  }

  .row {
    gap: var(--spacing-xs);
  }
}
// .chart {
//   background-color: black !important;
// }

// .highcharts-background {
//   fill: black !important;
// }
</style>
