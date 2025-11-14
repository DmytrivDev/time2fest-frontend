export function decodeJwt(token) {
  try {
    const payload = token.split('.')[1];
    if (!payload) return null;

    // Base64Url → Base64
    const base64 = payload.replace(/-/g, '+').replace(/_/g, '/');

    // Декодуємо в браузері без atob, без Buffer
    const decodedString = decodeURIComponent(
      window
        .atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );

    return JSON.parse(decodedString);

  } catch (err) {
    console.error('Failed to decode JWT:', err);
    return null;
  }
}
