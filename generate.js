const fs = require("fs");

const raw = fs.readFileSync("linear-data.json", "utf8");
const data = JSON.parse(raw);

const issues = data.data.issues.nodes;

// 「人数」が付くものだけ表示
const users = issues.filter(issue =>
  issue.title.includes("人数")
);

const cards = users.map(issue => `
  <div class="card">
    <h2>${issue.title}</h2>
    <p>状態: ${issue.state.name}</p>
  </div>
`).join("");

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
      padding: 30px;
    }

    h1 {
      font-size: 48px;
      margin-bottom: 40px;
    }

    .card {
      background: white;
      border-radius: 20px;
      padding: 30px;
      margin-bottom: 25px;
      box-shadow: 0 2px 8px rgba(0,0,0,0.08);
    }

    .card h2 {
      font-size: 32px;
      margin-bottom: 20px;
    }

    .card p {
      font-size: 24px;
    }
  </style>
</head>

<body>

  <h1>利用者一覧</h1>

  ${cards}

</body>
</html>
`;

fs.mkdirSync("dist", { recursive: true });

fs.writeFileSync("dist/index.html", html);

console.log("HTML生成完了");
