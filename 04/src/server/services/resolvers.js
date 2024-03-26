const _ = require('lodash');

const combineResolvers = (resolversArray) => {
    return _.merge({}, ...resolversArray);
};

module.exports = combineResolvers;
