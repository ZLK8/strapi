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
  const https = require('https');

  const username = 'abc69945341@gmail.com';
  const appPassword = 'cJh8 1al9 LhID I6nj 3JKD tRu7';
  const credentials = Buffer.from(`${username}:${appPassword}`).toString('base64');

  const body = JSON.stringify({
    title: article.title,
    content: article.content || '',
    excerpt: article.excerpt || '',
    status: 'publish',
  });

  return new Promise((resolve, reject) => {
    const req = https.request({
      hostname: 'public-api.wordpress.com',
      path: '/wp/v2/sites/abc69945341-kqtjc.wordpress.com/posts',
      method: 'POST',
      headers: {
        'Authorization': `Basic ${credentials}`,
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(body),
      },
    }, (res) => {
      let data = '';
      res.on('data', chunk => data += chunk);
      res.on('end', () => {
        console.log('WordPress sync status:', res.statusCode);
        console.log('WordPress sync response:', data);
        resolve(data);
      });
    });
    req.on('error', (e) => {
      console.error('WordPress sync error:', e);
      reject(e);
    });
    req.write(body);
    req.end();
  });
}
