const Layout = () => import('@/layout/index.vue')

export default {
    path: 'http://47.112.108.202/dist/index.html',
    component: Layout,
    redirect: '/resume',
    name: 'resume',
    meta: {
        title: '简历制作',
        icon: 'resume'
    },
    // children: [
    //     {
    //         path: '',
    //         name: 'resume_index',
    //         component: () => import('@/views/CareerPath/resume/index.vue'),
    //         meta: {
    //             title: '简历制作',
    //             breadcrumb: false,
    //             sidebar: false,
    //             activeMenu: '/resume'
    //         }
    //     }
    // ]
}
