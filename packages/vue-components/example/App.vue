<template>
  <div>
    <VueMarkdownIt :content="str" :stream="true" ref="md"> </VueMarkdownIt>
    <button @click="change">change</button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const md = ref(null)

// console.log('🚀 ~ file: App.vue:17 ~ html:', html)
// const str = ref(text)
// const str = ref(
//   "在JavaScript中，可以使用`console.log()`命令来输出文本到控制台。要输出“hello world”，只需执行以下代码即可：\n\n```\nconsole.log('hello world');\n```\n\n运行这段代码后，在浏览器的开发者控制台或命令行工具中将显示“hello world”这个字符串。"
// )
const str = ref(
  '在Linux上安装Docker通常需要以下步骤：\n\n1. 更新软件包列表：运行以下命令，使软件包列表处于最新状态:\n\n   ```\n   sudo apt-get update\n   ```\n   \n2. 安装所需的包和Docker签名密钥：\n\n   ```\n   sudo apt-get install \\\n       apt-transport-https \\\n       ca-certificates \\\n       curl \\\n       gnupg-agent \\\n       software-properties-common\n   curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add -\n   sudo add-apt-repository \\\n       "deb [arch=amd64] https://download.docker.com/linux/ubuntu \\\n       $(lsb_release -cs) \\\n       stable"\n   ```\n   \n3. 更新软件包列表以使用Docker存储库中的软件包：\n\n   ```\n   sudo apt-get update\n   ```\n\n4. 安装最新版本的Docker：\n\n   ```\n   sudo apt-get install docker-ce docker-ce-cli containerd.io\n   ```\n   \n5. 确认Docker是否安装成功并正在运行。运行以下命令来检查版本号：\n\n   ```\n   docker --version\n   ```\n\n6. （可选）将当前用户添加到Docker组中以允许无需sudo即可管理Docker:\n\n   ```\n   sudo groupadd docker\n   sudo usermod -aG docker $USER\n   ```\n   \n   注意：需要启才能使新组的成员生效。\n   \n安装完成后，你可以使用Docker来运行和管理容器了。'
)
// const str = ref(
//   "登录页面中的用户名和密码输入框的值：\n\n```javascript\nwin.webContents.on('dom-ready', () => {\n  win.webContents.executeJavaScript(`\n    document.getElementById('username').value = 'your-username';\n    document.getElementById('password').value = 'your-password';\n  `);\n});\n```\n\n在这个例子中，我们假设登录页面中的用户名输入框的id是`username`，密码输入框的id是`password`。`executeJavaScript`方法使得我们可以在页面渲染完成后执行JavaScript代码。这里我们使用这个方法填充用户名和密码输入框的值。\n\n3. 提交表单并获取cookie\n\n在填写用户名和密码后，可以使用JavaScript代码模拟用户点击登录按钮。之后可以使用`session`模块获取浏览器的Cookie信息。\n\n```html\nwin.webContents.on('dom-ready', () => {\n  win.webContents.executeJavaScript(`\n    document.getElementById('username').value = 'your-username';\n    document.getElementById('password').value = 'your-password';\n    document.getElementById('login-btn').click();\n  `);\n\n  win.webContents.session.cookies.get({ domain: 'example.com' }, (error, cookies) => {\n    if (error) throw error;\n    console.log(cookies);\n  });\n});\n```\n\n假设登录按钮的id是`login-btn`。当用户点击登录按钮之后，浏览器会向服务器发送请求并获取Cookie信息。我们可以使用`session.cookies.get`方法获取Cookie信息并输出到控制台中。\n\n这就是如何使用Electron加载登录页面并获取Cookie信息的基本过程。需要注意的是，这里的代码仅作为示例，实际应用中可能需要根据不同的网站进行适当的修改。"
// )
const testData = [
  `
# 标题一
这是一段普通的文本，包含一个[链接](https://www.example.com)和一张图片：

![图片描述](https://www.example.com/images/example.jpg)

接下来是一段代码：

\`\`\`css
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <link rel="icon" href="/favicon.ico">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Vite App</title>
</head>

<body>
  <div id="app"></div>
</body>

</html>
\`\`\`

## 二级标题一
这是一段二级标题下的文本。

### 三级标题一
这是一段三级标题下的文本。

### 三级标题二
这是一段三级标题下的文本。

## 二级标题二
这是一段二级标题下的文本。
`
]
function change() {
  const randomIndex = Math.floor(Math.random() * testData.length)
  str.value += testData[randomIndex]
}
</script>

<style scoped></style>
