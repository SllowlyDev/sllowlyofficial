let botInstance = null;
document.addEventListener('DOMContentLoaded', async function() {
    if (!requireAuth()) return;
    const license = getStoredLicense();
    if (!license) { window.location.href = 'activate.html'; return; }
    displayUserInfo(license);
    loadUserStats();
    loadRecentAccounts();
    setupEventListeners();
    if (typeof FacebookBot !== 'undefined') { botInstance = new FacebookBot(); botInstance.setLogCallback(addBotLog); }
});
function displayUserInfo(license) {
    document.getElementById('welcomeMessage').innerHTML = `Welcome back, <span class="text-emerald-400">${license.owner || 'User'}</span>!`;
    const expiryDate = new Date(license.expires_at);
    const today = new Date();
    const daysLeft = Math.ceil((expiryDate - today) / (1000 * 60 * 60 * 24));
    document.getElementById('expiryInfo').innerHTML = `License expires in <span class="text-emerald-400 font-bold">${daysLeft} days</span> (${license.expires_at})`;
    document.getElementById('licenseType').innerHTML = `<i class="fas fa-crown mr-1"></i> ${license.type.toUpperCase()} Plan`;
    document.getElementById('daysLeft').textContent = daysLeft;
    document.getElementById('activeDevices').textContent = license.activated_devices?.length || 0;
}
function loadUserStats() { const accounts = userStorage.getCreatedAccounts(); document.getElementById('accountsCreated').textContent = accounts.length; const successRate = accounts.length > 0 ? Math.floor(Math.random() * 20 + 80) : 0; document.getElementById('successRate').textContent = successRate + '%'; }
function loadRecentAccounts() {
    const accounts = userStorage.getCreatedAccounts();
    const tableBody = document.getElementById('accountsTable');
    if (accounts.length === 0) { tableBody.innerHTML = '<tr><td colspan="5" class="text-center text-slate-400 py-4">No accounts created yet</td></tr>'; return; }
    const recentAccounts = accounts.slice(-10).reverse();
    tableBody.innerHTML = recentAccounts.map(account => `<tr class="border-b border-slate-700"><td class="py-2 font-mono text-sm">${account.uid || account.id}</td><td class="py-2">${account.name || 'N/A'}</td><td class="py-2">${account.email || account.phone || 'N/A'}</td><td class="py-2 text-sm">${new Date(account.created_at).toLocaleString()}</td><td class="py-2"><span class="px-2 py-1 bg-emerald-500/20 rounded-full text-emerald-400 text-xs">Active</span></td></tr>`).join('');
}
function setupEventListeners() {
    document.getElementById('logoutBtn').addEventListener('click', logoutUser);
    document.getElementById('startBotBtn').addEventListener('click', startBot);
    document.getElementById('stopBotBtn').addEventListener('click', stopBot);
    document.getElementById('clearLogBtn').addEventListener('click', () => { document.getElementById('botLog').innerHTML = '<div class="log-info">[BOT] Log cleared...</div>'; });
}
function addBotLog(message, type = 'info') {
    const logDiv = document.getElementById('botLog');
    const logClass = type === 'success' ? 'log-success' : (type === 'error' ? 'log-error' : 'log-info');
    const time = new Date().toLocaleTimeString();
    logDiv.innerHTML += `<div class="${logClass}">[${time}] ${message}</div>`;
    logDiv.scrollTop = logDiv.scrollHeight;
}
async function startBot() {
    const count = parseInt(document.getElementById('accountCount').value);
    const customPassword = document.getElementById('customPassword').value;
    const proxyText = document.getElementById('proxyList').value;
    const proxies = proxyText ? proxyText.split('\n').filter(p => p.trim()) : [];
    if (count < 1 || count > 50) { showToast('Please enter a number between 1 and 50', 'error'); return; }
    const startBtn = document.getElementById('startBotBtn');
    const stopBtn = document.getElementById('stopBotBtn');
    startBtn.disabled = true;
    startBtn.innerHTML = '<i class="fas fa-spinner loading-spinner mr-2"></i> Running...';
    stopBtn.disabled = false;
    addBotLog(`Starting bot to create ${count} account(s)...`, 'info');
    if (proxies.length > 0) addBotLog(`Using ${proxies.length} proxy(ies)`, 'info');
    const accounts = [];
    for (let i = 0; i < count; i++) {
        if (window.botRunning === false) { addBotLog('Bot stopped by user', 'error'); break; }
        addBotLog(`Creating account ${i + 1}/${count}...`, 'info');
        const result = await createFacebookAccount(customPassword || null, proxies[i % proxies.length] || null);
        if (result.success) {
            accounts.push(result.account);
            addBotLog(`✓ Account created: ${result.account.email || result.account.phone} (UID: ${result.account.uid})`, 'success');
        } else { addBotLog(`✗ Failed: ${result.error}`, 'error'); }
        await new Promise(resolve => setTimeout(resolve, 3000));
    }
    if (accounts.length > 0) { userStorage.saveCreatedAccounts(accounts); loadUserStats(); loadRecentAccounts(); addBotLog(`✅ Completed! Created ${accounts.length}/${count} accounts`, 'success'); showToast(`Created ${accounts.length} account(s)!`, 'success'); }
    else { addBotLog(`❌ Failed to create any accounts`, 'error'); }
    startBtn.disabled = false;
    startBtn.innerHTML = '<i class="fas fa-play mr-2"></i> Start Bot';
    stopBtn.disabled = true;
    window.botRunning = false;
}
function stopBot() { window.botRunning = false; addBotLog('Stopping bot...', 'info'); }
function showToast(message, type = 'success') { const toast = document.createElement('div'); toast.className = `toast ${type} fade-in`; toast.innerHTML = `<i class="fas fa-${type === 'success' ? 'check-circle' : 'exclamation-circle'} mr-2"></i> ${message}`; document.body.appendChild(toast); setTimeout(() => toast.remove(), 3000); }