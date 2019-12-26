module.exports = {
  apps: [
    {
      name: '씀에세이-45',
      script: 'trePuppet.js',

      // Options reference: https://pm2.io/doc/en/runtime/reference/ecosystem-file/
      args: 'one two',
      instances: 1,
      cron_restart: '* */8 * * *',
      autorestart: true,
      watch: false,
      max_memory_restart: '1G',
      cwd: '/root/trePuppet',
    },
  ],
};
