# 大心不動產官網（GitHub 上傳版）

這個版本已整理成可直接上傳到 GitHub 的靜態網站結構。

## 檔案說明
- `index.html`：網站首頁
- `.nojekyll`：讓 GitHub Pages 以靜態網站方式正常部署

## GitHub 上傳方式
1. 到 GitHub 建立一個新的 Repository
2. 把這個資料夾內的檔案全部上傳到 Repository 根目錄
3. 若要用 GitHub Pages：
   - 進入 Repository 的 **Settings**
   - 打開 **Pages**
   - 在 **Build and deployment** 選擇：
     - **Source**：Deploy from a branch
     - **Branch**：`main`
     - **Folder**：`/ (root)`
4. 儲存後，等待 GitHub 產生網站網址

## 備註
這個版本是純前端靜態網站，已可直接部署。
