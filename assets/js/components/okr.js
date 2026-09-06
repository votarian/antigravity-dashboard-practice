/**
 * 2-Person OKR Tracker & Weekly Progress Chart Component
 */
import { Store } from '../store.js';

let okrChartInstance = null;

export function renderOKRSection() {
  const state = Store.getState();
  const container = document.getElementById('okr-section');
  if (!container) return;

  const isCeo = state.currentUser === 'CEO';
  const latestWeek = state.okr.weeklyTrend[state.okr.weeklyTrend.length - 1];

  // Calculate CEO KRs avg rate
  const ceoKRs = state.okr.ceo.keyResults;
  const ceoRates = ceoKRs.map(k => Math.min(100, Math.round((k.current / k.target) * 100)));
  const ceoAvg = Math.round(ceoRates.reduce((a, b) => a + b, 0) / ceoRates.length);

  // Calculate Manager KRs avg rate
  const mgrKRs = state.okr.manager.keyResults;
  const mgrRates = mgrKRs.map(k => Math.min(100, Math.round((k.current / k.target) * 100)));
  const mgrAvg = Math.round(mgrRates.reduce((a, b) => a + b, 0) / mgrRates.length);

  const companyAvg = Math.round((ceoAvg + mgrAvg) / 2);

  container.innerHTML = `
    <div class="glass-panel rounded-2xl p-6 relative">
      
      <!-- Top Section: Company OKR Progress Header & Weekly Line Chart -->
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6 pb-6 border-b border-slate-700/60">
        
        <!-- Left: Overall Company OKR Progress -->
        <div class="lg:col-span-2 flex flex-col justify-center space-y-4">
          <div class="flex items-center justify-between">
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 flex items-center justify-center shadow-md shadow-blue-500/20">
                <i class="fa-solid fa-bullseye text-white text-lg"></i>
              </div>
              <div>
                <h2 class="text-base font-bold text-white">전사 통합 OKR 달성 현황</h2>
                <p class="text-xs text-slate-400">대표 & 부장 KPI 실시간 가중합산 달성률</p>
              </div>
            </div>
            <div class="text-right">
              <span class="text-3xl font-black text-white tracking-tight">${companyAvg}%</span>
              <span class="text-xs font-semibold text-emerald-400 block">Q3 목표 달성 가시권</span>
            </div>
          </div>

          <!-- Main Company Progress Bar -->
          <div class="w-full bg-slate-800 h-4 rounded-full overflow-hidden p-0.5 border border-slate-700/80">
            <div class="bg-gradient-to-r from-blue-500 via-indigo-500 to-emerald-400 h-full rounded-full transition-all duration-500 shadow-sm" style="width: ${companyAvg}%"></div>
          </div>

          <div class="flex items-center justify-between text-xs text-slate-400 px-1">
            <span>대표 KR 달성률: <strong class="text-blue-400 font-bold">${ceoAvg}%</strong></span>
            <span>부장 KR 달성률: <strong class="text-emerald-400 font-bold">${mgrAvg}%</strong></span>
          </div>
        </div>

        <!-- Right: Weekly OKR Trend Line Chart -->
        <div class="bg-slate-800/40 p-4 rounded-xl border border-slate-700/50 flex flex-col justify-between">
          <div class="flex items-center justify-between mb-2">
            <span class="text-xs font-bold text-slate-300">주차별 진척도 추이</span>
            <span class="text-[10px] text-slate-400 bg-slate-700/60 px-2 py-0.5 rounded-md">W1 ~ W4</span>
          </div>
          <div class="h-24 w-full">
            <canvas id="okr-trend-chart"></canvas>
          </div>
        </div>

      </div>

      <!-- Bottom 2 Columns: CEO OKR vs Manager OKR Cards -->
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        <!-- CEO OKR Card -->
        <div class="rounded-2xl p-5 border transition-all ${
          isCeo 
            ? 'bg-blue-950/20 border-blue-500/50 shadow-lg shadow-blue-900/10' 
            : 'bg-slate-800/40 border-slate-700/60 opacity-90'
        }">
          <div class="flex items-center justify-between mb-3">
            <div class="flex items-center gap-2">
              <span class="px-2.5 py-1 rounded-lg bg-blue-500/20 text-blue-400 border border-blue-500/30 text-xs font-bold">
                <i class="fa-solid fa-user-tie mr-1"></i> CEO 대표
              </span>
              <span class="text-xs text-slate-400">External: 영업/기획/결재</span>
            </div>
            <span class="text-lg font-black text-blue-400">${ceoAvg}%</span>
          </div>

          <h3 class="text-sm font-bold text-white mb-4 line-clamp-1">${state.okr.ceo.objective}</h3>

          <!-- CEO Key Results -->
          <div class="space-y-4 mb-5">
            ${ceoKRs.map((kr, idx) => {
              const rate = Math.min(100, Math.round((kr.current / kr.target) * 100));
              return `
                <div class="bg-slate-900/60 p-3 rounded-xl border border-slate-700/50">
                  <div class="flex items-center justify-between text-xs font-semibold mb-1.5">
                    <span class="text-slate-300">KR ${idx+1}. ${kr.title}</span>
                    <span class="text-blue-400">${kr.current} / ${kr.target} ${kr.unit} (${rate}%)</span>
                  </div>
                  <div class="w-full bg-slate-800 h-2 rounded-full overflow-hidden mb-2">
                    <div class="bg-blue-500 h-full rounded-full transition-all" style="width: ${rate}%"></div>
                  </div>
                  <div class="flex items-center justify-end gap-2 text-xs">
                    <span class="text-slate-400">수치 조율:</span>
                    <button data-owner="ceo" data-krid="${kr.id}" data-action="minus" class="okr-val-btn w-6 h-6 rounded bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 font-bold flex items-center justify-center">-</button>
                    <input type="number" data-owner="ceo" data-krid="${kr.id}" value="${kr.current}" class="okr-val-input w-12 text-center bg-slate-950 border border-slate-700 text-white rounded text-xs py-0.5" />
                    <button data-owner="ceo" data-krid="${kr.id}" data-action="plus" class="okr-val-btn w-6 h-6 rounded bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 font-bold flex items-center justify-center">+</button>
                  </div>
                </div>
              `;
            }).join('')}
          </div>

          <!-- CEO Initiatives Checklist -->
          <div>
            <h4 class="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <i class="fa-solid fa-list-check text-blue-400"></i>
              Initiatives (실행 과제)
            </h4>
            <div class="space-y-1.5">
              ${state.okr.ceo.initiatives.map(init => `
                <label class="flex items-center gap-2.5 p-2 rounded-lg bg-slate-900/40 hover:bg-slate-900/80 cursor-pointer border border-transparent hover:border-slate-700 transition-colors text-xs">
                  <input type="checkbox" data-owner="ceo" data-initid="${init.id}" class="okr-init-checkbox w-4 h-4 rounded border-slate-700 text-blue-600 focus:ring-blue-500 bg-slate-950" ${init.completed ? 'checked' : ''} />
                  <span class="${init.completed ? 'line-through text-slate-500' : 'text-slate-200'}">${init.text}</span>
                </label>
              `).join('')}
            </div>
          </div>

        </div>

        <!-- Manager OKR Card -->
        <div class="rounded-2xl p-5 border transition-all ${
          !isCeo 
            ? 'bg-emerald-950/20 border-emerald-500/50 shadow-lg shadow-emerald-900/10' 
            : 'bg-slate-800/40 border-slate-700/60 opacity-90'
        }">
          <div class="flex items-center justify-between mb-3">
            <div class="flex items-center gap-2">
              <span class="px-2.5 py-1 rounded-lg bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-xs font-bold">
                <i class="fa-solid fa-user-gear mr-1"></i> MGR 부장
              </span>
              <span class="text-xs text-slate-400">Internal: 재고/물류/마케팅/CS</span>
            </div>
            <span class="text-lg font-black text-emerald-400">${mgrAvg}%</span>
          </div>

          <h3 class="text-sm font-bold text-white mb-4 line-clamp-1">${state.okr.manager.objective}</h3>

          <!-- Manager Key Results -->
          <div class="space-y-4 mb-5">
            ${mgrKRs.map((kr, idx) => {
              const rate = Math.min(100, Math.round((kr.current / kr.target) * 100));
              return `
                <div class="bg-slate-900/60 p-3 rounded-xl border border-slate-700/50">
                  <div class="flex items-center justify-between text-xs font-semibold mb-1.5">
                    <span class="text-slate-300">KR ${idx+1}. ${kr.title}</span>
                    <span class="text-emerald-400">${kr.current} / ${kr.target} ${kr.unit} (${rate}%)</span>
                  </div>
                  <div class="w-full bg-slate-800 h-2 rounded-full overflow-hidden mb-2">
                    <div class="bg-emerald-500 h-full rounded-full transition-all" style="width: ${rate}%"></div>
                  </div>
                  <div class="flex items-center justify-end gap-2 text-xs">
                    <span class="text-slate-400">수치 조율:</span>
                    <button data-owner="manager" data-krid="${kr.id}" data-action="minus" class="okr-val-btn w-6 h-6 rounded bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 font-bold flex items-center justify-center">-</button>
                    <input type="number" data-owner="manager" data-krid="${kr.id}" value="${kr.current}" class="okr-val-input w-12 text-center bg-slate-950 border border-slate-700 text-white rounded text-xs py-0.5" />
                    <button data-owner="manager" data-krid="${kr.id}" data-action="plus" class="okr-val-btn w-6 h-6 rounded bg-slate-800 hover:bg-slate-700 border border-slate-700 text-slate-300 font-bold flex items-center justify-center">+</button>
                  </div>
                </div>
              `;
            }).join('')}
          </div>

          <!-- Manager Initiatives Checklist -->
          <div>
            <h4 class="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 flex items-center gap-1.5">
              <i class="fa-solid fa-list-check text-emerald-400"></i>
              Initiatives (실행 과제)
            </h4>
            <div class="space-y-1.5">
              ${state.okr.manager.initiatives.map(init => `
                <label class="flex items-center gap-2.5 p-2 rounded-lg bg-slate-900/40 hover:bg-slate-900/80 cursor-pointer border border-transparent hover:border-slate-700 transition-colors text-xs">
                  <input type="checkbox" data-owner="manager" data-initid="${init.id}" class="okr-init-checkbox w-4 h-4 rounded border-slate-700 text-emerald-600 focus:ring-emerald-500 bg-slate-950" ${init.completed ? 'checked' : ''} />
                  <span class="${init.completed ? 'line-through text-slate-500' : 'text-slate-200'}">${init.text}</span>
                </label>
              `).join('')}
            </div>
          </div>

        </div>

      </div>

    </div>
  `;

  // Attach Event Listeners & Chart Init
  setTimeout(() => {
    initOKRChart(state.okr.weeklyTrend);
    bindOKREvents();
  }, 50);
}

