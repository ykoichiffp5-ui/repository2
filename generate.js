const fs = require("fs");

const raw = process.env.LINEAR_DATA;

if (!raw) {
  console.error("LINEAR_DATAが空です");
  process.exit(1);
}

const data = JSON.parse(raw);
const issues = data.data.issues.nodes;

const html = `
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <title>介護ダッシュボード</title>

  <style>
    body {
      font-family: sans-serif;
      background: #f3f3f3;
      margin: 0;
      padding: 40px;
    }

    h1 {
      font-size: 64px;
      margin-bottom: 40px;
    }

    h2 {
      font-size: 28px;
      margin-top: 60px;
      margin-bottom: 30px;
    }

    .top-cards {
      display: flex;
      gap: 30px;
      margin-bottom: 50px;
    }

    .top-card {
      background: white;
      border-radius: 24px;
      padding: 30px;
      width: 300px;
      box-shadow: 0 2px 10px rgba(0,0,0,0.08);
    }

    .top-card h3 {
      font-size: 28px;
      color: #666;
    }

    .top-card p {
      font-size: 72px;
      font-weight: bold;
      margin: 20px 0 0;
    }

    .card {
      background: white;
      border-radius: 24px;
      padding: 30px;
      margin-bottom: 30px;
      box-shadow: 0 2px 10px rgba(0,0,0,0.08);
    }

    .card h3 {
      font-size: 32px;
      margin-bottom: 20px;
    }

    .status {
      font-size: 20px;
    }
  </style>
</head>

<body>

  <h1>📊 介護ダッシュボード</h1>

  <div class="top-cards">

    <div class="top-card">
      <h3>利用者人数</h3>
      <p>${issues.length}人</p>
    </div>

    <div class="top-card">
      <h3>完了件数</h3>
      <p>
        ${
          issues.filter(
            issue => issue.state.name === "Done"
          ).length
        }件
      </p>
    </div>

  </div>

  <h2>利用者一覧</h2>

  ${issues.map(issue => `
    <div class="card">
      <h3>${issue.title}</h3>

      <div class="status">
        状態: ${issue.state.name}
      </div>
    </div>
  `).join("")}

</body>
</html>
`;

fs.mkdirSync("dist", { recursive: true });

fs.writeFileSync("dist/index.html", html);

console.log("HTML生成完了");
