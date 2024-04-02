import _ from 'lodash';

const combineResolvers = (resolversArray) => {
    return _.merge({}, ...resolversArray);
};

export default combineResolvers;
