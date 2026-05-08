const fs = require("fs");

const raw = fs.readFileSync("linear-data.json", "utf8");

const data = JSON.parse(raw);

console.log(data);

const issues = data?.data?.issues?.nodes || [];

const totalUsers = issues.length;

const doneCount = issues.filter(
  issue => issue.state?.name === "Done"
).length;

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
      font-size: 48px;
      margin-bottom: 20px;
    }

    .grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
      gap: 20px;
    }

    .card {
      background: white;
      border-radius: 20px;
      padding: 30px;
      box-shadow: 0 4px 10px rgba(0,0,0,0.1);
    }

    .label {
      font-size: 24px;
      color: #666;
      margin-bottom: 10px;
    }

    .value {
      font-size: 64px;
      font-weight: bold;
    }
  </style>
</head>

<body>

<h1>📊 介護ダッシュボード</h1>

<div class="grid">

  <div class="card">
    <div class="label">利用者人数</div>
    <div class="value">${totalUsers}人</div>
  </div>

  <div class="card">
    <div class="label">完了件数</div>
    <div class="value">${doneCount}件</div>
  </div>

</div>

</body>
</html>
`;

fs.mkdirSync("dist", { recursive: true });

fs.writeFileSync("dist/index.html", html);

console.log("done");
