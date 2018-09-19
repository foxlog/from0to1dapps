# 从0到1 操作步骤

- add PPA 

  - curl -sL <https://deb.nodesource.com/setup_10.x>| bash
    最新版
  - curl -sL <https://deb.nodesource.com/setup_8.x>| bash
    稳定版

- install nodejs

  - apt install nodejs

- validation:

  - node -v
  - npm -v

- test:

  - vi http_server.js

    ```js
    const http = require('http');
    const hostname = '127.0.0.1';
    const port = 3000;
    const server = http.createServer((req, res) => {
    res.statusCode = 200;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Hello World\n');
    });
    server.listen(port, hostname, () => {
    console.log(`Server running at [http://${hostname}:${port}/](http://%24%7Bhostname%7D:${port}/)`);
    });
    ```

  - node http_server.js

  - curl localhost:3000

- install yarn

  - npm install yarn -g

- 安装web3.js 依赖

  - code

    ```bash
    yarn add web3@1.0.0-beta.34
    ```

- 安装mocha ganache依赖 

  ```bash
  yarn add ganache-cli mocha -D 
  ```

  - -D 本地项目
  - -g 全局

- 运行测试 

  - node scripts/deploy.js
  - 单元测试:

  ```bash
  node_modules/mocha/bin/mocha tests
  ```

- 集成workflow
  - 修改package.json
  - npm run test
  - npm run deploy