"use strict";

var _ = require("lodash");
var diacritics = require("diacritics");

module.exports = extractProps;

function extractProps (content) {
  var lines = content.trim().split(/[\r\n]/);
  var props = {};

  while (addProp(props, lines[0])) {
    lines.shift();
  }

  return _.extend(props, {
    "content": lines.join("\n")
  });
}

function addProp (props, line) {
  if (!line) {
    return false;
  }

  line = line.trim();
  var m = line.match(/^\$([a-z\-]+):([^\$]+?)\$$/i);

  if (!m) {
    return false;
  }

  var prop = m[1].toLowerCase().trim();
  var val = m[2].toLowerCase().trim();

  switch (prop) {

    case "class":
      if (!props.classes) {
        props.classes = [];
      }
      props.classes = props.classes.concat(val.split(/\s+/));
      break;

    case "id":
      props.id = val;
      break;

    case "chapter":
      props.chapter = {
          "title": chapter,
          "id": cleanString(chapter)
      };
      break;

    default:
      if (!props.datas) {
        props.datas = {};
      }
      props.datas[prop] = val;
      break;

  }

  return true;
}

function cleanString (s) {
  return diacritics.remove(s.toLowerCase().replace(/\s+/g, "-"));
}
