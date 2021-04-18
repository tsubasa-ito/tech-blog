---
title: VuePressで初めての投稿
layout: post
date: 2021-04-18
meta:
  - name: vuepress 更新
    content: vuepress 更新したらすること
---


# 更新したら…
今のところ更新したら、これしなきゃダメだよね。

```
yarn build
yarn dev

git add ステージするやつ
git commit -m 'commit message'
git push
```

▼js{5}と書けば、Jsとして判定しカラー付け。さらに行目を書けば、その部分をさらにハイライト。

```js{5}
export default {
  name: 'MyComponent',
  data() {
    return {
      message: 'ハイライトされてる！'
    }
  }
}
```

::: tip
すごい
:::

::: warning
あぶない
:::

::: danger
やばい
:::


## 絵文字変換
- :smile:
- :zipper_mouth_face:
- :thinking:
- :mask: