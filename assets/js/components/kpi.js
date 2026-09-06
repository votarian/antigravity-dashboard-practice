/**
 * Top 5 Key Performance Indicator Cards Component
 */
import { Store } from '../store.js';

export function renderKPI() {
  const state = Store.getState();
  const container = document.getElementById('kpi-cards-section');
  if (!container) return;

  // Calculate metrics
  const latestFinancial = state.financial.monthlyTrend[state.financial.monthlyTrend.length - 1];
  const revenueStr = (latestFinancial.revenue / 10000).toFixed(2) + ' 억원 (' + latestFinancial.revenue.toLocaleString() + '만원)';
  const profitStr = latestFinancial.profit.toLocaleString() + ' 만원';
  const marginStr = latestFinancial.margin.toFixed(1) + ' %';

  const lowStockCount = state.inventory.items.filter(i => i.current < i.safety).length;
  const pendingMarketingCount = state.marketing.filter(m => m.column === 'CEO_FEEDBACK').length;

  container.innerHTML = `
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
      
      <!-- KPI 1: 월 누적 매출액 -->
      <div class="glass-panel rounded-2xl p-5 card-hover relative overflow-hidden group">
        <div class="absolute -right-4 -bottom-4 w-20 h-20 bg-blue-500/10 rounded-full blur-xl group-hover:bg-blue-500/20 transition-all"></div>
        <div class="flex items-center justify-between">
          <span class="text-xs font-semibold text-slate-400 uppercase tracking-wider">월 누적 매출액</span>
          <div class="w-9 h-9 rounded-xl bg-blue-500/10 border border-blue-500/20 text-blue-400 flex items-center justify-center">
            <i class="fa-solid fa-sack-dollar text-base"></i>
          </div>
        </div>
        <div class="mt-3">
          <div class="text-2xl font-black text-white tracking-tight">${latestFinancial.revenue.toLocaleString()} <span class="text-sm font-normal text-slate-400">만원</span></div>
          <div class="mt-2 flex items-center text-xs font-medium text-emerald-400">
            <i class="fa-solid fa-arrow-trend-up mr-1"></i>
            <span>전월 대비 +11.3% 증가</span>
          </div>
        </div>
      </div>

      <!-- KPI 2: 월 누적 순수익 -->
      <div class="glass-panel rounded-2xl p-5 card-hover relative overflow-hidden group">
        <div class="absolute -right-4 -bottom-4 w-20 h-20 bg-emerald-500/10 rounded-full blur-xl group-hover:bg-emerald-500/20 transition-all"></div>
        <div class="flex items-center justify-between">
          <span class="text-xs font-semibold text-slate-400 uppercase tracking-wider">월 누적 순수익</span>
          <div class="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 flex items-center justify-center">
            <i class="fa-solid fa-piggy-bank text-base"></i>
          </div>
        </div>
        <div class="mt-3">
          <div class="text-2xl font-black text-white tracking-tight">${latestFinancial.profit.toLocaleString()} <span class="text-sm font-normal text-slate-400">만원</span></div>
          <div class="mt-2 flex items-center text-xs font-medium text-emerald-400">
            <i class="fa-solid fa-chart-line mr-1"></i>
            <span>순익 목표 달성률 112%</span>
          </div>
        </div>
      </div>

      <!-- KPI 3: 평균 마진율 -->
      <div class="glass-panel rounded-2xl p-5 card-hover relative overflow-hidden group">
        <div class="absolute -right-4 -bottom-4 w-20 h-20 bg-indigo-500/10 rounded-full blur-xl group-hover:bg-indigo-500/20 transition-all"></div>
        <div class="flex items-center justify-between">
          <span class="text-xs font-semibold text-slate-400 uppercase tracking-wider">평균 마진율(%)</span>
          <div class="w-9 h-9 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center">
            <i class="fa-solid fa-percent text-base"></i>
          </div>
        </div>
        <div class="mt-3">
          <div class="text-2xl font-black text-white tracking-tight">${marginStr}</div>
          <div class="mt-2 flex items-center text-xs font-medium text-indigo-300">
            <i class="fa-solid fa-shield-halved mr-1"></i>
            <span>고마진 제품군 비율 68%</span>
          </div>
        </div>
      </div>

      <!-- KPI 4: 안전재고 미달 품목 -->
      <div class="glass-panel rounded-2xl p-5 card-hover relative overflow-hidden group border-amber-500/30">
        <div class="absolute -right-4 -bottom-4 w-20 h-20 bg-amber-500/10 rounded-full blur-xl group-hover:bg-amber-500/20 transition-all"></div>
        <div class="flex items-center justify-between">
          <span class="text-xs font-semibold text-slate-400 uppercase tracking-wider">안전재고 미달 품목</span>
          <div class="w-9 h-9 rounded-xl ${lowStockCount > 0 ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30' : 'bg-slate-800 text-slate-400'} flex items-center justify-center">
            <i class="fa-solid fa-triangle-exclamation text-base"></i>
          </div>
        </div>
        <div class="mt-3">
          <div class="text-2xl font-black ${lowStockCount > 0 ? 'text-amber-400' : 'text-white'} tracking-tight">${lowStockCount} <span class="text-sm font-normal text-slate-400">개 품목</span></div>
          <div class="mt-2 flex items-center text-xs font-medium ${lowStockCount > 0 ? 'text-amber-400' : 'text-slate-400'}">
            <i class="fa-solid fa-boxes-packing mr-1"></i>
            <span>${lowStockCount > 0 ? '즉시 입고 및 발주 필요' : '모든 품목 안전재고 충족'}</span>
          </div>
        </div>
      </div>

      <!-- KPI 5: 대표 승인 대기 시안 수 -->
      <div class="glass-panel rounded-2xl p-5 card-hover relative overflow-hidden group border-purple-500/30">
        <div class="absolute -right-4 -bottom-4 w-20 h-20 bg-purple-500/10 rounded-full blur-xl group-hover:bg-purple-500/20 transition-all"></div>
        <div class="flex items-center justify-between">
          <span class="text-xs font-semibold text-slate-400 uppercase tracking-wider">대표 승인 대기 시안</span>
          <div class="w-9 h-9 rounded-xl ${pendingMarketingCount > 0 ? 'bg-purple-500/20 text-purple-400 border border-purple-500/30' : 'bg-slate-800 text-slate-400'} flex items-center justify-center">
            <i class="fa-solid fa-stamp text-base"></i>
          </div>
        </div>
        <div class="mt-3">
          <div class="text-2xl font-black ${pendingMarketingCount > 0 ? 'text-purple-400' : 'text-white'} tracking-tight">${pendingMarketingCount} <span class="text-sm font-normal text-slate-400">건</span></div>
          <div class="mt-2 flex items-center text-xs font-medium ${pendingMarketingCount > 0 ? 'text-purple-300' : 'text-slate-400'}">
            <i class="fa-solid fa-pen-nib mr-1"></i>
            <span>${pendingMarketingCount > 0 ? '대표 결재 및 피드백 대기중' : '승인 대기 건 없음'}</span>
          </div>
        </div>
      </div>

    </div>
  `;
}
