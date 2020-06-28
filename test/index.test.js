var should = require('should');
var template = require('../');

describe('Template delimiter', function () {
  it('should be an instance of', function () {
    var actual = new template.Instance();

    actual.should.be.an.instanceOf(template.Instance);
  });

  it('should delimiter have positions of the occurrence', function () {
    var actual = new template.Instance('{{ hello }}');
    var expected = [
      0, 9, ' hello ',
    ];

    actual
      .delimiter()
      .should
      .eql(expected);
  });

  it('should delimiter have positions of the occurrence after a point', function () {
    var actual = new template.Instance('{{ hello }} {{ world }}');
    var expected = [
      12, 21, ' world ',
    ];

    actual
      .delimiter(9)
      .should
      .eql(expected);
  });

  it('delimiter', function () {
    var actual = '{{ hello }}';
    var expected = [
      0, 9, ' hello '
    ];

    template
      .delimiter( actual )
      .should
      .eql( expected );
  });

  it('delimiter forward', function () {
    var actual = '{{ hello }} {{ world }}';
    var expected = [
      12, 21, ' world '
    ];

    template
      .delimiter( actual, 9 )
      .should
      .eql( expected );
  });
});

describe('Template replace', function () {
  it('should be replace by a context variable', function () {
    var actual = new template.Instance(' hello ');
    var expected = ' buzz ';
    var ctx = {
      hello: 'buzz',
    };

    actual
      .replace(ctx)
      .should
      .eql(expected);
  });

  it('should be replace by a context variable forward', function () {
    var actual = new template.Instance(' hello, hello ');
    var expected = ' buzz, buzz ';
    var ctx = {
      hello: 'buzz',
    };

    actual
      .replace(ctx)
      .should
      .eql(expected);
  });

  it('replace', function () {
    var actual = ' hello ';
    var expected = ' buzz ';
    var ctx = {
      hello: 'buzz'
    };

    template
      .replace( actual, ctx )
      .should
      .eql( expected );
  });

  it('replace forward', function () {
    var actual = ' hello, hello ';
    var expected = ' buzz, buzz ';
    var ctx = {
      hello: 'buzz'
    };

    template
      .replace( actual, ctx )
      .should
      .eql( expected );
  });
});

describe('Template', function () {
  it('should have a context replacement', function () {
      var actual = new template.Instance('{{ hello }} {{ world }}');
      var expected = ' fizz   buzz ';
      var ctx = {
        hello: 'fizz',
        world: 'buzz',
      };

      actual
        .compile(ctx)
        .should
        .eql(expected);
  });

  it('should have a context replacement with a vm', function () {
    var actual = new template.Instance(
      '{{var result = firstValue + secondValue;}}'
    );
    var ctx = {
      firstValue: 2,
      secondValue: 3,
    };

    actual
      .run(ctx)
      .should
      .have
      .property('result', 5);
  });

  it('should have a context replacement with a vm _compiled', function () {
    var actual = new template.Instance(
      '{{var result = firstValue + secondValue;}}'
    );
    var expected = 'var result = 2 + 3;';
    var ctx = {
      firstValue: 2,
      secondValue: 3,
    };

    actual
      .run(ctx)
      .should
      .have
      .property('_compiled', expected);
  });

  it('context', function () {
    var actual = '{{ hello }} {{ world }}';
    var expected = ' fizz   buzz ';
    var ctx = {
      hello: 'fizz',
      world: 'buzz'
    };
    var current = template( actual );

    current
      .compile( ctx )
      .should
      .eql( expected );
  });

  it('vm context', function () {
    var actual = '{{var result = firstValue + secondValue;}}';
    var ctx = {
      firstValue: 2,
      secondValue: 3,
    };
    var current = template( actual );

    current
      .run( ctx )
      .should
      .have
      .property('result', 5)
  });

  it('vm context _compiled', function () {
    var actual = '{{var result = firstValue + secondValue;}}';
    var expected = 'var result = 2 + 3;';
    var ctx = {
      firstValue: 2,
      secondValue: 3,
    };
    var current = template( actual );

    current
      .run( ctx )
      .should
      .have
      .property('_compiled', expected);
  });

  it('render', function () {
    var expression = '{{var result = firstValue + secondValue}}';
    var ctx = {
      firstValue: 2,
      secondValue: 3,
    };
    var renderExpression = '{{result, firstValue, secondValue}}';
    var expected = '5, 2, 3';
    var current = template( expression );

    current
      .render( ctx, renderExpression )
      .should
      .eql( expected );
  });

  it('render from file', function () {
    var filename = './test/case/render.mic';
    var ctx = {
      firstValue: 2,
      secondValue: 3,
    };
    var renderExpression = '{{result, firstValue, secondValue}}';
    var expected = '5, 2, 3';
    var current = template.file( filename );

    current
      .render( ctx, renderExpression )
      .should
      .eql( expected );
  });
});
