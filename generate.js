const fs = require("fs");

const raw = process.env.LINEAR_DATA;

if (!raw) {
  console.error("LINEAR_DATAが空です");
  process.exit(1);
}

const data = JSON.parse(raw);
const issues = data.data.issues.nodes;

// 利用者Aを除外
const filteredIssues = issues.filter(
  issue => issue.title !== "利用者A"
);

// 人数
const userCount = filteredIssues.length;

// 完了件数
const doneCount = filteredIssues.filter(
  issue => issue.state.name === "Done"
).length;

// 一覧HTML
const userList = filteredIssues.map(issue => {
  const isDone = issue.state.name === "Done";

  return `
    <div class="user-card">
      <div>
        <div class="user-name">${issue.title}</div>
        <div class="status">
          状態: ${issue.state.name}
        </div>
      </div>

      <div class="badge ${isDone ? "done" : "todo"}">
        ${isDone ? "Done" : "Todo"}
      </div>
    </div>
  `;
}).join("");

const html = `
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <title>介護ダッシュボード</title>

  <style>
    body {
      margin: 0;
      padding: 40px;
      font-family: sans-serif;
      background: #f3f3f3;
    }

    h1 {
      font-size: 64px;
      margin-bottom: 40px;
    }

    .top {
      display: flex;
      gap: 24px;
      margin-bottom: 40px;
    }

    .card {
      flex: 1;
      background: white;
      border-radius: 20px;
      padding: 32px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.08);
    }

    .label {
      font-size: 20px;
      color: #666;
      margin-bottom: 20px;
    }

    .big {
      font-size: 72px;
      font-weight: bold;
    }

    h2 {
      margin-bottom: 24px;
    }

    .user-card {
      background: white;
      border-radius: 16px;
      padding: 24px;
      margin-bottom: 20px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      box-shadow: 0 2px 8px rgba(0,0,0,0.08);
    }

    .user-name {
      font-size: 24px;
      font-weight: bold;
      margin-bottom: 8px;
    }

    .status {
      color: #666;
    }

    .badge {
      padding: 8px 16px;
      border-radius: 999px;
      font-weight: bold;
    }

    .todo {
      background: #fff3cd;
      color: #856404;
    }

    .done {
      background: #d4edda;
      color: #155724;
    }
  </style>
</head>

<body>

  <h1>📊 介護ダッシュボード</h1>

  <div class="top">
    <div class="card">
      <div class="label">利用者人数</div>
      <div class="big">${userCount}人</div>
    </div>

    <div class="card">
      <div class="label">完了件数</div>
      <div class="big">${doneCount}件</div>
    </div>
  </div>

  <h2>一覧</h2>

  ${userList}

</body>
</html>
`;

fs.mkdirSync("dist", { recursive: true });
fs.writeFileSync("dist/index.html", html);

console.log("HTML生成完了");
