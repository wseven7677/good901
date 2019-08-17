/**
 * 从数组中随机选择若干个项目返回
 * @param {Array} arr 数组
 * @param {Number} num 选取的个数
 */
function random(arr, num = 1) {
    const list = [...arr];
    const len = list.length;
    let rst = [];
    for(let i = 0; i < num && i < len; ++i) {
        let rn = Math.floor(Math.random() * list.length);
        rst.push(list[rn]);
        list.splice(rn, 1);
    }
    if(num === 1) {
        return rst[0];
    }else {
        return rst;
    }
};

export default random;