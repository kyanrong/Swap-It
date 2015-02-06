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
var grid_sprite_yellow, grid_sprite_orange;                         // stores the sprites in the current grid
var curr_piece_a, curr_piece_b;                                     // a is always on the left, b on the right
var next_lane_a, next_ps_a, next_lane_b, next_ps_b;                 // next lane, next piece shape
var fall_time = 0, max_fall_time = 500;
var p =0;

function preload() {
    this.game.load.image('sprite_bg', 'assets/bg.png');
    this.game.load.image('sprite_yellow', 'assets/grid_yellow.png');
    this.game.load.image('sprite_orange', 'assets/grid_orange.png');
    this.game.load.image('sprite_block', 'assets/block.png');
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
    
    spacebar_key.onDown.add(swap, sprite_orange, sprite_yellow);
    
    grid_yellow = new Grid(this.game, start_x1, start_y);
    grid_orange = new Grid(this.game, start_x2, start_y);
    
    grid_sprite_yellow = new Array();
    grid_sprite_orange = new Array();
    
    // create tetris pieces for the 2 grids
    curr_piece_a = new Piece(this.game, start_x1, chooseLane(), choosePieceShape());
    curr_piece_b = new Piece(this.game, start_x2, chooseLane(), choosePieceShape());
    //curr_piece_a = new Piece(this.game, start_x1, 0, 2);
    
    next_lane_a = chooseLane();
    next_ps_a = choosePieceShape();
    next_lane_b = chooseLane();
    next_ps_b = choosePieceShape();
    
    /*p += 2;
    next_lane_a = 2;
    next_ps_a = p;*/
}

function update() {    
    if(down_key_b.isDown) {
        max_fall_time = 50;
    }
    
    if(this.game.time.now > fall_time) {
        
        // check the sprite positions of the grids
        // piece_a always on the left, piece_b always on the right
        if(onLeft(sprite_yellow)) {         // == sprite_orange on the right
            if(collide(curr_piece_a, grid_yellow)) {
                grid_yellow.updateGrid(curr_piece_a, false, null);
                checkCompletedRow(grid_yellow, grid_sprite_yellow);
                renderUpdatedGrid(grid_yellow, grid_sprite_yellow);
                destroyPiece(curr_piece_a);
                
                curr_piece_a = new Piece(this.game, start_x1, next_lane_a, next_ps_a);
                next_lane_a = chooseLane();
                next_ps_a = choosePieceShape();
               /* p+=2;
                next_lane_a = p;
                next_ps_a = 2;*/
            }
            else {
                curr_piece_a.fall();
            }
            if(collide(curr_piece_b, grid_orange)) {
                grid_orange.updateGrid(curr_piece_b, false, null);
                checkCompletedRow(grid_orange, grid_sprite_orange);
                renderUpdatedGrid(grid_orange, grid_sprite_orange);
                destroyPiece(curr_piece_b);
                
                
                curr_piece_b = new Piece(this.game, start_x2, next_lane_b, next_ps_b);
                next_lane_b = chooseLane();
                next_ps_b = choosePieceShape();
            }
            else {
                curr_piece_b.fall();
            }
        }
        
        // swapped 
        else {
            if(collide(curr_piece_a, grid_orange)) {
                grid_orange.updateGrid(curr_piece_a, false, null);
                checkCompletedRow(grid_orange, grid_sprite_orange);
                renderUpdatedGrid(grid_orange, grid_sprite_orange);
                destroyPiece(curr_piece_a);
                
                
                curr_piece_a = new Piece(this.game, start_x1, next_lane_a, next_ps_a);
                next_lane_a = chooseLane();
                next_ps_a = choosePieceShape();
            }
            else {
                curr_piece_a.fall();
            }
            if(collide(curr_piece_b, grid_yellow)) {
                grid_yellow.updateGrid(curr_piece_b, false, null);
                checkCompletedRow(grid_yellow, grid_sprite_yellow);
                renderUpdatedGrid(grid_yellow, grid_sprite_yellow);
                destroyPiece(curr_piece_b);
                
                
                curr_piece_b = new Piece(this.game, start_x2, next_lane_b, next_ps_b);
                next_lane_b = chooseLane();
                next_ps_b = choosePieceShape();
            }
            else {
                curr_piece_b.fall();
            }
        }

        //prev_time = curr_time;
        fall_time = this.game.time.now + max_fall_time;
        max_fall_time = 500;
    }


}

// Helper functions 
function swap() {
    resetBlockSprites();
    
    if(sprite_orange.x == x1) {
        sprite_orange.x = x2;
        grid_orange.piece_start_x = start_x2;
        sprite_yellow.x = x1;
        grid_yellow.piece_start_x = start_x1;
    }
    else {
        sprite_orange.x = x1;
        grid_orange.piece_start_x = start_x1;
        sprite_yellow.x = x2;
        grid_yellow.piece_start_x = start_x2;
    }

    renderUpdatedGrid(grid_yellow, grid_sprite_yellow);
    renderUpdatedGrid(grid_orange, grid_sprite_orange);
    console.log('swap done');
}

// 10 lanes, 0 to 9
function chooseLane() {
    return Math.floor(Math.random()*10);
}

// 7 shapes, 0 to 6
function choosePieceShape() {
    return Math.floor(Math.random()*7);
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
        if(grid.arr[coord[0]][coord[1]+1] == 1) {
            return true;
        }
    }
  
    return false;
}

function renderUpdatedGrid(grid, grid_sprite) {
    for(var i=0; i<grid.arr.length; i++) {
        for(var j=0; j<grid.arr[i].length; j++) {
            if(grid.arr[i][j] == 1) {
                var coord = translateToWorldCoord(i, j, grid.piece_start_x);
                grid_sprite.push(this.game.add.sprite(coord[0], coord[1], 'sprite_block'));
            }
        }
    }
}

function destroyPiece(curr_piece) {
    for(var i=0; i<curr_piece.blocks.length; i++) {
        curr_piece.blocks[i].destroy();
    }
}

function resetBlockSprites() {
    for(var i=0; i<grid_sprite_orange.length; i++) {
        grid_sprite_orange[i].destroy();
    }
    for(var i=0; i<grid_sprite_yellow.length; i++) {
        grid_sprite_yellow[i].destroy();
    }
}

function checkCompletedRow(grid, grid_sprite) {
    for(var j=19; j>-1; j--) {
        for( var i=0; i<10; i++) {
            //console.log(i,j);
            if(grid.arr[i][j] == 0) {  
                console.log('zero');
                return;
            }
        }
        // current row is completed
        console.log('current row completed');
        grid.updateGrid(null, true, j)
        resetBlockSprites();
        //renderUpdatedGrid(grid, grid_sprite);
    }
}