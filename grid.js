// Stores information about the current state of the grid (10w x 20h)

Grid = function(game, x, y) { 
    this.game = game;
    // starting coords of the pieces
    this.piece_start_x = x; 
    this.piece_start_y = y;
    
    this.arr = new Array(10);
	this.grid_sprite = new Array();
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
    
    updateGrid: function(curr_piece, grid) {
		// if pieces collide
		for(var i=0; i<curr_piece.blocks.length; i++) {
			var coord = translateToArrayCoord(curr_piece.blocks[i].x, curr_piece.blocks[i].y, this.piece_start_x);
			this.arr[coord[0]][coord[1]] = 1;
		}
		renderUpdatedGrid(grid);
		
		// check if row is completed
		for(var j=0; j<20; j++) {
			var sum = 0;
			for(var i=0; i<10; i++) {
				sum += this.arr[i][j];
			}
			if(sum == 10) { 		// row is complete
				// shift blocks above j down by one row
				var sprite_rowcleared = this.game.add.sprite(this.piece_start_x+45, 100, 'sprite_rowcleared');
				sprite_rowcleared.alpha = 0;
				this.game.add.tween(sprite_rowcleared).to({alpha:1}, 500, Phaser.Easing.Linear.None,  true, 0, 0, true);
				console.log('row completed');
				score += 10;
				scoreText.setText(score.toString());
				sound_clear.play();
				console.log(score);
				for(var n=j-1; n>-1; n--) {
					for(var m=0; m<10; m++) {
						this.arr[m][n+1] = this.arr[m][n];
						this.arr[m][n] = 0;
					}
				}
			}
		}
		resetBlockSprites(grid);
		renderUpdatedGrid(grid);
    }

};