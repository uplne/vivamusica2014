define([
    'jquery'
], function($) {
    'use strict';

    var Events = function() {

        return {
            bindEvents: function() {
                var self = this,
                    totalElements = 0;

                // Loop through the event -> handler function bindings
                for (var key in self.events){
                    if (self.events.hasOwnProperty(key)) {

                        // Key is expected to be a string like: 'eventName targetElement'
                        var properties = key.split(' '),
                            element    = properties[0],
                            event      = properties[1];

                        // Bind event if the we have reference to element
                        if (self.els[element] !== false &&
                            typeof self.els[element] !== 'undefined') {

                            //              targetElement, eventName, handler function
                            self.els[element].off(event, self[self.events[key]]);
                            self.els[element].on(event, self[self.events[key]]);

                            totalElements++;
                        }
                    }
                }

                return totalElements;
            }
        };
    };

    return new Events();
});