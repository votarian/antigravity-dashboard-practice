/**
 * Financial Performance & Margin Analysis Chart Component
 */
import { Store } from '../store.js';

let comboChartInstance = null;
let doughnutChartInstance = null;

export function renderFinancialSection() {
  const state = Store.getState();
  const container = document.getElementById('financial-section');
  if (!container) return;

  container.innerHTML = `
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      
      <!-- Chart 1: 월별 매출액 vs 순수익 & 마진율 복합 차트 (2 cols) -->
      <div class="lg:col-span-2 glass-panel rounded-2xl p-6 relative">
        <div class="flex items-center justify-between mb-4">
          <div>
            <h2 class="text-base font-bold text-white flex items-center gap-2">
              <i class="fa-solid fa-chart-column text-blue-400"></i>
              월별 매출액 vs 순수익 & 마진율 추이
            </h2>
            <p class="text-xs text-slate-400 mt-0.5">매출액(막대) / 순수익(막대) / 평균 마진율(꺾은선)</p>
          </div>
          <div class="flex items-center gap-2 text-xs">
            <span class="inline-flex items-center gap-1 text-slate-300">
              <span class="w-3 h-3 rounded-sm bg-blue-500 inline-block"></span> 매출액
            </span>
            <span class="inline-flex items-center gap-1 text-slate-300">
              <span class="w-3 h-3 rounded-sm bg-emerald-500 inline-block"></span> 순수익
            </span>
            <span class="inline-flex items-center gap-1 text-slate-300">
              <span class="w-3 h-0.5 bg-amber-400 inline-block"></span> 마진율(%)
            </span>
          </div>
        </div>

        <div class="relative h-72 w-full">
          <canvas id="financial-combo-chart"></canvas>
        </div>
      </div>

      <!-- Chart 2: 비용 구조 분석 (도넛 차트) (1 col) -->
      <div class="glass-panel rounded-2xl p-6 relative flex flex-col justify-between">
        <div>
          <div class="flex items-center justify-between mb-4">
            <h2 class="text-base font-bold text-white flex items-center gap-2">
              <i class="fa-solid fa-chart-pie text-emerald-400"></i>
              손익 비용 구조 분석
            </h2>
            <span class="text-xs text-slate-400">비율 (%)</span>
          </div>
          <div class="relative h-56 w-full flex items-center justify-center">
            <canvas id="cost-doughnut-chart"></canvas>
          </div>
        </div>

        <!-- Cost breakdown legend grid -->
        <div class="grid grid-cols-2 gap-2 mt-4 pt-4 border-t border-slate-700/60 text-xs">
          <div class="flex items-center justify-between p-2 rounded-lg bg-slate-800/50">
            <span class="flex items-center gap-1.5 text-slate-300">
              <span class="w-2.5 h-2.5 rounded-full bg-blue-500"></span> 매출원가
            </span>
            <span class="font-bold text-white">${state.financial.costStructure.cogs}%</span>
          </div>
          <div class="flex items-center justify-between p-2 rounded-lg bg-slate-800/50">
            <span class="flex items-center gap-1.5 text-slate-300">
              <span class="w-2.5 h-2.5 rounded-full bg-indigo-500"></span> 수수료
            </span>
            <span class="font-bold text-white">${state.financial.costStructure.platformFee}%</span>
          </div>
          <div class="flex items-center justify-between p-2 rounded-lg bg-slate-800/50">
            <span class="flex items-center gap-1.5 text-slate-300">
              <span class="w-2.5 h-2.5 rounded-full bg-amber-500"></span> 마케팅비
            </span>
            <span class="font-bold text-white">${state.financial.costStructure.marketing}%</span>
          </div>
          <div class="flex items-center justify-between p-2 rounded-lg bg-slate-800/50">
            <span class="flex items-center gap-1.5 text-slate-300">
              <span class="w-2.5 h-2.5 rounded-full bg-rose-500"></span> 물류부자재
            </span>
            <span class="font-bold text-white">${state.financial.costStructure.logistics}%</span>
          </div>
        </div>
      </div>

    </div>
  `;

  // Chart Rendering
  setTimeout(() => {
    initComboChart(state.financial.monthlyTrend);
    initDoughnutChart(state.financial.costStructure);
  }, 50);
}

