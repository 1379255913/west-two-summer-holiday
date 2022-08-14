export function roleJudge(id){
    if (id===1) return '普通用户'
    if (id===2) return '管理员'
}
export function forbidJudge(time){
    if (time >= new Date().getTime() / 1000) return '被禁言'
    return '正常状态'
}
