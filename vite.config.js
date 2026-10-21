import {defineConfig} from 'vite';
export default defineConfig({root:'app',resolve:{alias:{vue:'vue/dist/vue.esm-bundler.js'}},build:{outDir:'../dist',emptyOutDir:true,chunkSizeWarningLimit:2000}});
