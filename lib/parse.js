"use strict";

var _ = require("lodash");
var fs = require("fs");
var path = require("path");
var markdown = require("./markdown");
var diacritics = require("diacritics");
var properties = require("./slide-properties");

module.exports = parse;

function parse (file, root) {
  if (Array.isArray(file)) {
    return _.map(file, function (f) {
      return parse(f, root);
    });
  }

  var content = fs.readFileSync(file, "utf8");
  var title = getTitle(file, root);
  var chapter = getTitle(path.dirname(file), root);

  // Split the file into multiple slides
  if (content.match(/\n====\n/g)) {
    var pages = content.split(/\n====\n/);
    return ['!multipage'].concat(
      _.map(pages, function (p, index) {
        var pageTitle = '_' + index + '_' + title;
        return parseText(p, file, pageTitle, chapter);
      })
    );
  }

  var props = properties(content);
  content = props.content;

  if (file.match(/\.md$/)) {
    content = md2html(content);
  }

  return _.extend({
    "title": title,
    "id": cleanString(title),
    "content": content,
    "chapter": {
      "title": chapter,
      "id": cleanString(chapter)
    }
  }, _.omit(props, "content"));
}

function parseText(content, file, title, chapter) {
    if (content.match(/\n\|\|\|\|\n/g)) {
        var subPages = content.split(/\n\|\|\|\|\n/g);
        return _.map(subPages, function (p, index) {
            var pageTitle = '_' + index + '_' + title;
            return parseText(p, file, pageTitle, chapter);
        });
    }
    var props = properties(content);
    content = props.content;

    if (file.match(/\.md$/)) {
      content = md2html(content);
    }

    return _.extend({
      "title": title,
      "id": cleanString(title),
      "content": content,
      "chapter": {
        "title": chapter,
        "id": cleanString(chapter)
      }
    }, _.omit(props, "content"));
}

function md2html (md) {
  // Find notes
  var notes = "";
  var foundNotes = md.match(/[\r\n]note:/igm);
  if (foundNotes) {
    var index = md.indexOf(foundNotes[0]);
    notes = md.substring(index + foundNotes[0].length).trim();
    md = md.substring(0, index).trim();
  }

  var html = markdown(md).trim();

  if (notes) {
    html += "<aside class=\"notes\">" + markdown(notes).trim() + "</aside>";
  }

  return html;
}

// beware: filenames without digits should be unique in a dir
function getTitle (file, root) {
  var rel = path.relative(root, file);
  var isSubSlide = path.dirname(rel) !== ".";

  var chapter = isSubSlide ? cleanLeadingDigits(path.dirname(rel)) : null;
  var ext = path.extname(rel);
  var slide = cleanLeadingDigits(path.basename(rel, ext));

  return (chapter ? (chapter + "-") : "") + slide;
}

function cleanString (s) {
  return diacritics.remove(s.toLowerCase().replace(/\s+/g, "-"));
}

function cleanLeadingDigits (file) {
  var matches = file.match(/(?:(?:\d+)-)?(?:\d+)\-(.*)/);
  return matches ? matches[1] : file;
}
