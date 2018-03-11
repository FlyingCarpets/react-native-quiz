function randomizeArray(array) {

    let arrayItemCount = array.length;

    while (arrayItemCount > 0) {
        let index = Math.floor(Math.random() * arrayItemCount);
        arrayItemCount--;
        let temp = array[arrayItemCount];
        array[arrayItemCount] = array[index];
        array[index] = temp;
    }

    return array;
}

export default randomizeArray;
