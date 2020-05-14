/**
 * @author bingPo
 * @date 2020-04-05 10:11
 * @name: NetUtils
 * @description：NetUtils
 */
import Store from 'react-native-simple-store';
import API from './Api';
import fetch from 'react-native-fetch-polyfill';

/**
 * 请求超时设置
 * @type {number}
 */
let timeout = 10 * 1000;

export const postJsonToken = async (payload) => {
    const token = await Store.get('token').then(res => res).catch(() => '');
    let fetchOptions = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': token,
        },
        timeout: timeout,
        body: JSON.stringify(payload.requestData),
    };
    // console.log('token', token);
    return fetch(payload.url, fetchOptions)
        .then((response) => response.text())
        .then((responseText) => {
            // console.log(responseText);
            return JSON.parse(responseText);
        })
        .catch(e => {
            ////console.log(e)
        });
};
export const postJson = async (payload) => {
    // const token = await Store.get('token').then(res => res).catch(() => '');
    let fetchOptions = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            // 'Authorization': token,
        },
        timeout: timeout,
        body: JSON.stringify(payload.requestData),
    };
    // console.log('fetchOptions', fetchOptions);
    return fetch(payload.url, fetchOptions)
        .then((response) => response.text())
        .then((responseText) => {
            // console.log(responseText);
            return JSON.parse(responseText);
        })
        .catch(e => {
            ////console.log(e)
        });
};


export const putJsonToken = async (payload) => {
    const token = await Store.get('token').then(res => res).catch(() => '');
    let fetchOptions = {
        method: 'PUT',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json;',
            'Authorization': token,
        },
        timeout: timeout,
        body: JSON.stringify(payload.requestData),
    };
    return fetch(payload.url, fetchOptions)
        .then((response) => response.text())
        .then((responseText) => {
            // ////console.log(responseText);
            return JSON.parse(responseText);
        })
        .catch(e => {
            ////console.log(e)
        });
};

export const postFormData = (payload) => {
    let fetchOptions = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'multipart/form-data',
        },
        timeout: timeout,
        body: payload.requestData,
    };
    return fetch(payload.url, fetchOptions)
        .then((response) => response.text())
        .then((responseText) => {
            ////console.log(responseText);
            return JSON.parse(responseText);
        })
        .catch(e => {
            ////console.log(e)
        });
};
export const postFormDataToken = async (payload) => {
    const token = await Store.get('token').then(res => res).catch(() => '');
    let fetchOptions = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'multipart/form-data',
            'Authorization': token,
        },
        timeout: timeout,
        body: payload.requestData,
    };
    //console.log('payload', payload);
    //console.log('token', token);
    return fetch(payload.url, fetchOptions)
        .then((response) => response.text())
        .then((responseText) => {
            ////console.log(responseText);
            return JSON.parse(responseText);
        })
        .catch(e => {
            ////console.log(e)
        });
};


export const getParamsData = (payload) => {

    let fetchOptions = {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            // 'Content-Type': 'multipart/form-data',
        },
        timeout: timeout,
        // body: payload.requestData,
    };
    let url = payload.url + '?';
    let data = payload.requestData;
    for (let key in data) {
        url = url + key + '=' + data[key] + '&';
    }
    url = url.slice(0, url.length - 1);
    return fetch(url, fetchOptions)
        .then((response) => response.text())
        .then((responseText) => {
            return JSON.parse(responseText);
        })
        .catch(e => {
            ////console.log(e)
        });
};
export const postParamsData = (payload) => {

    let fetchOptions = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Client_Type': 'app-android',
            'version': 'v1.1.0',
            'Content-Type': 'application/x-www-form-urlencoded',
            'timeout': 15000000,
        },
        timeout: timeout,
        body: 'sig=31853cd2877a02e14f62389cdf7cd43a&updateVersion=MS4yLjA=&updateType=&',
    };


    // let url = payload.url + '?';
    // let data = payload.requestData;
    // for (let key in data) {
    //     url = url + key + '=' + data[key] + '&';
    // }
    // url = url.slice(0, url.length - 1);
    return fetch(payload.url, fetchOptions)
        .then((response) => response.text())
        .then((responseText) => {
            // console.log('responseText', responseText);
            return JSON.parse(responseText);
        })
        .catch(e => {
            ////console.log(e)
        });
};

