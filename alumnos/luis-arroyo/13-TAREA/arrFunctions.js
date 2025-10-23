// Hace propias implementaciones de filtre map y reduce modificando el prototipo

Array.prototype.map = function (callback, thisArg) {
  if (this === null) {
    throw new TypeError();
  }
  const arrayOriginal = Object(this);
  const len = arrayOriginal.length;
  const newArray = new Array(len);
  console.log(arrayOriginal);
  console.log(len);
  const context = thisArg;
  for (let i = 0; i < len; i++) {
    if (i in arrayOriginal) {
      const value = callback(this[i]);
      newArray[i] = value;
    }
  }

  return newArray;
};

let res = [1, 2, 3].map((e) => e + 1);
console.log(res);

Array.prototype.filter = function (callback, thisArg) {
  if (this === null) {
    throw new TypeError();
  }
  const arrayOriginal = Object(this);
  const newArray = new Array();
  const len = arrayOriginal.length;
  console.log(arrayOriginal);
  console.log(len);
  const context = thisArg;
  for (let i = 0; i < len; i++) {
    if (callback(this[i])) {
      const value = this[i];
      newArray.push(value);
    }
  }

  return newArray;
};

res = [1, 2, 3, 4, 6].filter((e) => e % 2 == 0);
console.log(res);

Array.prototype.reduce = function (callback, initialValue) {
  if (this === null) {
    throw new TypeError("");
  }

  const arrayOriginal = Object(this);
  const len = arrayOriginal.length;
  let accumulator;
  let i = 0;

  if (arguments.length > 1) {
    accumulator = initialValue;
  } else {
    while (i < len && !(i in arrayOriginal)) {
      i++;
    }
    if (i >= len) {
      throw new TypeError("");
    }
    accumulator = arrayOriginal[i++];
  }

  while (i < len) {
    if (i in arrayOriginal) {
      accumulator = callback(accumulator, arrayOriginal[i], i, arrayOriginal);
    }
    i++;
  }

  return accumulator;
};

res = [1, 2, 3].reduce((acc, num) => acc + num);
console.log(res);
