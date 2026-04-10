'use strict';

module.exports = {
  async afterCreate(event) {
    await pushToWordPress(event.result);
  },
  async afterUpdate(event) {
    if (event.result.publishedAt) {
      await pushToWordPress(event.result);
    }
  },
};

async function pushToWordPress(article) {
  const fetch = require('node-fetch');

  const username = 'abc69945341@gmail.com'; // 你的 WordPress 邮箱
  const appPassword = 'YOUR_APP_PASSWORD';   // 替换成你的应用密码
  const siteUrl = 'https://public-api.wordpress.com/wp/v2/sites/abc69945341-kqtjc.wordpress.com/posts';

  const credentials = Buffer.from(`${username}:${cJh8 1al9 LhID I6nj 3JKD tRu7}`).toString('base64');

  await fetch(siteUrl, {
    method: 'POST',
    headers: {
      'Authorization': `Basic ${credentials}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      title: article.title,
      content: article.content,
      excerpt: article.excerpt,
      status: 'publish',
    }),
  });
}
