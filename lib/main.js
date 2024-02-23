"use strict";
class Str {
    /**
     * Get a new Stringable object from the given string.
     *
     * @param { string } string
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
     *
     * @return { string }
     */
    static ascii(value) {
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
        var _a;
        if (search === '') {
            return subject;
        }
        const position = (_a = subject.lastIndexOf(search)) !== null && _a !== void 0 ? _a : null;
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
     * @param { string | array } needles
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
        needles.forEach((needle) => {
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
        needles.forEach((needle) => {
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
     * @param { string | array } needles
     *
     * @return { boolean }
     */
    static endsWith(haystack, needles) {
        let result = false;
        if (!(needles instanceof Array)) {
            needles = [needles];
        }
        needles.forEach((needle) => {
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
     * @return { string | null }
     */
    static excerpt(text, phrase = '', options = {}) {
        var _a, _b;
        const radius = (_a = options.radius) !== null && _a !== void 0 ? _a : 100;
        const omission = (_b = options.omission) !== null && _b !== void 0 ? _b : '...';
        const results = text.split(phrase);
        if (results.length === 1) {
            return null;
        }
        const matches = [text, results[0], phrase, results.splice(1).join(phrase)];
        let start = matches[1].trimStart();
        let end = matches[3].trimEnd();
        start = this.of(this.substr(start, Math.max((start.length - radius), 0)))
            .ltrim()
            // @ts-ignore
            .unless((startWithRadius) => startWithRadius.exactly(start), (startWithRadius) => startWithRadius.prepend(omission))
            .toString();
        end = this.of(this.substr(end, 0, radius))
            .rtrim()
            // @ts-ignore
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
        return value.endsWith(cap) ? value : value + cap;
    }
    /**
     * Wrap the string with the given strings.
     *
     * @param { string } value
     * @param { string } before
     * @param { string | null } after
     *
     * @return string
     */
    static wrap(value, before, after = null) {
        return before + value + (after !== null && after !== void 0 ? after : before);
    }
    /**
     * Determine if a given string matches a given pattern.
     *
     * @param { string | array } pattern
     * @param { string } value
     *
     * @return { boolean }
     */
    static is(pattern, value) {
        let result = false;
        if (!(pattern instanceof Array)) {
            pattern = [pattern];
        }
        pattern.forEach((item) => {
            if (item === value) {
                result = true;
            }
            item = preg_quote(item, '#');
            item = item.replace(/\\\*/g, '.*');
            if (RegExp(value).exec(item)) {
                result = true;
            }
        });
        return result;
    }
    /**
     * Determine if a given string is 7-bit ASCII.
     *
     * @param { string } value
     *
     * @return { boolean }
     */
    static isAscii(value) {
        return !/[^ -~\t\r\n]/.test(value);
    }
    /**
     * Determine if a given string is valid JSON.
     *
     * @param { string } value
     *
     * @return { boolean }
     */
    static isJson(value) {
        try {
            JSON.parse(value);
        }
        catch (JsonException) {
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
        var _a;
        if (value.length !== 26) {
            return false;
        }
        if (value.length !== ((_a = value.match(/[0123456789ABCDEFGHJKMNPQRSTVWXYZabcdefghjkmnpqrstvwxyz]/g)) === null || _a === void 0 ? void 0 : _a.length)) {
            return false;
        }
        return Number(value.charAt(0)) <= 7;
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
        var _a, _b;
        const wordsArray = (_b = (_a = value.match(/\S+\s*/g)) === null || _a === void 0 ? void 0 : _a.splice(0, words)) !== null && _b !== void 0 ? _b : [];
        const result = wordsArray.join('');
        if (wordsArray.length === 1 || this.length(value) === this.length(result)) {
            return value;
        }
        return result.trim() + end;
    }
    /**
     * Masks a portion of a string with a repeated character.
     *
     * @param { string } string
     * @param { string } character
     * @param { number } index
     * @param { number | null } length
     *
     * @return { string }
     */
    static mask(string, character, index, length = null) {
        if (character === '') {
            return string;
        }
        let start = index;
        let endIndex = length !== null && length !== void 0 ? length : string.length;
        if (start < 0) {
            start = string.length + start;
            endIndex = start + (length !== null && length !== void 0 ? length : 0);
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
     * @param { string } pattern
     * @param { string } subject
     *
     * @return { string }
     */
    static match(pattern, subject) {
        var _a;
        // @ts-ignore
        const regExpBody = /^\/(.*)\/\w*$/.exec(pattern)[1];
        // @ts-ignore
        const regExpFlags = /^\/.*\/(\w*)$/.exec(pattern)[1];
        const regExp = new RegExp(regExpBody, regExpFlags);
        const matches = RegExp(regExp).exec(subject);
        if (!matches) {
            return '';
        }
        return (_a = matches[1]) !== null && _a !== void 0 ? _a : matches[0];
    }
    /**
     * Determine if a given string matches a given pattern.
     *
     * @param { string | array } pattern
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
            // @ts-ignore
            let regExpBody = /^\/(.*)\/\w*$/.exec(item)[1];
            // @ts-ignore
            let regExpFlags = /^\/.*\/(\w*)$/.exec(item)[1];
            let regExp = new RegExp(regExpBody, regExpFlags);
            if (RegExp(regExp).exec(value)) {
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
        // @ts-ignore
        const regExpBody = /^\/(.*)\/\w*$/.exec(pattern)[1];
        // @ts-ignore
        const regExpFlags = /^\/.*\/(\w*)$/.exec(pattern)[1];
        const regExp = new RegExp(regExpBody, regExpFlags + (regExpFlags.indexOf('g') !== -1 ? '' : 'g'));
        const matches = [...subject.matchAll(regExp)];
        if (matches.length === 0) {
            return [];
        }
        return matches.map((match) => match[1]);
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
        const short = Math.max(0, length - value.length);
        const shortLeft = Math.floor(short / 2);
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
     * Get the plural form of an English word.
     *
     * @param { string } value
     * @param { number | array } count
     *
     * @return { string }
     */
    static plural(value, count = 2) {
        const isCapital = /[A-Z]/.test(value.charAt(0));
        if (count !== undefined && count === 1) {
            return value;
        }
        /**
         * List of rules for plural words.
         *
         * @type { object }
         */
        const plural = {
            '(quiz)$': '$1zes',
            '^(ox)$': '$1en',
            '([m|l])ouse$': '$1ice',
            '(matr|vert|ind)ix|ex$': '$1ices',
            '(x|ch|ss|sh)$': '$1es',
            '([^aeiouy]|qu)y$': '$1ies',
            '(hive)$': '$1s',
            '(?:([^f])fe|([lr])f)$': '$1$2ves',
            '(shea|lea|loa|thie)f$': '$1ves',
            'sis$': 'ses',
            '([ti])um$': '$1a',
            '(tomat|potat|ech|her|vet)o$': '$1oes',
            '(bu)s$': '$1ses',
            '(alias)$': '$1es',
            '(octop)us$': '$1i',
            '(ax|test)is$': '$1es',
            '(us)$': '$1es',
            '([^s]+)$': '$1s',
        };
        /**
         * List of words that change irregularly.
         *
         * @type { object }
         */
        const irregular = {
            'move': 'moves',
            'foot': 'feet',
            'goose': 'geese',
            'sex': 'sexes',
            'child': 'children',
            'man': 'men',
            'tooth': 'teeth',
            'person': 'people',
        };
        /**
         * List of words that do not change.
         *
         * @type { string[] }
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
                value = value.replace(pattern, irregular[word]);
                return isCapital ? this.ucfirst(value) : value;
            }
        }
        for (const word in plural) {
            const pattern = new RegExp(word, 'i');
            if (pattern.test(value)) {
                value = value.replace(pattern, plural[word]);
                return isCapital ? this.ucfirst(value) : value;
            }
        }
        return isCapital ? this.ucfirst(value) : value;
    }
    /**
     * Pluralize the last word of an English, studly caps case string.
     *
     * @param { string } value
     * @param { number | array } count
     *
     * @return { string }
     */
    static pluralStudly(value, count = 2) {
        const parts = value.split(/(.)(?=[A-Z])/);
        const lastWord = parts.pop();
        return parts.join('') + this.ucfirst(this.plural(lastWord, count));
    }
    /**
     * Generate a random, secure password.
     *
     * @param { number } length
     * @param { boolean } letters
     * @param { boolean } numbers
     * @param { boolean } symbols
     * @param { boolean } spaces
     *
     * @return { string }
     */
    static password(length = 32, letters = true, numbers = true, symbols = true, spaces = false) {
        let password = [];
        let collection = [];
        while (password.length < length) {
            if (letters) {
                collection = collection.concat([
                    'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k',
                    'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v',
                    'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G',
                    'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R',
                    'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z',
                ]);
            }
            if (numbers) {
                collection = collection.concat([
                    '0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
                ]);
            }
            if (symbols) {
                collection = collection.concat([
                    '~', '!', '#', '$', '%', '^', '&', '*', '(', ')', '-',
                    '_', '.', ',', '<', '>', '?', '/', '\\', '{', '}', '[',
                    ']', '|', ':', ';',
                ]);
            }
            if (spaces) {
                collection = collection.concat([' ']);
            }
            password.push(collection[Math.floor(Math.random() * collection.length)]);
        }
        return password.join('');
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
        ['/', '+', '='].forEach((char) => string = string.replace(char, ''));
        return string.substring(0, length);
    }
    /**
     * Replace a given value in the string sequentially with an array.
     *
     * @param { string[] } replace
     * @param { string } subject
     * @param { string } search
     *
     * @return { string }
     */
    static replaceArray(search, replace, subject) {
        const segments = subject.split(search);
        let result = segments.shift();
        segments.forEach((segment) => { var _a; return result += ((_a = replace.shift()) !== null && _a !== void 0 ? _a : search) + segment; });
        return result;
    }
    /**
     * Replace the given value in the given string.
     *
     * @param { string | string[] } search
     * @param { string } replace
     * @param { string } subject
     * @param { boolean } caseSensitive
     *
     * @return { string }
     */
    static replace(search, replace, subject, caseSensitive = true) {
        if (!(search instanceof Array)) {
            search = [search];
        }
        search.forEach((term) => {
            if (!caseSensitive) {
                term = new RegExp(term, 'gi');
            }
            subject = subject.replaceAll(term, replace);
        });
        return subject;
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
        if (position !== 0) {
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
        if (position !== 0) {
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
        return value.split(/[^A-Za-z]/)
            .map((word) => {
            return this.ucfirst(word[0] + word.substring(1).toLowerCase());
        })
            .join(' ');
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
            ? parts.map((part) => this.title(part))
            : this.ucsplit(parts.join('_')).map((part) => this.title(part));
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
        const isCapital = /[A-Z]/.test(value.charAt(0));
        /**
         * List of rules for singular words.
         *
         * @type { object }
         */
        const singular = {
            '(quiz)zes$': '$1',
            '(matr)ices$': '$1ix',
            '(vert|ind)ices$': '$1ex',
            '^(ox)en$': '$1',
            '(alias)es$': '$1',
            '(octop|vir)i$': '$1us',
            '(cris|ax|test)es$': '$1is',
            '(shoe)s$': '$1',
            '(o)es$': '$1',
            '(bus)es$': '$1',
            '([m|l])ice$': '$1ouse',
            '(x|ch|ss|sh)es$': '$1',
            '(m)ovies$': '$1ovie',
            '(s)eries$': '$1eries',
            '([^aeiouy]|qu)ies$': '$1y',
            '([lr])ves$': '$1f',
            '(tive)s$': '$1',
            '(hive)s$': '$1',
            '(li|wi|kni)ves$': '$1fe',
            '(shea|loa|lea|thie)ves$': '$1f',
            '(^analy)ses$': '$1sis',
            '((a)naly|(b)a|(d)iagno|(p)arenthe|(p)rogno|(s)ynop|(t)he)ses$': '$1$2sis',
            '([ti])a$': '$1um',
            '(n)ews$': '$1ews',
            '(h|bl)ouses$': '$1ouse',
            '(corpse)s$': '$1',
            '(us)es$': '$1',
            's$': '',
        };
        /**
         * List of words that change irregularly.
         *
         * @type { object }
         */
        const irregular = {
            'move': 'moves',
            'foot': 'feet',
            'goose': 'geese',
            'sex': 'sexes',
            'child': 'children',
            'man': 'men',
            'tooth': 'teeth',
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
                value = value.replace(pattern, word);
                return isCapital ? this.ucfirst(value) : value;
            }
        }
        for (const word in singular) {
            const pattern = new RegExp(word, 'i');
            if (pattern.test(value)) {
                value = value.replace(pattern, singular[word]);
                return isCapital ? this.ucfirst(value) : value;
            }
        }
        return isCapital ? this.ucfirst(value) : value;
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
        title = this.lower(title).replace('![^' + preg_quote(separator) + 'pLpNs]+!u', '');
        // Replace all separator characters and whitespace by a single separator
        return title.replaceAll(/\s/g, separator).replace(new RegExp('\\' + separator + '+', 'g'), separator);
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
        value = this.lower(value.replace(new RegExp(/(.)(?=[A-Z])/, 'ug'), `$1${delimiter}`));
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
     * @param { string | array } needles
     *
     * @return { boolean }
     */
    static startsWith(haystack, needles) {
        let result = false;
        if (!(needles instanceof Array)) {
            needles = [needles];
        }
        needles.forEach((needle) => {
            if (needle !== '' && haystack.startsWith(needle)) {
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
        const words = this.replace(['-', '_'], ' ', value).split(' ');
        const studlyWords = words.map((word) => this.ucfirst(word));
        return studlyWords.join('');
    }
    /**
     * Returns the portion of the string specified by the start and length parameters.
     *
     * @param { string } string
     * @param { number } start
     * @param { number | null } length
     *
     * @return { string }
     */
    static substr(string, start, length = null) {
        if (start < 0) {
            start = string.length + start;
            if (start < 0) {
                start = 0;
            }
        }
        if (length !== null && length < 0) {
            return '';
        }
        if (length === 0) {
            return string.substring(start);
        }
        return string.substring(start, start + length);
    }
    /**
     * Returns the number of substring occurrences.
     *
     * @param { string } haystack
     * @param { string } needle
     * @param { number } offset
     * @param { number | null } length
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
     * @param { number | null } length
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
     *
     * @return { number }
     */
    static wordCount(string) {
        return string.split(/\s+/).length;
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
            time = Math.floor(time / 16);
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
            time = Math.floor(time / 16);
            return (character === 'x' ? randomChar : (randomChar & 0x3 | 0x8)).toString(16);
        });
    }
    /**
     * Generate a ULID.
     *
     * @return { string }
     */
    static ulid() {
        const encoding = '0123456789ABCDEFGHJKMNPQRSTVWXYZ';
        const encodingLength = encoding.length;
        const timeLength = 10;
        const randomLength = 16;
        /**
         * Generate random Encoding Time.
         *
         * @return { string }
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
         * @return { number }
         */
        function generateRandomNumber() {
            const buffer = new Uint8Array(1);
            crypto.getRandomValues(buffer);
            // @ts-ignore
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
}
const str = function (string) {
    if (arguments.length === 0) {
        return Str;
    }
    return Str.of(string);
};
class Stringable {
    /**
     * Create a new instance of the class.
     *
     * @param { string } value
     */
    constructor(value = '') {
        /**
         * The underlying string value.
         *
         * @type { string }
         */
        Object.defineProperty(this, "value", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.value = value;
    }
    /**
     * Return the remainder of a string after the first occurrence of a given value.
     *
     * @param { string } search
     *
     * @return { this }
     */
    after(search) {
        return new Stringable(Str.after(this.value, search));
    }
    /**
     * Return the remainder of a string after the last occurrence of a given value.
     *
     * @param { string } search
     *
     * @return { this }
     */
    afterLast(search) {
        return new Stringable(Str.afterLast(this.value, search));
    }
    /**
     * Append the given values to the string.
     *
     * @param { string | string[] } values
     *
     * @return { this }
     */
    append(...values) {
        return new Stringable(this.value + values.join(''));
    }
    /**
     * Append a new line to the string.
     *
     * @param { number } count
     *
     * @return { this }
     */
    newLine(count = 1) {
        return this.append('\n'.repeat(count));
    }
    /**
     * Transliterate a UTF-8 value to ASCII.
     *
     * @return { this }
     */
    ascii() {
        return new Stringable(Str.ascii(this.value));
    }
    /**
     * Get the trailing name component of the path.
     *
     * @param { string } suffix
     *
     * @return { this }
     */
    basename(suffix = '') {
        let basename = this.value;
        if (this.value.split('/')[0] !== this.value) {
            basename = this.value.split('/').pop();
        }
        if (this.value.split('\\')[0] !== this.value) {
            basename = this.value.split('\\').pop();
        }
        if (suffix !== '') {
            basename = basename.replace(suffix, '');
        }
        return new Stringable(basename);
    }
    /**
     * Get the basename of the class path.
     *
     * @return { this }
     */
    classBasename() {
        return this.basename();
    }
    /**
     * Get the portion of a string before the first occurrence of a given value.
     *
     * @param { string } search
     *
     * @return { this }
     */
    before(search) {
        return new Stringable(Str.before(this.value, search));
    }
    /**
     * Get the portion of a string before the last occurrence of a given value.
     *
     * @param { string } search
     *
     * @return { this }
     */
    beforeLast(search) {
        return new Stringable(Str.beforeLast(this.value, search));
    }
    /**
     * Get the portion of a string between two given values.
     *
     * @param { string } from
     * @param { string } to
     *
     * @return { this }
     */
    between(from, to) {
        return new Stringable(Str.between(this.value, from, to));
    }
    /**
     * Get the smallest possible portion of a string between two given values.
     *
     * @param { string } from
     * @param { string } to
     *
     * @return { this }
     */
    betweenFirst(from, to) {
        return new Stringable(Str.betweenFirst(this.value, from, to));
    }
    /**
     * Convert a value to camel case.
     *
     * @return { this }
     */
    camel() {
        return new Stringable(Str.camel(this.value));
    }
    /**
     * Determine if a given string contains a given substring.
     *
     * @param  { string | array } needles
     * @param  { boolean } ignoreCase
     *
     * @return { boolean }
     */
    contains(needles, ignoreCase = false) {
        return Str.contains(this.value, needles, ignoreCase);
    }
    /**
     * Determine if a given string contains all array values.
     *
     * @param { array } needles
     * @param { boolean } ignoreCase
     *
     * @return { boolean }
     */
    containsAll(needles, ignoreCase = false) {
        return Str.containsAll(this.value, needles, ignoreCase);
    }
    /**
     * Get the parent directory's path.
     *
     * @param { number } levels
     *
     * @return { this }
     */
    dirname(levels = 1) {
        let dirname = this.value;
        let parts = [];
        let isValidDirname = false;
        let hasValidLevels = false;
        if (this.value.split('/')[0] !== this.value) {
            parts = this.value.split('/');
            dirname = parts.slice(0, parts.length - levels).join('/');
            isValidDirname = true;
            hasValidLevels = parts.length <= levels + 1;
        }
        if (this.value.split('\\')[0] !== this.value) {
            parts = this.value.split('\\');
            dirname = parts.slice(0, parts.length - levels).join('\\');
            isValidDirname = true;
            hasValidLevels = parts.length <= levels + 1;
        }
        if (!isValidDirname) {
            dirname = '.';
        }
        if (isValidDirname && hasValidLevels) {
            dirname = '\\';
        }
        return new Stringable(dirname);
    }
    /**
     * Determine if a given string ends with a given substring.
     *
     * @param { string | array } needles
     *
     * @return { boolean }
     */
    endsWith(needles) {
        return Str.endsWith(this.value, needles);
    }
    /**
     * Determine if the string is an exact match with the given value.
     *
     * @param { Stringable|string } value
     *
     * @return { boolean }
     */
    exactly(value) {
        if (value instanceof Stringable) {
            value = value.toString();
        }
        return this.value === value;
    }
    /**
     * Extracts an excerpt from text that matches the first instance of a phrase.
     *
     * @param { string } phrase
     * @param { object } options
     *
     * @return { string | null }
     */
    excerpt(phrase = '', options = {}) {
        return Str.excerpt(this.value, phrase, options);
    }
    /**
     * Explode the string into an array.
     *
     * @param { string } delimiter
     * @param { number } limit
     *
     * @return { array }
     */
    explode(delimiter, limit = 0) {
        if (limit === 0) {
            return [this.value];
        }
        let wordsArray = this.value.split(delimiter);
        const position = limit - 1 >= wordsArray.length
            ? wordsArray.length - 1
            : limit - 1;
        wordsArray = [...wordsArray.slice(0, position), wordsArray.splice(position).join(' ')];
        return wordsArray;
    }
    /**
     * Split a string using a regular expression or by length.
     *
     * @param { string } pattern
     * @param { number } limit
     *
     * @return { array }
     */
    split(pattern, limit = -1) {
        var _a;
        // @ts-ignore
        const regExpBody = (/^\/(.*)\/\w*$/.exec(pattern)[1]);
        // @ts-ignore
        const regExpFlags = /^\/.*\/(\w*)$/.exec(pattern)[1];
        const regExp = new RegExp(regExpBody, regExpFlags + (regExpFlags.indexOf('g') !== -1 ? '' : 'g'));
        let segments = this.value.split(regExp);
        if (limit !== -1) {
            const position = limit - 1 >= segments.length
                ? segments.length - 1
                : limit - 1;
            segments = [...segments.slice(0, position), segments.splice(position).join('')];
        }
        return (_a = segments.map((segment) => segment.trim())) !== null && _a !== void 0 ? _a : [];
    }
    /**
     * Cap a string with a single instance of a given value.
     *
     * @param { string } cap
     *
     * @return { this }
     */
    finish(cap) {
        return new Stringable(Str.finish(this.value, cap));
    }
    /**
     * Determine if a given string matches a given pattern.
     *
     * @param { string | array } pattern
     *
     * @return { boolean }
     */
    is(pattern) {
        return Str.is(pattern, this.value);
    }
    /**
     * Determine if a given string is 7 bit ASCII.
     *
     * @return { boolean }
     */
    isAscii() {
        return Str.isAscii(this.value);
    }
    /**
     * Determine if a given string is valid JSON.
     *
     * @return { boolean }
     */
    isJson() {
        return Str.isJson(this.value);
    }
    /**
     * Determine if a given string is a valid UUID.
     *
     * @return { boolean }
     */
    isUuid() {
        return Str.isUuid(this.value);
    }
    /**
     * Determine if a given string is a valid ULID.
     *
     * @return { boolean }
     */
    isUlid() {
        return Str.isUlid(this.value);
    }
    /**
     * Determine if the given string is empty.
     *
     * @return { boolean }
     */
    isEmpty() {
        return this.value === '';
    }
    /**
     * Determine if the given string is not empty.
     *
     * @return { boolean }
     */
    isNotEmpty() {
        return !this.isEmpty();
    }
    /**
     * Convert a string to kebab case.
     *
     * @return { this }
     */
    kebab() {
        return new Stringable(Str.kebab(this.value));
    }
    /**
     * Return the length of the given string.
     *
     * @return { number }
     */
    length() {
        return Str.length(this.value);
    }
    /**
     * Limit the number of characters in a string.
     *
     * @param { number } limit
     * @param { string } end
     *
     * @return { this }
     */
    limit(limit = 100, end = '...') {
        return new Stringable(Str.limit(this.value, limit, end));
    }
    /**
     * Convert the given string to lower-case.
     *
     * @return { this }
     */
    lower() {
        return new Stringable(Str.lower(this.value));
    }
    /**
     * Masks a portion of a string with a repeated character.
     *
     * @param { string } character
     * @param { number } index
     * @param { number | null }length
     *
     * @return { this }
     */
    mask(character, index, length = null) {
        return new Stringable(Str.mask(this.value, character, index, length));
    }
    /**
     * Get the string matching the given pattern.
     *
     * @param { string } pattern
     *
     * @return { this }
     */
    match(pattern) {
        return new Stringable(Str.match(pattern, this.value));
    }
    /**
     * Determine if a given string matches a given pattern.
     *
     * @param { string | string[] } pattern
     *
     * @return { boolean }
     */
    isMatch(...pattern) {
        return Str.isMatch(pattern, this.value);
    }
    /**
     * Get the string matching the given pattern.
     *
     * @param { string } pattern
     *
     * @return { array }
     */
    matchAll(pattern) {
        return Str.matchAll(pattern, this.value);
    }
    /**
     * Determine if the string matches the given pattern.
     *
     * @param { string } pattern
     *
     * @return { boolean }
     */
    test(pattern) {
        return this.match(pattern).isNotEmpty();
    }
    /**
     * Pad both sides of the string with another.
     *
     * @param { number } length
     * @param { string } pad
     *
     * @return { this }
     */
    padBoth(length, pad = ' ') {
        return new Stringable(Str.padBoth(this.value, length, pad));
    }
    /**
     * Pad the left side of the string with another.
     *
     * @param { number } length
     * @param { string } pad
     *
     * @return { this }
     */
    padLeft(length, pad = ' ') {
        return new Stringable(Str.padLeft(this.value, length, pad));
    }
    /**
     * Pad the right side of the string with another.
     *
     * @param { number } length
     * @param { string } pad
     *
     * @return { this }
     */
    padRight(length, pad = ' ') {
        return new Stringable(Str.padRight(this.value, length, pad));
    }
    /**
     * Call the given callback and return a new string.
     *
     * @param { string | function } callback
     *
     * @return { this }
     */
    pipe(callback) {
        // @ts-ignore
        if (this.value[callback] instanceof Function) {
            // @ts-ignore
            return new Stringable(this.value[callback]());
        }
        // @ts-ignore
        if (window[callback] instanceof Function) {
            // @ts-ignore
            return new Stringable(window[callback](this.value));
        }
        // @ts-ignore
        return new Stringable(callback(this).toString());
    }
    /**
     * Get the plural form of an English word.
     *
     * @param { number } count
     *
     * @return { this }
     */
    plural(count = 2) {
        return new Stringable(Str.plural(this.value, count));
    }
    /**
     * Pluralize the last word of an English, studly caps case string.
     *
     * @param { number } count
     *
     * @return { this }
     */
    pluralStudly(count = 2) {
        return new Stringable(Str.pluralStudly(this.value, count));
    }
    /**
     * Prepend the given values to the string.
     *
     * @param { string | string[] } values
     *
     * @return { this }
     */
    prepend(...values) {
        return new Stringable(values.join('') + this.value);
    }
    /**
     * Remove any occurrence of the given string in the subject.
     *
     * @param { string } search
     * @param { boolean } caseSensitive
     *
     * @return { this }
     */
    remove(search, caseSensitive = true) {
        return new Stringable(Str.remove(search, this.value, caseSensitive));
    }
    /**
     * Reverse the string.
     *
     * @return { this }
     */
    reverse() {
        return new Stringable(Str.reverse(this.value));
    }
    /**
     * Replace the given value in the given string.
     *
     * @param { string | array } search
     * @param { string } replace
     *
     * @return { this }
     */
    replace(search, replace) {
        return new Stringable(Str.replace(search, replace, this.value));
    }
    /**
     * Replace a given value in the string sequentially with an array.
     *
     * @param { string } search
     * @param { array } replace
     *
     * @return { this }
     */
    replaceArray(search, replace) {
        return new Stringable(Str.replaceArray(search, replace, this.value));
    }
    /**
     * Replace the first occurrence of a given value in the string.
     *
     * @param { string } search
     * @param { string } replace
     *
     * @return { this }
     */
    replaceFirst(search, replace) {
        return new Stringable(Str.replaceFirst(search, replace, this.value));
    }
    /**
     * Replace the last occurrence of a given value in the string.
     *
     * @param { string } search
     * @param { string } replace
     *
     * @return { this }
     */
    replaceLast(search, replace) {
        return new Stringable(Str.replaceLast(search, replace, this.value));
    }
    /**
     * Replace the patterns matching the given regular expression.
     *
     * @param { string } pattern
     * @param { string | function } replace
     *
     * @return { this }
     */
    replaceMatches(pattern, replace) {
        // @ts-ignore
        const regExpBody = /^\/(.*)\/\w*$/.exec(pattern)[1];
        // @ts-ignore
        const regExpFlags = /^\/.*\/(\w*)$/.exec(pattern)[1];
        const regExp = new RegExp(regExpBody, regExpFlags + (regExpFlags.indexOf('g') !== -1 ? '' : 'g'));
        if (replace instanceof Function) {
            // @ts-ignore
            this.value.replace(regExp, (matched) => matched);
        }
        return new Stringable(this.value.replace(regExp, replace));
    }
    /**
     * Remove all "extra" blank space from the given string.
     *
     * @return { this }
     */
    squish() {
        return new Stringable(Str.squish(this.value));
    }
    /**
     * Begin a string with a single instance of a given value.
     *
     * @param { string } prefix
     *
     * @return { this }
     */
    start(prefix) {
        return new Stringable(Str.start(this.value, prefix));
    }
    /**
     * Convert the given string to upper-case.
     *
     * @return { this }
     */
    upper() {
        return new Stringable(Str.upper(this.value));
    }
    /**
     * Convert the given string to title case.
     *
     * @return { this }
     */
    title() {
        return new Stringable(Str.title(this.value));
    }
    /**
     * Convert the given string to title case for each word.
     *
     * @return { this }
     */
    headline() {
        return new Stringable(Str.headline(this.value));
    }
    /**
     * Get the singular form of an English word.
     *
     * @return { this }
     */
    singular() {
        return new Stringable(Str.singular(this.value));
    }
    /**
     * Generate a URL friendly "slug" from a given string.
     *
     * @param { string } separator
     * @param { object } dictionary
     *
     * @return { this }
     */
    slug(separator = '-', dictionary = { '@': 'at' }) {
        return new Stringable(Str.slug(this.value, separator, dictionary));
    }
    /**
     * Convert a string to snake case.
     *
     * @param { string } delimiter
     *
     * @return { this }
     */
    snake(delimiter = '_') {
        return new Stringable(Str.snake(this.value, delimiter));
    }
    /**
     * Determine if a given string starts with a given substring.
     *
     * @param { string | array } needles
     *
     * @return { boolean }
     */
    startsWith(needles) {
        return Str.startsWith(this.value, needles);
    }
    /**
     * Convert a value to studly caps case.
     *
     * @return { this }
     */
    studly() {
        return new Stringable(Str.studly(this.value));
    }
    /**
     * Returns the portion of the string specified by the start and length parameters.
     *
     * @param { number } start
     * @param { number | null } length
     *
     * @return { this }
     */
    substr(start, length = null) {
        return new Stringable(Str.substr(this.value, start, length));
    }
    /**
     * Returns the number of substring occurrences.
     *
     * @param { string } needle
     * @param { number } offset
     * @param { number | null } length
     *
     * @return { number }
     */
    substrCount(needle, offset = 0, length = null) {
        return Str.substrCount(this.value, needle, offset, length);
    }
    /**
     * Replace text within a portion of a string.
     *
     * @param { string } replace
     * @param { number } offset
     * @param { number | null } length
     *
     * @return { this }
     */
    substrReplace(replace, offset = 0, length = null) {
        return new Stringable(Str.substrReplace(this.value, replace, offset, length));
    }
    /**
     * Swap multiple keywords in a string with other keywords.
     *
     * @param { object } map
     *
     * @return { this }
     */
    swap(map) {
        return new Stringable(Str.swap(map, this.value));
    }
    /**
     * Take the first or last {limit} characters.
     *
     * @param { number } limit
     *
     * @return { this }
     */
    take(limit) {
        if (limit < 0) {
            return this.substr(limit);
        }
        return this.substr(0, limit);
    }
    /**
     * Call the given Closure with this instance then return the instance.
     *
     * @param { Function } callback
     *
     * @return { this }
     */
    tap(callback) {
        callback(this);
        return this;
    }
    /**
     * Trim the string of the given characters.
     *
     * @param { string | string[]|null } characters
     *
     * @return { this }
     */
    trim(characters = null) {
        let characterArray = characters instanceof Array
            ? characters
            : [...arguments];
        characters = characterArray.filter(char => char.match('[^A-Za-z0-9_]') !== null);
        characters.forEach(term => this.value = this.value.replaceAll(term, ''));
        return new Stringable(this.value.trim());
    }
    /**
     * Left trim the string of the given characters.
     *
     * @param { string | string[]|null } characters
     *
     * @return { this }
     */
    ltrim(characters = null) {
        let characterArray = characters instanceof Array
            ? characters
            : [...arguments];
        characters = characterArray.filter(char => char.match('[^A-Za-z0-9_]') !== null);
        characters.forEach(term => this.value = Str.replaceFirst(term, '', this.value));
        return new Stringable(this.value.trimStart());
    }
    /**
     * Right trim the string of the given characters.
     *
     * @param { string | string[]|null } characters
     *
     * @return { this }
     */
    rtrim(characters = null) {
        let characterArray = characters instanceof Array
            ? characters
            : [...arguments];
        characters = characterArray.filter(char => char.match('[^A-Za-z0-9_]') !== null);
        characters.forEach(term => this.value = Str.replaceLast(term, '', this.value));
        return new Stringable(this.value.trimEnd());
    }
    /**
     * Make a string's first character lowercase.
     *
     * @return { this }
     */
    lcfirst() {
        return new Stringable(Str.lcfirst(this.value));
    }
    /**
     * Make a string's first character uppercase.
     *
     * @return { this }
     */
    ucfirst() {
        return new Stringable(Str.ucfirst(this.value));
    }
    /**
     * Split a string by uppercase characters.
     *
     * @return { array }
     */
    ucsplit() {
        return Str.ucsplit(this.value);
    }
    /**
     * Apply the callback if the given "value" is (or resolves to) truthy.
     *
     * @param { boolean|Function } value
     * @param { Function } callback
     * @param { Function|null } fallback
     *
     * @return { this }
     */
    when(value, callback, fallback = null) {
        var _a, _b;
        value = value instanceof Function ? value(this) : value;
        if (value) {
            return (_a = callback(this, value)) !== null && _a !== void 0 ? _a : this;
        }
        else if (fallback) {
            return (_b = fallback(this, value)) !== null && _b !== void 0 ? _b : this;
        }
        return this;
    }
    /**
     * Apply the callback if the given "value" is (or resolves to) falsy.
     *
     *
     * @param { boolean|Function } value
     * @param { Function } callback
     * @param { Function|null } fallback
     *
     * @return { this }
     */
    unless(value, callback, fallback = null) {
        var _a, _b;
        value = value instanceof Function ? value(this) : value;
        if (!value) {
            return (_a = callback(this, value)) !== null && _a !== void 0 ? _a : this;
        }
        else if (fallback) {
            return (_b = fallback(this, value)) !== null && _b !== void 0 ? _b : this;
        }
        return this;
    }
    /**
     * Execute the given callback if the string contains a given substring.
     *
     * @param { string | array } needles
     * @param { function } callback
     * @param { function|null } fallback
     *
     * @return { this }
     */
    whenContains(needles, callback, fallback = null) {
        return this.when(this.contains(needles), callback, fallback);
    }
    /**
     * Execute the given callback if the string contains all array values.
     *
     * @param { array } needles
     * @param { function } callback
     * @param { function|null } fallback
     *
     * @return { this }
     */
    whenContainsAll(needles, callback, fallback = null) {
        return this.when(this.containsAll(needles), callback, fallback);
    }
    /**
     * Execute the given callback if the string is empty.
     *
     * @param { function } callback
     * @param { function|null } fallback
     *
     * @return { this }
     */
    whenEmpty(callback, fallback = null) {
        return this.when(this.isEmpty(), callback, fallback);
    }
    /**
     * Execute the given callback if the string is not empty.
     *
     * @param { function } callback
     * @param { function|null } fallback
     *
     * @return { this }
     */
    whenNotEmpty(callback, fallback = null) {
        return this.when(this.isNotEmpty(), callback, fallback);
    }
    /**
     * Execute the given callback if the string ends with a given substring.
     *
     * @param { string | array } needles
     * @param { function } callback
     * @param { function|null } fallback
     *
     * @return { this }
     */
    whenEndsWith(needles, callback, fallback = null) {
        return this.when(this.endsWith(needles), callback, fallback);
    }
    /**
     * Execute the given callback if the string is an exact match with the given value.
     *
     * @param { string } value
     * @param { function } callback
     * @param { function|null } fallback
     *
     * @return { this }
     */
    whenExactly(value, callback, fallback = null) {
        return this.when(this.exactly(value), callback, fallback);
    }
    /**
     * Execute the given callback if the string is not an exact match with the given value.
     *
     * @param { string } value
     * @param { function } callback
     * @param { function|null } fallback
     *
     * @return { this }
     */
    whenNotExactly(value, callback, fallback = null) {
        return this.when(!this.exactly(value), callback, fallback);
    }
    /**
     * Execute the given callback if the string matches a given pattern.
     *
     * @param { string | array } pattern
     * @param { function } callback
     * @param { function|null } fallback
     *
     * @return { this }
     */
    whenIs(pattern, callback, fallback = null) {
        return this.when(this.is(pattern), callback, fallback);
    }
    /**
     * Execute the given callback if the string is 7-bit ASCII.
     *
     * @param { function } callback
     * @param { function|null } fallback
     *
     * @return { this }
     */
    whenIsAscii(callback, fallback = null) {
        return this.when(this.isAscii(), callback, fallback);
    }
    /**
     * Execute the given callback if the string is a valid UUID.
     *
     * @param { function } callback
     * @param { function|null } fallback
     *
     * @return { this }
     */
    whenIsUuid(callback, fallback = null) {
        return this.when(this.isUuid(), callback, fallback);
    }
    /**
     * Execute the given callback if the string is a valid ULID.
     *
     * @param { function } callback
     * @param { function|null } fallback
     *
     * @return { this }
     */
    whenIsUlid(callback, fallback = null) {
        return this.when(this.isUlid(), callback, fallback);
    }
    /**
     * Execute the given callback if the string starts with a given substring.
     *
     * @param { string | array } needles
     * @param { function } callback
     * @param { function|null } fallback
     *
     * @return { this }
     */
    whenStartsWith(needles, callback, fallback = null) {
        return this.when(this.startsWith(needles), callback, fallback);
    }
    /**
     * Execute the given callback if the string matches the given pattern.
     *
     * @param { string } pattern
     * @param { function } callback
     * @param { function|null } fallback
     *
     * @return { this }
     */
    whenTest(pattern, callback, fallback = null) {
        return this.when(this.test(pattern), callback, fallback);
    }
    /**
     * Limit the number of words in a string.
     *
     * @param { number } words
     * @param { string } end
     *
     * @return { this }
     */
    words(words = 100, end = '...') {
        return new Stringable(Str.words(this.value, words, end));
    }
    /**
     * Get the number of words a string contains.
     *
     * @return { number }
     */
    wordCount() {
        return Str.wordCount(this.value);
    }
    /**
     * Wrap the string with the given strings.
     *
     * @param { string } before
     * @param { string | null } after
     *
     * @return { this }
     */
    wrap(before, after = null) {
        return new Stringable(Str.wrap(this.value, before, after));
    }
    /**
     * Convert the string into a `HtmlString` instance.
     *
     * @return { HTMLElement | Node | string }
     */
    toHtmlString() {
        return new HtmlString(this.value).toHtml();
    }
    /**
     * Dump the string.
     *
     * @return { void }
     */
    dump() {
        console.log(this.value);
    }
    /**
     * Dump the string and end the script.
     *
     * @return { void }
     */
    dd() {
        this.dump();
        throw new Error('dd()');
    }
    /**
     * Get the raw string value.
     *
     * @return { string }
     */
    toString() {
        return this.value;
    }
    /**
     * Get the underlying string value as an integer.
     *
     * @return { number }
     */
    toInteger() {
        return !isNaN(parseInt(this.value)) ? parseInt(this.value) : 0;
    }
    /**
     * Get the underlying string value as a float.
     *
     * @return { number }
     */
    toFloat() {
        return !isNaN(parseFloat(this.value)) ? parseFloat(this.value) : 0;
    }
    /**
     * Get the underlying string value as a boolean.
     *
     * Returns true when value is "1", "true", "on", and "yes". Otherwise, returns false.
     *
     * @return { boolean }
     */
    toBoolean() {
        switch (this.value) {
            case '1':
            case 'true':
            case 'on':
            case 'yes':
                return true;
            default:
                return false;
        }
    }
    /**
     * Get the underlying string value as a formatted Date string.
     *
     * @param { string | null } format
     * @param { string | null } tz
     */
    toDate(format = null, tz = null) {
        var _a;
        if (new Date(this.value).toString() === 'Invalid Date') {
            return 'Invalid Date';
        }
        if (format === null) {
            return new Date().toLocaleDateString('en-us', {
                year: 'numeric',
                month: 'numeric',
                day: 'numeric',
                hour: 'numeric',
                minute: 'numeric',
                second: 'numeric',
                hour12: false,
                timeZone: tz !== null && tz !== void 0 ? tz : undefined,
            });
        }
        let date = '';
        let days = [];
        let months = [];
        const now = new Date(new Date(this.value).toLocaleString('en-US', { timeZone: tz !== null && tz !== void 0 ? tz : undefined }));
        const month = now.getMonth();
        const dayOfTheWeek = now.getDay();
        const dayOfTheMonth = now.getDate();
        const year = now.getFullYear();
        const hours = now.getHours();
        const minutes = now.getMinutes();
        const milliseconds = now.getMilliseconds();
        for (const element of format) {
            switch (element) {
                // Day of the month, 2 digits with leading zeros (e.g., 01 to 31)
                case 'd':
                    date += Str.padLeft(dayOfTheMonth.toString(), 2, '0');
                    break;
                // A textual representation of a day, three letters (e.g., Mon through Sun)
                case 'D':
                    days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thr', 'Fri', 'Sat'];
                    date += days[dayOfTheWeek];
                    break;
                // Day of the month without leading zeros (e.g., 1 to 31)
                case 'j':
                    date += dayOfTheMonth;
                    break;
                // A full textual representation of the day of the week (e.g., Sunday through Saturday)
                case 'l':
                    days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
                    date += days[dayOfTheWeek];
                    break;
                // ISO 8601 numeric representation of the day of the week (e.g., 1 (for Monday) through 7 (for Sunday))
                case 'N':
                    date += dayOfTheWeek;
                    break;
                // English ordinal suffix for the day of the month, 2 characters (e.g., st, nd, rd or th)
                case 'S': {
                    let suffix = { 1: 'st', 2: 'nd', 3: 'rd', 21: 'st', 22: 'nd', 23: 'rd', 31: 'st' };
                    date += (_a = suffix[dayOfTheMonth]) !== null && _a !== void 0 ? _a : 'th';
                    break;
                }
                // Numeric representation of the day of the week (e.g., 0 (for Sunday) through 6 (for Saturday))
                case 'w':
                    date += dayOfTheWeek;
                    break;
                // Numeric representation of the day of the week (e.g., The day of the year (starting from 0))
                case 'z': {
                    let start = new Date(year, 0, 0);
                    let diff = (now - start) + ((start.getTimezoneOffset() - now.getTimezoneOffset()) * 60 * 1000);
                    let day = 1000 * 60 * 60 * 24;
                    const currentDay = Math.floor(diff / day);
                    date += currentDay;
                    break;
                }
                // ISO 8601 week number of year, weeks starting on Monday (e.g., 42 (the 42nd week in the year))
                case 'W': {
                    let parsedDate = new Date(Date.UTC(year, month, dayOfTheMonth));
                    let weekDay = parsedDate.getUTCDay() || 7;
                    parsedDate.setUTCDate(parsedDate.getUTCDate() + 4 - weekDay);
                    let yearStart = new Date(Date.UTC(parsedDate.getUTCFullYear(), 0, 1));
                    let weekNumber = Math.ceil((((parsedDate - yearStart) / 86400000) + 1) / 7);
                    date += weekNumber;
                    break;
                }
                // A full textual representation of a month, such as January or March (e.g., January through December)
                case 'F':
                    months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
                    date += months[month];
                    break;
                // Numeric representation of a month, with leading zeros (e.g., 01 through 12)
                case 'm': {
                    const currentMonth = month + 1;
                    date += Str.padLeft(currentMonth.toString(), 2, '0');
                    break;
                }
                // A short textual representation of a month, three letters (e.g., Jan through Dec)
                case 'M':
                    months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
                    date += months[month];
                    break;
                // Numeric representation of a month, without leading zeros (e.g., 1 through 12)
                case 'n':
                    date += month + 1;
                    break;
                // Number of days in the given month (e.g., 28 through 31)
                case 't':
                    date += new Date(year, month + 1, 0).getDate();
                    break;
                // Whether it's a leap year (e.g., 1 if it is a leap year, 0 otherwise)
                case 'L':
                    date += new Date(year, 1, 29).getMonth() === 1;
                    break;
                // ISO 8601 week-numbering year. This has the same value as Y,
                // except that if the ISO week number (W) belongs to the previous or next year,
                // that year is used instead. (e.g., 1999 or 2003)
                case 'o':
                    date += now.toISOString().substring(0, 4);
                    break;
                // An expanded full numeric representation of a year,
                // at least 4 digits, with - for years BCE, and + for years CE. (e.g., -0055, +0787, +1999, +10191)
                case 'X':
                    date += year < 0 ? '-' + year : '+' + year;
                    break;
                // An expanded full numeric representation if required,
                // or a standard full numeral representation if possible (like Y).
                // At least four digits. Years BCE are prefixed with a -.
                // Years beyond (and including) 10000 are prefixed by a +. (e.g., -0055, 0787, 1999, +10191)
                case 'x':
                    date += year < 10000 ? '+' + year : year;
                    break;
                // A full numeric representation of a year,
                // at least 4 digits, with - for years BCE. (e.g., -0055, 0787, 1999, 2003, 10191)
                case 'Y':
                    date += year;
                    break;
                // A two-digit representation of a year (e.g., 99 or 03)
                case 'y':
                    date += year.toString().substring(2);
                    break;
                // Lowercase Ante meridiem and Post meridiem (e.g., am or pm)
                case 'a':
                    date += hours < 12 ? 'am' : 'pm';
                    break;
                // Uppercase Ante meridiem and Post meridiem (e.g., AM or PM)
                case 'A':
                    date += hours < 12 ? 'AM' : 'PM';
                    break;
                // Swatch Internet time (e.g., 000 through 999)
                case 'B': {
                    const utcHours = now.getUTCHours();
                    const utcMinutes = now.getUTCMinutes();
                    const utcSeconds = now.getUTCSeconds();
                    date += Math.floor((((utcHours + 1) % 24) + utcMinutes / 60 + utcSeconds / 3600) * 1000 / 24);
                    break;
                }
                // 12-hour format of an hour without leading zeros (e.g., 1 through 12)
                case 'g':
                    date += hours > 12 ? hours - 12 : hours;
                    break;
                // 24-hour format of an hour without leading zeros (e.g., 0 through 23)
                case 'G':
                    date += hours;
                    break;
                // 12-hour format of an hour with leading zeros (e.g., 01 through 12)
                case 'h':
                    date += Str.padLeft((hours > 12 ? hours - 12 : hours).toString(), 2, '0');
                    break;
                // 24-hour format of an hour with leading zeros (e.g., 00 through 23)
                case 'H':
                    date += Str.padLeft(hours.toString(), 2, '0');
                    break;
                // Minutes with leading zeros (e.g., 00 to 59)
                case 'i':
                    date += Str.padLeft(minutes.toString(), 2, '0');
                    break;
                // Seconds with leading zeros (e.g., 00 to 59)
                case 's':
                    date += Str.padLeft(milliseconds.toString(), 2, '0');
                    break;
                // Microseconds. (e.g., 654321)
                case 'u':
                    date += Str.padLeft((milliseconds * 1000).toString(), 6, '0');
                    break;
                // Milliseconds. (e.g., 654)
                case 'v':
                    date += Str.padLeft(milliseconds.toString(), 3, '0');
                    break;
                // Timezone identifier (e.g., UTC, GMT, Atlantic/Azores)
                case 'e': {
                    // @ts-ignore
                    const timeZoneData = now.toLocaleDateString('en-us', { timeZoneName: 'shortOffset', timeZone: tz !== null && tz !== void 0 ? tz : undefined })
                        .split(', ')
                        .pop()
                        .trim();
                    date += timeZoneData;
                    break;
                }
                // Whether the date is in daylight saving time (e.g., 1 if Daylight Saving Time, 0 otherwise)
                case 'I': {
                    let january = new Date(year, 0, 1).getTimezoneOffset();
                    let july = new Date(year, 6, 1).getTimezoneOffset();
                    date += Math.max(january, july) !== now.getTimezoneOffset();
                    break;
                }
                // Difference to Greenwich time (GMT) without colon between hours and minutes (e.g., +0200)
                case 'O': {
                    // @ts-ignore
                    const timeZoneData = now.toLocaleDateString('en-us', { timeZoneName: 'longOffset', timeZone: tz !== null && tz !== void 0 ? tz : undefined, })
                        .split(', ')
                        .pop()
                        .trim();
                    date += timeZoneData.length !== 3 ? timeZoneData.substring(3).replace(':', '') : '+0000';
                    break;
                }
                // Difference to Greenwich time (GMT) with colon between hours and minutes (e.g., +02:00)
                case 'P': {
                    // @ts-ignore
                    const timeZoneData = now.toLocaleDateString('en-us', { timeZoneName: 'longOffset', timeZone: tz !== null && tz !== void 0 ? tz : undefined, })
                        .split(', ')
                        .pop()
                        .trim();
                    date += timeZoneData.length !== 3 ? timeZoneData.substring(3) : '+00:00';
                    break;
                }
                // The same as P, but returns Z instead of +00:00 (e.g., +02:00)
                case 'p': {
                    // @ts-ignore
                    const timeZoneData = now.toLocaleDateString('en-us', { timeZoneName: 'longOffset', timeZone: tz !== null && tz !== void 0 ? tz : undefined, })
                        .split(', ')
                        .pop()
                        .trim();
                    date += timeZoneData === 'GMT' ? 'Z' : timeZoneData.substring(3);
                    break;
                }
                // Timezone abbreviation, if known; otherwise the GMT offset (e.g., EST, MDT, +05)
                case 'T': {
                    // @ts-ignore
                    const timeZoneData = now.toLocaleDateString('en-us', { timeZoneName: 'short', timeZone: tz !== null && tz !== void 0 ? tz : undefined, })
                        .split(', ')
                        .pop()
                        .trim();
                    date += timeZoneData;
                    break;
                }
                // Timezone offset in seconds.
                // The offset for timezones west of UTC is always negative,
                // and for those east of UTC is always positive. (e.g., -43200 through 50400)
                case 'Z': {
                    // @ts-ignore
                    const timeZoneData = now.toLocaleDateString('en-us', { timeZoneName: 'short', timeZone: tz !== null && tz !== void 0 ? tz : undefined, })
                        .split(', ')
                        .pop()
                        .trim();
                    date += timeZoneData === 'GMT' ? 0 : parseInt(timeZoneData.substring(3)) * 3600;
                    break;
                }
                // ISO 8601 date (e.g., 2004-02-12T15:19:21+00:00)
                case 'c':
                    date += now.toISOString();
                    break;
                // Seconds since the Unix Epoch (e.g., January 1 1970 00:00:00 GMT)
                case 'r': {
                    date += new Stringable(this.value).toDate('D, d M Y H:i:s O', tz);
                    break;
                }
                // RFC 2822/RFC 5322 formatted date (e.g., Thu, 21 Dec 2000 16:01:07 +0200)
                case 'U': {
                    date += Math.floor(now.getTime() / 1000);
                    break;
                }
                default:
                    date += element;
            }
        }
        return date;
    }
}
class HtmlString {
    /**
     * Create a new HTML string instance.
     *
     * @param { string } html
     *
     * @return void
     */
    constructor(html = '') {
        /**
         * The HTML string.
         *
         * @type { string }
         */
        Object.defineProperty(this, "html", {
            enumerable: true,
            configurable: true,
            writable: true,
            value: void 0
        });
        this.html = html;
    }
    /**
     * Get the HTML string.
     *
     * @return { HTMLElement|Node|string | null }
     */
    toHtml() {
        const pattern = /(?!<!DOCTYPE)<([^\s>]+)(\s|>)+/;
        const tag = RegExp(pattern).exec(this.html);
        if (!tag) {
            return this.html;
        }
        const DOM = document.createElement(tag[1]);
        DOM.innerHTML = this.html;
        return tag[1] === 'html'
            ? DOM
            : String(DOM.firstChild);
    }
    /**
     * Determine if the given HTML string is empty.
     *
     * @return { boolean }
     */
    isEmpty() {
        return this.html === '';
    }
    /**
     * Determine if the given HTML string is not empty.
     *
     * @return { boolean }
     */
    isNotEmpty() {
        return !this.isEmpty();
    }
    /**
     * Get the HTML string.
     *
     * @return { string }
     */
    toString() {
        const html = this.toHtml();
        if (html instanceof HTMLElement) {
            return html.outerHTML;
        }
        if (html instanceof Node) {
            return html.textContent;
        }
        return html;
    }
}
/**
 * Quote regular expression characters.
 *
 * @param { string } string The input string.
 * @param { string | null } delimiter If the optional delimiter is specified, it will also be escaped.
 * This is useful for escaping the delimiter that is required by the PCRE functions.
 * The / is the most commonly used delimiter.
 *
 * @return { string } The quoted (escaped) string.
 */
function preg_quote(string, delimiter = null) {
    return (string + '').replace(new RegExp('[.\\\\+*?\\[\\^\\]$(){}=!<>|:\\' + (delimiter !== null && delimiter !== void 0 ? delimiter : '') + '-]', 'g'), '\\$&');
}
/**
 * Uppercase the first character of each word in a string
 *
 * @param { string } string The input string.
 * @param { string } separators The optional separators contains the word separator characters.

 * @return { string } String the modified string.
 */
function ucwords(string, separators = ' \t\r\n\f\v') {
    return string.split(separators).map((word) => { var _a; return ((_a = word[0]) === null || _a === void 0 ? void 0 : _a.toUpperCase()) + word.substring(1); }).join(' ');
}
if (typeof exports != 'undefined') {
    module.exports.Str = Str;
    module.exports.str = str;
}
//# sourceMappingURL=main.js.map