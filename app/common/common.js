'use strict';

String.prototype.format = String.prototype.format = function () {
    var s = this,
        i = arguments.length;

    while (i--) {
        s = s.replace(new RegExp('\\{' + i + '\\}', 'gm'), arguments[i]);
    }
    return s;
};

String.prototype.capitalize = function () {
    return this.charAt(0).toUpperCase() + this.slice(1);
}