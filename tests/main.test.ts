// @ts-nocheck

require('../src/main');

describe('Strings', () => {
	test('The "Str.of" method returns instance of Stringable', () => {
		expect(Str.of('foo')).toBeInstanceOf(Stringable);
	});

	test('The "Str.after" method returns everything after the given value in a string', () => {
		expect(Str.after('This is my name', 'This is')).toEqual(' my name');
	});

	test('The "Str.afterLast" method returns everything after the last occurrence of the given value in a string', () => {
		expect(Str.afterLast('App\\Http\\Controllers\\Controller', '\\')).toEqual('Controller');
	});

	test('The "Str.apa" method converts the given string to title case following the APA guidelines', () => {
		expect(Str.apa('Creating A Project')).toEqual('Creating a Project');
	});

	test('The "Str.ascii" method will attempt to transliterate the string into an ASCII value', () => {
		expect(Str.ascii('û')).toEqual('u');
	});

	test('The "Str.before" method returns everything before the given value in a string', () => {
		expect(Str.before('This is my name', 'my name')).toEqual('This is ');
	});

	test('The "Str.beforeLast" method returns everything before the last occurrence of the given value in a string', () => {
		expect(Str.beforeLast('This is my name', 'is')).toEqual('This ');
	});

	test('The "Str.between" method returns the portion of a string between two values', () => {
		expect(Str.between('This is my name', 'This', 'name')).toEqual(' is my ');
	});

	test('The "Str.betweenFirst" method returns the smallest possible portion of a string between two values', () => {
		expect(Str.betweenFirst('[a] bc [d]', '[', ']')).toEqual('a');
	});

	test('The "Str.camel" method converts the given string to camelCase', () => {
		expect(Str.camel('foo_bar')).toEqual('fooBar');
	});

	test('The "Str.charAt" method returns the character at the specified index', () => {
		expect(Str.charAt('This is my name.', 6)).toEqual('s');
	});

	test('The "Str.contains" method determines if the given string contains the given value', () => {
		expect(Str.contains('This is my name', 'my')).toBeTruthy();
	});

	test('The "Str.containsAll" method determines if the given string contains all the values in a given array', () => {
		expect(Str.containsAll('This is my name', ['my', 'name'])).toBeTruthy();
	});

	test('The "Str.endsWith" method determines if the given string ends with the given value', () => {
		expect(Str.endsWith('This is my name', 'name')).toBeTruthy();
	});

	test('The "Str.endsWith" method determines if the given string ends with any of the values in the array', () => {
		expect(Str.endsWith('This is my name', ['name', 'foo'])).toBeTruthy();
		expect(Str.endsWith('This is my name', ['this', 'foo'])).toEqual(false);
	});

	test('The "Str.excerpt" method extracts an excerpt from a given string that matches the first instance of a phrase within that string', () => {
		expect(Str.excerpt('This is my name', 'my', { 'radius': 3 })).toEqual('...is my na...');
	});

	test('The "Str.excerpt" method allows customizing the omitted characters and radius', () => {
		expect(Str.excerpt('This is my name', 'name', { 'radius': 3, 'omission': '(...) ' })).toEqual('(...) my name');
	});

	test('The "Str.finish" method adds a single instance of the given value to a string if it does not already end with that', () => {
		expect(Str.finish('this/string', '/')).toEqual('this/string/');
		expect(Str.finish('this/string/', '/')).toEqual('this/string/');
	});

	test('The "Str.fromBase64" method converts the given string from Base64', () => {
		expect(Str.fromBase64('TGFyYXZlbA==')).toEqual('Laravel');
	});

	test('The "Str.headline" method will convert strings delimited by casing, hyphens, or underscores into a space delimited', () => {
		expect(Str.headline('steve_jobs')).toEqual('Steve Jobs');
		expect(Str.headline('EmailNotificationSent')).toEqual('Email Notification Sent');
	});

	test('The "Str.is" method determines if a given string matches a given pattern', () => {
		expect(Str.is('foo*', 'foobar')).toBeTruthy();
		expect(Str.is('baz*', 'foobar')).toBeFalsy();
	});

	test('The "Str.isAscii" method determines if a given string is 7-bit ASCII', () => {
		expect(Str.isAscii('Taylor')).toBeTruthy();
		expect(Str.isAscii('ü')).toBeFalsy();
	});

	test('The "Str.isJson" method determines if the given string is valid JSON', () => {
		expect(Str.isJson('[1,2,3]')).toBeTruthy();
		expect(Str.isJson('{"first": "John", "last": "Doe"}')).toBeTruthy();
		expect(Str.isJson('{first: "John", last: "Doe"}')).toBeFalsy();
	});

	test('The "Str.isUrl" method determines if the given string is a valid URL', () => {
		expect(Str.isUrl('http://example.com')).toBeTruthy();
		expect(Str.isUrl('laravel')).toBeFalsy();
	});

	test('The "Str.isUlid" method determines if the given string is a valid ULID', () => {
		expect(Str.isUlid('01gd6r360bp37zj17nxb55yv40')).toBeTruthy();
		expect(Str.isUlid('laravel')).toBeFalsy();
	});

	test('The "Str.isUuid" method determines if the given string is a valid UUID', () => {
		expect(Str.isUuid('a0a2a2d2-0b87-4a18-83f2-2529882be2de')).toBeTruthy();
		expect(Str.isUuid('laravel')).toBeFalsy();
	});

	test('The "Str.kebab" method converts the given string to kebab-case', () => {
		expect(Str.kebab('fooBar')).toEqual('foo-bar');
	});

	test('The "Str.lcfirst" method returns the given string with the first character lowercased', () => {
		expect(Str.lcfirst('Foo Bar')).toEqual('foo Bar');
	});

	test('The "Str.length" method returns the length of the given string', () => {
		expect(Str.length('Laravel')).toEqual(7);
	});

	test('The "Str.limit" method truncates the given string to the specified length', () => {
		expect(Str.limit('The quick brown fox jumps over the lazy dog', 20)).toEqual('The quick brown fox...');
		expect(Str.limit('The quick brown fox jumps over the lazy dog', 20, ' (...)')).toEqual('The quick brown fox (...)');
	});

	test('The "Str.lower" method converts the given string to lowercase', () => {
		expect(Str.lower('LARAVEL')).toEqual('laravel');
	});

	test('The "Str.mask" method masks a portion of a string with a repeated character', () => {
		expect(Str.mask('taylor@example.com', '*', 3)).toEqual('tay***************');
		expect(Str.mask('taylor@example.com', '*', -15, 3)).toEqual('tay***@example.com');
	});

	test('The "Str.uuid" method generates a UUID (version 4)', () => {
		expect(Str.uuid()).toMatch(/[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}/);
	});

	test('The "Str.padBoth" pads both sides of a string with another string until the final string reaches a desired length', () => {
		expect(Str.padBoth('James', 10, '_')).toEqual('__James___');
		expect(Str.padBoth('James', 10)).toEqual('  James   ');
	});

	test('The "Str.padLeft" pads the left side of a string with another string until the final string reaches a desired length', () => {
		expect(Str.padLeft('James', 10, '-=')).toEqual('-=-=-James');
		expect(Str.padLeft('James', 10)).toEqual('     James');
	});

	test('The "Str.padRight" pads the right side of a string with another string until the final string reaches a desired length', () => {
		expect(Str.padRight('James', 10, '-')).toEqual('James-----');
		expect(Str.padRight('James', 10)).toEqual('James     ');
	});

	test('The "Str.password" method may be used to generate a secure, random password of a given length', () => {
		expect(Str.password()).toHaveLength(32);
		expect(Str.password(12)).toHaveLength(12);
	});

	test('The "Str.plural" method converts a singular word string to its plural form', () => {
		expect(Str.plural('car')).toEqual('cars');
		expect(Str.plural('child')).toEqual('children');
		expect(Str.plural('child', 2)).toEqual('children');
		expect(Str.plural('child', 1)).toEqual('child');
	});

	test('The "Str.pluralStudly" method converts a singular word string formatted in studly caps case to its plural form', () => {
		expect(Str.pluralStudly('VerifiedHuman')).toEqual('VerifiedHumans');
		expect(Str.pluralStudly('UserFeedback')).toEqual('UserFeedback');
		expect(Str.pluralStudly('VerifiedHuman', 2)).toEqual('VerifiedHumans');
		expect(Str.pluralStudly('VerifiedHuman', 1)).toEqual('VerifiedHuman');
	});

	test('The "Str.random" method generates a random string of the specified length', () => {
		expect(Str.random()).toHaveLength(16);
		expect(Str.random(12)).toHaveLength(12);
	});

	test('The "Str.remove" method removes the given value or array of values from the string', () => {
		expect(Str.remove('e', 'Peter Piper picked a peck of pickled peppers.')).toEqual('Ptr Pipr pickd a pck of pickld ppprs.');
		expect(Str.remove('E', 'Peter Piper picked a peck of pickled peppers.', false)).toEqual('Ptr Pipr pickd a pck of pickld ppprs.');
	});

	test('The "Str.repeat"  method repeats the given string', () => {
		expect(Str.repeat('a', 5)).toEqual('aaaaa');
	});

	test('The "Str.replace" method replaces a given string within the string', () => {
		expect(Str.replace('8.x', '9.x', 'Laravel 8.x')).toEqual('Laravel 9.x');
		expect(Str.replace('framework', 'Laravel', 'Framework 10.x', false)).toEqual('Laravel 10.x');
	});

	test('The "Str.replaceArray" method replaces a given value in the string sequentially using an array', () => {
		expect(Str.replaceArray('?', ['8:30', '9:00'], 'The event will take place between ? and ?')).toEqual('The event will take place between 8:30 and 9:00');
	});

	test('The "Str.replaceFirst" method replaces the first occurrence of a given value in a string', () => {
		expect(Str.replaceFirst('the', 'a', 'the quick brown fox jumps over the lazy dog')).toEqual('a quick brown fox jumps over the lazy dog');
	});

	test('The "Str.replaceLast" method replaces the last occurrence of a given value in a string', () => {
		expect(Str.replaceLast('the', 'a', 'the quick brown fox jumps over the lazy dog')).toEqual('the quick brown fox jumps over a lazy dog');
	});

	test('The "Str.replaceMatches" method replaces all portions of a string matching a pattern with the given replacement string', () => {
		expect(Str.replaceMatches('/[^A-Za-z0-9]+/', '', '(+1) 501-555-1000')).toEqual('15015551000');
	});

	test('The "Str.replaceMatches" method accepts a closure to perform custom replacement logic', () => {
		expect(Str.replaceMatches('/\\d/', (matches: string) => '[' + matches[0] + ']', '123')).toEqual('[1][2][3]');
	});

	test('The "Str.replaceStart" method replaces the first occurrence of the given value only if it appears at the start of the string', () => {
		expect(Str.replaceStart('Hello', 'Laravel', 'Hello World')).toEqual('Laravel World');
		expect(Str.replaceStart('World', 'Laravel', 'Hello World')).toEqual('Hello World');
	});

	test('The "Str.replaceEnd" method replaces the last occurrence of the given value only if it appears at the end of the string', () => {
		expect(Str.replaceEnd('World', 'Laravel', 'Hello World')).toEqual('Hello Laravel');
		expect(Str.replaceEnd('Hello', 'Laravel', 'Hello World')).toEqual('Hello World');
	});

	test('The "Str.reverse" method reverses the given string', () => {
		expect(Str.reverse('Hello World')).toEqual('dlroW olleH');
	});

	test('The "Str.singular" method converts a string to its singular form', () => {
		expect(Str.singular('cars')).toEqual('car');
		expect(Str.singular('children')).toEqual('child');
	});

	test('The "Str.slug" method generates a URL friendly "slug" from the given string', () => {
		expect(Str.slug('Laravel 5 Framework', '-')).toEqual('laravel-5-framework');
	});

	test('The "Str.snake" method converts the given string to snake_case', () => {
		expect(Str.snake('fooBar')).toEqual('foo_bar');
		expect(Str.snake('fooBar', '-')).toEqual('foo-bar');
	});

	test('The "Str.squish" method removes all extraneous white space from a string', () => {
		expect(Str.squish('    laravel    framework    ')).toEqual('laravel framework');
	});

	test('The "Str.start" method adds a single instance of the given value to a string if it does not already start with that value', () => {
		expect(Str.start('this/string', '/')).toEqual('/this/string');
		expect(Str.start('/this/string', '/')).toEqual('/this/string');
	});

	test('The "Str.startsWith" method determines if the given string begins with the given value', () => {
		expect(Str.startsWith('This is my name', 'This')).toBeTruthy();
		expect(Str.startsWith('This is my name', ['This', 'That', 'There'])).toBeTruthy();
	});

	test('The "Str.studly" method converts the given string to StudlyCase', () => {
		expect(Str.studly('foo_bar')).toEqual('FooBar');
	});

	test('The "Str.substr" method returns the portion of string specified by the start and length parameters', () => {
		expect(Str.substr('The Laravel Framework', 4, 7)).toEqual('Laravel');
	});

	test('The "Str.substrCount" method returns the number of occurrences of a given value in the given string', () => {
		expect(Str.substrCount('If you like ice cream, you will like snow cones.', 'like')).toEqual(2);
	});

	test('The "Str.substrReplace" method replaces text within a portion of a string', () => {
		expect(Str.substrReplace('1300', ':', 2)).toEqual('13:');
		expect(Str.substrReplace('1300', ':', 2, 0)).toEqual('13:00');
	});

	test('The "Str.swap" method replaces multiple values in the given string', () => {
		expect(Str.swap({ 'Tacos': 'Burritos', 'great': 'fantastic' }, 'Tacos are great!')).toEqual('Burritos are fantastic!');
	});

	test('The "Str.title" method converts the given string to Title Case', () => {
		expect(Str.title('a nice title uses the correct case')).toEqual('A Nice Title Uses The Correct Case');
	});

	test('The "Str.toBase64" method converts the given string to Base64', () => {
		expect(Str.toBase64('Laravel')).toEqual('TGFyYXZlbA==');
	});

	test('The "Str.ucfirst" method returns the given string with the first character capitalized', () => {
		expect(Str.ucfirst('foo bar')).toEqual('Foo bar');
	});

	test('The "Str.ucsplit" method splits the given string into an array by uppercase characters', () => {
		expect(Str.ucsplit('FooBar')).toEqual(['Foo', 'Bar']);
	});

	test('The "Str.upper" method converts the given string to uppercase', () => {
		expect(Str.upper('laravel')).toEqual('LARAVEL');
	});

	test('The "Str.ulid" method generates a ULID, which is a compact, time-ordered unique identifier', () => {
		expect(Str.ulid()).toMatch(/[0-9A-Z]{26}/);
	});

	test('The "Str.unwrap" method removes the specified strings from the beginning and end of a given string', () => {
		expect(Str.unwrap('-Laravel-', '-')).toEqual('Laravel');
		expect(Str.unwrap('{framework: "Laravel"}', '{', '}')).toEqual('framework: "Laravel"');
	});

	test('The "Str.uuid" method generates a UUID (version 4)', () => {
		expect(Str.uuid()).toMatch(/[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}/);
	});

	test('The "Str.wordCount" method returns the number of words that a string contains', () => {
		expect(Str.wordCount('Hello, world!')).toEqual(2);
	});

	test('The "Str.wordWrap" method wraps a string to a given number of characters', () => {
		expect(Str.wordWrap('The quick brown fox jumped over the lazy dog.', 20, '<br />\n')).toEqual('The quick brown fox<br />\njumped over the lazy<br />\ndog.');
	});

	test('The "Str.words" method limits the number of words in a string', () => {
		expect(Str.words('Perfectly balanced, as all things should be.', 3, ' >>>')).toEqual('Perfectly balanced, as >>>');
	});

	test('The "Str.wrap" method wraps the given string with an additional string or a pair of strings', () => {
		expect(Str.wrap('Laravel', '"')).toEqual('"Laravel"');
		expect(Str.wrap('is', 'This ', ' Laravel!')).toEqual('This is Laravel!');
	});

	test('The "str" method returns instance of Stringable', () => {
		expect(str()).toBeInstanceOf(Stringable);
	});
});