export const getParamsDataToken = async (payload) => {
    const token = await Store.get('token').then(res => res).catch(() => '');
    let fetchOptions = {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            // 'Content-Type': 'multipart/form-data',
            'Authorization': token,
        },
        timeout: timeout,
        // body: payload.requestData,
    };
    let url = payload.url + '?';
    let data = payload.requestData;
    for (let key in data) {
        url = url + key + '=' + data[key] + '&';
    }
    url = url.slice(0, url.length - 1);
    return fetch(url, fetchOptions)
        .then((response) => response.text())
        .then((responseText) => {
            return JSON.parse(responseText);
        })
        .catch(e => {
            ////console.log(e)
        });
};

export const getData = (payload) => {
    let fetchOptions = {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
        },
        timeout: timeout,
    };
    return fetch(payload.url, fetchOptions)
        .then((response) => response.text())
        .then((responseText) => {
            // console.log(responseText);
            return JSON.parse(responseText);
        })
        .catch(e => {
            ////console.log(e)
        });
};
export const getDataToken = async (payload) => {
    const token = await Store.get('token').then(res => res).catch(() => '');
    // console.log(token)
    let fetchOptions = {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': token,
        },
        timeout: timeout,
    };
    return fetch(payload.url, fetchOptions)
        .then((response) => response.text())
        .then((responseText) => {
            ////console.log(responseText);
            return JSON.parse(responseText);
        })
        .catch(e => {
            ////console.log(e)
        });
};


export const getDelete = async (payload) => {
    const token = await Store.get('token').then(res => res).catch(() => '');
    // console.log("token", token)
    let fetchOptions = {
        method: 'DELETE',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json',
            'Authorization': token,
        },
        timeout: timeout,
    };
    return fetch(payload.url, fetchOptions)
        .then((response) => response.text())
        .then((responseText) => {
            ////console.log(responseText);
            return JSON.parse(responseText);
        })
        .catch(e => {
            ////console.log(e)
        });
};


export const uploadImage = async (payload) => {
    const token = await Store.get('token').then(res => res).catch(() => '');
    let params = payload.requestData;
    let formData = new FormData();
    let file = {uri: params.multipartFile, type: 'multipart/form-data', name: 'image.png'};
    formData.append('multipartFile', file);
    let fetchOptions = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'multipart/form-data',
            'Authorization': token,
        },
        timeout: timeout,
        body: formData,
    };
    return fetch(payload.url, fetchOptions)
        .then((response) => response.text())
        .then((responseText) => {
            // console.log('responseText', responseText);
            return JSON.parse(responseText);
        })
        .catch(e => {
            console.log('e', e);
        });
};


export const uploadImageTypes = async (payload) => {
    const token = await Store.get('token').then(res => res).catch(() => '');
    let params = payload.requestData;
    let formData = new FormData();
    let file = {uri: params.multipartFile, type: 'multipart/form-data', name: 'image.png'};
    formData.append('files', file);
    let fetchOptions = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'multipart/form-data',
            'Authorization': token,
        },
        timeout: timeout,
        body: formData,
    };
    // console.log('fetchOptions', fetchOptions);
    // console.log('payload.url', payload.url);
    return fetch(payload.url, fetchOptions)
        .then((response) => response.text())
        .then((responseText) => {
            // console.log('responseText', responseText);
            return JSON.parse(responseText);
        })
        .catch(e => {
            console.log('e', e);
        });
};

export const uploadVideo = async (payload) => {
    const token = await Store.get('token').then(res => res).catch(() => '');
    let params = payload.requestData;
    let formData = new FormData();
    let file = {uri: params.multipartFile, type: 'multipart/form-data', name: 'video.mp4'};
    formData.append('multipartFile', file);
    let fetchOptions = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'multipart/form-data',
            'Authorization': token,
        },
        timeout: timeout,
        body: formData,
    };
    return fetch(payload.url, fetchOptions)
        .then((response) => response.text())
        .then((responseText) => {
            ////console.log(responseText);
            return JSON.parse(responseText);
        })
        .catch(e => {
            ////console.log(e)
        });
};

export const uploadMixImage = async (payload) => {
    const token = await Store.get('token').then(res => res).catch(() => '');
    let params = payload.requestData;
    let formData = new FormData();
    for (let image of params.multipartFile) {
        let file = {uri: image, type: 'multipart/form-data', name: 'image.png'};
        formData.append('files', file);
    }

    let fetchOptions = {
        method: 'POST',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'multipart/form-data',
            'Authorization': token,
        },
        timeout: timeout,
        body: formData,
    };
    // console.log("fetchOptions", fetchOptions)
    // console.log("payload.url", payload.url)
    return fetch(payload.url, fetchOptions)
        .then((response) => response.text())
        .then((responseText) => {
            ////console.log(responseText);
            return JSON.parse(responseText);
        })
        .catch(e => {
            ////console.log(e)
        });
};

