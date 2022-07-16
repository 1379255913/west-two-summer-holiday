const Layout = () => import('@/layout/index.vue')

export default {
    path: '/resume',
    component: Layout,
    redirect: '/resume',
    name: 'resume',
    meta: {
        title: '简历制作',
        icon: 'resume'
    },
    children: [
        {
            path: '',
            name: 'resume_index',
            component: () => import('@/views/CareerPath/resume/index.vue'),
            meta: {
                title: '简历制作',
                breadcrumb: false,
                sidebar: false,
                activeMenu: '/resume'
            }
        }
    ]
}
