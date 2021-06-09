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

> [PHPの「self::」と「$this」の違いを現役エンジニアが解説【初心者向け】](https://techacademy.jp/magazine/29453)

## Git

リモートリポジトリは複数持つことができる<br>
例：チーム開発とは別にプライベートでも持っておきたい場合など

- `git remote add リモート名 リモートURL`

例えば、 `git remote add tutorial https://github.com/user/repo.git`の場合、tutorialというショートカットでURLのリモートリポジトリを登録


### fetch VS pull

**fetchとmergeのセット＝pull**

変更を取り込みたいブランチがリモートブランチと対応するものであればいい。<br>
ただ、pullしてしまうと、中身の挙動がわかりづらく、間違えやすいため、fetch派がいる。
<br>
例：現在hogeブランチにいる。masterのブランチをpullしてきてしまうと、ずれてしまう。


#### fetchについて
⓵fetchではローカルリポジトリに持ってくる（自分のワークツリーには持ってこない）
`git fetch リモート名`

fetchで持ってきた変更はローカルリポジトリの中のブランチの中に入っている。

⓶ローカルリポジトリにfetchしてきた変更を見るには全てのブランチを見てみる
`git branch -a`

```
remotes/bak/master
remotes/origin/master
```

⓷上記のように出るので、該当するリモートリポジトリ名/masterでワークツリーに反映
`git merge bak/master`

#### pullについて
fetch & merge の流れ⓵〜⓷をまとめてやる方法<br>
`git pull リモート名 ブランチ名`<br>
例：`git pull origin master`

省略形<br>
`git pull`

#### pullのmerge型とrebase型がある
merge型：`git pull リモート名 ブランチ名`→mergeコミットが残る<br>
rebase型：`git pull --rebase リモート名 ブランチ名`→mergeコミットが残らない

### remoteについて

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
- fetchとpushのURL
- リモートブランチ
- git pullの挙動
- git pushの挙動


リモートリポジトリ名の変更<br>
`git remote rename 旧リモート名 新リモート名`

リモートリポジトリの削除<br>
`git remote rm リモート名`

### mergeについて

masterブランチをリリース用のブランチに。
開発はトピックブランチにするのが、定番。

#### mergeの３種類
マージには3種類
- Fast Foward（早送りマージ）
  - ブランチが枝分かれせず、ポインタが前に進むだけの場合
- Auto Merge（基本的なマージ）
  - 枝分かれしたブランチの変更を取り込むマージ
  - この場合、マージするというコミットが一つ作られる
  - 親が二つできる
- コンフリクト

#### コンフリクトを起こさないために
- 複数人で同じファイルを変更しない
- pullやmergeをする前に変更中の状態を無くす（commitやstashしておく）
- pullするときは、pullするブランチに移動してきてからpullする

#### merge コマンド

他のブランチの内容を入れる<br>
`git merge  ブランチ名`<br>
`git merge  リモート名/ブランチ名`

ブランチの名前変更<br>
`git branch -m 新しいブランチ名`

ブランチの削除<br>
`git branch -d ブランチ名`


### merge VS rebase

変更を取り込むには2種類
- merge ←コミットが分岐する
- rebase ←コミットが一直線になる

**作業履歴を残したい場合 →merge<br>
履歴を綺麗に残したい場合 →rebase**

**オススメ方針：プッシュ前はrebaseを使い、プッシュした後はmergeを使う。そして、コンフリクトしそうなら、merge**

mergeの特徴
- コンフリクトの解決が比較的簡単
- マージコミットがたくさんあると、履歴が複雑化

rebaseの特徴
- 履歴を綺麗に保てる
- コンフリクトの解決が複雑化

### rebase

`git rebase ブランチ名`

#### これだけはしてはいけない
- GitHubにプッシュしたコミットをrebaseすることだけはNG。
- `git push -f`で無理矢理プッシュしようとするのはもっとダメ。


### 複数のコミットをやり直す(edit)

ちなみに、一個前のコミットをやり直す場合は`git commit --amend`だけでOK。


`git rebase -i コミットID`▶︎対話的リベースモードに入る
やり直したいコミットをpickからeditに書き換える
```
edit gh23g54 ヘッダー修正
pick eagat24 ファイルの追加
pick bk24ya9 READMEの修正
```
エディターが立ち上がり、直したら保存。
そして、ターミナルに戻って
`git commit --amend`

これでまたエディターが立ち上がり、コミットの修正をする

次のコミットへ進むorリベースを完了
`git rebase --continue`

### コミットを並び替える、削除する

`git rebase -i コミットID`▶︎対話的リベースモードに入る
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
`git rebase -i コミットID`▶︎対話的リベースモードに入る
```
pick gh23g54 ヘッダー修正
squash eagat24 ファイルの追加
squash bk24ya9 READMEの修正
```
エディターが立ち上がり、直したら保存。
さらにもう一度エディターが立ち上がる。

コミットをまとめたコミットメッセージが表示。そのままでも保存して終了しても良い。

終わると`Successfully rebased and updated refs/heads/master.`のように書かれていたらOK

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

### tagについて
タグはリリースしたタイミングでつける

タグには『注釈版（annotated）』『軽量版(lightweight)』がある

タグ一覧を出す<br>
`git tag`<br>
`git tag -l "検索ワード" `

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
指定のブランチの一つ上のコミットにHEADを動かす<br>
`git checkout ブランチ名^`

指定のブランチのHEAD位置を三つ前に戻す（相対リファレンス）<br>
`git branch -f ブランチ名 HEAD~3`

履歴を前に戻す（ワークツリーは変わらない）<br>
`git reset HEAD~1`

▼これはワークツリーも変わる<br>
`git reset --hard master`<br>
ブランチがmasterブランチと同じコミットに紐づけられる動作。<br>
`--hard`オプションにより、ワーキングツリーにも反映されます。

既存のコミットを取り消すためのコマンド<br>
`git revert <commit>`

> 参考 [git reset 解説](https://qiita.com/forest1/items/f7c821565a7a7d64d60f)
***

## WebRTC
`P2P（peer to peer）`で行うため、サーバーの負荷はない。相手のIPアドレスを元に通信している。

`STUNサーバー`…自分のIPアドレスとを相手に送ることで実行
STUNサーバーでIPアドレスを送る形式を`SDP`という。IDやメディアの種類などを明示して送るため、招待された相手はそれに従うだけで良い。デバイスの違いをSDPで整えて指定のデータで補う。

`シグナリング`…SDPをお互いにやり取りすること。IDとパスワードみたいなもの。
何かしらの信号を渡す必要がある。結局`WebSocket`や`Firebase`などのサーバが必要になることが多い。

> [WebRTC徹底解説](https://zenn.dev/yuki_uchida/books/c0946d19352af5/viewer/0e7daa)


## その他
- `WebGL`(ウェブ・ジーエル)…ブラウザで3D表示するための標準仕様。（Three.jsが定番らしい）
- `Learn Git Branching`…日本語対応・レベル感ちょうどいい・ゲーム性ありのGit勉強ゲームサイト。Gitの教材やったら、次はこれかな。

> [Learn Git Branching](https://learngitbranching.js.org/?locale=ja)

- `WebRTC`…Web RealTime Communicationの略。音声や映像・データをリアルタイムに送受信することが可能。
- `正常`…想定範囲内で尚且つ歓迎する状況。
- `準正常`…想定の範囲内だけど歓迎していない状況。
- `異常`…想定外の状況のこと。に分ける
- `Agora`…音声や動画などのリアルタイム通信のSaaS。どうやら「Clubhouse」が使っていると噂。

## 個人開発のモチベーション

今回は『個人開発』についてです。

勉強しながら、個人開発をスタートさせたので、その経緯やモチベーションを整理したいと思います。私的な話が多いので、ご了承ください。

僕の根源的なモチベーションは「個人開発がしたい！」です。これはプログラミングを始めた当初から一貫して変わることはありません。

自分でもよくわからなくなっていますが、個人開発で一人勝ちして儲けたい気持ちみたいなものはないんです。

使ってもらって自分の存在意義を満たしたい…おそらく『承認欲求』みたいなところに紐づくんだと思います。

お恥ずかしいですが、実は承認欲求は強い方で、特に『友達』への愛は強いです。

昔仲良かった友達と久しぶりに飲むと、とてもワクワクしません？

「へぇ〜今はそんなことしてるんだ！」「あの時どう思ってたの？」とか。僕はむちゃくちゃアドレナリンが出るタイプです。

### SNSで疎遠になる

一方で、疎遠になってしまう友達もいます。

相性やケンカで嫌いになったなら、受け入れることができますが、僕はもちろん、おそらく、彼らもお互いのことを嫌いになったわけではない。

だからこそ、僕にとって、友達と疎遠になることほど悲しく、虚しいことはない…。

現状、僕らはTwitterやInstagramなどのSNSで繋がってはいて、簡単な情報（彼女はいるのか・どこに住んでいるのか・何に興味があるのか）は何となく手に入れています。

しかし、「そうだね！また今度ご飯行こうぜ！」はお世辞になりました。<br>
#僕だけじゃないよね！？

結果、『SNSではやりとりするが、リアルでは会わない』流れができてしまった…。

デジタルネイティブと言われる僕らは、メッセージで相手に応えてばかりで期待が積み上がってしまって、リアルに会うことへのギャップに対処することが面倒になってしまった。

**つまり、SNSが活発になってしまったために、リアルのハードルが上がってしまった。**

ネット民が「SNSで知り合って、リアルで会う」を理想としてたのに、逆流のように「リアルで仲良くなって、SNSで”しか”やりとりしない」になってしまったんですね。

そこで僕のエゴを叶えようと思い、『声』にフォーカスして接着点を増やす『Dabelu』を開発してみようと考えました。

たぶん、次回は『Dabelu』についてザックリ話そうと思います。

とは言え、技術知識が薄い僕には、走りながら考えるくらいしかできないので、本当にザッッッックリです。

今回は以上です。

また次回！！