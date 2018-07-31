'use strict';

const util = require('util');

class BinarySearchTree {
  constructor(key=null, value=null, parent=null) {
    this.key = key;
    this.value = value;
    this.parent = parent;
    this.left = null;
    this.right = null;
  }
 
  insert(key, value) {
    // check if key == this.key, if not, insert key as root
    if (this.key === null) {
      this.key = key;
      this.value = value;
    } else if (key <= this.key) {
    // if key is < this.key, check if this.left exists
      if (this.left === null) {
        // if it does not insert key, 
        this.left = new BinarySearchTree(key,value, this);
      } else {
        // if it does call this.left.insert(key)
        this.left.insert(key, value);
      }
    } else {
      // if key is > this.key, check if this.right exists, 
      if (this.right === null) {
        // if it does not insert key,
        this.right = new BinarySearchTree(key, value, this);
      } else {
        // if it does call this.right.insert(key)
        this.right.insert(key, value);
      }
    }
  }
  
  find(key) {
    if (key === this.key) {
      return this.value;
    } else if (key <= this.key && this.left) {
      return this.left.find(key);
    } else if (key > this.key && this.right) {  
      return this.right.find(key);
    } else {
      return new Error('key error')
    }
  }

  
  remove(key) {
    if (this.key == key) {
      if (this.left && this.right) {
        const successor = this.right._findMin();
        this.key = successor.key;
        this.value = successor.value;
        successor.remove(successor.key);
      }
      //If the node only has a left child, 
      //then you replace the node with its left child.  
      else if (this.left) {
        this._replaceWith(this.left);
      }
      //And similarly if the node only has a right child 
      //then you replace it with its right child.
      else if (this.right) {
        this._replaceWith(this.right);
      }
      //If the node has no children then
      //simply remove it and any references to it 
      //by calling "this._replaceWith(null)".
      else {
        this._replaceWith(null);
      }
    }
    else if (key < this.key && this.left) {
      this.left.remove(key);
    }
    else if (key > this.key && this.right) {
      this.right.remove(key);
    }
    else {
      throw new Error('Key Error');
    }
  }

  _replaceWith(node) {
    if (this.parent) {
      if (this == this.parent.left) {
        this.parent.left = node;
      }
      else if (this == this.parent.right) {
        this.parent.right = node;
      }

      if (node) {
        node.parent = this.parent;
      }
    }
    else {
      if (node) {
        this.key = node.key;
        this.value = node.value;
        this.left = node.left;
        this.right = node.right;
      }
      else {
        this.key = null;
        this.value = null;
        this.left = null;
        this.right = null;
      }
    }
  }

  _findMin() {
    if (!this.left) {
      return this;
    }
    return this.left._findMin();
  }

}

let tree = new BinarySearchTree();
let arr = [3,1,4,6,9,2,5,7];

for (let num in arr) {
  
  tree.insert(arr[num], num);
}
//console.log(tree.find(6));


//console.log(util.inspect(tree, false, null));
// function displayTree(tree) {
//   let parent = `${tree.key}`;
//   let left_child = '';
//   let right_child = '';
//   if (tree.left !== null) {
//     left_child = `${displayTree(tree.left)}`;
//   }
//   if (tree.right !== null) {
//     right_child = `${displayTree(tree.right)}`;
//   }
//   return `${parent}\n${left_child} ${right_child}`;
// }
// console.log(displayTree(tree));

function heightOfBST(tree, level=1) {
  if (tree.left === null && tree.right === null) {
    return level;
  }
  level++;
  if (tree.left === null) {
    return heightOfBST(tree.right, level);
  }
  if (tree.right === null) {
    return heightOfBST(tree.left, level);
  }
  return Math.max(heightOfBST(tree.left, level), heightOfBST(tree.right, level));
}

const height = heightOfBST(tree);
console.log(height);
tree.remove(7);
console.log(heightOfBST(tree));

function isItBST(tree) {
  if (tree === null) {
    return true;
  } else if (tree.right !== null && tree.right.key < tree.key) {
    return false;
  } else if (tree.left !== null && tree.left.key > tree.key) {
    return false;
  } else {
  return isItBST(tree.right) && isItBST(tree.left);
  }
}

console.log(isItBST(tree));

let notBST = {
  key: 8,
  left: {
    key:9,
    left: null,
    right: null
  },
  right: {
    key: 6,
    left: null, 
    right: null
  }
}

console.log(isItBST(notBST));

function findMax(tree) { 
 if (tree === null) {
   return null;
 } else if (!tree.right) {
   return tree;
 } else {
    return findMax(tree.right)
 }
}

// console.log(findMax(tree));

function thirdLargestNode(tree) {
  let largest = findMax(tree);
  let second = largest.parent;
  if (second.left && second.left > second.parent) {
    return second.left.key
  } else {
    return second.key;
  }

}

const newTree = new BinarySearchTree();
let arr1 = [6,7,3,9,4,0,3,5,8];
for (let num in arr1) {
  newTree.insert(arr1[num], num);
}
console.log(thirdLargestNode(newTree));
