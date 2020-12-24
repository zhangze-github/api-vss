import {forEach, get, isNaN, throttle} from "lodash-es";
/**
 * 检测图片是否有超出指定大小 默认10M
 * @param filesArr 文件数组
 * @param size 大小限制 单位M 默认10M
 * @returns {boolean} 超过限制为true 否则false
 */
export function testImgSize(filesArr, size = 10) {
    let sizeLimit = size * 1024000;
    let result = false;
    forEach(filesArr, (item) => {
        if (get(item, ['size'], '') > sizeLimit) {
            result = true;
        }
    });
    return result;
}
/**
 * 获取浏览器单个参数
 * @param name 参数名
 * @returns {string|boolean}
 */
export function getQuery(name) {
    var query = window.location.hash.split('?')[1];
    if(query === undefined){
        return false;
    }
    var vars = query.split("&");
    for (var i = 0; i < vars.length; i++) {
        var pair = vars[i].split("=");
        if (pair[0] == name) {
            return pair[1];
        }
    }
    return (false);
}
/**
 * 转换时间格式 2020-05-14T10:56:13.000+0000 ==> 2020/05/14 18:56:13
 * @param time
 * @returns {string}
 */
export function timeFormat(time) {
    if (!time) {
        return '';
    }
    var d = new Date(time);
    var year = d.getFullYear();       //年
    // 兼容IE
    if(isNaN(year)){
        time = time.slice(0, 19);
        time = time.replace(/-/g, "/");
        d = new Date(time).getTime();
        d += 7 * 60 * 60 * 1000;
        d = new Date(d);
        year = d.getFullYear();
    }
    var month = d.getMonth() + 1;     //月
    var day = d.getDate();            //日
    var hh = d.getHours();            //时
    var mm = d.getMinutes();          //分
    var ss = d.getSeconds();          //秒
    var clock = year + "-";
    if (month < 10)
        clock += "0";
    clock += month + "-";
    if (day < 10)
        clock += "0";
    clock += day + " ";
    if (hh < 10)
        clock += "0";
    clock += hh + ":";
    if (mm < 10) clock += '0';
    clock += mm + ":";
    if (ss < 10) clock += '0';
    clock += ss;
    return (clock);
}
/**
 * 转换时间格式 2020-05-14T10:56:13.000+0000 ==> 2020/05/14
 * @param time
 * @returns {string}
 */
export function timeFormatNoTime(time) {
    if (!time) {
        return '';
    }
    var d = new Date(time);
    var year = d.getFullYear();       //年
    // 兼容IE
    if(isNaN(year)){
        time = time.slice(0, 19);
        time = time.replace(/-/g, "/");
        d = new Date(time).getTime();
        d += 7 * 60 * 60 * 1000;
        d = new Date(d);
        year = d.getFullYear();
    }
    var month = d.getMonth() + 1;     //月
    var day = d.getDate();            //日
    var clock = year + "-";
    if (month < 10)
        clock += "0";
    clock += month + "-";
    if (day < 10)
        clock += "0";
    clock += day;
    return (clock);
}
/**
 * 将 1 转换成 01
 * @param number
 * @returns {string}
 */
export function parseNumber(number){
    if(String(number).length === 1){
        return '0' + number;
    }else{
        return number;
    }
}
/**
 * 判断是否是该页最后一条数据 最后一条数据被删除 再查询的currentPage应该减一
 * @param total 数据总数
 * @param pageSize 每页数据量
 * @param currentPage 当前页
 * @returns {boolean} true应减一
 */
export function isLast(total, pageSize, currentPage) {
    if(currentPage === 1){
        return false;
    }
    if(total - (pageSize * (currentPage - 1)) === 1){
        return true;
    }
    return false;
}
/**
 * 获取表单验证的第一条错误信息
 * @param msg
 * @returns {*}
 */
export function getFirstErrorMsg(msg){
    return get(Object.values(msg), ['0', '0','message'], '');
}
/**
 * 按键的节流函数 切忌内部fun不能使用箭头函数
 * @param fun
 * @returns {debounced}
 */
export function thro (fun){
    return throttle(fun, 1000, {trailing: false});
}

