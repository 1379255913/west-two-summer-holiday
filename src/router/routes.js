import pinia from '@/store'
import useSettingsStore from '@/store/modules/settings'
// 固定路由（默认路由）
let constantRoutes = [
    {
        path: '/',
        redirect: '/dashboard'
    },
    {
        path: '/login',
        name: 'login',
        component: () => import('@/views/login.vue'),
        meta: {
            title: '登录'
        }
    },
    {
        path: '/:all(.*)*',
        name: 'notFound',
        component: () => import('@/views/[...all].vue'),
        meta: {
            title: '找不到页面'
        }
    }
]

// 系统路由
let systemRoutes = [
    {
        path: '/dashboard',
        component: () => import('@/layout/index.vue'),
        meta: {
            title: () => {
                return useSettingsStore().dashboard.title
            },
            breadcrumb: false
        },
        children: [
            {
                path: '',
                name: 'dashboard',
                component: () => import('@/views/index.vue'),
                meta: {
                    title: () => {
                        return useSettingsStore().dashboard.title
                    },
                    breadcrumb: false
                }
            }
        ]
    },
    {
        path: '/personal',
        component: () => import('@/layout/index.vue'),
        redirect: '/personal/setting',
        meta: {
            title: '个人中心',
            breadcrumb: false
        },
        children: [
            {
                path: 'setting',
                name: 'personalSetting',
                component: () => import('@/views/personal/setting.vue'),
                meta: {
                    title: '个人设置',
                    i18n: 'route.personal.setting',
                    cache: 'personalEditPassword'
                }
            },
            {
                path: 'edit/password',
                name: 'personalEditPassword',
                component: () => import('@/views/personal/edit.password.vue'),
                meta: {
                    title: '修改密码',
                    i18n: 'route.personal.editpassword'
                }
            }
        ]
    },
    {
        path: '/my_collect',
        component: () => import('@/layout/index.vue'),
        name: 'myCollect',
        redirect: '/my_collect',
        meta: {
            title: '我的收藏',
            breadcrumb: false
        },
        children: [
            {
                path: '',
                name: 'myCollect_index',
                component: () => import('@/views/personal/myfavorite.vue'),
                meta: {
                    title: '我的收藏',
                }
            },
        ]
    },
    {
        path: '/my_message',
        component: () => import('@/layout/index.vue'),
        name: 'myMessage',
        redirect: '/my_message',
        meta: {
            title: '我的消息',
            breadcrumb: false
        },
        children: [
            {
                path: '',
                name: 'myMessage_index',
                component: () => import('@/views/Chat/index.vue'),
                meta: {
                    title: '我的消息',
                }
            },
        ]
    },
    {
        path: '/personal_info',
        component: () => import('@/layout/index.vue'),
        name: 'personalInfo',
        redirect: '/personal_info',
        meta: {
            title: '个人信息',
            breadcrumb: false
        },
        children: [
            {
                path: ':id',
                name: 'personalInfo_index',
                component: () => import('@/views/personal/info.vue'),
                meta: {
                    title: '个人信息',
                }
            },
        ]
    },
    {
        path: '/reload',
        component: () => import('@/layout/index.vue'),
        meta: {
            title: '重新加载',
            breadcrumb: false
        },
        children: [
            {
                path: '',
                name: 'reload',
                component: () => import('@/views/reload.vue'),
                meta: {
                    title: '重新加载',
                    breadcrumb: false
                }
            }
        ]
    }
]

import MultilevelMenuExample from './modules/multilevel.menu.example'
import BreadcrumbExample from './modules/breadcrumb.example'
import PositionLibrary from './modules/Bigdata/position.library'
import SalaryAnalysis from './modules/Bigdata/salary.analysis'
import JobRecommend from './modules/Bigdata/job.recommend'
import WordCloud from './modules/Bigdata/wordcloud'
import DataAnalysis from './modules/Bigdata/data.analysis'
import Resume from './modules/CareerPath/resume'
import Skill from './modules/CareerPath/skill'
import communicate from "@/router/modules/CareerPath/communicate";
import tips from "@/router/modules/CareerPath/tips";
import GeneralSkills from "@/router/modules/SkillLearning/GeneralSkills";
import ToolRecommendation from "@/router/modules/SkillLearning/ToolRecommendation";
import senior_experience from "@/router/modules/Community/senior_experience";
// 动态路由（异步路由、导航栏路由）
let asyncRoutes = [
    {
        meta: {
            title: '求职大数据',
        },
        children: [
            PositionLibrary,
            DataAnalysis,
            WordCloud,
            SalaryAnalysis,
            JobRecommend
        ]
    },
    {
        meta: {
            title: '求职之路',
        },
        children: [
            Resume,
            Skill,
            communicate,
            tips,
        ]
    },
    {
        meta: {
            title: '技能学习',
        },
        children: [
            GeneralSkills,
            ToolRecommendation
        ]
    },
    {
        meta: {
            title: '社区',
        },
        children: [
            senior_experience
        ]
    }
]

import { setupLayouts } from 'virtual:generated-layouts'
import generatedRoutes from 'virtual:generated-pages'

if (useSettingsStore(pinia).app.routeBaseOn === 'filesystem') {
    constantRoutes = generatedRoutes.filter(item => {
        return item.meta?.enabled !== false && item.meta?.constant === true
    })
    asyncRoutes = setupLayouts(generatedRoutes.filter(item => {
        return item.meta?.enabled !== false && item.meta?.constant !== true && item.meta?.layout !== false
    }))
}

export {
    constantRoutes,
    systemRoutes,
    asyncRoutes
}
