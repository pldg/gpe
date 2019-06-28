function parseSrc(src) {
  if (src) {
    const isInteger = Number.isInteger(src);

    if (!isInteger || (isInteger && src <= 0)) {
      throw new Error('`src` can only be an integer greater then 0');
    } else {
      return src;
    }
  }
}

module.exports = parseSrc;