import Vue from 'vue'
import Router from 'vue-router'
// import Currenttask from '../components/homeMenu/Currenttask.vue'
// import Timeouttask from '../components/homeMenu/Timeouttask.vue'
// import Detail from '../components/homeMenu/Detail.vue'
// import Doingwork from '../components/homeMenu/Doingwork.vue'
// import Downwork from '../components/homeMenu/Downwork.vue'
// import Workdetail from '@/components/homeMenu/Workdetail'
// import Checking from '../components/homeMenu/Checking'
// import Checked from '../components/homeMenu/Checked'
// import Checkdetail from '../components/homeMenu/Checkdetail'
// import Hiddendetail from '../components/homeMenu/Hiddendetail'
// import Controldetail from '../components/homeMenu/Controldetail'
// import Choosecarry from '../components/homeMenu/Choosecarry'
// import Choodecheck from '../components/homeMenu/Choodecheck'
// import  Mymessage from '../components/homeMenu/Mymessage'
import MyTask from '../components/homeMenu/MyTask'
// import Myset from '../components/homeMenu/Myset'
// import About from '../components/homeMenu/About'
// import Mydata from '../components/homeMenu/Mydata'
// import Responsible from '../components/homeMenu/Responsible'
// import Checkingdetail from '../components/homeMenu/Checkingdetail'
// import Taskresult from '../components/homeMenu/Taskresult'
// import Standard from '../components/homeMenu/Standard'
// import Checkingresult from '../components/homeMenu/Checkingresult'


Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path:'/ScanPage',
      name:'scanPage',
      meta: {
        title: '我的任务',
      },
      component: resolve => void (require(['@/components/homeMenu/scanPage.vue'], resolve)),
    },
    {
      path:'/historyPage',
      meta: {
        title: '历史任务',
      },
      name:'historyPage',
      component: resolve => void (require(['@/components/homeMenu/historyPage.vue'], resolve)),
    },
    {
      path:'/hisDetail',
      meta: {
        title: '历史任务详情',
      },
      name:'hisDetail',
      component: resolve => void (require(['@/components/homeMenu/hisDetail.vue'], resolve)),
    },
    {
      path: '/Scan',
      name: 'Scan',
      component: resolve => void (require(['@/components/scan'], resolve)),
    },
    {
      path: '/Login',
      name: 'Login',
      component: resolve => void (require(['@/components/Login'], resolve)),
    }, //登录
    {
      path: '/',
      name: 'Home',
      component: resolve => void (require(['@/components/Home'], resolve)),
      meta: {
        title: '企业安全管理',
      }
    }, //首页
    //我的消息
    {
      path: '/MyTask/Mymessage',
      name: 'Mymessage',
      component: resolve => void (require(['@/components/homeMenu/Mymessage.vue'], resolve)),
      meta: {
        title: '我的消息',
      },
    },
    //我的资料
    {
      path: '/MyTask/Mydata',
      name: 'Mydata',
      component: resolve => void (require(['@/components/homeMenu/Mydata.vue'], resolve)),
      meta: {
        title: '我的资料',
      },
    },
     //我的设置
     {
      path: '/MyTask/Myset',
      name: 'Myset',
      component: resolve => void (require(['@/components/homeMenu/Myset.vue'], resolve)),
      meta: {
        title: '设置',
      },
    },
    {
      path: '/MyTask/Myset/About',
      name: 'About',
      component: resolve => void (require(['@/components/homeMenu/About.vue'], resolve)),
      meta: {
        title: '关于',
      },
    },
    {
      path: '/MyTask',
      name: 'MyTask',
      component: resolve => void (require(['@/components/homeMenu/MyTask.vue'], resolve)),
      meta: {
        title: '我的任务',
      },
      children:[
        {
          path:'/',
          redirect:'/MyTask/Currenttask'
        },

        {
          path:'/MyTask/Currenttask',
          name:'Currenttask',
          component: resolve => void (require(['@/components/homeMenu/Currenttask.vue'], resolve)),
          meta: {
            title: '我的任务',
          },
        },
        {
          path:'/MyTask/Timeouttask',
          name:'Timeouttask',
          component: resolve => void (require(['@/components/homeMenu/Timeouttask.vue'], resolve)),
          meta: {
            title: '我的任务',
          },
        }

      ]
    },//我的任务
    {
      path: '/MyCheck',
      name: 'MyCheck',
      component: resolve => void (require(['@/components/homeMenu/MyCheck'], resolve)),
      meta: {
        title: '任务详情',
      },
      children:[
        {
          path:'/',
          redirect:'/MyCheck/Checking'
        },
        {
          path:'/MyCheck/Checking',
          name:'Checking',
          component: resolve => void (require(['@/components/homeMenu/Checking.vue'], resolve)),
          meta: {
            title: '任务详情',
          },
        },
        {
          path:'/MyCheck/Checked',
          name:'Checked',
          component: resolve => void (require(['@/components/homeMenu/Checked.vue'], resolve)),
          meta: {
            title: '任务详情',
          }
        }
      ]

    },//我的检查
    {
      path: '/textApply',
      name: 'textApply',
      component: resolve => void (require(['@/components/homeMenu/textApply.vue'], resolve)),
      meta: {
        title: '作业申请',
      },
    }, //作业申请
    {
     path:'/textApply/addText',
     name:'addText',
     component:resolve=>void(require(['@/components/homeMenu/addText'],resolve))
    },//新建作业

    {
      path:'/textApply/changeTextApply',
      name:'changeText',
      component:resolve=>void(require(['@/components/homeMenu/changeTextApply'],resolve))
    },//修改作业
    {
      path: '/MyWork',
      name: 'MyWork',
      component: resolve => void (require(['@/components/homeMenu/MyWork'], resolve)),
      meta: {
        title: '我的作业',
      },
      children:[
        {
          path:'/',
          redirect:'/MyWork/Doingwork'
        } ,
        {
          path:'/MyWork/Doingwork',
          name:'Doingwork',
          component: resolve => void (require(['@/components/homeMenu/Doingwork.vue'], resolve)),
          meta: {
            title: '我的作业',
          }
        },
        {
          path:'/MyWork/Downwork',
          name:'Downwork',
          component: resolve => void (require(['@/components/homeMenu/Downwork.vue'], resolve)),
          meta: {
            title: '我的作业',
          }

        }
    ]
    },//我的作业
    {
      path:'/MyWork/Checkdetail',
      name:'Checkdetail',
      component: resolve => void (require(['@/components/homeMenu/Checkdetail.vue'], resolve)),
      meta: {
        title: '作业详情',
      }
    },
    {
      path:'/MyWork/Checkingdetail',
      name:'Checkingdetail',
      component: resolve => void (require(['@/components/homeMenu/Checkingdetail.vue'], resolve)),
      meta: {
        title: '作业详情',
      }
    },
    {
      path:'/MyWork/Workdetail',
      name:'Workdetail',
      component: resolve => void (require(['@/components/homeMenu/Workdetail.vue'], resolve)),
      meta: {
        title: '作业详情',
      }
    },
    //任务检查结果
    {
      path:'/MyWork/Workdetail/Taskresult',
      name:'Taskresult',
      component: resolve => void (require(['@/components/homeMenu/Taskresult.vue'], resolve)),
      meta:{
        title:'任务检查结果'
      }
    },
    {
      path:'/MyWork/Workdetail/Checkingresult',
      name:'Checkingresult',
      component: resolve => void (require(['@/components/homeMenu/Checkingresult.vue'], resolve)),
      meta:{
        title:'任务检查结果'
      }
    },
    {
      path:'/MyWork/Workdetail/Standard',
      name:'Standard',
      component: resolve => void (require(['@/components/homeMenu/Standard.vue'], resolve)),
      meta:{
        title:'查看标准'
      }
    },
    {
      path: '/TemporaryTask',
      name: 'TemporaryTask',
      component: resolve => void (require(['@/components/homeMenu/TemporaryTask'], resolve)),
      meta: {
        title: '添加临时任务',
      }

    },//临时任务
    {
      path: '/Announcement',
      name: 'Announcement',
      component: resolve => void (require(['@/components/homeMenu/Announcement'], resolve)),
      meta: {
        title: '风险公示',
      },
    },
    //公示公告
    {
      path:'/Announcement/Detail',
      name:'Detail',
      component: resolve => void (require(['@/components/homeMenu/Detail.vue'], resolve)),
      meta: {
        title: '风险描述',
      },
    },
    //风险描述
    {
      path: '/HiddenTrouble',
      name: 'HiddenTrouble',
      component: resolve => void (require(['@/components/homeMenu/HiddenTrouble'], resolve)),
      meta: {
        title: '隐患管控',
      }

    },//隐患管控
    {
      path:'/HiddenTrouble/Controldetail',
      name:'Controldetail',
      component: resolve => void (require(['@/components/homeMenu/Controldetail.vue'], resolve)),
      mata:{
        title:'处理管控项',
      }
    },
    {
      path:'/HiddenTrouble/Hiddendetail',
      name:'Hiddendetail',
      component: resolve => void (require(['@/components/homeMenu/Hiddendetail.vue'], resolve)),
      mata:{
        title:'处理管控项',
      }
    },
    {
      path:'/HiddenTrouble/Hiddendetail/Choodecheck',
      name:'Choodecheck',
      component: resolve => void (require(['@/components/homeMenu/Choodecheck.vue'], resolve)),
      mata:{
        title:'人员选择',
      }
    },
    {
      path:'/HiddenTrouble/Responsible',
      name:'Responsible',
      component: resolve => void (require(['@/components/homeMenu/Responsible.vue'], resolve)),
      mata:{
        title:'人员选择',
      }
    },
    {
      path:'/HiddenTrouble/Hiddendetail/Choosecarry',
      name:'Choosecarry',
      component: resolve => void (require(['@/components/homeMenu/Choosecarry.vue'], resolve)),
      mata:{
        title:'人员选择',
      }
    },
    {
      path: '/Video',
      name: 'Video',
      component: resolve => void (require(['@/components/homeMenu/Video'], resolve)),
      meta: {
        title: '视频监控',
      }
    },
    {
        path: '/ApprovalPending',
        name: 'ApprovalPending',
        component: resolve => void (require(['@/components/homeMenu/ApprovalPending.vue'], resolve)),
        meta: {
          title: '待审批',
        }
      },
      {
        path: '/TrainingManage',
        name: 'TrainingManage',
        component: resolve => void (require(['@/components/homeMenu/TrainingManage.vue'], resolve)),
        meta: {
          title: '培训管理',
        }
      },
    {
      path: '/Security',
      name: 'Security',
      component: resolve => void (require(['@/components/homeMenu/Security.vue'], resolve)),
      meta: {
        title: '安全会议',
      }
    },
    {
      path: '/Security/addSecurity',
      name: 'addSecurity',
      component: resolve => void (require(['@/components/homeMenu/addSecurity.vue'], resolve)),
      meta: {
        title: '新建安全会议',
      }
    },
    {
      path: '/Security/securityDetail',
      name: 'securityDetail',
      component: resolve => void (require(['@/components/homeMenu/securityDetail.vue'], resolve)),
      meta: {
        title: '安全会议详情',
      }
    },
    {
      path: '/Security/changeSecurity',
      name: 'changeSecurity',
      component: resolve => void (require(['@/components/homeMenu/changeSecurity.vue'], resolve)),
      meta: {
        title: '修改安全会议',
      }
    },
  ]
})
