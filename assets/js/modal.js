/**
 * Shared Modal Controller (Settings, Inventory, B2B, Marketing Approval)
 */
import { Store } from './store.js';
import { getNotionSyncSchema, syncDataToNotion } from './services/notion.js';

let activeModalOverlay = null;

function createModalContainer(title, bodyHtml, footerHtml = '') {
  closeActiveModal();

  const overlay = document.createElement('div');
  overlay.className = 'fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-md flex items-center justify-center p-4 animation-fadeIn';

  overlay.innerHTML = `
    <div class="bg-slate-900 border border-slate-700/80 rounded-2xl max-w-xl w-full p-6 shadow-2xl space-y-5 transform transition-all scale-100 relative">
      <div class="flex items-center justify-between pb-3 border-b border-slate-800">
        <h3 class="text-base font-bold text-white flex items-center gap-2">${title}</h3>
        <button id="modal-close-btn" class="w-8 h-8 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white flex items-center justify-center transition-colors">
          <i class="fa-solid fa-xmark"></i>
        </button>
      </div>

      <div class="space-y-4 max-h-[70vh] overflow-y-auto pr-1">
        ${bodyHtml}
      </div>

      ${footerHtml ? `
        <div class="pt-3 border-t border-slate-800 flex items-center justify-end gap-2">
          ${footerHtml}
        </div>
      ` : ''}
    </div>
  `;

  document.body.appendChild(overlay);
  activeModalOverlay = overlay;

  overlay.querySelector('#modal-close-btn')?.addEventListener('click', closeActiveModal);
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closeActiveModal();
  });

  return overlay;
}

export function closeActiveModal() {
  if (activeModalOverlay) {
    activeModalOverlay.remove();
    activeModalOverlay = null;
  }
}

// 1. Settings Modal
export function openSettingsModal() {
  const state = Store.getState();
  const schemaJson = JSON.stringify(getNotionSyncSchema(), null, 2);

  const bodyHtml = `
    <div class="space-y-4 text-xs">
      <div>
        <label class="block font-bold text-slate-300 mb-1">
          <i class="fa-brands fa-slack text-amber-400 mr-1"></i> Slack Incoming Webhook URL
        </label>
        <input type="text" id="setting-slack-url" value="${state.settings.slackWebhookUrl || ''}" placeholder="https://hooks.slack.com/services/..." class="w-full bg-slate-950 border border-slate-700 text-white rounded-xl p-2.5 text-xs focus:border-blue-500 focus:outline-none" />
        <p class="text-[11px] text-slate-500 mt-1">경영 손익 및 주간 OKR 보고서를 전송할 슬랙 채널 Webhook 주소</p>
      </div>

      <div>
        <label class="block font-bold text-slate-300 mb-1">
          <i class="fa-solid fa-book text-emerald-400 mr-1"></i> Notion Internal Integration API Key
        </label>
        <input type="password" id="setting-notion-key" value="${state.settings.notionApiKey || ''}" placeholder="secret_..." class="w-full bg-slate-950 border border-slate-700 text-white rounded-xl p-2.5 text-xs focus:border-blue-500 focus:outline-none" />
      </div>

      <div>
        <label class="block font-bold text-slate-300 mb-1">
          Notion Database ID
        </label>
        <input type="text" id="setting-notion-dbid" value="${state.settings.notionDatabaseId || ''}" placeholder="32자리 데이터베이스 ID" class="w-full bg-slate-950 border border-slate-700 text-white rounded-xl p-2.5 text-xs focus:border-blue-500 focus:outline-none" />
      </div>

      <div>
        <div class="flex items-center justify-between mb-1">
          <label class="font-bold text-slate-300">
            <i class="fa-solid fa-code text-purple-400 mr-1"></i> Notion JSON Sync Schema 미리보기
          </label>
          <button id="btn-sync-notion-now" class="text-[11px] text-purple-400 hover:text-purple-300 font-bold underline">
            지금 동기화 실행
          </button>
        </div>
        <pre class="bg-slate-950 p-3 rounded-xl border border-slate-800 text-[10px] text-slate-400 font-mono max-h-40 overflow-y-auto">${schemaJson}</pre>
      </div>
    </div>
  `;

  const footerHtml = `
    <button id="btn-cancel-settings" class="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl font-bold text-xs">취소</button>
    <button id="btn-save-settings" class="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold text-xs shadow-md">저장하기</button>
  `;

  const modal = createModalContainer('<i class="fa-solid fa-gear text-slate-400 mr-2"></i> 대시보드 API & 외부 서비스 환경설정', bodyHtml, footerHtml);

  modal.querySelector('#btn-cancel-settings')?.addEventListener('click', closeActiveModal);

  modal.querySelector('#btn-save-settings')?.addEventListener('click', () => {
    const slackUrl = modal.querySelector('#setting-slack-url').value.trim();
    const notionKey = modal.querySelector('#setting-notion-key').value.trim();
    const notionDbid = modal.querySelector('#setting-notion-dbid').value.trim();

    Store.saveSettings({
      slackWebhookUrl: slackUrl,
      notionApiKey: notionKey,
      notionDatabaseId: notionDbid
    });

    closeActiveModal();
  });

  modal.querySelector('#btn-sync-notion-now')?.addEventListener('click', () => {
    syncDataToNotion();
  });
}

