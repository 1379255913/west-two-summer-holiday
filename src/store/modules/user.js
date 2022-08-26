import api from '@/api'

import useRouteStore from './route'
import useMenuStore from './menu'
import useChatStore from "./chat"

const useUserStore = defineStore(
    // 唯一ID
    'user',
    {
        state: () => ({
            account: localStorage.account || '',
            username: localStorage.username || '',
            token: localStorage.token || '',
            failure_time: localStorage.failure_time || '',
            avatar: localStorage.avatar || '',
            tags: localStorage.tags?JSON.parse(localStorage.tags):[],
            permissions: localStorage.permissions?JSON.parse(localStorage.permissions):[],
            role: localStorage.role?parseInt(localStorage.role):1,
            forbid: localStorage.forbid?parseFloat(localStorage.forbid):1760123524,
            user_id: localStorage.user_id || '',
        }),
        getters: {
            isLogin: state => {
                let retn = false
                if (state.token) {
                    if (new Date().getTime() < state.failure_time * 1000) {
                        retn = true
                    }
                }
                return retn
            },
            isForbid: state => {
                return state.forbid >= new Date().getTime() / 1000;
            }
        },
        actions: {
            login(data) {
                console.log(data);
                return new Promise((resolve, reject) => {
                    // 通过 mock 进行登录
                    api.post('user/login/', data).then(res => {
                        console.log(res)
                        localStorage.setItem('refresh_token', res.headers['refresh-token'])
                        localStorage.setItem('account', res.data.data.username)
                        localStorage.setItem('username', res.data.data.username)
                        localStorage.setItem('user_id', res.data.data.user_id)
                        localStorage.setItem('token', res.headers['authorization'])
                        localStorage.setItem('failure_time', (Math.ceil(new Date().getTime() / 1000) + 24 * 60 * 60).toString())
                        localStorage.setItem('avatar', res.data.data.avatar)
                        localStorage.setItem('tags', JSON.stringify(res.data.data.tags))
                        localStorage.setItem('role',res.data.data.role)
                        localStorage.setItem('forbid',res.data.data.forbid)
                        this.username= res.data.data.username
                        this.account = res.data.data.username
                        this.user_id = res.data.data.user_id
                        this.token = res.headers['authorization']
                        this.failure_time = (Math.ceil(new Date().getTime() / 1000) + 24 * 60 * 60).toString()
                        this.avatar = res.data.data.avatar
                        this.tags = res.data.data.tags
                        this.role = res.data.data.role
                        this.forbid = res.data.data.forbid
                        this.getPermissions().then()
                        resolve()
                    }).catch(error => {
                        reject(error)
                    })
                })
            },
            logout() {
                return new Promise(resolve => {
                    const routeStore = useRouteStore()
                    const menuStore = useMenuStore()
                    const chatStore = useChatStore()
                    localStorage.removeItem('account')
                    localStorage.removeItem('token')
                    localStorage.removeItem('failure_time')
                    localStorage.removeItem('username')
                    localStorage.removeItem('refresh_token')
                    localStorage.removeItem('avatar')
                    localStorage.removeItem('tags')
                    localStorage.removeItem('role')
                    localStorage.removeItem('forbid')
                    localStorage.removeItem('permission')
                    localStorage.removeItem('user_id')
                    this.username= ''
                    this.account = ''
                    this.user_id = ''
                    this.token = ''
                    this.failure_time = ''
                    this.avatar = ''
                    this.tags = ''
                    this.role = 1
                    this.forbid = 1760123524
                    this.permission = []
                    routeStore.removeRoutes()
                    menuStore.setActived(0)
                    chatStore.clearData()
                    resolve()
                })
            },
            // 获取我的权限
            getPermissions() {
                return new Promise(resolve => {
                    let permissions = []
                    if (this.role === 2) {
                        permissions = [
                            'permission.browse',
                            'permission.edit',
                            'permission.remove'
                        ]
                    } else if (this.role === 1) {
                        permissions = [
                            'permission.browse'
                        ]
                    }
                    if (this.forbid<new Date().getTime()/1000){
                        permissions.push('permission.create')
                    }
                    console.log(permissions)
                    this.permissions = permissions
                    localStorage.setItem('permission',JSON.stringify(permissions))
                    resolve(permissions)
                })
            },
            editPassword(data) {
                return new Promise(resolve => {
                    api.post('member/edit/password', {
                        account: this.account,
                        password: data.password,
                        newpassword: data.newpassword
                    }, {
                        baseURL: '/mock/'
                    }).then(() => {
                        resolve()
                    })
                })
            },
        }
    }
)

export default useUserStore
