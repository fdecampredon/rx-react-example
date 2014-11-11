

module.exports = function promiseFromCallback(func, obj) {
    return function () {
        var args = [].slice.call(arguments);
        return new Promise(function (resolve, reject) {
            func.apply(obj, args.concat(function (err, result) {
                if (err) {
                    return reject(err);
                }
                resolve(result);
            }));
        });
    };
};