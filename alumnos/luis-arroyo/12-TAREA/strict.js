"use strict";
function normalFn() {
  console.log("This -> normal fn: ", this);
}

function callbackfn() {
  console.log("callback ", this);
}

function receiveCallback(fn) {
  fn();
}

normalFn();
receiveCallback(callbackfn);

//ambos devuelven undefined, ya que en modo strict no se mancha el scope global
