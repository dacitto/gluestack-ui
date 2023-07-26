import { get, onChange, set } from './core/colorMode';
import * as React from 'react';
import { Platform } from 'react-native';
import { propertyTokenMap } from './propertyTokenMap';
import type { COLORMODES } from './types';
import { platformSpecificSpaceUnits } from './utils';
import { createGlobalStylesWeb } from './createGlobalStylesWeb';
import { createGlobalStyles } from './createGlobalStyles';
import { GluestackStyleSheet } from './style-sheet';
type Config = any;
let colorModeSet = false;
let styleInjected = false;

export const defaultConfig: { config: Config; colorMode: COLORMODES } = {
  config: {},
  colorMode: 'light',
};

const defaultContextData: Config = defaultConfig;
const StyledContext = React.createContext<Config>(defaultContextData);

const setCurrentColorMode = (currentColorMode: string) => {
  if (currentColorMode) {
    set(currentColorMode === 'dark' ? 'dark' : 'light');
    colorModeSet = true;
  }
};
export const StyledProvider: React.FC<{
  config: Config;
  colorMode?: COLORMODES;
  children?: React.ReactNode;
  globalStyles?: any;
}> = ({ config, colorMode, children, globalStyles }) => {
  const currentConfig = React.useMemo(() => {
    //TODO: Add this later
    return platformSpecificSpaceUnits(config, Platform.OS);
  }, [config]);

  if (Platform.OS === 'web' && globalStyles) {
    const globalStyleInjector = createGlobalStylesWeb(globalStyles);
    globalStyleInjector({ ...currentConfig, propertyTokenMap });
  }

  if (!styleInjected) {
    GluestackStyleSheet.resolve({ ...config, propertyTokenMap });
    GluestackStyleSheet.injectInStyle();
    styleInjected = true;
  }

  const currentColorMode = React.useMemo(() => {
    return colorMode ?? get() ?? 'light';
  }, [colorMode]);

  React.useEffect(() => {
    // Add gs class name
    if (Platform.OS === 'web') {
      document.documentElement.classList.add(`gs`);
    }

    // GluestackStyleSheet.resolve({ ...config, propertyTokenMap });
    // GluestackStyleSheet.injectInStyle();

    onChange((currentColor: string) => {
      // only for web
      if (Platform.OS === 'web') {
        if (currentColor === 'dark') {
          document.documentElement.classList.remove(`gs-light`);
        } else {
          document.documentElement.classList.remove(`gs-dark`);
        }
        document.documentElement.classList.add(`gs-${currentColor}`);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  React.useEffect(() => {
    setCurrentColorMode(currentColorMode);
  }, [currentColorMode]);

  // Set colormode for the first time
  if (!colorModeSet) {
    setCurrentColorMode(currentColorMode);
  }

  const globalStyleMap =
    config.globalStyle && createGlobalStyles(config.globalStyle);

  const contextValue = React.useMemo(() => {
    return { config: currentConfig, globalStyle: globalStyleMap };
  }, [currentConfig, globalStyleMap]);

  return (
    <StyledContext.Provider value={contextValue}>
      {children}
    </StyledContext.Provider>
  );
};

export const useStyled = () => React.useContext(StyledContext);
