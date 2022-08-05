const Layout = () => import('@/layout/index.vue')

export default {
    path: '/salary_analysis',
    component: Layout,
    name: 'salary_analysis',
    meta: {
        title: '薪水分析',
        icon: 'dotchart'
    },
    children: [
        {
            path: '',
            name: 'salary_analysis_index',
            component: () => import('@/views/BigData/test.vue'),
            meta: {
                title: '薪水分析',
                breadcrumb: false,
                sidebar: false,
                activeMenu: '/salary_analysis'
            }
        }
    ]
}
