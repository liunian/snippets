function hasClass(element, className){
	return element.className.indexOf(className) === -1 ? false : true;
}

function addClass(element, className){
	var res = element.className,
		parts = className.split(/\s+/);

	parts.each(function(part){
		if(! hasClass(element, part)){
			res += ' ' + part;
		}
	});
	element.className = res.trim();
}

function removeClass(element, className){
	var res = element.className.split(/\s+/),
		parts = className.split(/\s+/);

	parts.each(function(part){
		res.each(function(aRes, i){
			if(aRes == part){
				res[i] = '';
			}
		});
	});
	element.className = res.join(' ');
}
