/**
 * Header Component: Character Avatar, EXP Bar, User Role Switcher & 6 Navigation Tabs
 * Aligned with /docs (PRD, MVP Design, Screen Flows & Functional Specifications)
 */
import { Store } from '../store.js';

export function renderHeader() {
  const state = Store.getState();
  const currentChar = Store.getCurrentCharacter();
  const activeTab = state.activeTab || 'PROBLEM';
  const cycle = state.cycle;

  const container = document.getElementById('app-header');
  if (!container) return;

  const expPercentage = Math.min(100, Math.round((currentChar.exp / currentChar.maxExp) * 100));

  container.innerHTML = `
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 space-y-3">
      
      <!-- Top Row: Title, Character Status & User Switcher -->
      <div class="flex flex-col lg:flex-row items-center justify-between gap-4">
        
        <!-- Left: Logo, Title & Cycle Status -->
        <div class="flex items-center gap-3.5">
          <div class="w-12 h-12 rounded-2xl bg-gradient-to-tr from-indigo-600 via-purple-600 to-amber-500 flex items-center justify-center shadow-lg shadow-purple-500/30 ring-1 ring-white/20">
            <span class="text-2xl">${currentChar.avatar}</span>
          </div>
          <div>
            <div class="flex items-center gap-2 flex-wrap">
              <h1 class="text-lg font-black text-white tracking-tight">마크인포 문제 해결형 OKR System</h1>
              <span class="bg-indigo-500/20 text-indigo-300 border border-indigo-500/40 text-[10px] font-bold px-2 py-0.5 rounded-full flex items-center gap-1">
                <span class="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse"></span> ${cycle.status}
              </span>
              <span class="bg-amber-500/10 text-amber-300 border border-amber-500/30 text-[10px] font-bold px-2 py-0.5 rounded-full">
                ${cycle.name}
              </span>
            </div>
            <p class="text-xs text-slate-400 mt-0.5">
              문제 수집 → 선정 검토 → OKR 합의 → 주간 체크인 → 월간 회의 → 파티 마감
            </p>
          </div>
        </div>

        <!-- Right: RPG Character Profile Stats & User Switcher -->
        <div class="flex items-center gap-4 flex-wrap">
          
          <!-- Character Level & EXP Progress Pill -->
          <div class="bg-slate-800/90 border border-slate-700/80 rounded-2xl p-2.5 px-4 flex items-center gap-3.5 shadow-inner">
            <div class="flex flex-col">
              <div class="flex items-center justify-between gap-3 text-xs mb-1">
                <span class="font-extrabold text-white flex items-center gap-1">
                  ${currentChar.name} <span class="text-[10px] px-1.5 py-0.2 bg-purple-500/20 text-purple-300 rounded font-semibold">${currentChar.roleLabel}</span>
                </span>
                <span class="font-black text-amber-400 text-xs">Lv.${currentChar.level}</span>
              </div>
              
              <!-- EXP Bar -->
              <div class="w-36 sm:w-44 bg-slate-900 h-2 rounded-full overflow-hidden border border-slate-700/60 p-0.5">
                <div class="bg-gradient-to-r from-amber-400 to-purple-500 h-full rounded-full transition-all duration-500" style="width: ${expPercentage}%"></div>
              </div>
              <div class="flex justify-between text-[10px] text-slate-400 mt-0.5">
                <span>XP ${currentChar.exp} / ${currentChar.maxExp}</span>
                <span class="text-amber-300 font-bold">🪙 ${currentChar.gold.toLocaleString()}G</span>
              </div>
            </div>
          </div>

          <!-- User Role Switcher Dropdown -->
          <div class="relative">
            <select id="user-role-select" class="bg-slate-800 hover:bg-slate-750 text-slate-100 text-xs font-bold py-2.5 px-3 rounded-xl border border-slate-700 cursor-pointer shadow-md focus:outline-none focus:ring-2 focus:ring-purple-500">
              <option value="CEO" ${state.currentUser === 'CEO' ? 'selected' : ''}>👑 대표 (CEO) - 관리자</option>
              <option value="DEV_LEAD" ${state.currentUser === 'DEV_LEAD' ? 'selected' : ''}>🛡️ 김개발 (개발팀장) - 리더</option>
              <option value="MKT_LEAD" ${state.currentUser === 'MKT_LEAD' ? 'selected' : ''}>🎨 이마케 (마케팅팀장) - 리더</option>
              <option value="CS_LEAD" ${state.currentUser === 'CS_LEAD' ? 'selected' : ''}>🎧 박운영 (CS/운영팀장) - 리더</option>
            </select>
          </div>

        </div>
      </div>

      <!-- Bottom Row: 6 RPG Flow Navigation Tabs (PRD & Screen Flow aligned) -->
      <nav class="flex items-center gap-1.5 border-t border-slate-800/80 pt-2.5 overflow-x-auto scrollbar-none">
        
        <!-- Tab 1: 문제 던전 -->
        <button data-tab="PROBLEM" class="nav-tab-btn px-3.5 py-2 rounded-xl text-xs font-extrabold transition-all flex items-center gap-2 whitespace-nowrap ${
          activeTab === 'PROBLEM' 
            ? 'bg-rose-600 text-white shadow-lg shadow-rose-500/25 ring-1 ring-rose-400' 
            : 'bg-slate-800/60 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
        }">
          <i class="fa-solid fa-dragon text-rose-400"></i>
          <span>⚔️ 문제 백로그 & 던전</span>
          <span class="ml-1 bg-rose-900/80 text-rose-200 text-[10px] px-1.5 py-0.2 rounded-full">${state.problems.length}</span>
        </button>

        <!-- Tab 2: OKR 퀘스트 보드 -->
        <button data-tab="OKR" class="nav-tab-btn px-3.5 py-2 rounded-xl text-xs font-extrabold transition-all flex items-center gap-2 whitespace-nowrap ${
          activeTab === 'OKR' 
            ? 'bg-purple-600 text-white shadow-lg shadow-purple-500/25 ring-1 ring-purple-400' 
            : 'bg-slate-800/60 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
        }">
          <i class="fa-solid fa-bullseye text-purple-400"></i>
          <span>🎯 OKR 퀘스트 보드</span>
        </button>

        <!-- Tab 3: 주간 체크인 & Slack 텔레포트 -->
        <button data-tab="WEEKLY" class="nav-tab-btn px-3.5 py-2 rounded-xl text-xs font-extrabold transition-all flex items-center gap-2 whitespace-nowrap ${
          activeTab === 'WEEKLY' 
            ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-500/25 ring-1 ring-indigo-400' 
            : 'bg-slate-800/60 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
        }">
          <i class="fa-brands fa-slack text-indigo-400"></i>
          <span>⚡ 주간 체크인 & Slack</span>
        </button>

        <!-- Tab 4: 월간 회의 & 액션 아이템 -->
        <button data-tab="MONTHLY" class="nav-tab-btn px-3.5 py-2 rounded-xl text-xs font-extrabold transition-all flex items-center gap-2 whitespace-nowrap ${
          activeTab === 'MONTHLY' 
            ? 'bg-amber-600 text-white shadow-lg shadow-amber-500/25 ring-1 ring-amber-400' 
            : 'bg-slate-800/60 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
        }">
          <i class="fa-solid fa-scroll text-amber-400"></i>
          <span>📜 월간 회의 & 현상금 수배</span>
          <span class="ml-1 bg-amber-900/80 text-amber-200 text-[10px] px-1.5 py-0.2 rounded-full">${state.actionItems.filter(a => !a.completed).length}</span>
        </button>

        <!-- Tab 5: Closeout & OKR 파티 -->
        <button data-tab="CLOSEOUT" class="nav-tab-btn px-3.5 py-2 rounded-xl text-xs font-extrabold transition-all flex items-center gap-2 whitespace-nowrap ${
          activeTab === 'CLOSEOUT' 
            ? 'bg-emerald-600 text-white shadow-lg shadow-emerald-500/25 ring-1 ring-emerald-400' 
            : 'bg-slate-800/60 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
        }">
          <i class="fa-solid fa-champagne-glasses text-emerald-400"></i>
          <span>🎉 마감 & OKR 파티</span>
        </button>

        <!-- Tab 6: RPG 분석 센터 -->
        <button data-tab="ANALYTICS" class="nav-tab-btn px-3.5 py-2 rounded-xl text-xs font-extrabold transition-all flex items-center gap-2 whitespace-nowrap ${
          activeTab === 'ANALYTICS' 
            ? 'bg-blue-600 text-white shadow-lg shadow-blue-500/25 ring-1 ring-blue-400' 
            : 'bg-slate-800/60 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
        }">
          <i class="fa-solid fa-chart-pie text-blue-400"></i>
          <span>📊 RPG 분석 센터</span>
        </button>

      </nav>
    </div>
  `;

  // Attach Event Listeners
  document.querySelectorAll('.nav-tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const tab = btn.getAttribute('data-tab');
      Store.setActiveTab(tab);
    });
  });

  document.getElementById('user-role-select')?.addEventListener('change', (e) => {
    Store.setUser(e.target.value);
  });
}
