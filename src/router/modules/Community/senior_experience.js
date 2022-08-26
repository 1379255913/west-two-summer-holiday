const Layout = () => import('@/layout/index.vue')

export default {
    path: '/senior_experience',
    component: Layout,
    name: 'senior_experience',
    redirect: '/senior_experience',
    meta: {
        title: '社区',
        icon: 'experience',
        detail: 'senior_experience_detail',
    },
    children: [
        {
            path: '',
            name: 'senior_experience_index',
            component: () => import('@/views/Community/index.vue'),
            meta: {
                title: '社区',
                breadcrumb: false,
                sidebar: false,
                activeMenu: '/senior_experience'
            }
        },
        {
            path: 'senior_experience_question',
            name: 'senior_experience_question',
            component: () => import('@/views/Community/send/index.vue'),
            meta: {
                title: '提问',
                sidebar: false,
                activeMenu: '/senior_experience'
            }
        },
        {
            path: 'detail/:id',
            name: 'senior_experience_detail',
            component: () => import('@/views/Community/detail.vue'),
            meta: {
                title: '提问详情',
                sidebar: false,
                activeMenu: '/senior_experience'
            }
        },
        {
            path: 'senior_experience_vote',
            name: 'senior_experience_vote',
            component: () => import('@/views/Community/vote/index.vue'),
            meta: {
                title: '发起投票',
                sidebar: false,
                activeMenu: '/senior_experience_vote'
            }
        },
    ]
}
