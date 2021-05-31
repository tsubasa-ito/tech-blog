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
- `whereNull()`…指定したカラムがnullのものを取り出す。
```
$users = DB::table('users')
        ->whereNull('updated_at')
        ->get();
```
> [その他のWHERE句｜laravel 8.x](https://readouble.com/laravel/8.x/ja/queries.html?header=%25E3%2581%259D%25E3%2581%25AE%25E4%25BB%2596%25E3%2581%25AEWHERE%25E5%258F%25A5)

- `refreshdatabase`から`databasetransactions`に変更しようとすると依存関係にあるテスト項目（リレーション）については失敗する可能性がある。


### with()とload()の違い
共通：リレーションを解決したい時に使用する。取得できる結果は両者同じ。

`with()`…get()とかall()とかの**終端操作の前に**使用する。
```
$books = App\Book::with('author')->get();
```
`load()`…**終端操作の後に**使用する。例ではall()の後でload()を行っている。
```
$books = App\Book::all();

if ($someCondition) {
    $books->load('author', 'publisher');
}
```

どっちでもいいが、少なく書きたい場合は`with()`。その後も変数を使うため、定義した文章と分けたい場合は`load()`を使うといいのかも。

> [Laravelのwith()とload()](https://qiita.com/mk-tool/items/7dfd3c61b3af7f1b9105)


### save()とupdate()の違い
`save()`…同じデータだとしてもupdated_atのカラムが更新されない。更新データとの差分を見て更新するか決めてる

`update()`…同じデータだとしてもupdated_atのカラムが更新される。更新データとの差分を見てないで更新する

> [Eloquentのメソッド saveとupdateは処理が異なる](https://qiita.com/gomaaa/items/91e5cbd319279a2db6ec)

### redirect

HTTPステータスコードでリダイレクトは`302`

▼の記事はたぶん、全てのリダイレクトの方法が書いてあるので、リダイレクトの方法はこれ見ればOK。

> [【Laravel】リダイレクトの書き方メモ](https://qiita.com/manbolila/items/767e1dae399de16813fb)

### private

そのクラス内で使うものだけの場合は、`private`を使う。

- `public`…どこからでもアクセス可能。アクセス修飾子がない場合は、publicを指定したものと同じになる。
- `protected`…そのクラス（ファイル）自身と継承クラスからアクセス可能。つまり非公開ですが、継承は可能。
- `private`…同じクラス（ファイル）の中でのみアクセス可能。非公開で継承クラスからもアクセス不可能となります。

まずは、他からの干渉を防ぐために、`private`を使えないかを検討し、できなければ`protected`>`public`へと広げて行くと良い。

`private function getValue(){}`などと使える。

### laravel/uiを入れようとしたらエラー
`composer require laravel/ui`しようとしたら、エラーが出た

原因：インストールするためのメモリがないから。

解決策：メモリの量を増やすと明示する

> [【PHP】composer require時にPHP Fatal error: Allowed memory size of XXX bytes exhaustedが表示されたら
](https://qiita.com/_hiro_dev/items/bc5a3db604b08e6fc5b0)

`trashed`…指定されたモデルインスタンスがソフトデリートされているかを確認することができる。
```
if ($user->trashed()) {
    //
}
```

## MySQL
`Sequel Ace`…`Sequel Pro`の後継MySQLのGUIアプリ。ほぼ同じように作業できる
- MySQLのバージョン8からは`Sequel Pro`が対応していないため
- `Sequel Pro`の開発が止まっているため

`mysql -uroot -p`でログイン

## Git

### git commitができない
プロジェクトの初めに`git commit`ができない。
```
command not found error
```
のように出る。

▼の参考文献通りにVScodeを設定すればOK。
> [初git commit時にエディタが開かない（Pathエラー）解決方法。【VSCodeとGitHubの設定】](https://qiita.com/grca3/items/0771099a6750840721b1)

### git cherry-pick
`git cherry-pick コミットID`…好きなコミットのみを取り出す。
コミットやマージだらけになり、汚くなったブランチを綺麗に作り直す時に、必要なコミットのみ取り出す。時に使える

### rivert
`rivert`…既存のコミットを取り消すコマンド

詳しくはまた実務で使うようになったら、理解する方がいい。
> [【gitコマンド】いまさらのrevert](https://qiita.com/chihiro/items/2fa827d0eac98109e7ee)

### VScode×Git×Github

gitの勉強をしても実際はVScodeを使って開発している場合もあると思うので、これがわかりやすかった。

後半のGithub Actionsはできなくても良いが、どの会社も自動デプロイや自動テストで使っている場合が多いので、この動画で仕組みくらいは知っておくと良い。

[【初心者向け】Visual Studio Codeを使ったGit Github入門 Github Actionsを使った自動デプロイも紹介](https://www.youtube.com/watch?v=hdpMw3hyQq4)

## フロント

### PrettierとESLintの違い
`Prettier`…空白など『読みやすさ』をチェックする
`ESLint`…引数が足りないよ。など『構文』をチェックする

**結論：PrettierとESLintどちらも併用すべし**

## JavaScript

- `clientX（clientY）`…イベントがの起きた点からX座標（Y座標）を参照するメソッド
> [マウスイベントで取得されるカーソル座標パラメータの整理(offset, page, screen, client)](https://qiita.com/yukiB/items/31a9e9e600dfb1f34f76)

## Vue.js
`dispatch('move', { id, dx: 0, dy: 0 });`のように、第一引数に関数名。第二引数にオブジェクトで引数を書く。
`dispatch`は`actions.js`の中で呼ばれて、acitonsの他のメソッドを使うときに使うメソッド
同じ名前の引数を定義している場合は、一つでいい。
例：`id: id` ではなく `id` のみでOK

`map()`メソッドは、与えられた関数を配列のすべての要素に対して呼び出し、その結果からなる新しい配列を生成します。

## その他
- `Storybook`…自作のアプリのコンポーネントスタイルガイド的なもの。UIテストもできる。
> [Storybook for Vue 入門](https://qiita.com/sotszk/items/b20167ee811aa3bd29df)
- `IdP`…Identify Provideの略。クラウドサービスやアプリへのアクセスを試みるユーザーのIDやパスワードなどの認証情報を提供する役割を果たすこと。例：Auth0など
- `エンコード`＝あ→%E3%81%82
- `デコード`＝%E3%81%82→あ
- `KPI（Key Performance Indicator）`…目的設定のこと
- `CPA（Cost per Acquisition）`…顧客獲得単価を意味する略語。新規顧客を獲得するのに、1人あたりいくらかかったかを示すもの。
- `マイルストーン`…プロジェクトを完遂するために重要な中間目標地点のことを指す。マイルごとに石をおく。セーブのこと
- `バッチ処理`…一定量の(あるいは一定期間の)データを集め、一括処理するための処理方法。英語の「Batch」が語源であり、日本語では「一束、一群、一団」といった意味がある。
- `バッチサーバ `…一塊の処理を担当をするサーバーのこと。割と負荷の問題が山積みでサーバーが落ちたりもするようなので、極力避けた方がいい
- [Voyage](https://voyage-go.club/)…コミニティSNSサービス。Facebookのグループとの差別化が怪しい？CAMPFIREとの連携がしやすいだけだと思う。ただ、コミニティサービスはこれからも増えそう。面白い試みだと思う。
- 【VScode】`Import Cost`拡張機能で、JavaScriptもしくはTypeScriptでimportしたファイルの容量を表示してくれる拡張機能。容量の大きいファイルは赤文字で表示される。
- [SendGrid](https://sendgrid.kke.co.jp/about/)…メール配信サービス（API/フリープランあり）


## 参考になった記事
> [ざっくり、フロントエンド開発のためのバックエンドサービスを整理する](https://qiita.com/y_catch/items/d539fa79df54e098b5d2?utm_campaign=popular_items&utm_medium=feed&utm_source=popular_items)

僕の考え方に近い記事だった。僕の手札はLaravelとVueですが、VueだけでFirebaseなどを使う手法もあるよね。って。
その時の利点と難点をまとめてくれている良質な記事だった。

> [Atomic Designを分かったつもりになる](https://design.dena.com/design/atomic-design-%E3%82%92%E5%88%86%E3%81%8B%E3%81%A3%E3%81%9F%E3%81%A4%E3%82%82%E3%82%8A%E3%81%AB%E3%81%AA%E3%82%8B)

まだまだアトミックデザインなるものは、理解できないだろうなー。と思っていたら、とてもわかりやすい記事を紹介してもらえた。
これだけで十分理解可能。だが、現実問題としては個人開発のレベルで使っていこうというのはレベルが高すぎるかな。という印象。

Webアプリを作る場合は、Chromeの拡張機能をプラス機能として入れておくといいかも。そもそもパソコン版で戦う場合はパソコン特化型で勝負すべし。
> [Chromeブラウザの拡張機能を作ってみたい初心者向けに開発方法を紹介！【サンプルあり】](https://qiita.com/guru_taka/items/37a90766f4f845e963e5?utm_content=bufferccbec&utm_medium=social&utm_source=twitter.com&utm_campaign=buffer)


## Webアプリの需要を考える

### Webアプリは時代遅れ感
多くの個人開発者は『モバイルアプリ』か『Webアプリ』かはたまたゲーム系なのかという選択になりがちですよねー。

ただ、僕みたいなWebエンジニアをやっている人間にとっては、とりあえず『Webアプリ』を作るしかない…。

これはいくらモバイルアプリの方が需要があるからといって、駆け出しの頃からとっ散らかると器用貧乏のリスクが高まるから。

とはいっても、今時Webアプリ単体ではたくさんの人間に使ってもらえるWebサービスを作ることは難しい。

それは、多くの人間は「指定のWebページに移動するのが面倒」「片手だけで終わらせたい」「スマホだけ」を理想として持っているからだと思います。

**ただ、今でもWebアプリの需要が高いターゲットは『デジタルクリエイター』だと考えている。**

### ターゲットはデジタルクリエイター

この記事のようの膨大な量の『文章を書く場合（ブロガーやライターなど）』だったり、YouTuberのような『動画編集』であったり、もちろんエンジニアのような『プログラミング』もPCでないとできない。もしくは、PCの方がやりやすい分野は存在する。

つまり、『本格的』なデジタルクリエイターはPCを使う可能性が高い。

そんなこだわりの塊をターゲットにするサービスはまだまだWebアプリやデスクトップアプリの可能性を感じる。

**話は飛ぶが、PCユーザーを囲い込む方法の打ち手として有効なのが『Chrome拡張機能』だと思う。**

PCユーザーでなければ、拡張機能の存在すら知らないかもしれないが、好みにカスタマイズできるという点はクリエイターがそそる部分でもある。

何より、囲い込みができる。常にChromeのバーに存在感があるし、すぐに同期できたりすればお手軽だ。

### Chrome拡張機能で囲う

まとめるとこんな感じ。
- Webアプリを作る時は、ターゲットをクリエイターにした方がいいよね
- Webアプリ単体ではやっていけない
- 『Webアプリ＋モバイルアプリ＝一般ユーザー向け』or『Webアプリ＋Chrome拡張機能＝クリエイター向け』の2択
- Webアプリとの"同期"を常に意識した方がいいよね。

補足すると、これはあくまで延命処置で、そもそも、時代はどんどん変わり、Webアプリだけで食って行くのは難しいことは明確なので、スマホアプリの技術も早く習得した方がいいですね。

今回は以上です。

また次回！！