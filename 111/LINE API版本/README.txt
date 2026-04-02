# 大心不動產官網（Vercel + LINE 官方帳號版）

## 這包做了什麼
- `index.html`：目前官網版本，送出需求會 POST 到 `/api/lead`
- `api/lead.js`：把表單內容推送到你的個人 LINE
- `api/line-webhook.js`：接收 LINE webhook，幫你抓自己的 `userId`

## 你要先做的事
1. **重新發行 LINE Channel secret**
   - 因為你先前已經公開過一次，請在 LINE Developers 重新發新的 secret
2. **準備好 Channel access token**
3. **把這包上傳到 Vercel**
4. 在 Vercel 專案設定這三個環境變數：
   - `LINE_CHANNEL_ACCESS_TOKEN`
   - `LINE_CHANNEL_SECRET`
   - `LINE_TARGET_USER_ID`（第一次可以先不填）

## Webhook 設定
部署後，到 LINE Developers 的 Messaging API 設：
- Webhook URL：
  `https://你的-vercel-網址.vercel.app/api/line-webhook`
- 開啟 `Use webhook`
- 按 `Verify`

## 第一次綁定你的個人 LINE
1. 用你自己的 LINE 加這個官方帳號好友
2. 傳一則訊息給官方帳號，例如「測試」
3. 到 Vercel 專案 → Functions / Logs
4. 找到 `LINE userId detected: ...`
5. 把那串值填到 Vercel 環境變數 `LINE_TARGET_USER_ID`
6. 重新部署一次

## 完成後
之後網站表單按送出，就會直接 push 到你的個人 LINE。
