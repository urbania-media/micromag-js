import fsExtra from 'fs-extra';

const readJSON = (file) => fsExtra.readJsonSync(file);

export default readJSON;
