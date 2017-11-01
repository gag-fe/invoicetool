//运行时缓存数据缓存支持
//既不适合放在props中，也不适合放在state中的数据
var CacheSupport = {
    setCache: function (k, v) {
        var cacheObj = this.__cacheObj || {};
        cacheObj[k] = v;
        this.__cacheObj = cacheObj;
    },
    getCache: function (k) {
        var cacheObj = this.__cacheObj;
        return cacheObj ? cacheObj[k] : undefined;
    }
};


module.exports = CacheSupport;
