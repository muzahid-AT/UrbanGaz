// Generic helpers
export function setItem(key, value) {
  localStorage.setItem(key, JSON.stringify(value));
}
export function getItem(key) {
  const v = localStorage.getItem(key);
  try { return v ? JSON.parse(v) : null; } catch { return v; }
}
export function removeItem(key) {
  localStorage.removeItem(key);
}

// Auth-specific
const AUTH_KEY = "auth_user";
export function saveUser(user) { setItem(AUTH_KEY, user); }
export function getUser() { return getItem(AUTH_KEY); }
export function removeUser() { removeItem(AUTH_KEY); }
