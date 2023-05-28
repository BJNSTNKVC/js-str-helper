module.exports = HtmlString = class {

    /**
     * The HTML string.
     *
     * @type { string }
     */
    html;

    /**
     * Create a new HTML string instance.
     *
     * @param { string } html
     *
     * @return void
     */
    constructor(html = '') {
        this.html = html;
    }


    /**
     * Get the HTML string.
     *
     * @return { HTMLElement|ChildNode|string }
     */
    toHtml() {
        const pattern = /(?!<!DOCTYPE)<([^\s>]+)(\s|>)+/;
        const tag     = this.html.match(pattern);

        if (!tag) {
            return this.html;
        }

        const DOM = document.createElement(tag[1]);

        DOM.innerHTML = this.html;

        return tag[1] === 'html' ? DOM : DOM.firstChild;
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
     * @return { HTMLElement|ChildNode|string }
     */
    toString() {
        return this.toHtml();
    }
};