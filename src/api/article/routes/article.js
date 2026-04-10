module.exports = {
  routes: [
    {
      method: 'GET',
      path: '/articles',
      handler: 'api::article.article.find',
      config: { policies: [], auth: false },
    },
    {
      method: 'GET',
      path: '/articles/:id',
      handler: 'api::article.article.findOne',
      config: { policies: [], auth: false },
    },
  ],
};
