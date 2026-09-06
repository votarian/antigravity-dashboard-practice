/**
 * CS FAQ Templates & Operations Manual Quick Links Component
 */
import { Store } from '../store.js';

export function renderCSManualSection() {
  const state = Store.getState();
  const container = document.getElementById('cs-manual-section');
  if (!container) return;

  const faqs = state.cs.faqs;
  const manuals = state.cs.manuals;

  container.innerHTML = `
    <div class="glass-panel rounded-2xl p-6 relative flex flex-col justify-between h-full">
      
      <!-- Section Header -->
      <div class="flex items-center justify-between mb-4">
        <div>
          <h2 class="text-base font-bold text-white flex items-center gap-2">
            <i class="fa-solid fa-headset text-emerald-400"></i>
            CS FAQ 템플릿 & 업무 매뉴얼
          </h2>
          <p class="text-xs text-slate-400 mt-0.5">자주 쓰는 CS 문구 1초 복사 & 외부 매뉴얼 퀵링크</p>
        </div>
      </div>

      <!-- Upper: CS FAQ Copy Cards -->
      <div class="mb-5 space-y-2.5">
        <h3 class="text-xs font-bold text-slate-300 flex items-center gap-1.5 mb-2">
          <i class="fa-solid fa-copy text-emerald-400"></i> CS 자주 쓰는 응대 템플릿
        </h3>

        <div class="space-y-2 max-h-[220px] overflow-y-auto pr-1">
          ${faqs.map(faq => `
            <div class="bg-slate-900/80 hover:bg-slate-800/80 p-3 rounded-xl border border-slate-700/60 transition-all flex flex-col justify-between space-y-2 group">
              <div class="flex items-center justify-between">
                <div class="flex items-center gap-2">
                  <span class="px-2 py-0.5 rounded bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[10px] font-bold">
                    ${faq.category}
                  </span>
                  <h4 class="text-xs font-bold text-white">${faq.title}</h4>
                </div>
                <button data-content="${encodeURIComponent(faq.content)}" class="btn-copy-faq px-2.5 py-1 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg text-[11px] font-bold shadow transition-all flex items-center gap-1 active:scale-95">
                  <i class="fa-regular fa-copy"></i> 복사
                </button>
              </div>
              <p class="text-[11px] text-slate-300 bg-slate-950/50 p-2 rounded-lg border border-slate-800/80 line-clamp-2 leading-relaxed">
                ${faq.content}
              </p>
            </div>
          `).join('')}
        </div>
      </div>

      <!-- Lower: Operations Manual Quick Links Grid -->
      <div>
        <h3 class="text-xs font-bold text-slate-300 flex items-center gap-1.5 mb-2">
          <i class="fa-solid fa-link text-blue-400"></i> 업무 퀵링크 & 노션 매뉴얼
        </h3>

        <div class="grid grid-cols-2 gap-2">
          ${manuals.map(m => `
            <a href="${m.url}" target="_blank" class="p-2.5 rounded-xl bg-slate-900/70 hover:bg-slate-800 border border-slate-700/60 hover:border-blue-500/40 text-slate-200 hover:text-white transition-all flex items-center justify-between text-xs group">
              <span class="flex items-center gap-2 truncate font-medium">
                <i class="fa-solid ${m.icon} text-blue-400 group-hover:scale-110 transition-transform"></i>
                <span class="truncate">${m.title}</span>
              </span>
              <i class="fa-solid fa-chevron-right text-[10px] text-slate-500 group-hover:text-blue-400 transition-colors"></i>
            </a>
          `).join('')}
        </div>
      </div>

    </div>
  `;

  setTimeout(() => {
    document.querySelectorAll('.btn-copy-faq').forEach(btn => {
      btn.addEventListener('click', () => {
        const text = decodeURIComponent(btn.getAttribute('data-content'));
        navigator.clipboard.writeText(text).then(() => {
          showToast('CS 응대 문구가 클립보드에 복사되었습니다!', 'success');
        }).catch(err => {
          showToast('복사 실패: ' + err, 'error');
        });
      });
    });
  }, 50);
}

function showToast(message, type = 'info') {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.innerHTML = `
    <i class="fa-solid ${type === 'success' ? 'fa-circle-check' : 'fa-circle-info'} text-lg"></i>
    <span>${message}</span>
  `;

  container.appendChild(toast);
  setTimeout(() => {
    toast.remove();
  }, 3000);
}
