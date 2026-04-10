module.exports = ({ env }) => ({
  auth: {
    secret: env('ADMIN_JWT_SECRET'),
  },
  apiToken: {
    salt: env('API_TOKEN_SALT'),
  },
  vite: {
    server: {
      allowedHosts: ['strapi-production-518a.up.railway.app'],
    },
  },
});
