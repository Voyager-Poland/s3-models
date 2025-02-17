
export interface CookieOptions {
	maxAge?: number;
	domain?: string;
	secure?: boolean;
	sameSite?: 'Strict' | 'Lax' | 'None';
}
