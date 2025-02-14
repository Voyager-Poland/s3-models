/**
 * Interface for translation services.
 * Provides a method to translate a given key with optional parameters.
 */
export interface Translation {
  /**
   * Translates the given key using the provided parameters.
   * @param key - The key to translate.
   * @param params - Optional parameters for the translation.
   * @returns The translated string.
   */
  translate(key: string, params?: any): string;
}

