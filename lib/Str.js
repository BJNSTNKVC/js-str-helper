let Stringable = require('./Stringable.js')

module.exports = Str = class {

    /**
     * Get a new stringable object from the given string.
     *
     * @param { String } string
     *
     * @return { Stringable }
     */
    static of(string) {
        return new Stringable(string);
    }

    /**
     * Return the remainder of a string after the first occurrence of a given value.
     *
     * @param { String } subject
     * @param { String } search
     *
     * @return { String }
     */
    static after(subject, search) {
        if (search === '') {
            return subject;
        }

        return subject.slice(subject.indexOf(search) + search.length);
    }

    /**
     * Return the remainder of a string after the last occurrence of a given value.
     *
     * @param { String } subject
     * @param { String } search
     *
     * @return { String }
     */
    static afterLast(subject, search) {
        if (search === '') {
            return subject;
        }

        const position = subject.lastIndexOf(search);

        if (position === -1) {
            return subject;
        }

        return subject.substring(position + search.length);
    }

    /**
     * Transliterate a UTF-8 value to ASCII.
     *
     * @param { String } value
     * @param { String } language
     *
     * @return { String }
     */
    static ascii(value, language = 'en') {
        methodNotImplemented('ascii');
    }

    /**
     * Get the portion of a string before the first occurrence of a given value.
     *
     * @param { String } subject
     * @param { String } search
     *
     * @return { String }
     */
    static before(subject, search) {
        if (search === '') {
            return subject;
        }

        const result = subject.substring(0, subject.indexOf(search));

        if (result === '') {
            return subject;
        }

        return result;
    }

    /**
     * Get the portion of a string before the last occurrence of a given value.
     *
     * @param { String } subject
     * @param { String } search
     *
     * @return { String }
     */
    static beforeLast(subject, search) {
        if (search === '') {
            return subject;
        }

        const position = subject.lastIndexOf(search);

        if (position === -1) {
            return subject;
        }

        return this.substr(subject, 0, position);
    }

    /**
     * Get the portion of a string between two given values.
     *
     * @param { String } subject
     * @param { String } from
     * @param { String } to
     *
     * @return { String }
     */
    static between(subject, from, to) {
        if (from === '' || to === '') {
            return subject;
        }

        return this.beforeLast(this.after(subject, from), to);
    }

    /**
     * Get the smallest possible portion of a string between two given values.
     *
     * @param { String } subject
     * @param { String } from
     * @param { String } to
     *
     * @return { String }
     */
    static betweenFirst(subject, from, to) {
        if (from === '' || to === '') {
            return subject;
        }

        return this.before(this.after(subject, from), to);
    }

    /**
     * Convert a value to camel case.
     *
     * @param { String } value
     *
     * @return { String }
     */
    static camel(value) {
        return this.lcfirst(this.studly(value));
    }

    /**
     * Determine if a given string contains a given substring.
     *
     * @param { String } haystack
     * @param { String|Array } needles
     * @param { Boolean } ignoreCase
     *
     * @return { Boolean }
     */
    static contains(haystack, needles, ignoreCase = false) {
        let result = false;

        if (ignoreCase) {
            haystack = haystack.toLowerCase();
        }

        if (!Array.isArray(needles)) {
            needles = [needles];
        }

        needles.forEach(needle => {
            if (ignoreCase) {
                needle = needle.toLowerCase();
            }

            if (needle !== '' && haystack.includes(needle)) {
                result = true;
            }
        });

        return result;
    }

    /**
     * Determine if a given string contains all array values.
     *
     * @param { String } haystack
     * @param { Array } needles
     * @param { Boolean } ignoreCase
     *
     * @return { Boolean }
     */
    static containsAll(haystack, needles, ignoreCase = false) {
        let result = true;

        needles.forEach(needle => {
            if (!this.contains(haystack, needle, ignoreCase)) {
                result = false;
            }
        });

        return result;
    }

    /**
     * Determine if a given string ends with a given substring.
     *
     * @param { String } haystack
     * @param { String|Array } needles
     *
     * @return { Boolean }
     */
    static endsWith(haystack, needles) {
        let result = false;

        if (!Array.isArray(needles)) {
            needles = [needles];
        }

        needles.forEach(needle => {
            if (needle !== '' && haystack.endsWith(needle)) {
                result = true;
            }
        });

        return result;
    }

    /**
     * Extracts an excerpt from text that matches the first instance of a phrase.
     *
     * @param { String } text
     * @param { String } phrase
     * @param { Object } options
     *
     * @return { String|null }
     */
    static excerpt(text, phrase = '', options = {}) {
        const radius = options.radius ?? 100;
        const omission = options.omission ?? '...';
        const results = text.split(phrase);

        if (results.length === 1) {
            return null;
        }

        const matches = [text, results[0], phrase, results.splice(1).join(phrase)];

        let start = matches[1].trimStart();
        let end = matches[3].trimEnd();

        start = this.of(substr(start, Math.max((start.length - radius), 0)))
            .ltrim()
            .unless((startWithRadius) => startWithRadius.exactly(start), (startWithRadius) => startWithRadius.prepend(omission))
            .toString();

        end = this.of(substr(end, 0, radius))
            .rtrim()
            .unless((endWithRadius) => endWithRadius.exactly(end), (endWithRadius) => endWithRadius.append(omission))
            .toString();

        return (start + ' ' + matches[2] + end).replace(/\s+/g, ' ').trim();
    }

    /**
     * Cap a string with a single instance of a given value.
     *
     * @param { String } value
     * @param { String } cap
     *
     * @return { String }
     */
    static finish(value, cap) {
        return value[value.length - 1] === cap ? value : value + cap;
    }

    /**
     * Wrap the string with the given strings.
     *
     * @param { String } value
     * @param { String } before
     * @param { String|null } after
     *
     * @return string
     */
    static wrap(value, before, after = null) {
        return before + value + (after ?? before);
    }

    /**
     * Determine if a given string matches a given pattern.
     *
     * @param { String|Array } pattern
     * @param { String } value
     *
     * @return { Boolean }
     */
    static is(pattern, value) {
        let result = false;

        if (!Array.isArray(pattern)) {
            pattern = [pattern];
        }

        pattern.forEach(item => {
            if (item === value) {
                result = true;
            }

            item = preg_quote(item, '#');

            item = item.replace(/\\\*/g, '.*');

            if (item.match(value)) {
                result = true;
            }
        });

        return result;
    }

    /**
     * Determine if a given string is 7 bit ASCII.
     *
     * @param { String } value
     *
     * @return { Boolean }
     */
    static isAscii(value) {
        methodNotImplemented('isAscii');
    }

    /**
     * Determine if a given string is valid JSON.
     *
     * @param { String } value
     *
     * @return { Boolean }
     */
    static isJson(value) {
        if (!value instanceof String) {
            return false;
        }

        try {
            JSON.parse(value);
        } catch (JsonException) {
            return false;
        }

        return true;
    }

    /**
     * Determine if a given string is a valid UUID.
     *
     * @param { String } value
     *
     * @return { Boolean }
     */
    static isUuid(value) {
        if (!value instanceof String) {
            return false;
        }

        return new RegExp(/^[\da-f]{8}-[\da-f]{4}-[\da-f]{4}-[\da-f]{4}-[\da-f]{12}$/).test(value);
    }

    /**
     * Determine if a given string is a valid ULID.
     *
     * @param { String } value
     *
     * @return { Boolean }
     */
    static isUlid(value) {
        if (!value instanceof String) {
            return false;
        }

        if (value.length !== 26) {
            return false;
        }

        if (value.length !== value.match(/[0123456789ABCDEFGHJKMNPQRSTVWXYZabcdefghjkmnpqrstvwxyz]/g).length) {
            return false;
        }

        return value[0] <= 7;
    }

    /**
     * Convert a string to kebab case.
     *
     * @param { String } value
     *
     * @return { String }
     */
    static kebab(value) {
        return this.snake(value, '-');
    }

    /**
     * Return the length of the given string.
     *
     * @param { String } value
     *
     * @return { Number }
     */
    static length(value) {
        return value.length;
    }

    /**
     * Limit the number of characters in a string.
     *
     * @param { String } value
     * @param { Number } limit
     * @param { String } end
     *
     * @return { String }
     */
    static limit(value, limit = 100, end = '...') {
        if (value.length <= limit) {
            return value;
        }

        return this.substr(value, 0, limit).trim() + end;
    }

    /**
     * Convert the given string to lower-case.
     *
     * @param { String } value
     *
     * @return { String }
     */
    static lower(value) {
        return value.toLowerCase();
    }

    /**
     * Limit the number of words in a string.
     *
     * @param { String } value
     * @param { Number } words
     * @param { String } end
     *
     * @return { String }
     */
    static words(value, words = 100, end = '...') {
        const wordsArray = value.match(/\S+\s*/g).splice(0, words);

        const result = wordsArray.join('');

        if (wordsArray.length === 1 || this.length(value) === this.length(result)) {
            return value;
        }

        return result.trim() + end;
    }

    /**
     * Converts GitHub flavored Markdown into HTML.
     *
     * @param { String } string
     * @param { Object } options
     *
     * @return { String }
     */
    static markdown(string, options = {}) {
        methodNotImplemented('markdown');
    }

    /**
     * Converts inline Markdown into HTML.
     *
     * @param { String } string
     * @param { Object } options
     *
     * @return { String }
     */
    static inlineMarkdown(string, options = {}) {
        methodNotImplemented('inlineMarkdown');
    }

    /**
     * Masks a portion of a string with a repeated character.
     *
     * @param { String } string
     * @param { String } character
     * @param { Number } index
     * @param { Number|null } length
     *
     * @return { String }
     */
    static mask(string, character, index, length = null) {
        if (character === '') {
            return string;
        }

        let start = index;
        let endIndex = length ?? string.length;

        if (start < 0) {
            start = string.length + start;
            endIndex = start + length;
        }

        if (endIndex === 0) {
            endIndex = start;
        }

        let segment = string.substring(start, endIndex);

        if (segment === '') {
            return string;
        }

        let strLen = string.length;
        let startIndex = index;

        if (index < 0) {
            startIndex = index < -strLen ? 0 : strLen + index;
        }

        start = string.substring(0, startIndex);

        let segmentLen = segment.length;
        let end = string.substring(startIndex + segmentLen);

        return start + character.substring(0, 1).repeat(segmentLen) + end;
    }

    /**
     * Get the string matching the given pattern.
     *
     * @param { String } pattern
     * @param { String } subject
     *
     * @return { String }
     */
    static match(pattern, subject) {
        const regExpBody = /^\/(.*)\/\w*$/.exec(pattern)[1];
        const regExpFlags = /^\/.*\/(\w*)$/.exec(pattern)[1];
        const regExp = new RegExp(regExpBody, regExpFlags);

        const matches = subject.match(regExp);

        if (!matches) {
            return '';
        }

        return matches[1] ?? matches[0];
    }

    /**
     * Determine if a given string matches a given pattern.
     *
     * @param { String|Array } pattern
     * @param { String } value
     *
     * @return { Boolean }
     */
    static isMatch(pattern, value) {
        let result = false;

        if (!Array.isArray(pattern)) {
            pattern = [pattern];
        }

        pattern.forEach(item => {
            if (item === value) {
                result = true;
            }

            let regExpBody = /^\/(.*)\/\w*$/.exec(item)[1];
            let regExpFlags = /^\/.*\/(\w*)$/.exec(item)[1];
            let regExp = new RegExp(regExpBody, regExpFlags);

            if (value.match(regExp)) {
                result = true;
            }
        });

        return result;
    }

    /**
     * Get the string matching the given pattern.
     *
     * @param { String } pattern
     * @param { String } subject
     *
     * @return { Array }
     */
    static matchAll(pattern, subject) {
        const regExpBody = /^\/(.*)\/\w*$/.exec(pattern)[1];
        const regExpFlags = /^\/.*\/(\w*)$/.exec(pattern)[1];
        const regExp = new RegExp(regExpBody, regExpFlags + (regExpFlags.indexOf('g') !== -1 ? '' : 'g'));
        const matches = [...subject.matchAll(regExp)];

        if (matches.length === 0) {
            return [];
        }

        return matches.map(match => match[0]);
    }

    /**
     * Pad both sides of a string with another.
     *
     * @param { String } value
     * @param { Number } length
     * @param { String } pad
     *
     * @return { String }
     */
    static padBoth(value, length, pad = ' ') {
        const short = Math.max(0, length - value.length);
        const shortLeft = Math.floor(short / 2);
        const shortRight = Math.ceil(short / 2);

        return pad.repeat(shortLeft).substring(0, shortLeft) + value + pad.repeat(shortRight).substring(0, shortRight);
    }

    /**
     * Pad the left side of a string with another.
     *
     * @param { String } value
     * @param { Number } length
     * @param { String } pad
     *
     * @return { String }
     */
    static padLeft(value, length, pad = ' ') {
        const short = Math.max(0, length - value.length);

        return pad.repeat(short).substring(0, short) + value;
    }

    /**
     * Pad the right side of a string with another.
     *
     * @param { String } value
     * @param { Number } length
     * @param { String } pad
     *
     * @return { String }
     */
    static padRight(value, length, pad = ' ') {
        const short = Math.max(0, length - value.length);

        return value + pad.repeat(short).substring(0, short);
    }

    /**
     * Parse a Class[@]method style callback into class and method.
     *
     * @param { String } callback
     * @param { String|null } $default
     *
     * @return { Array }
     */
    static parseCallback(callback, $default = null) {
        methodNotImplemented('parseCallback');
    }

    /**
     * Get the plural form of an English word.
     *
     * @param { String } value
     * @param { Number|Array } count
     *
     * @return { String }
     */
    static plural(value, count = 2) {
        methodNotImplemented('plural');
    }

    /**
     * Pluralize the last word of an English, studly caps case string.
     *
     * @param { String } value
     * @param { Number|Array } count
     *
     * @return { String }
     */
    static pluralStudly(value, count = 2) {
        methodNotImplemented('pluralStudly');
    }

    /**
     * Generate a more truly "random" alpha-numeric string.
     *
     * @param { Number } length
     *
     * @return { String }
     */
    static random(length = 16) {
        let string = '';

        let size = length - string.length;

        let bytesSize = parseInt(Math.ceil((size) / 3) * 3);

        let bytes = crypto.getRandomValues(new Uint8Array(bytesSize)).join('');

        string = btoa(bytes);

        ['/', '+', '='].forEach(char => string = string.replace(char, ''));

        return string.substring(0, size);
    }

    /**
     * Set the callable that will be used to generate random strings.
     *
     * @param { Function|null } factory
     *
     * @return { void }
     */
    static createRandomStringsUsing(factory = null) {
        methodNotImplemented('createRandomStringsUsing');
    }

    /**
     * Set the sequence that will be used to generate random strings.
     *
     * @param { Object } sequence
     * @param { Function|null } whenMissing
     *
     * @return { void }
     */
    static createRandomStringsUsingSequence(sequence, whenMissing = null) {
        methodNotImplemented('createRandomStringsUsingSequence');
    }

    /**
     * Indicate that random strings should be created normally and not using a custom factory.
     *
     * @return { void }
     */
    static createRandomStringsNormally() {
        methodNotImplemented('createRandomStringsNormally');
    }

    /**
     * Repeat the given string.
     *
     * @param { String } string
     * @param { Number } times

     * @return { String }
     */
    static repeat(string, times = 1) {
        return string.repeat(times);
    }

    /**
     * Replace a given value in the string sequentially with an array.
     *
     * @param { Array } replace
     * @param { String } subject
     * @param { String } search
     *
     * @return { String }
     */
    static replaceArray(search, replace, subject) {
        const segments = subject.split(search);

        let result = segments.shift();

        segments.forEach(segment => result += (replace.shift() ?? search) + segment);

        return result;
    }

    /**
     * Replace the given value in the given string.
     *
     * @param { String|Array } search
     * @param { String } replace
     * @param { String } subject
     *
     * @return { String }
     */
    static replace(search, replace, subject) {
        if (Array.isArray(search)) {
            search.forEach(term => subject = subject.replaceAll(term, replace));

            return subject;
        }

        return subject.replaceAll(search, replace);
    }

    /**
     * Replace the first occurrence of a given value in the string.
     *
     * @param { String } search
     * @param { String } replace
     * @param { String } subject
     *
     * @return { String }
     */
    static replaceFirst(search, replace, subject) {
        if (search === '') {
            return subject;
        }

        let position = subject.indexOf(search);

        if (position !== false) {
            return subject.replace(search, replace);
        }

        return subject;
    }

    /**
     * Replace the last occurrence of a given value in the string.
     *
     * @param { String } search
     * @param { String } replace
     * @param { String } subject
     *
     * @return { String }
     */
    static replaceLast(search, replace, subject) {
        if (search === '') {
            return subject;
        }

        let position = subject.lastIndexOf(search);

        if (position !== false) {
            return subject.substring(0, position) + replace + subject.substring(position + search.length);
        }

        return subject;
    }

    /**
     * Remove any occurrence of the given string in the subject.
     *
     * @param { String } search
     * @param { String } subject
     * @param { Boolean } caseSensitive
     *
     * @return { String }
     */
    static remove(search, subject, caseSensitive = true) {
        subject = caseSensitive
            ? subject.replace(search, '')
            : subject.replace(new RegExp(search, 'gi'), '');

        return subject.replace(/\s+/g, ' ');
    }

    /**
     * Reverse the given string.
     *
     * @param { String } value
     *
     * @return { String }
     */
    static reverse(value) {
        return value.split('').reverse().join('');
    }

    /**
     * Begin a string with a single instance of a given value.
     *
     * @param { String } value
     * @param { String } prefix
     *
     * @return { String }
     */
    static start(value, prefix) {
        const quoted = preg_quote(prefix, '/');

        return prefix + value.replace(new RegExp(`^(?:${quoted})+`, 'u'), '');
    }

    /**
     * Convert the given string to upper-case.
     *
     * @param { String } value
     *
     * @return { String }
     */
    static upper(value) {
        return value.toUpperCase();
    }

    /**
     * Convert the given string to title case.
     *
     * @param { String } value
     *
     * @return { String }
     */
    static title(value) {
        return value.split(/[^A-Za-z]/).map(word => this.ucfirst(word)).join(' ');
    }

    /**
     * Convert the given string to title case for each word.
     *
     * @param { String } value
     *
     * @return { String }
     */
    static headline(value) {
        let parts = value.split(' ');

        parts = parts.length > 1
            ? parts.map(part => this.title(part))
            : this.ucsplit(parts.join('_')).map(part => this.title(part));

        let collapsed = this.replace(['-', '_', ' '], '_', parts.join('_'));

        return collapsed.split('_').join(' ').trim();
    }

    /**
     * Get the singular form of an English word.
     *
     * @param { String } value
     *
     * @return { String }
     */
    static singular(value) {
        methodNotImplemented('singular');
    }

    /**
     * Generate a URL friendly "slug" from a given string.
     *
     * @param { String } title
     * @param { String } separator
     * @param { Object } dictionary
     *
     * @return { String }
     */
    static slug(title, separator = '-', dictionary = {'@': 'at'}) {
        // Convert all dashes/underscores into separator
        let flip = separator === '-' ? '_' : '-';

        title = title.replace('![' + preg_quote(flip) + ']+!u', separator);

        // Replace dictionary words
        for (let value in dictionary) {
            dictionary[value] = separator + dictionary[value] + separator;
        }

        for (let value in dictionary) {
            title = title.replaceAll(value, dictionary[value]);
        }

        // Remove all characters that are not the separator, letters, numbers, or whitespace
        title = this.lower(title).replace('![^' + preg_quote(separator) + '\pL\pN\s]+!u', '');

        // Replace all separator characters and whitespace by a single separator
        return title.replaceAll(new RegExp('\\s', 'g'), separator).replace(new RegExp('\\' + separator + '+', 'g'), separator);
    }

    /**
     * Convert a string to snake case.
     *
     * @param { String } value
     * @param { String } delimiter
     *
     * @return { String }
     */
    static snake(value, delimiter = '_') {
        value = ucwords(value).replace(new RegExp(/\s+/, 'u'), '');

        value = this.lower(value.replace(/(.)(?=[A-Z])/ug, `${delimiter}`));

        return value;
    }

    /**
     * Remove all "extra" blank space from the given string.
     *
     * @param { String } value
     *
     * @return { String }
     */
    static squish(value) {
        return value.replace(/\s\s+/g, ' ').trim();
    }

    /**
     * Determine if a given string starts with a given substring.
     *
     * @param { String } haystack
     * @param { String|Array } needles
     *
     * @return { Boolean }
     */
    static startsWith(haystack, needles) {
        let result = false;

        if (!Array.isArray(needles)) {
            needles = [needles];
        }

        needles.forEach(needle => {
            if (needle !== '' && haystack.substring(0, needle.length) === needle) {
                result = true;
            }
        });

        return result;
    }

    /**
     * Convert a value to studly caps case.
     *
     * @param { String } value
     *
     * @return { String }
     */
    static studly(value) {
        const words = this.replace(['-', '_'], '', value).split(' ');

        const studlyWords = words.map(word => this.ucfirst(word));

        return studlyWords.join('');
    }

    /**
     * Returns the portion of the string specified by the start and length parameters.
     *
     * @param { String } string
     * @param { Number } start
     * @param { Number|null } length
     *
     * @return { String }
     */
    static substr(string, start, length = null) {
        return string.substring(start, start + length);
    }

    /**
     * Returns the number of substring occurrences.
     *
     * @param { String } haystack
     * @param { String } needle
     * @param { Number } offset
     * @param { Number|Null } length
     *
     * @return { Number }
     */
    static substrCount(haystack, needle, offset = 0, length = null) {
        if (length) {
            return haystack.substring(offset).substring(0, length).split(needle).length - 1;
        }

        return haystack.substring(offset).split(needle).length - 1;
    }

    /**
     * Replace text within a portion of a string.
     *
     * @param { String } string
     * @param { String } replace
     * @param { Number } offset
     * @param { Number|null } length
     *
     * @return { String }
     */
    static substrReplace(string, replace, offset = 0, length = null) {
        if (length !== null) {
            return string.substring(0, offset) + replace + string.substring(offset);
        }

        return string.substring(0, offset) + replace;
    }

    /**
     * Swap multiple keywords in a string with other keywords.
     *
     * @param { Object } map
     * @param { String } subject
     *
     * @return { String }
     */
    static swap(map, subject) {
        for (const value in map) {
            subject = subject.replace(value, map[value]);
        }

        return subject;
    }

    /**
     * Make a string's first character lowercase.
     *
     * @param { String } string
     *
     * @return { String }
     */
    static lcfirst(string) {
        return this.lower(this.substr(string, 0, 1)) + this.substr(string, 1, string.length);
    }

    /**
     * Make a string's first character uppercase.
     *
     * @param { String } string
     *
     * @return { String }
     */
    static ucfirst(string) {
        return this.upper(this.substr(string, 0, 1)) + this.substr(string, 1, string.length);
    }

    /**
     * Split a string into pieces by uppercase characters.
     *
     * @param { String } string
     *
     * @return { Array }
     */
    static ucsplit(string) {
        return string.split(new RegExp(/(?=\p{Lu})/, 'u'));
    }

    /**
     * Get the number of words a string contains.
     *
     * @param { String } string
     * @param { String|null } characters
     *
     * @return { Number }
     */
    static wordCount(string, characters = null) {
        return string.split(/[\s]+/).length;
    }

    /**
     * Generate a UUID (version 4).
     *
     * @return { String }
     */
    static uuid() {
        let time = parseInt((Math.random() * 10000000000000000).toString().substring(0, 13));

        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (character) {
            let randomChar = (time + Math.random() * 16) % 16 | 0;
            time = Math.floor(time / 16);

            return (character === 'x' ? randomChar : (randomChar & 0x3 | 0x8)).toString(16);
        });
    }

    /**
     * Generate a time-ordered UUID (version 4).
     *
     * @return { String }
     */
    static orderedUuid() {
        let time = new Date().getTime();

        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (character) {
            let randomChar = (time + Math.random() * 16) % 16 | 0;
            time = Math.floor(time / 16);

            return (character === 'x' ? randomChar : (randomChar & 0x3 | 0x8)).toString(16);
        });
    }

    /**
     * Set the callable that will be used to generate UUIDs.
     *
     * @param { Function|null } factory
     *
     * @return { void }
     */
    static createUuidsUsing(factory = null) {
        methodNotImplemented('createUuidsUsing');
    }

    /**
     * Set the sequence that will be used to generate UUIDs.
     *
     * @param { Object } sequence
     * @param { Function|null } whenMissing
     *
     * @return { void }
     */
    static createUuidsUsingSequence(sequence, whenMissing = null) {
        methodNotImplemented('createUuidsUsingSequence');
    }

    /**
     * Always return the same UUID when generating new UUIDs.
     *
     * @param  { Function|null } callback
     *
     * @return { void }
     */
    static freezeUuids(callback = null) {
        methodNotImplemented('freezeUuids');
    }

    /**
     * Indicate that UUIDs should be created normally and not using a custom factory.
     *
     * @return { void }
     */
    static createUuidsNormally() {
        methodNotImplemented('createUuidsNormally');
    }

    /**
     * Generate a ULID.
     *
     * @return { String }
     */
    static ulid() {
        const encoding = '0123456789ABCDEFGHJKMNPQRSTVWXYZ';
        const encodingLength = encoding.length;
        const timeLength = 10;
        const randomLength = 16;

        /**
         * Generate random Encoding Time.
         *
         * @return { String }
         */
        function generateEncodedTime() {
            let encodedTime = '';
            let now = new Date().getTime();

            for (let length = timeLength; length > 0; length--) {
                const mod = now % encodingLength;
                encodedTime = encoding.charAt(mod) + encodedTime;
                now = (now - mod) / encodingLength;
            }

            return encodedTime;
        }

        /**
         * Generate random Number.
         *
         * @return { Number }
         */
        function generateRandomNumber() {
            const buffer = new Uint8Array(1);
            crypto.getRandomValues(buffer);

            return buffer[0] / 0xff;
        }

        /**
         * Generate random String.
         *
         * @return { String }
         */
        function generateRandomString() {
            let string = '';

            for (let length = randomLength; length > 0; length--) {
                let randomNumber = Math.floor(generateRandomNumber() * encodingLength);

                if (randomNumber === encodingLength) {
                    randomNumber = encodingLength - 1;
                }
                string += encoding.charAt(randomNumber);
            }

            return string;
        }

        return generateEncodedTime() + generateRandomString();
    }
}

