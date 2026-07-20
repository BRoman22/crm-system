class RefreshTokenStorage {
  private readonly key = 'refreshToken';

  get(): string | null {
    try {
      return localStorage.getItem(this.key);
    } catch {
      return null;
    }
  }

  set(token: string): void {
    try {
      localStorage.setItem(this.key, token);
    } catch (error) {
      console.error('Не удалось сохранить refresh token', error);
    }
  }

  clear(): void {
    try {
      localStorage.removeItem(this.key);
    } catch (error) {
      console.error('Не удалось удалить refresh token', error);
    }
  }
}

export const refreshTokenStorage = new RefreshTokenStorage();
