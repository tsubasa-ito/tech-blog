---
title: ＃2 駆け出しエンジニアのメモ
layout: post
tags:
  - laravel
  - Git
  - CSS
date: 2021-05-07
meta:
  - name: 駆け出しエンジニア ブログ 更新
    content: 駆け出しエンジニアのリアルなメモブログです。
---

## laravel

### テスト

`RefreshDatabase`…テストが終わったら、マイグレーションを再度実行する → マイグレーションを使わない場合、（既存の DB を使用する場合）は必要ない。
そのため、`DatabaseTransactions`に変更。
`DatabaseTransactions`はテストを実行している間だけ有効なトランザクションを作ってくれる。

> 参考：[Laravel で RefreshDatabase を使えない場合はどうするべきか - Qiita](https://qiita.com/aminevsky/items/71e42ffee39c3b77a952)

## Git

git は『スナップショット』保存している

### add

`git clone`はローカルリポジトリとワークツリー（ファイル）がコピーされている

- `git add ファイル名`
- `git add ディレクトリ名`
- `git add .`(← 全てのこと)

### commit

一つのプルリクに複数のコミットがいい。（コミットの粒度は小さく）

コミットメッセージはなぜかを書くと良い

- `git commit` (▶︎ エディターが立ち上がり、メッセージを入力する。保存して、ウィンドウを閉じるとコミットされる)
- `git commit -m 'message'`
- `git commit -v`

### status,diff,log

- `git status`
  ワークリーとステージの比較。または、ステージとローカルリポジトリの比較。をするコマンドである。

<br>

- `git diff`
- `git diff ファイル名`

<br>

git add した後の変更分を見たい時

- `git diff --staged`

<br>

ファイルの変更差分表示

- `git log`
- `git log -p index.html`
- `git log -n コミット数`

表示するコミット数を制限する（最近のコミットのログを見たい時に使用）

### remove

ファイルごと削除（ワークツリー・ローカルリポジトリどちらも削除される）

- `git rm ファイル名`
- `git rm ディレクトリ名`

ワークツリーのファイルは残したいが、ローカルリポジトリ上では消したい時（例：パスワードのファイルもコミットしてしまった場合など）

- `git rm --cached ファイル名`

<br>

git の`origin`はリモートリポジトリのニックネームみたいなもの

git push -u origin master
の`-u`で次回からは`git push`のみで通るようになるオプション

ブランチ切っているときに`push`したい場合（頻出）

- `git push origin HEAD`

> [git push origin HEAD を知らない人は時間を無駄にしています！
> ](https://qiita.com/Takao_/items/44d2aa23d6b1ab22a53a?utm_content=bufferf2f0f&utm_medium=social&utm_source=twitter.com&utm_campaign=buffer)

<br>

ファイルの変更を元に戻す

- `git checkout -- ファイル名`
- `git checkout -- ディレクトリ名`

全変更を取り消す

- `git checkout -- .`

<br>

ステージした変更を取り消す（ワークツリーは取り消されない）

- `git reset HEAD ファイル名`
- `git reset HEAD ディレクトリ名`

全変更を取り消す

- `git reset HEAD .`

`HEAD`…今いるブランチ&最新のコミットのこと

### commit 取り消し

直前のコミットをやり直す

- `git commit --amend`

※ただし、リモートリポジトリに push したコミットはやり直してはいけない。
push したが、やり直したい場合はもう一度 commit し直すこと。

### remote 確認

今の自分のリモートリポジトリを示す

- `git remote`

fetch と push 先を見ることができる

- `git remote -v`

### stash

一旦、コミットしたくないコードを退避させる方法

- `git stash`

stash したコミットなどを見たい場合

- `git stash list`

退避させたものを元に戻す（N 番目）

- `git stash apply stash@{N}`

stash したものを削除したい時（N 番目）

- `git stash drop stash@{N}`

> 参考[【git stash】コミットはせずに変更を退避したいとき](https://qiita.com/chihiro/items/f373873d5c2dfbd03250)

---

## CSS

### 右揃えや中央揃えなどをしたい時にセットで使う CSS

```
display: flex;
align-items: center;
justify-content:end;
```

`justify-content`を end にしたり、right にしたりして、右寄せなのか左寄せなのかなどを調整。

---

### その他

- 【VScode】`markdownlint`のプラグインを入れていれば、`Command + shift + P`でコマンドパレットが出てくる。そこで`markdown all`と入れれば、『目次作成』ができる。
- 【VScode】`Command + shift + P`で開いたコマンドパレットに`Format Document`と入れると`Prettier`が動いて JS を整形してくれる
- 【YouTube サイト】`shift + >` で倍速が早くなる。`shift + <`で倍速が遅くなる。
- `Image Magick`…画像のリサイズや名前の変更をコマンドラインで一発でできるもの（アルバムで使用）ブログでも使えるなー
- `OSS`…オープンソースソフトウェアのこと。正式に配布されているものってこと
- `mv 移動したいファイル名 移動後のディレクトリ名`ファイルの移動
- UX の沼…なんでも UX の改善にしてしまうと沼にハマり目的がわからなくなる
- `ls -a`で隠しファイルも全て見える
- 【Github】他人のレビューをする際はレビュー対象のブランチに切り替えて動作を確認する
- `FFmpeg（エフエフエムペグ）`動画や画像に編集をターミナル上でできるツール。サービスに使えそう。
- `nits`…プルリクにつけられる言葉。ニッチだけど。細かいけど…の意味。
- `ペンディング`…事柄が未決定のままであること。保留。
- `バイナリコード`…実行できるプログラムのこと。コンパイルされたコード。
- エンゲル係数…家計のうち、食費に何%使っているかの指標（食費 ÷ 消費支出 × 100）
