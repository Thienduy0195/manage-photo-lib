const switchOptions = [
  {
    id: 'lineNumbers',
    title: 'Line Numbers',
    trueValue: true,
    falseValue: false,
    value: true,
  },
  {
    id: 'readOnly',
    title: 'Read Only',
    trueValue: false,
    falseValue: true,
    value: true,
  },
];
const selectOptions = [
  {
    id: 'tabSize',
    title: 'Tab Size',
    options: ['2', '4', '6', '8'],
    value: 2,
  },
  {
    id: 'mode',
    title: 'Language',
    options: ['javascript', 'xml', 'markdown', 'php', 'python', 'ruby'],
    value: 'javascript',
  },
  {
    id: 'theme',
    title: 'Select themes',
    options: [
      'default',
      'zenburn',
      'solarized',
      'rubyblue',
      'paraiso-dark',
      'midnight',
      'material',
      'hopscotch',
      'twilight',
    ],
    value: 'zenburn',
  },
];

const defaultValues = {
  basic: `const component = {
    name: 'Graphicprose',
    author: 'GRAPHICPROSE team',
    website: 'http://phutran.dev/'
};`,
  javascript: `const component = {
    name: 'Graphicprose',
    author: 'GRAPHICPROSE team',
    website: 'http://phutran.dev/'
};`,
  markdown: `# Graphicprose
###This is a GRAPHICPROSE team production
[have a look](http://phutran.dev/)
  `,
  xml: `<isomprphic>
    <to>Tove</to>
    <name>Graphicprose</name>
    <author>GRAPHICPROSE team</author>
    <website>devplus.asia</website>
</isomprphic>`,
  php: `<html>
 <head>
  <title> v</title>
 </head>
 <body>
 <h1>http://phutran.dev/</h1>
 <p>This is a GRAPHICPROSE team production</p>
 <a href="http://phutran.dev/">visit ou site</a>
 </body>
</html>
`,
  python: `
print("Graphicprose")
print("This is a GRAPHICPROSE team production")
print("visit us http://phutran.dev/ ")
`,
  ruby: `rint "Graphicprose"
print "This is a GRAPHICPROSE team production"
print "visit us http://phutran.dev/ "
`,
};

export { switchOptions, selectOptions, defaultValues };
