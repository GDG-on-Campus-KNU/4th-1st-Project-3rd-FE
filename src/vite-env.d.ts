/// <reference types="vite/client" />
interface ImportMetaEnv {
  readonly VITE_API_BASE_URL: string;
  readonly VITE_WEB_SOCKET_URL: string;
  readonly VITE_MSW: boolean;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
