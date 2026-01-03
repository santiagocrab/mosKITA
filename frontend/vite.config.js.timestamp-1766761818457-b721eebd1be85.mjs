// vite.config.js
import { defineConfig } from "file:///Users/jamesremegio/Documents/mosKITA/frontend/node_modules/vite/dist/node/index.js";
import react from "file:///Users/jamesremegio/Documents/mosKITA/frontend/node_modules/@vitejs/plugin-react/dist/index.js";
var vite_config_default = defineConfig(({ mode }) => ({
  plugins: [
    react({
      // Enable Fast Refresh
      fastRefresh: true,
      // Exclude test files from processing
      exclude: /\.test\.(js|jsx|ts|tsx)$/
    })
  ],
  // Base path: '/' for dev, './' for production static hosting
  base: mode === "production" ? "./" : "/",
  // Development server config
  server: {
    port: 3e3,
    host: true,
    open: false,
    hmr: {
      overlay: false
      // Disable error overlay to prevent timeouts
    },
    fs: {
      strict: false
      // Allow serving files outside root
    },
    // Proxy API requests to backend
    proxy: {
      "/api": {
        target: "http://localhost:8000",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, "")
      }
    }
  },
  // Preview server (for testing production builds)
  preview: {
    port: 4173,
    host: true
  },
  // Build optimizations
  build: {
    outDir: "dist",
    assetsDir: "assets",
    sourcemap: false,
    // Disable sourcemaps for faster builds
    minify: "esbuild",
    // Fastest minifier
    target: "esnext",
    // Modern browsers
    cssCodeSplit: true,
    // Split CSS for better caching
    chunkSizeWarningLimit: 1e3,
    // Increase warning limit
    rollupOptions: {
      output: {
        // Optimized chunk splitting for better caching
        manualChunks: (id) => {
          if (id.includes("node_modules/react") || id.includes("node_modules/react-dom")) {
            return "react-vendor";
          }
          if (id.includes("node_modules/react-router")) {
            return "router-vendor";
          }
          if (id.includes("node_modules/chart.js") || id.includes("node_modules/react-chartjs-2")) {
            return "chart-vendor";
          }
          if (id.includes("node_modules/leaflet") || id.includes("node_modules/react-leaflet")) {
            return "map-vendor";
          }
          if (id.includes("node_modules/axios")) {
            return "axios-vendor";
          }
        },
        // Optimize chunk file names
        chunkFileNames: "assets/js/[name]-[hash].js",
        entryFileNames: "assets/js/[name]-[hash].js",
        assetFileNames: "assets/[ext]/[name]-[hash].[ext]"
      }
    }
  },
  // Dependency optimization
  optimizeDeps: {
    include: [
      "react",
      "react-dom",
      "react-router-dom",
      "leaflet",
      "react-leaflet",
      "chart.js",
      "react-chartjs-2",
      "axios"
    ],
    // Don't force re-optimization unless needed
    force: false,
    esbuildOptions: {
      target: "esnext"
    }
  },
  // Resolve configuration
  resolve: {
    alias: {
      "@": "/src"
      // Optional: for cleaner imports
    }
  }
}));
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcuanMiXSwKICAic291cmNlc0NvbnRlbnQiOiBbImNvbnN0IF9fdml0ZV9pbmplY3RlZF9vcmlnaW5hbF9kaXJuYW1lID0gXCIvVXNlcnMvamFtZXNyZW1lZ2lvL0RvY3VtZW50cy9tb3NLSVRBL2Zyb250ZW5kXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ZpbGVuYW1lID0gXCIvVXNlcnMvamFtZXNyZW1lZ2lvL0RvY3VtZW50cy9tb3NLSVRBL2Zyb250ZW5kL3ZpdGUuY29uZmlnLmpzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9Vc2Vycy9qYW1lc3JlbWVnaW8vRG9jdW1lbnRzL21vc0tJVEEvZnJvbnRlbmQvdml0ZS5jb25maWcuanNcIjtpbXBvcnQgeyBkZWZpbmVDb25maWcgfSBmcm9tIFwidml0ZVwiXG5pbXBvcnQgcmVhY3QgZnJvbSBcIkB2aXRlanMvcGx1Z2luLXJlYWN0XCJcblxuLy8gaHR0cHM6Ly92aXRlanMuZGV2L2NvbmZpZy9cbmV4cG9ydCBkZWZhdWx0IGRlZmluZUNvbmZpZygoeyBtb2RlIH0pID0+ICh7XG4gIHBsdWdpbnM6IFtcbiAgICByZWFjdCh7XG4gICAgICAvLyBFbmFibGUgRmFzdCBSZWZyZXNoXG4gICAgICBmYXN0UmVmcmVzaDogdHJ1ZSxcbiAgICAgIC8vIEV4Y2x1ZGUgdGVzdCBmaWxlcyBmcm9tIHByb2Nlc3NpbmdcbiAgICAgIGV4Y2x1ZGU6IC9cXC50ZXN0XFwuKGpzfGpzeHx0c3x0c3gpJC8sXG4gICAgfSksXG4gIF0sXG4gIFxuICAvLyBCYXNlIHBhdGg6ICcvJyBmb3IgZGV2LCAnLi8nIGZvciBwcm9kdWN0aW9uIHN0YXRpYyBob3N0aW5nXG4gIGJhc2U6IG1vZGUgPT09ICdwcm9kdWN0aW9uJyA/ICcuLycgOiAnLycsXG4gIFxuICAvLyBEZXZlbG9wbWVudCBzZXJ2ZXIgY29uZmlnXG4gIHNlcnZlcjoge1xuICAgIHBvcnQ6IDMwMDAsXG4gICAgaG9zdDogdHJ1ZSxcbiAgICBvcGVuOiBmYWxzZSxcbiAgICBobXI6IHtcbiAgICAgIG92ZXJsYXk6IGZhbHNlLCAvLyBEaXNhYmxlIGVycm9yIG92ZXJsYXkgdG8gcHJldmVudCB0aW1lb3V0c1xuICAgIH0sXG4gICAgZnM6IHtcbiAgICAgIHN0cmljdDogZmFsc2UsIC8vIEFsbG93IHNlcnZpbmcgZmlsZXMgb3V0c2lkZSByb290XG4gICAgfSxcbiAgICAvLyBQcm94eSBBUEkgcmVxdWVzdHMgdG8gYmFja2VuZFxuICAgIHByb3h5OiB7XG4gICAgICAnL2FwaSc6IHtcbiAgICAgICAgdGFyZ2V0OiAnaHR0cDovL2xvY2FsaG9zdDo4MDAwJyxcbiAgICAgICAgY2hhbmdlT3JpZ2luOiB0cnVlLFxuICAgICAgICByZXdyaXRlOiAocGF0aCkgPT4gcGF0aC5yZXBsYWNlKC9eXFwvYXBpLywgJycpLFxuICAgICAgfSxcbiAgICB9LFxuICB9LFxuICBcbiAgLy8gUHJldmlldyBzZXJ2ZXIgKGZvciB0ZXN0aW5nIHByb2R1Y3Rpb24gYnVpbGRzKVxuICBwcmV2aWV3OiB7XG4gICAgcG9ydDogNDE3MyxcbiAgICBob3N0OiB0cnVlLFxuICB9LFxuICBcbiAgLy8gQnVpbGQgb3B0aW1pemF0aW9uc1xuICBidWlsZDoge1xuICAgIG91dERpcjogJ2Rpc3QnLFxuICAgIGFzc2V0c0RpcjogJ2Fzc2V0cycsXG4gICAgc291cmNlbWFwOiBmYWxzZSwgLy8gRGlzYWJsZSBzb3VyY2VtYXBzIGZvciBmYXN0ZXIgYnVpbGRzXG4gICAgbWluaWZ5OiAnZXNidWlsZCcsIC8vIEZhc3Rlc3QgbWluaWZpZXJcbiAgICB0YXJnZXQ6ICdlc25leHQnLCAvLyBNb2Rlcm4gYnJvd3NlcnNcbiAgICBjc3NDb2RlU3BsaXQ6IHRydWUsIC8vIFNwbGl0IENTUyBmb3IgYmV0dGVyIGNhY2hpbmdcbiAgICBjaHVua1NpemVXYXJuaW5nTGltaXQ6IDEwMDAsIC8vIEluY3JlYXNlIHdhcm5pbmcgbGltaXRcbiAgICBcbiAgICByb2xsdXBPcHRpb25zOiB7XG4gICAgICBvdXRwdXQ6IHtcbiAgICAgICAgLy8gT3B0aW1pemVkIGNodW5rIHNwbGl0dGluZyBmb3IgYmV0dGVyIGNhY2hpbmdcbiAgICAgICAgbWFudWFsQ2h1bmtzOiAoaWQpID0+IHtcbiAgICAgICAgICAvLyBSZWFjdCBjb3JlXG4gICAgICAgICAgaWYgKGlkLmluY2x1ZGVzKCdub2RlX21vZHVsZXMvcmVhY3QnKSB8fCBpZC5pbmNsdWRlcygnbm9kZV9tb2R1bGVzL3JlYWN0LWRvbScpKSB7XG4gICAgICAgICAgICByZXR1cm4gJ3JlYWN0LXZlbmRvcidcbiAgICAgICAgICB9XG4gICAgICAgICAgLy8gUmVhY3QgUm91dGVyXG4gICAgICAgICAgaWYgKGlkLmluY2x1ZGVzKCdub2RlX21vZHVsZXMvcmVhY3Qtcm91dGVyJykpIHtcbiAgICAgICAgICAgIHJldHVybiAncm91dGVyLXZlbmRvcidcbiAgICAgICAgICB9XG4gICAgICAgICAgLy8gQ2hhcnQgbGlicmFyaWVzXG4gICAgICAgICAgaWYgKGlkLmluY2x1ZGVzKCdub2RlX21vZHVsZXMvY2hhcnQuanMnKSB8fCBpZC5pbmNsdWRlcygnbm9kZV9tb2R1bGVzL3JlYWN0LWNoYXJ0anMtMicpKSB7XG4gICAgICAgICAgICByZXR1cm4gJ2NoYXJ0LXZlbmRvcidcbiAgICAgICAgICB9XG4gICAgICAgICAgLy8gTWFwIGxpYnJhcmllc1xuICAgICAgICAgIGlmIChpZC5pbmNsdWRlcygnbm9kZV9tb2R1bGVzL2xlYWZsZXQnKSB8fCBpZC5pbmNsdWRlcygnbm9kZV9tb2R1bGVzL3JlYWN0LWxlYWZsZXQnKSkge1xuICAgICAgICAgICAgcmV0dXJuICdtYXAtdmVuZG9yJ1xuICAgICAgICAgIH1cbiAgICAgICAgICAvLyBPdGhlciBsYXJnZSB2ZW5kb3IgbGlicmFyaWVzXG4gICAgICAgICAgaWYgKGlkLmluY2x1ZGVzKCdub2RlX21vZHVsZXMvYXhpb3MnKSkge1xuICAgICAgICAgICAgcmV0dXJuICdheGlvcy12ZW5kb3InXG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICAvLyBPcHRpbWl6ZSBjaHVuayBmaWxlIG5hbWVzXG4gICAgICAgIGNodW5rRmlsZU5hbWVzOiAnYXNzZXRzL2pzL1tuYW1lXS1baGFzaF0uanMnLFxuICAgICAgICBlbnRyeUZpbGVOYW1lczogJ2Fzc2V0cy9qcy9bbmFtZV0tW2hhc2hdLmpzJyxcbiAgICAgICAgYXNzZXRGaWxlTmFtZXM6ICdhc3NldHMvW2V4dF0vW25hbWVdLVtoYXNoXS5bZXh0XScsXG4gICAgICB9LFxuICAgIH0sXG4gIH0sXG4gIFxuICAvLyBEZXBlbmRlbmN5IG9wdGltaXphdGlvblxuICBvcHRpbWl6ZURlcHM6IHtcbiAgICBpbmNsdWRlOiBbXG4gICAgICAncmVhY3QnLFxuICAgICAgJ3JlYWN0LWRvbScsXG4gICAgICAncmVhY3Qtcm91dGVyLWRvbScsXG4gICAgICAnbGVhZmxldCcsXG4gICAgICAncmVhY3QtbGVhZmxldCcsXG4gICAgICAnY2hhcnQuanMnLFxuICAgICAgJ3JlYWN0LWNoYXJ0anMtMicsXG4gICAgICAnYXhpb3MnLFxuICAgIF0sXG4gICAgLy8gRG9uJ3QgZm9yY2UgcmUtb3B0aW1pemF0aW9uIHVubGVzcyBuZWVkZWRcbiAgICBmb3JjZTogZmFsc2UsXG4gICAgZXNidWlsZE9wdGlvbnM6IHtcbiAgICAgIHRhcmdldDogJ2VzbmV4dCcsXG4gICAgfSxcbiAgfSxcbiAgXG4gIC8vIFJlc29sdmUgY29uZmlndXJhdGlvblxuICByZXNvbHZlOiB7XG4gICAgYWxpYXM6IHtcbiAgICAgICdAJzogJy9zcmMnLCAvLyBPcHRpb25hbDogZm9yIGNsZWFuZXIgaW1wb3J0c1xuICAgIH0sXG4gIH0sXG59KSlcbiJdLAogICJtYXBwaW5ncyI6ICI7QUFBNFQsU0FBUyxvQkFBb0I7QUFDelYsT0FBTyxXQUFXO0FBR2xCLElBQU8sc0JBQVEsYUFBYSxDQUFDLEVBQUUsS0FBSyxPQUFPO0FBQUEsRUFDekMsU0FBUztBQUFBLElBQ1AsTUFBTTtBQUFBO0FBQUEsTUFFSixhQUFhO0FBQUE7QUFBQSxNQUViLFNBQVM7QUFBQSxJQUNYLENBQUM7QUFBQSxFQUNIO0FBQUE7QUFBQSxFQUdBLE1BQU0sU0FBUyxlQUFlLE9BQU87QUFBQTtBQUFBLEVBR3JDLFFBQVE7QUFBQSxJQUNOLE1BQU07QUFBQSxJQUNOLE1BQU07QUFBQSxJQUNOLE1BQU07QUFBQSxJQUNOLEtBQUs7QUFBQSxNQUNILFNBQVM7QUFBQTtBQUFBLElBQ1g7QUFBQSxJQUNBLElBQUk7QUFBQSxNQUNGLFFBQVE7QUFBQTtBQUFBLElBQ1Y7QUFBQTtBQUFBLElBRUEsT0FBTztBQUFBLE1BQ0wsUUFBUTtBQUFBLFFBQ04sUUFBUTtBQUFBLFFBQ1IsY0FBYztBQUFBLFFBQ2QsU0FBUyxDQUFDLFNBQVMsS0FBSyxRQUFRLFVBQVUsRUFBRTtBQUFBLE1BQzlDO0FBQUEsSUFDRjtBQUFBLEVBQ0Y7QUFBQTtBQUFBLEVBR0EsU0FBUztBQUFBLElBQ1AsTUFBTTtBQUFBLElBQ04sTUFBTTtBQUFBLEVBQ1I7QUFBQTtBQUFBLEVBR0EsT0FBTztBQUFBLElBQ0wsUUFBUTtBQUFBLElBQ1IsV0FBVztBQUFBLElBQ1gsV0FBVztBQUFBO0FBQUEsSUFDWCxRQUFRO0FBQUE7QUFBQSxJQUNSLFFBQVE7QUFBQTtBQUFBLElBQ1IsY0FBYztBQUFBO0FBQUEsSUFDZCx1QkFBdUI7QUFBQTtBQUFBLElBRXZCLGVBQWU7QUFBQSxNQUNiLFFBQVE7QUFBQTtBQUFBLFFBRU4sY0FBYyxDQUFDLE9BQU87QUFFcEIsY0FBSSxHQUFHLFNBQVMsb0JBQW9CLEtBQUssR0FBRyxTQUFTLHdCQUF3QixHQUFHO0FBQzlFLG1CQUFPO0FBQUEsVUFDVDtBQUVBLGNBQUksR0FBRyxTQUFTLDJCQUEyQixHQUFHO0FBQzVDLG1CQUFPO0FBQUEsVUFDVDtBQUVBLGNBQUksR0FBRyxTQUFTLHVCQUF1QixLQUFLLEdBQUcsU0FBUyw4QkFBOEIsR0FBRztBQUN2RixtQkFBTztBQUFBLFVBQ1Q7QUFFQSxjQUFJLEdBQUcsU0FBUyxzQkFBc0IsS0FBSyxHQUFHLFNBQVMsNEJBQTRCLEdBQUc7QUFDcEYsbUJBQU87QUFBQSxVQUNUO0FBRUEsY0FBSSxHQUFHLFNBQVMsb0JBQW9CLEdBQUc7QUFDckMsbUJBQU87QUFBQSxVQUNUO0FBQUEsUUFDRjtBQUFBO0FBQUEsUUFFQSxnQkFBZ0I7QUFBQSxRQUNoQixnQkFBZ0I7QUFBQSxRQUNoQixnQkFBZ0I7QUFBQSxNQUNsQjtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBQUE7QUFBQSxFQUdBLGNBQWM7QUFBQSxJQUNaLFNBQVM7QUFBQSxNQUNQO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLElBQ0Y7QUFBQTtBQUFBLElBRUEsT0FBTztBQUFBLElBQ1AsZ0JBQWdCO0FBQUEsTUFDZCxRQUFRO0FBQUEsSUFDVjtBQUFBLEVBQ0Y7QUFBQTtBQUFBLEVBR0EsU0FBUztBQUFBLElBQ1AsT0FBTztBQUFBLE1BQ0wsS0FBSztBQUFBO0FBQUEsSUFDUDtBQUFBLEVBQ0Y7QUFDRixFQUFFOyIsCiAgIm5hbWVzIjogW10KfQo=
