/*Piece = function(game, start_x, lane, piece_type) {
    this.game = game;
    this.start_x = start_x;
    this.start_y = start_y;
    this.lane = lane;
    this.piece = getPiece(0);
    renderPiece(this.piece.states[this.piece.curr_state], this.start_x, this.lane, this.game);
    
    //this.center
}

function zShape() {
    this.state_0 = [ [1,1,0],
                     [0,1,1] ];
    this.state_1 = [ [0,1],
                     [1,1],
                     [1,0] ];
    this.states = [this.state_0, this.state_1];
    this.curr_state = 0;
}

function iShape() {
    this.state_0 = [ [1],
                     [1],
                     [1],
                     [1] ];
    this.state_1 = [ [1],[1],[1],[1] ];
    this.states = [this.state_0, this.state_1];
    this.curr_state = 0;
}

function oShape() {
    this.state_0 = [ [1,1],
                     [1,1] ];
    this.states =[this.state_0];
    this.curr_state = 0;
}

function sShape() {
    this.state_0 = [ [0,1,1],
                     [1,1,0] ];
    this.state_1 = [ [1,0],
                     [1,1],
                     [0,1] ];
    this.states = [this.state_0, this.state_1];
    this.curr_state = 0;
}

function lShape() {
    this.state_0 = [ [1,1,1],
                     [1,0,0] ];
    this.state_1 = [ [1,1],
                     [0,1],
                     [0,1] ];
    this.state_2 = [ [0,0,1],
                     [1,1,1] ];
    this.state_3 = [ [1,0],
                     [1,0],
                     [1,1] ];    
    this.states = [this.state_0, this.state_1, this.state_2, this.state_3];
    this.curr_state = 0;
}

function jShape() {
    this.state_0 = [ [1,1,1],
                     [0,0,1] ];
    this.state_1 = [ [0,1],
                     [0,1],
                     [1,1] ];
    this.state_2 = [ [1,0,0],
                     [1,1,1] ];
    this.state_3 = [ [1,1],
                     [1,0],
                     [1,0] ];
    this.states = [this.state_0, this.state_1, this.state_2, this.state_3];
    this.curr_state = 0;
}

function tShape() {
    this.state_0 = [ [1,1,1],
                     [0,1,0] ];
    this.state_1 = [ [0,1],
                     [1,1],
                     [0,1] ];
    this.state_2 = [ [0,1,0],
                     [1,1,1] ];
    this.state_3 = [ [1,0],
                     [1,1],
                     [1,0] ];
    this.states = [this.state_0, this.state_1, this.state_2, this.state_3];
    this.curr_state = 0;
}

function getPiece(piece_type) {
    switch(piece_type) {
        case 0: return new zShape(); break;
        case 1: return new iShape(); break;
        case 2: return new oShape(); break;
        case 3: return new sShape(); break;
        case 4: return new lShape(); break;
        case 5: return new jShape(); break;
        case 6: return new tShape(); break;
    }
}

function renderPiece(blocks, sx, lane, game) {
    var temp = new Array();
    for(var i=0; i<blocks.length; i++) {
        for(var j=0; j<blocks[i].length; j++) {
            if(blocks[i][j] == 1) {
                var coord = translateToWorldCoord(i, j, sx);
                temp.push(game.add.sprite(coord[0]+lane*block_len, coord[1], 'sprite_block'));
            }
        }
    }
    
    // check if within left and right bounds, else move within bounds
    if(!withinLeftBound(temp)) {
        for(var i=0; i<temp.length; i++) {
            temp[i].x += block_len;
        }
    }
    if(!withinRightBound(temp)) {
        for(var i=0; i<temp.length; i++) {
            temp[i].x -= block_len;
        }
    }
}

function withinLeftBound(piece) {
    for(var i=0; i<piece.length; i++) {
        if(piece[i].x < this.start_x) {
            return false;
        }
    }
    return true;
}

function withinRightBound(piece) {
    for(var i=0; i<piece.length; i++) {
        if(piece.x+block_len > this.start_x+grid_width) {
            return false;
        }
    }
    return true;
} */

Piece = function(game, start_x, lane, piece) {
    this.game = game;
    
    this.start_x = start_x; 
    this.start_y = start_y;
    
    this.lane_num = lane;
    this.piece_type = piece;
    this.blocks = new Array();
    
    this.base = undefined;                      
    
    this.drawPiece();
    //console.log(lane);
};

