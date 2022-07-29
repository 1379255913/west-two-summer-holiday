const Layout = () => import('@/layout/index.vue')

export default {
    path: '/senior_experience',
    component: Layout,
    name: 'senior_experience',
    redirect: '/senior_experience',
    meta: {
        title: '前辈经验',
        icon: 'experience',
        detail: 'senior_experience_detail',
    },
    children: [
        {
            path: '',
            name: 'senior_experience_index',
            component: () => import('@/views/Community/index.vue'),
            meta: {
                title: '前辈经验',
                breadcrumb: false,
                sidebar: false,
                activeMenu: '/senior_experience'
            }
        },
        // {
        //     path: 'detail/:id',
        //     name: 'senior_experience_detail',
        //     component: () => import('@/views/CareerPath/article/detail.vue'),
        //     meta: {
        //         title: '文章详情',
        //         sidebar: false,
        //         activeMenu: '/senior_experience'
        //     }
        // },
    ]
}
