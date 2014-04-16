/**
 * Helper functions for routers
 */

var api = {
    /**
     * Iterate through program results and add previous/next links.
     *
     * @param  {Array} arr Array of results
     * @return {Array}     New array of results
     */
    addProgramLinks: function(arr) {
        var prev   = "",
            next   = "",
            last   = arr.length - 1,
            actual = 0;

        for (var i in arr) {
            if (arr.hasOwnProperty(i)) {

                actual = parseInt(i);

                // if first item get last item as previous
                if (actual === 0 && arr.hasOwnProperty(last)) {
                    prev = arr[last].path;
                    next = arr[actual + 1].path;

                // if last item get fist item as next
                } else if (actual === last && arr.hasOwnProperty(last)) {
                    prev = arr[actual - 1].path;
                    next = arr[0].path;

                // in between as usual
                } else {
                    prev = arr[actual - 1].path;
                    next = arr[actual + 1].path;
                }

                // Add to program array
                arr[actual].prev = prev;
                arr[actual].next = next;
            }
        }

        return arr;
    },

    /**
     * Set selected object so we can highlight it in template
     *
     * @param  {String} item  Name/label of the item
     * @param  {Array}  items Array of objects
     * @return {Array}        Returning the updated array so template engine can see which one is active
     */
    setSelected: function(item, items) {
        var len = items.length,
            i;

        for (i = 0; i < len; i++) {

            items[i].selected = items[i].name === item;
        }

        return items;
    },

    /**
     * Get actual item from DB results. FindOne functionality
     *
     * @param  {Array}  arr  The array of results
     * @param  {String} item Path
     * @return {Object}      Return actual array field matching the item/path
     */
    getActualItem: function(arr, item) {
        for (var i in arr) {
            if (arr.hasOwnProperty(i) && arr[i].path === item) {
                return arr[i];
            }
        }
    }
};

module.exports = api;
