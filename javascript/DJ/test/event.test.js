var t = document.getElementById('test'),
    p = document.getElementById('p');

function show(e) {
    console.log(e.type + ' ' + this.nodeName + ' ' + new Date().getTime());
}

DJ.delegate(t, 'p', 'click', function(e) {
        console.log('delegate event: ' + this.nodeName + ' ' + e.type);
});

DJ.bind(p, 'click', show);
DJ.bind(document.getElementById('unbind'), 'click', function(e) {
        DJ.unbind(p, 'click', show);
        DJ.preventDefault(e);
});
DJ.bind(document.getElementById('dy'), 'click', function(e) {
        var a = document.createElement('p');
        a.innerHTML = 'another p, delegate click event from #test';
        t.appendChild(a);
        DJ.preventDefault(e);
});


var btnp = DJ.$('#btns'),
    btns = DJ.$('button', btnp);

DJ.each(btns, function(item) {
    DJ.bind(item, 'click', function(e) {
        console.log(item, this, e.type);
    });
});