describe('Fluent Strings', () => {
	test('The "after" method returns everything after the given value in a string', () => {
		expect(Str.of('This is my name').after('This is').toString()).toEqual(' my name');
	});

	test('The "afterLast" method returns everything after the last occurrence of the given value in a string', () => {
		expect(Str.of('App\\Http\\Controllers\\Controller').afterLast('\\').toString()).toEqual('Controller');
	});

	test('The "apa" method converts the given string to title case following the APA guidelines', () => {
		expect(Str.of('Creating A Project').apa().toString()).toEqual('Creating a Project');
	});

	test('The "append" method appends the given values to the string', () => {
		expect(Str.of('Taylor').append(' Otwell').toString()).toEqual('Taylor Otwell');
	});

	test('The "ascii" method will attempt to transliterate the string into an ASCII value', () => {
		expect(Str.of('û').ascii().toString()).toEqual('u');
	});

	test('The "basename" method returns the trailing name component of the given string', () => {
		expect(Str.of('/foo/bar/baz').basename().toString()).toEqual('baz');
	});

	test('The "basename" method removes the provided extension from the trailing component', () => {
		expect(Str.of('/foo/bar/baz.jpg').basename('.jpg').toString()).toEqual('baz');
	});

	test('The "before" method returns everything before the given value in a string', () => {
		expect(Str.of('This is my name').before('my name').toString()).toEqual('This is ');
	});

	test('The "beforeLast" method returns everything before the last occurrence of the given value in a string', () => {
		expect(Str.of('This is my name').beforeLast('is').toString()).toEqual('This ');
	});

	test('The "between" method returns the portion of a string between two values', () => {
		expect(Str.of('This is my name').between('This', 'name').toString()).toEqual(' is my ');
	});

	test('The "betweenFirst" method returns the smallest possible portion of a string between two values', () => {
		expect(Str.of('[a] bc [d]').betweenFirst('[', ']').toString()).toEqual('a');
	});

	test('The "camel" method converts the given string to camelCase', () => {
		expect(Str.of('foo_bar').camel().toString()).toEqual('fooBar');
	});

	test('The "charAt" method returns the character at the specified index', () => {
		expect(Str.of('This is my name.').charAt(6).toString()).toEqual('s');
	});

	test('The "classBasename" method returns the class name of the given class with the class\'s namespace removed', () => {
		expect(Str.of('Foo\\Bar\\Baz').classBasename().toString()).toEqual('Baz');
	});

	test('The "contains" method determines if the given string contains the given value', () => {
		expect(Str.of('This is my name').contains('my')).toBeTruthy();
	});

	test('The "containsAll" method determines if the given string contains all the values in a given array', () => {
		expect(Str.of('This is my name').containsAll(['my', 'name'])).toBeTruthy();
	});

	test('The "endsWith" method determines if the given string ends with the given value', () => {
		expect(Str.of('This is my name').endsWith('name')).toBeTruthy();
	});

	test('The "endsWith" method determines if the given string ends with any of the values in the array', () => {
		expect(Str.of('This is my name').endsWith(['name', 'foo'])).toBeTruthy();
		expect(Str.of('This is my name').endsWith(['this', 'foo'])).toEqual(false);
	});

	test('The "excerpt" method extracts an excerpt from a given string that matches the first instance of a phrase within that string', () => {
		expect(Str.of('This is my name').excerpt('my', { 'radius': 3 })?.toString()).toEqual('...is my na...');
	});

	test('The "excerpt" method allows customizing the omitted characters and radius', () => {
		expect(Str.of('This is my name').excerpt('name', { 'radius': 3, 'omission': '(...) ' })?.toString()).toEqual('(...) my name');
	});

	test('The "finish" method adds a single instance of the given value to a string if it does not already end with that', () => {
		expect(Str.of('this/string').finish('/').toString()).toEqual('this/string/');
		expect(Str.of('this/string/').finish('/').toString()).toEqual('this/string/');
	});

	test('The "fromBase64" method converts the given string from Base64', () => {
		expect(Str.of('TGFyYXZlbA==').fromBase64().toString()).toEqual('Laravel');
	});

	test('The "headline" method will convert strings delimited by casing, hyphens, or underscores into a space delimited', () => {
		expect(Str.of('steve_jobs').headline().toString()).toEqual('Steve Jobs');
		expect(Str.of('EmailNotificationSent').headline().toString()).toEqual('Email Notification Sent');
	});

	test('The "is" method determines if a given string matches a given pattern', () => {
		expect(Str.of('foobar').is('foo*')).toBeTruthy();
		expect(Str.of('foobar').is('baz*')).toBeFalsy();
	});

	test('The "isAscii" method determines if a given string is 7-bit ASCII', () => {
		expect(Str.of('Taylor').isAscii()).toBeTruthy();
		expect(Str.of('ü').isAscii()).toBeFalsy();
	});

	test('The "isEmpty" method determines if the given string is empty', () => {
		expect(Str.of('  ').trim().isEmpty()).toBeTruthy();
		expect(Str.of('Laravel').trim().isEmpty()).toBeFalsy();
	});

	test('The "isNotEmpty" method determines if the given string is not empty', () => {
		expect(Str.of('  ').trim().isNotEmpty()).toBeFalsy();
		expect(Str.of('Laravel').trim().isNotEmpty()).toBeTruthy();
	});

	test('The "isJson" method determines if the given string is valid JSON', () => {
		expect(Str.of('[1,2,3]').isJson()).toBeTruthy();
		expect(Str.of('{"first": "John", "last": "Doe"}').isJson()).toBeTruthy();
		expect(Str.of('{first: "John", last: "Doe"}').isJson()).toBeFalsy();
	});

	test('The "isUrl" method determines if the given string is a valid URL', () => {
		expect(Str.of('http://example.com').isUrl()).toBeTruthy();
		expect(Str.of('laravel').isUrl()).toBeFalsy();
	});

	test('The "isUlid" method determines if the given string is a valid ULID', () => {
		expect(Str.of('01gd6r360bp37zj17nxb55yv40').isUlid()).toBeTruthy();
		expect(Str.of('laravel').isUlid()).toBeFalsy();
	});

	test('The "isUuid" method determines if the given string is a valid UUID', () => {
		expect(Str.of('a0a2a2d2-0b87-4a18-83f2-2529882be2de').isUuid()).toBeTruthy();
		expect(Str.of('laravel').isUuid()).toBeFalsy();
	});

	test('The "kebab" method converts the given string to kebab-case', () => {
		expect(Str.of('fooBar').kebab().toString()).toEqual('foo-bar');
	});

	test('The "lcfirst" method returns the given string with the first character lowercased', () => {
		expect(Str.of('Foo Bar').lcfirst().toString()).toEqual('foo Bar');
	});

	test('The "length" method returns the length of the given string', () => {
		expect(Str.of('Laravel').length()).toEqual(7);
	});

	test('The "limit" method truncates the given string to the specified length', () => {
		expect(Str.of('The quick brown fox jumps over the lazy dog').limit(20).toString()).toEqual('The quick brown fox...');
		expect(Str.of('The quick brown fox jumps over the lazy dog').limit(20, ' (...)').toString()).toEqual('The quick brown fox (...)');
	});

	test('The "lower" method converts the given string to lowercase', () => {
		expect(Str.of('LARAVEL').lower().toString()).toEqual('laravel');
	});

	test('The "ltrim" method trims the left side of the string', () => {
		expect(Str.of('  Laravel  ').ltrim().toString()).toEqual('Laravel  ');
	});

	test('The "mask" method masks a portion of a string with a repeated character', () => {
		expect(Str.of('taylor@example.com').mask('*', 3).toString()).toEqual('tay***************');
		expect(Str.of('taylor@example.com').mask('*', -15, 3).toString()).toEqual('tay***@example.com');
	});

	test('The "match" method returns the portion of a string that matches a given regular expression pattern', () => {
		expect(Str.of('foo bar').match('/bar/').toString()).toEqual('bar');
		expect(Str.of('foo bar').match('/foo (.*)/').toString()).toEqual('bar');
	});

	test('The "matchAll" method returns an array containing the portions of a string that match a given regular expression pattern', () => {
		expect(Str.of('bar foo bar').matchAll('/bar/')).toEqual(['bar', 'bar']);
		expect(Str.of('bar fun bar fly').matchAll('/f(\\w*)/')).toEqual(['un', 'ly']);
	});

	test('The "isMatch" method returns true if the string matches a given regular expression', () => {
		expect(Str.of('foo bar').isMatch('/foo (.*)/')).toBeTruthy();
		expect(Str.of('laravel').isMatch('/foo (.*)/')).toBeFalsy();
	});

	test('The "newLine" method appends an "end of line" character to a string', () => {
		expect(Str.of('Laravel').newLine().append('Framework').toString()).toEqual('Laravel\nFramework');
	});

	test('The "padBoth" pads both sides of a string with another string until the final string reaches a desired length', () => {
		expect(Str.of('James').padBoth(10, '_').toString()).toEqual('__James___');
		expect(Str.of('James').padBoth(10).toString()).toEqual('  James   ');
	});

	test('The "padLeft" pads the left side of a string with another string until the final string reaches a desired length', () => {
		expect(Str.of('James').padLeft(10, '-=').toString()).toEqual('-=-=-James');
		expect(Str.of('James').padLeft(10).toString()).toEqual('     James');
	});

	test('The "padRight" pads the right side of a string with another string until the final string reaches a desired length', () => {
		expect(Str.of('James').padRight(10, '-').toString()).toEqual('James-----');
		expect(Str.of('James').padRight(10).toString()).toEqual('James     ');
	});

	test('The "plural" method converts a singular word string to its plural form', () => {
		expect(Str.of('car').plural().toString()).toEqual('cars');
		expect(Str.of('child').plural().toString()).toEqual('children');
		expect(Str.of('child').plural(2).toString()).toEqual('children');
		expect(Str.of('child').plural(1).toString()).toEqual('child');
	});

	test('The "position" method returns the position of the first occurrence of a substring in a string', () => {
		expect(Str.of('Hello, World!').position('Hello')).toEqual(0);
		expect(Str.of('Hello, World!').position('W')).toEqual(7);
	});

	test('The "position" method returns false if the substring does not exist within the string', () => {
		expect(Str.of('Hello, World!').position('Foo')).toBeFalsy();
	});

	test('The "pluralStudly" method converts a singular word string formatted in studly caps case to its plural form', () => {
		expect(Str.of('VerifiedHuman').pluralStudly().toString()).toEqual('VerifiedHumans');
		expect(Str.of('UserFeedback').pluralStudly().toString()).toEqual('UserFeedback');
		expect(Str.of('VerifiedHuman').pluralStudly(2).toString()).toEqual('VerifiedHumans');
		expect(Str.of('VerifiedHuman').pluralStudly(1).toString()).toEqual('VerifiedHuman');
	});

	test('The "remove" method removes the given value or array of values from the string', () => {
		expect(Str.of('Peter Piper picked a peck of pickled peppers.').remove('e').toString()).toEqual('Ptr Pipr pickd a pck of pickld ppprs.');
		expect(Str.of('Peter Piper picked a peck of pickled peppers.').remove('E', false).toString()).toEqual('Ptr Pipr pickd a pck of pickld ppprs.');
	});

	test('The "repeat"  method repeats the given string', () => {
		expect(Str.of('a').repeat(5).toString()).toEqual('aaaaa');
	});

	test('The "replace" method replaces a given string within the string', () => {
		expect(Str.of('Laravel 8.x').replace('8.x', '9.x').toString()).toEqual('Laravel 9.x');
		expect(Str.of('Framework 10.x').replace('framework', 'Laravel', false).toString()).toEqual('Laravel 10.x');
	});

	test('The "replaceArray" method replaces a given value in the string sequentially using an array', () => {
		expect(Str.of('The event will take place between ? and ?').replaceArray('?', ['8:30', '9:00']).toString()).toEqual('The event will take place between 8:30 and 9:00');
	});

	test('The "replaceFirst" method replaces the first occurrence of a given value in a string', () => {
		expect(Str.of('the quick brown fox jumps over the lazy dog').replaceFirst('the', 'a').toString()).toEqual('a quick brown fox jumps over the lazy dog');
	});

	test('The "replaceLast" method replaces the last occurrence of a given value in a string', () => {
		expect(Str.of('the quick brown fox jumps over the lazy dog').replaceLast('the', 'a').toString()).toEqual('the quick brown fox jumps over a lazy dog');
	});

	test('The "replaceMatches" method replaces all portions of a string matching a pattern with the given replacement string', () => {
		expect(Str.of('(+1) 501-555-1000').replaceMatches('/[^A-Za-z0-9]+/', '').toString()).toEqual('15015551000');
	});

	test('The "replaceMatches" method accepts a closure to perform custom replacement logic', () => {
		expect(Str.of('123').replaceMatches('/\\d/', (matches: string) => '[' + matches[0] + ']').toString()).toEqual('[1][2][3]');
	});

	test('The "replaceStart" method replaces the first occurrence of the given value only if it appears at the start of the string', () => {
		expect(Str.of('Hello World').replaceStart('Hello', 'Laravel').toString()).toEqual('Laravel World');
		expect(Str.of('Hello World').replaceStart('World', 'Laravel').toString()).toEqual('Hello World');
	});

	test('The "replaceEnd" method replaces the last occurrence of the given value only if it appears at the end of the string', () => {
		expect(Str.of('Hello World').replaceEnd('World', 'Laravel').toString()).toEqual('Hello Laravel');
		expect(Str.of('Hello World').replaceEnd('Hello', 'Laravel').toString()).toEqual('Hello World');
	});

	test('The "rtrim" method trims the right side of the given string', () => {
		expect(Str.of('  Laravel  ').rtrim().toString()).toEqual('  Laravel');
		expect(Str.of('/Laravel/').rtrim('/').toString()).toEqual('/Laravel');
	});

	test('The "reverse" method reverses the given string', () => {
		expect(Str.of('Hello World').reverse().toString()).toEqual('dlroW olleH');
	});

	test('The "singular" method converts a string to its singular form', () => {
		expect(Str.of('cars').singular().toString()).toEqual('car');
		expect(Str.of('children').singular().toString()).toEqual('child');
	});

	test('The "slug" method generates a URL friendly "slug" from the given string', () => {
		expect(Str.of('Laravel 5 Framework').slug('-').toString()).toEqual('laravel-5-framework');
	});

	test('The "snake" method converts the given string to snake_case', () => {
		expect(Str.of('fooBar').snake().toString()).toEqual('foo_bar');
		expect(Str.of('fooBar').snake('-').toString()).toEqual('foo-bar');
	});

	test('The "split" method splits a string into an array using a regular expression', () => {
		expect(Str.of('one, two, three').split('/[\s,]+/')).toEqual(['one', 'two', 'three']);
	});

	test('The "squish" method removes all extraneous white space from a string', () => {
		expect(Str.of('    laravel    framework    ').squish().toString()).toEqual('laravel framework');
	});

	test('The "start" method adds a single instance of the given value to a string if it does not already start with that value', () => {
		expect(Str.of('this/string').start('/').toString()).toEqual('/this/string');
		expect(Str.of('/this/string').start('/').toString()).toEqual('/this/string');
	});

	test('The "startsWith" method determines if the given string begins with the given value', () => {
		expect(Str.of('This is my name').startsWith('This')).toBeTruthy();
		expect(Str.of('This is my name').startsWith(['This', 'That', 'There'])).toBeTruthy();
	});

	test('The "studly" method converts the given string to StudlyCase', () => {
		expect(Str.of('foo_bar').studly().toString()).toEqual('FooBar');
	});

	test('The "substr" method returns the portion of string specified by the start and length parameters', () => {
		expect(Str.of('The Laravel Framework').substr(4, 7).toString()).toEqual('Laravel');
	});

	test('The "substrCount" method returns the number of occurrences of a given value in the given string', () => {
		expect(Str.of('If you like ice cream, you will like snow cones.').substrCount('like')).toEqual(2);
	});

	test('The "substrReplace" method replaces text within a portion of a string', () => {
		expect(Str.of('1300').substrReplace(':', 2).toString()).toEqual('13:');
		expect(Str.of('1300').substrReplace(':', 2, 0).toString()).toEqual('13:00');
	});

	test('The "swap" method replaces multiple values in the given string', () => {
		expect(Str.of('Tacos are great!').swap({ 'Tacos': 'Burritos', 'great': 'fantastic' }).toString()).toEqual('Burritos are fantastic!');
	});

	test('The "take" method returns a specified number of characters from the beginning of the string', () => {
		expect(Str.of('Build something amazing!').take(5).toString()).toEqual('Build');
	});

	test('The "tap" method passes the string to the given closure and returns the original string', () => {
		const result = Str.of('Laravel')
			.append(' Framework')
			.tap((string: Stringable) => string.dump())
			.upper()
			.toString();

		expect(result).toEqual('LARAVEL FRAMEWORK');
	});

	test('The "test" method determines if a string matches the given regular expression pattern', () => {
		expect(Str.of('Laravel Framework').test('/Laravel/')).toBeTruthy();
	});

	test('The "title" method converts the given string to Title Case', () => {
		expect(Str.of('a nice title uses the correct case').title().toString()).toEqual('A Nice Title Uses The Correct Case');
	});

	test('The "toBase64" method converts the given string to Base64', () => {
		expect(Str.of('Laravel').toBase64().toString()).toEqual('TGFyYXZlbA==');
	});

	test('The "trim" method trims the given string', () => {
		expect(Str.of('  Laravel  ').trim().toString()).toEqual('Laravel');
		expect(Str.of('/Laravel/').trim('/').toString()).toEqual('Laravel');
	});

	test('The "ucfirst" method returns the given string with the first character capitalized', () => {
		expect(Str.of('foo bar').ucfirst().toString()).toEqual('Foo bar');
	});

	test('The "ucsplit" method splits the given string into an array by uppercase characters', () => {
		expect(Str.of('FooBar').ucsplit()).toEqual(['Foo', 'Bar']);
	});

	test('The "unwrap" method removes the specified strings from the beginning and end of a given string', () => {
		expect(Str.of('-Laravel-').unwrap('-').toString()).toEqual('Laravel');
		expect(Str.of('{framework: "Laravel"}').unwrap('{', '}').toString()).toEqual('framework: "Laravel"');
	});

	test('The "upper" method converts the given string to uppercase', () => {
		expect(Str.of('laravel').upper().toString()).toEqual('LARAVEL');
	});

	test('The "when" method invokes the given closure if a given condition is true', () => {
		expect(Str.of('Taylor').when(true, (string: Stringable) => string.append(' Otwell')).toString()).toEqual('Taylor Otwell');
	});

	test('The "whenContains" method invokes the given closure if the string contains the given value', () => {
		expect(Str.of('tony stark').whenContains('tony', (string: Stringable) => string.title()).toString()).toEqual('Tony Stark');
		expect(Str.of('tony stark').whenContains(['tony', 'hulk'], (string: Stringable) => string.title()).toString()).toEqual('Tony Stark');
	});

	test('The "whenContainsAll" method invokes the given closure if the string contains all the given sub-strings', () => {
		expect(Str.of('tony stark').whenContainsAll(['tony', 'stark'], (string: Stringable) => string.title()).toString()).toEqual('Tony Stark');
	});

	test('The "whenEmpty" method invokes the given closure if the string is empty', () => {
		expect(Str.of('  ').whenEmpty((string: Stringable) => string.trim().prepend('Laravel')).toString()).toEqual('Laravel');
	});

	test('The "whenNotEmpty" method invokes the given closure if the string is not empty', () => {
		expect(Str.of('Framework').whenNotEmpty((string: Stringable) => string.prepend('Laravel ')).toString()).toEqual('Laravel Framework');
	});

	test('The "whenStartsWith" method invokes the given closure if the string starts with the given sub-string', () => {
		expect(Str.of('disney world').whenStartsWith('disney', (string: Stringable) => string.title()).toString()).toEqual('Disney World');
	});

	test('The "whenEndsWith" method invokes the given closure if the string ends with the given sub-string', () => {
		expect(Str.of('disney world').whenEndsWith('world', (string: Stringable) => string.title()).toString()).toEqual('Disney World');
	});

	test('The "whenExactly" method invokes the given closure if the string exactly matches the given string', () => {
		expect(Str.of('laravel').whenExactly('laravel', (string: Stringable) => string.title()).toString()).toEqual('Laravel');
	});

	test('The "whenNotExactly" method invokes the given closure if the string does not exactly match the given string', () => {
		expect(Str.of('framework').whenNotExactly('laravel', (string: Stringable) => string.title()).toString()).toEqual('Framework');
	});

	test('The "whenIs" method invokes the given closure if the string matches a given pattern', () => {
		expect(Str.of('foo/bar').whenIs('foo/*', (string: Stringable) => string.append('/baz')).toString()).toEqual('foo/bar/baz');
	});

	test('The "whenIsAscii" method invokes the given closure if the string is 7-bit ASCII', () => {
		expect(Str.of('laravel').whenIsAscii((string: Stringable) => string.title()).toString()).toEqual('Laravel');
	});

	test('The "whenIsUlid" method invokes the given closure if the string is a valid ULID', () => {
		expect(Str.of('01gd6r360bp37zj17nxb55yv40').whenIsUlid((string: Stringable) => string.substr(0, 8)).toString()).toEqual('01gd6r36');
	});

	test('The "whenIsUuid" method invokes the given closure if the string is a valid UUID', () => {
		expect(Str.of('a0a2a2d2-0b87-4a18-83f2-2529882be2de').whenIsUuid((string: Stringable) => string.substr(0, 8)).toString()).toEqual('a0a2a2d2');
	});

	test('The "whenTest" method invokes the given closure if the string matches the given regular expression', () => {
		expect(Str.of('laravel framework').whenTest('/laravel/', (string: Stringable) => string.title()).toString()).toEqual('Laravel Framework');
	});

	test('The "unwrap" method removes the specified strings from the beginning and end of a given string', () => {
		expect(Str.of('-Laravel-').unwrap('-').toString()).toEqual('Laravel');
		expect(Str.of('{framework: "Laravel"}').unwrap('{', '}').toString()).toEqual('framework: "Laravel"');
	});

	test('The "wordCount" method returns the number of words that a string contains', () => {
		expect(Str.of('Hello, world!').wordCount()).toEqual(2);
	});

	test('The "wordWrap" method wraps a string to a given number of characters', () => {
		expect(Str.of('The quick brown fox jumped over the lazy dog.').wordWrap(20, '<br />\n').toString()).toEqual('The quick brown fox<br />\njumped over the lazy<br />\ndog.');
	});

	test('The "words" method limits the number of words in a string', () => {
		expect(Str.of('Perfectly balanced, as all things should be.').words(3, ' >>>').toString()).toEqual('Perfectly balanced, as >>>');
	});

	test('The "value" method gets the underlying string value', () => {
		expect(Str.of('Hello World').value()).toEqual('Hello World');
	});

	test('The "toString" method returns the raw string value', () => {
		expect(Str.of('Laravel').toString()).toEqual('Laravel');
	});

	test('The "toString" method returns the raw string value', () => {
		expect(Str.of('Laravel').toString()).toEqual('Laravel');
	});

	test('The "toInteger" method returns the underlying string value as an integer', () => {
		expect(Str.of('1').toInteger()).toEqual(1);
		expect(Str.of('Laravel').toInteger()).toEqual(0); // Since 'Laravel' is not a number, it returns 0
	});

	test('The "toFloat" method returns the underlying string value as a float', () => {
		expect(Str.of('1.5').toFloat()).toEqual(1.5);
		expect(Str.of('Laravel').toFloat()).toEqual(0); // Since 'Laravel' is not a number, it returns 0
	});

	test('The "toBoolean" method returns the underlying string value as a boolean', () => {
		expect(Str.of('true').toBoolean()).toBeTruthy();
		expect(Str.of('1').toBoolean()).toBeTruthy();
		expect(Str.of('on').toBoolean()).toBeTruthy();
		expect(Str.of('yes').toBoolean()).toBeTruthy();
		expect(Str.of('Laravel').toBoolean()).toBeFalsy();
	});

	test('The "toDate" method returns the underlying string value as a formatted Date string', () => {
		expect(Str.of('13 September 2023, 12:00 PM').toDate()).toMatch(/\d{1,2}\/\d{1,2}\/\d{4}, \d{1,2}:\d{2}:\d{2}/);
		expect(Str.of('13 September 2023, 12:00 PM').toDate('Y-m-d H:i:s', 'Europe/London')).toEqual('2023-09-13 11:00:00');
		expect(Str.of('13 September 2023, 12:00 PM').toDate('Y-m-d H:i:s', 'America/Toronto')).toEqual('2023-09-13 06:00:00');
		expect(Str.of('2024-02-29').toDate('d')).toEqual('29');
		expect(Str.of('2024-02-29').toDate('D')).toEqual('Thr');
		expect(Str.of('2024-02-29').toDate('j')).toEqual('29');
		expect(Str.of('2024-02-29').toDate('l')).toEqual('Thursday');
		expect(Str.of('2024-02-29').toDate('N')).toEqual('4');
		expect(Str.of('2024-02-29').toDate('S')).toEqual('th');
		expect(Str.of('2024-02-29').toDate('w')).toEqual('4');
		expect(Str.of('2024-02-29').toDate('z')).toEqual('59');
		expect(Str.of('2024-02-29').toDate('W')).toEqual('09');
		expect(Str.of('2024-02-29').toDate('F')).toEqual('February');
		expect(Str.of('2024-02-29').toDate('m')).toEqual('02');
		expect(Str.of('2024-02-29').toDate('M')).toEqual('Feb');
		expect(Str.of('2024-02-29').toDate('n')).toEqual('2');
		expect(Str.of('2024-02-29').toDate('t')).toEqual('29');
		expect(Str.of('2024-02-29').toDate('L')).toEqual('1');
		expect(Str.of('2024-02-29').toDate('o')).toEqual('2024');
		expect(Str.of('2024-02-29').toDate('X')).toEqual('+2024');
		expect(Str.of('2024-02-29').toDate('x')).toEqual('2024');
		expect(Str.of('2024-02-29').toDate('Y')).toEqual('2024');
		expect(Str.of('2024-02-29').toDate('y')).toEqual('24');
		expect(Str.of('2024-02-29 08:00:00').toDate('a')).toEqual('am');
		expect(Str.of('2024-02-29 20:00:00').toDate('A')).toEqual('PM');
		expect(Str.of('2024-02-29 12:00:00').toDate('B')).toEqual('500');
		expect(Str.of('2024-02-29 08:00:00').toDate('g')).toEqual('8');
		expect(Str.of('2024-02-29 20:00:00').toDate('G')).toEqual('20');
		expect(Str.of('2024-02-29 08:00:00').toDate('h')).toEqual('08');
		expect(Str.of('2024-02-29 20:00:00').toDate('H')).toEqual('20');
		expect(Str.of('2024-02-29 08:09:00').toDate('i')).toEqual('09');
		expect(Str.of('2024-02-29 08:09:07').toDate('s')).toEqual('07');
		expect(() => Str.of('2024-02-29 08:09:07.654321').toDate('u')).toThrow('Microseconds are not supported at the moment.'); // Disabled temporarily
		expect(() => Str.of('2024-02-29 08:09:07.654').toDate('v')).toThrow('Milliseconds are not supported at the moment.'); // Disabled temporarily
		expect(Str.of('2024-02-29 08:09:07').toDate('e')).toMatch(/^(?:GMT|UTC|[A-Za-z\/_]+(?:[+\-][0-9]+)?)$/);
		expect(Str.of('2024-02-29').toDate('I')).toMatch(/^[01]$/);
		expect(Str.of('2024-02-29').toDate('O')).toMatch(/^[+\-]\d{4}$/);
		expect(Str.of('2024-02-29').toDate('P')).toMatch(/^[+\-]\d{2}:\d{2}$/);
		expect(Str.of('2024-02-29').toDate('p')).toMatch(/^[+\-]\d{2}:\d{2}$/);
		expect(Str.of('2024-02-29').toDate('T')).toMatch(/^[A-Za-z]+|[+\-]\d{2}:\d{2}$/);
		expect(Str.of('2024-02-29').toDate('Z')).toMatch(/([+\-]?\d+)/);
		expect(() => Str.of('2024-02-29 08:09:07').toDate('c')).toThrow('ISO 8601 date is not supported at the moment.'); // Disabled temporarily
		expect(Str.of('2024-02-29').toDate('r')).toEqual('Thr, 29 Feb 2024 01:00:00 +0100');
		expect(Str.of('2024-02-29').toDate('U')).toMatch(/^-?\d+$/);
	});
});