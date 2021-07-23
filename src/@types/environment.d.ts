type ReactEnvType = 'development' | 'staging' | 'production' | 'test';
type BooleanType = 'true' | 'false';

declare global {
  namespace NodeJS {
    interface ProcessEnv {
      PORT?: string;
      HOST?: string;
      HTTPS?: BooleanType;
      REACT_APP_NODE_ENV: ReactEnvType;
      REACT_APP_ENCRYPT_KEY?: string;
      REACT_APP_LOCAL_STORAGE_PREFIX?: string;
    }
  }
}

export {};
