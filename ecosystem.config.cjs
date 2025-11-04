module.exports = {
  apps: [
    {
      name: 'papsp-backend',
      script: './backend/server.js',
      cwd: '/var/www/PAPSP-FRONT',
      instances: 1,
      exec_mode: 'fork',
      autorestart: true,
      watch: false,
      max_memory_restart: '500M',
      env: {
        NODE_ENV: 'production'
      },
      error_file: '~/logs/pm2/papsp-backend-error.log',
      out_file: '~/logs/pm2/papsp-backend-out.log',
      log_date_format: 'YYYY-MM-DD HH:mm:ss Z',
      merge_logs: true,
      min_uptime: '10s',
      max_restarts: 10,
      restart_delay: 4000
    }
  ]
};
