const transform = require("@babel/core").transform;
const fs = require("fs");


function main() {
  console.log("run");
  // 读取代码
  const code = fs.readFileSync("./src/test.js").toString();
  // 转换
  const res = transform(code, {
    plugins: [update],
  });
  // 保存
  fs.writeFileSync("./src/test-new.js", res.code);
}

// 插件
function update({ types: t }) {
  // types 有一些类型校验
  return {
    visitor: {
      BinaryExpression(path, state) {
        /** 
        * path： 当前节点的path对象，包括当前代码块的起始位置，行数，以及当前节点对象
        * 节点替换replaceWith ,移除remove等常用API
        */
        console.log("run2");
        console.log("state", state);
        if (path.node.operator !== "===") {
          return;
        }
        path.node.left = t.identifier("sebmck");
        path.node.right = t.identifier("dork");
      },
    },
  };
}

main();
