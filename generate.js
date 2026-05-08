const fs = require("fs");

const html = `
<!DOCTYPE html>
<html lang="ja">
<head>
  <meta charset="UTF-8">
  <title>介護ダッシュボード</title>
</head>

<body style="font-family:sans-serif;padding:40px;">

<h1>📊 介護ダッシュボード</h1>

<h2>利用者人数: 5人</h2>

</body>
</html>
`;

fs.mkdirSync("dist", { recursive: true });

fs.writeFileSync("dist/index.html", html);

console.log("done");
