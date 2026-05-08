const fs = require("fs");

const raw = process.env.LINEAR_DATA;

if (!raw) {
  console.error("LINEAR_DATAが空です");
  process.exit(1);
}

const data = JSON.parse(raw);
const issues = data.data.issues.nodes;

// 利用者Aだけ取得
const users = issues.filter(
  (issue) => issue.title === "利用者A"
);

// 各階人数データ取得
const floorData = {
  "2階人数": "0",
  "3階人数": "0",
  "4階人数": "0",
  "入院者数": "0",
};

issues.forEach((issue) => {
  const title = issue.title;

  if (title.includes("2階人数")) {
    floorData["2階人数"] =
      title.split("：")[1]?.replace("名", "").trim() || "0";
  }

  if (title.includes("3階人数")) {
    floorData["3階人数"] =
      title.split("：")[1]?.replace("名", "").trim() || "0";
  }

  if (title.includes("4階人数")) {
    floorData["4階人数"] =
      title.split("：")[1]?.replace("名", "").trim() || "0";
  }

  if (title.includes("入院者数")) {
    floorData["入院者数"] =
      title.split("：")[1]?.replace("名", "").trim() || "0";
  }
});

// 合計人数
const totalUsers =
  Number(floorData["2階人数"]) +
  Number(floorData["3階人数"]) +
  Number(floorData["4階人数"]);

// 完了件数
const doneCount = issues.filter(
  (issue) => issue.state.name === "Done"
).length;

const html = `
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8" />
  <title>介護ダッシュボード</title>

  <style>
    body {
      font-family: sans-serif;
      background: #f2f2f2;
      margin: 0;
      padding: 40px;
    }

    h1 {
      font-size: 56px;
      margin-bottom: 30px;
    }

    .top-cards {
      display: flex;
      gap: 20px;
      margin-bottom: 40px;
    }

    .card {
      background: white;
      padding: 30px;
      border-radius: 20px;
      flex: 1;
      box-shadow: 0 2px 10px rgba(0,0,0,0.08);
    }

    .big-number {
      font-size: 64px;
      font-weight: bold;
      margin-top: 10px;
    }

    h2 {
      margin-bottom: 20px;
    }

    .user-card {
      background: white;
      padding: 30px;
      border-radius: 20px;
      margin-bottom: 20px;
      box-shadow: 0 2px 10px rgba(0,0,0,0.08);
    }

    .user-title {
      font-size: 40px;
      font-weight: bold;
      margin-bottom: 15px;
    }

    .status {
      font-size: 28px;
    }
  </style>
</head>

<body>

  <h1>📊 介護ダッシュボード</h1>

  <div class="top-cards">

    <div class="card">
      <div>利用者人数</div>
      <div class="big-number">${totalUsers}人</div>
    </div>

    <div class="card">
      <div>完了件数</div>
      <div class="big-number">${doneCount}件</div>
    </div>

  </div>

  <h2>利用者一覧</h2>

  ${users.map(issue => `
    <div class="user-card">
      <div class="user-title">${issue.title}</div>
      <div class="status">状態: ${issue.state.name}</div>
    </div>
  `).join("")}

  <div class="user-card">
    <div class="user-title">4階人数</div>
    <div class="status">${floorData["4階人数"]}名</div>
  </div>

  <div class="user-card">
    <div class="user-title">3階人数</div>
    <div class="status">${floorData["3階人数"]}名</div>
  </div>

  <div class="user-card">
    <div class="user-title">2階人数</div>
    <div class="status">${floorData["2階人数"]}名</div>
  </div>

  <div class="user-card">
    <div class="user-title">入院者数</div>
    <div class="status">${floorData["入院者数"]}名</div>
  </div>

</body>
</html>
`;

fs.mkdirSync("docs", { recursive: true });
fs.writeFileSync("docs/index.html", html);

console.log("dashboard generated!");
