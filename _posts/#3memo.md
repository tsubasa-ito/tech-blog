---
title: ＃3 駆け出しエンジニアのメモ
layout: post
tags:
  - laravel
  - Git
  - Web RTC
date: 2021-05-16
meta:
  - name: 駆け出しエンジニア ブログ 更新
    content: 駆け出しエンジニアのリアルなメモブログです。
---

## Laravel

`self::`…自身のクラスを指す。
自身のオブジェクトを指したい場合は`$this`

> [PHP の「self::」と「\$this」の違いを現役エンジニアが解説【初心者向け】](https://techacademy.jp/magazine/29453)

## Git

リモートリポジトリは複数持つことができる<br>
例：チーム開発とは別にプライベートでも持っておきたい場合など

- `git remote add リモート名 リモートURL`

例えば、 `git remote add tutorial https://github.com/user/repo.git`の場合、tutorial というショートカットで URL のリモートリポジトリを登録

### fetch VS pull

**fetch と merge のセット＝ pull**

変更を取り込みたいブランチがリモートブランチと対応するものであればいい。<br>
ただ、pull してしまうと、中身の挙動がわかりづらく、間違えやすいため、fetch 派がいる。
<br>
例：現在 hoge ブランチにいる。master のブランチを pull してきてしまうと、ずれてしまう。

#### fetch について

⓵fetch ではローカルリポジトリに持ってくる（自分のワークツリーには持ってこない）
`git fetch リモート名`

fetch で持ってきた変更はローカルリポジトリの中のブランチの中に入っている。

⓶ ローカルリポジトリに fetch してきた変更を見るには全てのブランチを見てみる
`git branch -a`

```
remotes/bak/master
remotes/origin/master
```

⓷ 上記のように出るので、該当するリモートリポジトリ名/master でワークツリーに反映
`git merge bak/master`

#### pull について

fetch & merge の流れ ⓵〜⓷ をまとめてやる方法<br>
`git pull リモート名 ブランチ名`<br>
例：`git pull origin master`

省略形<br>
`git pull`

#### pull の merge 型と rebase 型がある

merge 型：`git pull リモート名 ブランチ名`→merge コミットが残る<br>
rebase 型：`git pull --rebase リモート名 ブランチ名`→merge コミットが残らない

### remote について

リモートの情報を詳しく知りたい場合<br>
`git remote show リモート名`

```
* remote origin
  Fetch URL: git@github.com:tsubasa-ito/git_tutorial.git
  Push  URL: git@github.com:tsubasa-ito/git_tutorial.git
  HEAD branch: master
  Remote branch:
    master tracked
  Local ref configured for 'git push':
    master pushes to master (up to date)
```

上記の内容はこんな感じ。忘れた時や確認したい時に使う

- fetch と push の URL
- リモートブランチ
- git pull の挙動
- git push の挙動

リモートリポジトリ名の変更<br>
`git remote rename 旧リモート名 新リモート名`

リモートリポジトリの削除<br>
`git remote rm リモート名`

### merge について

master ブランチをリリース用のブランチに。
開発はトピックブランチにするのが、定番。

#### merge の３種類

マージには 3 種類

- Fast Foward（早送りマージ）
  - ブランチが枝分かれせず、ポインタが前に進むだけの場合
- Auto Merge（基本的なマージ）
  - 枝分かれしたブランチの変更を取り込むマージ
  - この場合、マージするというコミットが一つ作られる
  - 親が二つできる
- コンフリクト

#### コンフリクトを起こさないために

- 複数人で同じファイルを変更しない
- pull や merge をする前に変更中の状態を無くす（commit や stash しておく）
- pull するときは、pull するブランチに移動してきてから pull する

#### merge コマンド

他のブランチの内容を入れる<br>
`git merge ブランチ名`<br>
`git merge リモート名/ブランチ名`

ブランチの名前変更<br>
`git branch -m 新しいブランチ名`

ブランチの削除<br>
`git branch -d ブランチ名`

### merge VS rebase

変更を取り込むには 2 種類

- merge ← コミットが分岐する
- rebase ← コミットが一直線になる

**作業履歴を残したい場合 →merge<br>
履歴を綺麗に残したい場合 →rebase**

**オススメ方針：プッシュ前は rebase を使い、プッシュした後は merge を使う。そして、コンフリクトしそうなら、merge**

merge の特徴

- コンフリクトの解決が比較的簡単
- マージコミットがたくさんあると、履歴が複雑化

rebase の特徴

- 履歴を綺麗に保てる
- コンフリクトの解決が複雑化

### rebase

`git rebase ブランチ名`

#### これだけはしてはいけない

- GitHub にプッシュしたコミットを rebase することだけは NG。
- `git push -f`で無理矢理プッシュしようとするのはもっとダメ。

### 複数のコミットをやり直す(edit)

ちなみに、一個前のコミットをやり直す場合は`git commit --amend`だけで OK。

`git rebase -i コミットID`▶︎ 対話的リベースモードに入る
やり直したいコミットを pick から edit に書き換える

```
edit gh23g54 ヘッダー修正
pick eagat24 ファイルの追加
pick bk24ya9 READMEの修正
```

エディターが立ち上がり、直したら保存。
そして、ターミナルに戻って
`git commit --amend`

これでまたエディターが立ち上がり、コミットの修正をする

次のコミットへ進む or リベースを完了
`git rebase --continue`

### コミットを並び替える、削除する

`git rebase -i コミットID`▶︎ 対話的リベースモードに入る
削除したいコミットを行ごと削除する

```
pick gh23g54 ヘッダー修正
pick eagat24 ファイルの追加
pick bk24ya9 READMEの修正←消す
```

並び替えたい場合は順番を入れ替えるだけ

```
pick gh23g54 ヘッダー修正
pick bk24ya9 READMEの修正←下と入れ替え
pick eagat24 ファイルの追加←上と入れ替え
```

エディターが立ち上がり、直したら保存。

### コミットをまとめる（squash）

`git rebase -i コミットID`▶︎ 対話的リベースモードに入る

```
pick gh23g54 ヘッダー修正
squash eagat24 ファイルの追加
squash bk24ya9 READMEの修正
```

エディターが立ち上がり、直したら保存。
さらにもう一度エディターが立ち上がる。

コミットをまとめたコミットメッセージが表示。そのままでも保存して終了しても良い。

終わると`Successfully rebased and updated refs/heads/master.`のように書かれていたら OK

### コミットを分割する

```
git rebase -i コミットID

# 対話的リベースモードに入る

# 分割したいコミットをeditに変更

pick gh23g54 ヘッダー修正
pick eagat24 ファイルの追加
edit bk24ya9 READMEの修正とindexの修正
```

`git reset HEAD^`

それぞれ、ステージとコミットする

```
git add README
git commit -m 'READMEの修正'

git add index.html
git commit -m 'indexの修正'

# 完了したら
git rebase --continue
```

### tag について

タグはリリースしたタイミングでつける

タグには『注釈版（annotated）』『軽量版(lightweight)』がある

タグ一覧を出す<br>
`git tag`<br>
`git tag -l "検索ワード"`

【注釈版（annotated）】タグを作成する（タグ名・メッセージ・署名が可能）<br>
`git tag -a タグ名 -m "メッセージ"`

後からタグ付けしたい場合<br>
`git tag タグ名 コミット名 -m "メッセージ"`

【軽量版(lightweight)】タグを作成する（タグ名のみ）<br>
`git tag タグ名`

後からタグ付けしたい場合<br>
`git tag タグ名 コミット名`

タグの詳細を見る<br>
`git show タグ名`

タグをリモートリポジトリに送信する<br>
`git push リモート名 タグ名`

### その他

指定のブランチの一つ上のコミットに HEAD を動かす<br>
`git checkout ブランチ名^`

指定のブランチの HEAD 位置を三つ前に戻す（相対リファレンス）<br>
`git branch -f ブランチ名 HEAD~3`

履歴を前に戻す（ワークツリーは変わらない）<br>
`git reset HEAD~1`

▼ これはワークツリーも変わる<br>
`git reset --hard master`<br>
ブランチが master ブランチと同じコミットに紐づけられる動作。<br>
`--hard`オプションにより、ワーキングツリーにも反映されます。

既存のコミットを取り消すためのコマンド<br>
`git revert <commit>`

> 参考 [git reset 解説](https://qiita.com/forest1/items/f7c821565a7a7d64d60f)

---

## WebRTC

`P2P（peer to peer）`で行うため、サーバーの負荷はない。相手の IP アドレスを元に通信している。

`STUNサーバー`…自分の IP アドレスとを相手に送ることで実行
STUN サーバーで IP アドレスを送る形式を`SDP`という。ID やメディアの種類などを明示して送るため、招待された相手はそれに従うだけで良い。デバイスの違いを SDP で整えて指定のデータで補う。

`シグナリング`…SDP をお互いにやり取りすること。ID とパスワードみたいなもの。
何かしらの信号を渡す必要がある。結局`WebSocket`や`Firebase`などのサーバが必要になることが多い。

> [WebRTC 徹底解説](https://zenn.dev/yuki_uchida/books/c0946d19352af5/viewer/0e7daa)

## その他

- `WebGL`(ウェブ・ジーエル)…ブラウザで 3D 表示するための標準仕様。（Three.js が定番らしい）
- `Learn Git Branching`…日本語対応・レベル感ちょうどいい・ゲーム性ありの Git 勉強ゲームサイト。Git の教材やったら、次はこれかな。

> [Learn Git Branching](https://learngitbranching.js.org/?locale=ja)

- `WebRTC`…Web RealTime Communication の略。音声や映像・データをリアルタイムに送受信することが可能。
- `正常`…想定範囲内で尚且つ歓迎する状況。
- `準正常`…想定の範囲内だけど歓迎していない状況。
- `異常`…想定外の状況のこと。に分ける
- `Agora`…音声や動画などのリアルタイム通信の SaaS。どうやら「Clubhouse」が使っていると噂。

