module.exports = Stringable = class {

    /**
     * The underlying string value.
     *
     * @type { string }
     */
    value;

    /**
     * Create a new instance of the class.
     *
     * @param { string } value
     */
    constructor(value = '') {
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
     * @param { string|string[] } values
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
     * @param { string } language
     *
     * @return { this }
     */
    ascii(language = 'en') {
        return new Stringable(Str.ascii(this.value, language));
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
     * @param  { string|array } needles
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
        let dirname        = this.value;
        let parts          = [];
        let isValidDirname = false;
        let hasValidLevels = false;

        if (this.value.split('/')[0] !== this.value) {
            parts          = this.value.split('/');
            dirname        = parts.slice(0, parts.length - levels).join('/');
            isValidDirname = true;
            hasValidLevels = parts.length <= levels + 1;
        }

        if (this.value.split('\\')[0] !== this.value) {
            parts          = this.value.split('\\');
            dirname        = parts.slice(0, parts.length - levels).join('\\');
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
     * @param { string|array } needles
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
     * @param { Object } options
     *
     * @return { string|null }
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
     * @param { number } flags
     *
     * @return { array }
     */
    split(pattern, limit = -1, flags = 0) {
        const regExpBody  = /^\/(.*)\/\w*$/.exec(pattern)[1];
        const regExpFlags = /^\/.*\/(\w*)$/.exec(pattern)[1];
        const regExp      = new RegExp(regExpBody, regExpFlags + (regExpFlags.indexOf('g') !== -1 ? '' : 'g'));

        let segments = this.value.split(regExp);

        if (limit !== -1) {
            const position = limit - 1 >= segments.length
                             ? segments.length - 1
                             : limit - 1;

            segments = [...segments.slice(0, position), segments.splice(position).join('')].map(segment => segment.trim());
        }

        return segments ?? [];
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
     * @param { string|array } pattern
     *
     * @return { boolean }
     */
    is(pattern) {
        return Str.is(this.value, pattern);
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
        return this.value.trim() === '';
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
     * Convert GitHub flavored Markdown into HTML.
     *
     * @param { Object } options
     *
     * @return { this }
     */
    markdown(options = {}) {
        return new Stringable(Str.markdown(this.value, options));
    }

    /**
     * Convert inline Markdown into HTML.
     *
     * @param { Object } options
     *
     * @return { this }
     */
    inlineMarkdown(options = {}) {
        return new Stringable(Str.inlineMarkdown(this.value, options));
    }

    /**
     * Masks a portion of a string with a repeated character.
     *
     * @param { string } character
     * @param { number } index
     * @param { Number|null }length
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
     * @param { string|string[] } pattern
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
     * Parse a Class@method style callback into class and method.
     *
     * @param { string|null } $default
     *
     * @return { array }
     */
    parseCallback($default = null) {
        return Str.parseCallback(this.value, $default);
    }

    /**
     * Call the given callback and return a new string.
     *
     * @param { string|function } callback
     *
     * @return { this }
     */
    pipe(callback) {
        if (this.value[callback] instanceof Function) {
            return new Stringable(this.value[callback]());
        }

        return new Stringable(callback(this));
    }

    /**
     * Get the plural form of an English word.
     *
     * @param { Number|array } count
     *
     * @return { this }
     */
    plural(count = 2) {
        return new Stringable(Str.plural(this.value, count));
    }

    /**
     * Pluralize the last word of an English, studly caps case string.
     *
     * @param { Number|array } count
     *
     * @return { this }
     */
    pluralStudly(count = 2) {
        return new Stringable(Str.pluralStudly(this.value, count));
    }

    /**
     * Prepend the given values to the string.
     *
     * @param { string|string[] } values
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
     * Repeat the string.
     *
     * @param { number } times
     *
     * @return { this }
     */
    repeat(times) {
        return new Stringable(Str.repeat(this.value, times));
    }

    /**
     * Replace the given value in the given string.
     *
     * @param { string|array } search
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
     * @param { string|function } replace
     * @param { number } limit
     *
     * @return { this }
     */
    replaceMatches(pattern, replace, limit = -1) {
        const regExpBody  = /^\/(.*)\/\w*$/.exec(pattern)[1];
        const regExpFlags = /^\/.*\/(\w*)$/.exec(pattern)[1];
        const regExp      = new RegExp(regExpBody, regExpFlags + (regExpFlags.indexOf('g') !== -1 ? '' : 'g'));

        if (replace instanceof Function) {
            this.value.replace(regExp, matched => new Stringable(matched));
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
     * @param { Object } dictionary
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
     * @param { string|array } needles
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
     * @param { Number|null } length
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
     * @param { Number|null } length
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
     * @param { Number|null } length
     *
     * @return { this }
     */
    substrReplace(replace, offset = 0, length = null) {
        return new Stringable(Str.substrReplace(this.value, replace, offset, length));
    }

    /**
     * Swap multiple keywords in a string with other keywords.
     *
     * @param { Object } map
     *
     * @return { this }
     */
    swap(map) {
        return new Stringable(Str.swap(map, this.value));
    }

    /**
     * Call the given Closure with this instance then return the instance.
     *
     * @param { function|null } callback
     *
     * @return { this }
     */
    tap(callback = null) {
        callback(this);

        return this;
    }

    /**
     * Trim the string of the given characters.
     *
     * @param { string|string[] } characters
     *
     * @return { this }
     */
    trim(characters = null) {
        let characterArray = characters instanceof Array
                             ? characters
                             : new Array(...arguments);

        characters = characterArray.filter(char => char.match('[^A-Za-z0-9_]') !== null);

        characters.forEach(term => this.value = this.value.replaceAll(term, ''));

        return new Stringable(this.value.trim());
    }

    /**
     * Left trim the string of the given characters.
     *
     * @param { string|string[] } characters
     *
     * @return { this }
     */
    ltrim(characters = null) {
        let characterArray = characters instanceof Array
                             ? characters
                             : new Array(...arguments);

        characters = characterArray.filter(char => char.match('[^A-Za-z0-9_]') !== null);

        characters.forEach(term => this.value = Str.replaceFirst(term, '', this.value));

        return new Stringable(this.value.trimStart());
    }

    /**
     * Right trim the string of the given characters.
     *
     * @param { string|string[] } characters
     *
     * @return { this }
     */
    rtrim(characters = null) {
        let characterArray = characters instanceof Array
                             ? characters
                             : new Array(...arguments);

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
     * @param { boolean|function|null } value
     * @param { function|null } callback
     * @param { function|null } $default
     *
     * @return { this }
     */
    when(value = null, callback = null, $default = null) {
        value = value instanceof Function ? value(this) : value;

        if (value) {
            return callback(this, value) ?? this;
        } else if ($default) {
            return $default(this, value) ?? this;
        }

        return this;
    }

    /**
     * Apply the callback if the given "value" is (or resolves to) falsy.
     *
     *
     * @param { boolean|function|null } value
     * @param { function|null } callback
     * @param { function|null } $default
     *
     * @return { this }
     */
    unless(value = null, callback = null, $default = null) {
        value = value instanceof Function ? value(this) : value;

        if (!value) {
            return callback(this, value) ?? this;
        } else if ($default) {
            return $default(this, value) ?? this;
        }

        return this;
    }

    /**
     * Execute the given callback if the string contains a given substring.
     *
     * @param { string|array } needles
     * @param { function } callback
     * @param { function|null } $default
     *
     * @return { this }
     */
    whenContains(needles, callback, $default = null) {
        return this.when(this.contains(needles), callback, $default);
    }

    /**
     * Execute the given callback if the string contains all array values.
     *
     * @param { string|array } needles
     * @param { function } callback
     * @param { function|null } $default
     *
     * @return { this }
     */
    whenContainsAll(needles, callback, $default = null) {
        return this.when(this.containsAll(needles), callback, $default);
    }

    /**
     * Execute the given callback if the string is empty.
     *
     * @param { function } callback
     * @param { function|null } $default
     *
     * @return { this }
     */
    whenEmpty(callback, $default = null) {
        return this.when(this.isEmpty(), callback, $default);
    }

    /**
     * Execute the given callback if the string is not empty.
     *
     * @param { function } callback
     * @param { function|null } $default
     *
     * @return { this }
     */
    whenNotEmpty(callback, $default = null) {
        return this.when(this.isNotEmpty(), callback, $default);
    }

    /**
     * Execute the given callback if the string ends with a given substring.
     *
     * @param { string|array } needles
     * @param { function } callback
     * @param { function|null } $default
     *
     * @return { this }
     */
    whenEndsWith(needles, callback, $default = null) {
        return this.when(this.endsWith(needles), callback, $default);
    }

    /**
     * Execute the given callback if the string is an exact match with the given value.
     *
     * @param { string } value
     * @param { function } callback
     * @param { function|null } $default
     *
     * @return { this }
     */
    whenExactly(value, callback, $default = null) {
        return this.when(this.exactly(value), callback, $default);
    }

    /**
     * Execute the given callback if the string is not an exact match with the given value.
     *
     * @param { string } value
     * @param { function } callback
     * @param { function|null } $default
     *
     * @return { this }
     */
    whenNotExactly(value, callback, $default = null) {
        return this.when(!this.exactly(value), callback, $default);
    }

    /**
     * Execute the given callback if the string matches a given pattern.
     *
     * @param { string|array } pattern
     * @param { function } callback
     * @param { function|null } $default
     *
     * @return { this }
     */
    whenIs(pattern, callback, $default = null) {
        return this.when(this.is(pattern), callback, $default);
    }

    /**
     * Execute the given callback if the string is 7 bit ASCII.
     *
     * @param { function } callback
     * @param { function|null } $default
     *
     * @return { this }
     */
    whenIsAscii(callback, $default = null) {
        return this.when(this.isAscii(), callback, $default);
    }

    /**
     * Execute the given callback if the string is a valid UUID.
     *
     * @param { function } callback
     * @param { function|null } $default
     *
     * @return { this }
     */
    whenIsUuid(callback, $default = null) {
        return this.when(this.isUuid(), callback, $default);
    }

    /**
     * Execute the given callback if the string is a valid ULID.
     *
     * @param { function } callback
     * @param { function|null } $default
     *
     * @return { this }
     */
    whenIsUlid(callback, $default = null) {
        return this.when(this.isUlid(), callback, $default);
    }

    /**
     * Execute the given callback if the string starts with a given substring.
     *
     * @param { string|array } needles
     * @param { function } callback
     * @param { function|null } $default
     *
     * @return { this }
     */
    whenStartsWith(needles, callback, $default = null) {
        return this.when(this.startsWith(needles), callback, $default);
    }

    /**
     * Execute the given callback if the string matches the given pattern.
     *
     * @param { string } pattern
     * @param { function } callback
     * @param { function|null } $default
     *
     * @return { this }
     */
    whenTest(pattern, callback, $default = null) {
        return this.when(this.test(pattern), callback, $default);
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
     * @param { string|null } characters
     *
     * @return { number }
     */
    wordCount(characters = null) {
        return Str.wordCount(this.value, characters);
    }

    /**
     * Wrap the string with the given strings.
     *
     * @param { string } before
     * @param { string|null } after
     *
     * @return { this }
     */
    wrap(before, after = null) {
        return new Stringable(Str.wrap(this.value, before, after));
    }

    /**
     * Dump the string.
     *
     * @return { this }
     */
    dump() {
        console.log(this.value);

        return this;
    }

    /**
     * Dump the string and end the script.
     *
     * @return { void }
     */
    dd() {
        this.dump();

        throw 'dd()';
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
            case 1:
            case '1':
            case true:
            case 'true':
            case 'on':
            case 'yes':
                return true;
            default:
                return false;
        }
    }

    /**
     * Get the underlying string value as a Carbon instance.
     *
     * @param { string|null } format
     * @param { string|null } tz
     */
    toDate(format = null, tz = null) {
        if (format === null) {
            return new Date(this.value).toLocaleDateString('en-us', {
                year    : 'numeric',
                month   : 'numeric',
                day     : 'numeric',
                hour    : 'numeric',
                minute  : 'numeric',
                second  : 'numeric',
                hour12  : false,
                timeZone: tz ?? undefined,
            });
        }

        let date            = '';
        let days            = [];
        let months          = [];
        const now           = new Date(this.value);
        const month         = now.getMonth();
        const dayOfTheWeek  = now.getDay();
        const dayOfTheMonth = now.getDate();
        const year          = now.getFullYear();
        const hours         = now.getHours();
        const minutes       = now.getMinutes();
        const seconds       = now.getSeconds();
        const milliseconds  = now.getMilliseconds();

        for (let i = 0; i < format.length; i++) {
            switch (format[i]) {
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
                case 'S':
                    let suffix = { 1: 'st', 2: 'nd', 3: 'rd', 21: 'st', 22: 'nd', 23: 'rd', 31: 'st' };
                    date += suffix[dayOfTheMonth] ?? 'th';

                    break;

                // Numeric representation of the day of the week (e.g., 0 (for Sunday) through 6 (for Saturday))
                case 'w':
                    date += dayOfTheWeek;

                    break;

                // Numeric representation of the day of the week (e.g., The day of the year (starting from 0))
                case 'z':
                    let start        = new Date(year, 0, 0);
                    let diff         = (now - start) + ((start.getTimezoneOffset() - now.getTimezoneOffset()) * 60 * 1000);
                    let day          = 1000 * 60 * 60 * 24;
                    const currentDay = Math.floor(diff / day);
                    date += currentDay;

                    break;

                // ISO 8601 week number of year, weeks starting on Monday (e.g., 42 (the 42nd week in the year))
                case 'W':
                    let parsedDate = new Date(Date.UTC(year, month, dayOfTheMonth));
                    let weekDay    = parsedDate.getUTCDay() || 7;
                    parsedDate.setUTCDate(parsedDate.getUTCDate() + 4 - weekDay);
                    let yearStart  = new Date(Date.UTC(parsedDate.getUTCFullYear(), 0, 1));
                    let weekNumber = Math.ceil((((parsedDate - yearStart) / 86400000) + 1) / 7);

                    date += weekNumber;

                    break;

                // A full textual representation of a month, such as January or March (e.g., January through December)
                case 'F':
                    months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
                    date += months[month];

                    break;

                // Numeric representation of a month, with leading zeros (e.g., 01 through 12)
                case 'm':
                    const currentMonth = month + 1;
                    date += Str.padLeft(currentMonth.toString(), 2, '0');

                    break;

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

                // Lowercase Ante meridiem and Post meridiem (e.g., AM or PM)
                case 'A':
                    date += hours < 12 ? 'AM' : 'PM';

                    break;

                // Swatch Internet time (e.g., 000 through 999)
                case 'B':
                    const utcHours   = now.getUTCHours();
                    const utcMinutes = now.getUTCMinutes();
                    const utcSeconds = now.getUTCSeconds();

                    date += Math.floor((((utcHours + 1) % 24) + utcMinutes / 60 + utcSeconds / 3600) * 1000 / 24);

                    break;

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
                    const timeZoneData = now.toLocaleDateString('en-us', {
                        timeZoneName: 'shortOffset',
                        timeZone    : tz ?? undefined,
                    })
                        .split(', ')
                        .pop()
                        .trim();

                    date += timeZoneData;

                    break;
                }

                // Whether or not the date is in daylight saving time (e.g., 1 if Daylight Saving Time, 0 otherwise)
                case 'I':
                    const january = new Date(year, 0, 1).getTimezoneOffset();
                    const july    = new Date(year, 6, 1).getTimezoneOffset();

                    date += Math.max(january, july) !== now.getTimezoneOffset();

                    break;

                // Difference to Greenwich time (GMT) without colon between hours and minutes (e.g., +0200)
                case 'O': {
                    const timeZoneData = now.toLocaleDateString('en-us', {
                        timeZoneName: 'longOffset',
                        timeZone    : tz ?? undefined,
                    })
                        .split(', ')
                        .pop()
                        .trim();

                    date += timeZoneData.length !== 3 ? timeZoneData.substring(3).replace(':', '') : '+0000';

                    break;
                }

                // Difference to Greenwich time (GMT) with colon between hours and minutes (e.g., +02:00)
                case 'P': {
                    const timeZoneData = now.toLocaleDateString('en-us', {
                        timeZoneName: 'longOffset',
                        timeZone    : tz ?? undefined,
                    })
                        .split(', ')
                        .pop()
                        .trim();

                    date += timeZoneData.length !== 3 ? timeZoneData.substring(3) : '+00:00';

                    break;
                }

                // The same as P, but returns Z instead of +00:00 (e.g., +02:00)
                case 'p': {
                    const timeZoneData = now.toLocaleDateString('en-us', {
                        timeZoneName: 'longOffset',
                        timeZone    : tz ?? undefined,
                    })
                        .split(', ')
                        .pop()
                        .trim();

                    date += timeZoneData === 'GMT' ? 'Z' : timeZoneData.substring(3);

                    break;
                }

                // Timezone abbreviation, if known; otherwise the GMT offset (e.g., EST, MDT, +05)
                case 'T': {
                    const timeZoneData = now.toLocaleDateString('en-us', {
                        timeZoneName: 'short',
                        timeZone    : tz ?? undefined,
                    })
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
                    const timeZoneData = now.toLocaleDateString('en-us', {
                        timeZoneName: 'short',
                        timeZone    : tz ?? undefined,
                    })
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
                    date += format[i];
            }
        }

        return date;
    }
};