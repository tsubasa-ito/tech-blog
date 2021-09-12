module.exports = {
  title: 'Tsubasa Web Memo',
  description: '気になったことの備忘録的なメモ（プログラミング・マーケティング）',
  theme: '@vuepress/theme-blog',
  locales: {
    '/': {
      lang: 'ja'
    }
  },
  plugins: [
    '@vuepress/blog'
  ],
  theme: 'meteorlxy',
  themeConfig: {
    lang: 'ja-JP',
    personalInfo: {
      nickname: 'Tsubasa',
      description: '気になったことの備忘録的なメモ（プログラミング・マーケティング）',
      location: 'Tokyo',
      avatar: '/img/user.png',
      sns: {
        github: {
          account: 'Tsubasa',
          link: 'https://github.com/tsubasa-ito'
        },
        twitter: {
          account: 'Tsubasa',
          link: 'https://twitter.com/basabasa8770',
        },
      }
    },
    headerBackground: {
      useGeo: true
    },
    footer: {
      poweredBy: false,
      poweredByTheme: false,
      custom: 'Copyright 2021-present | Tsubasa',
    },
    lastUpdated: false,
    nav: [
      { text: 'Home', link: '/', exact: true },
      { text: 'Posts', link: '/posts/', exact: false  },
      { text: 'About', link: '/about/', exact: false  }, 
    ],
  },
  markdown: {
    toc: {
      includeLevel: [2, 3, 4]
    }
  }
}