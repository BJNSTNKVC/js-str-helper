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

        test('determines if the given string contains the given value case-insensitively', () => {
            expect(Str.contains('This is my name', 'MY', true)).toBeTruthy();
        });
    });

    describe('Str.containsAll', () => {
        test('determines if the given string contains all the values in a given array', () => {
            expect(Str.containsAll('This is my name', ['my', 'name'])).toBeTruthy();
        });

        test('determines if the given string contains all the values in a given array case-insensitively', () => {
            expect(Str.contains('This is my name', ['MY', 'NAME'], true)).toBeTruthy();
        });
    });

    describe('Str.doesntContain', () => {
        test('determines if the given string doesnt contain the given value', () => {
            expect(Str.doesntContain('This is name', 'my')).toBeTruthy();
        });

        test('determines if the given string doesnt contain any of the values in the array', () => {
            expect(Str.doesntContain('This is name', ['my', 'foo'])).toBeTruthy();
        });

        test('determines if the given string doesnt contain the given value case-insensitively', () => {
            expect(Str.doesntContain('This is name', 'MY', true)).toBeTruthy();
        });
    });

    describe('Str.convertCase', () => {
        test('converts the case of a string', () => {
            expect(Str.convertCase('hello', Mode.MB_CASE_UPPER)).toEqual('HELLO');
            expect(Str.convertCase('WORLD', Mode.MB_CASE_UPPER)).toEqual('WORLD');

            expect(Str.convertCase('HELLO', Mode.MB_CASE_LOWER)).toEqual('hello');
            expect(Str.convertCase('WORLD', Mode.MB_CASE_LOWER)).toEqual('world');

            expect(Str.convertCase('HeLLo', Mode.MB_CASE_FOLD)).toEqual('hello');
            expect(Str.convertCase('WoRLD', Mode.MB_CASE_FOLD)).toEqual('world');

            expect(Str.convertCase('üöä', Mode.MB_CASE_UPPER)).toEqual('ÜÖÄ');
            expect(Str.convertCase('ÜÖÄ', Mode.MB_CASE_LOWER)).toEqual('üöä');
        });
    });

    describe('Str.deduplicate', () => {
        test('replace consecutive instances of a given character with a single character in the given string', () => {
            expect(Str.deduplicate(' laravel   php  framework ')).toEqual(' laravel php framework ');
            expect(Str.deduplicate('whaaat', 'a')).toEqual('what');
            expect(Str.deduplicate('/some//odd//path/', '/')).toEqual('/some/odd/path/');
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

    describe('Str.wrap', () => {
        test('wraps the given string with an additional string or a pair of strings', () => {
            expect(Str.wrap('Laravel', '"')).toEqual('"Laravel"');
            expect(Str.wrap('is', 'This ', ' Laravel!')).toEqual('This is Laravel!');
        });
    });

    describe('Str.unwrap', () => {
        test('removes the specified strings from the beginning and end of a given string', () => {
            expect(Str.unwrap('-Laravel-', '-')).toEqual('Laravel');
            expect(Str.unwrap('{framework: "Laravel"}', '{', '}')).toEqual('framework: "Laravel"');
        });
    });

    describe('Str.is', () => {
        test('determines if a given string matches a given pattern', () => {
            expect(Str.is('a', 'a')).toBeTruthy();
            expect(Str.is('foo*', 'foobar')).toBeTruthy();
            expect(Str.is('baz*', 'foobar')).toBeFalsy();
            expect(Str.is(['a*', 'b*'], 'b/')).toBeTruthy();
            expect(Str.is(['a*', 'b*'], 'f/')).toBeFalsy();
        });

        test('determines if a given string matches a given pattern case-insensitively', () => {
            expect(Str.is('A', 'a', true)).toBeTruthy();
            expect(Str.is('FOO*', 'foobar', true)).toBeTruthy();
            expect(Str.is('baz*', 'foobar', true)).toBeFalsy();
            expect(Str.is(['A*', 'B*'], 'b/', true)).toBeTruthy();
            expect(Str.is(['A*', 'B*'], 'f/', true)).toBeFalsy();
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

    describe('Str.isUuid', () => {
        test('determines if the given string is a valid UUID', () => {
            expect(Str.isUuid('a0a2a2d2-0b87-4a18-83f2-2529882be2de')).toBeTruthy();
            expect(Str.isUuid('laravel')).toBeFalsy();
        });
    });

    describe('Str.isUlid', () => {
        test('determines if the given string is a valid ULID', () => {
            expect(Str.isUlid('01gd6r360bp37zj17nxb55yv40')).toBeTruthy();
            expect(Str.isUlid('laravel')).toBeFalsy();
        });
    });

    describe('Str.kebab', () => {
        test('converts the given string to kebab-case', () => {
            expect(Str.kebab('fooBar')).toEqual('foo-bar');
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
        });

        test('truncates the string and appends a custom string', () => {
            expect(Str.limit('The quick brown fox jumps over the lazy dog', 20, ' (...)')).toEqual('The quick brown fox (...)');
        });

        test('respects word boundaries if \'preserveWord\' is set to true', () => {
            expect(Str.limit('The quick brown fox jumps over the lazy dog', 20, '...', true)).toEqual('The quick brown...');
        });
    });

    describe('Str.lower', () => {
        test('converts the given string to lowercase', () => {
            expect(Str.lower('LARAVEL')).toEqual('laravel');
        });
    });

    describe('Str.words', () => {
        test('limits the number of words in a string', () => {
            expect(Str.words('Perfectly balanced, as all things should be.', 3, ' >>>')).toEqual('Perfectly balanced, as >>>');
        });
    });

    describe('Str.mask', () => {
        test('masks a portion of a string with a repeated character', () => {
            expect(Str.mask('taylor@example.com', '*', 3)).toEqual('tay***************');
            expect(Str.mask('taylor@example.com', '*', -15, 3)).toEqual('tay***@example.com');
        });
    });

    describe('Str.match', () => {
        test('returns the portion of a string that matches a given regular expression pattern', () => {
            expect(Str.match('/bar/', 'foo bar')).toEqual('bar');
        });

        test('returns the portion of a string that matches a regular expression with a capturing group', () => {
            expect(Str.match('/foo (.*)/', 'foo bar')).toEqual('bar');
        });
    });

    describe('Str.isMatch', () => {
        test('determines if the string matches a given regular expression', () => {
            expect(Str.isMatch('/foo (.*)/', 'foo bar')).toBeTruthy();
        });

        test('determines if the string does not match a given regular expression', () => {
            expect(Str.isMatch('/foo (.*)/', 'laravel')).toBeFalsy();
        });
    });

    describe('Str.matchAll', () => {
        test('returns an array containing portions of a string that match a given regular expression pattern', () => {
            expect(Str.matchAll('/bar/', 'bar foo bar')).toEqual(['bar', 'bar']);
        });

        test('returns an array containing matches of a regular expression with a capturing group', () => {
            expect(Str.matchAll('/f(\\w*)/', 'bar fun bar fly')).toEqual(['un', 'ly']);
        });
    });

    describe('Str.numbers', () => {
        test('removes all non-numeric characters from a string', () => {
            expect(Str.numbers('(555) 123-4567')).toEqual('5551234567');
            expect(Str.numbers('L4r4v3l!')).toEqual('443');
            expect(Str.numbers('Laravel!')).toEqual('');
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

    describe('Str.plural', () => {
        test('converts singular to plural for regular nouns', () => {
            expect(Str.plural('car')).toBe('cars');
            expect(Str.plural('book')).toBe('books');
            expect(Str.plural('apple')).toBe('apples');
        });

        test('handles count parameter correctly', () => {
            expect(Str.plural('child', 1)).toBe('child');
            expect(Str.plural('child', 2)).toBe('children');
            expect(Str.plural('person', 1)).toBe('person');
            expect(Str.plural('person', 3)).toBe('people');
        });

        test('converts irregular nouns correctly', () => {
            // A
            expect(Str.plural('alumna')).toBe('alumnae');
            expect(Str.plural('analysis')).toBe('analyses');
            expect(Str.plural('axis')).toBe('axes');

            // B-C
            expect(Str.plural('bacterium')).toBe('bacteria');
            expect(Str.plural('child')).toBe('children');
            expect(Str.plural('crisis')).toBe('crises');

            // D-F
            expect(Str.plural('datum')).toBe('data');
            expect(Str.plural('foot')).toBe('feet');
            expect(Str.plural('fungus')).toBe('fungi');

            // G-M
            expect(Str.plural('goose')).toBe('geese');
            expect(Str.plural('man')).toBe('men');
            expect(Str.plural('mouse')).toBe('mice');

            // N-S
            expect(Str.plural('nucleus')).toBe('nuclei');
            expect(Str.plural('person')).toBe('people');
            expect(Str.plural('thesis')).toBe('theses');

            // T-Z
            expect(Str.plural('tooth')).toBe('teeth');
            expect(Str.plural('wife')).toBe('wives');
            expect(Str.plural('zombie')).toBe('zombies');
        });

        test('handles uncountable nouns correctly', () => {
            expect(Str.plural('sheep')).toBe('sheep');
            expect(Str.plural('fish')).toBe('fish');
            expect(Str.plural('series')).toBe('series');
            expect(Str.plural('money')).toBe('money');
            expect(Str.plural('information')).toBe('information');
            expect(Str.plural('equipment')).toBe('equipment');
        });

        test('handles special pluralization rules', () => {
            // -f/-fe → -ves
            expect(Str.plural('leaf')).toBe('leaves');
            expect(Str.plural('knife')).toBe('knives');

            // -y → -ies
            expect(Str.plural('city')).toBe('cities');
            expect(Str.plural('baby')).toBe('babies');

            // -o → -oes
            expect(Str.plural('potato')).toBe('potatoes');
            expect(Str.plural('volcano')).toBe('volcanoes');

            // -us → -i
            expect(Str.plural('cactus')).toBe('cacti');
            expect(Str.plural('focus')).toBe('foci');

            // -is → -es
            expect(Str.plural('analysis')).toBe('analyses');
            expect(Str.plural('basis')).toBe('bases');

            // -ix → -ices
            expect(Str.plural('matrix')).toBe('matrices');
            expect(Str.plural('index')).toBe('indices');
        });

        test('handles compound words and special cases', () => {
            expect(Str.plural('passerby')).toBe('passersby');
            expect(Str.plural('runner-up')).toBe('runners-up');
        });

        test('handles words with multiple plural forms', () => {
            expect(Str.plural('octopus')).toBe('octopuses');
            expect(Str.plural('hoof')).toBe('hoofs');
        });

        test('preserves case sensitivity', () => {
            expect(Str.plural('Hero')).toBe('Heroes');
            expect(Str.plural('CHILD')).toBe('CHILDREN');
            expect(Str.plural('Analysis')).toBe('Analyses');
        });

        test('handles edge cases', () => {
            expect(Str.plural('')).toBe('');
            expect(Str.plural(' ')).toBe(' ');
            expect(Str.plural('sheep', 0)).toBe('sheep');
            expect(Str.plural('person', 1.5)).toBe('people');
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

    describe('Str.pluralPascal', () => {
        test('converts a singular word string formatted in Pascal case to its plural form', () => {
            expect(Str.pluralPascal('VerifiedHuman')).toEqual('VerifiedHumans');
            expect(Str.pluralPascal('UserFeedback')).toEqual('UserFeedback');
            expect(Str.pluralPascal('VerifiedHuman', 2)).toEqual('VerifiedHumans');
            expect(Str.pluralPascal('VerifiedHuman', 1)).toEqual('VerifiedHuman');
        });
    });

    describe('Str.password', () => {
        test('generates a secure, random password of a given length', () => {
            expect(Str.password()).toHaveLength(32);
            expect(Str.password(12)).toHaveLength(12);
        });
    });

    describe('Str.position', () => {
        test('returns the position of the first occurrence of a substring in a string', () => {
            expect(Str.position('Hello, World!', 'Hello')).toEqual(0);
        });

        test('returns the position of the first occurrence of a substring in a string', () => {
            expect(Str.position('Hello, World!', 'W')).toEqual(7);
        });
    });

    describe('Str.random', () => {
        test('generates a random string of the specified length', () => {
            expect(Str.random(40)).toHaveLength(40);
        });
    });

    describe('Str.repeat', () => {
        test('repeats the given string', () => {
            expect(Str.repeat('a', 5)).toEqual('aaaaa');
        });
    });

    describe('Str.replaceArray', () => {
        test('replaces a given value in the string sequentially using an array', () => {
            expect(Str.replaceArray('?', ['8:30', '9:00'], 'The event will take place between ? and ?')).toEqual('The event will take place between 8:30 and 9:00');
        });
    });

    describe('Str.replace', () => {
        test('replaces a given string within the string', () => {
            expect(Str.replace('9.x', '10.x', 'Laravel 9.x')).toEqual('Laravel 10.x');
            expect(Str.replace('framework', 'Laravel', 'Framework 10.x', false)).toEqual('Laravel 10.x');
        });
    });

    describe('Str.replaceFirst', () => {
        test('replaces the first occurrence of a given value in a string', () => {
            expect(Str.replaceFirst('the', 'a', 'the quick brown fox jumps over the lazy dog')).toEqual('a quick brown fox jumps over the lazy dog');
        });
    });

    describe('Str.replaceStart', () => {
        test('replaces the first occurrence of the given value only if the value appears at the start of the string', () => {
            expect(Str.replaceStart('Hello', 'Laravel', 'Hello World')).toEqual('Laravel World');
            expect(Str.replaceStart('World', 'Laravel', 'Hello World')).toEqual('Hello World');
        });
    });

    describe('Str.replaceLast', () => {
        test('replaces the last occurrence of a given value in a string', () => {
            expect(Str.replaceLast('the', 'a', 'the quick brown fox jumps over the lazy dog')).toEqual('the quick brown fox jumps over a lazy dog');
        });
    });

    describe('Str.replaceEnd', () => {
        test('replaces the last occurrence of the given value only if the value appears at the end of the string', () => {
            expect(Str.replaceEnd('World', 'Laravel', 'Hello World')).toEqual('Hello Laravel');
            expect(Str.replaceEnd('Hello', 'Laravel', 'Hello World')).toEqual('Hello World');
        });
    });

    describe('Str.replaceMatches', () => {
        test('replaces all portions of a string matching a pattern with the given replacement string', () => {
            expect(Str.replaceMatches('/[^A-Za-z0-9]+/', '', '(+1) 501-555-1000')).toEqual('15015551000');
            expect(Str.replaceMatches('/\\d/', (matches) => '[' + matches[0] + ']', '123')).toEqual('[1][2][3]');
        });
    });

    describe('Str.remove', () => {
        test('removes the given value or array of values from the string', () => {
            expect(Str.remove('e', 'Peter Piper picked a peck of pickled peppers.')).toEqual('Ptr Pipr pickd a pck of pickld ppprs.');
            expect(Str.remove('E', 'Peter Piper picked a peck of pickled peppers.', false)).toEqual('Ptr Pipr pickd a pck of pickld ppprs.');
        });
    });

    describe('Str.reverse', () => {
        test('reverses the given string', () => {
            expect(Str.reverse('Hello World')).toEqual('dlroW olleH');
        });
    });

    describe('Str.start', () => {
        test('adds a single instance of the given value to a string if it does not already start with that value', () => {
            expect(Str.start('this/string', '/')).toEqual('/this/string');
            expect(Str.start('/this/string', '/')).toEqual('/this/string');
        });
    });

    describe('Str.upper', () => {
        test('converts the given string to uppercase', () => {
            expect(Str.upper('laravel')).toEqual('LARAVEL');
        });
    });

    describe('Str.title', () => {
        test('converts the given string to Title Case', () => {
            expect(Str.title('a nice title uses the correct case')).toEqual('A Nice Title Uses The Correct Case');
        });
    });

    describe('Str.headline', () => {
        test('converts strings delimited by casing, hyphens, or underscores into a space delimited string with each word’s first letter capitalized', () => {
            expect(Str.headline('steve_jobs')).toEqual('Steve Jobs');
            expect(Str.headline('EmailNotificationSent')).toEqual('Email Notification Sent');
        });
    });

    describe('Str.apa', () => {
        test('converts the given string to title case following the APA guidelines', () => {
            expect(Str.apa('Creating A Project')).toEqual('Creating a Project');
        });
    });

    describe('Str.singular', () => {
        test('converts plural to singular for regular nouns', () => {
            expect(Str.singular('cars')).toBe('car');
            expect(Str.singular('books')).toBe('book');
            expect(Str.singular('apples')).toBe('apple');
        });

        test('handles irregular nouns correctly', () => {
            // A
            expect(Str.singular('alumnae')).toBe('alumna');
            expect(Str.singular('analyses')).toBe('analysis');
            expect(Str.singular('axes')).toBe('axis');

            // B-C
            expect(Str.singular('bacteria')).toBe('bacterium');
            expect(Str.singular('children')).toBe('child');
            expect(Str.singular('crises')).toBe('crisis');

            // D-F
            expect(Str.singular('demos')).toBe('demo');
            expect(Str.singular('feet')).toBe('foot');
            expect(Str.singular('fungi')).toBe('fungus');

            // G-M
            expect(Str.singular('geese')).toBe('goose');
            expect(Str.singular('men')).toBe('man');
            expect(Str.singular('mice')).toBe('mouse');

            // N-S
            expect(Str.singular('nuclei')).toBe('nucleus');
            expect(Str.singular('people')).toBe('person');
            expect(Str.singular('theses')).toBe('thesis');

            // T-Z
            expect(Str.singular('teeth')).toBe('tooth');
            expect(Str.singular('wives')).toBe('wife');
            expect(Str.singular('zombies')).toBe('zombie');
        });

        test('handles uncountable nouns correctly', () => {
            expect(Str.singular('sheep')).toBe('sheep');
            expect(Str.singular('fish')).toBe('fish');
            expect(Str.singular('series')).toBe('series');
            expect(Str.singular('money')).toBe('money');
            expect(Str.singular('information')).toBe('information');
        });

        test('handles special singularization rules', () => {
            // -ves → -f/-fe
            expect(Str.singular('leaves')).toBe('leaf');
            expect(Str.singular('knives')).toBe('knife');

            // -ies → -y
            expect(Str.singular('cities')).toBe('city');
            expect(Str.singular('babies')).toBe('baby');

            // -oes → -o
            expect(Str.singular('potatoes')).toBe('potato');
            expect(Str.singular('volcanoes')).toBe('volcano');

            // -i → -us
            expect(Str.singular('cacti')).toBe('cactus');
            expect(Str.singular('foci')).toBe('focus');

            // -es → -is
            expect(Str.singular('analyses')).toBe('analysis');
            expect(Str.singular('bases')).toBe('basis');

            // -ices → -ix/ex
            expect(Str.singular('matrices')).toBe('matrix');
            expect(Str.singular('indices')).toBe('index');
        });

        test('handles compound words and special cases', () => {
            expect(Str.singular('passersby')).toBe('passerby');
            expect(Str.singular('runners-up')).toBe('runner-up');
        });

        test('handles words with multiple singular forms', () => {
            expect(Str.singular('octopuses')).toBe('octopus');
            expect(Str.singular('hoofs')).toBe('hoof');
        });

        test('preserves case sensitivity', () => {
            expect(Str.singular('Heroes')).toBe('Hero');
            expect(Str.singular('CHILDREN')).toBe('CHILD');
            expect(Str.singular('Analyses')).toBe('Analysis');
        });

        test('handles edge cases', () => {
            expect(Str.singular('')).toBe('');
            expect(Str.singular(' ')).toBe(' ');
            expect(Str.singular('123')).toBe('123');
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

    describe('Str.trim', () => {
        test('removes all whitespace from both ends of a string', () => {
            expect(Str.trim('   Laravel   ')).toEqual('Laravel');
            expect(Str.trim('Laravel   ')).toEqual('Laravel');
            expect(Str.trim('   Laravel')).toEqual('Laravel');
            expect(Str.trim('Laravel')).toEqual('Laravel');
        });

        test('removes all whitespace from both ends of a string with specified characters', () => {
            expect(Str.trim(' Laravel ', '')).toEqual(' Laravel ');
            expect(Str.trim(' Laravel ', ' ')).toEqual('Laravel');
            expect(Str.trim('-Laravel  Framework_', '-_')).toEqual('Laravel  Framework');
        });
    });

    describe('Str.ltrim', () => {
        test('removes all whitespace from the beginning of a string', () => {
            expect(Str.ltrim('   Laravel   ')).toEqual('Laravel   ');
            expect(Str.ltrim('Laravel   ')).toEqual('Laravel   ');
            expect(Str.ltrim('   Laravel')).toEqual('Laravel');
            expect(Str.ltrim('Laravel')).toEqual('Laravel');
        });

        test('removes all whitespace from the beginning of a string with specified characters', () => {
            expect(Str.ltrim(' Laravel ', '')).toEqual(' Laravel ');
            expect(Str.ltrim(' Laravel ', ' ')).toEqual('Laravel ');
            expect(Str.ltrim('-Laravel  Framework_', '-_')).toEqual('Laravel  Framework_');
        });
    });

    describe('Str.rtrim', () => {
        test('removes all whitespace from the end of a string', () => {
            expect(Str.rtrim('   Laravel   ')).toEqual('   Laravel');
            expect(Str.rtrim('Laravel   ')).toEqual('Laravel');
            expect(Str.rtrim('   Laravel')).toEqual('   Laravel');
            expect(Str.rtrim('Laravel')).toEqual('Laravel');
        });

        test('removes all whitespace from the end of a string with specified characters', () => {
            expect(Str.rtrim(' Laravel ', '')).toEqual(' Laravel ');
            expect(Str.rtrim(' Laravel ', ' ')).toEqual(' Laravel');
            expect(Str.rtrim('-Laravel  Framework_', '-_')).toEqual('-Laravel  Framework');
        });
    });

    describe('Str.squish', () => {
        test('removes all extraneous white space from a string', () => {
            expect(Str.squish('    laravel    framework    ')).toEqual('laravel framework');
        });
    });

    describe('Str.startsWith', () => {
        test('determines if the given string begins with the given value', () => {
            expect(Str.startsWith('This is my name', 'This')).toBeTruthy();
            expect(Str.startsWith('This is my name', ['This', 'That', 'There'])).toBeTruthy();
        });
    });

    describe('Str.studly', () => {
        test('converts the given string to studly caps case', () => {
            expect(Str.studly('foo_bar')).toEqual('FooBar');
        });
    });

    describe('Str.pascal', () => {
        test('converts the given string to Pascal case', () => {
            expect(Str.pascal('foo_bar')).toEqual('FooBar');
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
            expect(Str.swap({
                'Tacos': 'Burritos',
                'great': 'fantastic'
            }, 'Tacos are great!')).toEqual('Burritos are fantastic!');
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

    describe('Str.toBase64', () => {
        test('converts the given string to Base64', () => {
            expect(Str.toBase64('Laravel')).toEqual('TGFyYXZlbA==');
        });
    });

    describe('Str.fromBase64', () => {
        test('converts the given string from Base64', () => {
            expect(Str.fromBase64('TGFyYXZlbA==')).toEqual('Laravel');
        });
    });

    describe('Str.lcfirst', () => {
        test('returns the given string with the first character lowercased', () => {
            expect(Str.lcfirst('Foo Bar')).toEqual('foo Bar');
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

    describe('Str.uuid', () => {
        test('generates a UUID (version 4)', () => {
            expect(Str.uuid()).toMatch(/[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}/);
        });
    });

    describe('Str.uuid7', () => {
        test('generates a UUID (version 7)', () => {
            expect(Str.uuid7()).toMatch(/^[0-9a-f]{8}-[0-9a-f]{4}-7[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/);
        });

        test('uses current time when no timestamp provided', () => {
            const before: number = Date.now();
            const uuid: string = Str.uuid7();
            const after: Number = Date.now();

            const time: number = parseInt(uuid.slice(0, 8) + uuid.slice(9, 13), 16);

            expect(time).toBeGreaterThanOrEqual(before);
            expect(time).toBeLessThanOrEqual(after);
        });

        test('accepts custom timestamp', () => {
            expect(Str.uuid7(new Date('2023-01-01T00:00:00Z')).startsWith('01856aa0-c800')).toBeTruthy();
        });

        test('handles minimum timestamp correctly', () => {
            expect(Str.uuid7(new Date(0)).startsWith('00000000-0000-7')).toBeTruthy();
        });

        test('handles maximum 48-bit timestamp correctly', () => {
            expect(Str.uuid7(new Date(281474976710655)).startsWith('ffffffff-ffff-7')).toBeTruthy();
        });

        test('throws error for invalid timestamps', () => {
            expect(() => Str.uuid7(new Date(-1))).toThrow(RangeError);
            expect(() => Str.uuid7(new Date(281474976710655 + 1))).toThrow(RangeError);
        });

        test('contains correct version and variant bits', () => {
            const parts: string[] = Str.uuid7().split('-');

            expect(parts[2][0]).toBe('7');
            expect(['8', '9', 'a', 'b']).toContain(parts[3][0]);
        });

        test('has correct byte structure', () => {
            const uuid: string = Str.uuid7();
            const bytes: string = uuid.replace(/-/g, '');

            const byte6: number = parseInt(bytes.substring(12, 14), 16);
            const byte8: number = parseInt(bytes.substring(16, 18), 16);

            expect((byte6 & 0xf0) >> 4).toBe(7);
            expect((byte8 & 0xc0) >> 6).toBe(2);
        });

        test('generates unique values', () => {
            const uuids = new Set<string>();
            const count = 1000;

            for (let i = 0; i < count; i++) {
                uuids.add(Str.uuid7());
            }

            expect(uuids.size).toBe(count);
        });
    });

    describe('Str.orderedUuid', () => {
        test('generates a "timestamp first" UUID', () => {
            expect(Str.orderedUuid()).toMatch(/[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}/);
        });
    });

    describe('Str.ulid', () => {
        test('generates a ULID', () => {
            expect(Str.ulid()).toMatch(/[0-9A-Z]{26}/);
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

    describe('append', () => {
        test('appends the given values to the string', () => {
            expect(Str.of('Taylor').append(' Otwell').toString()).toEqual('Taylor Otwell');
        });
    });

    describe('newLine', () => {
        test('appends an "end of line" character to a string', () => {
            expect(Str.of('Laravel').newLine().append('Framework').toString()).toEqual('Laravel\nFramework');
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

    describe('contains', () => {

        test('determines if the given string contains the given value', () => {
            expect(Str.of('This is my name').contains('my')).toBeTruthy();
        });

        test('determines if the given string contains any of the values in the array', () => {
            expect(Str.of('This is my name').contains(['my', 'foo'])).toBeTruthy();
        });

        test('determines if the given string contains the given value case-insensitively', () => {
            expect(Str.of('This is my name').contains('MY', true)).toBeTruthy();
        });
    });

    describe('containsAll', () => {
        test('determines if the given string contains all the values in a given array', () => {
            expect(Str.of('This is my name').containsAll(['my', 'name'])).toBeTruthy();
        });

        test('determines if the given string contains all the values in a given array case-insensitively', () => {
            expect(Str.of('This is my name').containsAll(['my', 'name'])).toBeTruthy();
        });
    });

    describe('doesntContain', () => {
        test('determines if the given string doesnt contain the given value', () => {
            expect(Str.of('This is name').doesntContain('my')).toBeTruthy();
        });

        test('determines if the given string doesnt contain any of the values in the array', () => {
            expect(Str.of('This is name').doesntContain(['my', 'foo'])).toBeTruthy();
        });

        test('determines if the given string doesnt contain the given value case-insensitively', () => {
            expect(Str.of('This is name').doesntContain('MY', true)).toBeTruthy();
        });
    });

    describe('convertCase', () => {
        test('converts the case of a string', () => {
            expect(Str.of('hello').convertCase(Mode.MB_CASE_UPPER).toString()).toEqual('HELLO');
            expect(Str.of('WORLD').convertCase(Mode.MB_CASE_UPPER).toString()).toEqual('WORLD');

            expect(Str.of('HELLO').convertCase(Mode.MB_CASE_LOWER).toString()).toEqual('hello');
            expect(Str.of('WORLD').convertCase(Mode.MB_CASE_LOWER).toString()).toEqual('world');

            expect(Str.of('HeLLo').convertCase(Mode.MB_CASE_FOLD).toString()).toEqual('hello');
            expect(Str.of('WoRLD').convertCase(Mode.MB_CASE_FOLD).toString()).toEqual('world');

            expect(Str.of('üöä').convertCase(Mode.MB_CASE_UPPER).toString()).toEqual('ÜÖÄ');
            expect(Str.of('ÜÖÄ').convertCase(Mode.MB_CASE_LOWER).toString()).toEqual('üöä');
        });
    });

    describe('deduplicate', () => {
        test('replace consecutive instances of a given character with a single character in the given string', () => {
            expect(Str.of(' laravel   php  framework ').deduplicate().toString()).toEqual(' laravel php framework ');
            expect(Str.of('whaaat').deduplicate('a').toString()).toEqual('what');
            expect(Str.of('/some//odd//path/').deduplicate('/').toString()).toEqual('/some/odd/path/');
        });
    });

    describe('dirname', () => {
        test('return the parent directory portion of the given string', () => {
            expect(Str.of('/foo/bar/baz').dirname().toString()).toEqual('/foo/bar');
            expect(Str.of('/foo/bar/baz').dirname(2).toString()).toEqual('/foo');
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

    describe('excerpt', () => {
        test('extracts an excerpt from the string that matches the first instance of a phrase within that string', () => {
            expect(Str.of('This is my name').excerpt('my', { 'radius': 3 }).toString()).toEqual('...is my na...');
        });
    });

    describe('explode', () => {
        test('splits the string by the given delimiter and returns an array containing each section of the split string', () => {
            expect(Str.of('foo bar baz').explode(' ')).toEqual(['foo', 'bar', 'baz']);
        });
    });

    describe('split', () => {
        test('splits a string into an array using a regular expression', () => {
            expect(Str.of('one, two, three').split('/[\s,]+/')).toEqual(['one', 'two', 'three']);
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

    describe('is', () => {
        test('determines if a given string matches a given pattern', () => {
            expect(Str.of('a').is('a')).toBeTruthy();
            expect(Str.of('foobar').is('foo*')).toBeTruthy();
            expect(Str.of('foobar').is('baz*')).toBeFalsy();
            expect(Str.of('b/').is(['a*', 'b*'])).toBeTruthy();
            expect(Str.of('f/').is(['a*', 'b*'])).toBeFalsy();
        });

        test('determines if a given string matches a given pattern case-insensitively', () => {
            expect(Str.of('a').is('A', true)).toBeTruthy();
            expect(Str.of('foobar').is('FOO*', true)).toBeTruthy();
            expect(Str.of('foobar').is('baz*', true)).toBeFalsy();
            expect(Str.of('b/').is(['A*', 'B*'], true)).toBeTruthy();
            expect(Str.of('f/').is(['A*', 'B*'], true)).toBeFalsy();
        });
    });

    describe('isAscii', () => {
        test('determines if a given string is an ASCII string', () => {
            expect(Str.of('Taylor').isAscii()).toBeTruthy();
            expect(Str.of('ü').isAscii()).toBeFalsy();
        });
    });

    describe('isJson', () => {
        test('determines if a given string is valid JSON', () => {
            expect(Str.of('[1,2,3]').isJson()).toBeTruthy();
            expect(Str.of('{"first": "John", "last": "Doe"}').isJson()).toBeTruthy();
            expect(Str.of('{first: "John", last: "Doe"}').isJson()).toBeFalsy();
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

    describe('isUlid', () => {
        test('determines if a given string is a ULID', () => {
            expect(Str.of('01gd6r360bp37zj17nxb55yv40').toString()).toBeTruthy();
            expect(Str.of('Taylor').isUlid()).toBeFalsy();
        });
    });

    describe('isEmpty', () => {
        test('determines if the given string is empty', () => {
            expect(Str.of('  ').trim().isEmpty()).toBeTruthy();
            expect(Str.of('Laravel').trim().isEmpty()).toBeFalsy();
        });
    });

    describe('isNotEmpty', () => {
        test('determines if the given string is not empty', () => {
            expect(Str.of('  ').trim().isNotEmpty()).toBeFalsy();
            expect(Str.of('Laravel').trim().isNotEmpty()).toBeTruthy();
        });
    });

    describe('kebab', () => {
        test('converts the given string to kebab-case', () => {
            expect(Str.of('fooBar').kebab().toString()).toEqual('foo-bar');
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

        test('respects word boundaries if \'preserveWord\' is set to true', () => {
            expect(Str.of('The quick brown fox jumps over the lazy dog').limit(20, '...', true).toString()).toEqual('The quick brown...');
        });
    });

    describe('lower', () => {
        test('converts the given string to lowercase', () => {
            expect(Str.of('LARAVEL').lower().toString()).toEqual('laravel');
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

    describe('isMatch', () => {
        test('determines if the string matches a given regular expression', () => {
            expect(Str.of('foo bar').isMatch('/foo (.*)/')).toBeTruthy();
        });

        test('determines if the string does not match a given regular expression', () => {
            expect(Str.of('laravel').isMatch('/foo (.*)/')).toBeFalsy();
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

    describe('test', () => {
        test('determines if a string matches the given regular expression pattern', () => {
            expect(Str.of('Laravel Framework').test('/Laravel/').toString()).toEqual('true');
        });
    });

    describe('numbers', () => {
        test('removes all non-numeric characters from a string', () => {
            expect(Str.of('(555) 123-4567').numbers().toString()).toEqual('5551234567');
            expect(Str.of('L4r4v3l!').numbers().toString()).toEqual('443');
            expect(Str.of('Laravel!').numbers().toString()).toEqual('');
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
        test('converts singular to plural for regular nouns', () => {
            expect(Str.of('car').plural().toString()).toBe('cars');
            expect(Str.of('book').plural().toString()).toBe('books');
            expect(Str.of('apple').plural().toString()).toBe('apples');
        });

        test('handles count parameter correctly', () => {
            expect(Str.of('child').plural(1).toString()).toBe('child');
            expect(Str.of('child').plural(2).toString()).toBe('children');
            expect(Str.of('person').plural(1).toString()).toBe('person');
            expect(Str.of('person').plural(3).toString()).toBe('people');
        });

        test('converts irregular nouns correctly', () => {
            // A
            expect(Str.of('alumna').plural().toString()).toBe('alumnae');
            expect(Str.of('analysis').plural().toString()).toBe('analyses');
            expect(Str.of('axis').plural().toString()).toBe('axes');

            // B-C
            expect(Str.of('bacterium').plural().toString()).toBe('bacteria');
            expect(Str.of('child').plural().toString()).toBe('children');
            expect(Str.of('crisis').plural().toString()).toBe('crises');

            // D-F
            expect(Str.of('datum').plural().toString()).toBe('data');
            expect(Str.of('foot').plural().toString()).toBe('feet');
            expect(Str.of('fungus').plural().toString()).toBe('fungi');

            // G-M
            expect(Str.of('goose').plural().toString()).toBe('geese');
            expect(Str.of('man').plural().toString()).toBe('men');
            expect(Str.of('mouse').plural().toString()).toBe('mice');

            // N-S
            expect(Str.of('nucleus').plural().toString()).toBe('nuclei');
            expect(Str.of('person').plural().toString()).toBe('people');
            expect(Str.of('thesis').plural().toString()).toBe('theses');

            // T-Z
            expect(Str.of('tooth').plural().toString()).toBe('teeth');
            expect(Str.of('wife').plural().toString()).toBe('wives');
            expect(Str.of('zombie').plural().toString()).toBe('zombies');
        });

        test('handles uncountable nouns correctly', () => {
            expect(Str.of('sheep').plural().toString()).toBe('sheep');
            expect(Str.of('fish').plural().toString()).toBe('fish');
            expect(Str.of('series').plural().toString()).toBe('series');
            expect(Str.of('money').plural().toString()).toBe('money');
            expect(Str.of('information').plural().toString()).toBe('information');
            expect(Str.of('equipment').plural().toString()).toBe('equipment');
        });

        test('handles special pluralization rules', () => {
            // -f/-fe → -ves
            expect(Str.of('leaf').plural().toString()).toBe('leaves');
            expect(Str.of('knife').plural().toString()).toBe('knives');

            // -y → -ies
            expect(Str.of('city').plural().toString()).toBe('cities');
            expect(Str.of('baby').plural().toString()).toBe('babies');

            // -o → -oes
            expect(Str.of('potato').plural().toString()).toBe('potatoes');
            expect(Str.of('volcano').plural().toString()).toBe('volcanoes');

            // -us → -i
            expect(Str.of('cactus').plural().toString()).toBe('cacti');
            expect(Str.of('focus').plural().toString()).toBe('foci');

            // -is → -es
            expect(Str.of('analysis').plural().toString()).toBe('analyses');
            expect(Str.of('basis').plural().toString()).toBe('bases');

            // -ix → -ices
            expect(Str.of('matrix').plural().toString()).toBe('matrices');
            expect(Str.of('index').plural().toString()).toBe('indices');
        });

        test('handles compound words and special cases', () => {
            expect(Str.of('passerby').plural().toString()).toBe('passersby');
            expect(Str.of('runner-up').plural().toString()).toBe('runners-up');
        });

        test('handles words with multiple plural forms', () => {
            expect(Str.of('octopus').plural().toString()).toBe('octopuses');
            expect(Str.of('hoof').plural().toString()).toBe('hoofs');
        });

        test('preserves case sensitivity', () => {
            expect(Str.of('Hero').plural().toString()).toBe('Heroes');
            expect(Str.of('CHILD').plural().toString()).toBe('CHILDREN');
            expect(Str.of('Analysis').plural().toString()).toBe('Analyses');
        });

        test('handles edge cases', () => {
            expect(Str.of('').plural().toString()).toBe('');
            expect(Str.of(' ').plural().toString()).toBe(' ');
            expect(Str.of('sheep').plural(0).toString()).toBe('sheep');
            expect(Str.of('person').plural(1.5).toString()).toBe('people');
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

    describe('pluralPascal', () => {
        test('converts a singular word string formatted in Pascal case to its plural form', () => {
            expect(Str.of('VerifiedHuman').pluralPascal().toString()).toEqual('VerifiedHumans');
            expect(Str.of('UserFeedback').pluralPascal().toString()).toEqual('UserFeedback');
            expect(Str.of('VerifiedHuman').pluralPascal(2).toString()).toEqual('VerifiedHumans');
            expect(Str.of('VerifiedHuman').pluralPascal(1).toString()).toEqual('VerifiedHuman');
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

    describe('replaceStart', () => {
        test('replaces the first occurrence of the given value only if it appears at the start of the string', () => {
            expect(Str.of('Hello World').replaceStart('Hello', 'Laravel').toString()).toEqual('Laravel World');
        });

        test('does not replace the first occurrence of the given value if it does not appear at the start of the string', () => {
            expect(Str.of('Hello World').replaceStart('World', 'Laravel').toString()).toEqual('Hello World');
        });
    });

    describe('replaceLast', () => {
        test('replaces the last occurrence of a given value in a string', () => {
            expect(Str.of('the quick brown fox jumps over the lazy dog').replaceLast('the', 'a').toString()).toEqual('the quick brown fox jumps over a lazy dog');
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

    describe('replaceMatches', () => {
        test('replaces all portions of a string matching a pattern with the given replacement string', () => {
            expect(Str.of('(+1) 501-555-1000').replaceMatches('/[^A-Za-z0-9]+/', '').toString()).toEqual('15015551000');
        });

        test('replaces all portions of a string matching a pattern with the given replacement string', () => {
            expect(Str.of('123').replaceMatches('/\\d/', (match) => '[' + match[0] + ']').toString()).toEqual('[1][2][3]');
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

    describe('upper', () => {
        test('converts the given string to uppercase', () => {
            expect(Str.of('laravel').upper().toString()).toEqual('LARAVEL');
        });
    });

    describe('title', () => {
        test('converts the given string to Title Case', () => {
            expect(Str.of('a nice title uses the correct case').title().toString()).toEqual('A Nice Title Uses The Correct Case');
        });
    });

    describe('headline', () => {
        test('converts strings delimited by casing, hyphens, or underscores into a space delimited string with each word\'s first letter capitalized', () => {
            expect(Str.of('taylor_otwell').headline().toString()).toEqual('Taylor Otwell');
            expect(Str.of('EmailNotificationSent').headline().toString()).toEqual('Email Notification Sent');
        });
    });

    describe('apa', () => {
        test('converts the given string to title case following the APA guidelines', () => {
            expect(Str.of('a nice title uses the correct case').apa().toString()).toEqual('A Nice Title Uses the Correct Case');
        });
    });

    describe('singular', () => {
        test('converts plural to singular for regular nouns', () => {
            expect(Str.of('cars').singular().toString()).toBe('car');
            expect(Str.of('books').singular().toString()).toBe('book');
            expect(Str.of('apples').singular().toString()).toBe('apple');
        });

        test('handles irregular nouns correctly', () => {
            // A
            expect(Str.of('alumnae').singular().toString()).toBe('alumna');
            expect(Str.of('analyses').singular().toString()).toBe('analysis');
            expect(Str.of('axes').singular().toString()).toBe('axis');

            // B-C
            expect(Str.of('bacteria').singular().toString()).toBe('bacterium');
            expect(Str.of('children').singular().toString()).toBe('child');
            expect(Str.of('crises').singular().toString()).toBe('crisis');

            // D-F
            expect(Str.of('demos').singular().toString()).toBe('demo');
            expect(Str.of('feet').singular().toString()).toBe('foot');
            expect(Str.of('fungi').singular().toString()).toBe('fungus');

            // G-M
            expect(Str.of('geese').singular().toString()).toBe('goose');
            expect(Str.of('men').singular().toString()).toBe('man');
            expect(Str.of('mice').singular().toString()).toBe('mouse');

            // N-S
            expect(Str.of('nuclei').singular().toString()).toBe('nucleus');
            expect(Str.of('people').singular().toString()).toBe('person');
            expect(Str.of('theses').singular().toString()).toBe('thesis');

            // T-Z
            expect(Str.of('teeth').singular().toString()).toBe('tooth');
            expect(Str.of('wives').singular().toString()).toBe('wife');
            expect(Str.of('zombies').singular().toString()).toBe('zombie');
        });

        test('handles uncountable nouns correctly', () => {
            expect(Str.of('sheep').singular().toString()).toBe('sheep');
            expect(Str.of('fish').singular().toString()).toBe('fish');
            expect(Str.of('series').singular().toString()).toBe('series');
            expect(Str.of('money').singular().toString()).toBe('money');
            expect(Str.of('information').singular().toString()).toBe('information');
        });

        test('handles special singularization rules', () => {
            // -ves → -f/-fe
            expect(Str.of('leaves').singular().toString()).toBe('leaf');
            expect(Str.of('knives').singular().toString()).toBe('knife');

            // -ies → -y
            expect(Str.of('cities').singular().toString()).toBe('city');
            expect(Str.of('babies').singular().toString()).toBe('baby');

            // -oes → -o
            expect(Str.of('potatoes').singular().toString()).toBe('potato');
            expect(Str.of('volcanoes').singular().toString()).toBe('volcano');

            // -i → -us
            expect(Str.of('cacti').singular().toString()).toBe('cactus');
            expect(Str.of('foci').singular().toString()).toBe('focus');

            // -es → -is
            expect(Str.of('analyses').singular().toString()).toBe('analysis');
            expect(Str.of('bases').singular().toString()).toBe('basis');

            // -ices → -ix/ex
            expect(Str.of('matrices').singular().toString()).toBe('matrix');
            expect(Str.of('indices').singular().toString()).toBe('index');
        });

        test('handles compound words and special cases', () => {
            expect(Str.of('passersby').singular().toString()).toBe('passerby');
            expect(Str.of('runners-up').singular().toString()).toBe('runner-up');
        });

        test('handles words with multiple singular forms', () => {
            expect(Str.of('octopuses').singular().toString()).toBe('octopus');
            expect(Str.of('hoofs').singular().toString()).toBe('hoof');
        });

        test('preserves case sensitivity', () => {
            expect(Str.of('Heroes').singular().toString()).toBe('Hero');
            expect(Str.of('CHILDREN').singular().toString()).toBe('CHILD');
            expect(Str.of('Analyses').singular().toString()).toBe('Analysis');
        });

        test('handles edge cases', () => {
            expect(Str.of('').singular().toString()).toBe('');
            expect(Str.of(' ').singular().toString()).toBe(' ');
            expect(Str.of('123').singular().toString()).toBe('123');
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

    describe('startsWith', () => {
        test('determines if the given string begins with the given value', () => {
            expect(Str.of('This is my name').startsWith('This')).toBeTruthy();
        });
    });

    describe('studly', () => {
        test('converts the given string to studly caps case', () => {
            expect(Str.of('foo_bar').studly().toString()).toEqual('FooBar');
        });
    });

    describe('pascal', () => {
        test('converts the given string to Pascal case', () => {
            expect(Str.of('foo_bar').pascal().toString()).toEqual('FooBar');
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
            expect(Str.of('Tacos are great!').swap({
                'Tacos': 'Burritos',
                'great': 'fantastic'
            }).toString()).toEqual('Burritos are fantastic!');
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

    describe('trim', () => {
        test('trims the given string', () => {
            expect(Str.of('  Laravel  ').trim().toString()).toEqual('Laravel');
        });

        test('trims the given string with custom characters', () => {
            expect(Str.of('/Laravel/').trim('/').toString()).toEqual('Laravel');
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

    describe('rtrim', () => {
        test('trims the right side of the given string', () => {
            expect(Str.of('  Laravel  ').rtrim().toString()).toEqual('  Laravel');
        });

        test('trims the right side of the string with specified characters', () => {
            expect(Str.of('/Laravel/').rtrim('/').toString()).toEqual('/Laravel');
        });
    });

    describe('lcfirst', () => {
        test('returns the given string with the first character lowercased', () => {
            expect(Str.of('Foo Bar').lcfirst().toString()).toEqual('foo Bar');
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

    describe('when', () => {
        test('invokes the given closure if a given condition is true', () => {
            expect(Str.of('Taylor').when(true, (string) => string.append(' Otwell')).toString()).toEqual('Taylor Otwell');
        });
    });

    describe('unless', () => {
        test('invokes the given closure if a given condition is false', () => {
            expect(Str.of('Taylor').unless(false, (string) => string.append(' Otwell')).toString()).toEqual('Taylor Otwell');
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

    describe('whenIsUuid', () => {
        test('invokes the given closure if the string is a valid UUID', () => {
            expect(Str.of('a0a2a2d2-0b87-4a18-83f2-2529882be2de').whenIsUuid((string) => string.substr(0, 8)).toString()).toEqual('a0a2a2d2');
        });
    });

    describe('whenIsUlid', () => {
        test('invokes the given closure if the string is a valid ULID', () => {
            expect(Str.of('01gd6r360bp37zj17nxb55yv40').whenIsUlid((string) => string.substr(0, 8)).toString()).toEqual('01gd6r36');
        });
    });

    describe('whenStartsWith', () => {
        test('invokes the given closure if the string starts with the given sub-string', () => {
            expect(Str.of('disney world').whenStartsWith('disney', (string) => string.title()).toString()).toEqual('Disney World');
        });
    });

    describe('whenTest', () => {
        test('invokes the given closure if the string matches the given regular expression', () => {
            expect(Str.of('laravel framework').whenTest('/laravel/', (string) => string.title()).toString()).toEqual('Laravel Framework');
        });
    });

    describe('words', () => {
        test('limits the number of words in the string', () => {
            expect(Str.of('Perfectly balanced, as all things should be.').words(3, ' >>>').toString()).toEqual('Perfectly balanced, as >>>');
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

    describe('wrap', () => {
        test('wraps the given string with an additional string or a pair of strings', () => {
            expect(Str.of('Laravel').wrap('"').toString()).toEqual('"Laravel"');
            expect(Str.of('is').wrap('This ', ' Laravel!').toString()).toEqual('This is Laravel!');
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

    describe('toBase64', () => {
        test('converts the given string to Base64', () => {
            expect(Str.of('Laravel').toBase64().toString()).toEqual('TGFyYXZlbA==');
        });
    });

    describe('fromBase64', () => {
        test('converts the given string from Base64', () => {
            expect(Str.of('TGFyYXZlbA==').fromBase64().toString()).toEqual('Laravel');
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