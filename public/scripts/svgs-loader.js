var ajax = new XMLHttpRequest();
ajax.open("GET", "../components/svg/symbol-defs.svg", true);
ajax.send();
ajax.onload = function () {
  var div = document.createElement("div");
  div.innerHTML = ajax.responseText;
  document.body.insertBefore(div, document.body.childNodes[0]);
};