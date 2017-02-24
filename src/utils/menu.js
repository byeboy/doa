module.exports = [
  {
    key: 'dashboard',
    name: '仪表盘',
    icon: 'laptop',
    permission: 1,
  },
  {
    key: 'notices',
    name: '最新公告',
    icon: 'notification',
    permission: 1,
  },
  {
    key: 'tasks',
    name: '任务清单',
    icon: 'solution',
    permission: 1,
  },
  {
    key: 'branches',
    name: '部门详情',
    icon: 'appstore-o',
    permission: 1,
  },
  {
    key: 'users',
    name: '职员一览',
    icon: 'team',
    permission: 1,
  },
  {
    key: 'navigation',
    name: '测试导航',
    icon: 'setting',
    child: [
      {
        key: 'navigation1',
        name: '二级导航1'
      },
      {
        key: 'navigation2',
        name: '二级导航2',
        child: [
          {
            key: 'navigation21',
            name: '三级导航1'
          },
          {
            key: 'navigation22',
            name: '三级导航2'
          }
        ]
      }
    ]
  }
]
