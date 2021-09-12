---
title: ＃4 駆け出しエンジニアのメモ
layout: post
tags:
  - laravel
  - MySQL
  - Git
  - Vue.js
  - Prettier
  - ESLint
  - VScode
date: 2021-05-31
meta:
  - name: 駆け出しエンジニア ブログ 更新
    content: 駆け出しエンジニアのリアルなメモブログです。
---

## laravel

- `whereNull()`…指定したカラムが null のものを取り出す。

```
$users = DB::table('users')
        ->whereNull('updated_at')
        ->get();
```

> [その他の WHERE 句｜ laravel 8.x](https://readouble.com/laravel/8.x/ja/queries.html?header=%25E3%2581%259D%25E3%2581%25AE%25E4%25BB%2596%25E3%2581%25AEWHERE%25E5%258F%25A5)

- `refreshdatabase`から`databasetransactions`に変更しようとすると依存関係にあるテスト項目（リレーション）については失敗する可能性がある。

### with()と load()の違い

共通：リレーションを解決したい時に使用する。取得できる結果は両者同じ。

`with()`…get()とか all()とかの**終端操作の前に**使用する。

```
$books = App\Book::with('author')->get();
```

`load()`…**終端操作の後に**使用する。例では all()の後で load()を行っている。

```
$books = App\Book::all();

if ($someCondition) {
    $books->load('author', 'publisher');
}
```

どっちでもいいが、少なく書きたい場合は`with()`。その後も変数を使うため、定義した文章と分けたい場合は`load()`を使うといいのかも。

> [Laravel の with()と load()](https://qiita.com/mk-tool/items/7dfd3c61b3af7f1b9105)

### save()と update()の違い

`save()`…同じデータだとしても updated_at のカラムが更新されない。更新データとの差分を見て更新するか決めてる

`update()`…同じデータだとしても updated_at のカラムが更新される。更新データとの差分を見てないで更新する

> [Eloquent のメソッド save と update は処理が異なる](https://qiita.com/gomaaa/items/91e5cbd319279a2db6ec)

### redirect

HTTP ステータスコードでリダイレクトは`302`

▼ の記事はたぶん、全てのリダイレクトの方法が書いてあるので、リダイレクトの方法はこれ見れば OK。

> [【Laravel】リダイレクトの書き方メモ](https://qiita.com/manbolila/items/767e1dae399de16813fb)

### private

そのクラス内で使うものだけの場合は、`private`を使う。

- `public`…どこからでもアクセス可能。アクセス修飾子がない場合は、public を指定したものと同じになる。
- `protected`…そのクラス（ファイル）自身と継承クラスからアクセス可能。つまり非公開ですが、継承は可能。
- `private`…同じクラス（ファイル）の中でのみアクセス可能。非公開で継承クラスからもアクセス不可能となります。

まずは、他からの干渉を防ぐために、`private`を使えないかを検討し、できなければ`protected`>`public`へと広げて行くと良い。

`private function getValue(){}`などと使える。

### laravel/ui を入れようとしたらエラー

`composer require laravel/ui`しようとしたら、エラーが出た

原因：インストールするためのメモリがないから。

解決策：メモリの量を増やすと明示する

> [【PHP】composer require 時に PHP Fatal error: Allowed memory size of XXX bytes exhausted が表示されたら
> ](https://qiita.com/_hiro_dev/items/bc5a3db604b08e6fc5b0)

`trashed`…指定されたモデルインスタンスがソフトデリートされているかを確認することができる。

```
if ($user->trashed()) {
    //
}
```

## MySQL

`Sequel Ace`…`Sequel Pro`の後継 MySQL の GUI アプリ。ほぼ同じように作業できる

- MySQL のバージョン 8 からは`Sequel Pro`が対応していないため
- `Sequel Pro`の開発が止まっているため

`mysql -uroot -p`でログイン

## Git

### git commit ができない

プロジェクトの初めに`git commit`ができない。

```
command not found error
```

のように出る。

▼ の参考文献通りに VScode を設定すれば OK。

> [初 git commit 時にエディタが開かない（Path エラー）解決方法。【VSCode と GitHub の設定】](https://qiita.com/grca3/items/0771099a6750840721b1)

### git cherry-pick

`git cherry-pick コミットID`…好きなコミットのみを取り出す。
コミットやマージだらけになり、汚くなったブランチを綺麗に作り直す時に、必要なコミットのみ取り出す。時に使える

### rivert

`rivert`…既存のコミットを取り消すコマンド

詳しくはまた実務で使うようになったら、理解する方がいい。

> [【git コマンド】いまさらの revert](https://qiita.com/chihiro/items/2fa827d0eac98109e7ee)

### VScode×Git×Github

git の勉強をしても実際は VScode を使って開発している場合もあると思うので、これがわかりやすかった。

後半の Github Actions はできなくても良いが、どの会社も自動デプロイや自動テストで使っている場合が多いので、この動画で仕組みくらいは知っておくと良い。

[【初心者向け】Visual Studio Code を使った Git Github 入門 Github Actions を使った自動デプロイも紹介](https://www.youtube.com/watch?v=hdpMw3hyQq4)

## フロント

### Prettier と ESLint の違い

`Prettier`…空白など『読みやすさ』をチェックする
`ESLint`…引数が足りないよ。など『構文』をチェックする

**結論：Prettier と ESLint どちらも併用すべし**

## JavaScript

- `clientX（clientY）`…イベントがの起きた点から X 座標（Y 座標）を参照するメソッド
  > [マウスイベントで取得されるカーソル座標パラメータの整理(offset, page, screen, client)](https://qiita.com/yukiB/items/31a9e9e600dfb1f34f76)

## Vue.js

`dispatch('move', { id, dx: 0, dy: 0 });`のように、第一引数に関数名。第二引数にオブジェクトで引数を書く。
`dispatch`は`actions.js`の中で呼ばれて、acitons の他のメソッドを使うときに使うメソッド
同じ名前の引数を定義している場合は、一つでいい。
例：`id: id` ではなく `id` のみで OK

`map()`メソッドは、与えられた関数を配列のすべての要素に対して呼び出し、その結果からなる新しい配列を生成します。

## その他

- `Storybook`…自作のアプリのコンポーネントスタイルガイド的なもの。UI テストもできる。
  > [Storybook for Vue 入門](https://qiita.com/sotszk/items/b20167ee811aa3bd29df)
- `IdP`…Identify Provide の略。クラウドサービスやアプリへのアクセスを試みるユーザーの ID やパスワードなどの認証情報を提供する役割を果たすこと。例：Auth0 など
- `エンコード`＝あ →%E3%81%82
- `デコード`＝%E3%81%82→ あ
- `KPI（Key Performance Indicator）`…目的設定のこと
- `CPA（Cost per Acquisition）`…顧客獲得単価を意味する略語。新規顧客を獲得するのに、1 人あたりいくらかかったかを示すもの。
- `マイルストーン`…プロジェクトを完遂するために重要な中間目標地点のことを指す。マイルごとに石をおく。セーブのこと
- `バッチ処理`…一定量の(あるいは一定期間の)データを集め、一括処理するための処理方法。英語の「Batch」が語源であり、日本語では「一束、一群、一団」といった意味がある。
- `バッチサーバ`…一塊の処理を担当をするサーバーのこと。割と負荷の問題が山積みでサーバーが落ちたりもするようなので、極力避けた方がいい
- [Voyage](https://voyage-go.club/)…コミニティ SNS サービス。Facebook のグループとの差別化が怪しい？CAMPFIRE との連携がしやすいだけだと思う。ただ、コミニティサービスはこれからも増えそう。面白い試みだと思う。
- 【VScode】`Import Cost`拡張機能で、JavaScript もしくは TypeScript で import したファイルの容量を表示してくれる拡張機能。容量の大きいファイルは赤文字で表示される。
- [SendGrid](https://sendgrid.kke.co.jp/about/)…メール配信サービス（API/フリープランあり）

## 参考になった記事

> [ざっくり、フロントエンド開発のためのバックエンドサービスを整理する](https://qiita.com/y_catch/items/d539fa79df54e098b5d2?utm_campaign=popular_items&utm_medium=feed&utm_source=popular_items)

僕の考え方に近い記事だった。僕の手札は Laravel と Vue ですが、Vue だけで Firebase などを使う手法もあるよね。って。
その時の利点と難点をまとめてくれている良質な記事だった。

> [Atomic Design を分かったつもりになる](https://design.dena.com/design/atomic-design-%E3%82%92%E5%88%86%E3%81%8B%E3%81%A3%E3%81%9F%E3%81%A4%E3%82%82%E3%82%8A%E3%81%AB%E3%81%AA%E3%82%8B)

まだまだアトミックデザインなるものは、理解できないだろうなー。と思っていたら、とてもわかりやすい記事を紹介してもらえた。
これだけで十分理解可能。だが、現実問題としては個人開発のレベルで使っていこうというのはレベルが高すぎるかな。という印象。

Web アプリを作る場合は、Chrome の拡張機能をプラス機能として入れておくといいかも。そもそもパソコン版で戦う場合はパソコン特化型で勝負すべし。

> [Chrome ブラウザの拡張機能を作ってみたい初心者向けに開発方法を紹介！【サンプルあり】](https://qiita.com/guru_taka/items/37a90766f4f845e963e5?utm_content=bufferccbec&utm_medium=social&utm_source=twitter.com&utm_campaign=buffer)