// 2. Stock Log Modal
export function openStockModal() {
  const state = Store.getState();
  const items = state.inventory.items;

  const bodyHtml = `
    <form id="stock-form" class="space-y-4 text-xs">
      <div>
        <label class="block font-bold text-slate-300 mb-1">대상 품목 선택</label>
        <select id="stock-item-id" class="w-full bg-slate-950 border border-slate-700 text-white rounded-xl p-2.5 text-xs focus:border-blue-500 focus:outline-none">
          ${items.map(i => `<option value="${i.id}">${i.name} (현재: ${i.current}EA)</option>`).join('')}
        </select>
      </div>

      <div class="grid grid-cols-2 gap-3">
        <div>
          <label class="block font-bold text-slate-300 mb-1">구분</label>
          <select id="stock-type" class="w-full bg-slate-950 border border-slate-700 text-white rounded-xl p-2.5 text-xs focus:border-blue-500 focus:outline-none">
            <option value="IN">입고 (+)</option>
            <option value="OUT">출고 (-)</option>
          </select>
        </div>

        <div>
          <label class="block font-bold text-slate-300 mb-1">수량 (EA)</label>
          <input type="number" id="stock-qty" min="1" value="10" required class="w-full bg-slate-950 border border-slate-700 text-white rounded-xl p-2.5 text-xs focus:border-blue-500 focus:outline-none" />
        </div>
      </div>

      <div>
        <label class="block font-bold text-slate-300 mb-1">입출고 사유 / 거래처 비고</label>
        <input type="text" id="stock-note" placeholder="예: 3차 정기 생산 입고 / (주)OO건설 출고" required class="w-full bg-slate-950 border border-slate-700 text-white rounded-xl p-2.5 text-xs focus:border-blue-500 focus:outline-none" />
      </div>
    </form>
  `;

  const footerHtml = `
    <button id="btn-cancel-stock" class="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl font-bold text-xs">취소</button>
    <button id="btn-submit-stock" class="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-slate-950 rounded-xl font-bold text-xs shadow-md">입출고 등록</button>
  `;

  const modal = createModalContainer('<i class="fa-solid fa-boxes-packing text-amber-400 mr-2"></i> 품목 입출고 등록', bodyHtml, footerHtml);

  modal.querySelector('#btn-cancel-stock')?.addEventListener('click', closeActiveModal);
  modal.querySelector('#btn-submit-stock')?.addEventListener('click', () => {
    const itemId = modal.querySelector('#stock-item-id').value;
    const type = modal.querySelector('#stock-type').value;
    const qty = modal.querySelector('#stock-qty').value;
    const note = modal.querySelector('#stock-note').value.trim();

    if (!note) {
      alert('입출고 사유를 입력해주세요.');
      return;
    }

    Store.addStockLog(itemId, qty, type, note);
    closeActiveModal();
  });
}

