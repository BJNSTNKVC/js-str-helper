let Stringable = require('./Stringable.js');

module.exports = Str = class {

    /**
     * Get a new Stringable object from the given string.
     *
     * @param { string } string
     *
     * @return { Stringable }
     */
    static of(string) {
        return new Stringable(string);
    }

    /**
     * Return the remainder of a string after the first occurrence of a given value.
     *
     * @param { string } subject
     * @param { string } search
     *
     * @return { string }
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
     * @param { string } subject
     * @param { string } search
     *
     * @return { string }
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
     * @param { string } value
     * @param { string } language
     *
     * @return { string }
     */
    static ascii(value, language = 'en') {
        return value.normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/[^a-zA-Z0-9]/g, '');
    }

    /**
     * Get the portion of a string before the first occurrence of a given value.
     *
     * @param { string } subject
     * @param { string } search
     *
     * @return { string }
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
     * @param { string } subject
     * @param { string } search
     *
     * @return { string }
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
     * @param { string } subject
     * @param { string } from
     * @param { string } to
     *
     * @return { string }
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
     * @param { string } subject
     * @param { string } from
     * @param { string } to
     *
     * @return { string }
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
     * @param { string } value
     *
     * @return { string }
     */
    static camel(value) {
        return this.lcfirst(this.studly(value));
    }

    /**
     * Determine if a given string contains a given substring.
     *
     * @param { string } haystack
     * @param { string|array } needles
     * @param { boolean } ignoreCase
     *
     * @return { boolean }
     */
    static contains(haystack, needles, ignoreCase = false) {
        let result = false;

        if (ignoreCase) {
            haystack = haystack.toLowerCase();
        }

        if (!(needles instanceof Array)) {
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
     * @param { string } haystack
     * @param { array } needles
     * @param { boolean } ignoreCase
     *
     * @return { boolean }
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
     * @param { string } haystack
     * @param { string|array } needles
     *
     * @return { boolean }
     */
    static endsWith(haystack, needles) {
        let result = false;

        if (!(needles instanceof Array)) {
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
     * @param { string } text
     * @param { string } phrase
     * @param { object } options
     *
     * @return { string|null }
     */
    static excerpt(text, phrase = '', options = {}) {
        const radius   = options.radius ?? 100;
        const omission = options.omission ?? '...';
        const results  = text.split(phrase);

        if (results.length === 1) {
            return null;
        }

        const matches = [text, results[0], phrase, results.splice(1).join(phrase)];

        let start = matches[1].trimStart();
        let end   = matches[3].trimEnd();

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
     * @param { string } value
     * @param { string } cap
     *
     * @return { string }
     */
    static finish(value, cap) {
        return value[value.length - 1] === cap ? value : value + cap;
    }

    /**
     * Wrap the string with the given strings.
     *
     * @param { string } value
     * @param { string } before
     * @param { string|null } after
     *
     * @return string
     */
    static wrap(value, before, after = null) {
        return before + value + (after ?? before);
    }

    /**
     * Determine if a given string matches a given pattern.
     *
     * @param { string|array } pattern
     * @param { string } value
     *
     * @return { boolean }
     */
    static is(pattern, value) {
        let result = false;

        if (!(pattern instanceof Array)) {
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
     * @param { string } value
     *
     * @return { boolean }
     */
    static isAscii(value) {
        return !value.match('[^\x09\x10\x13\x0A\x0D\x20-\x7E]');
    }

    /**
     * Determine if a given string is valid JSON.
     *
     * @param { string } value
     *
     * @return { boolean }
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
     * @param { string } value
     *
     * @return { boolean }
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
     * @param { string } value
     *
     * @return { boolean }
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
     * @param { string } value
     *
     * @return { string }
     */
    static kebab(value) {
        return this.snake(value, '-');
    }

    /**
     * Return the length of the given string.
     *
     * @param { string } value
     *
     * @return { number }
     */
    static length(value) {
        return value.length;
    }

    /**
     * Limit the number of characters in a string.
     *
     * @param { string } value
     * @param { number } limit
     * @param { string } end
     *
     * @return { string }
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
     * @param { string } value
     *
     * @return { string }
     */
    static lower(value) {
        return value.toLowerCase();
    }

    /**
     * Limit the number of words in a string.
     *
     * @param { string } value
     * @param { number } words
     * @param { string } end
     *
     * @return { string }
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
     * @param { string } string
     * @param { object } options
     *
     * @return { string }
     */
    static markdown(string, options = {}) {
        console.error(`Method 'markdown' not implemented.`);
    }

    /**
     * Converts inline Markdown into HTML.
     *
     * @param { string } string
     * @param { object } options
     *
     * @return { string }
     */
    static inlineMarkdown(string, options = {}) {
        console.error(`Method 'inlineMarkdown' not implemented.`);
    }

    /**
     * Masks a portion of a string with a repeated character.
     *
     * @param { string } string
     * @param { string } character
     * @param { number } index
     * @param { number|null } length
     *
     * @return { string }
     */
    static mask(string, character, index, length = null) {
        if (character === '') {
            return string;
        }

        let start    = index;
        let endIndex = length ?? string.length;

        if (start < 0) {
            start    = string.length + start;
            endIndex = start + length;
        }

        if (endIndex === 0) {
            endIndex = start;
        }

        let segment = string.substring(start, endIndex);

        if (segment === '') {
            return string;
        }

        let strLen     = string.length;
        let startIndex = index;

        if (index < 0) {
            startIndex = index < -strLen ? 0 : strLen + index;
        }

        start = string.substring(0, startIndex);

        let segmentLen = segment.length;
        let end        = string.substring(startIndex + segmentLen);

        return start + character.substring(0, 1).repeat(segmentLen) + end;
    }

    /**
     * Get the string matching the given pattern.
     *
     * @param { string } pattern
     * @param { string } subject
     *
     * @return { string }
     */
    static match(pattern, subject) {
        const regExpBody  = /^\/(.*)\/\w*$/.exec(pattern)[1];
        const regExpFlags = /^\/.*\/(\w*)$/.exec(pattern)[1];
        const regExp      = new RegExp(regExpBody, regExpFlags);

        const matches = subject.match(regExp);

        if (!matches) {
            return '';
        }

        return matches[1] ?? matches[0];
    }

    /**
     * Determine if a given string matches a given pattern.
     *
     * @param { string|array } pattern
     * @param { string } value
     *
     * @return { boolean }
     */
    static isMatch(pattern, value) {
        let result = false;

        if (!(pattern instanceof Array)) {
            pattern = [pattern];
        }

        pattern.forEach(item => {
            if (item === value) {
                result = true;
            }

            let regExpBody  = /^\/(.*)\/\w*$/.exec(item)[1];
            let regExpFlags = /^\/.*\/(\w*)$/.exec(item)[1];
            let regExp      = new RegExp(regExpBody, regExpFlags);

            if (value.match(regExp)) {
                result = true;
            }
        });

        return result;
    }

    /**
     * Get the string matching the given pattern.
     *
     * @param { string } pattern
     * @param { string } subject
     *
     * @return { array }
     */
    static matchAll(pattern, subject) {
        const regExpBody  = /^\/(.*)\/\w*$/.exec(pattern)[1];
        const regExpFlags = /^\/.*\/(\w*)$/.exec(pattern)[1];
        const regExp      = new RegExp(regExpBody, regExpFlags + (regExpFlags.indexOf('g') !== -1 ? '' : 'g'));
        const matches     = [...subject.matchAll(regExp)];

        if (matches.length === 0) {
            return [];
        }

        return matches.map(match => match[0]);
    }

    /**
     * Pad both sides of a string with another.
     *
     * @param { string } value
     * @param { number } length
     * @param { string } pad
     *
     * @return { string }
     */
    static padBoth(value, length, pad = ' ') {
        const short      = Math.max(0, length - value.length);
        const shortLeft  = Math.floor(short / 2);
        const shortRight = Math.ceil(short / 2);

        return pad.repeat(shortLeft).substring(0, shortLeft) + value + pad.repeat(shortRight).substring(0, shortRight);
    }

    /**
     * Pad the left side of a string with another.
     *
     * @param { string } value
     * @param { number } length
     * @param { string } pad
     *
     * @return { string }
     */
    static padLeft(value, length, pad = ' ') {
        const short = Math.max(0, length - value.length);

        return pad.repeat(short).substring(0, short) + value;
    }

    /**
     * Pad the right side of a string with another.
     *
     * @param { string } value
     * @param { number } length
     * @param { string } pad
     *
     * @return { string }
     */
    static padRight(value, length, pad = ' ') {
        const short = Math.max(0, length - value.length);

        return value + pad.repeat(short).substring(0, short);
    }

    /**
     * Parse a Class[@]method style callback into class and method.
     *
     * @param { string } callback
     * @param { string|null } $default
     *
     * @return { array }
     */
    static parseCallback(callback, $default = null) {
        console.error(`Method 'parseCallback' not implemented.`);
    }

    /**
     * Get the plural form of an English word.
     *
     * @param { string } value
     * @param { number|array } count
     *
     * @return { string }
     */
    static plural(value, count = 2) {
        if (count !== undefined && count === 1) {
            return value;
        }

        /**
         * List of rules for plural words.
         *
         * @type { object }
         */
        const plural = {
            '(quiz)$'                    : '$1zes',
            '^(ox)$'                     : '$1en',
            '([m|l])ouse$'               : '$1ice',
            '(matr|vert|ind)ix|ex$'      : '$1ices',
            '(x|ch|ss|sh)$'              : '$1es',
            '([^aeiouy]|qu)y$'           : '$1ies',
            '(hive)$'                    : '$1s',
            '(?:([^f])fe|([lr])f)$'      : '$1$2ves',
            '(shea|lea|loa|thie)f$'      : '$1ves',
            'sis$'                       : 'ses',
            '([ti])um$'                  : '$1a',
            '(tomat|potat|ech|her|vet)o$': '$1oes',
            '(bu)s$'                     : '$1ses',
            '(alias)$'                   : '$1es',
            '(octop)us$'                 : '$1i',
            '(ax|test)is$'               : '$1es',
            '(us)$'                      : '$1es',
            '([^s]+)$'                   : '$1s',
        };

        /**
         * List of words that change irregularly.
         *
         * @type { object }
         */
        const irregular = {
            'move'  : 'moves',
            'foot'  : 'feet',
            'goose' : 'geese',
            'sex'   : 'sexes',
            'child' : 'children',
            'man'   : 'men',
            'tooth' : 'teeth',
            'person': 'people',
        };

        /**
         * List of words that do not change.
         *
         * @type { String[] }
         */
        const uncountable = [
            'sheep',
            'fish',
            'deer',
            'moose',
            'series',
            'species',
            'money',
            'rice',
            'information',
            'equipment',
            'bison',
            'cod',
            'offspring',
            'pike',
            'salmon',
            'shrimp',
            'swine',
            'trout',
            'aircraft',
            'hovercraft',
            'spacecraft',
            'sugar',
            'tuna',
            'you',
            'wood',
        ];

        if (uncountable.indexOf(value.toLowerCase()) >= 0) {
            return value;
        }

        for (const word in irregular) {
            const pattern = new RegExp(`${word}$`, 'i');

            if (pattern.test(value)) {
                return value.replace(pattern, irregular[word]);
            }
        }

        for (const word in plural) {
            const pattern = new RegExp(word, 'i');

            if (pattern.test(value)) {
                return value.replace(pattern, plural[word]);
            }
        }

        return value;
    }

    /**
     * Pluralize the last word of an English, studly caps case string.
     *
     * @param { string } value
     * @param { number|array } count
     *
     * @return { string }
     */
    static pluralStudly(value, count = 2) {
        const parts = value.split(/(.)(?=[A-Z])/);

        const lastWord = parts.pop();

        return parts.join('') + this.ucfirst(this.plural(lastWord, count));
    }

    /**
     * Generate a more truly "random" alpha-numeric string.
     *
     * @param { number } length
     *
     * @return { string }
     */
    static random(length = 16) {
        let byteSize = Math.ceil((length) / 3) * 3;

        let bytes = crypto.getRandomValues(new Uint8Array(byteSize)).join('');

        let string = btoa(bytes);

        ['/', '+', '='].forEach(char => string = string.replace(char, ''));

        return string.substring(0, length);
    }

    /**
     * Repeat the given string.
     *
     * @param { string } string
     * @param { number } times

     * @return { string }
     */
    static repeat(string, times = 1) {
        return string.repeat(times);
    }

    /**
     * Replace a given value in the string sequentially with an array.
     *
     * @param { array } replace
     * @param { string } subject
     * @param { string } search
     *
     * @return { string }
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
     * @param { string|array } search
     * @param { string } replace
     * @param { string } subject
     *
     * @return { string }
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
     * @param { string } search
     * @param { string } replace
     * @param { string } subject
     *
     * @return { string }
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
     * @param { string } search
     * @param { string } replace
     * @param { string } subject
     *
     * @return { string }
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
     * @param { string } search
     * @param { string } subject
     * @param { boolean } caseSensitive
     *
     * @return { string }
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
     * @param { string } value
     *
     * @return { string }
     */
    static reverse(value) {
        return value.split('').reverse().join('');
    }

    /**
     * Begin a string with a single instance of a given value.
     *
     * @param { string } value
     * @param { string } prefix
     *
     * @return { string }
     */
    static start(value, prefix) {
        const quoted = preg_quote(prefix, '/');

        return prefix + value.replace(new RegExp(`^(?:${quoted})+`, 'u'), '');
    }

    /**
     * Convert the given string to upper-case.
     *
     * @param { string } value
     *
     * @return { string }
     */
    static upper(value) {
        return value.toUpperCase();
    }

    /**
     * Convert the given string to title case.
     *
     * @param { string } value
     *
     * @return { string }
     */
    static title(value) {
        return value.split(/[^A-Za-z]/).map(word => this.ucfirst(word)).join(' ');
    }

    /**
     * Convert the given string to title case for each word.
     *
     * @param { string } value
     *
     * @return { string }
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
     * @param { string } value
     *
     * @return { string }
     */
    static singular(value) {
        /**
         * List of rules for singular words.
         *
         * @type { object }
         */
        const singular = {
            '(quiz)zes$'                                                   : '$1',
            '(matr)ices$'                                                  : '$1ix',
            '(vert|ind)ices$'                                              : '$1ex',
            '^(ox)en$'                                                     : '$1',
            '(alias)es$'                                                   : '$1',
            '(octop|vir)i$'                                                : '$1us',
            '(cris|ax|test)es$'                                            : '$1is',
            '(shoe)s$'                                                     : '$1',
            '(o)es$'                                                       : '$1',
            '(bus)es$'                                                     : '$1',
            '([m|l])ice$'                                                  : '$1ouse',
            '(x|ch|ss|sh)es$'                                              : '$1',
            '(m)ovies$'                                                    : '$1ovie',
            '(s)eries$'                                                    : '$1eries',
            '([^aeiouy]|qu)ies$'                                           : '$1y',
            '([lr])ves$'                                                   : '$1f',
            '(tive)s$'                                                     : '$1',
            '(hive)s$'                                                     : '$1',
            '(li|wi|kni)ves$'                                              : '$1fe',
            '(shea|loa|lea|thie)ves$'                                      : '$1f',
            '(^analy)ses$'                                                 : '$1sis',
            '((a)naly|(b)a|(d)iagno|(p)arenthe|(p)rogno|(s)ynop|(t)he)ses$': '$1$2sis',
            '([ti])a$'                                                     : '$1um',
            '(n)ews$'                                                      : '$1ews',
            '(h|bl)ouses$'                                                 : '$1ouse',
            '(corpse)s$'                                                   : '$1',
            '(us)es$'                                                      : '$1',
            's$'                                                           : '',
        };

        /**
         * List of words that change irregularly.
         *
         * @type { object }
         */
        const irregular = {
            'move'  : 'moves',
            'foot'  : 'feet',
            'goose' : 'geese',
            'sex'   : 'sexes',
            'child' : 'children',
            'man'   : 'men',
            'tooth' : 'teeth',
            'person': 'people',
        };

        /**
         * List of words that do not change.
         *
         * @type { String[] }
         */
        const uncountable = [
            'sheep',
            'fish',
            'deer',
            'moose',
            'series',
            'species',
            'money',
            'rice',
            'information',
            'equipment',
            'bison',
            'cod',
            'offspring',
            'pike',
            'salmon',
            'shrimp',
            'swine',
            'trout',
            'aircraft',
            'hovercraft',
            'spacecraft',
            'sugar',
            'tuna',
            'you',
            'wood',
        ];

        if (uncountable.indexOf(value.toLowerCase()) >= 0) {
            return value;
        }

        for (const word in irregular) {
            const pattern = new RegExp(`${irregular[word]}$`, 'i');

            if (pattern.test(value)) {
                return value.replace(pattern, word);
            }
        }

        for (const word in singular) {
            const pattern = new RegExp(word, 'i');

            if (pattern.test(value)) {
                return value.replace(pattern, singular[word]);
            }
        }

        return value;
    }

    /**
     * Generate a URL friendly "slug" from a given string.
     *
     * @param { string } title
     * @param { string } separator
     * @param { object } dictionary
     *
     * @return { string }
     */
    static slug(title, separator = '-', dictionary = { '@': 'at' }) {
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
     * @param { string } value
     * @param { string } delimiter
     *
     * @return { string }
     */
    static snake(value, delimiter = '_') {
        value = ucwords(value).replace(new RegExp(/\s+/, 'u'), '');

        value = this.lower(value.replace(/(.)(?=[A-Z])/ug, `${delimiter}`));

        return value;
    }

    /**
     * Remove all "extra" blank space from the given string.
     *
     * @param { string } value
     *
     * @return { string }
     */
    static squish(value) {
        return value.replace(/\s\s+/g, ' ').trim();
    }

    /**
     * Determine if a given string starts with a given substring.
     *
     * @param { string } haystack
     * @param { string|array } needles
     *
     * @return { boolean }
     */
    static startsWith(haystack, needles) {
        let result = false;

        if (!(needles instanceof Array)) {
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
     * @param { string } value
     *
     * @return { string }
     */
    static studly(value) {
        const words = this.replace(['-', '_'], '', value).split(' ');

        const studlyWords = words.map(word => this.ucfirst(word));

        return studlyWords.join('');
    }

    /**
     * Returns the portion of the string specified by the start and length parameters.
     *
     * @param { string } string
     * @param { number } start
     * @param { number|null } length
     *
     * @return { string }
     */
    static substr(string, start, length = null) {
        return string.substring(start, start + length);
    }

    /**
     * Returns the number of substring occurrences.
     *
     * @param { string } haystack
     * @param { string } needle
     * @param { number } offset
     * @param { number|null } length
     *
     * @return { number }
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
     * @param { string } string
     * @param { string } replace
     * @param { number } offset
     * @param { number|null } length
     *
     * @return { string }
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
     * @param { object } map
     * @param { string } subject
     *
     * @return { string }
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
     * @param { string } string
     *
     * @return { string }
     */
    static lcfirst(string) {
        return this.lower(this.substr(string, 0, 1)) + this.substr(string, 1, string.length);
    }

    /**
     * Make a string's first character uppercase.
     *
     * @param { string } string
     *
     * @return { string }
     */
    static ucfirst(string) {
        return this.upper(this.substr(string, 0, 1)) + this.substr(string, 1, string.length);
    }

    /**
     * Split a string into pieces by uppercase characters.
     *
     * @param { string } string
     *
     * @return { array }
     */
    static ucsplit(string) {
        return string.split(new RegExp(/(?=\p{Lu})/, 'u'));
    }

    /**
     * Get the number of words a string contains.
     *
     * @param { string } string
     * @param { string|null } characters
     *
     * @return { number }
     */
    static wordCount(string, characters = null) {
        return string.split(/[\s]+/).length;
    }

    /**
     * Generate a UUID (version 4).
     *
     * @return { string }
     */
    static uuid() {
        let time = parseInt((Math.random() * 10000000000000000).toString().substring(0, 13));

        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (character) {
            let randomChar = (time + Math.random() * 16) % 16 | 0;
            time           = Math.floor(time / 16);

            return (character === 'x' ? randomChar : (randomChar & 0x3 | 0x8)).toString(16);
        });
    }

    /**
     * Generate a time-ordered UUID (version 4).
     *
     * @return { string }
     */
    static orderedUuid() {
        let time = new Date().getTime();

        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (character) {
            let randomChar = (time + Math.random() * 16) % 16 | 0;
            time           = Math.floor(time / 16);

            return (character === 'x' ? randomChar : (randomChar & 0x3 | 0x8)).toString(16);
        });
    }

    /**
     * Generate a ULID.
     *
     * @return { string }
     */
    static ulid() {
        const encoding       = '0123456789ABCDEFGHJKMNPQRSTVWXYZ';
        const encodingLength = encoding.length;
        const timeLength     = 10;
        const randomLength   = 16;

        /**
         * Generate random Encoding Time.
         *
         * @return { string }
         */
        function generateEncodedTime() {
            let encodedTime = '';
            let now         = new Date().getTime();

            for (let length = timeLength; length > 0; length--) {
                const mod   = now % encodingLength;
                encodedTime = encoding.charAt(mod) + encodedTime;
                now         = (now - mod) / encodingLength;
            }

            return encodedTime;
        }

        /**
         * Generate random Number.
         *
         * @return { number }
         */
        function generateRandomNumber() {
            const buffer = new Uint8Array(1);
            crypto.getRandomValues(buffer);

            return buffer[0] / 0xff;
        }

        /**
         * Generate random String.
         *
         * @return { string }
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
};

/**
 * Get a new Stringable object from the given string.
 *
 * @param { string } string The underlying string value.
 *
 * @return { Stringable } Stringable object.
 */
module.exports = str = function (string = null) {
    return Str.of(string);
};

/**
 * Quote regular expression characters.
 *
 * @param { string } string The input string.
 * @param { string|null } delimiter If the optional delimiter is specified, it will also be escaped.
 * This is useful for escaping the delimiter that is required by the PCRE functions.
 * The / is the most commonly used delimiter.
 *
 * @return { string } The quoted (escaped) string.
 */
function preg_quote(string, delimiter = null) {
    return (string + '').replace(new RegExp('[.\\\\+*?\\[\\^\\]$(){}=!<>|:\\' + (delimiter || '') + '-]', 'g'), '\\$&');
}

/**
 * Uppercase the first character of each word in a string
 *
 * @param { string } string The input string.
 * @param { string } separators The optional separators contains the word separator characters.

 * @return { string } String the modified string.
 */
function ucwords(string, separators = ' \t\r\n\f\v') {
    return string.split(' ').map(word => word[0].toUpperCase() + word.substring(1)).join(' ');
}