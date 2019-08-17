import controller from './controller.js';
import service from './service.js';
import plugin from './plugin.js';

import config from '../config/config.default.js';

const loadedContext = () => {
    const ctx = {
        controller,
        service,
        ...plugin,

        request: {},
        response: {},

        config
    };
    
    for (let key in service) {
        service[key].ctx = ctx;
    }

    return ctx;
};

export default loadedContext;
