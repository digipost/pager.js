describe('p.js', function() {

    var x, y, z, f, p = pager;

    beforeEach(function() {
        p.off();
        x = 0;
        y = 0;
        z = 0;
        f = 0;
    });

    it('.run should use default handler', function() {
        p.on('index', function() { f++; });
        p.on('foo', function() { x++; });
        p.run();
        p.run('foo');
        p.run('bar');
        assert.equal(x, 1);
        assert.equal(f, 1);
    });

    it('.get should return fallback', function() {
        // karma path === 'context'
        assert.equal(p.get(), 'context');
        assert.equal(p.get('index'), 'context');
    });

    it('.on should add handlers', function() {
        p.on('pagex', function() { x++; });
        p.on('pagey', function() { y++; });
        p.on('pagez', function() { z++; });
        p.on('index', function() { f++; });

        p.run('pagex'); p.run('pagex'); p.run('pagex');
        p.run('pagey'); p.run('pagey');
        p.run();

        assert.equal(x, 3);
        assert.equal(y, 2);
        assert.equal(z, 0);
        assert.equal(f, 1);
    });

    it('.on should ignore leading and trailing slashes', function() {
        p.on('index', function() { f++; });

        p.on('/x/', function() { x++; });
        p.on('/x', function() { x++; });
        p.on('x/', function() { x++; });
        p.on('x', function() { x++; });

        p.run('/x/');
        p.run('/x');
        p.run('x/');
        p.run('x');

        assert.equal(x, 4);
        assert.equal(y, 0);
        assert.equal(f, 0);
    });

    it('.on should ignore extensions', function() {
        p.on('index', function() { f++; });
        p.on('foo.html', function() { x++; });
        p.on('foo', function() { x++; });
        p.on('bar.foo', function() { y++; });
        p.on('bar.', function() { y++; });
        p.on('bar', function() { y++; });

        p.run('foo.html');
        p.run('foo');
        p.run('bar.html');
        p.run('bar.');
        p.run('bar');
        p.run('ba');

        assert.equal(x, 2);
        assert.equal(y, 3);
        assert.equal(z, 0);
        assert.equal(f, 0);
    });

    it('.on should allow slashes in names', function() {
        p.on('index', function() { f++; });

        p.on('x', function() { x++; });
        p.on('x/x', function() { x++; });
        p.on('x/x/x', function() { x++; });

        p.on('y', function() { y++; });
        p.on('one/y', function() { y++; });
        p.on('two/y', function() { y++; });

        p.run('x');
        p.run('x/x');
        p.run('x/x/x');

        p.run('y');
        p.run('one/y');
        p.run('three/y');
        p.run();

        assert.equal(x, 3);
        assert.equal(y, 2);
        assert.equal(f, 1);
    });

    it('.on should not match substrings', function() {
        p.on('c/b/a', function() { x++; });
        p.on('b/a', function() { y++; });
        p.on('a', function() { z++; });

        p.run('d/c/b/a');
        p.run('c/b/a');
        p.run('b/a');
        p.run('a');

        assert.equal(x, 1);
        assert.equal(y, 1);
        assert.equal(z, 1);
    });

    it('.off should remove handlers', function() {
        var fx = function() { x++; };
        var fy = function() { y++; };
        var fz = function() { z++; };
        p.on('x', fx);
        p.on('y', fy);
        p.on('z', fz);

        p.off('x');
        p.off('y', fy);
        p.off('z', fy);

        p.run('x');
        p.run('y');
        p.run('z');

        assert.equal(x, 0);
        assert.equal(y, 0);
        assert.equal(z, 1);
    });

    it('.run should accept fallback', function() {
        p.on('foo', function() { x++; });
        p.on('bar', function() { y++; });

        p.run('boo', 'foo');
        p.run('bar', 'foo');

        assert.equal(x, 1);
        assert.equal(y, 1);
    });

    it('.run should ignore special chars', function() {
        var fx = function() { x++; };
        var fy = function() { y++; };
        var fz = function() { z++; };

        p.on('<x>', fx);
        p.on('y!', fy);
        p.on('z_z-z-1', fz);

        p.run('<x>');
        p.run('y!');
        p.run('z_z-z-1');

        assert.equal(x, 0);
        assert.equal(y, 0);
        assert.equal(z, 1);
    });

});
