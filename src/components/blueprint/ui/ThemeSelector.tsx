import React, { useState } from 'react';
import { BlueprintOS } from '../../../core/blueprint/BlueprintOS';

interface ThemeSelectorProps {
  blueprintOS: BlueprintOS;
  onThemeChange?: () => void;
}

export const ThemeSelector: React.FC<ThemeSelectorProps> = ({
  blueprintOS,
  onThemeChange,
}) => {
  const themes = blueprintOS.theme.getAvailableThemes();
  const currentTheme = blueprintOS.theme.getCurrentTheme();

  const [, forceUpdate] = useState(0);

  const handleThemeApply = (themeId: string) => {
    blueprintOS.theme.applyTheme(themeId);
    forceUpdate((prev) => prev + 1);
    if (onThemeChange) {
      onThemeChange();
    }
  };

  return (
    <div className="flex items-center gap-2 font-blueprint select-none text-[9px]">
      <span className="text-blueprint-accent/50 font-bold uppercase tracking-wider">
        THEME:
      </span>
      <div className="flex gap-1.5 flex-wrap">
        {themes.map((t) => (
          <button
            key={t.id}
            onClick={() => handleThemeApply(t.id)}
            className={`px-2 py-0.5 border rounded-sm font-bold uppercase transition-all tracking-wider text-[8px] ${
              t.id === currentTheme.id
                ? 'bg-blueprint-accent text-blueprint-bg border-blueprint-accent shadow-[0_0_6px_rgba(0,240,255,0.3)]'
                : 'border-blueprint-accent/15 text-blueprint-accent/60 hover:text-blueprint-accent hover:border-blueprint-accent/35'
            }`}
          >
            {t.id.replace('_', ' ')}
          </button>
        ))}
      </div>
    </div>
  );
};
