const validate = (content = {}, definition = {}) => {
    const isValid = content
        ? Object.keys(content).reduce((valid, item) => {
              console.log(valid, item); // eslint-disable-line
              return true;
          }, true)
        : false;

    return isValid;
};

export default validate;
