/// <reference types="astro/client" />

interface ImportMetaEnv {
  readonly TURSO_DATABASE_URL: string;
  readonly TURSO_AUTH_TOKEN: string;
  readonly NEXT_PUBLIC_TINA_CLIENT_ID: string;
  readonly TINA_TOKEN: string;
  readonly TINA_PUBLIC_IS_LOCAL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