Piece.prototype = {
    
    drawPiece: function() {
        this.blocks.length = 0;
        
        // [0] and [3] are the far left and far right blocks respectively
        switch(this.piece_type) {
            // z-shape
            case 0: this.blocks[0] = this.game.add.sprite(block_len*this.lane_num+this.start_x-block_len, this.start_y, 'sprite_block');
                    this.blocks[1] = this.game.add.sprite(block_len*this.lane_num+this.start_x, this.start_y, 'sprite_block');
                    this.blocks[2] = this.game.add.sprite(block_len*this.lane_num+this.start_x, this.start_y+block_len, 'sprite_block');
                    this.blocks[3] = this.game.add.sprite(block_len*this.lane_num+this.start_x+block_len, this.start_y+block_len, 'sprite_block');
                    this.base = this.blocks[3];
                    break;
            
            // i-shape
            case 1:
                this.blocks[0] = this.game.add.sprite(block_len*this.lane_num+this.start_x, this.start_y, 'sprite_block');
                this.blocks[1] = this.game.add.sprite(block_len*this.lane_num+this.start_x, this.start_y+block_len, 'sprite_block');
                this.blocks[2] = this.game.add.sprite(block_len*this.lane_num+this.start_x, this.start_y+2*block_len, 'sprite_block');
                this.blocks[3] = this.game.add.sprite(block_len*this.lane_num+this.start_x, this.start_y+3*block_len, 'sprite_block');
                this.base = this.blocks[3];
                break;
            
            // o-shape
            case 2:
                this.blocks[0] = this.game.add.sprite(block_len*this.lane_num+this.start_x, this.start_y, 'sprite_block');
                this.blocks[1] = this.game.add.sprite(block_len*this.lane_num+this.start_x+block_len, this.start_y, 'sprite_block');
                this.blocks[2] = this.game.add.sprite(block_len*this.lane_num+this.start_x, this.start_y+block_len, 'sprite_block');
                this.blocks[3] = this.game.add.sprite(block_len*this.lane_num+this.start_x+block_len, this.start_y+block_len, 'sprite_block');
                this.base = this.blocks[3];
                break;   
            
            // s-shape
            case 3:
                this.blocks[0] = this.game.add.sprite(block_len*this.lane_num+this.start_x-block_len, this.start_y+block_len, 'sprite_block');
                this.blocks[1] = this.game.add.sprite(block_len*this.lane_num+this.start_x, this.start_y, 'sprite_block');
                this.blocks[2] = this.game.add.sprite(block_len*this.lane_num+this.start_x, this.start_y+block_len, 'sprite_block');
                this.blocks[3] = this.game.add.sprite(block_len*this.lane_num+this.start_x+block_len, this.start_y, 'sprite_block');
                this.base = this.blocks[0];
                break;
            
            // l-shape
            case 4:
                this.blocks[0] = this.game.add.sprite(block_len*this.lane_num+this.start_x-block_len, this.start_y, 'sprite_block');
                this.blocks[1] = this.game.add.sprite(block_len*this.lane_num+this.start_x, this.start_y, 'sprite_block');
                this.blocks[2] = this.game.add.sprite(block_len*this.lane_num+this.start_x-block_len, this.start_y+block_len, 'sprite_block');
                this.blocks[3] = this.game.add.sprite(block_len*this.lane_num+this.start_x+block_len, this.start_y, 'sprite_block'); 
                this.base = this.blocks[2];
                break;
            
            // j-shape
            case 5:
                this.blocks[0] = this.game.add.sprite(block_len*this.lane_num+this.start_x-block_len, this.start_y, 'sprite_block');
                this.blocks[1] = this.game.add.sprite(block_len*this.lane_num+this.start_x, this.start_y, 'sprite_block');
                this.blocks[2] = this.game.add.sprite(block_len*this.lane_num+this.start_x+block_len, this.start_y+block_len, 'sprite_block');
                this.blocks[3] = this.game.add.sprite(block_len*this.lane_num+this.start_x+block_len, this.start_y, 'sprite_block');
                this.base = this.blocks[2];
                break;
                
            // t-shape
            case 6:
                this.blocks[0] = this.game.add.sprite(block_len*this.lane_num+this.start_x-block_len, this.start_y+block_len, 'sprite_block');
                this.blocks[1] = this.game.add.sprite(block_len*this.lane_num+this.start_x, this.start_y+block_len, 'sprite_block');
                this.blocks[2] = this.game.add.sprite(block_len*this.lane_num+this.start_x, this.start_y, 'sprite_block');
                this.blocks[3] = this.game.add.sprite(block_len*this.lane_num+this.start_x+block_len, this.start_y+block_len, 'sprite_block');
                this.base = this.blocks[3];
                break;   
        } 
        
        // check if within left bound, else shift it within bounds
        if(this.blocks[0].x < this.start_x) {
            for(var i=0; i<this.blocks.length; i++) {
                this.blocks[i].x += block_len;
            }
        }
        // check if within right bound, else shift it within bounds
        // this.blocks[3].x is at the top left hence need to +block_len to get the x-coord on the right
        if(this.blocks[3].x+block_len > this.start_x+grid_width) {
            for(var i=0; i<this.blocks.length; i++) {
                this.blocks[i].x -= block_len;
            }
        }
        
        //for(var i=0; i<this.blocks.length; i++)
        //    console.log(this.blocks[i].x, this.blocks[i].y);
    },
    
    // default action for block movement
    fall: function() {
        for(var i=0; i<this.blocks.length; i++) {
            this.blocks[i].y += block_len;
        }
    }
        
};
