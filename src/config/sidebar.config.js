// eslint-disable-next-line import/prefer-default-export
export const asyncSidebarMap = [
  {
    id: 'dashboard',
    icon: 'mdi-view-dashboard',
    title: 'dashboard',
    to: '/'
  },
  {
    id: 'pages',
    group: '/pages',
    icon: 'mdi-image',
    title: 'pages',
    children: [
      {
        id: 'pricing',
        title: 'pricing',
        to: 'pricing'
      },
      {
        id: 'rtl',
        title: 'rtl',
        to: 'rtl'
      },
      {
        id: 'timeline',
        title: 'timeline',
        to: 'timeline'
      },
      {
        id: 'login',
        title: 'login',
        to: 'login'
      },
      {
        title: 'register',
        to: 'register'
      },
      {
        title: 'lock',
        to: 'lock'
      },
      {
        title: 'user',
        to: 'user'
      },
      {
        title: 'error',
        to: '404'
      }
    ]
  },
  {
    id: 'components',
    group: '/components',
    icon: 'mdi-view-comfy',
    title: 'components',
    children: [
      {
        id: 'buttons',
        title: 'multi',
        group: '',
        children: [
          {
            id: 'buttons',
            title: 'example',
            href: '#'
          }
        ]
      },
      {
        id: 'buttons',
        title: 'buttons',
        to: 'buttons'
      },
      {
        id: 'grid_system',
        title: 'grid',
        to: 'grid-system'
      },
      {
        id: 'tabs',
        title: 'tabs',
        to: 'tabs'
      },
      {
        id: 'notifications',
        title: 'notifications',
        to: 'notifications'
      },
      {
        id: 'icons',
        title: 'icons',
        to: 'icons'
      },
      {
        id: 'typography',
        title: 'typography',
        to: 'typography'
      }
    ]
  },
  {
    id: 'forms',
    group: '/forms',
    icon: 'mdi-clipboard-outline',
    title: 'forms',
    children: [
      {
        id: 'rforms',
        title: 'rforms',
        to: 'regular'
      },
      {
        id: 'eforms',
        title: 'eforms',
        to: 'extended'
      },
      {
        title: 'vforms',
        to: 'validation'
      },
      {
        title: 'wizard',
        to: 'wizard'
      }
    ]
  },
  {
    id: 'tables',
    group: '/tables',
    icon: 'mdi-grid',
    title: 'tables',
    children: [
      {
        id: 'rtables',
        title: 'rtables',
        to: 'regular-tables'
      },
      {
        id: 'etables',
        title: 'etables',
        to: 'extended-tables'
      },
      {
        id: 'dtables',
        title: 'dtables',
        to: 'data-tables'
      }
    ]
  },
  {
    id: 'wechat',
    group: '/wechat',
    icon: 'mdi-wechat',
    title: 'wechat',
    children: [
      {
        id: 'wgroup',
        title: '微信群',
        to: 'wgroup'
      }
    ]
  },

  {
    icon: 'mdi-widgets',
    title: 'widgets',
    to: '/widgets'
  },
  {
    icon: 'mdi-chart-timeline-variant',
    title: 'charts',
    to: '/charts'
  },
  {
    icon: 'mdi-calendar-range',
    title: 'calendar',
    to: '/calendar'
  }
]
