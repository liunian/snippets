/**
 *    Here are some util functions
 *    @author dengjij@gmail.com
 */


/**
 *  A simple function to merge old object with new object
 */
function mergeObj(oldObj, newObj) {
    for (var item in newObj) {
        oldObj[item] = newObj[item];
    }
    return this;
}
