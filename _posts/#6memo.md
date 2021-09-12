---
title: ＃6 駆け出しエンジニアのメモ
layout: post
tags:
  - laravel
  - Vue.js
  - Nuxt
  - JavaScript
  - CSS
  - Git
  - SQL
  - Firebase
date: 2021-06-21
meta:
  - name: 駆け出しエンジニア ブログ 更新
    content: 駆け出しエンジニアのリアルなメモブログです。
---

## Laravel

- `toArray()`…オブジェクトの内容を配列に変える

```
$user = User::factory()->make();
// => App\User {#4973
     name: "yJpdiI6ImZQTEV2WGk2N2hGMmFYMXNwbFRlSkE9PSIsInZhbHVlIjoiVU9ITDJySTFCb9",
     email: "NmM5YjM5OGFhYTYwNmJkNzI3MjQxIn0=",
     #password: "$2y$10$UMFzL7I7hk/vPNkCvIinV",
     account_id: 264,
   }
オブジェクトになっている。

$user->toArray();
// => [
     "name" => "山口 浩",
     "email" => "sayuri.yamamoto@example.net",
     "account_id" => 264,
   ]
こんな感じで配列になっている
```

- Laravel では`''（シングルクォート）`で書くようにする。
  - `'こういう場合はシングルです。'`
- 結合の場合は`""（ダブルクォート）`でも OK
  - `"私の名前は{{ $user }}です。"`
- Controller→view にデータを渡す
  - Controller 側で`'loginUrl'=> $userLogin`として渡して
  - view 側で`{{ $loginUrl }}`で view で受け取る
- `each()`…コレクションのアイテムを繰り返しで処理し、コールバックに各アイテムを渡す。

```
$collection->each(function ($item, $key) {
    //
});
```