function initOKRChart(weeklyTrend) {
  const canvas = document.getElementById('okr-trend-chart');
  if (!canvas) return;

  if (okrChartInstance) {
    okrChartInstance.destroy();
  }

  const labels = weeklyTrend.map(w => w.week);
  const companyData = weeklyTrend.map(w => w.company);
  const ceoData = weeklyTrend.map(w => w.ceo);
  const mgrData = weeklyTrend.map(w => w.manager);

  okrChartInstance = new Chart(canvas, {
    type: 'line',
    data: {
      labels: labels,
      datasets: [
        {
          label: '전사',
          data: companyData,
          borderColor: '#a855f7',
          backgroundColor: 'transparent',
          borderWidth: 2,
          tension: 0.3,
          pointRadius: 3
        },
        {
          label: '대표',
          data: ceoData,
          borderColor: '#3b82f6',
          backgroundColor: 'transparent',
          borderWidth: 1.5,
          borderDash: [3, 3],
          tension: 0.3,
          pointRadius: 2
        },
        {
          label: '부장',
          data: mgrData,
          borderColor: '#10b981',
          backgroundColor: 'transparent',
          borderWidth: 1.5,
          borderDash: [3, 3],
          tension: 0.3,
          pointRadius: 2
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
          borderColor: '#334155',
          borderWidth: 1,
          padding: 8,
          callbacks: {
            label: context => `${context.dataset.label}: ${context.raw}%`
          }
        }
      },
      scales: {
        x: { display: true, ticks: { color: '#64748b', font: { size: 10 } } },
        y: { display: false, min: 0, max: 100 }
      }
    }
  });
}

function bindOKREvents() {
  document.querySelectorAll('.okr-val-btn').forEach(btn => {
    btn.addEventListener('click', (e) => {
      const owner = btn.getAttribute('data-owner');
      const krId = btn.getAttribute('data-krid');
      const action = btn.getAttribute('data-action');
      const input = document.querySelector(`.okr-val-input[data-owner="${owner}"][data-krid="${krId}"]`);
      if (input) {
        let val = Number(input.value);
        if (action === 'plus') val += 1;
        if (action === 'minus') val = Math.max(0, val - 1);
        Store.updateKR(owner, krId, val);
      }
    });
  });

  document.querySelectorAll('.okr-val-input').forEach(input => {
    input.addEventListener('change', (e) => {
      const owner = input.getAttribute('data-owner');
      const krId = input.getAttribute('data-krid');
      Store.updateKR(owner, krId, input.value);
    });
  });

  document.querySelectorAll('.okr-init-checkbox').forEach(chk => {
    chk.addEventListener('change', (e) => {
      const owner = chk.getAttribute('data-owner');
      const initId = chk.getAttribute('data-initid');
      Store.toggleInitiative(owner, initId);
    });
  });
}
