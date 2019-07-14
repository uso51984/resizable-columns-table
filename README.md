### 在线demo
https://uso51984.github.io/resizable-columns-table/

### 一、模块化使用
#### 模块化安装
```
npm i resizable-columns
```

#### 使用
```
import createColResizable from colResizeable

createColResizable(domElemTable, otions)
```

### 二、直接html引用使用

下载项目dist里面resizable-columns-table.js或者resizable-columns-table.min.js， 在assets里面下载index.css
```html
<!DOCTYPE html>
<html>
<head>
  <meta charset="utf-8">
  <meta http-equiv="x-ua-compatible" content="ie=edge">
  <title>normal demo</title>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link href="https://cdn.bootcss.com/bootstrap/3.3.5/css/bootstrap.css" rel="stylesheet">
  <link rel="stylesheet" href="./index.css">
</head>
  <body>
      <h4>liveDrag: true</h4>
    <table class="table table-bordered" style="width: 900px">
      <thead>
        <tr>
          <th>#</th>
          <th>First Name</th>
          <th>Last Name</th>
          <th>Username</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope="row">1</th>
          <td>Mark</td>
          <td>Otto</td>
          <td>@mdo</td>
        </tr>
        <tr>
          <th scope="row">2</th>
          <td>Jacob</td>
          <td>Thornton</td>
          <td>@fat</td>
        </tr>
        <tr>
          <th scope="row">3</th>
          <td>Larry</td>
          <td>the Bird</td>
          <td>@twitter</td>
        </tr>
      </tbody>
    </table>
    <h4>liveDrag: false</h4>
    <table class="table table-bordered" style="width: 900px ">
        <thead>
          <tr>
            <th>#</th>
            <th>First Name</th>
            <th>Last Name</th>
            <th>Username</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row">1</th>
            <td>Mark</td>
            <td>Otto</td>
            <td>@mdo</td>
          </tr>
          <tr>
            <th scope="row">2</th>
            <td>Jacob</td>
            <td>Thornton</td>
            <td>@fat</td>
          </tr>
          <tr>
            <th scope="row">3</th>
            <td>Larry</td>
            <td>the Bird</td>
            <td>@twitter</td>
          </tr>
        </tbody>
      </table>
  </body>
  <script src="./resizable-columns-table.js"></script>
  <script>
    const domElemTableList = document.querySelectorAll('.table');
    createColResizable(domElemTableList[0], {
      liveDrag: true
    });
    createColResizable(domElemTableList[1], {
      liveDrag: false,
      headerOnly: false
    });
  </script>
</html>

```


### api

| 成员 | 说明 | 类型 | 默认值 |
| --- | --- | --- | --- |
| domElemTable | 设置可拖动的table | element | - |
| otions | 拖动的参数 | Object | 'https://uso.oschina.io/react-ueditor-demo/ueditor.all.js' |

options 可选

```
options = {
    liveDrag: true, // 是否实时拖动
    defaultMinWidth: 30, //默认没列最小宽度
    headerOnly: true, // 拖动竖线是否只有thead
    disabledColumns: [], //不能拖动的th
    onResizing: null, // 正在拖动callback
    onResized: null // 拖动结束callback
}
```
> 每列单独宽度需要在对应th加入 自定义属性 data-min-width="number", eg:  data-min-width="300"
