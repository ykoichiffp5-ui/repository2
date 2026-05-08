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
      background: #f5f5f5;
      padding: 40px;
    }

    h1 {
      margin-bottom: 30px;
    }

    .card {
      background: white;
      padding: 20px;
      margin-bottom: 20px;
      border-radius: 16px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.1);
    }
  </style>
</head>
<body>
  <h1>📊 介護ダッシュボード</h1>

  ${issues.map(issue => `
    <div class="card">
      <h2>${issue.title}</h2>
      <p>状態: ${issue.state.name}</p>
    </div>
  `).join("")}

</body>
</html>
`;

fs.mkdirSync("dist", { recursive: true });
fs.writeFileSync("dist/index.html", html);

console.log("HTML生成完了");
