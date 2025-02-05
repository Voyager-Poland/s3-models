export interface Translation {
  translate(key: string, params?: any): string;
  setLanguage(lang: string): void;
  getLanguage(): string;
}