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
          avatar: '/assets/img/user_image.jpg',
          sns: {
            github: {
              account: 'Tsubasa',
              link: 'https://github.com/tsubasa-ito'
            }
          }
        },
    }
}