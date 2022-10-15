declare global {
  namespace NodeJS {
    interface ProcessEnv {
      NODE_ENV: 'development' | 'production';
      NEXT_PUBLIC_GITHUB_CLIENT_ID: string;
    }
  }
}

export {};
