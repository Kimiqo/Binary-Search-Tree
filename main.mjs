import Tree from "./Tree.mjs";

const testArray = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
const bst = new Tree(testArray);

bst.prettyPrint();
bst.delete(67);
bst.prettyPrint();
