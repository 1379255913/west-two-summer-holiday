import api from '@/api'

import useRouteStore from './route'
import useMenuStore from './menu'


const useUserStore = defineStore(
    // 唯一ID
    'user',
    {
        state: () => ({
            account: localStorage.account || '',
            username: localStorage.username || '',
            token: localStorage.token || '',
            failure_time: localStorage.failure_time || '',
            permissions: []
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
            }
        },
        actions: {
            login(data) {
                console.log(data);
                return new Promise((resolve, reject) => {
                    // 通过 mock 进行登录
                    api.post('user/login', data).then(res => {
                        console.log(res)
                        localStorage.setItem('refresh_token', res.headers['refresh-token'])
                        localStorage.setItem('account', res.data.data.username)
                        localStorage.setItem('username', res.data.data.username)
                        localStorage.setItem('token', res.headers['authorization'])
                        localStorage.setItem('failure_time', (Math.ceil(new Date().getTime() / 1000) + 24 * 60 * 60).toString())
                        this.username= res.data.data.username
                        this.account = res.data.data.username
                        this.token = res.headers['authorization']
                        this.failure_time = (Math.ceil(new Date().getTime() / 1000) + 24 * 60 * 60).toString()
                        console.log(this.username,this.token,this.failure_time)
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
                    localStorage.removeItem('account')
                    localStorage.removeItem('token')
                    localStorage.removeItem('failure_time')
                    localStorage.removeItem('username')
                    this.username= ''
                    this.account = ''
                    this.token = ''
                    this.failure_time = ''
                    routeStore.removeRoutes()
                    menuStore.setActived(0)
                    resolve()
                })
            },
            // 获取我的权限
            getPermissions() {
                return new Promise(resolve => {
                    // 通过 mock 获取权限
                    api.get('member/permission', {
                        baseURL: '/mock/',
                        params: {
                            account: this.account
                        }
                    }).then(res => {
                        this.permissions = res.data.permissions
                        resolve(res.data.permissions)
                    })
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
            }
        }
    }
)

export default useUserStore
