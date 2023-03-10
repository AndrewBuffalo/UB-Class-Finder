// https://blog.bitsrc.io/how-to-compare-objects-in-javascript-f4eafef807fc
module.exports = function(obj1, obj2) {
    const isObject = (obj) => {
        return (Object.prototype.toString.call(obj) === '[object Object]');
    }
    if (!isObject(obj1) || !isObject(obj2)) {
        return false;
    }
    let len = null;
    //check if they're of thesame length
    if (Object.keys(obj1).length != Object.keys(obj2).length) {
        return false;
    } else {
        len = JSON.stringify(obj1).length; //use any length
    }
    let match = 0; //store number of matched properties
    let stringified = JSON.stringify(obj1); //use JSON.stringify to convert to JSON string

    let ii = 0;
    //loop through the variable
    while (ii < stringified.length) {
        //check if character exists in the other object
        if (JSON.stringify(obj2).includes(stringified[ii])) {
            match++; //increment the variable
        }
        ii++;
    }
    //check if object length equals the number of matched properties
    if (match === len) {
        return true;
    }
    return false;
}