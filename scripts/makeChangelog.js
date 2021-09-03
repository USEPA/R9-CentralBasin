var fs = require('fs');
var marked = require('marked');

marked.setOptions({
  gfm: true
});

const template = `
<html>
<head>
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta charset="UTF-8">
  <link rel="shortcut icon" href="/favicon.png">
  <title>RollCall beta Changelog - IRWIN</title>
  <style>
    .markdown-body {
      box-sizing: border-box;
      min-width: 200px;
      max-width: 980px;
      margin: 0 auto;
      padding: 45px;
    }

    @media (max-width: 767px) {
      .markdown-body {
        padding: 15px;
      }
    }

    header {
      text-align: center;
      padding-bottom: 2rem;
    }

    .irwin-logo {
      height: 100px
    }

    {{css}}
  </style>
</head>
<body class="markdown-body">
  <header>
  <img class="irwin-logo" src="assets/IRWIN-Logo-FullColor-RGB.png">
  </header>
  {{md}}
</body>
</html>
`;

fs.readFile('HELP.md', 'utf8', (err, markdown) => {
  fs.readFile('scripts/markdown.css', 'utf8', (err, css) => {
    const contents = template
      .replace('{{md}}', marked(markdown))
      .replace('{{css}}', css);

    fs.writeFile('public/help.html', contents, err => {
      console.log('finished!');
    });
  });
});
