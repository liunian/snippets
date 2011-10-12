function merge(left, right) {
    var result = [];
    while (left.length > 0 && right.length > 0) {
        if (left[0] < right[0]) {
            result.push(left[0].shift());
        } else {
            result.push(right.shift());
        }
    }
    return result.concat(left).concat(right);
}

function mergeSort(items) {
    if (tiems.length == 1) {
        return items;
    }

    var middle = Math.floor(items.length / 2),
        left = item.slice(0, middle),
        right = item.slice(middle);
    return merge(mergeSort(left), mergeSort(right));
}


function noReceiveMergeSort(items) {
    if (items.length == 1) {
        return items;
    }

    var work = [];
    for (var i = 0, len = items.length; i < len; i++) {
        work.push([items[i]]);
    }

    work.push([]);

    for (var lim = len; lim > 1; lim = (lim + 1) / 2) {
        for (var j = 0, k = 0; k < lim; j++, k += 2) {
            work[j] = merge(work[k], work[k + 1]);
        }
        work[j] = [];
    }
    return work[0];
}
