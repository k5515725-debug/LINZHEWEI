export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const token = process.env.LINE_CHANNEL_ACCESS_TOKEN;
  const to = process.env.LINE_TARGET_USER_ID;

  if (!token) {
    return res.status(500).json({ error: '尚未設定 LINE_CHANNEL_ACCESS_TOKEN' });
  }
  if (!to) {
    return res.status(500).json({ error: '尚未設定 LINE_TARGET_USER_ID' });
  }

  const body = req.body || {};
  const kind = body.kind || 'unknown';

  let text = '【官網新需求】\n';

  if (kind === 'buyer') {
    text += [
      '類型：買方',
      `稱呼：${body.name || '未填寫'}`,
      `想找的物件：${body.type || '未填寫'}`,
      `預算：${body.budget || '未填寫'}`,
      `聯絡方式：${body.contact || '未填寫'}`,
    ].join('\n');
  } else if (kind === 'seller') {
    const needs = Array.isArray(body.needs) && body.needs.length ? body.needs.join('、') : '未填寫';
    text += [
      '類型：賣方',
      `稱呼：${body.name || '未填寫'}`,
      `物件類型：${body.type || '未填寫'}`,
      `土地 / 物件位置：${body.location || '未填寫'}`,
      `需求：${needs}`,
      `聯絡方式：${body.contact || '未填寫'}`,
    ].join('\n');
  } else {
    text += '收到未知格式資料';
  }

  const lineRes = await fetch('https://api.line.me/v2/bot/message/push', {
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

  if (!lineRes.ok) {
    const detail = await lineRes.text();
    return res.status(500).json({ error: `LINE 發送失敗：${detail}` });
  }

  return res.status(200).json({ ok: true });
}
