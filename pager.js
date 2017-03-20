(function(window, undefined) {
    'use strict';

    var pager = window.pager = {},
        pages = {};

    /*
     * Add a handler for a page name.
     *
     * @page: The page name.
     * @func: The handler function.
     */
    pager.on = function(page, func) {
        page = parse(page);
        if (page && func) { pages[page] = func; }
    };

    /*
     * Remove one or all handlers.
     *
     * [@page]: The page name.
     * [@func]: The handler function.
     */
    pager.off = function(page, func) {
        page = parse(page);
        if (!page && !func) { pages = {}; }
        else if (!func && pages[page]) { pages[page] = undefined; }
        else if (pages[page] === func) { pages[page] = undefined; }
    };

    /*
     * Get the current page name.
     *
     * [@fallback]: A fallback name if no current name is found.
     */
    pager.get = function(fallback) {
        return parse(window.location.pathname) || parse(fallback) || 'index';
    };

    /*
     * Run the handler for the current page name.
     *
     * [@page]: Use another page name, not the current location.
     * [@page]: Fallback page name if no current name is found.
     */
    pager.run = function(page, fallback) {
        var func = pages[parse(page) || pager.get()];
        var fall = pages[parse(fallback) || 'index'];
        if (func) { func(); }
        else if (fallback && fall) { fall(); }
        else if (!page && fall) { fall(); }
    };

    /*
     * Internal: Parse a page name.
     *
     * @name: The name to parse.
     */
    var parse = function(name) {
        if (!name || !(/^[a-z0-9_\-\/\.]+$/i).test(name)) { return ''; }
        return ('' + name)
            .replace(/^[\/]+/, '')
            .replace(/[\/]+$/, '')
            .replace(/(?:[\.]+([^.]+))?$/, '');
    };

}(window));
