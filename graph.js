class Node {
  constructor(value, adjacent = new Set()) {
    this.value = value;
    this.adjacent = adjacent;
  }
}

class Graph {
  constructor() {
    this.nodes = new Set();
  }

  // this function accepts a Node instance and adds it to the nodes property on the graph
  addVertex(vertex) {
    this.nodes.add(vertex);
  }

  // this function accepts an array of Node instances and adds them to the nodes property on the graph
  addVertices(vertexArray) {
    for (let vertex of vertexArray) {
      this.addVertex(vertex);
    }
  }
  
  // this function accepts two vertices and updates their adjacent values to include the other vertex
  addEdge(v1, v2) {
    v1.adjacent.add(v2);
    v2.adjacent.add(v1);
  }
  

  // this function accepts two vertices and updates their adjacent values to remove the other vertex
  removeEdge(v1, v2) {
    v1.adjacent.delete(v2);
    v2.adjacent.delete(v1);
  }
  

  // this function accepts a vertex and removes it from the nodes property, it also updates any adjacency lists that include that vertex
  removeVertex(vertex) {
    for (let adjacentNode of vertex.adjacent) {
      adjacentNode.adjacent.delete(vertex);
    }
    this.nodes.delete(vertex);
  }
  

  // this function returns an array of Node values using DFS
  depthFirstSearch(start, visited = new Set()) {
    visited.add(start);
    let result = [start.value];
  
    for (let neighbor of start.adjacent) {
      if (!visited.has(neighbor)) {
        result = result.concat(this.depthFirstSearch(neighbor, visited));
      }
    }
  
    return result;
  }
  

  // this function returns an array of Node values using BFS
  breadthFirstSearch(start) {
    let visited = new Set();
    let queue = [start];
    let result = [];
  
    visited.add(start);
  
    while (queue.length) {
      let current = queue.shift();
      result.push(current.value);
  
      for (let neighbor of current.adjacent) {
        if (!visited.has(neighbor)) {
          visited.add(neighbor);
          queue.push(neighbor);
        }
      }
    }
  
    return result;
  }

  // Further study: shortest path
  shortestPath(start, target) {
    let queue = [[start]];
    let visited = new Set();
    visited.add(start);
  
    while (queue.length) {
      let path = queue.shift();
      let node = path[path.length - 1];
  
      if (node === target) return path.map(v => v.value);
  
      for (let neighbor of node.adjacent) {
        if (!visited.has(neighbor)) {
          visited.add(neighbor);
          queue.push([...path, neighbor]);
        }
      }
    }
  
    return null;  
  }
}

module.exports = {Graph, Node}