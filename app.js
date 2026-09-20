const $ = (selector) => document.querySelector(selector);
const input = $('#input');
const sample = `{
  "orderId": "ord_8821",
  "customer": "Northstar Labs",
  "items": [{"sku":"starter","qty":2}],
  "total": 1280,
  "currency": "USD",
  "paid": false
}`;
const history = JSON.parse(localStorage.getItem('apicompass-history') || '[]');

function toast(message) { const el = $('#toast'); el.textContent = message; el.classList.add('show'); setTimeout(() => el.classList.remove('show'), 2600); }
function depth(value) { if (value === null || typeof value !== 'object') return 0; const values = Array.isArray(value) ? value : Object.values(value); return values.length ? 1 + Math.max(...values.map(depth)) : 1; }
function escapeHtml(text) { return text.replace(/[&<>]/g, char => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;' }[char])); }
function getPath(value, path) { const tokens = path.replace(/\[(\d+)\]/g, '.$1').split('.').filter(Boolean); return tokens.reduce((current, token) => current == null ? undefined : current[token], value); }
function rememberPayload(payload) { const compact = payload.replace(/\s+/g, ' ').trim(); if (!compact) return; history.unshift({ id: Date.now(), label: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }), payload: compact }); history.splice(5); localStorage.setItem('apicompass-history', JSON.stringify(history)); renderHistory(); }
function renderHistory() { $('#history-list').innerHTML = history.map(item => `<button class="history-item" data-history-id="${item.id}"><span class="history-icon">↺</span><span><strong>${escapeHtml(item.label)}</strong><small>${escapeHtml(item.payload.slice(0, 58))}${item.payload.length > 58 ? '…' : ''}</small></span></button>`).join('') || '<div class="history-empty">Your recent payloads will appear here.</div>'; document.querySelectorAll('.history-item').forEach(button => button.addEventListener('click', () => { const item = history.find(entry => String(entry.id) === button.dataset.historyId); if (item) { input.value = JSON.stringify(JSON.parse(item.payload), null, 2); update('none'); toast('Payload restored from history.'); } })); }
function updatePath() { try { const data = JSON.parse(input.value); const path = $('#path-input').value.trim(); if (!path) { $('#path-result').textContent = 'Enter a path to inspect a value.'; return; } const value = getPath(data, path); $('#path-result').textContent = value === undefined ? 'No value found at this path.' : JSON.stringify(value); $('#path-result').classList.toggle('missing', value === undefined); } catch { $('#path-result').textContent = 'Fix the JSON before querying it.'; $('#path-result').classList.add('missing'); } }
function update(mode = 'pretty') {
  try {
    const data = JSON.parse(input.value); const pretty = JSON.stringify(data, null, mode === 'pretty' ? 2 : 0); if (mode === 'pretty') input.value = pretty;
    const keys = data && typeof data === 'object' && !Array.isArray(data) ? Object.keys(data).length : 0; const d = depth(data); const chars = input.value.length;
    $('#hero-status').textContent = 'Payload is valid'; $('#hero-sub').textContent = 'Your data is parsed locally and ready to ship.'; $('#validation').textContent = '✓ Valid JSON'; $('#result-pill').textContent = 'Valid'; $('#result-pill').className = 'pill';
    $('#key-count').textContent = keys; $('#size').textContent = `${new Blob([input.value]).size} B`; $('#metric-keys').textContent = keys; $('#metric-depth').textContent = d; $('#metric-lines').textContent = input.value.split('\n').length; $('#r-keys').textContent = keys; $('#r-depth').textContent = `${d} levels`; $('#r-chars').textContent = chars; $('#preview').innerHTML = `<pre>${escapeHtml(pretty).slice(0, 1200)}</pre>`; input.classList.remove('invalid'); rememberPayload(input.value); updatePath();
  } catch (error) { $('#hero-status').textContent = 'Payload needs attention'; $('#hero-sub').textContent = error.message; $('#validation').textContent = '× Invalid JSON'; $('#result-pill').textContent = 'Invalid'; $('#result-pill').className = 'pill red'; input.classList.add('invalid'); updatePath(); }
}
$('#format').onclick = () => { update('pretty'); toast('JSON formatted.'); };
$('#minify').onclick = () => { update('minify'); toast('JSON minified.'); };
$('#sample').onclick = () => { input.value = sample; update('pretty'); toast('Sample payload loaded.'); };
$('#copy').onclick = async () => { await navigator.clipboard?.writeText(input.value); toast('Formatted JSON copied.'); };
$('#copy-top').onclick = () => $('#copy').click();
$('#path-input').oninput = updatePath;
$('#path-copy').onclick = async () => { const value = $('#path-result').textContent; if (!value.startsWith('No value') && !value.startsWith('Fix the')) { await navigator.clipboard?.writeText(value); toast('Path value copied.'); } };
$('#clear-history').onclick = () => { history.splice(0); localStorage.removeItem('apicompass-history'); renderHistory(); toast('Payload history cleared.'); };
input.oninput = () => update('none');
document.addEventListener('keydown', event => { if ((event.metaKey || event.ctrlKey) && event.key === 'Enter') { event.preventDefault(); update('pretty'); } });
if ('serviceWorker' in navigator) navigator.serviceWorker.register('sw.js').catch(() => {});
renderHistory(); update('pretty');
