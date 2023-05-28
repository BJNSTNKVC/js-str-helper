# Str

JavaScript equivalent of [Laravel Str](https://laravel.com/docs/10.x/helpers#strings) helper.

## Installation & setup

You can install the package via npm:

    npm install @bjnstnkvc/str

## Usage

Once the package has been installed, you can import it
using [import](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/import) declaration:

```js
import Str from '@bjnstnkvc/str'
```

## Usage

Once imported, you can use these functions which provide a fluent interface to interact with Strings.

### Strings

#### Str.afterLast()

The Str.afterLast method returns everything after the last occurrence of the given value in a string. The entire string
will be returned if the value does not exist within the string:

```js
Str.afterLast('App\\Http\\Controllers\\Controller', '\\');

// 'Controller'
```

#### Str.ascii()

The Str.ascii method will attempt to transliterate the string into an ASCII value:

```js
Str.ascii('û');

// 'u'
```

#### Str.before()

The Str.before method returns everything before the given value in a string:

```js
Str.before('This is my name', 'my name');

// 'This is '
```

#### Str.beforeLast()

The Str.beforeLast method returns everything before the last occurrence of the given value in a string:

```js
Str.beforeLast('This is my name', 'is');

// 'This '
```

#### Str.between()

The Str.between method returns the portion of a string between two values:

```js
Str.between('This is my name', 'This', 'name');

// ' is my '
```

#### Str.betweenFirst()

The Str.betweenFirst method returns the smallest possible portion of a string between two values:

```js
Str.betweenFirst('[a] bc [d]', '[', ']');

// 'a'
```

#### Str.camel()

The Str.camel method converts the given string to camelCase:

```js
Str.camel('foo_bar');

// fooBar
```

#### Str.contains()

The Str.contains method determines if the given string contains the given value. This method is case sensitive:

```js
Str.contains('This is my name', 'my');

// true
```

You may also pass an array of values to determine if the given string contains any of the values in the array:

```js
Str.contains('This is my name', ['my', 'foo']);

// true
```

#### Str.containsAll()

The Str.containsAll method determines if the given string contains all of the values in a given array:

```js
Str.containsAll('This is my name', ['my', 'name']);

// true
```

#### Str.endsWith()

The Str.endsWith method determines if the given string ends with the given value:

```js
Str.endsWith('This is my name', 'name');

// true
```

You may also pass an array of values to determine if the given string ends with any of the values in the array:

```js
Str.endsWith('This is my name', ['name', 'foo']);

// true
```

```js
Str.endsWith('This is my name', ['this', 'foo']);

// false
```

#### Str.excerpt()

The Str.excerpt method extracts an excerpt from a given string that matches the first instance of a phrase within that
string:

```js
Str.excerpt('This is my name', 'my', { 'radius': 3 });

// '...is my na...'
```

The radius option, which defaults to 100, allows you to define the number of characters that should appear on each side
of the truncated string.

In addition, you may use the omission option to define the string that will be prepended and appended to the truncated
string:

```js
Str.excerpt('This is my name', 'name', { 'radius': 3, 'omission': '(...) ' });

// '(...) my name'
```

#### Str.finish()

The Str.finish method adds a single instance of the given value to a string if it does not already end with that value:

```js
Str.finish('this/string', '/');

// this/string/
```

```js
Str.finish('this/string/', '/');

// this/string/
```

#### Str.headline()

The Str.headline method will convert strings delimited by casing, hyphens, or underscores into a space delimited string
with each word's first letter capitalized:

```js
Str.headline('steve_jobs');

// Steve Jobs
```

```js
Str.headline('EmailNotificationSent');

// Email Notification Sent
```

#### Str.is()

The Str.is method determines if a given string matches a given pattern. Asterisks may be used as wildcard values:

```js
Str.is('foo*', 'foobar');

// true
```

```js
Str.is('baz*', 'foobar');

// false
```

#### Str.isAscii()

The Str.isAscii method determines if a given string is 7 bit ASCII:

```js
Str.isAscii('Taylor');

// true
```

```js
Str.isAscii('ü');

// false
```

#### Str.isJson()

The Str.isJson method determines if the given string is valid JSON:

```js
Str.isJson('[1,2,3]');

// true
```

```js
Str.isJson('{"first": "John", "last": "Doe"}');

// true
```

```js
Str.isJson('{first: "John", last: "Doe"}');

// false
```

#### Str.isUlid()

The Str.isUlid method determines if the given string is a valid ULID:

```js
Str.isUlid('01gd6r360bp37zj17nxb55yv40');

// true
```

```js
Str.isUlid('laravel');

// false
```

#### Str.isUuid()

The Str.isUuid method determines if the given string is a valid UUID:

```js
Str.isUuid('a0a2a2d2-0b87-4a18-83f2-2529882be2de');

// true
```

```js
Str.isUuid('laravel');

// false
```

#### Str.kebab()

The Str.kebab method converts the given string to kebab-case:

```js
Str.kebab('fooBar');

// foo-bar
```

#### Str.lcfirst()

The Str.lcfirst method returns the given string with the first character lowercased:

```js
Str.lcfirst('Foo Bar');

// foo Bar
```

#### Str.length()

The Str.length method returns the length of the given string:

```js
Str.length('Laravel');

// 7
```

#### Str.limit()

The Str.limit method truncates the given string to the specified length:

```js
Str.limit('The quick brown fox jumps over the lazy dog', 20);

// The quick brown fox...
```

You may pass a third argument to the method to change the string that will be appended to the end of the truncated
string:

```js
Str.limit('The quick brown fox jumps over the lazy dog', 20, ' (...)');

// The quick brown fox (...)
```

#### Str.lower()

The Str.lower method converts the given string to lowercase:

```js
Str.lower('LARAVEL');

// laravel
```

#### Str.mask()

The Str.mask method masks a portion of a string with a repeated character, and may be used to obfuscate segments of
strings such as email addresses and phone numbers:

```js
Str.mask('taylor@example.com', '*', 3);

// tay***************
```

If needed, you provide a negative number as the third argument to the mask method, which will instruct the method to
begin masking at the given distance from the end of the string:

```js
Str.mask('taylor@example.com', '*', -15, 3);

// tay***@example.com
```

#### Str.orderedUuid()

The Str.orderedUuid method generates a "timestamp first" UUID that may be efficiently stored in an indexed database
column. Each UUID that is generated using this method will be sorted after UUIDs previously generated using the method:

```js
Str.orderedUuid();

// 04fe4df5-7bae-45f4-8040-d0e4568f4054
```

#### Str.padBoth()

The Str.padBoth pads both sides of a string with another string until the final string reaches a desired length:

```js
Str.padBoth('James', 10, '_');

// '__James___'
```

```js
Str.padBoth('James', 10);

// '  James   '
```

#### Str.padLeft()

The Str.padLeft pads the left side of a string with another string until the final string reaches a desired length:

```js
Str.padLeft('James', 10, '-=');

// '-=-=-James'
```

```js
Str.padLeft('James', 10);

// '     James'
```

#### Str.padRight()

The Str.padRight pads the right side of a string with another string until the final string reaches a desired length:

```js
Str.padRight('James', 10, '-');

// 'James-----'
```

```js
Str.padRight('James', 10);

// 'James     '
```

#### Str.password()

The Str.password method may be used to generate a secure, random password of a given length. The password will consist
of a combination of letters, numbers, symbols, and spaces. By default, passwords are 32 characters long:

```js
Str.password();

// 'EbJo2vE-AS:U,$%_gkrV4n,q~1xy/-_4'
```

```js
Str.password(12);

// 'qwuar>#V|i]N'
```

#### Str.plural()

The Str.plural method converts a singular word string to its plural form. This function supports any of the languages
support by Laravel's pluralizer:

```js
Str.plural('car');

// cars
```

```js
Str.plural('child');

// children
```

You may provide an integer as a second argument to the function to retrieve the singular or plural form of the string:

```js
Str.plural('child', 2);

// children
```

```js
Str.plural('child', 1);

// child
```

#### Str.pluralStudly()

The Str.pluralStudly method converts a singular word string formatted in studly caps case to its plural form. This
function supports any of the languages support by Laravel's pluralizer:

```js
Str.pluralStudly('VerifiedHuman');

// VerifiedHumans
```

```js
Str.pluralStudly('UserFeedback');

// UserFeedback
```

You may provide an integer as a second argument to the function to retrieve the singular or plural form of the string:

```js
Str.pluralStudly('VerifiedHuman', 2);

// VerifiedHumans
```

```js
Str.pluralStudly('VerifiedHuman', 1);

// VerifiedHuman
```

#### Str.random()

The Str.random method generates a random string of the specified length. This function uses PHP's random_bytes function:

```js
Str.random(40);
```

#### Str.remove()

The Str.remove method removes the given value or array of values from the string:

```js
Str.remove('e', 'Peter Piper picked a peck of pickled peppers.');
```

// Ptr Pipr pickd a pck of pickld ppprs.

You may also pass false as a third argument to the remove method to ignore case when removing strings.

#### Str.replace()

The Str.replace method replaces a given string within the string:

```js
Str.replace('9.x', '10.x', 'Laravel 10.x');
```

// Laravel 9.x

The replace method also accepts a caseSensitive argument. By default, the replace method is case sensitive:

```js
Str.replace('framework', 'Laravel', 'Framework 10.x', false);

// Framework 10.x
```

#### Str.replaceArray()

The Str.replaceArray method replaces a given value in the string sequentially using an array:

```js
Str.replaceArray('?', ['8:30', '9:00'], 'The event will take place between ? and ?');
```

// The event will take place between 8:30 and 9:00

#### Str.replaceFirst()

The Str.replaceFirst method replaces the first occurrence of a given value in a string:

```js
Str.replaceFirst('the', 'a', 'the quick brown fox jumps over the lazy dog');

// a quick brown fox jumps over the lazy dog
```

#### Str.replaceLast()

The Str.replaceLast method replaces the last occurrence of a given value in a string:

```js
Str.replaceLast('the', 'a', 'the quick brown fox jumps over the lazy dog');

// the quick brown fox jumps over a lazy dog
```

#### Str.reverse()

The Str.reverse method reverses the given string:

```js
Str.reverse('Hello World');

// dlroW olleH
```

#### Str.singular()

The Str.singular method converts a string to its singular form. This function supports any of the languages support by
Laravel's pluralizer:

```js
Str.singular('cars');

// car
```

```js
Str.singular('children');

// child
```

#### Str.slug()

The Str.slug method generates a URL friendly "slug" from the given string:

```js
Str.slug('Laravel 5 Framework', '-');

// laravel-5-framework
```

#### Str.snake()

The Str.snake method converts the given string to snake_case:

```js
Str.snake('fooBar');

// foo_bar
```

```js
Str.snake('fooBar', '-');

// foo-bar
```

#### Str.squish()

The Str.squish method removes all extraneous white space from a string, including extraneous white space between words:

```js
Str.squish('    laravel    framework    ');

// laravel framework
```

#### Str.start()

The Str.start method adds a single instance of the given value to a string if it does not already start with that value:

```js
Str.start('this/string', '/');

// /this/string
```

```js
Str.start('/this/string', '/');

// /this/string
```

#### Str.startsWith()

The Str.startsWith method determines if the given string begins with the given value:

```js
Str.startsWith('This is my name', 'This');

// true
```

If an array of possible values is passed, the startsWith method will return true if the string begins with any of the
given values:

```js
Str.startsWith('This is my name', ['This', 'That', 'There']);

// true
```

#### Str.studly()

The Str.studly method converts the given string to StudlyCase:

```js
Str.studly('foo_bar');

// FooBar
```

#### Str.substr()

The Str.substr method returns the portion of string specified by the start and length parameters:

```js
Str.substr('The Laravel Framework', 4, 7);

// Laravel
```

#### Str.substrCount()

The Str.substrCount method returns the number of occurrences of a given value in the given string:

```js
Str.substrCount('If you like ice cream, you will like snow cones.', 'like');

// 2
```

#### Str.substrReplace()

The Str.substrReplace method replaces text within a portion of a string, starting at the position specified by the third
argument and replacing the number of characters specified by the fourth argument. Passing 0 to the method's fourth
argument will insert the string at the specified position without replacing any of the existing characters in the
string:

```js
Str.substrReplace('1300', ':', 2);

// 13:
```

```js
Str.substrReplace('1300', ':', 2, 0);
// 13:00
```

#### Str.swap()

The Str.swap method replaces multiple values in the given string using PHP's strtr function:

```js
Str.swap({ 'Tacos': 'Burritos', 'great': 'fantastic' }, 'Tacos are great!');

// Burritos are fantastic!
```

#### Str.title()

The Str.title method converts the given string to Title Case:

```js
Str.title('a nice title uses the correct case');

// A Nice Title Uses The Correct Case
```

#### Str.ucfirst()

The Str.ucfirst method returns the given string with the first character capitalized:

```js
Str.ucfirst('foo bar');

// Foo bar
```

#### Str.ucsplit()

The Str.ucsplit method splits the given string into an array by uppercase characters:

```js
Str.ucsplit('FooBar');

// [0 => 'Foo', 1 => 'Bar']
```

#### Str.upper()

The Str.upper method converts the given string to uppercase:

```js
Str.upper('laravel');

// LARAVEL
```

#### Str.ulid()

The Str.ulid method generates a ULID, which is a compact, time-ordered unique identifier:

```js
Str.ulid();

// 01gd6r360bp37zj17nxb55yv40
```

#### Str.uuid()

The Str.uuid method generates a UUID (version 4):

```js
Str.uuid();

// 39923a8e-d504-42b5-894f-55e79e6632dd 
```

#### Str.wordCount()

The Str.wordCount method returns the number of words that a string contains:

```js
Str.wordCount('Hello, world!');

// 2
```

#### Str.words()

The Str.words method limits the number of words in a string. An additional string may be passed to this method via its
third argument to specify which string should be appended to the end of the truncated string:

```js
Str.words('Perfectly balanced, as all things should be.', 3, ' >>>');

// Perfectly balanced, as >>>
```

#### str()

The str function returns a Stringable instance of the given string. This function is equivalent to the `Str.of` method:

```js
str('Taylor').append(' Otwell');

// 'Taylor Otwell'
```

If no argument is provided to the `str` function, the function returns an instance of `Str`:

```js
str().snake('FooBar');

// 'foo_bar'
```

### Fluent Strings

Fluent strings provide a more fluent, object-oriented interface for working with string values, allowing you to chain
multiple string operations together using a more readable syntax compared to traditional string operations.

#### after

The after method returns everything after the given value in a string. The entire string will be returned if the value
does not exist within the string:

```js
Str.of('This is my name').after('This is');

// ' my name'
```

afterLast
The afterLast method returns everything after the last occurrence of the given value in a string. The entire string will
be returned if the value does not exist within the string:

```js
Str.of('App\\Http\\Controllers\\Controller').afterLast('\\');

// 'Controller'
```

#### append

The append method appends the given values to the string:

```js
Str.of('Taylor').append(' Otwell');

// 'Taylor Otwell'
```

#### ascii

The ascii method will attempt to transliterate the string into an ASCII value:

```js
Str.of('ü').ascii();

// 'u'
```

#### basename

The basename method will return the trailing name component of the given string:

```js
Str.of('/foo/bar/baz').basename();

// 'baz'
```

If needed, you may provide an "extension" that will be removed from the trailing component:

```js
Str.of('/foo/bar/baz.jpg').basename('.jpg');

// 'baz'
```

#### before

The before method returns everything before the given value in a string:

```js
Str.of('This is my name').before('my name');

// 'This is '
```

#### beforeLast

The beforeLast method returns everything before the last occurrence of the given value in a string:

```js
Str.of('This is my name').beforeLast('is');

// 'This '
```

#### between

The between method returns the portion of a string between two values:

```js
Str.of('This is my name').between('This', 'name');

// ' is my '
```

#### betweenFirst

The betweenFirst method returns the smallest possible portion of a string between two values:

```js
Str.of('[a] bc [d]').betweenFirst('[', ']');

// 'a'
```

#### camel

The camel method converts the given string to camelCase:

```js
Str.of('foo_bar').camel();

// fooBar
```

#### classBasename

The classBasename method returns the class name of the given class with the class's namespace removed:

```js
Str.of('Foo\\Bar\\Baz').classBasename();

// Baz
```

#### contains

The contains method determines if the given string contains the given value. This method is case sensitive:

```js
Str.of('This is my name').contains('my');

// true
```

You may also pass an array of values to determine if the given string contains any of the values in the array:

```js
Str.of('This is my name').contains(['my', 'foo']);

// true
```

#### containsAll

The containsAll method determines if the given string contains all of the values in the given array:

```js
Str.of('This is my name').containsAll(['my', 'name']);

// true
```

#### dirname

The dirname method returns the parent directory portion of the given string:

```js
Str.of('/foo/bar/baz').dirname();

// '/foo/bar'
```

If necessary, you may specify how many directory levels you wish to trim from the string:

```js
Str.of('/foo/bar/baz').dirname(2);

// '/foo'
```

#### excerpt

The excerpt method extracts an excerpt from the string that matches the first instance of a phrase within that string:

```js
Str.of('This is my name').excerpt('my', { 'radius': 3 });

// '...is my na...'
```

The radius option, which defaults to 100, allows you to define the number of characters that should appear on each side
of the truncated string.

In addition, you may use the omission option to change the string that will be prepended and appended to the truncated
string:

```js
Str.of('This is my name').excerpt('name', { 'radius': 3, 'omission': '(...) ' });

// '(...) my name'
```

#### endsWith

The endsWith method determines if the given string ends with the given value:

```js
Str.of('This is my name').endsWith('name');

// true
```

You may also pass an array of values to determine if the given string ends with any of the values in the array:

```js
Str.of('This is my name').endsWith(['name', 'foo']);

// true
```

```js
Str.of('This is my name').endsWith(['this', 'foo']);

// false
```

#### exactly

The exactly method determines if the given string is an exact match with another string:

```js
Str.of('Laravel').exactly('Laravel');

// true
```

#### explode

The explode method splits the string by the given delimiter and returns an array containing each section of the split
string:

```js
Str.of('foo bar baz').explode(' ');

// ['foo', 'bar', 'baz']
```

#### finish

The finish method adds a single instance of the given value to a string if it does not already end with that value:

```js
Str.of('this/string').finish('/');

// this/string/
```

```js
Str.of('this/string/').finish('/');

// this/string/
```

#### headline

The headline method will convert strings delimited by casing, hyphens, or underscores into a space delimited string with
each word's first letter capitalized:

```js
Str.of('taylor_otwell').headline();

// Taylor Otwell
```

```js
Str.of('EmailNotificationSent').headline();

// Email Notification Sent
```

#### is

The is method determines if a given string matches a given pattern. Asterisks may be used as wildcard values

```js
Str.of('foobar').is('foo*');

// true
```

```js
Str.of('foobar').is('baz*');

// false
```

#### isAscii

The isAscii method determines if a given string is an ASCII string:

```js
Str.of('Taylor').isAscii();

// true
```

```js
Str.of('ü').isAscii();

// false
```

#### isEmpty

The isEmpty method determines if the given string is empty:

```js
Str.of('  ').trim().isEmpty();

// true
```

```js
Str.of('Laravel').trim().isEmpty();

// false
```

#### isNotEmpty

The isNotEmpty method determines if the given string is not empty:

```js
Str.of('  ').trim().isNotEmpty();

// false
```

```js
Str.of('Laravel').trim().isNotEmpty();

// true
```

#### isJson

The isJson method determines if a given string is valid JSON:

```js
Str.of('[1,2,3]').isJson();

// true
```

```js
Str.of('{"first": "John", "last": "Doe"}').isJson();

// true
```

```js
Str.of('{first: "John", last: "Doe"}').isJson();

// false
```

#### isUlid

The isUlid method determines if a given string is a ULID:

```js
Str.of('01gd6r360bp37zj17nxb55yv40').isUlid();

// true
```

```js
Str.of('Taylor').isUlid();

// false
```

#### isUuid

The isUuid method determines if a given string is a UUID:

```js
Str.of('5ace9ab9-e9cf-4ec6-a19d-5881212a452c').isUuid();

// true
```

```js
Str.of('Taylor').isUuid();

// false
```

#### kebab

The kebab method converts the given string to kebab-case:

```js
Str.of('fooBar').kebab();

// foo-bar
```

#### lcfirst

The lcfirst method returns the given string with the first character lowercased:

```js
Str.of('Foo Bar').lcfirst();

// foo Bar
```

#### length

The length method returns the length of the given string:

```js
Str.of('Laravel').length();

// 7
```

#### limit

The limit method truncates the given string to the specified length:

```js
Str.of('The quick brown fox jumps over the lazy dog').limit(20);

// The quick brown fox...
```

You may also pass a second argument to change the string that will be appended to the end of the truncated string:

```js
Str.of('The quick brown fox jumps over the lazy dog').limit(20, ' (...)');

// The quick brown fox (...)
```

#### lower

The lower method converts the given string to lowercase:

```js
Str.of('LARAVEL').lower();

// 'laravel'
```

#### ltrim

The ltrim method trims the left side of the string:

```js
Str.of('  Laravel  ').ltrim();

// 'Laravel  '
```

```js
Str.of('/Laravel/').ltrim('/');

// 'Laravel/'
```

#### mask

The mask method masks a portion of a string with a repeated character, and may be used to obfuscate segments of strings
such as email addresses and phone numbers:

```js
Str.of('taylor@example.com').mask('*', 3);

// tay***************
```

If needed, you may provide negative numbers as the third or fourth argument to the mask method, which will instruct the
method to begin masking at the given distance from the end of the string:

```js
Str.of('taylor@example.com').mask('*', -15, 3);

// tay***@example.com
```

```js
Str.of('taylor@example.com').mask('*', 4, -4);

// tayl**********.com
```

#### match

The match method will return the portion of a string that matches a given regular expression pattern:

```js
Str.of('foo bar').match('/bar/');

// 'bar'
```

```js
Str.of('foo bar').match('/foo (.*)/');

// 'bar'
```

#### matchAll

The matchAll method will return an array containing the portions of a string that match a given regular expression
pattern:

```js
Str.of('bar foo bar').matchAll('/bar/');

// ['bar', 'bar']
```

If you specify a matching group within the expression, method will return an array of that group's matches:

```js
Str.of('bar fun bar fly').matchAll('/f(\\w*)/');

// ['un', 'ly'];
```

If no matches are found, an empty array will be returned.

#### isMatch

The isMatch method will return true if the string matches a given regular expression:

```js
Str.of('foo bar').isMatch('/foo (.*)/');

// true
```

```js
Str.of('laravel').isMatch('/foo (.*)/');

// false
```

#### newLine

The newLine method appends an "end of line" character to a string:

```js
Str.of('Laravel').newLine().append('Framework');

// 'Laravel
//  Framework'
```

#### padBoth

The padBoth method pads both sides of a string with another string until the final string reaches the desired length:

```js
Str.of('James').padBoth(10, '_');

// '__James___'
```

```js
Str.of('James').padBoth(10);

// '  James   '
```

#### padLeft

The padLeft pads the left side of a string with another string until the final string reaches the desired length:

```js
Str.of('James').padLeft(10, '-=');

// '-=-=-James'
```

```js
Str.of('James').padLeft(10);

// '     James'
```

#### padRight

The padRight method pads the right side of a string with another string until the final string reaches the desired
length:

```js
Str.of('James').padRight(10, '-');

// 'James-----'
```

```js
Str.of('James').padRight(10);

// 'James     '
```

#### pipe

The pipe method allows you to transform the string by passing its current value to the given callable:

```js
Str.of('Laravel').pipe('btoa').prepend('Base64 Encoded: ');

// 'Base64 Encoded: TGFyYXZlbA=='
```

```js
Str.of('TGFyYXZlbA==').pipe('atob').prepend('Base64 Encoded: ');

// 'Base64 Decoded: Laravel'
```

```js
Str.of('Laravel Framework').pipe('toUpperCase');

// 'LARAVEL FRAMEWORK'
```

```js
Str.of('LARAVEL FRAMEWORK').pipe((string) => string.title());

// 'Laravel Framework'
```

```js
Str.of('foo').pipe(string => 'bar');

// 'bar'
```

#### plural

The plural method converts a singular word string to its plural form. This function supports any of the languages
support by Laravel's pluralizer:

```js
Str.of('car').plural();

// cars
```

```js
Str.of('child').plural();

// children
```

You may provide an integer as a second argument to the function to retrieve the singular or plural form of the string:

```js
Str.of('child').plural(2);

// children
```

```js
Str.of('child').plural(1);

// child
```

#### prepend

The prepend method prepends the given values onto the string:

```js
Str.of('Framework').prepend('Laravel ');

// Laravel Framework
```

#### remove

The remove method removes the given value or array of values from the string:

```js
Str.of('Arkansas is quite beautiful!').remove('quite');

// Arkansas is beautiful!
```

You may also pass false as a second parameter to ignore case when removing strings.

#### replace

The replace method replaces a given string within the string:

```js
Str.of('Laravel 9.x').replace('9.x', '10.x');

// Laravel 10.x
```

The replace method also accepts a caseSensitive argument. By default, the replace method is case sensitive:

```js
Str.of('macOS 13.x').replace('macOS', 'iOS', false);
```

#### replaceArray

The replaceArray method replaces a given value in the string sequentially using an array:

```js

Str.of('The event will take place between ? and ?').replaceArray('?', ['8:30', '9:00']);

// The event will take place between 8:30 and 9:00
```

#### replaceFirst

The replaceFirst method replaces the first occurrence of a given value in a string:

```js
Str.of('the quick brown fox jumps over the lazy dog').replaceFirst('the', 'a');

// a quick brown fox jumps over the lazy dog
```

#### replaceLast

The replaceLast method replaces the last occurrence of a given value in a string:

```js
Str.of('the quick brown fox jumps over the lazy dog').replaceLast('the', 'a');

// the quick brown fox jumps over a lazy dog
```

#### replaceMatches

The replaceMatches method replaces all portions of a string matching a pattern with the given replacement string:

```js
Str.of('(+1) 501-555-1000').replaceMatches('/[^A-Za-z0-9]+/', '');

// '15015551000'
```

The replaceMatches method also accepts a closure that will be invoked with each portion of the string matching the given
pattern, allowing you to perform the replacement logic within the closure and return the replaced value:

```js
Str.of('123').replaceMatches('/\\d/', (match) => '[' + match[0] + ']');

// '[1][2][3]'
```

#### rtrim

The rtrim method trims the right side of the given string:

```js
Str.of('  Laravel  ').rtrim();

// '  Laravel'
```

```js
Str.of('/Laravel/').rtrim('/');

// '/Laravel'
```

#### singular

The singular method converts a string to its singular form. This function supports any of the languages support by
Laravel's pluralizer:

```js
Str.of('cars').singular();

// car
```

```js
Str.of('children').singular();

// child
```

#### slug

The slug method generates a URL friendly "slug" from the given string:

```js
Str.of('Laravel Framework').slug('-');

// laravel-framework
```

#### snake

The snake method converts the given string to snake_case:

```js
Str.of('fooBar').snake();

// foo_bar
```

#### split

The split method splits a string into an array using a regular expression:

```js
Str.of('one, two, three').split('/[\s,]+/');

// ["one", "two", "three"]
```

#### squish

The squish method removes all extraneous white space from a string, including extraneous white space between words:

```js
Str.of('    laravel    framework    ').squish();

// laravel framework
```

#### start

The start method adds a single instance of the given value to a string if it does not already start with that value:

```js
Str.of('this/string').start('/');

// /this/string
```

```js
Str.of('/this/string').start('/');

// /this/string
```

#### startsWith

The startsWith method determines if the given string begins with the given value:

```js
Str.of('This is my name').startsWith('This');

// true
```

#### studly

The studly method converts the given string to StudlyCase:

```js
Str.of('foo_bar').studly();

// FooBar
```

#### substr

The substr method returns the portion of the string specified by the given start and length parameters:

```js
Str.of('Laravel Framework').substr(8);

// Framework
```

```js
Str.of('Laravel Framework').substr(8, 5);

// Frame
```

#### substrReplace

The substrReplace method replaces text within a portion of a string, starting at the position specified by the second
argument and replacing the number of characters specified by the third argument. Passing 0 to the method's third
argument will insert the string at the specified position without replacing any of the existing characters in the
string:

```js
Str.of('1300').substrReplace(':', 2);

// 13:
```

```js
Str.of('The Framework').substrReplace(' Laravel', 3, 0);

// The Laravel Framework
```

#### swap

The swap method replaces multiple values in the string using PHP's strtr function:

```js
Str.of('Tacos are great!').swap({ 'Tacos': 'Burritos', 'great': 'fantastic' });

// Burritos are fantastic!
```

#### tap

The tap method passes the string to the given closure, allowing you to examine and interact with the string while not
affecting the string itself. The original string is returned by the tap method regardless of what is returned by the
closure:

```js
Str.of('Laravel')
    .append(' Framework')
    .tap((string) => string.dump('String after append: ' + string))
    .upper();

// LARAVEL FRAMEWORK
```

#### test

The test method determines if a string matches the given regular expression pattern:

```js
Str.of('Laravel Framework').test('/Laravel/');

// true
```

#### title

The title method converts the given string to Title Case:

```js
Str.of('a nice title uses the correct case').title();

// A Nice Title Uses The Correct Case
```

#### trim

The trim method trims the given string:

```js
Str.of('  Laravel  ').trim();

// 'Laravel'
```

```js
Str.of('/Laravel/').trim('/');

// 'Laravel'
```

#### ucfirst

The ucfirst method returns the given string with the first character capitalized:

```js
Str.of('foo bar').ucfirst();

// Foo bar
```

#### ucsplit

The ucsplit method splits the given string into an array by uppercase characters:

```js
Str.of('Foo Bar').ucsplit();

// ['Foo', 'Bar']
```

#### upper

The upper method converts the given string to uppercase:

```js
Str.of('laravel').upper();

// LARAVEL
```

#### when

The when method invokes the given closure if a given condition is true. The closure will receive the fluent string
instance:

```js
Str.of('Taylor').when(true, (string) => string.append(' Otwell'));

// 'Taylor Otwell'
```

If necessary, you may pass another closure as the third parameter to the when method. This closure will execute if the
condition parameter evaluates to false.

#### whenContains

The whenContains method invokes the given closure if the string contains the given value. The closure will receive the
fluent string instance:

```js
Str.of('tony stark').whenContains('tony', (string) => string.title());

// 'Tony Stark'
```

If necessary, you may pass another closure as the third parameter to the when method. This closure will execute if the
string does not contain the given value.
You may also pass an array of values to determine if the given string contains any of the values in the array:

```js
Str.of('tony stark').whenContains(['tony', 'hulk'], (string) => string.title());

// Tony Stark
```

#### whenContainsAll

The whenContainsAll method invokes the given closure if the string contains all of the given sub-strings. The closure
will receive the fluent string instance:

```js
Str.of('tony stark').whenContainsAll(['tony', 'stark'], (string) => string.title());

// 'Tony Stark'
```

If necessary, you may pass another closure as the third parameter to the when method. This closure will execute if the
condition parameter evaluates to false.

#### whenEmpty

The whenEmpty method invokes the given closure if the string is empty. If the closure returns a value, that value will
also be returned by the whenEmpty method. If the closure does not return a value, the fluent string instance will be
returned:

```js
Str.of('  ').whenEmpty((string) => string.trim().prepend('Laravel'));

// 'Laravel'
```

#### whenNotEmpty

The whenNotEmpty method invokes the given closure if the string is not empty. If the closure returns a value, that value
will also be returned by the whenNotEmpty method. If the closure does not return a value, the fluent string instance
will be returned:

```js
Str.of('Framework').whenNotEmpty((string) => string.prepend('Laravel '));

// 'Laravel Framework'
```

#### whenStartsWith

The whenStartsWith method invokes the given closure if the string starts with the given sub-string. The closure will
receive the fluent string instance:

```js
Str.of('disney world').whenStartsWith('disney', (string) => string.title());

// 'Disney World'
```

#### whenEndsWith

The whenEndsWith method invokes the given closure if the string ends with the given sub-string. The closure will receive
the fluent string instance:

```js
Str.of('disney world').whenEndsWith('world', (string) => string.title());

// 'Disney World'
```

#### whenExactly

The whenExactly method invokes the given closure if the string exactly matches the given string. The closure will
receive the fluent string instance:

```js
Str.of('laravel').whenExactly('laravel', (string) => string.title());

// 'Laravel'
```

#### whenNotExactly

The whenNotExactly method invokes the given closure if the string does not exactly match the given string. The closure
will receive the fluent string instance:

```js
Str.of('framework').whenNotExactly('laravel', (string) => string.title());

// 'Framework'
```

#### whenIs

The whenIs method invokes the given closure if the string matches a given pattern. Asterisks may be used as wildcard
values. The closure will receive the fluent string instance:

```js
Str.of('foo/bar').whenIs('foo/*', (string) => string.append('/baz'));

// 'foo/bar/baz'
```

#### whenIsAscii

The whenIsAscii method invokes the given closure if the string is 7 bit ASCII. The closure will receive the fluent
string instance:

```js
Str.of('laravel').whenIsAscii((string) => string.title());

// 'Laravel'
```

#### whenIsUlid

The whenIsUlid method invokes the given closure if the string is a valid ULID. The closure will receive the fluent
string instance:

```js
Str.of('01gd6r360bp37zj17nxb55yv40').whenIsUlid((string) => string.substr(0, 8));

// '01gd6r36'
```

#### whenIsUuid

The whenIsUuid method invokes the given closure if the string is a valid UUID. The closure will receive the fluent
string instance:

```js
Str.of('a0a2a2d2-0b87-4a18-83f2-2529882be2de').whenIsUuid((string) => string.substr(0, 8));

// 'a0a2a2d2'
```

#### whenTest

The whenTest method invokes the given closure if the string matches the given regular expression.
receive the fluent string instance:

```js
Str.of('laravel framework').whenTest('/laravel/', (string) => string.title());

// 'Laravel Framework'
```

#### wordCount

The wordCount method returns the number of words that a string contains:

```js
Str.of('Hello, world!').wordCount();

// 2
```

#### words

The words method limits the number of words in a string. If necessary, you may specify an additional string that will be
appended to the truncated string:

```js
Str.of('Perfectly balanced, as all things should be.').words(3, ' >>>');

// Perfectly balanced, as >>>
```
