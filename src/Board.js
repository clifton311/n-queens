// This file is a Backbone Model (don't worry about what that means)
// It's part of the Board Visualizer
// The only portions you need to work on are the helper functions (below)

(function() {

  window.Board = Backbone.Model.extend({

    initialize: function (params) {
      if (_.isUndefined(params) || _.isNull(params)) {
        console.log('Good guess! But to use the Board() constructor, you must pass it an argument in one of the following formats:');
        console.log('\t1. An object. To create an empty board of size n:\n\t\t{n: %c<num>%c} - Where %c<num> %cis the dimension of the (empty) board you wish to instantiate\n\t\t%cEXAMPLE: var board = new Board({n:5})', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
        console.log('\t2. An array of arrays (a matrix). To create a populated board of size n:\n\t\t[ [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...], [%c<val>%c,%c<val>%c,%c<val>%c...] ] - Where each %c<val>%c is whatever value you want at that location on the board\n\t\t%cEXAMPLE: var board = new Board([[1,0,0],[0,1,0],[0,0,1]])', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: blue;', 'color: black;', 'color: grey;');
      } else if (params.hasOwnProperty('n')) {
        this.set(makeEmptyMatrix(this.get('n')));
      } else {
        this.set('n', params.length);
      }
    },

    rows: function() {
      return _(_.range(this.get('n'))).map(function(rowIndex) {
        return this.get(rowIndex);
      }, this);
    },

    togglePiece: function(rowIndex, colIndex) {
      this.get(rowIndex)[colIndex] = + !this.get(rowIndex)[colIndex];
      this.trigger('change');
    },

    _getFirstRowColumnIndexForMajorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex - rowIndex;
    },

    _getFirstRowColumnIndexForMinorDiagonalOn: function(rowIndex, colIndex) {
      return colIndex + rowIndex;
    },

    hasAnyRooksConflicts: function() {
      return this.hasAnyRowConflicts() || this.hasAnyColConflicts();
    },

    hasAnyQueenConflictsOn: function(rowIndex, colIndex) {
      return (
        this.hasRowConflictAt(rowIndex) ||
        this.hasColConflictAt(colIndex) ||
        this.hasMajorDiagonalConflictAt(this._getFirstRowColumnIndexForMajorDiagonalOn(rowIndex, colIndex)) ||
        this.hasMinorDiagonalConflictAt(this._getFirstRowColumnIndexForMinorDiagonalOn(rowIndex, colIndex))
      );
    },

    hasAnyQueensConflicts: function() {
      return this.hasAnyRooksConflicts() || this.hasAnyMajorDiagonalConflicts() || this.hasAnyMinorDiagonalConflicts();
    },

    _isInBounds: function(rowIndex, colIndex) {
      return (
        0 <= rowIndex && rowIndex < this.get('n') &&
        0 <= colIndex && colIndex < this.get('n')
      );
    },


/*
         _             _     _
     ___| |_ __ _ _ __| |_  | |__   ___ _ __ ___ _
    / __| __/ _` | '__| __| | '_ \ / _ \ '__/ _ (_)
    \__ \ || (_| | |  | |_  | | | |  __/ | |  __/_
    |___/\__\__,_|_|   \__| |_| |_|\___|_|  \___(_)

 */
    /*=========================================================================
    =                 TODO: fill in these Helper Functions                    =
    =========================================================================*/

    // ROWS - run from left to right
    // --------------------------------------------------------------
    //
    // test if a specific row on this board contains a conflict
    hasRowConflictAt: function(rowIndex) {

     //declare a variable for the array at rowIndex
      var row = this.rows();
      console.log("row[2]");
     //iterate through the array
     var counter = 0;
      for (var i = 0; i < this.rows()[rowIndex].length; i++) {
        if (this.rows()[rowIndex][i] === 1) {
          counter++;
        }
      }
      //if the sum is greater than 1 , which represents a conflict
      if (counter > 1) {
        // return true
        return true;
      }
    },

    // test if any rows on this board contain conflicts
    hasAnyRowConflicts: function() {
      //declare board variable
      var board = this.attributes;

      // loop through each row and check if conflict found
      for ( var i = 0; i < board.n; i++) {
        //console.log(i);
        if (this.hasRowConflictAt(i)) {
        return true;
      }
    }
      // if no conflicts found, end test
      return false;
      
    },


    // COLUMNS - run from top to bottom
    // --------------------------------------------------------------
    //
    // test if a specific column on this board contains a conflict
    hasColConflictAt: function(colIndex) {
       var board = this.attributes;
       //console.log(board);
       var counter = 0;
        for (var i = 0; i < this.attributes.n; i++) {
          if ( this.attributes[i][colIndex] > 0) {
            //console.log(this.attributes[i]);
            counter++;
          }
          if (counter > 1) {
            return true;
          }
        }
      return false; // fixme
    },

    // test if any columns on this board contain conflicts
    hasAnyColConflicts: function() {
      //declare board variable
      var board = this.attributes;
      //iterate through the board 
        for (var i = 0 ; i < board.n; i++) {
          if (this.hasColConflictAt(i)) {
            return true;
          }
        }
        //determine if there are any Column conflicts
        //if so return true 

      return false; // fixme
    },



    // Major Diagonals - go from top-left to bottom-right
    // --------------------------------------------------------------
    //
    // test if a specific major diagonal on this board contains a conflict

    // [1,0,0,0]
    // [0,1,0,0]

    hasMajorDiagonalConflictAt: function(majorDiagonalColumnIndexAtFirstRow) {
      var board = this.attributes;
      var counter = 0;
      var diagonal = majorDiagonalColumnIndexAtFirstRow;
      

      // loop through the major diagonal and count the queens that exist
      for ( var i = 0; i < board.n; i++ ) {
      
        if ( board[i][diagonal] ) {
          counter++;
        }
        // move to next major diagonal element
       diagonal++;

      }
      // return if conflict is found, return true
      if (counter > 1) {
        return true;
      }
      return false;
    },

    // test if any major diagonals on this board contain conflicts
    hasAnyMajorDiagonalConflicts: function() {
      var board = this.attributes;

      for (var i = 0 - (board.n-2); i < board.n; i++) {
        if (this.hasMajorDiagonalConflictAt(i)) {
          return true;
        }
      }
      return false; // fixme
    },



    // Minor Diagonals - go from top-right to bottom-left
    // --------------------------------------------------------------
    //
    // test if a specific minor diagonal on this board contains a conflict
    
    hasMinorDiagonalConflictAt: function(minorDiagonalColumnIndexAtFirstRow) {
      var board = this.attributes;
      var queens = 0;

      // loop through the minor diagonal and count the queens that exist
      for ( var i = 0; i < board.n; i++ ){

        //current minor diagonal is board[i][minorDiagonalColumnIndexAtFirstRow]
        // if queen found, increment queens
        if ( board[i][minorDiagonalColumnIndexAtFirstRow] ) queens++;

        // move to next minor diagonal element
        minorDiagonalColumnIndexAtFirstRow--;

      }

      // return if conflict is found, return true
      if ( queens > 1 ) {
        return true;
      } 
      return false;
    },

    // test if any minor diagonals on this board contain conflicts
    hasAnyMinorDiagonalConflicts: function() {
      var board = this.attributes;
      var count = board.n;

      // loop through each minor diagonal and check if conflict found
      for ( var i = 0; i < count + (count - 2); i++ ){
        if ( this.hasMinorDiagonalConflictAt(i) ) return true;
      }

      // if no conflicts found, end test
      return false;
    }

    /*--------------------  End of Helper Functions  ---------------------*/


  });

  var makeEmptyMatrix = function(n) {
    return _(_.range(n)).map(function() {
      return _(_.range(n)).map(function() {
        return 0;
      });
    });
  };

}());
