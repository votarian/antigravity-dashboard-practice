/**
 * B2B Sales Pipeline CRM Component
 */
import { Store } from '../store.js';
import { openB2BModal } from '../modal.js';

export function renderB2BSection() {
  const state = Store.getState();
  const container = document.getElementById('b2b-section');
  if (!container) return;

  const b2bList = state.b2b;

  const statusMap = {
    CONTACTING: { label: '접촉중', class: 'bg-slate-700 text-slate-300' },
    PROPOSAL: { label: '견적제안', class: 'bg-blue-500/20 text-blue-400 border border-blue-500/30' },
    CONTRACTED: { label: '계약완료', class: 'bg-purple-500/20 text-purple-400 border border-purple-500/30' },
    DELIVERY_PENDING: { label: '출고대기', class: 'bg-amber-500/20 text-amber-400 border border-amber-500/30' },
    COMPLETED: { label: '완료', class: 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30' }
  };

  container.innerHTML = `
    <div class="glass-panel rounded-2xl p-6 relative flex flex-col justify-between h-full">
      
      <!-- Section Header -->
      <div class="flex items-center justify-between mb-4">
        <div>
          <h2 class="text-base font-bold text-white flex items-center gap-2">
            <i class="fa-solid fa-handshake text-blue-400"></i>
            B2B 영업 CRM 파이프라인
          </h2>
          <p class="text-xs text-slate-400 mt-0.5">기업 고객 미팅, 견적 승인, 출고 일정 관리</p>
        </div>

        <button id="btn-open-b2b-modal" class="px-3 py-1.5 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center gap-1.5 active:scale-95">
          <i class="fa-solid fa-plus"></i> 신규 건 등록
        </button>
      </div>

      <!-- CRM Table -->
      <div class="overflow-x-auto">
        <table class="w-full text-left border-collapse">
          <thead>
            <tr class="border-b border-slate-700/60 text-[11px] font-semibold text-slate-400 bg-slate-900/60">
              <th class="py-2.5 px-3">거래처명</th>
              <th class="py-2.5 px-3">담당자 / 연락처</th>
              <th class="py-2.5 px-3 text-right">견적 금액</th>
              <th class="py-2.5 px-3">계약 상태</th>
              <th class="py-2.5 px-3">출고 예정일</th>
              <th class="py-2.5 px-3">미팅록 / 비고</th>
            </tr>
          </thead>
          <tbody class="divide-y divide-slate-800 text-xs">
            ${b2bList.map(item => {
              const statusInfo = statusMap[item.status] || statusMap.CONTACTING;
              return `
                <tr class="hover:bg-slate-800/40 transition-colors">
                  <td class="py-3 px-3 font-bold text-white whitespace-nowrap">
                    <span class="text-blue-400 mr-1 font-mono">${item.id}</span> ${item.client}
                  </td>
                  <td class="py-3 px-3 text-slate-300 whitespace-nowrap text-[11px]">
                    ${item.contact}
                  </td>
                  <td class="py-3 px-3 text-right font-black text-emerald-400 whitespace-nowrap">
                    ${item.amount.toLocaleString()} 원
                  </td>
                  <td class="py-3 px-3 whitespace-nowrap">
                    <select data-b2bid="${item.id}" class="b2b-status-select text-[11px] font-bold rounded-lg px-2 py-1 bg-slate-950 border border-slate-700 text-white focus:outline-none focus:border-blue-500 cursor-pointer">
                      <option value="CONTACTING" ${item.status === 'CONTACTING' ? 'selected' : ''}>접촉중</option>
                      <option value="PROPOSAL" ${item.status === 'PROPOSAL' ? 'selected' : ''}>견적제안</option>
                      <option value="CONTRACTED" ${item.status === 'CONTRACTED' ? 'selected' : ''}>계약완료</option>
                      <option value="DELIVERY_PENDING" ${item.status === 'DELIVERY_PENDING' ? 'selected' : ''}>출고대기</option>
                      <option value="COMPLETED" ${item.status === 'COMPLETED' ? 'selected' : ''}>완료</option>
                    </select>
                  </td>
                  <td class="py-3 px-3 text-slate-400 font-mono text-[11px] whitespace-nowrap">
                    <i class="fa-regular fa-calendar mr-1"></i>${item.date}
                  </td>
                  <td class="py-3 px-3 text-slate-400 text-[11px] max-w-[200px] truncate" title="${item.note}">
                    ${item.note || '-'}
                  </td>
                </tr>
              `;
            }).join('')}
          </tbody>
        </table>
      </div>

    </div>
  `;

  setTimeout(() => {
    document.getElementById('btn-open-b2b-modal')?.addEventListener('click', () => {
      openB2BModal();
    });

    document.querySelectorAll('.b2b-status-select').forEach(select => {
      select.addEventListener('change', (e) => {
        const id = select.getAttribute('data-b2bid');
        Store.updateB2BStatus(id, select.value);
      });
    });
  }, 50);
}
