const Layout = () => import('@/layout/index.vue')

export default {
    path: '/interview_skills',
    component: Layout,
    name: 'interview_skills',
    redirect: '/interview_skills',
    meta: {
        title: '面试技巧',
        icon: 'job-search',
        detail: 'interview_skills_detail',
    },
    children: [
        {
            path: '',
            name: 'interview_skills_index',
            component: () => import('@/views/CareerPath/article/index.vue'),
            meta: {
                title: '面试技巧',
                breadcrumb: false,
                sidebar: false,
                activeMenu: '/interview_skills'
            }
        },
        {
            path: 'detail/:id',
            name: 'interview_skills_detail',
            component: () => import('@/views/CareerPath/article/detail.vue'),
            meta: {
                title: '文章详情',
                sidebar: false,
                activeMenu: '/interview_skills'
            }
        },
    ]
}
