export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          // Add other large dependencies here
        },
      },
    },
    target: 'esnext',
    minify: 'esbuild',
    sourcemap: false,
  },
  optimizeDeps: {
    include: ['react', 'react-dom'],
  },
}); 