import moment from 'moment'

import regex from './regex'

export const convertStringToNumber =  (value, delimiter = '.')  => {
    if (value || value === 0) {
        return `${value.toString().replace(regex.formatMoney, delimiter)} Vnđ`
    }
    return '0'
}

export const getDate = (timestamp, type = 1) => {
    if (timestamp == null) {
        return null;
    }
    let result = null;
    switch (type) {
        case 1:
            result = moment(timestamp).format('DD/MM/YYYY');
            break;
        case 2:
            result = moment(timestamp).format('DD.MM.yyyy - HH:mm');
            break;
        case 3:
            result = moment(timestamp).format('yyyy-MM-DD');
            break;
        case 4:
            result = moment(timestamp).format('HH:mm:ss - DD.MM.yyyy');
            break;
        case 5:
            result = moment(timestamp).format('DD.MM.yyyy - HH:mm');
            break;
        case 6:
            result = moment(timestamp).format('HH:mm');
            break;
        case 7:
            result = moment(timestamp).format('HH:mm  DD.MM.yyyy');
            break;
        case 8:
            result = moment(timestamp).format('MM/DD/YYYY');
            break;
        case 9:
            result = moment(timestamp).format('YYYY');
            break;
        case 10:
            result = moment(timestamp).format('MM');
            break;
        case 11:
            result = moment(timestamp).format('MM/YYYY');
            break;
        default:
            break;
    }
    return result;
}