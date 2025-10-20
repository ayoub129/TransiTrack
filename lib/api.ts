export const API_BASE_URL = process.env.EXPO_PUBLIC_API_URL || 'http://localhost:3000';
if (!process.env.EXPO_PUBLIC_API_URL) {
  // Helpful hint in dev if env not set
  // eslint-disable-next-line no-console
  console.warn('[api] EXPO_PUBLIC_API_URL not set, defaulting to http://localhost:3000');
}

type HttpMethod = 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export async function apiRequest<T>(path: string, options: { method?: HttpMethod; body?: any; token?: string } = {}): Promise<T> {
  const { method = 'GET', body, token } = options;
  try {
    const res = await fetch(`${API_BASE_URL}${path}`, {
      method,
      headers: {
        'Content-Type': 'application/json',
        ...(token ? { Authorization: `Bearer ${token}` } : {}),
      },
      body: body ? JSON.stringify(body) : undefined,
    });
    if (!res.ok) {
      let message = `Request failed: ${res.status}`;
      try {
        const data = await res.json();
        message = data?.message || data?.error || message;
        if (Array.isArray(data?.message)) message = data.message.join('\n');
      } catch {
        const text = await res.text();
        if (text) message = text;
      }
      throw new Error(message);
    }
    return res.json();
  } catch (err: any) {
    // Provide clearer guidance for typical Expo networking pitfalls
    const hint = `Network request failed. Ensure EXPO_PUBLIC_API_URL points to a reachable URL from your device (use your LAN IP, e.g. http://192.168.x.x:3000; Android emulator: http://10.0.2.2:3000).`;
    const message = err?.message?.includes('Network request failed') ? `${err.message} — ${hint}` : (err?.message || hint);
    throw new Error(message);
  }
}


