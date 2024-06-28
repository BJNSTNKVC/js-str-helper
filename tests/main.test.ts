// @ts-nocheck

require('../src/main');

describe('Strings', () => {
    describe('Str.of', () => {
        test('returns instance of Stringable', () => {
            expect(Str.of('foo')).toBeInstanceOf(Stringable);
        });
    });

    describe('Str.after', () => {
        test('returns everything after the given value in a string', () => {
            expect(Str.after('This is my name', 'This is')).toEqual(' my name');
        });
    });

    describe('Str.afterLast', () => {
        test('returns everything after the last occurrence of the given value in a string', () => {
            expect(Str.afterLast('App\\Http\\Controllers\\Controller', '\\')).toEqual('Controller');
        });
    });

    describe('Str.apa', () => {
        test('converts the given string to title case following the APA guidelines', () => {
            expect(Str.apa('Creating A Project')).toEqual('Creating a Project');
        });
    });

    describe('Str.ascii', () => {
        test('attempts to transliterate the string into an ASCII value', () => {
            expect(Str.ascii('û')).toEqual('u');
        });
    });

    describe('Str.before', () => {
        test('returns everything before the given value in a string', () => {
            expect(Str.before('This is my name', 'my name')).toEqual('This is ');
        });
    });

    describe('Str.beforeLast', () => {
        test('returns everything before the last occurrence of the given value in a string', () => {
            expect(Str.beforeLast('This is my name', 'is')).toEqual('This ');
        });
    });

    describe('Str.between', () => {
        test('returns the portion of a string between two values', () => {
            expect(Str.between('This is my name', 'This', 'name')).toEqual(' is my ');
        });
    });

    describe('Str.betweenFirst', () => {
        test('returns the smallest possible portion of a string between two values', () => {
            expect(Str.betweenFirst('[a] bc [d]', '[', ']')).toEqual('a');
        });
    });

    describe('Str.camel', () => {
        test('converts the given string to camelCase', () => {
            expect(Str.camel('foo_bar')).toEqual('fooBar');
        });
    });

    describe('Str.charAt', () => {
        test('returns the character at the specified index', () => {
            expect(Str.charAt('This is my name.', 6)).toEqual('s');
        });
    });

    describe('Str.chopStart', () => {
        test('removes the given string if it exists at the start of the subject', () => {
            expect(Str.chopStart('Hello, world!', 'Hello, ')).toEqual('world!');
        });

        test('removes the first matching string from an array of needles', () => {
            expect(Str.chopStart('Hello, world!', ['Hello, ', 'Hi, '])).toEqual('world!');
        });

        test('removes only the first matching string when both are found at the start', () => {
            expect(Str.chopStart('Hello, Hello, world!', ['Hello, ', 'Hello, '])).toEqual('Hello, world!');
        });

        test('does not remove the string if it does not exist at the start of the subject', () => {
            expect(Str.chopStart('Hello, world!', 'world')).toEqual('Hello, world!');
        });
    });

    describe('Str.chopEnd', () => {
        test('removes the given string if it exists at the end of the subject', () => {
            expect(Str.chopEnd('Hello, world!', 'world!')).toEqual('Hello, ');
        });

        test('removes the first matching string from an array of needles', () => {
            expect(Str.chopEnd('Hello, world!', ['world!', 'planet!'])).toEqual('Hello, ');
        });

        test('removes only the first matching string when both are found at the end', () => {
            expect(Str.chopEnd('Hello, world!world!', ['world!', 'world!'])).toEqual('Hello, world!');
        });

        test('does not remove the string if it does not exist at the end of the subject', () => {
            expect(Str.chopEnd('Hello, world!', 'Hello')).toEqual('Hello, world!');
        });
    });

    describe('Str.contains', () => {
        test('determines if the given string contains the given value', () => {
            expect(Str.contains('This is my name', 'my')).toBeTruthy();
        });

        test('determines if the given string contains any of the values in the array', () => {
            expect(Str.contains('This is my name', ['my', 'foo'])).toBeTruthy();
        });
    });

    describe('Str.containsAll', () => {
        test('determines if the given string contains all the values in a given array', () => {
            expect(Str.containsAll('This is my name', ['my', 'name'])).toBeTruthy();
        });
    });

    describe('Str.endsWith', () => {
        test('determines if the given string ends with the given value', () => {
            expect(Str.endsWith('This is my name', 'name')).toBeTruthy();
        });

        test('determines if the given string ends with any of the values in the array', () => {
            expect(Str.endsWith('This is my name', ['name', 'foo'])).toBeTruthy();
        });

        test('determines if the given string does not end with any of the values in the array', () => {
            expect(Str.endsWith('This is my name', ['this', 'foo'])).toBeFalsy();
        });
    });

    describe('Str.excerpt', () => {
        test('extracts an excerpt from a given string that matches the first instance of a phrase', () => {
            expect(Str.excerpt('This is my name', 'my', { 'radius': 3 })).toEqual('...is my na...');
        });

        test('allows definition of custom omission strings', () => {
            expect(Str.excerpt('This is my name', 'name', { 'radius': 3, 'omission': '(...) ' })).toEqual('(...) my name');
        });
    });

    describe('Str.finish', () => {
        test('adds a single instance of the given value to a string if it does not already end with that value', () => {
            expect(Str.finish('this/string', '/')).toEqual('this/string/');
        });

        test('does not add a value to a string that already ends with that value', () => {
            expect(Str.finish('this/string/', '/')).toEqual('this/string/');
        });
    });

    describe('Str.fromBase64', () => {
        test('converts the given string from Base64', () => {
            expect(Str.fromBase64('TGFyYXZlbA==')).toEqual('Laravel');
        });
    });

    describe('Str.headline', () => {
        test('converts strings delimited by casing, hyphens, or underscores into a space delimited string with each word’s first letter capitalized', () => {
            expect(Str.headline('steve_jobs')).toEqual('Steve Jobs');
            expect(Str.headline('EmailNotificationSent')).toEqual('Email Notification Sent');
        });
    });

    describe('Str.is', () => {
        test('determines if a given string matches a given pattern', () => {
            expect(Str.is('foo*', 'foobar')).toBeTruthy();
            expect(Str.is('baz*', 'foobar')).toBeFalsy();
        });
    });

    describe('Str.isAscii', () => {
        test('determines if a given string is 7-bit ASCII', () => {
            expect(Str.isAscii('Taylor')).toBeTruthy();
            expect(Str.isAscii('ü')).toBeFalsy();
        });
    });

    describe('Str.isJson', () => {
        test('determines if the given string is valid JSON', () => {
            expect(Str.isJson('[1,2,3]')).toBeTruthy();
            expect(Str.isJson('{"first": "John", "last": "Doe"}')).toBeTruthy();
            expect(Str.isJson('{first: "John", last: "Doe"}')).toBeFalsy();
        });
    });

    describe('Str.isUrl', () => {
        test('determines if the given string is a valid URL', () => {
            expect(Str.isUrl('http://example.com')).toBeTruthy();
            expect(Str.isUrl('laravel')).toBeFalsy();
        });
    });

    describe('Str.isUlid', () => {
        test('determines if the given string is a valid ULID', () => {
            expect(Str.isUlid('01gd6r360bp37zj17nxb55yv40')).toBeTruthy();
            expect(Str.isUlid('laravel')).toBeFalsy();
        });
    });

    describe('Str.isUuid', () => {
        test('determines if the given string is a valid UUID', () => {
            expect(Str.isUuid('a0a2a2d2-0b87-4a18-83f2-2529882be2de')).toBeTruthy();
            expect(Str.isUuid('laravel')).toBeFalsy();
        });
    });

    describe('Str.kebab', () => {
        test('converts the given string to kebab-case', () => {
            expect(Str.kebab('fooBar')).toEqual('foo-bar');
        });
    });

    describe('Str.lcfirst', () => {
        test('returns the given string with the first character lowercased', () => {
            expect(Str.lcfirst('Foo Bar')).toEqual('foo Bar');
        });
    });

    describe('Str.length', () => {
        test('returns the length of the given string', () => {
            expect(Str.length('Laravel')).toEqual(7);
        });
    });

    describe('Str.limit', () => {
        test('truncates the given string to the specified length', () => {
            expect(Str.limit('The quick brown fox jumps over the lazy dog', 20)).toEqual('The quick brown fox...');
            expect(Str.limit('The quick brown fox jumps over the lazy dog', 20, ' (...)')).toEqual('The quick brown fox (...)');
        });
    });

    describe('Str.lower', () => {
        test('converts the given string to lowercase', () => {
            expect(Str.lower('LARAVEL')).toEqual('laravel');
        });
    });

    describe('Str.mask', () => {
        test('masks a portion of a string with a repeated character', () => {
            expect(Str.mask('taylor@example.com', '*', 3)).toEqual('tay***************');
            expect(Str.mask('taylor@example.com', '*', -15, 3)).toEqual('tay***@example.com');
        });
    });

    describe('Str.orderedUuid', () => {
        test('generates a "timestamp first" UUID', () => {
            expect(Str.orderedUuid()).toMatch(/[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}/);
        });
    });

    describe('Str.padBoth', () => {
        test('pads both sides of a string until the final string reaches a desired length', () => {
            expect(Str.padBoth('James', 10, '_')).toEqual('__James___');
            expect(Str.padBoth('James', 10)).toEqual('  James   ');
        });
    });

    describe('Str.padLeft', () => {
        test('pads the left side of a string until the final string reaches a desired length', () => {
            expect(Str.padLeft('James', 10, '-=')).toEqual('-=-=-James');
            expect(Str.padLeft('James', 10)).toEqual('     James');
        });
    });

    describe('Str.padRight', () => {
        test('pads the right side of a string until the final string reaches a desired length', () => {
            expect(Str.padRight('James', 10, '-')).toEqual('James-----');
            expect(Str.padRight('James', 10)).toEqual('James     ');
        });
    });

    describe('Str.password', () => {
        test('generates a secure, random password of a given length', () => {
            expect(Str.password()).toHaveLength(32);
            expect(Str.password(12)).toHaveLength(12);
        });
    });

    describe('Str.plural', () => {
        test('converts a singular word string to its plural form', () => {
            expect(Str.plural('car')).toEqual('cars');
            expect(Str.plural('child')).toEqual('children');
            expect(Str.plural('child', 2)).toEqual('children');
            expect(Str.plural('child', 1)).toEqual('child');
        });
    });

    describe('Str.pluralStudly', () => {
        test('converts a singular word string formatted in studly caps case to its plural form', () => {
            expect(Str.pluralStudly('VerifiedHuman')).toEqual('VerifiedHumans');
            expect(Str.pluralStudly('UserFeedback')).toEqual('UserFeedback');
            expect(Str.pluralStudly('VerifiedHuman', 2)).toEqual('VerifiedHumans');
            expect(Str.pluralStudly('VerifiedHuman', 1)).toEqual('VerifiedHuman');
        });
    });

    describe('Str.random', () => {
        test('generates a random string of the specified length', () => {
            expect(Str.random(40)).toHaveLength(40);
        });
    });

    describe('Str.remove', () => {
        test('removes the given value or array of values from the string', () => {
            expect(Str.remove('e', 'Peter Piper picked a peck of pickled peppers.')).toEqual('Ptr Pipr pickd a pck of pickld ppprs.');
            expect(Str.remove('E', 'Peter Piper picked a peck of pickled peppers.', false)).toEqual('Ptr Pipr pickd a pck of pickld ppprs.');
        });
    });

    describe('Str.repeat', () => {
        test('repeats the given string', () => {
            expect(Str.repeat('a', 5)).toEqual('aaaaa');
        });
    });

    describe('Str.replace', () => {
        test('replaces a given string within the string', () => {
            expect(Str.replace('9.x', '10.x', 'Laravel 9.x')).toEqual('Laravel 10.x');
            expect(Str.replace('framework', 'Laravel', 'Framework 10.x', false)).toEqual('Laravel 10.x');
        });
    });

    describe('Str.replaceArray', () => {
        test('replaces a given value in the string sequentially using an array', () => {
            expect(Str.replaceArray('?', ['8:30', '9:00'], 'The event will take place between ? and ?')).toEqual('The event will take place between 8:30 and 9:00');
        });
    });

    describe('Str.replaceFirst', () => {
        test('replaces the first occurrence of a given value in a string', () => {
            expect(Str.replaceFirst('the', 'a', 'the quick brown fox jumps over the lazy dog')).toEqual('a quick brown fox jumps over the lazy dog');
        });
    });

    describe('Str.replaceLast', () => {
        test('replaces the last occurrence of a given value in a string', () => {
            expect(Str.replaceLast('the', 'a', 'the quick brown fox jumps over the lazy dog')).toEqual('the quick brown fox jumps over a lazy dog');
        });
    });

    describe('Str.replaceMatches', () => {
        test('replaces all portions of a string matching a pattern with the given replacement string', () => {
            expect(Str.replaceMatches('/[^A-Za-z0-9]+/', '', '(+1) 501-555-1000')).toEqual('15015551000');
            expect(Str.replaceMatches('/\\d/', (matches) => '[' + matches[0] + ']', '123')).toEqual('[1][2][3]');
        });
    });

    describe('Str.replaceStart', () => {
        test('replaces the first occurrence of the given value only if the value appears at the start of the string', () => {
            expect(Str.replaceStart('Hello', 'Laravel', 'Hello World')).toEqual('Laravel World');
            expect(Str.replaceStart('World', 'Laravel', 'Hello World')).toEqual('Hello World');
        });
    });

    describe('Str.replaceEnd', () => {
        test('replaces the last occurrence of the given value only if the value appears at the end of the string', () => {
            expect(Str.replaceEnd('World', 'Laravel', 'Hello World')).toEqual('Hello Laravel');
            expect(Str.replaceEnd('Hello', 'Laravel', 'Hello World')).toEqual('Hello World');
        });
    });

    describe('Str.reverse', () => {
        test('reverses the given string', () => {
            expect(Str.reverse('Hello World')).toEqual('dlroW olleH');
        });
    });

    describe('Str.singular', () => {
        test('converts a string to its singular form', () => {
            expect(Str.singular('cars')).toEqual('car');
            expect(Str.singular('children')).toEqual('child');
        });
    });

    describe('Str.slug', () => {
        test('generates a URL friendly "slug" from the given string', () => {
            expect(Str.slug('Laravel 5 Framework', '-')).toEqual('laravel-5-framework');
        });
    });

    describe('Str.snake', () => {
        test('converts the given string to snake_case', () => {
            expect(Str.snake('fooBar')).toEqual('foo_bar');
            expect(Str.snake('fooBar', '-')).toEqual('foo-bar');
        });
    });

    describe('Str.squish', () => {
        test('removes all extraneous white space from a string', () => {
            expect(Str.squish('    laravel    framework    ')).toEqual('laravel framework');
        });
    });

    describe('Str.start', () => {
        test('adds a single instance of the given value to a string if it does not already start with that value', () => {
            expect(Str.start('this/string', '/')).toEqual('/this/string');
            expect(Str.start('/this/string', '/')).toEqual('/this/string');
        });
    });

    describe('Str.startsWith', () => {
        test('determines if the given string begins with the given value', () => {
            expect(Str.startsWith('This is my name', 'This')).toBeTruthy();
            expect(Str.startsWith('This is my name', ['This', 'That', 'There'])).toBeTruthy();
        });
    });

    describe('Str.studly', () => {
        test('converts the given string to StudlyCase', () => {
            expect(Str.studly('foo_bar')).toEqual('FooBar');
        });
    });

    describe('Str.substr', () => {
        test('returns the portion of string specified by the start and length parameters', () => {
            expect(Str.substr('The Laravel Framework', 4, 7)).toEqual('Laravel');
        });
    });

    describe('Str.substrCount', () => {
        test('returns the number of occurrences of a given value in the given string', () => {
            expect(Str.substrCount('If you like ice cream, you will like snow cones.', 'like')).toEqual(2);
        });
    });

    describe('Str.substrReplace', () => {
        test('replaces text within a portion of a string', () => {
            expect(Str.substrReplace('1300', ':', 2)).toEqual('13:');
            expect(Str.substrReplace('1300', ':', 2, 0)).toEqual('13:00');
        });
    });

    describe('Str.swap', () => {
        test('replaces multiple values in the given string', () => {
            expect(Str.swap({ 'Tacos': 'Burritos', 'great': 'fantastic' }, 'Tacos are great!')).toEqual('Burritos are fantastic!');
        });
    });

    describe('Str.take', () => {
        test('takes the first n characters when limit is positive', () => {
            expect(Str.take('Hello, world!', 5)).toEqual('Hello');
        });

        test('takes the last n characters when limit is negative', () => {
            expect(Str.take('Hello, world!', -5)).toEqual('orld!');
        });

        test('returns an empty string when limit is zero', () => {
            expect(Str.take('Hello, world!', 0)).toEqual('');
        });

        test('returns the entire string when limit is greater than string length', () => {
            expect(Str.take('Hello', 10)).toEqual('Hello');
        });

        test('returns the entire string when limit is less than negative string length', () => {
            expect(Str.take('Hello', -10)).toEqual('Hello');
        });
    });

    describe('Str.title', () => {
        test('converts the given string to Title Case', () => {
            expect(Str.title('a nice title uses the correct case')).toEqual('A Nice Title Uses The Correct Case');
        });
    });

    describe('Str.toBase64', () => {
        test('converts the given string to Base64', () => {
            expect(Str.toBase64('Laravel')).toEqual('TGFyYXZlbA==');
        });
    });

    describe('Str.ucfirst', () => {
        test('returns the given string with the first character capitalized', () => {
            expect(Str.ucfirst('foo bar')).toEqual('Foo bar');
        });
    });

    describe('Str.ucsplit', () => {
        test('splits the given string into an array by uppercase characters', () => {
            expect(Str.ucsplit('FooBar')).toEqual(['Foo', 'Bar']);
        });
    });

    describe('Str.upper', () => {
        test('converts the given string to uppercase', () => {
            expect(Str.upper('laravel')).toEqual('LARAVEL');
        });
    });

    describe('Str.ulid', () => {
        test('generates a ULID', () => {
            expect(Str.ulid()).toMatch(/[0-9A-Z]{26}/);
        });
    });

    describe('Str.unwrap', () => {
        test('removes the specified strings from the beginning and end of a given string', () => {
            expect(Str.unwrap('-Laravel-', '-')).toEqual('Laravel');
            expect(Str.unwrap('{framework: "Laravel"}', '{', '}')).toEqual('framework: "Laravel"');
        });
    });

    describe('Str.uuid', () => {
        test('generates a UUID (version 4)', () => {
            expect(Str.uuid()).toMatch(/[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}/);
        });
    });

    describe('Str.wordCount', () => {
        test('returns the number of words that a string contains', () => {
            expect(Str.wordCount('Hello, world!')).toEqual(2);
        });
    });

    describe('Str.wordWrap', () => {
        test('wraps a string to a given number of characters', () => {
            expect(Str.wordWrap('The quick brown fox jumped over the lazy dog.', 20, '<br />\n')).toEqual('The quick brown fox<br />\njumped over the lazy<br />\ndog.');
        });
    });

    describe('Str.words', () => {
        test('limits the number of words in a string', () => {
            expect(Str.words('Perfectly balanced, as all things should be.', 3, ' >>>')).toEqual('Perfectly balanced, as >>>');
        });
    });

    describe('Str.wrap', () => {
        test('wraps the given string with an additional string or a pair of strings', () => {
            expect(Str.wrap('Laravel', '"')).toEqual('"Laravel"');
            expect(Str.wrap('is', 'This ', ' Laravel!')).toEqual('This is Laravel!');
        });
    });

    describe('str', () => {
        test('returns instance of Stringable', () => {
            expect(str()).toBeInstanceOf(Stringable);
        });
    });
});

