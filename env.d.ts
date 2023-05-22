/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string
  readonly VITE_APP_TRADERMADE_API_KEY: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}

declare module '@growthbunker/vueflags' {
  import { Plugin } from 'vue'

  const VueFlags: Plugin

  export default VueFlags
}
