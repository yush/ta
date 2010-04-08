var assert = function (b, text, value) {
  if (b) {
    console.log("ok");
  } else {
    console.error("FAIL : " + text);
    if (value) {
      console.error(value);
    }
  }
}

var arrayEquals = function(tab1, tab2) {
  for (i = 0; i < tab1.length; ++i) {
    for (j = 0;j < tab1[i].length; ++j) {
      if (tab1[i][j] != tab2[i][j]) {
        return false;
      }
    }
  }
  return true;
}