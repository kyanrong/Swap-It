// Stores information about the current state of the grid (10w x 20h)

Grid = function(game, x, y) { 
    this.game = game;
    // starting coords of the pieces
    this.piece_start_x = x; 
    this.piece_start_y = y;
    
    this.arr = new Array(10);
    this.init();

};

Grid.prototype = {
    
    init: function() {
        for(var i=0; i<this.arr.length; i++) {
            this.arr[i] = new Array(20);
        }

        for(var i=0; i<this.arr.length; i++) {
            for(var j=0; j<this.arr[i].length; j++) {
                this.arr[i][j] = 0;
            }
        }
    },
    
    updateGrid: function(curr_piece, rowComplete, idx) {
        if(rowComplete) {
            // zero out complete row
            /*for(var i=0; i<10; i++) {
                this.arr[i][idx] = 0;
            }*/
            
            // shift blocks above idx down by one row
            for(var i=0; i<this.arr.length; i++) {
                console.log('shift blocks down');
                for(var j=0; j<idx; j++) {
                    this.arr[i][j+1] = this.arr[i][j];
                    this.arr[i][j] = 0;
                }
            }
        }
        else {
            for(var i=0; i<curr_piece.blocks.length; i++) {
                var coord = translateToArrayCoord(curr_piece.blocks[i].x, curr_piece.blocks[i].y, this.piece_start_x);
                this.arr[coord[0]][coord[1]] = 1;
            }
        }
        
    }

};