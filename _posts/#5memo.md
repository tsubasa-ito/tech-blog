---
title: ＃5 駆け出しエンジニアのメモ
layout: post
tags:
  - laravel
  - Vue.js
  - JavaScript
  - HTML
  - Firebase
date: 2021-06-09
meta:
  - name: 駆け出しエンジニア ブログ 更新
    content: 駆け出しエンジニアのリアルなメモブログです。
---

## Laravel

- `Notification`…メール通知だけでなく、SNS（slack など）の媒体にも一斉送信できる。
  > [Laravel 公式ドキュメント](https://readouble.com/laravel/5.7/ja/notifications.html)
- `{$user}`→`{ $user }`…間は空白を入れろ（公式）
- `キュー`：非同期で動かす処理で、それを`handle()`で実行される（実行されるものをジョブ）

## Vue.js（nuxt）

- `SPA`（Vue.js）はファーストビューのローディング時間が長いという欠点がある。また、SEO 的にも問題があると言われている。
- `SSR`（Nuxt）はクライアント側でレンダリングする箇所を、サーバー側でレンダリングしてクライアントに返す仕組み。
  > [Nuxt.js と Firebase で SPA×SSR×PWA× サーバーレスを実現する](https://inside.dmm.com/entry/2018/04/10/nuxt-firebase)

### Vuex についてのまとめ

- `state`: data 保管庫（.vue から値を取り出す場合は getters を使用）
- `mutations`: state の上書き(代入)
- `actions`: methods 的な。store の上書き以外の処理や非同期通信。別 actions の呼び出しも可能
- `getters`: state の情報を取得。別 getters の呼び出しも可能。

```
【.vueファイルでの基本呼び出し方】
state: 直接呼び出すことはない
getters: (return) this.$store.getters[‘*******‘]
actions: this.$store.dispatch(‘*****‘)
mutations: this.$store.commit(‘*******’)
```

> [Vue.js についての基礎(Nuxt.js での Vuex)](https://qiita.com/watataku8911/items/8dba8082b35dbbde4533)

## JavaScript

- `trim()`…空白（スペースなど）を削除してくれるメソッド
- `sync`…同期
- `Promise`…非同期処理を行なうもの

## firebase

- `firebase init`で 401 エラーについて
  > [firebase init したら Error: HTTP Error: 401 が出た](https://haayaaa.hatenablog.com/entry/2019/05/04/180633)

## HTML

- `'tsubasa'\s'`で →tsubasa's を表す
  ```
  例
  var name = 'tsubasa's pen' // エラー！！（『'』が３つあるよ！）
  var name = 'tsubasa'\s pen'// tsubasa'sできた！
  ```

## その他

- `リグレッションテスト`・`デグレッションテスト`…`回帰テスト`と同じ意味
- `キャッシュ`・`クッキー`・`セッション`…【３つ共通部分】各々ユーザーに対してよりよいサポートをするために取得しているデータには変わりはありません。
- `キャッシュ`は表示速度を上げることでユーザーを助ける。
- `クッキー`（誰が）・`セッション`（何をしたか）はユーザーの情報・行動を覚えておくことで、機能のサポートをしてくれています
  例：クッキー → ログイン。セッション → ショッピングカート。
  > [クッキー（Cookie）とセッションとキャッシュの違いは何か？](https://ssaits.jp/promapedia/technology/cookie-session-cache.html)
- `ブラックリスト方式`…「ここに書かれている人は NG なデータ」の一覧のこと
- `ホワイトリスト方式`…「ここに書かれている人は OK なデータ」の一覧のこと
- `メタバース`…第二の世界・永続性・アイデンティティ（アバターなど）・いつでも誰でも（VR でもスマホでも）
- `UGC`…User Generated Content の略。一般ユーザーによって作れられたコンテンツのこと。GAFA も参入し始めている
- `CGM`…Consumer Generated Media の略。消費者コンテンツを活用したメディア。
- `シナジー`…相乗効果・win-win になること
- `アナジー`…マイナスのシナジーのこと。lose-lose になること。反対語
- `Terraform`…AWS や GCP などのボタンぽちぽちでサーバーを作ったりするものを、コードで管理するもの。共有力があるのが特徴
- `トランザクション`…複数の処理をまとめたもの。ただし、複数の処理分離させることはできない。成功か失敗のいずれか。『&&』のイメージ。
  > [「トランザクション」とは何か？を超わかりやすく語ってみた！](https://qiita.com/zd6ir7/items/6568b6c3efc5d6a13865)
- [個人的におすすめしたいプログラムの技術サイト](https://qiita.com/SARDONYX/items/16cd2ef2ea4b842915a9)
- [動く Web デザイン アイディア帳](https://coco-factory.jp/ugokuweb/move01-cat/newsticker/) わかりやすくて参考なる！
- 【メアド】『+』をつければ、同じメアドに届く

  例：『example@gmail.com』ではなく『example+blog@gmail.com』でも届く！

- [【全てわかる】ブラウザ版『コードネームオンライン』のルール・設定を徹底解説
  ](https://boku-boardgame.net/codenames-online)人気ボードゲーム『コードネーム』がオンライン版！（スマホ・PC 対応・日本語対応）
