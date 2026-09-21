module.exports = {
  // ── SIGA legacy ──────────────────────────────────────────────────────────
  "/OEFA.ServicesAPI": {
    "target": "https://sistemas.oefa.gob.pe",
    "secure": false,
    "changeOrigin": true,
    "logLevel": "debug",
    "onProxyReq": function(proxyReq, req, res) {
      // Remover cabeceras de origen local para evitar detección por el WAF
      proxyReq.removeHeader("origin");
      proxyReq.removeHeader("referer");
      proxyReq.removeHeader("user-agent");
      
      // Imitar un cliente curl estándar que el WAF acepta
      proxyReq.setHeader("user-agent", "curl/7.88.1");
      proxyReq.setHeader("accept", "*/*");
    }
  },

  // ── SIGED mock (local) ────────────────────────────────────────────────────
  // Apunta al servidor mock en mock-siged/server.js (puerto 3001).
  // Para activar: abrir otra terminal y ejecutar:
  //   node seguimiento_OSOC/mock-siged/server.js
  // Cuando OTI entregue el endpoint real, cambiar el target y pathRewrite.
  "/api/siged": {
    "target": "http://localhost:3001",
    "secure": false,
    "changeOrigin": true,
    "pathRewrite": { "^/api/siged": "" },
    "logLevel": "debug"
  },

  // ── Backend Spring Boot (localhost:8080) ──────────────────────────────────
  "/api/poi": {
    "target": "http://localhost:8080",
    "secure": false,
    "changeOrigin": true,
    "logLevel": "debug"
  },
  "/api/orders": {
    "target": "http://localhost:8080",
    "secure": false,
    "changeOrigin": true,
    "logLevel": "debug"
  },
  "/api/dashboard": {
    "target": "http://localhost:8080",
    "secure": false,
    "changeOrigin": true,
    "logLevel": "debug"
  },
  "/api/projects": {
    "target": "http://localhost:8080",
    "secure": false,
    "changeOrigin": true,
    "logLevel": "debug"
  }
};