function initComboChart(monthlyTrend) {
  const canvas = document.getElementById('financial-combo-chart');
  if (!canvas) return;

  if (comboChartInstance) {
    comboChartInstance.destroy();
  }

  const labels = monthlyTrend.map(d => d.month);
  const revenues = monthlyTrend.map(d => d.revenue);
  const profits = monthlyTrend.map(d => d.profit);
  const margins = monthlyTrend.map(d => d.margin);

  comboChartInstance = new Chart(canvas, {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [
        {
          type: 'line',
          label: '마진율 (%)',
          data: margins,
          borderColor: '#f59e0b',
          backgroundColor: '#f59e0b',
          borderWidth: 3,
          tension: 0.3,
          pointRadius: 4,
          pointBackgroundColor: '#f59e0b',
          yAxisID: 'y1'
        },
        {
          type: 'bar',
          label: '매출액 (만원)',
          data: revenues,
          backgroundColor: 'rgba(59, 130, 246, 0.85)',
          borderColor: '#3b82f6',
          borderWidth: 1,
          borderRadius: 6,
          yAxisID: 'y'
        },
        {
          type: 'bar',
          label: '순수익 (만원)',
          data: profits,
          backgroundColor: 'rgba(16, 185, 129, 0.85)',
          borderColor: '#10b981',
          borderWidth: 1,
          borderRadius: 6,
          yAxisID: 'y'
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      interaction: {
        mode: 'index',
        intersect: false
      },
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: '#1e293b',
          titleColor: '#ffffff',
          bodyColor: '#cbd5e1',
          borderColor: '#334155',
          borderWidth: 1,
          padding: 12,
          callbacks: {
            label: function(context) {
              if (context.dataset.yAxisID === 'y1') {
                return `마진율: ${context.raw}%`;
              }
              return `${context.dataset.label}: ${context.raw.toLocaleString()} 만원`;
            }
          }
        }
      },
      scales: {
        x: {
          grid: { color: 'rgba(255, 255, 255, 0.05)' },
          ticks: { color: '#94a3b8', font: { family: 'Pretendard' } }
        },
        y: {
          position: 'left',
          grid: { color: 'rgba(255, 255, 255, 0.05)' },
          ticks: { 
            color: '#94a3b8', 
            font: { family: 'Pretendard' },
            callback: val => val.toLocaleString() + '만'
          }
        },
        y1: {
          position: 'right',
          grid: { drawOnChartArea: false },
          ticks: { 
            color: '#f59e0b', 
            font: { family: 'Pretendard' },
            callback: val => val + '%'
          },
          min: 0,
          max: 50
        }
      }
    }
  });
}

function initDoughnutChart(costData) {
  const canvas = document.getElementById('cost-doughnut-chart');
  if (!canvas) return;

  if (doughnutChartInstance) {
    doughnutChartInstance.destroy();
  }

  doughnutChartInstance = new Chart(canvas, {
    type: 'doughnut',
    data: {
      labels: ['매출원가', '플랫폼 수수료', '마케팅/광고비', '포장/물류 부자재비', '기타 판관비'],
      datasets: [
        {
          data: [
            costData.cogs,
            costData.platformFee,
            costData.marketing,
            costData.logistics,
            costData.sgna
          ],
          backgroundColor: [
            '#3b82f6', // blue
            '#6366f1', // indigo
            '#f59e0b', // amber
            '#f43f5e', // rose
            '#64748b'  // slate
          ],
          borderWidth: 2,
          borderColor: '#1e293b'
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          backgroundColor: '#1e293b',
          titleColor: '#ffffff',
          bodyColor: '#cbd5e1',
          borderColor: '#334155',
          borderWidth: 1,
          callbacks: {
            label: function(context) {
              return `${context.label}: ${context.raw}%`;
            }
          }
        }
      },
      cutout: '70%'
    }
  });
}