- `upsert`…update+insert。データがあれば更新。なければ挿入。
  - > [Laravel 公式](https://readouble.com/laravel/8.x/ja/queries.html?header=UPSERTS)

```
upsert(挿入か更新する値, 入れるレコード, 一致するデータがDBに存在する場合に更新する必要のあるカラム)
```

- `Crypt::encrypt`でエンコード。`Crypt::decrypt`でデコード…laravel の暗号化方法
  - [暗号化・復号を Laravel で行う](https://qiita.com/saya1001kirinn/items/2495bf4889c3d97c3e10)

```
$crypt = Crypt::encrypt(りんご)
dd($crypt)
// りんごをエンコードされた結果が出る
// #rfag%gsgsbsgs$gsgs

$decrypt = Crypt::decrypt($crypt)
dd($decrypt)
// #rfag%gsgsbsgs$gsgsをデコードする
// りんご
```

- views/vender/mail の中に`defalut.css`が埋まっている。メールデザインの CSS を変更したい場合
  - > [メールの送信（５）HTML メールのフォントなどをカスタマイズ](https://www.larajapan.com/2021/01/30/%E3%83%A1%E3%83%BC%E3%83%AB%E3%81%AE%E9%80%81%E4%BF%A1%EF%BC%88%EF%BC%95%EF%BC%89html%E3%83%A1%E3%83%BC%E3%83%AB%E3%81%AE%E3%83%95%E3%82%A9%E3%83%B3%E3%83%88%E3%81%AA%E3%81%A9%E3%82%92%E3%82%AB/)
- `firstWhere`…メソッドはコレクションの中から、最初の指定したキー／値ペアの要素を返す。
  - > [Laravel 公式](https://readouble.com/laravel/6.x/ja/collections.html#method-first-where)
- `toMail($createAccount)`…\$createAccount の内容をメールに変換している

```
$collection = collect([
    ['name' => 'Regena', 'age' => null],
    ['name' => 'Linda', 'age' => 14],
    ['name' => 'Diego', 'age' => 23],
    ['name' => 'Linda', 'age' => 84],
]);
$collection->firstWhere('name', 'Linda');
// ['name' => 'Linda', 'age' => 14]
```

- `ログのデバック方法`…`dd()`と同じようにデバックできる。
  - dd だとそこで処理が終わってしまうが、log なら処理が終わらないため、キューなどの並行処理が行われているような場面で使える。

```
\Log::info('tsubasa web memo');
\Log::info($user);
\Log::info($this->user);
```

- if 文で値の違いを見るのではなく、引数で値を見るコードをかけると処理が少なくて済む

```
if (self::ACCOUNT_ID_PEOPLE) {
  $emails->each(function ($email) use ($Comments, $loginUrl) {
    Mail::to($email)->queue(new NewComments($Comments,      $phone->name, $loginUrl));
  });
} else {
  $emails->each(function ($email) use ($Comments, $LoginUrl) {
    Mail::to($email)->queue(new NewComments($Comments, $phone->name, $LoginUrl));
  });
}

// 無駄に多くなってしまう
// 必要な関数内の引数で条件を追加させることで条件分岐化

private function dispatchMail(int $accountTypeId, Collection $emails, Phone $phone, string $loginUrl): void
    {
      処理
    }
```

- Laravel の log は`logging.php`で定義されている。Slack に通知も可能。
  どうやら monolog という外部ライブラリを含んでいるみたい。使い方は知らんけど。
- `キューのテスト`…バックグランドで送信するために、mailable をキュー投入している場合は、`assertSent`の代わりに`assertQueued`メソッドを使用してください。
- `observer`…モデルの処理を監視して、別処理をする方法。つまり、モデルの処理のグループ化
  - > [Laravel モデルについて（公式）](https://readouble.com/laravel/8.x/ja/eloquent.html)
- `password_verify(string $password, string $hash)`…パスワードのハッシュ化されたものをテストしたい場合(php)
  - > [password_verify](https://www.php.net/manual/ja/function.password-verify.php)
- `getOriginalContent()->getData()`…コントローラから view に渡しているパラメータをテストでチェックできる
  - > [Laravel-テスト時に view に渡されたパラメータをチェックする](https://kido0617.github.io/php/2019-12-09-laravel-test-view/)
- `assertViewHasAll(array $data)`…レスポンスビューが指定したリストのデータを持っていることをチェック。
- Laravel でのスクレイピングの工程がわかりやすい[【作業工程フル公開】エンジニアが 30 万円案件の制作過程を公開](https://youtu.be/tYbVl6N8oxI)

## JavaScript

- Promise の使い方。この記事がすごいわかりやすかった。
  - > [【ES6】 JavaScript 初心者でもわかる Promise 講座](https://qiita.com/cheez921/items/41b744e4e002b966391a)

```
new Promise(function(resolve, reject) {
    resolve('成功');
});
new Promise(function(resolve, reject) {
    reject('失敗');
});
```

- `includes(文字列)`で文字列が入っているかのチェックが可能。bool 値で返ってくる。
  - > [JavaScript で特定の文字列が含まれているか調べるメソッドの使い方](https://qiita.com/shimajiri/items/a2d79d9aa1323da972f3)
- `navigator.clipboard.writeText(text)`…『コピー機能』（URL 共有みたいな）を作りたい場合
  - [Vue.js でクリップボードにコピーするコントロールを作る](https://kumano-te.com/activities/copy-text-to-clipboard-with-vuejs)
- `foreach()/map()の違い`…『メソッドを実行した後』配列に新しく配列を作成し返すのが map。foreach は何も返さない。（undefind）
  - > [JavaScript の map と forEach の使い分け](https://yukimonkey.com/data/map-foreach/)
- [JavaScript で重複排除を自分で実装してはいけない（Set を使う）](https://qiita.com/netebakari/items/7c1db0b0cea14a3d4419)…重複を扱う場合に`fileter()`を使いがちだけど、どうやら負荷が高いらしい。`set()`の方がいいらしいよ。

## Vue.js

- `createdとmountedの違い`…created は DOM がまだ作られていない状態で、mounted では DOM が作成された直後の状態。
  - ただし、created は data の中には保存できるため、api 呼び出しをして、貯めておくくらいなら可能

```
created : function(){
    console.log('created')
    console.log(this.$el)
// undefined
  },
  mounted : function(){
    console.log('mounted')
    console.log(this.$el)
// <div id="app">...</div>
  }
```

- クラスが変わるごとに処理やスタイルを変更させたい場合。
  - `v-bind:class=“{クラス名: プロパティ名}`
  - `data: { isLarge: true,}`
  - > [【Vue.js】v-bind を使った class, style の変更方法。動的な変更もできる](https://qiita.com/shizen-shin/items/94cdde004fb225f8b1b2)
- Vue JS は、オブジェクトの配列ではなく`[__ob__：Observer]`データを返します。
  なので、別のアプローチは、関数で`async/await`を使用すること。
- `describe()`…vue のテストで使われるもの。

- [Vue Test Utils](https://vue-test-utils.vuejs.org/ja/)…Vue コンポーネントのテストライブラリ

### Nuxt

- nuxt のルーターの書き方がまとまってる！！[【Nuxt.js/Vue.js】\$route.○○ で URL のパスやパラメータを取得する](https://zenn.dev/kokota/articles/bebbcc405c7468)
- nuxt の vuex で引数を使いたい場合
  - > [getters で引数を使う書き方（Nuxt 2.x.x モジュールモード）](https://qiita.com/yunity29/items/365b3ebb072474effca4)

```
// ストア側のgettersの記述(pokedex.js)
export const getters = {
  getName: state => (index, locale) => {
    return // 処理
  },
};
// gettersを使う側の記述(Component.vue)
this.$store.getters['index/getName'](25, 'jp')
```

- indexOf のエラーが出たら、「文字列」が期待されているが、その他の型が来てしまっている。

  - > ["TypeError: obj.indexOf is not a function"エラーが出た時](https://www.kabanoki.net/4099/)

- nuxt で画像を使いたい場合は２つ方法がある
  - データ容量の小さな画像は「assets」に格納
    - `<img src="~/assets/images/sample.png">`
    - `<img src="@/assets/image/sample.png">`
  - データ容量の大きな画像は「static」に格納
    - `<img src="images/sample.png">`
- [nuxt/auth](https://auth.nuxtjs.org/)…nuxt でログイン機能を作りたいなら、これがアンパイっぽい。

## Firestore

- fireStore にデータを保存するには`add`メソッドと`set`メソッドがある。
- `add`メソッドはドキュメント ID を自動で降ってくれるので、楽だが`update`メソッドを使いたい場合（ドキュメント ID が必要な場合）は控えたほうがいい
- `set`メソッドは自分でドキュメント ID を明記しなければいけないので、面倒だが、`update`メソッドなどドキュメント ID を使いたい場合はこちらを使う。管理しやすいから。
- firestore のルールを変更すれば、簡単に直る。ただし、テストモードを解除する場合は速やかに設定をし直す必要あり。
  - > [[Firebase] Cloud Firestore データベースへのクライアント アクセスが 〇 日後に期限切れになります](https://qiita.com/NoOne/items/5248a62bd969336a0ae1)

## SQL

- `バルクインサート`…データベースに対する命令で、insert 文っぽいやつ。大量のデータを一気に投入するときに使うよ
  - > [「分かりそう」で「分からない」でも「分かった」気になれる IT 用語辞典](https://wa3.i-3-i.info/word15497.html)

## Git

- `pending`…レビューコメントの返信をしていると右上に『pending』が出るが、これは相手には通知がいってない。まとめて送信するための下書き的な。気をつける必要がある。
- 一箇所だけコメントの場合は『`single comment`』をする

  - > [プルリクエストでの「Start a review」と「Add single comment」の使い分けがよくわかってなかったのでまとめてみた](https://bake0937.hatenablog.com/entry/2019/10/24/145241)

- `git submodule`…大元のリポジトリに追加された小さなリポジトリのこと。大規模な開発などで使われる
  - > [Git サブモジュールとは？git submodule の使い方](https://qiita.com/yuta-38/items/5d1ae90a93e052801351)

## CSS

- 偶数個目のクラスだけスタイルを変更したい場合。

```
クラス名:nth-child(n){
  プロパティ:値
}
偶数個目に指定する場合 → even
奇数個目に指定する場合 → odd
3個に一個の場合→ 3n
```

## その他

- `Lumen` …Laravel と同じように PHP のフレームワーク。Laravel よりも軽量・速度が早い。
  - > [Lumen と Laravel 違い比較](https://hapicode.com/php/laravel-lumen.html)
- `ファビコン`は ico 形式だけでなく、svg 形式にも対応している（32×32px）
- ページリロード 7 秒は長い
- `エンティティ`…実体のこと。E-R 図における箱のこと
- `lonic`…React Native のように Web の技術を使用して、モバイルアプリも作れる技術。ただし、まだ Vue は β 版。
- `ステートレス`…状態を保持しないこと。
- `ステートフル`…状態を保持すること。
- `OAuth（オーオース）`…SNS や Web サービス間で「アクセス権限の認可」を行うためのプロトコルのことであり、現在では 2012 年に発行された OAuth 2.0 が標準化。
  - > [一番分かりやすい OAuth の説明](https://qiita.com/TakahikoKawasaki/items/e37caf50776e00e733be)…マジで 1 番わかりやすい
  - Laravel でも使えるよね。そりゃあ
  - > [Laravel 公式](https://readouble.com/laravel/5.5/ja/passport.html)
- `Cookie`は HTTP ステータスのヘッダーにつける
- `セッション`…セッション ID をもとに、買い物カゴの中身などのデータをサーバー側に保存すること。
  - どうやってセッション ID を含ませるか?
    - セッション ID を Cookie の中に含めてやりとりする方法
    - URL に「?id=11111」のように URL に含ませる方法
    - form の type=hidden の中に含ませる方法
  - ▼ これが 1 番わかりやすい
  - > [Cookie とキャッシュとセッションの違いをまとめた](https://qiita.com/taoki11111/items/4c103683ac46ec851017?utm_content=buffere6d9f&utm_medium=social&utm_source=twitter.com&utm_campaign=buffer)
- `アクセストークン（Access Token）`…Web サービスを利用するために、認証局がユーザーを認証するために払い出した認証情報
- `スキーマ`…データ構造の定義。スキーマを持つデータベースにはこれがある。定義通りに格納しないと怒られる。MySQL など一般的な SQL
  - 例：列が 2 列の定義があるもの
- `スキーマレスデータベース`…データ構造が定義されてないデータベース。Firestore など。
  - 例：列が 2 列。でも、列を 3 列でも格納可能
- `レイテンシー`…CPU などがデータの要求をもらってから、実際にデータが転送されるまでの時間。
- `キューイング`…キューを用いて管理すること
- `冪等性`…（べきとうせい）同じ操作を何度繰り返しても、同じ結果が得られる性質
- `CAPTCHA（キャプチャ）`…コンピュータ（プログラム）と人間を区別するための手段。
  - 人間には容易に区別できるが、プログラムには難しいものを提示することで区別している
  - 例：「グニャグニャ文字」でここに書かれたものを打ってください。「犬を選んでください」「ピースをはめてください」
- `ロードバランサー`…Web リクエストをどの Web サーバーに送るかを判断するための装置。一旦全てのリクエストを受け取る
- `プロダクト開発`…課題に対して、どう解決するのか。どう作るのか。
- `内部設計`…DB の流れを考える
- `外部設計`…アプリの流れを考える
- `詳細設計`…モジュールや画面の遷移を考える
- `単体テスト`…モジュール（一ファイルの場合も）をテストをすることを
- `結合テスト（連結テスト）`…単体テスト後にモジュール間のテストを行う
- `空→雨→傘`…**事実**（何が起きた？影響範囲は？どこで？どのくらいの頻度で？どのプロセスで？）**→ 解釈**（なぜ起きているのか？何が原因なのか？どんな意味があるか？結果どうなると思うか？）**→ 行動**（どんな方法で解決できるか？どれが良いか悪いか）の順番で物事を考えること。この意識をしないと、事実と解釈が混じった発言をしてしまう。
- 【Mac】Mac で Chrome のタブ複製『`command＋L＋Enter`』
- 【Mac】`shift＋tab`で上位箇条書きに変更できる
- `ダイナミック・プライシング（Dynamic Pricing）`…商品やサービスの価格を需要と供給の状況に合わせて変動させる価格戦略。「動的価格設定」「変動料金制」「価格変動制」ともいう。
  - 例：お盆の時期に、ホテルや航空券の値段を上げるなど。
  - USJ は、2019 年に入場チケットのダイナミック・プライシングを導入しました。
    - それまで 9 年連続して入場チケットを値上げしていましたが、繁忙期と閑散期にチケットの値差をつけることにより、入場者数のコントロールと混雑緩和による顧客満足度の向上に成功したといわれています。
- `スパイト行動`…自分が苦労してでも、相手の足を引っ張ろうとすること
- `KGI`…ビジネスゴールを定量的に示した指標そのものである。
- `KPI`…KGI 達成までの各プロセスの達成度をはかるもので、ゴールまでの中間指標。
  - 例：アプリの売り上げ UP が目的（KPI）ならば、アクティブユーザー数 UP、平均単価 UP が KGI
- `CJグループ（韓国）`…BTS やパラサイトの監督を世界に押し出した企業。元々砂糖などを売る食品会社
- `脆弱性を防ぐ`…昔はハッカーが企業個人情報を手に入れてそれを得ることで生計を立てていた。
  - 個人情報を売るよりもはるか高い値段で買い取ることで脆弱性を防いでいる。
    - 信頼性が落ちることを考えたら、そっちの方がお得
    - Microsoft 妥当最高 100,000 ドル
- [ピクセルフォントが大好物な人に！第 1・第 2 水準漢字まで収録された商用無料のフリーフォント -マルモニカ](https://coliss.com/articles/freebies/freefont-marumonica.html)…ひらがな・カタカナ・第二水準漢字・数字まで使える。ゲームっぽくていい。使いたい
- `ホリスティック・マーケティング`…様々なマーケティング活動を融和させることでマーケティング効果を最大限に発揮させようとする考え方。提唱者はフィリップ・コトラーである。
- [Form to Chatbot](https://formtochatbot.com/)…Google フォームをチャットボット化できる。自サービスに使える
- [Meta Tags](https://metatags.io/)…メタデータがどのように表示されているか確認でき、コードも発行してくれる
- [Noun Project](https://thenounproject.com/)…おしゃれなモノクロアイコンがダウンロードできるサイト
- [モック API を簡単に作れる json-server の使い方！フロントエンド開発に超便利！](https://www.youtube.com/watch?v=y0kPrFjfggk)…モックの API を作れる。
- [【個人開発】キャンプを記録するサービス TAKiBee（タキビー）をリリースしました!](https://qiita.com/Soogle_1729/items/fe9c8cf44ad36a9a3127)…すごいシンプルだけど、俺も頑張れそうな記事
- ニュージーランドは中学校がなくて、小学校がそのまま 8 年とか
- `百花繚乱（ひゃっかりょうらん）`…いろいろの花が咲き乱れること。秀でた人物が多く出て、すぐれた立派な業績が一時期にたくさん現れること。
