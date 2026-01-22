// // You are given a **2D array** (grid) where each element is either:
//
// // - '0' (empty space)
// // - '1' (part of a solid rectangular region)
//
// // The grid contains **exactly one** solid rectangle made entirely of '1's. Your task is to write a function that **identifies this rectangle** and returns an appropriate representation of it.
//
// // Example input:
//
// const grid = [
// [0, 0, 0, 0, 0],
// [0, 1, 1, 1, 0],
// [0, 1, 1, 1, 0],
// [0, 1, 1, 1, 0],
// [0, 0, 0, 0, 0]
// ];


// time complexity is in  the worst case: you scan all cells until you find the first 1 → O(Row × Col)
function findRectangle(grid) {
      let startCoordinates = [];
      let rectWidth = 0;
      let rectHeight = 0;

      for (let row= 0; row < grid.length; row++) {
        for (let col= 0; col < grid[row].length; col++) {
          if (grid[row][col] === 1) {
            // push coordinates of the 1st element
            if (startCoordinates.length === 0) {
                startCoordinates = [row, col];

              let horizontalIdx = col;
             // get rect width
             while (horizontalIdx < grid[row].length && grid[row][horizontalIdx] === 1) {
                 rectWidth++;
                 horizontalIdx++;
             }

                let verticalIdx = row;
             // get rect height
             while (verticalIdx < grid.length && grid[verticalIdx][col] === 1) {
                 rectHeight++;
                 verticalIdx++;
             }

            }
            break;
          }
        }
      }

       // returns coordinates [[1st], [last]]
      return [startCoordinates, [startCoordinates[0] + rectHeight - 1, startCoordinates[1] + rectWidth - 1]];
}


const testInput1 = [
    [0, 0, 0, 0, 0],
    [0, 1, 1, 1, 0],
    [0, 1, 1, 1, 0],
    [0, 1, 1, 1, 0],
    [0, 0, 0, 0, 0]
];
console.log('testInput1', testInput1);

const expectedOutput1 = [[1, 1], [3, 3]];
console.log('expectedOutput1', expectedOutput1);

console.log('factual output 1', findRectangle(testInput1));


const testInput2 = [
    [0, 0, 0, 0, 0],
    [0, 0, 1, 1, 1],
    [0, 0, 1, 1, 1],
    [0, 0, 1, 1, 1],
    [0, 0, 0, 0, 0]
];
console.log('testInput2', testInput2);

const expectedOutput2 = [[1, 2], [3, 4]];
console.log('expectedOutput2', expectedOutput2);

console.log('factual output 2', findRectangle(testInput2));
