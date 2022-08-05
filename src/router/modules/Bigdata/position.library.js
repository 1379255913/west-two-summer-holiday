const Layout = () => import('@/layout/index.vue')

export default {
    path: '/position_library',
    component: Layout,
    name: 'position_library',
    meta: {
        title: '职位库',
        icon: 'application'
    },
    children: [
        {
            path: '',
            name: 'position_library_index',
            component: () => import('@/views/BigData/test.vue'),
            meta: {
                title: '职位库',
                breadcrumb: false,
                sidebar: false,
                activeMenu: '/position_library'
            }
        }
    ]
}
