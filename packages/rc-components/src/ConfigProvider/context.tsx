import  React from 'react';


export interface IConfigContextProps {
    API_URL?:string
}

export const defaultConfig: IConfigContextProps = {
    API_URL: window.location.host.indexOf('.vercel.app') >-1 ? 'https://test-scm.kxgcc.com:30195':'',
  };

export const ConfigContext = React.createContext<IConfigContextProps>(defaultConfig)