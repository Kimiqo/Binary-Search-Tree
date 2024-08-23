import Node from "./Node.mjs";

export default class Tree {
    constructor(listArray = []) {
        this.listArray = listArray;
        this.root = this.buildTree(listArray);
    }

    buildTree(list, start = 0, end = null) {
        if (end === null) {
            this.listArray = [...new Set(list)].sort((a, b) => a - b);
            end = this.listArray.length - 1;
        }

        if (start > end) {
            return null;
        }

        const mid = Math.floor((start + end) / 2);
        const node = new Node(this.listArray[mid]);

        node.left = this.buildTree(this.listArray, start, mid - 1);
        node.right = this.buildTree(this.listArray, mid + 1, end);

        return node;
    }

    insert(value) {
        const newNode = new Node(value);

        if (this.root === null) {
            this.root = newNode;
            return;
        }

        let current = this.root;
        while (true) {
            if (value === current.data) {
                return "Cannot have duplicates";
            }

            if (value < current.data) {
                if (current.left === null) {
                    current.left = newNode;
                    return;
                }
                current = current.left;
            } else {
                if (current.right === null) {
                    current.right = newNode;
                    return;
                }
                current = current.right;
            }
        }
    }

    delete(value) {
        this.root = this._deleteNode(this.root, value);
    }

    prettyPrint(node = this.root, prefix = "", isLeft = true) {
        if (node === null) {
            return;
        }

        if (node.right !== null) {
            this.prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
        }

        console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);

        if (node.left !== null) {
            this.prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
        }
    }


_deleteNode(node, value) {
    if (node === null) {
        return node; // Base case: the value is not found in the tree
    }

    if (value < node.data) {
        node.left = this._deleteNode(node.left, value);
    } else if (value > node.data) {
        node.right = this._deleteNode(node.right, value);
    } else {
        // Node to be deleted found

        // Case 1: Node has no children (leaf node)
        if (node.left === null && node.right === null) {
            return null;
        }

        // Case 2: Node has one child
        if (node.left === null) {
            return node.right;
        } else if (node.right === null) {
            return node.left;
        }

        // Case 3: Node has two children
        // Find the in-order successor (smallest in the right subtree)
        let successor = this._findMinNode(node.right);

        // Replace node's data with the successor's data
        node.data = successor.data;

        // Delete the successor node
        node.right = this._deleteNode(node.right, successor.data);
    }

    return node;
}

_findMinNode(node) {
    while (node.left !== null) {
        node = node.left;
    }
    return node;
}

}


