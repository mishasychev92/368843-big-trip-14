import Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import SmartView from './smart.js';
import {EventTypes} from '../const.js';
import {countPriceByType, getSortedData, countEventTypes, countDurationTypes} from '../utils/stats.js';
import {formateDuration} from '../utils/event.js';

const BAR_HEIGHT = 55;

const eventTypes = Object.keys(EventTypes);

const StatsTitle = {
  MONEY: 'MONEY',
  TYPE: 'TYPE',
  TIME: 'TIME-SPENT',
};

const formatMoneyLabel = (val) => `€ ${val}`;
const formatTypeLabel = (val) => `${val}x`;
const formatTimeLabel = (val) => formateDuration(val);

const renderChart = (ctx, valuesByType, labelFormatter, chartTitle) => {
  const sortedData = getSortedData(valuesByType);

  ctx.height = BAR_HEIGHT * sortedData.labels.length;

  return new Chart(ctx, {
    plugins: [ChartDataLabels],
    type: 'horizontalBar',
    data: {
      labels: sortedData.labels,
      datasets: [{
        data: sortedData.data,
        backgroundColor: '#ffffff',
        hoverBackgroundColor: '#ffffff',
        anchor: 'start',
        barThickness: 44,
        minBarLength: 50,
      }],
    },
    options: {
      plugins: {
        datalabels: {
          font: {
            size: 13,
          },
          color: '#000000',
          anchor: 'end',
          align: 'start',
          formatter: labelFormatter,
        },
      },
      title: {
        display: true,
        text: chartTitle,
        fontColor: '#000000',
        fontSize: 23,
        position: 'left',
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: '#000000',
            padding: 5,
            fontSize: 13,
          },
          gridLines: {
            display: false,
            drawBorder: false,
          },
        }],
        xAxes: [{
          ticks: {
            display: false,
            beginAtZero: true,
          },
          gridLines: {
            display: false,
            drawBorder: false,
          },
        }],
      },
      legend: {
        display: false,
      },
      tooltips: {
        enabled: false,
      },
    },
  });
};

const createStatsTemplate = () => {
  return `<section class="statistics">
    <h2 class="visually-hidden">Trip statistics</h2>

    <div class="statistics__item statistics__item--money">
      <canvas class="statistics__chart  statistics__chart--money" width="900"></canvas>
    </div>

    <div class="statistics__item statistics__item--transport">
      <canvas class="statistics__chart  statistics__chart--transport" width="900"></canvas>
    </div>

    <div class="statistics__item statistics__item--time-spend">
      <canvas class="statistics__chart  statistics__chart--time" width="900"></canvas>
    </div>
  </section>`;
};

export default class Stats extends SmartView {
  constructor(events) {
    super();

    this._data = events;

    this._moneyChart = null;
    this._typeChart = null;
    this._timeChart = null;

    this._setCharts();
  }

  removeElement() {
    super.removeElement();

    if (this._moneyChart !== null || this._typeChart !== null | this._timeChart !== null) {
      this._moneyChart = null;
      this._typeChart = null;
      this._timeChart = null;
    }
  }

  getTemplate() {
    return createStatsTemplate();
  }

  restoreHandlers() {
    this._setCharts();
  }

  _setCharts() {
    if (this._moneyChart !== null || this._typeChart !== null | this._timeChart !== null) {
      this._moneyChart = null;
      this._typeChart = null;
      this._timeChart = null;
    }

    const moneyCtx = this.getElement().querySelector('.statistics__chart--money');
    const typeCtx = this.getElement().querySelector('.statistics__chart--transport');
    const timeCtx = this.getElement().querySelector('.statistics__chart--time');

    const pricesByTypes = eventTypes.map((type) => countPriceByType(this._data, type));
    const countOfType= eventTypes.map((type) => countEventTypes(this._data, type));
    const durationsByTypes = eventTypes.map((type) => countDurationTypes(this._data, type));

    this._moneyChart = renderChart(moneyCtx, pricesByTypes, formatMoneyLabel, StatsTitle.MONEY);
    this._typeChart = renderChart(typeCtx, countOfType, formatTypeLabel, StatsTitle.TYPE);
    this._timeChart = renderChart(timeCtx, durationsByTypes, formatTimeLabel, StatsTitle.TIME);
  }
}
