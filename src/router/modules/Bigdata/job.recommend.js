const Layout = () => import('@/layout/index.vue')

export default {
    path: '/job_recommend',
    component: Layout,
    name: 'job_recommend',
    meta: {
        title: '职位推荐',
        icon: 'recommend'
    },
    children: [
        {
            path: '',
            name: 'job_recommend_index',
            component: () => import('@/views/BigData/jobRecommend/index.vue'),
            meta: {
                title: '职位推荐',
                breadcrumb: false,
                sidebar: false,
                activeMenu: '/job_recommend'
            }
        }
    ]
}
