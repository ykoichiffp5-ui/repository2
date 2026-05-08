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

// 人数データだけ取得
const residentIssues = filteredIssues.filter(
  issue =>
    issue.title.includes("人数")
);

const html = `
<!DOCTYPE html>
<html lang="ja">
<head>
<meta charset="UTF-8">
<title>介護ダッシュボード</title>

<style>
body{
  font-family:sans-serif;
  background:#f3f3f3;
  padding:40px;
}

h1{
  font-size:64px;
  margin-bottom:40px;
}

.top{
  display:flex;
  gap:20px;
  margin-bottom:40px;
}

.top-card{
  background:white;
  border-radius:20px;
  padding:30px;
  width:280px;
  box-shadow:0 2px 10px rgba(0,0,0,0.08);
}

.top-card h2{
  color:#666;
}

.top-card p{
  font-size:72px;
  font-weight:bold;
}

.card{
  background:white;
  border-radius:20px;
  padding:30px;
  margin-bottom:20px;
  box-shadow:0 2px 10px rgba(0,0,0,0.08);
}

.card h3{
  font-size:32px;
}

.status{
  margin-top:12px;
  font-size:20px;
}
</style>
</head>

<body>

<h1>📊 介護ダッシュボード</h1>

<div class="top">

  <div class="top-card">
    <h2>利用者人数</h2>
    <p>${residentIssues.length}人</p>
  </div>

  <div class="top-card">
    <h2>完了件数</h2>
    <p>
      ${
        residentIssues.filter(
          issue => issue.state.name === "Done"
        ).length
      }件
    </p>
  </div>

</div>

${residentIssues.map(issue => `
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

console.log("Dashboard generated!");
