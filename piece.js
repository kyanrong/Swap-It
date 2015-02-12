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
        // 19 states. 0 to 18
        switch(this.piece_type) {
            // z-shape, -|_
            case 0: this.blocks[0] = this.game.add.sprite(block_len*this.lane_num+this.start_x-block_len, this.start_y, 'sprite_block');
                    this.blocks[1] = this.game.add.sprite(block_len*this.lane_num+this.start_x, this.start_y, 'sprite_block');
                    this.blocks[2] = this.game.add.sprite(block_len*this.lane_num+this.start_x, this.start_y+block_len, 'sprite_block');
                    this.blocks[3] = this.game.add.sprite(block_len*this.lane_num+this.start_x+block_len, this.start_y+block_len, 'sprite_block');
                    this.base = this.blocks[3];
                    break;
            
            // i-shape, vertical
            case 1:
                this.blocks[0] = this.game.add.sprite(block_len*this.lane_num+this.start_x, this.start_y-block_len, 'sprite_block');
                this.blocks[1] = this.game.add.sprite(block_len*this.lane_num+this.start_x, this.start_y, 'sprite_block');
                this.blocks[2] = this.game.add.sprite(block_len*this.lane_num+this.start_x, this.start_y+block_len, 'sprite_block');
                this.blocks[3] = this.game.add.sprite(block_len*this.lane_num+this.start_x, this.start_y+2*block_len, 'sprite_block');
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
            
            // s-shape, _|-
            case 3:
                this.blocks[0] = this.game.add.sprite(block_len*this.lane_num+this.start_x-block_len, this.start_y+block_len, 'sprite_block');
                this.blocks[1] = this.game.add.sprite(block_len*this.lane_num+this.start_x, this.start_y, 'sprite_block');
                this.blocks[2] = this.game.add.sprite(block_len*this.lane_num+this.start_x, this.start_y+block_len, 'sprite_block');
                this.blocks[3] = this.game.add.sprite(block_len*this.lane_num+this.start_x+block_len, this.start_y, 'sprite_block');
                this.base = this.blocks[0];
                break;
            
            // l-shape, |--
            case 4:
                this.blocks[0] = this.game.add.sprite(block_len*this.lane_num+this.start_x-block_len, this.start_y, 'sprite_block');
                this.blocks[1] = this.game.add.sprite(block_len*this.lane_num+this.start_x, this.start_y, 'sprite_block');
                this.blocks[2] = this.game.add.sprite(block_len*this.lane_num+this.start_x-block_len, this.start_y+block_len, 'sprite_block');
                this.blocks[3] = this.game.add.sprite(block_len*this.lane_num+this.start_x+block_len, this.start_y, 'sprite_block'); 
                this.base = this.blocks[2];
                break;
            
            // j-shape, --|
            case 5:
                this.blocks[0] = this.game.add.sprite(block_len*this.lane_num+this.start_x-block_len, this.start_y, 'sprite_block');
                this.blocks[1] = this.game.add.sprite(block_len*this.lane_num+this.start_x, this.start_y, 'sprite_block');
                this.blocks[2] = this.game.add.sprite(block_len*this.lane_num+this.start_x+block_len, this.start_y+block_len, 'sprite_block');
                this.blocks[3] = this.game.add.sprite(block_len*this.lane_num+this.start_x+block_len, this.start_y, 'sprite_block');
                this.base = this.blocks[2];			
                break;
                
            // t-shape _|_
            case 6:
                this.blocks[0] = this.game.add.sprite(block_len*this.lane_num+this.start_x-block_len, this.start_y+block_len, 'sprite_block');
                this.blocks[1] = this.game.add.sprite(block_len*this.lane_num+this.start_x, this.start_y+block_len, 'sprite_block');
                this.blocks[2] = this.game.add.sprite(block_len*this.lane_num+this.start_x, this.start_y, 'sprite_block');
                this.blocks[3] = this.game.add.sprite(block_len*this.lane_num+this.start_x+block_len, this.start_y+block_len, 'sprite_block');
                this.base = this.blocks[3];
                break;   
            
            // i-shape, horizontal, ----
            case 7: 
                this.blocks[0] = this.game.add.sprite(block_len*this.lane_num+this.start_x-block_len, this.start_y, 'sprite_block');
                this.blocks[1] = this.game.add.sprite(block_len*this.lane_num+this.start_x, this.start_y, 'sprite_block');
                this.blocks[2] = this.game.add.sprite(block_len*this.lane_num+this.start_x+block_len, this.start_y, 'sprite_block');
                this.blocks[3] = this.game.add.sprite(block_len*this.lane_num+this.start_x+2*block_len, this.start_y, 'sprite_block');
                this.base = this.blocks[3];
                break;
                
            // l-shape, -|
            case 8: 
                this.blocks[0] = this.game.add.sprite(block_len*this.lane_num+this.start_x, this.start_y, 'sprite_block');
                this.blocks[1] = this.game.add.sprite(block_len*this.lane_num+this.start_x+block_len, this.start_y, 'sprite_block'); 
                this.blocks[2] = this.game.add.sprite(block_len*this.lane_num+this.start_x+block_len, this.start_y+block_len, 'sprite_block');
                this.blocks[3] = this.game.add.sprite(block_len*this.lane_num+this.start_x+block_len, this.start_y+2*block_len, 'sprite_block');
                this.base = this.blocks[3];
                break;
            
            // t-shape, -|-
            case 9: 
                this.blocks[0] = this.game.add.sprite(block_len*this.lane_num+this.start_x-block_len, this.start_y, 'sprite_block');
                this.blocks[1] = this.game.add.sprite(block_len*this.lane_num+this.start_x, this.start_y, 'sprite_block');
                this.blocks[2] = this.game.add.sprite(block_len*this.lane_num+this.start_x, this.start_y+block_len, 'sprite_block');
                this.blocks[3] = this.game.add.sprite(block_len*this.lane_num+this.start_x+block_len, this.start_y, 'sprite_block');
                this.base = this.blocks[2];
                break;
            
            // j-shape, |___
            case 10: 
                this.blocks[0] = this.game.add.sprite(block_len*this.lane_num+this.start_x-block_len, this.start_y-block_len, 'sprite_block');
                this.blocks[1] = this.game.add.sprite(block_len*this.lane_num+this.start_x-block_len, this.start_y, 'sprite_block');
                this.blocks[2] = this.game.add.sprite(block_len*this.lane_num+this.start_x, this.start_y, 'sprite_block');
                this.blocks[3] = this.game.add.sprite(block_len*this.lane_num+this.start_x+block_len, this.start_y, 'sprite_block');
                this.base = this.blocks[3];
                break;
                
            // s-shape, '-|
            case 11: 
                this.blocks[0] = this.game.add.sprite(block_len*this.lane_num+this.start_x, this.start_y-block_len, 'sprite_block');
                this.blocks[1] = this.game.add.sprite(block_len*this.lane_num+this.start_x, this.start_y, 'sprite_block');
                this.blocks[2] = this.game.add.sprite(block_len*this.lane_num+this.start_x+block_len, this.start_y, 'sprite_block');
                this.blocks[3] = this.game.add.sprite(block_len*this.lane_num+this.start_x+block_len, this.start_y+block_len, 'sprite_block');
                this.base = this.blocks[3];
                break;
                
            // l-shape, |_
            case 12: 
                this.blocks[0] = this.game.add.sprite(block_len*this.lane_num+this.start_x, this.start_y-block_len, 'sprite_block');
                this.blocks[1] = this.game.add.sprite(block_len*this.lane_num+this.start_x, this.start_y, 'sprite_block');
                this.blocks[2] = this.game.add.sprite(block_len*this.lane_num+this.start_x, this.start_y+block_len, 'sprite_block');
                this.blocks[3] = this.game.add.sprite(block_len*this.lane_num+this.start_x+block_len, this.start_y+block_len, 'sprite_block');
                this.base = this.blocks[3];
                break;
            
            // l-shape, __|
            case 13: 
                this.blocks[0] = this.game.add.sprite(block_len*this.lane_num+this.start_x-block_len, this.start_y, 'sprite_block');
                this.blocks[1] = this.game.add.sprite(block_len*this.lane_num+this.start_x, this.start_y, 'sprite_block');
                this.blocks[2] = this.game.add.sprite(block_len*this.lane_num+this.start_x+block_len, this.start_y, 'sprite_block');
                this.blocks[3] = this.game.add.sprite(block_len*this.lane_num+this.start_x+block_len, this.start_y-block_len, 'sprite_block');
                this.base = this.blocks[2];
                break;
            
            // j-shape, _|
            case 14: 
                this.blocks[0] = this.game.add.sprite(block_len*this.lane_num+this.start_x, this.start_y, 'sprite_block');
                this.blocks[1] = this.game.add.sprite(block_len*this.lane_num+this.start_x+block_len, this.start_y, 'sprite_block');    
                this.blocks[2] = this.game.add.sprite(block_len*this.lane_num+this.start_x+block_len, this.start_y-block_len, 'sprite_block');
                this.blocks[3] = this.game.add.sprite(block_len*this.lane_num+this.start_x+block_len, this.start_y-2*block_len, 'sprite_block');
                this.base = this.blocks[0];
                break;
            
            // t-shape, -|
            case 15: 
                this.blocks[0] = this.game.add.sprite(block_len*this.lane_num+this.start_x, this.start_y, 'sprite_block');
                this.blocks[1] = this.game.add.sprite(block_len*this.lane_num+this.start_x+block_len, this.start_y, 'sprite_block');
                this.blocks[2] = this.game.add.sprite(block_len*this.lane_num+this.start_x+block_len, this.start_y-block_len, 'sprite_block');
                this.blocks[3] = this.game.add.sprite(block_len*this.lane_num+this.start_x+block_len, this.start_y+block_len, 'sprite_block');
                this.base = this.blocks[3];
                break;
            
            // j-shape, |-
            case 16: 
                this.blocks[0] = this.game.add.sprite(block_len*this.lane_num+this.start_x, this.start_y-block_len, 'sprite_block');
                this.blocks[1] = this.game.add.sprite(block_len*this.lane_num+this.start_x, this.start_y, 'sprite_block');
                this.blocks[2] = this.game.add.sprite(block_len*this.lane_num+this.start_x, this.start_y+block_len, 'sprite_block');
                this.blocks[3] = this.game.add.sprite(block_len*this.lane_num+this.start_x+block_len, this.start_y-block_len, 'sprite_block');
                this.base = this.blocks[2];
                break;
            
            // z-shape, |-'
            case 17: 
                this.blocks[0] = this.game.add.sprite(block_len*this.lane_num+this.start_x, this.start_y, 'sprite_block');
                this.blocks[1] = this.game.add.sprite(block_len*this.lane_num+this.start_x, this.start_y+block_len, 'sprite_block');
                this.blocks[2] = this.game.add.sprite(block_len*this.lane_num+this.start_x+block_len, this.start_y, 'sprite_block');
                this.blocks[3] = this.game.add.sprite(block_len*this.lane_num+this.start_x+block_len, this.start_y-block_len, 'sprite_block');
                this.base = this.blocks[1];
				
                break;
            
            // t-shape, |-
            case 18: 
                this.blocks[0] = this.game.add.sprite(block_len*this.lane_num+this.start_x, this.start_y-block_len, 'sprite_block');
                this.blocks[1] = this.game.add.sprite(block_len*this.lane_num+this.start_x, this.start_y, 'sprite_block');
                this.blocks[2] = this.game.add.sprite(block_len*this.lane_num+this.start_x, this.start_y+block_len, 'sprite_block');
                this.blocks[3] = this.game.add.sprite(block_len*this.lane_num+this.start_x+block_len, this.start_y, 'sprite_block');
                this.base = this.blocks[2];
                break;
        } 
    },
    
    // default action for block movement
    fall: function() {
        for(var i=0; i<this.blocks.length; i++) {
            this.blocks[i].y += block_len;
        }
    }
};
