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
    }
  };

  solution = recurseRows(0);

  console.log('Single solution for ' + n + ' rooks:', JSON.stringify(solution));
  
  return solution;
};

//return the number of nxn chessboards that exist, with n rooks placed such that none of them can attack each other
window.countNRooksSolutions = function(n) {
  var solutionCount = 0; 
  var board = new Board({n: n});
  //write inner recursive function
  var recurseRows = row => {
    if (n === row) {
      solutionCount++; 
      return;
    }  
    //iterate through all the colomns on the board
      for (var col = 0; col < n; col++) {
         //place a rook down
        board.togglePiece(row, col);
         //if there are any board conflicts, then remove the rook 
        if (!board.hasColConflictAt(col)) {
          recurseRows(row + 1);
        } 
      //if there are no conflicts move to the next row and check for conflicts
        board.togglePiece(row, col);
      }
  };
  recurseRows(0);

  console.log('Number of solutions for ' + n + ' rooks:', solutionCount);
  return solutionCount; // total num of possible solutions
};


window.findNQueensSolution = function(n) {
  var solution = 0;
  var board = new Board({n:n});
  if (n === 2 || n === 3) {
    return board.rows();
  }
  //create recursive function
  var recurseRows = function (row) {
    if (n === row) {
      return board.rows();
    }
    //iterate over possible decisions
      for (var col = 0; col < n; col++) {
        //place a queen on the board
        board.togglePiece(row,col);
        //check to see the queens have any conflict
        if (!board.hasAnyQueensConflicts()) {
          //if there are no conflicts, move to the next row
           var result = recurseRows(row + 1);
           if (result) {
             return result;
           }
        }
        //if there are remove queen
        board.togglePiece(row, col);
      }
    };
  
  solution = recurseRows(0);  
  console.log('Single solution for ' + n + ' queens:', JSON.stringify(solution));
  return solution;
};

// return the number of nxn chessboards that exist, with n queens placed such that none of them can attack each other
window.countNQueensSolutions = function(n) {
  var board = new Board({ 'n': n})
  var solutionCount = 0;

  let findQueenSolutions = rowIndex => {
    //declare base case
    if (rowIndex === n) {
      solutionCount++
      return;
    }
    //iterate throught he board
    for (var i = 0; i < n; i++) {
      //place a queen piece down
      board.togglePiece(rowIndex, i) //initially at (0,1)
      //if there are not conflicts
      if (!board.hasAnyQueenConflictsOn(rowIndex,i) ) {
        findQueenSolutions(rowIndex +1)
      }
      board.togglePiece(rowIndex,i)
    }
  }
  findQueenSolutions(0)

  console.log('Number of solutions for ' + n + ' queens:', solutionCount);
  return solutionCount;
};
