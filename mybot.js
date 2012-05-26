
var countArray;
var current;
function new_game() {
    countArray = new Array(get_number_of_item_types());
    for(i=0;i<countArray.length;i++) {
        countArray[i] = [i+1, get_total_item_count(i+1)];
    }

    countArray.sort(function(a, b){return a[1]-b[1]});
    current = countArray[0][0];
}

function make_move() {
   var board = get_board();
   
   var my_x = get_my_x();
   var my_y = get_my_y();
   for(i=0;i<countArray.length;i++) {
       var t = countArray[i][0];
       if(required_type(t)) {
           current = t;
           break;
       }
   }
  
   // we found an item! take it!
   var t = board[my_x][my_y];
   if (t > 0) {
    
       if(t==current) {
            return TAKE;
       }
   }

   /*
   var rand = Math.random() * 4;

   if (rand < 1) return NORTH;
   if (rand < 2) return SOUTH;
   if (rand < 3) return EAST;
   if (rand < 4) return WEST;
   */

   var next = get_nearest_required();
   if(next[0]>my_x) return EAST;
   if(next[0]<my_x) return WEST;
   if(next[1]<my_y) return NORTH;
   if(next[1]>my_y) return SOUTH;
   
   return PASS;
}

function get_nearest_required() {

    var board = get_board();
    var x = get_my_x();
    var y = get_my_y();
    var res = [x, y];
	var	mn = 9007199254747992;
    for(r = 0;r<board.length;r++) {
        for(c=0;c<board[r].length;c++) {
            var t = board[r][c];
            if(t==current) {
                var diff = Math.abs(x-r)+Math.abs(y-c);
                if(diff<mn) {
                    mn = diff;
                    var res = [r, c];
                }
            }
        }
    }
    return res;

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
    var total = get_total_item_count(t);
	 var half = total/2.0;
	 var my_count = get_my_item_count(t);
	 var opp_count = get_opponent_item_count(t);
	 return (my_count<=half) && (opp_count<=half) && ((my_count+opp_count)<total);
}