/**
 * Gets a substring beginning at the specified location and having the specified length.
 *
 * @param { String } string The input string.
 * @param { Number } start The starting position of the desired substring. The index of the first character in the string is zero.
 * @param { Number } length The number of characters to include in the returned substring.
 *
 * @return { String } Portion of string specified by the start and length parameters.
 */
function substr(string, start, length = 0) {
    if (start < 0) {
        start = string.length + start;

        if (start < 0) {
            start = 0;
        }
    }

    if (length < 0) {
        return '';
    }

    if (length === 0) {
        return string.substring(start);
    }

    return string.substring(start, start + length);
}

/**
 * Quote regular expression characters.
 *
 * @param { String } string The input string.
 * @param { String|null } delimiter If the optional delimiter is specified, it will also be escaped.
 * This is useful for escaping the delimiter that is required by the PCRE functions.
 * The / is the most commonly used delimiter.
 *
 * @return { String } The quoted (escaped) string.
 */
function preg_quote(string, delimiter = null) {
    return (string + '').replace(new RegExp('[.\\\\+*?\\[\\^\\]$(){}=!<>|:\\' + (delimiter || '') + '-]', 'g'), '\\$&');
}

/**
 * Uppercase the first character of each word in a string
 *
 * @param { String } string The input string.
 * @param { String } separators The optional separators contains the word separator characters.

 * @return { String } String the modified string.
 */
function ucwords(string, separators = ' \t\r\n\f\v') {
    return string.split(' ').map(word => word[0].toUpperCase() + word.substring(1)).join(' ');
}

/**
 * Show 'Method not implemented' error.
 *
 * @param { String } method Name of the unimplemented method.
 */
function methodNotImplemented(method) {
    console.error(`Method '${method}' not implemented.`);
}