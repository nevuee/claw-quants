declare module 'next-pwa' {
    import { NextConfig } from 'next';

    export default function withPWA(config: {
        dest?: string;
        disable?: boolean;
        register?: boolean;
        scope?: string;
        sw?: string;
        skipWaiting?: boolean;
        runtimeCaching?: any[];
        buildExcludes?: string[];
        publicExcludes?: string[];
        cacheOnFrontEndNav?: boolean;
        reloadOnOnline?: boolean;
        subdomainPrefix?: string;
        fallbacks?: {
            [key: string]: string;
        };
        cacheStartUrl?: boolean;
        dynamicStartUrl?: boolean;
        dynamicStartUrlRedirect?: string;
    }): (nextConfig: NextConfig) => NextConfig;
}
