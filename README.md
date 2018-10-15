### 在线demo
http://uso.oschina.io/resizable-colmuns-table/

### 安装
```
npm i resizable-columns
```

### 使用
```
import createColResizable from colResizeable

createColResizable(domElemTable, otions)
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
