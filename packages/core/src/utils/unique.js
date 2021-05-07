const unique = (arrArg) =>
    arrArg !== null ? arrArg.filter((elem, pos, arr) => arr.indexOf(elem) === pos) : [];

export default unique;
