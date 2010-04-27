var Board = function (tab) {
  var point_matrix = $A(tab);
  var max = function (tab, fun) {
    var res = 0;
    tab.each(function (e) {
      new_res = fun(e);
      if (new_res > res) {
        res = new_res;
      };
    });
    return res;
  };
  var number_of_elements = function (e) {
    res = 0;
    e.each(function(el) {
      if (el != null) {
        res += 1;
      }
    });
    return res;
  };
  var transpose_matrix = function (tab) {
    var new_res = [];
    for (x = 0; x < tab.length; ++x) {
      for (y = 0; y < tab[x].length; ++y) {
        if (!new_res[y]) {
          new_res[y] = [];
        }
        new_res[y][x] = tab[x][y];
      }
    }
    return new_res;
  };
  var column_max = function () {
    return max(transpose_matrix(point_matrix), function (e) {
      return number_of_elements(e);
    });
  };
  var process_line = function (tab) {
    res = 0;
    previous = null;
    for(i = 0; i < tab.length; ++i) {
      if (previous == tab[i]) {
        ++res;
        if (res >= 2) {
          for(j = 0; j <= res; ++j) {
            tab[i - j] = null;
          }
        }
      } else {
        res = 0;
      }
      previous = tab[i];
    }
    return tab;
  };

  var process_blocks = function () {
    // line rules
    point_matrix = point_matrix.map(function(line) {
      return process_line(line);
    });
    // column rules
    point_matrix = transpose_matrix(transpose_matrix(point_matrix).map(function(column) {
      return process_line(column);
    }));
  }

  var falldown_column = function (column) {
    parts = column.partition(function(e){
      return e == null;
    });
    return $A(parts[0]).concat($A(parts[1]));
  };

  var falldown_blocks = function () {
    point_matrix = transpose_matrix(transpose_matrix(point_matrix).map(function(column) {
      return falldown_column(column);
    }));
  };

  var swap_block = function (point) {
    y = point[0];
    x = point[1];
    tmp = point_matrix[x][y];
    point_matrix[x][y] = point_matrix[x][y + 1];
    point_matrix[x][y + 1] = tmp;
  };

  return {
    line_number : function () {
      return column_max();
    },
    get_point_matrix : function () {
      return point_matrix;
    },
    transposed_matrix : function () {
      return transpose_matrix(point_matrix);
    },
    process_blocks : process_blocks,
    falldown_blocks : falldown_blocks,
    swap_block : swap_block
  };
}
