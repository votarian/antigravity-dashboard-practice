/**
 * Slack Incoming Webhook Integration Service
 */
import { Store } from '../store.js';

export async function sendFinancialReportToSlack() {
  const state = Store.getState();
  const latestFinancial = state.financial.monthlyTrend[state.financial.monthlyTrend.length - 1];
  const lowStockItems = state.inventory.items.filter(i => i.current < i.safety);
  const pendingMarketing = state.marketing.filter(m => m.column === 'CEO_FEEDBACK');

  const reportText = `
🚀 *[2인 조직 실시간 경영 손익 보고서]*
• *보고 일시:* ${new Date().toLocaleString('ko-KR')}
• *발송자:* ${state.currentUser === 'CEO' ? '대표 (CEO)' : '부장 (Manager)'}

📊 *손익 주요 지표 (${latestFinancial.month}):*
- 누적 매출액: *${latestFinancial.revenue.toLocaleString()} 만원*
- 누적 순수익: *${latestFinancial.profit.toLocaleString()} 만원*
- 평균 마진율: *${latestFinancial.margin}%*

⚠️ *주요 이슈 & 알림:*
- 안전재고 미달 품목: *${lowStockItems.length}건* ${lowStockItems.map(i => `(${i.name}: ${i.current}/${i.safety}EA)`).join(', ')}
- 대표 승인 대기 시안: *${pendingMarketing.length}건*

대시보드 바로가기: http://localhost:8080
  `.trim();

  const webhookUrl = state.settings.slackWebhookUrl;

  if (webhookUrl && webhookUrl.startsWith('http')) {
    try {
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: reportText })
      });
      if (response.ok) {
        showToast('Slack 채널로 경영 보고서가 성공적으로 전송되었습니다!', 'success');
      } else {
        showToast('Slack 전송 실패 (HTTP ' + response.status + ')', 'error');
      }
    } catch (e) {
      showToast('Slack API 통신 오류: ' + e.message, 'error');
    }
  } else {
    // Simulated Mode
    showToast('[테스트 모드] Slack Webhook URL 미설정 - 보고서 생성 완료!', 'info');
    console.log('--- Slack Webhook Output ---');
    console.log(reportText);
    alert(`[Slack Webhook 전송 메시지 미리보기]\n\n${reportText}`);
  }
}

export async function sendWeeklyOkrReportToSlack() {
  const state = Store.getState();
  const okr = state.okr;
  const latestWeek = okr.weeklyTrend[okr.weeklyTrend.length - 1];

  const reportText = `
🎯 *[주간 OKR 달성 현황 보고서]*
• *전사 달성률:* *${latestWeek.company}%*
• *대표 달성률:* *${latestWeek.ceo}%*
• *부장 달성률:* *${latestWeek.manager}%*

📌 *주요 실행 과제 (Initiatives) 현황:*
- 대표 미완료 과제: ${okr.ceo.initiatives.filter(i => !i.completed).map(i => i.text).join(', ') || '모두 완료!'}
- 부장 미완료 과제: ${okr.manager.initiatives.filter(i => !i.completed).map(i => i.text).join(', ') || '모두 완료!'}
  `.trim();

  const webhookUrl = state.settings.slackWebhookUrl;

  if (webhookUrl && webhookUrl.startsWith('http')) {
    try {
      await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: reportText })
      });
      showToast('Slack 채널로 주간 OKR 보고서가 전송되었습니다!', 'success');
    } catch (e) {
      showToast('Slack API 통신 오류: ' + e.message, 'error');
    }
  } else {
    showToast('[테스트 모드] Slack Webhook URL 미설정 - 주간 OKR 보고서 시뮬레이션 완료!', 'info');
    console.log(reportText);
    alert(`[Slack 주간 OKR 메시지 미리보기]\n\n${reportText}`);
  }
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
