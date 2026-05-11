function generateRandomString(length) { const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789'; let result = ''; for (let i = 0; i < length; i++) result += chars.charAt(Math.floor(Math.random() * chars.length)); return result; }
function generateLicense(tier, durationDays = 30) {
    const tierMap = { basic: '1', pro: '2', enterprise: '3' };
    const tierCode = tierMap[tier] || '1';
    const randomPart = generateRandomString(12);
    const licenseKey = `${CONFIG.LICENSE_PREFIX}_${tierCode}${CONFIG.LICENSE_SEPARATOR}${randomPart}`;
    const now = new Date();
    const expiresAt = new Date(now);
    expiresAt.setDate(expiresAt.getDate() + durationDays);
    return { license_key: licenseKey, status: 'active', type: tier, created_at: now.toISOString().split('T')[0], expires_at: expiresAt.toISOString().split('T')[0], device_limit: CONFIG.PRICING[tier].devices, activated_devices: [], owner: '', features: CONFIG.FEATURES[tier] };
}
function validateLicenseFormat(licenseKey) { return /^SLLOWLY_[1-3]_8-[A-Z0-9]{12}$/.test(licenseKey); }
function parseLicenseTier(licenseKey) { const match = licenseKey.match(/^SLLOWLY_([1-3])_8-/); if (match) { const tierMap = { '1': 'basic', '2': 'pro', '3': 'enterprise' }; return tierMap[match[1]]; } return null; }
async function verifyLicense(licenseKey) {
    return new Promise((resolve) => {
        setTimeout(() => {
            if (!validateLicenseFormat(licenseKey)) { resolve({ success: false, error: 'Invalid Format', message: 'License key format is incorrect' }); return; }
            const license = MOCK_LICENSES.find(l => l.license_key === licenseKey);
            if (!license) { resolve({ success: false, error: 'Not Found', message: 'License key not found in our system' }); return; }
            if (license.status === 'revoked') { resolve({ success: false, error: 'Revoked', message: 'This license has been revoked' }); return; }
            const today = new Date();
            const expiresAt = new Date(license.expires_at);
            if (expiresAt < today) { license.status = 'expired'; resolve({ success: false, error: 'Expired', message: 'This license has expired' }); return; }
            resolve({ success: true, license: license });
        }, 1000);
    });
}
function checkDeviceLimit(license, newDeviceId) {
    const tier = license.type;
    const deviceLimit = CONFIG.PRICING[tier].devices;
    const currentDevices = license.activated_devices || [];
    const existingDevice = currentDevices.find(d => d.device_id === newDeviceId);
    if (existingDevice) return { allowed: true, newDevice: false, message: 'Device already activated' };
    if (deviceLimit === -1) return { allowed: true, newDevice: true, message: 'Enterprise plan - unlimited devices' };
    if (currentDevices.length >= deviceLimit) return { allowed: false, newDevice: false, message: `Device limit reached (${currentDevices.length}/${deviceLimit})` };
    return { allowed: true, newDevice: true, message: 'Device activation allowed' };
}
function saveLicense(license) { const encrypted = btoa(JSON.stringify(license)); localStorage.setItem(CONFIG.STORAGE_KEYS.LICENSE, encrypted); }
function getStoredLicense() { const encrypted = localStorage.getItem(CONFIG.STORAGE_KEYS.LICENSE); if (!encrypted) return null; try { return JSON.parse(atob(encrypted)); } catch (e) { return null; } }
function removeStoredLicense() { localStorage.removeItem(CONFIG.STORAGE_KEYS.LICENSE); }
function isLicenseValid(license) { if (!license || license.status !== 'active') return false; const today = new Date(); const expiresAt = new Date(license.expires_at); return expiresAt >= today; }