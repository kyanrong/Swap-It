// initialization
var game = new Phaser.Game(900, 600, Phaser.AUTO, 'game_div', {preload:preload, create:create, update:update});

var sprite_yellow, sprite_orange;                                  // sprites
var spacebar_key, left_key_a, right_key_a, down_key_a, left_key_b, right_key_b, down_key_b;
var x1 = 290, x2 = 590, y = 30;                                    // the starting coords of the grids
var start_x1 = x1 + 4, start_x2 = x2 + 4, start_y = 7;             // the starting coords of the blocks
var curr_time = 0, prev_time = 0;
var grid_width = 270, grid_height = 540;
var block_len = 27;                                                 // a block is the subunit of a piece
var grid_yellow, grid_orange;                                       // stores the current state of the grid in an array                    
var curr_piece_a, curr_piece_b;                                     // a is always on the left, b on the right
var next_ps_a, next_ps_b;                 							 // next piece shape
var fall_time = 0, max_fall_time = 1000, move_time = 0;
var score = 0, scoreText = 0;
var sound_swap, sound_clear, sound_bg, sound_gameover;
var gameover = false;

function preload() {
    this.game.load.image('sprite_bg', 'assets/bg.png');
    this.game.load.image('sprite_yellow', 'assets/grid_yellow.png');
    this.game.load.image('sprite_orange', 'assets/grid_orange.png');
    this.game.load.image('sprite_block', 'assets/block.png');
	this.game.load.image('sprite_swap_y', 'assets/swap_yellow_left.png');
	this.game.load.image('sprite_swap_o', 'assets/swap_orange_left.png');
	this.game.load.image('sprite_rowcleared', 'assets/rowcleared.png');
	this.game.load.image('sprite_gameover', 'assets/gameover.png');
	this.load.bitmapFont('font_sunn', 'assets/sunn.png', 'assets/sunn.fnt');
	this.load.audio('audio_swap', 'assets/swap.mp3');
	this.load.audio('audio_clear', 'assets/clear.mp3');
	this.load.audio('audio_fall', 'assets/fall.mp3');
	this.load.audio('audio_bg', 'assets/bg.mp3');
	this.load.audio('audio_gameover', 'assets/gameover.mp3');
}

function create() {
    // images
    this.game.add.sprite(0, 0, 'sprite_bg');
    sprite_yellow = this.game.add.sprite(x1, y, 'sprite_yellow');
    sprite_orange = this.game.add.sprite(x2, y, 'sprite_orange');
    
    // keyboard controls
    this.game.input.keyboard.addKeyCapture([Phaser.Keyboard.SPACEBAR]);
    this.game.input.keyboard.addKeyCapture([Phaser.Keyboard.A]);
    this.game.input.keyboard.addKeyCapture([Phaser.Keyboard.D]);
    this.game.input.keyboard.addKeyCapture([Phaser.Keyboard.S]);
    this.game.input.keyboard.addKeyCapture([Phaser.Keyboard.LEFT]);
    this.game.input.keyboard.addKeyCapture([Phaser.Keyboard.RIGHT]);
    this.game.input.keyboard.addKeyCapture([Phaser.Keyboard.DOWN]);
    
    spacebar_key = this.game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
    left_key_a = this.game.input.keyboard.addKey(Phaser.Keyboard.A);
    right_key_a = this.game.input.keyboard.addKey(Phaser.Keyboard.D);
    down_key_a = this.game.input.keyboard.addKey(Phaser.Keyboard.S);
    left_key_b = this.game.input.keyboard.addKey(Phaser.Keyboard.LEFT);
    right_key_b = this.game.input.keyboard.addKey(Phaser.Keyboard.RIGHT);
    down_key_b = this.game.input.keyboard.addKey(Phaser.Keyboard.DOWN);
    
    grid_yellow = new Grid(this.game, start_x1, start_y);
    grid_orange = new Grid(this.game, start_x2, start_y);
    
    grid_sprite_yellow = new Array();
    grid_sprite_orange = new Array();
    
    // create tetris pieces for the 2 grids
    curr_piece_a = new Piece(this.game, start_x1, 4, choosePieceShape());
    curr_piece_b = new Piece(this.game, start_x2, 4, choosePieceShape());
    
    next_ps_a = choosePieceShape();
    next_ps_b = choosePieceShape();

	spacebar_key.onDown.add(swap, sprite_orange, sprite_yellow);
	
	scoreText = this.game.add.bitmapText(145, 498, 'font_sunn', score.toString(), 64);
	scoreText.visible = true;
	
	sound_swap = this.game.add.audio('audio_swap');
	sound_clear = this.game.add.audio('audio_clear');
	sound_bg = this.game.add.audio('audio_bg', 1, true);
	sound_gameover = this.game.add.audio('audio_gameover');
	sound_bg.play('', 0, 1, true);
}

