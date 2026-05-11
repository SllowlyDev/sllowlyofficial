async function getDeviceId() {
    const storedDeviceId = userStorage.getDeviceId();
    if (storedDeviceId) return storedDeviceId;
    const components = [];
    components.push(navigator.userAgent);
    components.push(`${screen.width}x${screen.height}x${screen.colorDepth}`);
    components.push(Intl.DateTimeFormat().resolvedOptions().timeZone);
    components.push(navigator.language);
    components.push(navigator.platform);
    const canvasFingerprint = await getCanvasFingerprint();
    components.push(canvasFingerprint);
    const webglFingerprint = getWebGLFingerprint();
    components.push(webglFingerprint);
    const combined = components.join('|');
    const deviceId = await hashString(combined);
    userStorage.saveDeviceId(deviceId);
    return deviceId;
}
async function getCanvasFingerprint() {
    return new Promise((resolve) => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        canvas.width = 200;
        canvas.height = 50;
        ctx.fillStyle = '#f60';
        ctx.fillRect(0, 0, 200, 50);
        ctx.fillStyle = '#069';
        ctx.font = '14px Arial';
        ctx.fillText('SllowlyTools', 10, 30);
        ctx.fillStyle = 'rgba(102, 204, 0, 0.7)';
        ctx.fillRect(100, 10, 80, 30);
        const dataURL = canvas.toDataURL();
        hashString(dataURL).then(resolve);
    });
}
function getWebGLFingerprint() {
    const canvas = document.createElement('canvas');
    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    if (!gl) return 'no_webgl';
    const debugInfo = gl.getExtension('WEBGL_debug_renderer_info');
    if (debugInfo) { const vendor = gl.getParameter(debugInfo.UNMASKED_VENDOR_WEBGL); const renderer = gl.getParameter(debugInfo.UNMASKED_RENDERER_WEBGL); return `${vendor}|${renderer}`; }
    return 'webgl_no_info';
}
async function hashString(str) { const encoder = new TextEncoder(); const data = encoder.encode(str); const hashBuffer = await crypto.subtle.digest('SHA-256', data); const hashArray = Array.from(new Uint8Array(hashBuffer)); const hashHex = hashArray.map(b => b.toString(16).padStart(2, '0')).join(''); return hashHex.substring(0, 32); }
function checkAuth() { const license = getStoredLicense(); if (!license) return false; if (!isLicenseValid(license)) { removeStoredLicense(); return false; } return true; }
function requireAuth() { if (!checkAuth() && !window.location.pathname.includes('activate.html') && !window.location.pathname.includes('index.html')) { window.location.href = 'activate.html'; return false; } return true; }
function adminLogin(password) { if (password === ADMIN_CREDENTIALS.password) { sessionStorage.setItem('admin_logged_in', 'true'); return true; } return false; }
function isAdminLoggedIn() { return sessionStorage.getItem('admin_logged_in') === 'true'; }
function adminLogout() { sessionStorage.removeItem('admin_logged_in'); }
function logoutUser() { removeStoredLicense(); userStorage.clearUserData(); window.location.href = 'index.html'; }