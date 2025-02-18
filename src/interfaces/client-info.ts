export interface ClientInfo {
	isBrowser(): boolean;
	isSSR(): boolean;
	getServiceVersion(): string;
}