// 3. B2B Modal
export function openB2BModal() {
  const bodyHtml = `
    <form id="b2b-form" class="space-y-4 text-xs">
      <div>
        <label class="block font-bold text-slate-300 mb-1">기업 거래처명</label>
        <input type="text" id="b2b-client" placeholder="(주)대한기업" required class="w-full bg-slate-950 border border-slate-700 text-white rounded-xl p-2.5 text-xs focus:border-blue-500 focus:outline-none" />
      </div>

      <div class="grid grid-cols-2 gap-3">
        <div>
          <label class="block font-bold text-slate-300 mb-1">담당자 및 연락처</label>
          <input type="text" id="b2b-contact" placeholder="홍길동 팀장 (010-0000-0000)" required class="w-full bg-slate-950 border border-slate-700 text-white rounded-xl p-2.5 text-xs focus:border-blue-500 focus:outline-none" />
        </div>
        <div>
          <label class="block font-bold text-slate-300 mb-1">견적 금액 (원)</label>
          <input type="number" id="b2b-amount" placeholder="35000000" step="10000" required class="w-full bg-slate-950 border border-slate-700 text-white rounded-xl p-2.5 text-xs focus:border-blue-500 focus:outline-none" />
        </div>
      </div>

      <div class="grid grid-cols-2 gap-3">
        <div>
          <label class="block font-bold text-slate-300 mb-1">계약 상태</label>
          <select id="b2b-status" class="w-full bg-slate-950 border border-slate-700 text-white rounded-xl p-2.5 text-xs focus:border-blue-500 focus:outline-none">
            <option value="CONTACTING">접촉중</option>
            <option value="PROPOSAL" selected>견적제안</option>
            <option value="CONTRACTED">계약완료</option>
            <option value="DELIVERY_PENDING">출고대기</option>
            <option value="COMPLETED">완료</option>
          </select>
        </div>
        <div>
          <label class="block font-bold text-slate-300 mb-1">출고 예정일</label>
          <input type="date" id="b2b-date" value="${new Date().toISOString().split('T')[0]}" class="w-full bg-slate-950 border border-slate-700 text-white rounded-xl p-2.5 text-xs focus:border-blue-500 focus:outline-none" />
        </div>
      </div>

      <div>
        <label class="block font-bold text-slate-300 mb-1">미팅록 및 비고</label>
        <textarea id="b2b-note" rows="3" placeholder="미팅 결과, 특이사항, 대표 승인 요구사항" class="w-full bg-slate-950 border border-slate-700 text-white rounded-xl p-2.5 text-xs focus:border-blue-500 focus:outline-none"></textarea>
      </div>
    </form>
  `;

  const footerHtml = `
    <button id="btn-cancel-b2b" class="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl font-bold text-xs">취소</button>
    <button id="btn-submit-b2b" class="px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold text-xs shadow-md">B2B 거래처 등록</button>
  `;

  const modal = createModalContainer('<i class="fa-solid fa-handshake text-blue-400 mr-2"></i> B2B 영업 파이프라인 신규 등록', bodyHtml, footerHtml);

  modal.querySelector('#btn-cancel-b2b')?.addEventListener('click', closeActiveModal);
  modal.querySelector('#btn-submit-b2b')?.addEventListener('click', () => {
    const client = modal.querySelector('#b2b-client').value.trim();
    const contact = modal.querySelector('#b2b-contact').value.trim();
    const amount = modal.querySelector('#b2b-amount').value;
    const status = modal.querySelector('#b2b-status').value;
    const date = modal.querySelector('#b2b-date').value;
    const note = modal.querySelector('#b2b-note').value.trim();

    if (!client || !contact || !amount) {
      alert('필수 정보를 모두 입력해주세요.');
      return;
    }

    Store.addOrUpdateB2B({ client, contact, amount, status, date, note });
    closeActiveModal();
  });
}