describe('Fluent Strings', () => {
    describe('after', () => {
        test('returns everything after the given value in a string', () => {
            expect(Str.of('This is my name').after('This is').toString()).toEqual(' my name');
        });
    });

    describe('afterLast', () => {
        test('returns everything after the last occurrence of the given value in a string', () => {
            expect(Str.of('App\\Http\\Controllers\\Controller').afterLast('\\').toString()).toEqual('Controller');
        });
    });

    describe('apa', () => {
        test('converts the given string to title case following the APA guidelines', () => {
            expect(Str.of('a nice title uses the correct case').apa().toString()).toEqual('A Nice Title Uses the Correct Case');
        });
    });

    describe('append', () => {
        test('appends the given values to the string', () => {
            expect(Str.of('Taylor').append(' Otwell').toString()).toEqual('Taylor Otwell');
        });
    });

    describe('ascii', () => {
        test('transliterates the string into an ASCII value', () => {
            expect(Str.of('ü').ascii().toString()).toEqual('u');
        });
    });

    describe('basename', () => {
        test('returns the trailing name component of the given string', () => {
            expect(Str.of('/foo/bar/baz').basename().toString()).toEqual('baz');
            expect(Str.of('/foo/bar/baz.jpg').basename('.jpg').toString()).toEqual('baz');
        });
    });

    describe('before', () => {
        test('returns everything before the given value in a string', () => {
            expect(Str.of('This is my name').before('my name').toString()).toEqual('This is ');
        });
    });

    describe('beforeLast', () => {
        test('returns everything before the last occurrence of the given value in a string', () => {
            expect(Str.of('This is my name').beforeLast('is').toString()).toEqual('This ');
        });
    });

    describe('between', () => {
        test('returns the portion of a string between two values', () => {
            expect(Str.of('This is my name').between('This', 'name').toString()).toEqual(' is my ');
        });
    });

    describe('betweenFirst', () => {
        test('returns the smallest possible portion of a string between two values', () => {
            expect(Str.of('[a] bc [d]').betweenFirst('[', ']').toString()).toEqual('a');
        });
    });

    describe('camel', () => {
        test('converts the given string to camelCase', () => {
            expect(Str.of('foo_bar').camel().toString()).toEqual('fooBar');
        });
    });

    describe('charAt', () => {
        test('returns the character at the specified index', () => {
            expect(Str.of('This is my name.').charAt(6).toString()).toEqual('s');
        });
    });

    describe('chopStart', () => {
        test('removes the given string if it exists at the start of the subject', () => {
            expect(Str.of('Hello, world!').chopStart('Hello, ').toString()).toEqual('world!');
        });

        test('removes the first matching string from an array of needles', () => {
            expect(Str.of('Hello, world!').chopStart(['Hello, ', 'Hi, ']).toString()).toEqual('world!');
        });

        test('removes only the first matching string when both are found at the start', () => {
            expect(Str.of('Hello, Hello, world!').chopStart(['Hello, ', 'Hello, ']).toString()).toEqual('Hello, world!');
        });

        test('does not remove the string if it does not exist at the start of the subject', () => {
            expect(Str.of('Hello, world!').chopStart('world').toString()).toEqual('Hello, world!');
        });
    });

    describe('chopEnd', () => {
        test('removes the given string if it exists at the end of the subject', () => {
            expect(Str.of('Hello, world!').chopEnd('world!').toString()).toEqual('Hello, ');
        });

        test('removes the first matching string from an array of needles', () => {
            expect(Str.of('Hello, world!').chopEnd(['world!', 'planet!']).toString()).toEqual('Hello, ');
        });

        test('removes only the first matching string when both are found at the end', () => {
            expect(Str.of('Hello, world!world').chopEnd(['world', 'world!']).toString()).toEqual('Hello, world!');
        });

        test('does not remove the string if it does not exist at the end of the subject', () => {
            expect(Str.of('Hello, world!').chopEnd('Hello').toString()).toEqual('Hello, world!');
        });
    });

    describe('classBasename', () => {
        test('returns the class name of the given class with the class\'s namespace removed', () => {
            expect(Str.of('Foo\\Bar\\Baz').classBasename().toString()).toEqual('Baz');
        });
    });

    describe('contains', () => {
        test('determines if the given string contains the given value', () => {
            expect(Str.of('This is my name').contains('my').toString()).toBeTruthy();
        });
    });

    describe('containsAll', () => {
        test('determines if the given string contains all the values in the given array', () => {
            expect(Str.of('This is my name').containsAll(['my', 'name']).toString()).toBeTruthy();
        });
    });

    describe('dirname', () => {
        test('return the parent directory portion of the given string', () => {
            expect(Str.of('/foo/bar/baz').dirname().toString()).toEqual('/foo/bar');
            expect(Str.of('/foo/bar/baz').dirname(2).toString()).toEqual('/foo');
        });
    });

    describe('excerpt', () => {
        test('extracts an excerpt from the string that matches the first instance of a phrase within that string', () => {
            expect(Str.of('This is my name').excerpt('my', { 'radius': 3 }).toString()).toEqual('...is my na...');
        });
    });

    describe('endsWith', () => {
        test('determines if the given string ends with the given value', () => {
            expect(Str.of('This is my name').endsWith('name').toString()).toBeTruthy();
        });
    });

    describe('exactly', () => {
        test('determines if the given string is an exact match with another string', () => {
            expect(Str.of('Laravel').exactly('Laravel').toString()).toBeTruthy();
        });
    });

    describe('explode', () => {
        test('splits the string by the given delimiter and returns an array containing each section of the split string', () => {
            expect(Str.of('foo bar baz').explode(' ')).toEqual(['foo', 'bar', 'baz']);
        });
    });

    describe('finish', () => {
        test('adds a single instance of the given value to a string if it does not already end with that value', () => {
            expect(Str.of('this/string').finish('/').toString()).toEqual('this/string/');
        });

        test('does not add a value to a string that already ends with that value', () => {
            expect(Str.of('this/string/').finish('/').toString()).toEqual('this/string/');
        });
    });

    describe('fromBase64', () => {
        test('converts the given string from Base64', () => {
            expect(Str.of('TGFyYXZlbA==').fromBase64().toString()).toEqual('Laravel');
        });
    });

    describe('headline', () => {
        test('converts strings delimited by casing, hyphens, or underscores into a space delimited string with each word\'s first letter capitalized', () => {
            expect(Str.of('taylor_otwell').headline().toString()).toEqual('Taylor Otwell');
            expect(Str.of('EmailNotificationSent').headline().toString()).toEqual('Email Notification Sent');
        });
    });

    describe('is', () => {
        test('determines if a given string matches a given pattern', () => {
            expect(Str.of('foobar').is('foo*')).toBeTruthy();
            expect(Str.of('foobar').is('baz*')).toBeFalsy();
        });
    });

    describe('isAscii', () => {
        test('determines if a given string is an ASCII string', () => {
            expect(Str.of('Taylor').isAscii()).toBeTruthy();
            expect(Str.of('ü').isAscii()).toBeFalsy();
        });
    });

    describe('isEmpty', () => {
        test('determines if the given string is empty', () => {
            expect(Str.of('  ').trim().isEmpty()).toBeTruthy();
            expect(Str.of('Laravel').trim().isEmpty()).toBeFalsy();
        });
    });

    describe('isJson', () => {
        test('determines if a given string is valid JSON', () => {
            expect(Str.of('[1,2,3]').isJson()).toBeTruthy();
            expect(Str.of('{"first": "John", "last": "Doe"}').isJson()).toBeTruthy();
            expect(Str.of('{first: "John", last: "Doe"}').isJson()).toBeFalsy();
        });
    });

    describe('isNotEmpty', () => {
        test('determines if the given string is not empty', () => {
            expect(Str.of('  ').trim().isNotEmpty()).toBeFalsy();
            expect(Str.of('Laravel').trim().isNotEmpty()).toBeTruthy();
        });
    });

    describe('isUlid', () => {
        test('determines if a given string is a ULID', () => {
            expect(Str.of('01gd6r360bp37zj17nxb55yv40').toString()).toBeTruthy();
            expect(Str.of('Taylor').isUlid()).toBeFalsy();
        });
    });

    describe('isUrl', () => {
        test('determines if a given string is a URL', () => {
            expect(Str.of('http://example.com').isUrl()).toBeTruthy();
            expect(Str.of('Taylor').isUrl()).toBeFalsy();
        });
    });

    describe('isUuid', () => {
        test('determines if a given string is a UUID', () => {
            expect(Str.of('5ace9ab9-e9cf-4ec6-a19d-5881212a452c').isUuid()).toBeTruthy();
            expect(Str.of('Taylor').isUuid()).toBeFalsy();
        });
    });

    describe('kebab', () => {
        test('converts the given string to kebab-case', () => {
            expect(Str.of('fooBar').kebab().toString()).toEqual('foo-bar');
        });
    });

    describe('lcfirst', () => {
        test('returns the given string with the first character lowercased', () => {
            expect(Str.of('Foo Bar').lcfirst().toString()).toEqual('foo Bar');
        });
    });

    describe('length', () => {
        test('returns the length of the given string', () => {
            expect(Str.of('Laravel').length()).toEqual(7);
        });
    });

    describe('limit', () => {
        test('truncates the given string to the specified length', () => {
            expect(Str.of('The quick brown fox jumps over the lazy dog').limit(20).toString()).toEqual('The quick brown fox...');
        });

        test('truncates the string and appends a custom string', () => {
            expect(Str.of('The quick brown fox jumps over the lazy dog').limit(20, ' (...)').toString()).toEqual('The quick brown fox (...)');
        });
    });

    describe('lower', () => {
        test('converts the given string to lowercase', () => {
            expect(Str.of('LARAVEL').lower().toString()).toEqual('laravel');
        });
    });

    describe('ltrim', () => {
        test('trims the left side of the string', () => {
            expect(Str.of('  Laravel  ').ltrim().toString()).toEqual('Laravel  ');
        });

        test('trims the left side of the string with specified characters', () => {
            expect(Str.of('/Laravel/').ltrim('/').toString()).toEqual('Laravel/');
        });
    });

    describe('mask', () => {
        test('masks a portion of a string with a repeated character', () => {
            expect(Str.of('taylor@example.com').mask('*', 3).toString()).toEqual('tay***************');
        });

        test('masks a portion of a string from the end', () => {
            expect(Str.of('taylor@example.com').mask('*', -15, 3).toString()).toEqual('tay***@example.com');
        });
    });

    describe('match', () => {
        test('returns the portion of a string that matches a given regular expression pattern', () => {
            expect(Str.of('foo bar').match('/bar/').toString()).toEqual('bar');
        });

        test('returns the portion of a string that matches a regular expression with a capturing group', () => {
            expect(Str.of('foo bar').match('/foo (.*)/').toString()).toEqual('bar');
        });
    });

    describe('matchAll', () => {
        test('returns an array containing portions of a string that match a given regular expression pattern', () => {
            expect(Str.of('bar foo bar').matchAll('/bar/')).toEqual(['bar', 'bar']);
        });

        test('returns an array containing matches of a regular expression with a capturing group', () => {
            expect(Str.of('bar fun bar fly').matchAll('/f(\\w*)/')).toEqual(['un', 'ly']);
        });
    });

    describe('isMatch', () => {
        test('determines if the string matches a given regular expression', () => {
            expect(Str.of('foo bar').isMatch('/foo (.*)/')).toBeTruthy();
        });

        test('determines if the string does not match a given regular expression', () => {
            expect(Str.of('laravel').isMatch('/foo (.*)/')).toBeFalsy();
        });
    });

    describe('newLine', () => {
        test('appends an "end of line" character to a string', () => {
            expect(Str.of('Laravel').newLine().append('Framework').toString()).toEqual('Laravel\nFramework');
        });
    });

    describe('padBoth', () => {
        test('pads both sides of a string with another string until the final string reaches the desired length', () => {
            expect(Str.of('James').padBoth(10, '_').toString()).toEqual('__James___');
        });

        test('pads both sides of a string until the final string reaches the desired length', () => {
            expect(Str.of('James').padBoth(10).toString()).toEqual('  James   ');
        });
    });

    describe('padLeft', () => {
        test('pads the left side of a string with another string until the final string reaches the desired length', () => {
            expect(Str.of('James').padLeft(10, '-=').toString()).toEqual('-=-=-James');
        });

        test('pads the left side of a string until the final string reaches the desired length', () => {
            expect(Str.of('James').padLeft(10).toString()).toEqual('     James');
        });
    });

    describe('padRight', () => {
        test('pads the right side of a string with another string until the final string reaches the desired length', () => {
            expect(Str.of('James').padRight(10, '-').toString()).toEqual('James-----');
        });

        test('pads the right side of a string until the final string reaches the desired length', () => {
            expect(Str.of('James').padRight(10).toString()).toEqual('James     ');
        });
    });

    describe('pipe', () => {
        test('returns a Stringable instance', () => {
            const string: Stringable = Str.of('hello world').pipe((str: Stringable) => str + '!');

            expect(string).toBeInstanceOf(Stringable);
            expect(string.toString()).toEqual('hello world!');
        });

        test('calls the method on the string value when callback is a string', () => {
            expect(Str.of('hello world').pipe('toUpperCase').toString()).toEqual('HELLO WORLD');
        });

        test('calls the given function with the string value', () => {
            const string: Stringable = Str.of('hello world');
            const callback: Function = (str: Stringable) => str.explode(' ').join('-');
            const result: Stringable = string.pipe(callback);

            expect(result.toString()).toEqual('hello-world');
        });
    });

    describe('plural', () => {
        test('converts a singular word string to its plural form', () => {
            expect(Str.of('car').plural().toString()).toEqual('cars');
            expect(Str.of('child').plural().toString()).toEqual('children');
            expect(Str.of('child').plural(1).toString()).toEqual('child');
        });
    });

    describe('pluralStudly', () => {
        test('converts a singular word string formatted in studly caps case to its plural form', () => {
            expect(Str.of('VerifiedHuman').pluralStudly().toString()).toEqual('VerifiedHumans');
            expect(Str.of('UserFeedback').pluralStudly().toString()).toEqual('UserFeedback');
            expect(Str.of('VerifiedHuman').pluralStudly(2).toString()).toEqual('VerifiedHumans');
            expect(Str.of('VerifiedHuman').pluralStudly(1).toString()).toEqual('VerifiedHuman');
        });
    });

    describe('position', () => {
        test('returns the position of the first occurrence of a substring in a string', () => {
            expect(Str.of('Hello, World!').position('Hello')).toEqual(0);
        });

        test('returns the position of the first occurrence of a substring in a string', () => {
            expect(Str.of('Hello, World!').position('W')).toEqual(7);
        });
    });

    describe('prepend', () => {
        test('prepends the given values onto the string', () => {
            expect(Str.of('Framework').prepend('Laravel ').toString()).toEqual('Laravel Framework');
        });
    });

    describe('remove', () => {
        test('removes the given value or values from the string', () => {
            expect(Str.of('Arkansas is quite beautiful!').remove('quite ').toString()).toEqual('Arkansas is beautiful!');
        });
    });

    describe('reverse', () => {
        test('reverses the given string', () => {
            expect(Str.of('Hello World').reverse().toString()).toEqual('dlroW olleH');
        });
    });

    describe('repeat', () => {
        test('repeats the given string', () => {
            expect(Str.of('a').repeat(5).toString()).toEqual('aaaaa');
        });
    });

    describe('replace', () => {
        test('replaces a given string within the string', () => {
            expect(Str.of('Laravel 9.x').replace('9.x', '10.x').toString()).toEqual('Laravel 10.x');
        });
    });

    describe('replaceArray', () => {
        test('replaces a given value in the string sequentially using an array', () => {
            expect(Str.of('The event will take place between ? and ?').replaceArray('?', ['8:30', '9:00']).toString()).toEqual('The event will take place between 8:30 and 9:00');
        });
    });

    describe('replaceFirst', () => {
        test('replaces the first occurrence of a given value in a string', () => {
            expect(Str.of('the quick brown fox jumps over the lazy dog').replaceFirst('the', 'a').toString()).toEqual('a quick brown fox jumps over the lazy dog');
        });
    });

    describe('replaceLast', () => {
        test('replaces the last occurrence of a given value in a string', () => {
            expect(Str.of('the quick brown fox jumps over the lazy dog').replaceLast('the', 'a').toString()).toEqual('the quick brown fox jumps over a lazy dog');
        });
    });

    describe('replaceMatches', () => {
        test('replaces all portions of a string matching a pattern with the given replacement string', () => {
            expect(Str.of('(+1) 501-555-1000').replaceMatches('/[^A-Za-z0-9]+/', '').toString()).toEqual('15015551000');
        });

        test('replaces all portions of a string matching a pattern with the given replacement string', () => {
            expect(Str.of('123').replaceMatches('/\\d/', (match) => '[' + match[0] + ']').toString()).toEqual('[1][2][3]');
        });
    });

    describe('replaceStart', () => {
        test('replaces the first occurrence of the given value only if it appears at the start of the string', () => {
            expect(Str.of('Hello World').replaceStart('Hello', 'Laravel').toString()).toEqual('Laravel World');
        });

        test('does not replace the first occurrence of the given value if it does not appear at the start of the string', () => {
            expect(Str.of('Hello World').replaceStart('World', 'Laravel').toString()).toEqual('Hello World');
        });
    });

    describe('replaceEnd', () => {
        test('replaces the last occurrence of the given value only if it appears at the end of the string', () => {
            expect(Str.of('Hello World').replaceEnd('World', 'Laravel').toString()).toEqual('Hello Laravel');
        });

        test('does not replace the last occurrence of the given value if it does not appear at the end of the string', () => {
            expect(Str.of('Hello World').replaceEnd('Hello', 'Laravel').toString()).toEqual('Hello World');
        });
    });

    describe('rtrim', () => {
        test('trims the right side of the given string', () => {
            expect(Str.of('  Laravel  ').rtrim().toString()).toEqual('  Laravel');
        });

        test('trims the right side of the string with specified characters', () => {
            expect(Str.of('/Laravel/').rtrim('/').toString()).toEqual('/Laravel');
        });
    });

    describe('singular', () => {
        test('converts a plural word string to its singular form', () => {
            expect(Str.of('cars').singular().toString()).toEqual('car');
            expect(Str.of('children').singular(2).toString()).toEqual('child');

        });
    });

    describe('slug', () => {
        test('generates a URL friendly "slug" from the given string', () => {
            expect(Str.of('Laravel Framework').slug('-').toString()).toEqual('laravel-framework');
        });
    });

    describe('snake', () => {
        test('converts the given string to snake_case', () => {
            expect(Str.of('fooBar').snake().toString()).toEqual('foo_bar');
        });
    });

    describe('split', () => {
        test('splits a string into an array using a regular expression', () => {
            expect(Str.of('one, two, three').split('/[\s,]+/')).toEqual(['one', 'two', 'three']);
        });
    });

    describe('squish', () => {
        test('removes all extraneous white space from a string', () => {
            expect(Str.of('    laravel    framework    ').squish().toString()).toEqual('laravel framework');
        });
    });

    describe('start', () => {
        test('adds a single instance of the given value to a string if it does not already start with that value', () => {
            expect(Str.of('this/string').start('/').toString()).toEqual('/this/string');
        });

        test('does not add a value to a string that already starts with that value', () => {
            expect(Str.of('/this/string').start('/').toString()).toEqual('/this/string');
        });
    });

    describe('startsWith', () => {
        test('determines if the given string begins with the given value', () => {
            expect(Str.of('This is my name').startsWith('This')).toBeTruthy();
        });
    });

    describe('studly', () => {
        test('converts the given string to StudlyCase', () => {
            expect(Str.of('foo_bar').studly().toString()).toEqual('FooBar');
        });
    });

    describe('substr', () => {
        test('returns the portion of the string specified by the given start and length parameters', () => {
            expect(Str.of('Laravel Framework').substr(8).toString()).toEqual('Framework');
        });

        test('returns the portion of the string specified by the given start and length parameters', () => {
            expect(Str.of('Laravel Framework').substr(8, 5).toString()).toEqual('Frame');
        });
    });

    describe('substrCount', () => {
        test('returns the number of occurrences of a given value in the given string', () => {
            expect(Str.of('If you like ice cream, you will like snow cones.').substrCount('like')).toEqual(2);
        });
    });

    describe('substrReplace', () => {
        test('replaces text within a portion of a string starting at the specified position', () => {
            expect(Str.of('1300').substrReplace(':', 2).toString()).toEqual('13:');
        });

        test('inserts the string at the specified position without replacing any existing characters', () => {
            expect(Str.of('The Framework').substrReplace(' Laravel', 3, 0).toString()).toEqual('The Laravel Framework');
        });
    });

    describe('swap', () => {
        test('replaces multiple values in the string', () => {
            expect(Str.of('Tacos are great!').swap({ 'Tacos': 'Burritos', 'great': 'fantastic' }).toString()).toEqual('Burritos are fantastic!');
        });
    });

    describe('take', () => {
        test('returns specified number of characters from the beginning of the string', () => {
            expect(Str.of('Build something amazing!').take(5).toString()).toEqual('Build');
        });
    });

    describe('tap', () => {
        test('passes the string to the given closure', () => {
            expect(Str.of('Laravel').tap((string) => string.lower()).upper().toString()).toEqual('LARAVEL');
        });
    });

    describe('test', () => {
        test('determines if a string matches the given regular expression pattern', () => {
            expect(Str.of('Laravel Framework').test('/Laravel/').toString()).toEqual('true');
        });
    });

    describe('title', () => {
        test('converts the given string to Title Case', () => {
            expect(Str.of('a nice title uses the correct case').title().toString()).toEqual('A Nice Title Uses The Correct Case');
        });
    });

    describe('toBase64', () => {
        test('converts the given string to Base64', () => {
            expect(Str.of('Laravel').toBase64().toString()).toEqual('TGFyYXZlbA==');
        });
    });

    describe('trim', () => {
        test('trims the given string', () => {
            expect(Str.of('  Laravel  ').trim().toString()).toEqual('Laravel');
        });

        test('trims the given string with custom characters', () => {
            expect(Str.of('/Laravel/').trim('/').toString()).toEqual('Laravel');
        });
    });

    describe('ucfirst', () => {
        test('returns the given string with the first character capitalized', () => {
            expect(Str.of('foo bar').ucfirst().toString()).toEqual('Foo bar');
        });
    });

    describe('ucsplit', () => {
        test('splits the given string into an array by uppercase characters', () => {
            expect(Str.of('FooBar').ucsplit()).toEqual(['Foo', 'Bar']);
        });
    });

    describe('unwrap', () => {
        test('removes the specified strings from the beginning and end of a given string', () => {
            expect(Str.of('-Laravel-').unwrap('-').toString()).toEqual('Laravel');
        });

        test('removes the specified strings from the beginning and end of a given string with different delimiters', () => {
            expect(Str.of('{framework: "Laravel"}').unwrap('{', '}').toString()).toEqual('framework: "Laravel"');
        });
    });

    describe('toHtmlString', () => {
        // test('converts the string instance to an instance of HTMLElement', () => {
        //     expect(Str.of('<input type="text" placeholder="Hello">').toHtmlString()).toBeInstanceOf(HTMLInputElement);
        // });

        test('returns a string If no valid HTML is provided', () => {
            expect(Str.of('Hello').toHtmlString()).toEqual('Hello');
        });
    });

    describe('upper', () => {
        test('converts the given string to uppercase', () => {
            expect(Str.of('laravel').upper().toString()).toEqual('LARAVEL');
        });
    });

    describe('when', () => {
        test('invokes the given closure if a given condition is true', () => {
            expect(Str.of('Taylor').when(true, (string) => string.append(' Otwell')).toString()).toEqual('Taylor Otwell');
        });

        test('invokes the given closure if a given condition is true (TypeScript)', () => {
            expect(Str.of('Taylor').when(true, (string) => string.append(' Otwell')).toString()).toEqual('Taylor Otwell');
        });
    });

    describe('whenContains', () => {
        test('invokes the given closure if the string contains the given value', () => {
            expect(Str.of('tony stark').whenContains('tony', (string) => string.title()).toString()).toEqual('Tony Stark');
        });

        test('invokes the given closure if the string contains any value in the array', () => {
            expect(Str.of('tony stark').whenContains(['tony', 'hulk'], (string) => string.title()).toString()).toEqual('Tony Stark');
        });
    });

    describe('whenContainsAll', () => {
        test('invokes the given closure if the string contains all the given sub-strings', () => {
            expect(Str.of('tony stark').whenContainsAll(['tony', 'stark'], (string) => string.title()).toString()).toEqual('Tony Stark');
        });
    });

    describe('whenEmpty', () => {
        test('invokes the given closure if the string is empty', () => {
            expect(Str.of('  ').whenEmpty((string) => string.trim().prepend('Laravel')).toString()).toEqual('Laravel');
        });
    });

    describe('whenNotEmpty', () => {
        test('invokes the given closure if the string is not empty', () => {
            expect(Str.of('Framework').whenNotEmpty((string) => string.prepend('Laravel ')).toString()).toEqual('Laravel Framework');
        });
    });

    describe('whenStartsWith', () => {
        test('invokes the given closure if the string starts with the given sub-string', () => {
            expect(Str.of('disney world').whenStartsWith('disney', (string) => string.title()).toString()).toEqual('Disney World');
        });
    });

    describe('whenEndsWith', () => {
        test('invokes the given closure if the string ends with the given sub-string', () => {
            expect(Str.of('disney world').whenEndsWith('world', (string) => string.title()).toString()).toEqual('Disney World');
        });
    });

    describe('whenExactly', () => {
        test('invokes the given closure if the string exactly matches the given string', () => {
            expect(Str.of('laravel').whenExactly('laravel', (string) => string.title()).toString()).toEqual('Laravel');
        });
    });

    describe('whenNotExactly', () => {
        test('invokes the given closure if the string does not exactly match the given string', () => {
            expect(Str.of('framework').whenNotExactly('laravel', (string) => string.title()).toString()).toEqual('Framework');
        });
    });

    describe('whenIs', () => {
        test('invokes the given closure if the string matches a given pattern', () => {
            expect(Str.of('foo/bar').whenIs('foo/*', (string) => string.append('/baz')).toString()).toEqual('foo/bar/baz');
        });
    });

    describe('whenIsAscii', () => {
        test('invokes the given closure if the string is 7-bit ASCII', () => {
            expect(Str.of('laravel').whenIsAscii((string) => string.title()).toString()).toEqual('Laravel');
        });
    });

    describe('whenIsUlid', () => {
        test('invokes the given closure if the string is a valid ULID', () => {
            expect(Str.of('01gd6r360bp37zj17nxb55yv40').whenIsUlid((string) => string.substr(0, 8)).toString()).toEqual('01gd6r36');
        });
    });

    describe('whenIsUuid', () => {
        test('invokes the given closure if the string is a valid UUID', () => {
            expect(Str.of('a0a2a2d2-0b87-4a18-83f2-2529882be2de').whenIsUuid((string) => string.substr(0, 8)).toString()).toEqual('a0a2a2d2');
        });
    });

    describe('whenTest', () => {
        test('invokes the given closure if the string matches the given regular expression', () => {
            expect(Str.of('laravel framework').whenTest('/laravel/', (string) => string.title()).toString()).toEqual('Laravel Framework');
        });
    });

    describe('wordCount', () => {
        test('returns the number of words in the string', () => {
            expect(Str.of('Hello, world!').wordCount()).toEqual(2);
        });
    });

    describe('wordWrap', () => {
        test('wraps a string to a given number of characters', () => {
            expect(Str.of('The quick brown fox jumped over the lazy dog.').wordWrap(20, '<br />\n').toString()).toEqual('The quick brown fox<br />\njumped over the lazy<br />\ndog.');
        });
    });

    describe('words', () => {
        test('limits the number of words in the string', () => {
            expect(Str.of('Perfectly balanced, as all things should be.').words(3, ' >>>').toString()).toEqual('Perfectly balanced, as >>>');
        });
    });

    describe('wrap', () => {
        test('wraps the given string with an additional string or a pair of strings', () => {
            expect(Str.of('Laravel').wrap('"').toString()).toEqual('"Laravel"');
            expect(Str.of('is').wrap('This ', ' Laravel!').toString()).toEqual('This is Laravel!');
        });
    });

    describe('dd', () => {
        test('dumps the given string and ends execution of the script', () => {
            const consoleSpy = jest.spyOn(console, 'log').mockImplementation();

            expect(() => Str.of('Laravel').dd()).toThrow('dd()');
            expect(consoleSpy).toHaveBeenCalledWith('Laravel');

            consoleSpy.mockRestore();
        });
    });

    describe('dump', () => {
        test('dumps the given string to the console', () => {
            const consoleSpy = jest.spyOn(console, 'log').mockImplementation();

            Str.of('Laravel').dump();
            expect(consoleSpy).toHaveBeenCalledWith('Laravel');

            consoleSpy.mockRestore();
        });
    });

    describe('value', () => {
        test('gets the underlying string value', () => {
            expect(Str.of('Hello World').value()).toEqual('Hello World');
        });
    });

    describe('toString', () => {
        test('gets the raw string value', () => {
            expect(Str.of('Laravel').toString()).toEqual('Laravel');
        });
    });

    describe('toInteger', () => {
        test('returns the underlying string value as an integer', () => {
            expect(Str.of('1').toInteger()).toEqual(1);
        });

        test('returns 0 if the underlying string value is not a number', () => {
            expect(Str.of('Laravel').toInteger()).toEqual(0);
        });
    });

    describe('toFloat', () => {
        test('returns the underlying string value as a float', () => {
            expect(Str.of('1.5').toFloat()).toEqual(1.5);
        });

        test('returns 0 if the underlying string value is not a number', () => {
            expect(Str.of('Laravel').toFloat()).toEqual(0);
        });
    });

    describe('toBoolean', () => {
        test('returns the underlying string value as a boolean', () => {
            expect(Str.of('true').toBoolean()).toEqual(true);
        });

        test('returns false if the underlying string value is not recognized as true', () => {
            expect(Str.of('Laravel').toBoolean()).toEqual(false);
        });
    });

    describe('toDate', () => {
        test('gets the underlying string value as a formatted Date string', () => {
            expect(Str.of('13 September 2023, 12:00 PM').toDate()).toEqual('9/13/2023, 12:00:00');
        });

        test('formats the date and sets the Timezone', () => {
            expect(Str.of('13 September 2023, 12:00 PM').toDate('Y-m-d H:i:s', 'Europe/London')).toEqual('2023-09-13 11:00:00');
            expect(Str.of('13 September 2023, 12:00 PM').toDate('Y-m-d H:i:s', 'America/Toronto')).toEqual('2023-09-13 06:00:00');
        });

        test('returns "Invalid Date" for incorrect Date/Time string', () => {
            expect(Str.of('Laravel').toDate()).toEqual('Invalid Date');
        });

        test('format \'d\' returns the day of the month, 2 digits with leading zeros', () => {
            expect(Str.of('2024-02-29').toDate('d', 'CET')).toEqual('29');
        });

        test('format \'D\' returns a textual representation of a day, three letters', () => {
            expect(Str.of('2024-02-29').toDate('D', 'CET')).toEqual('Thu');
        });

        test('format \'j\' returns the day of the month without leading zeros', () => {
            expect(Str.of('2024-02-29').toDate('j', 'CET')).toEqual('29');
        });

        test('format \'l\' returns a full textual representation of the day of the week', () => {
            expect(Str.of('2024-02-29').toDate('l', 'CET')).toEqual('Thursday');
        });

        test('format \'N\' returns ISO 8601 numeric representation of the day of the week', () => {
            expect(Str.of('2024-02-29').toDate('N', 'CET')).toEqual('4');
        });

        test('format \'S\' returns English ordinal suffix for the day of the month, 2 characters', () => {
            expect(Str.of('2024-02-29').toDate('S', 'CET')).toEqual('th');
        });

        test('format \'w\' returns numeric representation of the day of the week', () => {
            expect(Str.of('2024-02-29').toDate('w', 'CET')).toEqual('4');
        });

        test('format \'z\' returns numeric representation of the day of the week', () => {
            expect(Str.of('2024-02-29').toDate('z', 'CET')).toEqual('60');
        });

        test('format \'W\' returns ISO 8601 week number of year, weeks starting on Monday', () => {
            expect(Str.of('2024-02-29').toDate('W', 'CET')).toEqual('09');
        });

        test('format \'F\' returns a full textual representation of a month', () => {
            expect(Str.of('2024-02-29').toDate('F', 'CET')).toEqual('February');
        });

        test('format \'m\' returns numeric representation of a month, with leading zeros', () => {
            expect(Str.of('2024-02-29').toDate('m', 'CET')).toEqual('02');
        });

        test('format \'M\' returns a short textual representation of a month, three letters', () => {
            expect(Str.of('2024-02-29').toDate('M', 'CET')).toEqual('Feb');
        });

        test('format \'n\' returns numeric representation of a month, without leading zeros', () => {
            expect(Str.of('2024-02-29').toDate('n', 'CET')).toEqual('2');
        });

        test('format \'t\' returns number of days in the given month', () => {
            expect(Str.of('2024-02-29').toDate('t', 'CET')).toEqual('29');
        });

        test('format \'L\'\' returns whether it"s a leap year', () => {
            expect(Str.of('2024-02-29').toDate('L', 'CET')).toEqual('1');
        });

        test('format \'o\' returns ISO 8601 week-numbering year', () => {
            expect(Str.of('2024-02-29').toDate('o', 'CET')).toEqual('2024');
        });

        test('format \'X\' returns an expanded full numeric representation of a year', () => {
            expect(Str.of('2024-02-29').toDate('X', 'CET')).toEqual('+2024');
        });

        test('format \'x\' returns an expanded full numeric representation if required', () => {
            expect(Str.of('2024-02-29').toDate('x', 'CET')).toEqual('2024');
        });

        test('format \'Y\' returns a full numeric representation of a year', () => {
            expect(Str.of('2024-02-29').toDate('Y', 'CET')).toEqual('2024');
        });

        test('format \'y\' returns a two-digit representation of a year', () => {
            expect(Str.of('2024-02-29').toDate('y', 'CET')).toEqual('24');
        });

        test('format \'a\' returns lowercase Ante meridiem and Post meridiem', () => {
            expect(Str.of('2024-02-29 08:00:00').toDate('a', 'CET')).toEqual('am');
        });

        test('format \'A\' returns uppercase Ante meridiem and Post meridiem', () => {
            expect(Str.of('2024-02-29 20:00:00').toDate('A', 'CET')).toEqual('PM');
        });

        test('format \'B\' returns Swatch Internet time', () => {
            expect(Str.of('2024-02-29 12:00:00').toDate('B', 'CET')).toEqual('500');
        });

        test('format \'g\' returns 12-hour format of an hour without leading zeros', () => {
            expect(Str.of('2024-02-29 08:00:00').toDate('g', 'CET')).toEqual('8');
        });

        test('format \'G\' returns 24-hour format of an hour without leading zeros', () => {
            expect(Str.of('2024-02-29 20:00:00').toDate('G', 'CET')).toEqual('20');
        });

        test('format \'h\' returns 12-hour format of an hour with leading zeros', () => {
            expect(Str.of('2024-02-29 08:00:00').toDate('h', 'CET')).toEqual('08');
        });

        test('format \'H\' returns 24-hour format of an hour with leading zeros', () => {
            expect(Str.of('2024-02-29 20:00:00').toDate('H', 'CET')).toEqual('20');
        });

        test('format \'i\' returns minutes with leading zeros', () => {
            expect(Str.of('2024-02-29 08:09:00').toDate('i', 'CET')).toEqual('09');
        });

        test('format \'s\' returns seconds with leading zeros', () => {
            expect(Str.of('2024-02-29 08:09:07').toDate('s', 'CET')).toEqual('07');
        });

        test('format \'u\' returns microseconds', () => {
            expect(() => Str.of('2024-02-29 08:09:07.654321').toDate('u', 'CET')).toThrow('Microseconds are not supported.'); // Disabled temporarily
        });

        test('format \'v\' returns milliseconds', () => {
            expect(Str.of('2024-02-29 08:09:07.654').toDate('v', 'CET')).toEqual('654');
        });

        test('format \'e\' returns timezone identifier', () => {
            expect(Str.of('2024-02-29 08:09:07').toDate('e', 'CET')).toMatch(/^(?:GMT|UTC|[A-Za-z\/_]+(?:[+\-][0-9]+)?)$/);
        });

        test('format \'I\' returns whether or not the date is in daylight saving time', () => {
            expect(Str.of('2024-02-29').toDate('I', 'CET')).toMatch(/^[01]$/);
        });

        test('format \'O\' returns difference to Greenwich time (GMT) without colon between hours and minutes', () => {
            expect(Str.of('2024-02-29').toDate('O', 'CET')).toMatch(/^[+\-]\d{4}$/);
        });

        test('format \'P\' returns difference to Greenwich time (GMT) with colon between hours and minutes', () => {
            expect(Str.of('2024-02-29').toDate('P', 'CET')).toMatch(/^[+\-]\d{2}:\d{2}$/);
        });

        test('format \'p\' returns the same as P, but returns Z instead of +00:00', () => {
            expect(Str.of('2024-02-29').toDate('p', 'CET')).toMatch(/^[+\-]\d{2}:\d{2}$/);
        });

        test('format \'T\' returns timezone abbreviation, if known; otherwise the GMT offset', () => {
            expect(Str.of('2024-02-29').toDate('T', 'CET')).toMatch(/^[A-Za-z]+|[+\-]\d{2}:\d{2}$/);
        });

        test('format \'Z\' returns timezone offset in seconds', () => {
            expect(Str.of('2024-02-29').toDate('Z', 'CET')).toMatch(/([+\-]?\d+)/);
        });

        test('format \'c\' returns ISO 8601 date', () => {
            expect(Str.of('2024-02-29 08:09:07').toDate('c', 'CET')).toEqual('2024-02-29T08:09:07+01:00');
        });

        test('format \'r\' returns seconds since the Unix Epoch', () => {
            expect(Str.of('2024-02-29').toDate('r', 'CET')).toEqual('Thu, 29 Feb 2024 01:00:00 +0100');
        });

        test('format \'U\' returns RFC 2822/RFC 5322 formatted date', () => {
            expect(Str.of('2024-02-29').toDate('U', 'CET')).toMatch(/^-?\d+$/);
        });
    });
});