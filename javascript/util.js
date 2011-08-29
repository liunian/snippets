/**
 *    Here are some util functions
 *    @author dengjij@gmail.com
 */


/**
 *  A simple function to update old object with new object
 */
function updateObj(oldObj, newObj) {
    for (var item in newObj) {
        oldObj[item] = newObj[item];
    }
    return this;
}
