var test_transpose_matrix = function () {
  var board = Board([
    [null, null, null, null],
    ["B", "Y", null, null],
    ["B", "R", "G", null]
  ]);
  assert(arrayEquals(board.transposed_matrix(), [
    [null, "B", "B"],
    [null, "Y", "R"],
    [null, null, "G"],
    [null, null, null]
  ]),"transposed matrix isn't functional");
}

var test_line_numbers = function () {
  var board = Board([
    [null, null, null, null, null],
    ["B", null, null, null, null],
    ["B", null, null, null, null],
    ["Y", "R", null, null, null]
  ]);
  assert(board.line_number() == 3, "line number not ok in test_board (1)");
  var board = Board([
    [null, null, null, null, null],
    [null, null, null, null, null],
    ["B", null, null, null, null],
    ["Y", "R", null, null, null]
  ]);
  assert(board.line_number() == 2, "line number not ok in test_board (2)");
}

var test_blocks_process = function () {
  var board = Board([
    ["Y", null, null, null, null],
    ["Y", "Y", "Y", null, null],
    ["B", "R", "B", null, null]
  ]);
  board.process_blocks();
  assert(arrayEquals(board.get_point_matrix(), [
    ["Y", null, null, null, null],
    [null, null, null, null, null],
    ["B", "R", "B", null, null]
  ]), "block process (3-lines) wasn't done right");
};

var test_blocks_process_columns = function () {
  var board = Board([
    ["Y", null, null, null, null],
    ["Y", "R", "Y", null, null],
    ["Y", "R", "B", null, null]
  ]);
  board.process_blocks();
  assert(arrayEquals(board.get_point_matrix(), [
    [null, null, null, null, null],
    [null, "R", "Y", null, null],
    [null, "R", "B", null, null]
  ]), "block process (3-columns) wasn't done right");
};

var test_falldown = function () {
  var board = Board([
    ["Y", null, null, null, null],
    [null, "R", "Y", null, null],
    [null, "R", "B", null, null]
  ]);
  board.falldown_blocks();
  assert(arrayEquals(board.get_point_matrix(), [
    [null, null, null, null, null],
    [null, "R", "Y", null, null],
    ["Y", "R", "B", null, null]
  ]), "falldown block wasn't done right");
};

var test_swap = function () {
  var board = Board([
    ["Y", null, "B", null, null],
    ["B", "R", "Y", null, null],
    ["Y", "R", "B", null, null]
  ]);
  board.swap_block([0, 1]);
  assert(arrayEquals(board.get_point_matrix(), [
    ["Y", null, "B", null, null],
    ["R", "B", "Y", null, null],
    ["Y", "R", "B", null, null]
  ]), "swap block wasn't done right", board.get_point_matrix());
}

var test_show = function () {
  var board = Board([
    ["Y", null, "B", null, null],
    ["B", "R", "Y", null, null],
    ["Y", "R", "B", null, null]
  ]);  
  $('#big-view').append('<canvas id="board_test" width="838" height="220"></canvas>');
  var board_view = BoardView();
  board_view.set_context(document.getElementById("board_test").getContext("2d"));
  board_view.set_board(board);
  board_view.show();
}

var test_board = function () {
  test_transpose_matrix();
  test_line_numbers();
  test_blocks_process();
  test_blocks_process_columns();
  test_falldown();
  test_swap();
  test_show();
};

var all_test = function () {
  test_board();
};

$(function () {
  all_test();
});
