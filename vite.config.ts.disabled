import { defineConfig } from 'vite';
import { resolve } from 'path';
import legacy from '@vitejs/plugin-legacy';
import { VitePWA } from 'vite-plugin-pwa';
import compression from 'vite-plugin-compression';
// import eslint from 'vite-plugin-eslint';
import { createHtmlPlugin } from 'vite-plugin-html';

export default defineConfig({
  root: 'public',
  
  build: {
    outDir: '../dist',
    emptyOutDir: true,
    sourcemap: true,
    target: 'es2020',
    minify: 'terser',
    terserOptions: {
      compress: {
        drop_console: true,
        drop_debugger: true,
        pure_funcs: ['console.log', 'console.info'],
      },
      format: {
        comments: false,
      },
    },
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'public/index.html'),
      },
      output: {
        manualChunks: {
          vendor: ['intersection-observer'],
          utils: [resolve(__dirname, 'src/ts/utils.ts')],
        },
        assetFileNames: (assetInfo) => {
          const info = assetInfo.name?.split('.') || [];
          let extType = info[info.length - 1];
          
          if (/png|jpe?g|svg|gif|tiff|bmp|ico/i.test(extType)) {
            extType = 'images';
          } else if (/woff|woff2|eot|ttf|otf/i.test(extType)) {
            extType = 'fonts';
          }
          
          return `assets/${extType}/[name]-[hash][extname]`;
        },
        chunkFileNames: 'assets/js/[name]-[hash].js',
        entryFileNames: 'assets/js/[name]-[hash].js',
      },
    },
    cssCodeSplit: true,
    assetsInlineLimit: 4096, // 4kb
  },

  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
      '@/types': resolve(__dirname, 'src/ts/types.ts'),
      '@/utils': resolve(__dirname, 'src/ts/utils.ts'),
      '@/translations': resolve(__dirname, 'src/ts/translations.ts'),
    },
  },

  css: {
    devSourcemap: true,
  },

  server: {
    port: 3000,
    host: true,
    open: true,
    cors: true,
    headers: {
      'Cross-Origin-Embedder-Policy': 'credentialless',
      'Cross-Origin-Opener-Policy': 'same-origin',
    },
  },

  preview: {
    port: 4173,
    host: true,
    cors: true,
  },

  plugins: [
    // ESLint integration (commented out for build)
    // eslint({
    //   include: ['src/**/*.ts', 'src/**/*.tsx'],
    //   exclude: ['node_modules', 'dist'],
    //   cache: false,
    // }),

    // HTML processing
    createHtmlPlugin({
      minify: {
        collapseWhitespace: true,
        keepClosingSlash: true,
        removeComments: true,
        removeRedundantAttributes: true,
        removeScriptTypeAttributes: true,
        removeStyleLinkTypeAttributes: true,
        useShortDoctype: true,
        minifyCSS: true,
        minifyJS: true,
      },
      inject: {
        data: {
          title: 'NEXUTHA - AI・音楽・テクノロジーの融合',
          description: 'NEXUTHAは音楽、AI、自動化を専門とする創造的技術企業です。',
          injectScript: `
            <script>
              // Critical performance metrics
              if ('performance' in window) {
                window.addEventListener('load', () => {
                  setTimeout(() => {
                    const perfData = performance.getEntriesByType('navigation')[0];
                    console.log('Page load time:', perfData.loadEventEnd - perfData.fetchStart, 'ms');
                  }, 0);
                });
              }
            </script>
          `,
        },
      },
    }),

    // Legacy browser support
    legacy({
      targets: ['> 1%', 'last 2 versions', 'not dead', 'not ie 11'],
      additionalLegacyPolyfills: ['regenerator-runtime/runtime'],
      modernPolyfills: ['es.global-this'],
    }),

    // Progressive Web App (simplified)
    VitePWA({
      registerType: 'autoUpdate',
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg}'],
      },
      manifest: {
        name: 'NEXUTHA',
        short_name: 'NEXUTHA',
        description: 'NEXUTHAは音楽、AI、自動化を専門とする創造的技術企業です。',
        theme_color: '#6366f1',
        background_color: '#0f172a',
        display: 'standalone',
        start_url: '/',
        icons: [
          {
            src: '/favicon.ico',
            sizes: '64x64 32x32 24x24 16x16',
            type: 'image/x-icon',
          },
        ],
      },
    }),

    // Gzip and Brotli compression
    compression({
      algorithm: 'gzip',
      ext: '.gz',
      threshold: 1024, // Only compress files larger than 1kb
      deleteOriginFile: false,
    }),
    
    compression({
      algorithm: 'brotliCompress',
      ext: '.br',
      threshold: 1024,
      deleteOriginFile: false,
    }),
  ],

  define: {
    __APP_VERSION__: JSON.stringify(process.env.npm_package_version),
    __BUILD_TIME__: JSON.stringify(new Date().toISOString()),
  },

  optimizeDeps: {
    include: ['intersection-observer'],
    exclude: [],
  },

  esbuild: {
    drop: ['console', 'debugger'],
    legalComments: 'none',
    target: 'es2020',
  },
});