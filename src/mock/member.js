export default [
    {
        url: '/mock/user/login',
        method: 'post',
        response: option => {
            return {
                code: 200,
                message: 'success',
                data: {
                    account: option.body.account,
                    token: '@string',
                    failure_time: Math.ceil(new Date().getTime() / 1000) + 24 * 60 * 60
                }
            }
        }
    },
    {
        url: '/mock/member/permission',
        method: 'get',
        response: option => {
            let permissions = []
            if (option.query.role === 2) {
                permissions = [
                    'permission.browse',
                    'permission.edit',
                    'permission.remove'
                ]
            } else if (option.query.role === 1) {
                permissions = [
                    'permission.browse'
                ]
            }
            if (option.query.forbid<new Date().getTime()/1000){
                permissions.push('permission.create')
            }
            return {
                code: 200,
                message: 'success',
                data: {
                    permissions
                }
            }
        }
    },
    {
        url: '/mock/member/edit/password',
        method: 'post',
        response: {
            code: 200,
            message: 'success',
            data: {
                isSuccess: true
            }
        }
    }
]
