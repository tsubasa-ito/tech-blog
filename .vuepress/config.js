module.exports = {
  title: 'Tsubasa Web Memo',
  description: '気になったことの備忘録的なメモ（プログラミング・マーケティング）',
  theme: '@vuepress/theme-default',
  plugins: [
    "@vuepress/theme-default"
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
        }
      }
    },
    headerBackground: {
      useGeo: true
    },
    lastUpdated: false,
    nav: [
      { text: 'Home', link: '/', exact: true },
      { text: 'Posts', link: '/posts/sample/sample', exact: false  },
      { text: 'About', link: '/about/', exact: false  }, 
    ],
  },
  markdown: {
    toc: {
      includeLevel: [2, 3, 4]
    }
  }
}