// 4. New Marketing Modal
export function openNewMarketingModal() {
  const bodyHtml = `
    <form id="mkt-form" class="space-y-4 text-xs">
      <div>
        <label class="block font-bold text-slate-300 mb-1">콘텐츠 시안 제목</label>
        <input type="text" id="mkt-title" placeholder="예: Q4 신제품 브랜드 SNS 숏폼 영상 시안" required class="w-full bg-slate-950 border border-slate-700 text-white rounded-xl p-2.5 text-xs focus:border-blue-500 focus:outline-none" />
      </div>

      <div>
        <label class="block font-bold text-slate-300 mb-1">Figma / Canva 디자인 시안 URL</label>
        <input type="url" id="mkt-url" placeholder="https://canva.com/design/..." class="w-full bg-slate-950 border border-slate-700 text-white rounded-xl p-2.5 text-xs focus:border-blue-500 focus:outline-none" />
      </div>
    </form>
  `;

  const footerHtml = `
    <button id="btn-cancel-mkt" class="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl font-bold text-xs">취소</button>
    <button id="btn-submit-mkt" class="px-4 py-2 bg-purple-600 hover:bg-purple-500 text-white rounded-xl font-bold text-xs shadow-md">시안 등록</button>
  `;

  const modal = createModalContainer('<i class="fa-solid fa-pen-nib text-purple-400 mr-2"></i> 신규 마케팅 시안 등록', bodyHtml, footerHtml);

  modal.querySelector('#btn-cancel-mkt')?.addEventListener('click', closeActiveModal);
  modal.querySelector('#btn-submit-mkt')?.addEventListener('click', () => {
    const title = modal.querySelector('#mkt-title').value.trim();
    const designUrl = modal.querySelector('#mkt-url').value.trim();

    if (!title) {
      alert('제목을 입력해주세요.');
      return;
    }

    Store.addMarketingCard({ title, designUrl });
    closeActiveModal();
  });
}

// 5. Marketing Approval Modal (CEO)
export function openMarketingApprovalModal(cardId) {
  const state = Store.getState();
  const card = state.marketing.find(m => m.id === cardId);
  if (!card) return;

  const bodyHtml = `
    <div class="space-y-4 text-xs">
      <div class="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1.5">
        <span class="text-purple-400 font-mono">${card.id}</span>
        <h4 class="text-sm font-bold text-white">${card.title}</h4>
        <p class="text-slate-400">작성자: ${card.author} | 등록일: ${card.updatedAt}</p>
        ${card.designUrl ? `<a href="${card.designUrl}" target="_blank" class="text-blue-400 hover:underline block pt-1">🔗 시안 열기 (${card.designUrl})</a>` : ''}
      </div>

      <div>
        <label class="block font-bold text-slate-300 mb-1">
          <i class="fa-solid fa-comment-dots text-amber-400 mr-1"></i> 대표 코멘트 / 보완 피드백
        </label>
        <textarea id="mkt-feedback-text" rows="3" placeholder="대표 검토 의견을 입력하세요. (예: 썸네일 폰트 변경 후 승인 예정)" class="w-full bg-slate-950 border border-slate-700 text-white rounded-xl p-2.5 text-xs focus:border-purple-500 focus:outline-none">${card.feedback || ''}</textarea>
      </div>
    </div>
  `;

  const footerHtml = `
    <button id="btn-reject-mkt" class="px-3.5 py-2 bg-rose-600/30 hover:bg-rose-600/50 text-rose-300 border border-rose-500/40 rounded-xl font-bold text-xs">
      <i class="fa-solid fa-rotate-left mr-1"></i> 보완 요청 (제작중 이동)
    </button>
    <button id="btn-approve-mkt" class="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl font-bold text-xs shadow-md">
      <i class="fa-solid fa-circle-check mr-1"></i> 최종 승인 및 발행 완료
    </button>
  `;

  const modal = createModalContainer('<i class="fa-solid fa-stamp text-purple-400 mr-2"></i> 대표 마케팅 시안 결재 & 피드백', bodyHtml, footerHtml);

  modal.querySelector('#btn-reject-mkt')?.addEventListener('click', () => {
    const feedback = modal.querySelector('#mkt-feedback-text').value.trim();
    Store.approveMarketingCard(cardId, feedback, false);
    closeActiveModal();
  });

  modal.querySelector('#btn-approve-mkt')?.addEventListener('click', () => {
    const feedback = modal.querySelector('#mkt-feedback-text').value.trim();
    Store.approveMarketingCard(cardId, feedback, true);
    closeActiveModal();
  });
}
