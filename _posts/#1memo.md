---
title: ＃1 駆け出しエンジニアのメモ
layout: post
tags: 
  - laravel
  - Vue
  - Git
date: 2021-04-23
meta:
  - name: 駆け出しエンジニア ブログ 更新
    content: 駆け出しエンジニアのリアルなメモブログです。
---


ざっくばらんメモです。週一程度更新の予定です。

駆け出しエンジニアのメモなので、間違っている点も結構あると思います。

その際は教えていただきたいです。むちゃくちゃ嬉しいです。チョコあげます。🍫

- [laravel について](#laravel-について)
  - [groupBy](#groupby)
  - [pluck](#pluck)
  - [whereIn()](#wherein)
  - [map](#map)
  - [distinct](#distinct)
  - [implode](#implode)
- [やりたいこと](#やりたいこと)
  - [結論](#結論)
  - [現状](#現状)
  - [解決策](#解決策)
  - [参考](#参考)
- [Aliasについて](#aliasについて)
- [その他](#その他)
  - [Atomic Design について…](#atomic-design-について)


## laravel について

### groupBy

```
$users = DB::table('users')
                ->groupBy('account_id')->get();
```

groupBy()は特定のカラムをまとめる。それを GET する。

`groupBy('account_id', 'state')`で複数カラム指定も可能。

### pluck

```
$collection = collect([
    ['product_id' => 'prod-100', 'name' => 'Desk'],
    ['product_id' => 'prod-200', 'name' => 'Chair'],
]);

$plucked = $collection->pluck('name');

$plucked->all();

// ['Desk', 'Chair']
```

コレクション上で指定のコレクションのみを取ってこれる。

### whereIn()

```
$collection = collect([
    ['product' => 'Desk', 'price' => 200],
    ['product' => 'Chair', 'price' => 100],
]);

$filtered = $collection->whereIn('price', 200);

$filtered->all();

/*
    [
        ['product' => 'Desk', 'price' => 200],
    ]
*/
```

指定のコレクションの比べて、同じものを取る。（where のコレクションバージョン）

### map

```
$collection = collect([1, 2, 3, 4, 5]);

$multiplied = $collection->map(function ($item, $key) {
    return $item * 2;
});

$multiplied->all();

// [2, 4, 6, 8, 10]
```

for 文のコレクションバージョンと理解していいんじゃないか？
必ず`(function ($item, $key) …`を書いてリターンさせろ。

### distinct

```
Album::where('name', $albumImage->name)->distinct('name')->pluck('name');
```

こんな感じで重複を排除して、持ってきてくれる。（distinct と pluck のコンボ決まったーー！！😲）

[【Laravel】Laravel で DISTINCT を使用する、かつ実行されている SQL を確認してみる](https://qiita.com/sola-msr/items/ff857e51680404c4a439)

### implode

```
// 連結したい文字列
$pieces = ["2018", "01", "01"];

// 連結文字を指定して連結してみます
echo implode("-", $pieces) . 'が日付';

// 2018-01-01が日付
```

配列一つ一つを第二引数を第一引数で区切っていく。（特にフロントに送りたい文字と結合させたい時に使う）

---

## やりたいこと

GitHub にプッシュしたい

### 結論

GitHub を二段回認証にした後は、https 通信でプッシュはできない。ssh 経由でプッシュしなければならない（https 通信でやってしまった場合の対処）

### 現状

https でプッシュした場合、ユーザー名とパスワードを聞かれ、正しくてもエラーになる。

```
Username for 'https://github.com': hoge-user
Password for 'https://hoge-user@github.com':
remote: Invalid username or password.
fatal: Authentication failed for 'https://github.com/hoge-user/repository-name.git/'
```

### 解決策

該当のディレクトリで`vi .git/config`で開く

```
[core]
    repositoryformatversion = 0
    filemode = true
    bare = false
    logallrefupdates = true
    ignorecase = true
    precomposeunicode = true
[remote "origin"]
    url = https://github.com/hoge/repository.git　⏪ここを
    fetch = +refs/heads/*:refs/remotes/origin/*
[branch "master"]
    remote = origin
    merge = refs/heads/master
```

`url = https://github.com/hoge/repository.git`
の部分を
`url = git@github.com:hoge/repository.git`

にすると普通にプッシュできるようになる。

ちなみに

vi を書きたい時、`i`

vi を保存したい時、エスケープボタン

vi を終了したい時、`:wp`

### 参考

[github を二段階認証に変更後に起こるエラーの対処方法](https://qiita.com/sayama0402/items/670b6b650ebdd8680a0b)

これの丸パクリです。ありがとうございます。

## Aliasについて

**頻繁に使うコマンドを自分の好きなコマンドで設定できる機能。**

例えば、`npm run dev`とかってよく使いますよね。
でも、毎度毎度打ったり、遡ったりするのは面倒…。
そういう際にAlias設定をしておくと便利。


.bash_profileにあるか確認

`cat ~/.bash_profile;`

中身がなければvimで書いていく。

`vi ~/.bash_profile;`

書き方は色々あるようだけど、僕のはこんな感じ↓。

```
alias unittest="docker-compose exec php  vendor/phpunit/phpunit/phpunit"
```
`docker-compose exec php  vendor/phpunit/phpunit/phpunit"`

のコマンドを`unittest`とだけ打てば実行される。⇦便利すぎ。

`source ~/.bash_profile`

ルートディレクトリで一回実行。そして、エイリアスを実行したいディレクトリで↑上のコマンドで「エイリアス使わせてねー」と申請しておけばOK。

これでそのディレクトリで`unittest`を使えるようになった。

全てクレイグさんに教えてもらいました！すごい便利！ありがとうございました☺️

---

## その他


- `VuePress`…Vue の静的サイトジェネレータで Nuxt よりも手軽に作れて、ブログに特化させている（React でいうところの GATSBY 的なもの）← このメモをこれで開発しようと勉強中
- `npm uninstall パッケージ名`でインストールして、やっぱり不必要だったなーと思うパッケージをアンインストールできる
- ターミナルで`Command + T`でもう一つ別タブターミナルが開く
- 'lodash.js'…Vue にさらに便利機能のパッケージ（特にディープクローンなるものをアルバムでは使っているらしい）
- Lambda…実行したい処理”だけを開発すればいい！サーバレス。すごい！毎月 100 万リクエストまで無料なのもすごい。
- サーバレス…サーバー上で処理を実行する。つまり、サーバーへの負荷を減らす
- モブプログラミング…チーム全体で 1 つの仕事のみを一緒行い、キーボードも 1 つで、画面やコンピューターも共有してチーム全体で 1 つの作業すること → 稲葉さんたちと綾瀬会でやるらしい！
- IMO…In my opinion（「私が思うに」「わたし的には」「私はこう考えるけど」の意味）クレイグさんが使っていた
- Atomic Design…5 段階の階層に分けて、逆流を避ける設計のこと。
- チケット…一つのタスクのこと（〇〇でチケット一個切っときますねーとか言ってた）
- プルリクの再レビューは右側のレビュー対象者のクルクル 🔄 を押す
- 【CSS】float: right; のように float を使う場合は『Width: 10px;』みたいに width をつける
- 【Vuex】必ずしも Mutations→Actions を呼ばずに、コンポーネントから呼ぶこともできる（よくはないらしいが…。）
- `git diff リモート名/ブランチ名`でコミットした差分を見ることができる。（GitHub で見ればいいけどね。）
- `concat`…文字列の連結に使うもの。

例えば…Laravelの場合

`{$name} is god`

`$name . 'is god'`

どちらでもOK

- PR TIMES には 30,000 円でプレスリリースできる
- ユニコーン企業 🦄…『創業 10 年以内・評価額 10 億ドル以上・未上場』のエゲツないベンチャー企業のことを指す。
- ふるさと納税は住民税によって変わる
  - 住民税は住んでいる地域と所得によって変わる（二年目なら10,000円いかないくらいじゃないかな？）
  - 新卒1年目は住民税がかからない
  - 他県から東京に引っ越すと住民税が一時的に高いらしい（これ僕です。）
- いいウイスキーは度数が高い

### Atomic Design について…

なんとなくの知識ですが、エンジニア目線だとわかりやすいだろうなーと思います。
ただし、ページ単位でデザインしてもらっていた、デザイナーさんとの兼ね合いが難しいようです。

今回は以上でーす。

おつかれさまでした！
