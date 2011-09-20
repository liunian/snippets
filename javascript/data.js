/**
 * Reference: http://www.iteye.com/topic/783260
 *
 * learning from jQuery
 *
 * exec the functoin right the way, it will be a clousre and an object instance;
 * with the return method, we can expose some method or attribute for outer use.
 *
 * The Data object does not store the dom to keep the relation of the data, 
 * but just use an id to reference, just like the foreign key in database.
 */
var Data = function() {
	var cache = {},
		expando = 'data' + new Date().getTime(),	// a random string to make sure the attribute for data is unique
		uuid = 1;	// an integer to identify each data in Data

	var setData = function(elem, key, value) {
		var id = elem[expando];
		if (!id) {
			id = ++uuid; // cause in clousre, it can keep alive all the time
			elem[expando] = id;
		}
		if (!cache[id]) {
			cache[id] = {};
		}
		cache[id][key] = value;
	};

	var getData = function(elem, key) {
		var id = elem[expando];
		return cache[id] && cache[id][key] || null;
	};

	var removeData = function(elem, ke) {
		//todo
	};

	return {
		//cache: cache,
		//uuid: uuid,
		//expando: expando,
		setData: setData,
		getData: getData,
		removeData: removeData
	}
} ();

