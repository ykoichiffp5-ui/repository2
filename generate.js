const fs = require("fs");

const raw = process.env.LINEAR_DATA;

if (!raw) {
  console.error("LINEAR_DATAが空です");
  process.exit(1);
}

const data = JSON.parse(raw);

const issues = data.data.issues.nodes;

const doneCount = issues.filter(
  (issue) => issue.state.name === "Done"
).length;

const userCount = issues.filter(
  (issue) => issue.title.includes("利用者")
).length;

const userList = issues
  .map(
    (issue) => `
      <div class="user-card">
        <h3>${issue.title}</h3>
        <p>状態: ${issue.state.name}</p>
      </div>
    `
  )
  .join("");

const html = `
<!DOCTYPE html>
<html lang="ja">
<head>
<meta charset="UTF-8" />
<title>介護ダッシュボード</title>

<style>
body{
  font-family:sans-serif;
  background:#f3f3f3;
  padding:40px;
}

h1{
  font-size:64px;
}

.cards{
  display:flex;
  gap:20px;
  margin-bottom:40px;
}

.card{
  background:white;
  border-radius:20px;
  padding:30px;
  flex:1;
  box-shadow:0 2px 10px rgba(0,0,0,0.1);
}

.number{
  font-size:96px;
  font-weight:bold;
}

.user-list{
  margin-top:30px;
}

.user-card{
  background:white;
  padding:20px;
  border-radius:16px;
  margin-bottom:16px;
  box-shadow:0 2px 8px rgba(0,0,0,0.08);
}

.user-card h3{
  margin:0 0 10px 0;
  font-size:28px;
}
</style>
</head>

<body>

<h1>📊 介護ダッシュボード</h1>

<div class="cards">

  <div class="card">
    <h2>利用者人数</h2>
    <div class="number">${userCount}人</div>
  </div>

  <div class="card">
    <h2>完了件数</h2>
    <div class="number">${doneCount}件</div>
  </div>

</div>

<div class="user-list">
  <h2>利用者一覧</h2>

  ${userList}

</div>

</body>
</html>
`;

fs.mkdirSync("dist", { recursive: true });

fs.writeFileSync("dist/index.html", html);

console.log("HTML generated!");
