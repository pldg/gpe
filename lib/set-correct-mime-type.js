function setCorrectMimeType(ext) {
  // Correct jpg mime type
  // https://stackoverflow.com/a/37266399/
  if (ext === 'jpg') return 'jpeg';
  else return ext;
}

module.exports = setCorrectMimeType;