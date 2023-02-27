export const findIndex = (array, _id) => {
    var result = -1;
    array.forEach((value, index) => {
        if (value._id === _id) {
            result = index;
        }
    });
    return result;
}
