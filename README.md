[![npm version](https://badge.fury.io/js/prez.svg)](http://badge.fury.io/js/prez)
[![Dependency Status](https://david-dm.org/lmtm/prez.png)](https://david-dm.org/lmtm/prez)

## prez

Opiniated [Reveal slideshow](http://lab.hakim.se/reveal-js) generator with nice PDF output and ability to treat [notes](https://github.com/hakimel/reveal.js#speaker-notes) as first-class content.

### Install

```sh
npm install -g prez
```

### Feel the magic

In your terminal, go to an empty directory and run:

```sh
prez --init
```

A sample workspace has been generated for you. Then run:

```sh
prez --serve --print --print-theme=simple --watch
```

* edit your slides from `slides` folder (html or markdown)
* if you need some assets, you can work in `images`, `css`, `js`, `media` folders and use `includes.txt`
* your slideshow is automatically built into `build` folder
* your slideshow is hosted and your browser is opened to localhost:9000
* any change you make will rebuild and refresh your browser
* oh, and a printer-friendly `slides.pdf` is automatically generated on any change too

### Slides structure and format

* Slides and chapters are sorted by name.
* You can number your slides to ensure order by adding a "*number*-" prefix, it will be automagically stripped out.
* Each slide will have an id generated from filename (removing accents and spaces).
* If you use `--sub-covers` the title is the stripped name, accents and case remain untouched.

#### Sample structure

```
images/
js/
css/
slides/
  01-intro.md
  02-Chapter 1/
    01-hello-world.md
    02-bonjour-monde.md
  03-conclusion.md
```

#### Sample slide

```md
# Slide's title

Content of your slide

note:

Your notes go here.

Complex (multiline, code samples, etc.) notes are really supported only with --such-notes.
```

#### Customize slide attributes

You can set per-slide properties like general style, [background](https://github.com/hakimel/reveal.js/#slide-backgrounds) or [transition](https://github.com/hakimel/reveal.js/#slide-transitions) by adding special lines at **the head of your slides**:

* `$class:some class$` add class
* `$id:id$` replace automatic id, if you set it to "none", it will remove any id on the slide
* Any other property will be added as a data-attribute, here are some examples supported by Reveal:
  * `$background:/path/to/image.jpg$`
  * `$background-video:/path/to/video.webm$`
  * `$background-iframe:http://mysite.com$`
  * `$transition:zoom$`
  * `$transition-speed:fast$`

### Step by step

#### Initialize sample workspace

```sh
mkdir sandbox
cd sandbox

prez --init
```

This will create a full workspace with `js`, `images`, etc… where you'll put your custom content. In reality the only required folder is `slides`.

#### Build

```sh
prez
```

This will create a `build` folder with your slideshow.

#### Show

```sh
prez --serve
```

This will run a server on port 9000 and open your local browser to your slideshow.

#### Print

```sh
prez --print --print-theme=simple
```

This will generate "slides.pdf" from your slideshow.

### Such notes!

Option `--such-notes` modifies the print layout and the notes popup so that notes have more space.

Screenshots to come…

### Usage

`prez [<source> [<destination>]] [options]`

* `source` is the slideshow workspace (where you'll have your slides and assets), default = `./`
* `destination` is the target directory, default = `./build/`

Available options:

* `-v`, `--version`: show version and exit
* `-s <dir>`, `--slides-dir=<dir>`: customize name of the folder containing slides (default = `slides`)
* `--skip-reveal`: do not copy reveal.js slides into target directory (useful if you want faster build over existing build)
* `--skip-index`: do not generate `index.html` in target (will remain untouched if already existing)
* `--skip-user`: do not include user assets
* `--title=<title>`: specify the title of your presentation (default = `Prez`)
* `--theme=<theme>`: choose [reveal theme](https://github.com/hakimel/reveal.js/tree/master/css/theme) (default = `solarized`)
* `--highlight-theme=<theme>`: choose [highlight.js theme](https://github.com/isagalaev/highlight.js/tree/master/src/styles) (default = `zenburn`)
* `--no-dynamic-theme`: disable ability to change theme from query string
* `--print-notes`: enable special print layout with first-class notes
* `--such-notes`: focus on notes, which will enable a special print layout with notes as first-class content, and more space for them in the notes popup
* `-w`, `--watch`: automatically rebuild (lazy) on changes
* `--serve[=<port>]`: serve slideshow (you can specify port here or use `--port`)
* `-p <port>`, `--port=<port>`: modify http server port (default 9000), you can use value `auto` to use a random available port
* `--no-live-reload`: disable live-reload when serving slideshow
* `--no-open-browser`: do not open local browser automatically when serving slideshow
* `--print[=<file>]`: print slideshow as pdf (requires `--serve` and phantomjs must be installed)
* `--print-theme=<theme>`: theme to be used for pdf output (default = no override)
* `--phantomjs=<path to phantomjs>`: path to phantomjs (default = `phantomjs`)
* `--no-update-notifier`: disable version checking
* `--sub-covers`: auto generate cover slides with the dir name as a h1 for each group of vertical slides

### TODO

* Lazier reprint in watch mode
* FIX issue with notes too tall in printed pdf
* Put screenshots to compare normal mode and "such notes" mode
* Better styles for "such notes" mode
