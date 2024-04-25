/// <reference types="vite/client" />
/// <reference types="vite-plugin-svgr/client" />

interface ImportMetaEnv {
  readonly VITE_BACKEND_API_URL: string;
  readonly VITE_STRIPE_API_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
