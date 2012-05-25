function new_game() {
}

function make_move() {
   var board = get_board();
   
   var my_x = get_my_x();
   var my_y = get_my_y();
  
   // we found an item! take it!
   if (board[my_x][my_y] > 0 && required_type(board[my_x][my_y])) {
       return TAKE;
   }

   /*
   var rand = Math.random() * 4;

   if (rand < 1) return NORTH;
   if (rand < 2) return SOUTH;
   if (rand < 3) return EAST;
   if (rand < 4) return WEST;
   */

   var next = get_nearest();
   if(next[0]>my_x) return EAST;
   if(next[0]<my_x) return WEST;
   if(next[1]<my_y) return NORTH;
   if(next[1]>my_y) return SOUTH;

   return PASS;
}

function get_nearest() {

	var board = get_board();

	var my_x = get_my_x();
	var my_y = get_my_y();

	var res = [my_x, my_y];

	var	mn = 9007199254747992;
	for(r = 0;r<board.length;r++) {
		for(c = 0;c<board[r].length;c++) {
			if(has_item(board[r][c]) && required_type(board[r][c])) {
				var diff = Math.abs(my_x-r)+Math.abs(my_y-c);
				if(diff<mn) {
					mn = diff;
					var res = [r, c];
				}
			}
		}
	}

	return res;
}

function required_type(t) {

	 var half = get_total_item_count(t)/2.0;
	 var my_count = get_my_item_count(t);
	 var opp_count = get_my_item_count(t);
	 return my_count<=half && opp_count<=half;
}