function update() { 
	if(gameover) {
		this.game.add.sprite(255, 0, 'sprite_gameover');
		return;
	}
	else {
	    if(down_key_a.isDown || down_key_b.isDown) { max_fall_time = 50; }
		if(left_key_a.isDown) { if(this.game.time.now > move_time) { moveLeft(curr_piece_a); move_time = this.game.time.now + 150;}}
		if(left_key_b.isDown) { if(this.game.time.now > move_time) { moveLeft(curr_piece_b); move_time = this.game.time.now + 150;}}
		if(right_key_a.isDown) { if(this.game.time.now > move_time) { moveRight(curr_piece_a); move_time = this.game.time.now + 150;}}
		if(right_key_b.isDown) { if(this.game.time.now > move_time) { moveRight(curr_piece_b); move_time = this.game.time.now + 150;}}
    
		if(this.game.time.now > fall_time) {
		
			// check the sprite positions of the grids
			// piece_a always on the left, piece_b always on the right
			if(onLeft(sprite_yellow)) {         // == sprite_orange on the right
				if(collide(curr_piece_a, grid_yellow)) {
					grid_yellow.updateGrid(curr_piece_a, grid_yellow);
					checkCompletedRow(grid_yellow);
					destroyPiece(curr_piece_a);
                
					curr_piece_a = new Piece(this.game, start_x1, 4, next_ps_a);
					next_ps_a = choosePieceShape();
				}
            if(collide(curr_piece_b, grid_orange)) {
                grid_orange.updateGrid(curr_piece_b, grid_orange);
                destroyPiece(curr_piece_b);
				checkCompletedRow(grid_orange);

                curr_piece_b = new Piece(this.game, start_x2, 4, next_ps_b);
                next_ps_b = choosePieceShape();
            }
        }
        
        // swapped 
        else {
            if(collide(curr_piece_a, grid_orange)) {
                grid_orange.updateGrid(curr_piece_a, grid_orange);
				checkCompletedRow(grid_orange);
                destroyPiece(curr_piece_a);

                curr_piece_a = new Piece(this.game, start_x1, 4, next_ps_a);
                next_ps_a = choosePieceShape();
            }
            if(collide(curr_piece_b, grid_yellow)) {
                grid_yellow.updateGrid(curr_piece_b, grid_yellow);
				checkCompletedRow(grid_yellow);
                destroyPiece(curr_piece_b);
                
                curr_piece_b = new Piece(this.game, start_x2, 4, next_ps_b);
                next_ps_b = choosePieceShape();
            }
        }
		
		curr_piece_a.fall();
        curr_piece_b.fall();

        //prev_time = curr_time;
        fall_time = this.game.time.now + max_fall_time;
        max_fall_time = 500;
		}
	}

}

// Helper functions 
function swap() {
	var sprite_swap_y = this.game.add.sprite(540, 170, 'sprite_swap_y');
	sprite_swap_y.alpha = 0;
	var sprite_swap_o = this.game.add.sprite(540, 170, 'sprite_swap_o');
	sprite_swap_o.alpha = 0;

    resetBlockSprites(grid_yellow);
	resetBlockSprites(grid_orange);
    
    if(sprite_orange.x == x1) {
		this.game.add.tween(sprite_swap_o).to({alpha:1}, 700, Phaser.Easing.Linear.None, true, 0, 0, true);
        sprite_orange.x = x2;
        grid_orange.piece_start_x = start_x2;
        sprite_yellow.x = x1;
        grid_yellow.piece_start_x = start_x1;
    }
    else {
		this.game.add.tween(sprite_swap_y).to({alpha:1}, 700, Phaser.Easing.Linear.None, true, 0, 0, true);
        sprite_orange.x = x1;
        grid_orange.piece_start_x = start_x1;
        sprite_yellow.x = x2;
        grid_yellow.piece_start_x = start_x2;
    }

    renderUpdatedGrid(grid_yellow);
    renderUpdatedGrid(grid_orange);
	sound_swap.play();
    console.log('swap done');
}

