var BoardView = function () {
  var context = null;
  var board = null;
  var RECT_LENGTH = 20;
  var RECT_WIDTH = 20;

  var colormap = {
    "Y" : "yellow",
    "B" : "blue",
    "R" : "red"
  }
  var draw_block = function (i, j, color) {
    if (color != null) {
      context.fillStyle = colormap[color];
      context.fillRect(i * RECT_LENGTH, j * RECT_WIDTH, RECT_LENGTH, RECT_WIDTH);
    };
  }
  
  return {
    set_board: function (b) {
      board = b
    },
    set_context : function (c) {
      context = c;
    },

    show : function () {
      points = board.get_point_matrix();
      for (var i = 0; i < points.length; ++i) {
        for (var j = 0; j < points[i].length; j++) {
          draw_block(j, i, points[i][j])
        };
      }
    }
  }
}