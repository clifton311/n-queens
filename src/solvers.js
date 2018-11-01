/*           _
   ___  ___ | |_   _____ _ __ ___
  / __|/ _ \| \ \ / / _ \ '__/ __|
  \__ \ (_) | |\ V /  __/ |  \__ \
  |___/\___/|_| \_/ \___|_|  |___/

*/

// hint: you'll need to do a full-search of all possible arrangements of pieces!
// (There are also optimizations that will allow you to skip a lot of the dead search space)
// take a look at solversSpec.js to see what the tests are expecting


// return a matrix (an array of arrays) representing a single nxn chessboard, with n rooks placed such that none of them can attack each other

//[1,0,0]
//[0,0,0]
//[0,0,0]

//I - number
//O - array of Arrays

window.findNRooksSolution = function(n) {
  var solution;
  var board = new Board({n: n});
 
  var recurseRows = function (row) {
    if (row === n) {
      return board.rows();
  }
  
  for ( var rows = 0; rows < n; rows++) { //total possible solutions 
    for (var col = 0; col < n; col++) {

      board.togglePiece(row, col);

      if (board.hasAnyColConflicts(col)) {
        board.togglePiece(row,col);

      } else {

        return recurseRows(row + 1);
      }
      }
    };
  };
    solution = recurseRows(0);
  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  return solution;
};

// window.findNRooksSolution = function(n) {
//   // create a board
//   // solution count

//   // recursive func(4) {
//     // prevent below from happening
//     // if row === n
//       // increment solution count

//     // iterate through cols {
//       // toggle a piece

//       // if conflict
//         // untoggle piece
//       // else
//         // if (recursive(4 + 1)) {
//         //   return true;
//         // }
//         // here, we wanna find out how to prevent untoggling, if solution found
//         // untoggle pieces
//     // }

//   // } undefined

//   // recursive(0)

//   // return total number of possible solutions
// };

// return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = 0; //fixme
  var board = new Board({n: n});
 
  var recurseRows = function (row) {
    if (row === n) {
      solutionCount++;
      return;
    }
  
  //for ( var rows = 0; rows < n; rows++) { //total possible solutions 
    for (var col = 0; col < n; col++) {

      board.togglePiece(row, col);

      if (board.hasColConflictAt(col)) {
        board.togglePiece(row,col);
      } 
       recurseRows(row + 1);
    }
  };
  recurseRows(0);
 
  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount; // total num of possible solutions
};

// return a matrix (an array of arrays) representing a single nxn chessboard, with n queens placed such that none of them can attack each other
window.findNQueensSolution = function(n) {
  var solution = undefined; //fixme

  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var solutionCount = undefined; //fixme

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
