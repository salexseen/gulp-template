"use strict";

module.exports = function(defaultKey, keys){
    let data = {};
    let node_env = process.env.NODE_ENV || defaultKey;
    let node_env_keys = node_env.split(".");

    for (let i = 0, key; i < keys.length; i++){
        key = keys[i];
        for (let n = 0, nKey; n < node_env_keys.length; n++){
            nKey = node_env_keys[n];
            if (key === nKey){
                data[key] = true;
                break;
            } else {
                data[key] = false;
            }
        }
    }

    return data;
};