/**
 * Marketing Content Kanban Board Component (Spacious 4 Columns)
 */
import { Store } from '../store.js';
import { openMarketingApprovalModal, openNewMarketingModal } from '../modal.js';

export function renderMarketingSection() {
  const state = Store.getState();
  const container = document.getElementById('marketing-section');
  if (!container) return;

  const isCeo = state.currentUser === 'CEO';
  const cards = state.marketing;

  const columns = [
    { id: 'PLANNING', title: '1. 기획중', icon: 'fa-lightbulb', color: 'text-sky-400', bg: 'bg-sky-500/10' },
    { id: 'IN_PROGRESS', title: '2. 제작중', icon: 'fa-pen-ruler', color: 'text-amber-400', bg: 'bg-amber-500/10' },
    { id: 'CEO_FEEDBACK', title: '3. 대표 피드백', icon: 'fa-comments-dollar', color: 'text-purple-400', bg: 'bg-purple-500/10' },
    { id: 'DONE', title: '4. 발행 완료', icon: 'fa-circle-check', color: 'text-emerald-400', bg: 'bg-emerald-500/10' }
  ];

  container.innerHTML = `
    <div class="glass-panel rounded-2xl p-6 relative flex flex-col justify-between h-full space-y-6">
      
      <!-- Section Header -->
      <div class="flex items-center justify-between">
        <div>
          <h2 class="text-lg font-extrabold text-white flex items-center gap-2">
            <i class="fa-solid fa-square-poll-vertical text-purple-400"></i>
            마케팅 콘텐츠 진행 칸반 보드
          </h2>
          <p class="text-xs text-slate-400 mt-0.5">시안 작성 ➔ 대표 승인 ➔ 발행 프로세스</p>
        </div>

        <div class="flex items-center gap-2">
          ${!isCeo ? `
            <button id="btn-add-marketing-card" class="px-4 py-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-xs rounded-xl shadow-md transition-all flex items-center gap-1.5 active:scale-95">
              <i class="fa-solid fa-plus"></i> 신규 시안 등록
            </button>
          ` : `
            <span class="px-3 py-1.5 rounded-xl bg-blue-500/20 text-blue-400 border border-blue-500/30 text-xs font-bold flex items-center gap-1.5">
              <i class="fa-solid fa-shield-halved"></i> 대표 결재 모드
            </span>
          `}
        </div>
      </div>

      <!-- Kanban 4 Columns Grid -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        ${columns.map(col => {
          const colCards = cards.filter(c => c.column === col.id);
          return `
            <div data-col="${col.id}" class="kanban-column bg-slate-950/60 rounded-2xl p-4 border border-slate-800 flex flex-col min-h-[360px] space-y-3">
              <div class="flex items-center justify-between pb-3 border-b border-slate-800">
                <span class="text-xs font-extrabold text-slate-200 flex items-center gap-2">
                  <i class="fa-solid ${col.icon} ${col.color}"></i>
                  ${col.title}
                </span>
                <span class="text-xs font-black text-slate-300 ${col.bg} px-2.5 py-0.5 rounded-full border border-slate-700">
                  ${colCards.length}
                </span>
              </div>

              <!-- Column Cards list -->
              <div class="space-y-3 flex-1 overflow-y-auto max-h-[420px] pr-1">
                ${colCards.length === 0 ? `
                  <div class="text-center py-12 text-xs text-slate-600 border border-dashed border-slate-800 rounded-xl">
                    항목 없음
                  </div>
                ` : colCards.map(card => `
                  <div draggable="true" data-cardid="${card.id}" class="kanban-card bg-slate-900 hover:bg-slate-800/90 p-4 rounded-xl border border-slate-700/60 shadow-md cursor-grab active:cursor-grabbing transition-all space-y-3 group">
                    
                    <div class="flex items-center justify-between text-xs">
                      <span class="text-purple-400 font-mono font-bold">${card.id}</span>
                      <span class="text-[11px] text-slate-500">${card.updatedAt}</span>
                    </div>

                    <h4 class="text-xs font-bold text-white leading-relaxed group-hover:text-purple-300 transition-colors">
                      ${card.title}
                    </h4>

                    ${card.feedback ? `
                      <div class="p-2.5 rounded-lg bg-amber-500/10 border border-amber-500/20 text-xs text-amber-300 leading-relaxed">
                        <i class="fa-solid fa-comment-dots text-amber-400 mr-1"></i>
                        <strong>피드백:</strong> ${card.feedback}
                      </div>
                    ` : ''}

                    <div class="flex items-center justify-between pt-2 border-t border-slate-800/80 text-xs">
                      ${card.designUrl ? `
                        <a href="${card.designUrl}" target="_blank" class="text-purple-400 hover:text-purple-300 font-bold flex items-center gap-1">
                          <i class="fa-solid fa-arrow-up-right-from-square text-[10px]"></i> 시안 링크
                        </a>
                      ` : '<span class="text-slate-600 text-[11px]">링크 없음</span>'}

                      <div>
                        ${card.column === 'CEO_FEEDBACK' ? `
                          <button data-cardid="${card.id}" class="btn-review-card px-3 py-1 bg-purple-600 hover:bg-purple-500 text-white rounded-lg font-bold shadow transition-all flex items-center gap-1 active:scale-95">
                            <i class="fa-solid fa-stamp"></i> 검토
                          </button>
                        ` : ''}
                      </div>
                    </div>

                  </div>
                `).join('')}
              </div>
            </div>
          `;
        }).join('')}
      </div>

    </div>
  `;

  setTimeout(() => {
    bindKanbanEvents();
  }, 50);
}

function bindKanbanEvents() {
  document.getElementById('btn-add-marketing-card')?.addEventListener('click', () => {
    openNewMarketingModal();
  });

  document.querySelectorAll('.btn-review-card').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.stopPropagation();
      const cardId = btn.getAttribute('data-cardid');
      openMarketingApprovalModal(cardId);
    });
  });

  // Drag and Drop
  let draggedCardId = null;

  document.querySelectorAll('.kanban-card').forEach(card => {
    card.addEventListener('dragstart', (e) => {
      draggedCardId = card.getAttribute('data-cardid');
      e.dataTransfer.setData('text/plain', draggedCardId);
      card.classList.add('opacity-50');
    });

    card.addEventListener('dragend', () => {
      card.classList.remove('opacity-50');
    });
  });

  document.querySelectorAll('.kanban-column').forEach(col => {
    col.addEventListener('dragover', (e) => {
      e.preventDefault();
      col.classList.add('drag-over');
    });

    col.addEventListener('dragleave', () => {
      col.classList.remove('drag-over');
    });

    col.addEventListener('drop', (e) => {
      e.preventDefault();
      col.classList.remove('drag-over');
      const targetCol = col.getAttribute('data-col');
      if (draggedCardId && targetCol) {
        Store.updateMarketingColumn(draggedCardId, targetCol);
      }
    });
  });
}
