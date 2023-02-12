// eslint-disable-next-line
export function checkPhone(e) {
    var reg = /^[\d ()+-.]+$/;
    if (e === "") {
        return false
    } else if (!reg.test(e)) {
        return 'the field must be contain symbol and number';
    } else {
        return false;
    }
}
export function checkName(e) {
    var reg = /^[A-Za-z]+([A-Za-z]*|[._-]?[A-Za-z]+)*$/;
    if (e === "") {
        return false
    } else if (!reg.test(e)) {
        return 'the field must be contain letters';
    } else {
        return false;
    }
}