function moveLeft(piece) {
	if(piece.start_x == start_x1) {				// this is piece a
		var grid = onLeft(sprite_yellow) ? grid_yellow : grid_orange;
	}	
	else {											// this is piece b
		var grid = onLeft(sprite_yellow) ? grid_orange : grid_yellow;
	}
	
    if(piece.blocks[0].x > piece.start_x) {
        for(var i=0; i<piece.blocks.length; i++) {
			var coord = translateToArrayCoord(piece.blocks[i].x, piece.blocks[i].y, piece.start_x);
			if(grid.arr[coord[0]-1][coord[1]] == 1) return;
		}
		for(var i=0; i<piece.blocks.length; i++) piece.blocks[i].x -= block_len;	
    }
}

function moveRight(piece) {
	if(piece.start_x == start_x1) {				// this is piece a
		var grid = onLeft(sprite_yellow) ? grid_yellow : grid_orange;
	}	
	else {											// this is piece b
		var grid = onLeft(sprite_yellow) ? grid_orange : grid_yellow;
	}
	
    if(piece.blocks[3].x+block_len < piece.start_x+grid_width) {
        for(var i=0; i<piece.blocks.length; i++) {
			var coord = translateToArrayCoord(piece.blocks[i].x, piece.blocks[i].y, piece.start_x);
			if(grid.arr[coord[0]+1][coord[1]] == 1) return;
		}
		for(var i=0; i<piece.blocks.length; i++) piece.blocks[i].x += block_len;	
    }
}

// 19 shapes, 0 to 18
function choosePieceShape() {
    return Math.floor(Math.random()*19);
}

// x, y: arr coord of the piece
// sx, sy: starting world coord of the piece
function translateToWorldCoord(x, y, sx) {
    world_x = x * block_len + sx;
    world_y = y * block_len + start_y;
    return [world_x, world_y];
}

// x, y: world coord of the block
// sx, sy: starting world coord of the block
function translateToArrayCoord(x, y, sx) {
    arr_x = (x - sx) / block_len;
    arr_y = (y - start_y) / block_len;
    return [arr_x, arr_y];
}

function onLeft(sprite) {
    if(sprite.x == x1) {
        return true;
    }
    return false;
}

function collide(curr_piece, grid) {
    // collide with grid's base
    if(curr_piece.base.y+block_len == start_y+block_len+grid_height) {
        return true;
    }
    
    // collide with other pieces  
    for(var i=0; i<curr_piece.blocks.length; i++) {
        var coord = translateToArrayCoord(curr_piece.blocks[i].x, curr_piece.blocks[i].y, grid.piece_start_x);
        if(grid.arr[coord[0]][coord[1]+1]==1) {		
            return true;
        }
    }
  
    return false;
}

function renderUpdatedGrid(grid) {
	for(var i=0; i<grid.arr.length; i++) {
		for(var j=0; j<grid.arr[i].length; j++) {
			if(grid.arr[i][j] == 1) {
				var coord = translateToWorldCoord(i, j, grid.piece_start_x);
				grid.grid_sprite.push(this.game.add.sprite(coord[0], coord[1], 'sprite_block'));
			}
		}
	}
}

function destroyPiece(curr_piece) {
    for(var i=0; i<curr_piece.blocks.length; i++) {
        curr_piece.blocks[i].destroy();
    }
}

function resetBlockSprites(grid) {
	for(var i=0; i<grid.grid_sprite.length; i++) {
		grid.grid_sprite[i].destroy();
	}
}

function checkCompletedRow(grid) {
	for(var j=0; j<21; j++) {
		var sum = 0;
		var complete = new Array();
		for(var i=0; i<10; i++) {
			sum += grid.arr[i][j];
		}
		
		if(sum == 10) { 		 // row is complete
			complete.push(j);
		}

		for(var k=0; k<complete.length; k++) {
			var sprite_rowcleared = this.game.add.sprite(grid.piece_start_x+45, 100, 'sprite_rowcleared');
			sprite_rowcleared.alpha = 0;
			this.game.add.tween(sprite_rowcleared).to({alpha:1}, 500, Phaser.Easing.Linear.None,  true, 0, 0, true);
			
			score += 10;
			scoreText.setText(score.toString());
			sound_clear.play();
			
			// shift rows above k down
			for(var n=complete[k]-1; n>-1; n--) {
				for(var m=0; m<10; m++) {
						grid.arr[m][n+1] = grid.arr[m][n];
						grid.arr[m][n] = 0;
				}
			}
		}	
	}
	resetBlockSprites(grid);
	renderUpdatedGrid(grid);
}