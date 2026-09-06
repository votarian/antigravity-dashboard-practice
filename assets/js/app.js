/**
 * Main Application Entry Point with Tab Switching & Gamification Support
 */
import { Store } from './store.js';
import { renderHeader } from './components/header.js';
import { renderKPI } from './components/kpi.js';
import { renderGamificationSection } from './components/gamification.js';
import { renderFinancialSection } from './components/financial.js';
import { renderOKRSection } from './components/okr.js';
import { renderInventorySection } from './components/inventory.js';
import { renderMarketingSection } from './components/marketing.js';
import { renderB2BSection } from './components/b2b.js';
import { renderCSManualSection } from './components/cs_manual.js';

function updateActiveTabVisibility(activeTab) {
  document.querySelectorAll('.tab-content').forEach(el => el.classList.add('hidden'));

  switch (activeTab) {
    case 'QUEST':
      document.getElementById('tab-view-quest')?.classList.remove('hidden');
      renderGamificationSection();
      renderOKRSection();
      break;
    case 'FINANCIAL':
      document.getElementById('tab-view-financial')?.classList.remove('hidden');
      renderFinancialSection();
      renderB2BSection();
      break;
    case 'WORKSPACE':
      document.getElementById('tab-view-workspace')?.classList.remove('hidden');
      renderInventorySection();
      renderMarketingSection();
      break;
    case 'CS':
      document.getElementById('tab-view-cs')?.classList.remove('hidden');
      renderCSManualSection();
      break;
    default:
      document.getElementById('tab-view-quest')?.classList.remove('hidden');
      renderGamificationSection();
      renderOKRSection();
      break;
  }
}

function renderAll() {
  const state = Store.getState();
  renderHeader();
  renderKPI();
  updateActiveTabVisibility(state.activeTab || 'QUEST');
}

document.addEventListener('DOMContentLoaded', () => {
  renderAll();

  // Subscribe to store updates for reactive auto-rerendering
  Store.subscribe(() => {
    renderAll();
  });
});
