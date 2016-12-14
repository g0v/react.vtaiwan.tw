# react.vtaiwan.tw

行政院法規線上諮詢系統 界面 2.0

# 開發

需要安裝 [__Node.js__](https://nodejs.org/)。安裝好後，開啟 Terminal 視窗按下列步驟執行指令。

1. `npm install`
2. `npm start`
3. 開啟瀏覽器鍵入 `http://localhost:3000`

(Node.js 0.10.x+ 也可用來開發，但部署時仍建議使用 4.x。)

# 部署

行政院法規線上諮詢系統 2.0 使用 [zombie.js](http://zombie.js.org/) 搭配 [reactjs](https://facebook.github.io/react/) 的 server-side render 產生靜態網頁，並且使用 [gh-pages](https://pages.github.com/) 作為部署環境。

完整的上稿流程，請參閱[教學影片](https://www.youtube.com/watch?v=AuBb_M-gRfo&list=PLbf_J5xlMK0GlSQURSj0b_NsozBZsh-Tn)。

請在 `npm start` 執行時，另開視窗，按照下列步驟執行指令：

1. `npm run build`
2. `npm run deploy`

每次從 `dev` 部署完成後，請將 `dev` 合併回 `master`：

1. `git checkout master`
2. `git merge dev`
3. `git push`
4. `git checkout dev`

# 分支

如果您想自己架設一套衍生系統，請參考[匯流五法：線上徵詢](https://github.com/g0v/dc.vtaiwan.tw)的設定方式，分支該檔案庫後，再編輯其中的 `SUMMARY.md` 即可。

# 貢獻方式

如果您對我們的專案有興趣或者找到錯誤，歡迎您一起幫忙修正，讓專案變得更好。請按照下列步驟進行。

1. 將 repo fork 到個人帳號下。
2. 切換到 dev branch。
3. 按照開發一節，建立開發環境並且修正錯誤。
4. 將修正好的 commit 推到個人帳號下的 repo。
5. 建立一個新的 pull request，等待審核和 merge。

如果 merge 成功，恭喜您成為我們的一份子：）

# 貢獻者

請見[貢獻者名單](https://github.com/g0v/react.vtaiwan.tw/graphs/contributors)。

# 授權

[CC0 1.0 Universal](LICENSE)
