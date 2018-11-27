import G6 from '@antv/g6'
const data = {
  "nodes": [
    {
      "shape": "customNode",
      "id": "node1",
      "x": 50,
      "y": 100
    },
    {
      "shape": "customNode",
      "id": "node2",
      "x": 350,
      "y": 300
    }
  ],
};

G6.registerNode('customNode', {
  draw(item){
    const group = item.getGraphicGroup();
    const model = item.getModel();
    group.addShape('text', {
      attrs: {
        x: 0,
        y: 0,
        fill: '#333',
        text: '我是一个自定义节点，\n有下面那个方形和我自己组成'
      }
    });
    group.addShape('text', {
      attrs: {
        x: 0,
        y: 0,
        fill: '#333',
        text: ' ('+model.x+', '+model.y+') \n 原点是组的图坐标',
        textBaseline: 'top'
      }
    });
    group.addShape('circle', {
      attrs: {
        x: 0,
        y: 0,
        r: 4,
        fill: 'blue'
      }
    });
    return group.addShape('rect', {
      attrs: {
        x: 0,
        y: 0,
        width: 100,
        height: 100,
        stroke: 'red'
      }
    });
  }
});

const graph = new G6.Graph({
  container: 'mountNode',  // dom 容器 或 容器ID
  width: 500,              // 画布宽
  height: 500,             // 画布高
});
graph.read(data);