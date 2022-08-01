import React from 'react';
import { ConfigContext, defaultConfig, IConfigContextProps } from './context';

export const ConfigProvider: React.FC<{
  config?: IConfigContextProps;
  children?: React.ReactNode | React.ReactElement;
}> = ({ children, config = {} }) => {
  return (
    <ConfigContext.Consumer>
      {(originalConfig) => (
        <ConfigContext.Provider value={config || originalConfig}>{children}</ConfigContext.Provider>
      )}
    </ConfigContext.Consumer>
  );
};
