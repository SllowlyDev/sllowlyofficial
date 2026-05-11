const CONFIG = {
    APP_NAME: 'SllowlyTools',
    VERSION: '1.8.0',
    LICENSE_PREFIX: 'SLLOWLY',
    LICENSE_SEPARATOR: '_8-',
    STORAGE_KEYS: { LICENSE: 'sllowly_license', DEVICE_ID: 'sllowly_device_id', AUTH_TOKEN: 'sllowly_auth_token', USER_DATA: 'sllowly_user_data', CREATED_ACCOUNTS: 'sllowly_created_accounts' },
    PRICING: { basic: { price: 29, devices: 1 }, pro: { price: 79, devices: 3 }, enterprise: { price: 199, devices: -1 } },
    FEATURES: { basic: ['auto_register', 'uid_check'], pro: ['auto_register', 'uid_check', 'cookie_management', 'priority_support'], enterprise: ['auto_register', 'uid_check', 'cookie_management', 'proxy_support', 'priority_support', 'api_access'] }
};
const MOCK_LICENSES = [
    { license_key: "SLLOWLY_1_8-A7B9C2D4E8F1", status: "active", type: "basic", created_at: "2024-11-01", expires_at: "2024-12-01", device_limit: 1, activated_devices: [], owner: "john_doe", features: ["auto_register", "uid_check"] },
    { license_key: "SLLOWLY_2_8-F3E5D7C9B1A2", status: "active", type: "pro", created_at: "2024-11-05", expires_at: "2024-12-05", device_limit: 3, activated_devices: [], owner: "jane_smith", features: ["auto_register", "uid_check", "cookie_management", "priority_support"] },
    { license_key: "SLLOWLY_3_8-X4Y5Z6W7V8U9", status: "active", type: "enterprise", created_at: "2024-11-10", expires_at: "2024-12-10", device_limit: -1, activated_devices: [], owner: "big_corp", features: ["auto_register", "uid_check", "cookie_management", "proxy_support", "priority_support", "api_access"] },
    { license_key: "SLLOWLY_1_8-L9M8N7B6V5C4", status: "expired", type: "basic", created_at: "2024-10-01", expires_at: "2024-11-01", device_limit: 1, activated_devices: [], owner: "expired_user", features: ["auto_register", "uid_check"] },
    { license_key: "SLLOWLY_2_8-Q1W2E3R4T5Y6", status: "revoked", type: "pro", created_at: "2024-10-15", expires_at: "2024-11-15", device_limit: 3, activated_devices: [], owner: "revoked_user", features: ["auto_register", "uid_check", "cookie_management", "priority_support"] }
];
const ADMIN_CREDENTIALS = { username: 'admin', password: 'SllowlyAdmin2026!' };