/// <reference types="vite/client" />
/// <reference types="vite-plugin-pages/client" />

import Kitsu from "kitsu";

interface ImportMetaEnv {
    readonly VITE_BASE_URL: string
    readonly VITE_API_ENDPOINT: string
    // more env variables...
}

interface ImportMeta {
    readonly env: ImportMetaEnv
}

declare global {
    const $filters: {
        timeAgo(): string,
        dateTime(date: any): string,
        trl(n: any): string
    };

}
