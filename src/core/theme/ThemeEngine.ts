import { ThemeConfig } from '../../types/blueprint';
import { themeRegistry } from './themeRegistry';

export class ThemeEngine {
  private currentThemeId: string = 'cad_dark';

  public applyTheme(themeId: string, element?: HTMLElement): void {
    const config = themeRegistry[themeId];
    if (!config) {
      console.warn(`[ThemeEngine] Theme with id "${themeId}" not found.`);
      return;
    }

    const target = element || document.documentElement;
    Object.entries(config.cssVariables).forEach(([key, val]) => {
      target.style.setProperty(key, val);
    });

    this.currentThemeId = themeId;
    console.log(`[ThemeEngine] Applied theme: ${config.name}`);
  }

  public getCurrentTheme(): ThemeConfig {
    return themeRegistry[this.currentThemeId] || themeRegistry['cad_dark'];
  }

  public getAvailableThemes(): ThemeConfig[] {
    return Object.values(themeRegistry);
  }
}
