var swig = require('swig'),
  expect = require('expect.js'),
  extras = require('../');

describe('Filters:', function () {

  describe('groupby', function () {
    extras.useFilter(swig, 'groupby');
    it('groups arrays by a key', function () {
      var opts = { locals: {
        foo: [{ name: 'a', a: 1 }, { name: 'a', a: 2 }, { name: 'b', a: 3 }]
      }};
      expect(swig.render('{% for r in foo|groupby("name") %}{{ loop.key }} = {% for val in r %}{{ val["a"] }}, {% endfor %}{% endfor %}', opts))
        .to.equal('a = 1, 2, b = 3, ');
    });
  });

  describe('markdown', function () {
    extras.useFilter(swig, 'markdown');
    it('{{ foo|markdown|raw }}', function () {
      expect(swig.render('{{ foo|markdown|raw }}', { locals: { foo: '# This is an H1' }}))
        .to.equal('<h1>This is an H1</h1>');
    });
  });

  describe('nl2br', function () {
    extras.useFilter(swig, 'nl2br');
    it('{{ foo|nl2br }}', function () {
      expect(swig.render('{{ foo|nl2br|raw }}', { locals: { foo: "a\nb" }}))
        .to.equal('a<br>b');
    });

    it('{{ bar|nl2br }}', function () {
      expect(swig.render('{{ bar|nl2br|raw }}', { locals: { bar: ["a\nb"] }}))
        .to.equal('a<br>b');
    });
  });

  describe('pluck', function () {
    extras.useFilter(swig, 'pluck');
    it('{{ people|pluck("name") }}', function () {
      var opts = { locals: { people: [{ age: 30, name: 'Paul' }, { age: 28, name: 'Nicole'}] }};
      expect(swig.render('{{ people|pluck("name") }}', opts))
        .to.equal('Paul,Nicole');
    });
  });

  describe('split', function () {
    extras.useFilter(swig, 'split');
    it('{{ foo|split(",")|join(" & ") }}', function () {
      expect(swig.render('{{ "one,two,three"|split(",")|join(" & ")|raw }}'))
        .to.equal('one & two & three');
    });
  });

});
