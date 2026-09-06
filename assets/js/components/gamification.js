/**
 * Gamification Component (Character Level, EXP Bar, Quest Board & Badges)
 */
import { Store } from '../store.js';

export function renderGamificationSection() {
  const state = Store.getState();
  const container = document.getElementById('gamification-section');
  if (!container) return;

  const isCeo = state.currentUser === 'CEO';
  const char = isCeo ? state.gamification.ceo : state.gamification.manager;
  const quests = state.gamification.quests;
  const badges = state.gamification.badges;

  const expPercent = Math.min(100, Math.round((char.exp / char.maxExp) * 100));

  container.innerHTML = `
    <div class="glass-panel rounded-2xl p-6 relative overflow-hidden">
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        <!-- Left: Character Card & Level / EXP Status -->
        <div class="bg-gradient-to-br from-slate-900 via-slate-800 to-indigo-950/40 p-5 rounded-xl border border-indigo-500/30 flex flex-col justify-between space-y-4">
          <div>
            <div class="flex items-center justify-between mb-3">
              <span class="px-2.5 py-1 rounded-lg ${isCeo ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30' : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'} text-xs font-bold flex items-center gap-1.5">
                <i class="fa-solid ${isCeo ? 'fa-crown' : 'fa-shield-halved'}"></i>
                ${char.title}
              </span>
              <span class="text-xs font-mono font-bold text-amber-400 flex items-center gap-1">
                <i class="fa-solid fa-fire text-rose-500"></i> ${char.streak}일 연속 콤보!
              </span>
            </div>

            <div class="flex items-center gap-4">
              <div class="w-16 h-16 rounded-2xl bg-gradient-to-tr ${isCeo ? 'from-blue-600 to-indigo-500' : 'from-emerald-600 to-teal-500'} flex items-center justify-center text-2xl font-black text-white shadow-lg shadow-indigo-500/20 ring-2 ring-white/10">
                Lv.${char.level}
              </div>
              <div class="flex-1 space-y-1">
                <div class="flex items-center justify-between text-xs font-bold">
                  <span class="text-white">EXP (경험치)</span>
                  <span class="text-indigo-300 font-mono">${char.exp} / ${char.maxExp} XP (${expPercent}%)</span>
                </div>
                <div class="w-full bg-slate-950 h-3 rounded-full overflow-hidden border border-slate-800 p-0.5">
                  <div class="bg-gradient-to-r from-blue-500 via-indigo-500 to-purple-400 h-full rounded-full transition-all duration-500" style="width: ${expPercent}%"></div>
                </div>
                <p class="text-[11px] text-slate-400 pt-0.5">${char.subTitle}</p>
              </div>
            </div>
          </div>

          <!-- Badges Mini Slot -->
          <div class="pt-3 border-t border-slate-800/80">
            <span class="text-[11px] font-bold text-slate-400 block mb-2">🏆 보유 업적 뱃지</span>
            <div class="flex items-center gap-2">
              ${badges.map(b => `
                <div class="w-9 h-9 rounded-xl ${b.unlocked ? 'bg-amber-500/20 border border-amber-500/40 text-amber-400' : 'bg-slate-900 border border-slate-800 text-slate-600'} flex items-center justify-center text-sm" title="${b.title}: ${b.desc}">
                  <i class="fa-solid ${b.icon}"></i>
                </div>
              `).join('')}
            </div>
          </div>
        </div>

        <!-- Right 2 cols: Daily Quest Board -->
        <div class="lg:col-span-2 space-y-3">
          <div class="flex items-center justify-between">
            <h2 class="text-base font-bold text-white flex items-center gap-2">
              <i class="fa-solid fa-scroll text-amber-400"></i>
              오늘의 경영 퀘스트 보드 (Daily Quests)
            </h2>
            <span class="text-xs text-slate-400">퀘스트 수행 시 EXP + Gold 보상!</span>
          </div>

          <div class="space-y-2.5">
            ${quests.map(q => `
              <div class="p-3.5 rounded-xl bg-slate-900/80 hover:bg-slate-800/80 border border-slate-700/60 transition-all flex items-center justify-between gap-4 group">
                <div class="flex items-center gap-3.5">
                  <div class="w-10 h-10 rounded-xl ${q.completed ? 'bg-slate-800 text-slate-500' : 'bg-amber-500/10 text-amber-400 border border-amber-500/20'} flex items-center justify-center text-base flex-shrink-0">
                    <i class="fa-solid ${q.icon}"></i>
                  </div>
                  <div>
                    <div class="flex items-center gap-2">
                      <h4 class="text-xs font-bold text-white ${q.completed ? 'line-through text-slate-500' : ''}">${q.title}</h4>
                      <span class="text-[10px] font-bold px-2 py-0.5 rounded ${q.completed ? 'bg-slate-800 text-slate-500' : 'bg-purple-500/20 text-purple-300 border border-purple-500/30'}">
                        +${q.exp} XP
                      </span>
                    </div>
                    <p class="text-[11px] text-slate-400 mt-0.5">${q.description}</p>
                  </div>
                </div>

                <div>
                  ${q.completed ? `
                    <span class="px-3 py-1.5 rounded-xl bg-slate-800 text-emerald-400 text-xs font-bold flex items-center gap-1">
                      <i class="fa-solid fa-check"></i> 완료됨
                    </span>
                  ` : `
                    <button data-questid="${q.id}" class="btn-complete-quest px-3.5 py-1.5 bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950 font-black text-xs rounded-xl shadow-md transition-all active:scale-95 flex items-center gap-1">
                      <i class="fa-solid fa-wand-magic-sparkles"></i> 퀘스트 수행
                    </button>
                  `}
                </div>
              </div>
            `).join('')}
          </div>
        </div>

      </div>
    </div>
  `;

  setTimeout(() => {
    document.querySelectorAll('.btn-complete-quest').forEach(btn => {
      btn.addEventListener('click', () => {
        const questId = btn.getAttribute('data-questid');
        const res = Store.completeQuest(questId);
        if (res) {
          showQuestCelebration(res);
        }
      });
    });
  }, 50);
}

function showQuestCelebration(res) {
  let container = document.getElementById('toast-container');
  if (!container) {
    container = document.createElement('div');
    container.id = 'toast-container';
    document.body.appendChild(container);
  }

  const toast = document.createElement('div');
  toast.className = 'toast toast-success';
  toast.innerHTML = `
    <i class="fa-solid fa-party-horn text-xl text-amber-300"></i>
    <div>
      <div class="font-bold text-white">🎉 퀘스트 완료! (+${res.expGained} XP)</div>
      <div class="text-xs text-emerald-100">${res.questTitle} 달성 완료!</div>
      ${res.levelUp ? `<div class="font-black text-amber-300 text-xs mt-1">⭐ LEVEL UP! (Lv.${res.newLevel} 달성)</div>` : ''}
    </div>
  `;

  container.appendChild(toast);
  setTimeout(() => {
    toast.remove();
  }, 4000);
}
