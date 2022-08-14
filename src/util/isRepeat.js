export default function isRepeat(arr){
    let hash = {};
    for(let i in arr) {
        if(hash[arr[i]]) {
            return true;
        }
        // 不存在该元素，则赋值为true，可以赋任意值，相应的修改if判断条件即可
        hash[arr[i]] = true;
    }
    return false;
}
