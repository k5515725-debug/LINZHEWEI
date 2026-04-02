import crypto from 'crypto';

function validateSignature(channelSecret, body, signature) {
  const hash = crypto
    .createHmac('SHA256', channelSecret)
    .update(body)
    .digest('base64');
  return hash === signature;
}

async function pushText(token, to, text) {
  const resp = await fetch('https://api.line.me/v2/bot/message/push', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({
      to,
      messages: [{ type: 'text', text }],
    }),
  });
  return resp;
}

async function replyText(token, replyToken, text) {
  const resp = await fetch('https://api.line.me/v2/bot/message/reply', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`,
    },
    body: JSON.stringify({
      replyToken,
      messages: [{ type: 'text', text }],
    }),
  });
  return resp;
}

export const config = {
  api: {
    bodyParser: false,
  },
};

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).send('Method Not Allowed');
  }

  const channelSecret = process.env.LINE_CHANNEL_SECRET;
  const channelToken = process.env.LINE_CHANNEL_ACCESS_TOKEN;

  if (!channelSecret || !channelToken) {
    return res.status(500).send('Missing LINE env vars');
  }

  const chunks = [];
  for await (const chunk of req) chunks.push(chunk);
  const rawBody = Buffer.concat(chunks).toString('utf8');

  const signature = req.headers['x-line-signature'];
  if (!validateSignature(channelSecret, rawBody, signature)) {
    return res.status(401).send('Invalid signature');
  }

  const payload = JSON.parse(rawBody);
  const events = payload.events || [];

  for (const event of events) {
    const userId = event?.source?.userId;
    if (userId) {
      console.log('LINE userId detected:', userId);
    }

    if ((event.type === 'follow' || event.type === 'message') && userId) {
      const text = '33 已收到你的綁定訊息 ✅\n如果你要把官網需求直接推送到這個 LINE，請把這個 userId 存到 Vercel 環境變數 LINE_TARGET_USER_ID。';
      if (event.replyToken) {
        await replyText(channelToken, event.replyToken, text);
      } else {
        await pushText(channelToken, userId, text);
      }
    }
  }

  return res.status(200).json({ ok: true });
}
