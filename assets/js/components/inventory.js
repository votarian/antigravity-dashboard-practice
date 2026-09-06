/**
 * Inventory vs Safety Stock Comparison & Log Component
 */
import { Store } from '../store.js';
import { openStockModal } from '../modal.js';

let inventoryChartInstance = null;

export function renderInventorySection() {
  const state = Store.getState();
  const container = document.getElementById('inventory-section');
  if (!container) return;

  const items = state.inventory.items;
  const logs = state.inventory.logs;

  container.innerHTML = `
    <div class="glass-panel rounded-2xl p-6 relative flex flex-col justify-between h-full space-y-6">
      
      <!-- Section Header -->
      <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 class="text-lg font-extrabold text-white flex items-center gap-2">
            <i class="fa-solid fa-boxes-stacked text-amber-400"></i>
            재고량 vs 안전재고 비교 모니터링
          </h2>
          <p class="text-xs text-slate-400 mt-0.5">품목별 현재 재고 수량 및 안전재고 미달 충족 현황</p>
        </div>

        <button id="btn-open-stock-modal" class="px-4 py-2 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-black text-xs rounded-xl shadow-md transition-all flex items-center gap-1.5 active:scale-95 self-start sm:self-auto">
          <i class="fa-solid fa-plus"></i> 입출고 등록
        </button>
      </div>

      <!-- Chart Container (Spacious Height) -->
      <div class="relative h-72 w-full bg-slate-950/60 p-4 rounded-xl border border-slate-800">
        <canvas id="inventory-bar-chart"></canvas>
      </div>

      <!-- Inventory Log & Status Table -->
      <div class="space-y-3">
        <div class="flex items-center justify-between">
          <h3 class="text-sm font-bold text-slate-200 flex items-center gap-1.5">
            <i class="fa-solid fa-clock-rotate-left text-amber-400"></i>
            최근 입출고 처리 내역
          </h3>
          <span class="text-xs text-slate-400">최근 ${Math.min(5, logs.length)}건 기록</span>
        </div>

        <div class="overflow-x-auto rounded-xl border border-slate-800">
          <table class="w-full text-left border-collapse">
            <thead>
              <tr class="border-b border-slate-800 text-xs font-bold text-slate-400 bg-slate-900/80">
                <th class="py-3 px-4">일시</th>
                <th class="py-3 px-4">구분</th>
                <th class="py-3 px-4">품목명</th>
                <th class="py-3 px-4 text-right">수량</th>
                <th class="py-3 px-4">사유 / 비고</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-slate-800/80 text-xs">
              ${logs.slice(0, 5).map(log => `
                <tr class="hover:bg-slate-800/50 transition-colors">
                  <td class="py-3 px-4 text-slate-400 whitespace-nowrap text-xs">${log.date}</td>
                  <td class="py-3 px-4 whitespace-nowrap">
                    <span class="px-2.5 py-1 rounded-lg text-xs font-bold ${
                      log.type === 'IN' 
                        ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' 
                        : 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                    }">
                      ${log.type === 'IN' ? '입고 (+)' : '출고 (-)'}
                    </span>
                  </td>
                  <td class="py-3 px-4 font-bold text-white">${log.item}</td>
                  <td class="py-3 px-4 text-right font-black text-amber-300">${log.qty} EA</td>
                  <td class="py-3 px-4 text-slate-300 text-xs">${log.note}</td>
                </tr>
              `).join('')}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  `;

  setTimeout(() => {
    initInventoryChart(items);
    document.getElementById('btn-open-stock-modal')?.addEventListener('click', () => {
      openStockModal();
    });
  }, 50);
}

function initInventoryChart(items) {
  const canvas = document.getElementById('inventory-bar-chart');
  if (!canvas) return;

  if (inventoryChartInstance) {
    inventoryChartInstance.destroy();
  }

  const labels = items.map(i => i.name);
  const currents = items.map(i => i.current);
  const safeties = items.map(i => i.safety);

  inventoryChartInstance = new Chart(canvas, {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [
        {
          label: '현재 재고',
          data: currents,
          backgroundColor: currents.map((val, idx) => val < safeties[idx] ? 'rgba(239, 68, 68, 0.85)' : 'rgba(59, 130, 246, 0.85)'),
          borderColor: currents.map((val, idx) => val < safeties[idx] ? '#ef4444' : '#3b82f6'),
          borderWidth: 1.5,
          borderRadius: 6
        },
        {
          label: '안전재고 기준',
          data: safeties,
          backgroundColor: 'rgba(245, 158, 11, 0.35)',
          borderColor: '#f59e0b',
          borderWidth: 1.5,
          borderRadius: 6,
          borderDash: [3, 3]
        }
      ]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: true,
          position: 'top',
          align: 'end',
          labels: { color: '#cbd5e1', font: { family: 'Pretendard', size: 12 }, boxWidth: 12 }
        },
        tooltip: {
          backgroundColor: '#1e293b',
          titleColor: '#ffffff',
          bodyColor: '#cbd5e1',
          borderColor: '#334155',
          borderWidth: 1,
          padding: 12
        }
      },
      scales: {
        x: { ticks: { color: '#cbd5e1', font: { family: 'Pretendard', size: 11 } } },
        y: { ticks: { color: '#cbd5e1', font: { family: 'Pretendard', size: 11 } } }
      }
    }
  });
}
