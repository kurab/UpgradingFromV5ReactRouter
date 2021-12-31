# Upgrading from v5 - React Router

Original Document: https://reactrouter.com/docs/en/v6/upgrading/v5

# v5からのアップグレード

## 後方互換パッケージ

v6 API 上に、v5 互換レイヤーを積極的に実装しているところです。これにより、可能な限りスムーズなアップグレードが可能となります。アプリケーションのコードに最小限の変更を加えるだけで、v6へのアップグレードが可能となり、v6 APIに対応したコードに段階的に更新していくことができるようになります。

*多くのルートをアップグレードする場合は、後方互換パッケージのリリースをお待ちいただくことをお勧めします。*

それまでは、このガイドを参考にアップグレードしていただければと思います。

## イントロダクション

React Router v6 では、いくつかの強力な新機能が導入され、Reactの最新バージョンとの互換性が向上しています。また、v5 からのいくつかの breaking change があります。このドキュメントは、あなたのv4/v5 アプリを v6 にアップグレードする包括的なガイドであり、うまく行けば、可能な限り頻繁にリリースすることができるようになります。

React Router を初めて使う、または新しいアプリで v6 を試したい場合は、[入門ガイド](https://reactrouter.com/docs/en/v6/getting-started/installation)を参照してください。

このガイドの例では、v5 アプリでどのように構築したかを示すサンプルコードと、v6 で同じことを実現する方法を示しています。また、なぜこのような変更を行ったのか、そしてこの変更があなたのコードとあなたのアプリを使用する人々の全体的なUXをどのように改善するのかについての説明もあります。

一般的には、以下のような流れでアップグレードします。

1. [React v16.8 以上にアップグレードする](#react-v168-へアップグレード)
2. [React Router を v5.1 にアップグレードする](#react-router-v51-へアップグレード)
    - [`<Switch>` 内の `<Redirect>`を削除する](#switch-内の-Redirect-を削除する)
    - [カスタム `<Route>` をリファクタリングする](#カスタム-route-のリファクタリング)
3. [React Router v6 にアップグレードする](#react-router-v6-へのアップグレード)

以下は、v6 への迅速かつ確実な移行に役立つ各ステップの詳細です。

## React v16.8 へアップグレード

React Router v6 は React hooks を多様しているため、React Router v6 へのアップグレードを行う前に、React v16.8以降へアップグレードする必要があります。React Router v5 は、React v15以上と互換があるため、v5（またはv4）であれば、コードに一切触れることなく React のアップグレードを行えます。

React v16.8 へのアップグレードが完了したら、アプリをリリースしてください。その後、続きを進めることができます。

## React Router v5.1 へアップグレード

先に v5.1 にアップグレードしておくと、React Router v6 への移行が容易になります。v5.1 では、`<Route children>` 要素の取り扱いを強化し、v6 への移行をスムーズにするための機能をリリースしています。`<Route component>`と`<Route render>` props の代わりに、どこでも通常の要素 `<Route children>` を使用し、 hooks を使用してルーターの内部 state にアクセスします。

```jsx
// v4 および v5.1 以前の v5 の書き方
function User({ id }) {
  // ...
}

function App() {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route path="/about" component={About} />
      <Route
        path="/users/:id"
        render={({ match }) => (
          <User id={match.params.id} />
        )}
      />
    </Switch>
  );
}

// v5.1 スタイル
function User() {
  let { id } = useParams();
  // ...
}

function App() {
  return (
    <Switch>
      <Route exact path="/">
        <Home />
      </Route>
      <Route path="/about">
        <About />
      </Route>
      {/* Can also use a named `children` prop */}
      <Route path="/users/:id" children={<User />} />
    </Switch>
  );
}
```

v5.1 の hooks API と、通常の `elements` に移行した理由については、[ブログ](https://reacttraining.com/blog/react-router-v5-1/)にて詳しく説明しています。

一般的に、React Router v5.1（およびv6）では、`elements` が `components`（または element type）よりも優先されます。これにはいくつかの理由がありますが、v6 の `<Route>` API について説明する際に、詳しく説明します。

通常の React elements を使用する場合、props を明示的に渡すことができます。これは、コードの可読性と長期的なメンテナンスに役立ちます。`<Route render>` を使用して props を取得していた場合、代わりに Route components 内で `useParams` を使用します。

v5.1 へのアップグレードに伴い、`withRouter` の使用を hooks に置き換える必要があります。また、`<Switch>` の中に入っていない `<Route>` elements は取り除いてください。これについては、[v5.1 に関するブログ記事](https://reacttraining.com/blog/react-router-v5-1/)で詳しく説明しています。

まとめると、v4/5 から v5.1 へのアップグレードは、以下のようになります。

- `<Route render>` や `<Route component>` props の代わりに `<Route children>` を使用する
- 現在の Location やパラメータなど、ルーターの state にアクセスするには、hooks API を使用する
- `withRouter` をすべて hooks に置き換える
- `<Switch>` 内に存在しない `<Route>` は、`useRouteMatch` で置き換えるか `<Switch>` で囲む

## `<Switch>` 内の `<Redirect>` を削除する

`<Switch>` に入っている `<Redirect>` をすべて削除してください。

最初のレンダリングでリダイレクトしたい場合は、リダイレクトロジックをサーバに移す必要があります（これについては、[こちら](https://gist.github.com/mjackson/b5748add2795ce7448a366ae8f8ae3bb)で詳しく説明しています）。

クライアントサイドでリダイレクトしたい場合は、`<Redirect>` を `<Route render>` のプロパティに移してください。

```jsx
// これを…
<Switch>
  <Redirect from="about" to="about-us" />
</Switch>

// こう
<Switch>
  <Route path="about" render={() => <Redirect to="about-us" />} />
</Switch>
```

`<Switch>` の中に入っていない通常の `<Redirect>` 要素は、そのままで大丈夫です。v6では `<Navigate>` 要素になる予定です。

## カスタム `<Route>` のリファクタリング

`<Switch>` 内の要素のうち、通常の `<Route>` 要素でないものを、通常の `<Route>` に置き換えます。これには、`<PrivateRoute>` スタイルのカスタムコンポーネントが含まれます。

この背景にある論理的根拠については、v5 で `<Route render>` props を使用して同じ効果を得る方法に関するいくつかの tips を含めて、[ここ](https://gist.github.com/mjackson/d54b40a094277b7afdd6b81f51a0393f)で詳しく読むことができます。

## いったん、リリースしてください！

繰り返しになりますが、アプリを v5.1 にアップグレードできたら、テストとリリースを行い、続きの準備ができたら、このガイドを再開してください。

## React Router v6 へのアップグレード

気を引き締めて！:これは移行中、最も大きなステップであり、最も時間と労力がかかるでしょう。

このステップでは、React Router v6 をインストールする必要があります。

```bash
$ npm install react-router-dom
# or, for a React Native app
$ npm install react-router-native
```

また、package.json から `history` の依存関係を削除することをお勧めします。`history` ライブラリは v6 の直接的な依存関係（peer dep ではない）なので、直接 import したり使用したりすることはありません。その代わりに、すべてのナビゲーションに `useNavigate()` hook を使用します（下記参照）。

## `<Switch>` 要素を `<Routes>` 要素にアップグレードする

React Router v6 では、`Switch` に似ているがより強力な `Routes` コンポーネントが導入されました。`Switch` と比較して `Routes` の主な利点は以下の通りです。

- `<Routes>` 内のすべての `<Route>` と `<Link>` は相対的です。これは、`<Route path>` と `<Link to>` において、より無駄のない、より予測可能なコードにすることができます。
- ルートは順番にトラバースされるのではなく、最もマッチしたものが選択されます。これにより、`<Switch>` の中で後から定義されたために到達できないルートによるバグを回避することができます。
- ルートは、異なるコンポーネントに分散させるのではなく、1つの場所にネストさせることができます。中小規模のアプリでは、これですべてのルートを簡単に一度に見ることができます。大規模なアプリでは、`React.lazy` を介して動的にロードされる Bundle にルートをネストすることができます。

v6 を使用するには、すべての `<Switch>` 要素を `<Routes>` に変換する必要があります。すでに v5.1 にアップグレード済みであれば、半分くらいはできています。

ではまず、v6 での相対的なルートとリンクについて説明します。

## 相対的な Route と Link

v5 では、 Route と Link をどのようにネストさせたいかについて、非常に明確である必要がありました。どちらの場合も、親 Route の `match.url`と`match.path`プロパティから `<Route path>`と `<Link to>` プロパティを作成する必要がありました。さらに Route をネストしたい場合は、子 Route のコンポーネントにそれらを配置する必要がありました。

```jsx
// React Router v5の場合の例
import {
  BrowserRouter,
  Switch,
  Route,
  Link,
  useRouteMatch
} from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Switch>
        <Route exact path="/">
          <Home />
        </Route>
        <Route path="/users">
          <Users />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

function Users() {
  // v5 では、ネストされたルートは、子コンポーネントによってレンダリングされるため、
  // ネストされた UI のために、アプリ内のいたることろに<Switch>要素があります。
  // ネストされたルートとリンクは、match.url, match.path を使って構築します。
  let match = useRouteMatch();

  return (
    <div>
      <nav>
        <Link to={`${match.url}/me`}>My Profile</Link>
      </nav>

      <Switch>
        <Route path={`${match.path}/me`}>
          <OwnUserProfile />
        </Route>
        <Route path={`${match.path}/:id`}>
          <UserProfile />
        </Route>
      </Switch>
    </div>
  );
}
```

こちらが、v6 のサンプルになります。

```jsx
// React Router v6の場合の例
import {
  BrowserRouter,
  Routes,
  Route,
  Link
} from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="users/*" element={<Users />} />
      </Routes>
    </BrowserRouter>
  );
}

function Users() {
  return (
    <div>
      <nav>
        <Link to="me">My Profile</Link>
      </nav>

      <Routes>
        <Route path=":id" element={<UserProfile />} />
        <Route path="me" element={<OwnUserProfile />} />
      </Routes>
    </div>
  );
}
```

この例では、v6 についてのいくつかの重要な点があります。

- `<Route path>`と`<Link to>`は相対パスです。これは、親ルートのパスと URL を自動的に構築することを意味し、手動で match.url や match.path を補完する必要がありません。
- `<Route exact>` がなくなりました。その代わりに、（他のコンポーネントで定義された）子孫ルートを持つルートは、より深くマッチするために、そのパスの末尾に `*` を使用します。
- ルートを好きな順番で配置することができ、ルーターは現在の URL に対して最適なルートを自動的に検出します。これにより、手動で `<Switch>` に間違った順番でルートを配置することによるバグを防ぐことができます。

また、v5 アプリの `<Route childre>`が v6 では `<Route element>` に変更されていることにお気づきかも知れません。v5.1 へのアップグレード手順に従っているとすれば、ルート要素を子の位置から名前付き要素のプロパティに移動するだけで、簡単に変更できるはずです。

## `<Route element>` の利点

v5.1 へアップグレードの項で、レンダリングに component（または element type）ではなく、通常の element を使用する利点について説明すると述べました。アップグレードの話は少しお休みして、その話をしましょう。

まず、React 自身が `<Suspense fallback={<Spinner />}` API でこれをリードしていることがわかります。fallback プロパティは、component ではなく、React element を受け取ります。これにより、<Spinner> をレンダリングする component から、必要なプロパティを簡単に渡すことができます。

component ではなくelement を使うということは、passProps スタイルの API を提供する必要がないため、element に必要なプロパティを取得することができます。例えば、コンポーネントベースの API では、`<Route path=":userId" component={Profile} />` がマッチした時にレンダリングされる `<Profile>` element にプロパティを渡すよい方法はありません。このアプローチを取るほとんどの React ライブラリは、`<Route component={Profile} passProps={{ animate: true }} />`のような API となるか、レンダープロパティまたは高次のコンポーネントを使用します。

お気づきでない方もいらっしゃるかもしれませんが、v4 と v5 では Route のレンダリング API がかなり大きくなっています。それは次のようなものでした:

```jsx
// これは、シンプルで良い例だ。
<Route path=":userId" component={Profile} />

// ちょっと待って。<Profile> elementにどうやってカスタムプロパティを渡す??
// んー…たぶん、こういう場合は、render を使えば良いはず。
<Route
  path=":userId"
  render={routeProps => (
    <Profile routeProps={routeProps} animate={true} />
  )}
/>

// Ok, ルートで何かをレンダリングする方法が2つできたよ :/

// でも、ちょっと待って。もしルートが URL にマッチ *しなかった* 時に
// 何か、Not Foundページのようなものをレンダリングしたい場合はどうする？
// ちょっと意味合いの違った render プロパティを渡す…？
<Route
  path=":userId"
  children={({ match }) => (
    match ? (
      <Profile match={match} animate={true} />
    ) : (
      <NotFound />
    )
  )}
/>

// ルートマッチにアクセスした時や、ツリーの深いところにリダイレクトする必要が
// ある場合はどうしたら良い？？
function DeepComponent(routeStuff) {
  // ルートのごにょごにょ。やれやれだぜ。
}
export default withRouter(DeepComponent);

// さて…これで少なくともすべてのユースケースを網羅できましたね。
// Well hey, now at least we've covered all our use cases!
// ... *ヤレヤレ*
```

この API 乱立の理由の、少なくとも一部は、React が <Route> からルート要素に情報を渡す方法を提供していなかったためです。したがって、ルートデータと独自のカスタムプロパティの両方を要素に渡すためのスマートな方法を考えなければなりませんでした：component, render プロパティ, passProps, 高次 components... hooks ができるまでは！

上記のボヤキは以下のようになります。

```jsx
// あー、シンプルで良い API だね。<Suspense> API みたいで！
// これ以上ここで学ぶことはないね。
<Route path=":userId" element={<Profile />} />

// ちょっと待って。<Profile> 要素にどうやってカスタムプロパティを渡せば？
// おー、なるほど。ただの要素で良いのね。簡単。
<Route path=":userId" element={<Profile animate={true} />} />

// Ok, でも URL パラメータや現在の Location なんかのルーターデータにアクセスするには？
function Profile({ animate }) {
  let params = useParams();
  let location = useLocation();
}

// じゃあ、ツリーの深いところのコンポーネントは？
function DeepComponent() {
  // 他のところと一緒なのね
  let navigate = useNavigate();
}

// こんとんじょのいかぁぁぁぁ
```

v6 で element prop を使用するもう一つの重要な理由は、`<Route children>`が Route のネストのために予約されていることです。これは、v3 や @reach/router から人気のある機能の一つで、v6 ではこれを復活させます。前例のコードをさらに一歩進めて、すべての`<Route>`要素を一つの Route 設定にまとめることができます。

```jsx
// React Router v6 アプリ
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  Outlet
} from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="users" element={<Users />}>
          <Route path="me" element={<OwnUserProfile />} />
          <Route path=":id" element={<UserProfile />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

function Users() {
  return (
    <div>
      <nav>
        <Link to="me">My Profile</Link>
      </nav>

      <Outlet />
    </div>
  );
}
```

もちろん、このステップは任意ですが、数千もの Route を持たない中小規模のアプリには本当にありがたいものです。

`<Route>`要素が`<Routes>`要素の中にネストされていることに注目してください。入れ子になった Route は、親 Route のパスに追加することでそのパスを構築します。今回、`<Route path="users">`に末尾の`*`は必要ありません。なぜなら、Route が一箇所で定義されると、ルーターはネストした Route をすべて見ることができるからです。

末尾の`*`は、Route の子孫ツリーのどこかに別の`<Routes>`がある場合にのみ必要です。この場合、子孫の`<Routes>`は、パス名の残りの部分でマッチします（実際にどのように見えるかは、前の例を参照してください）。

ネストされたコンフィグを使用する場合、子ルートを持つルートは、その子ルートをレンダリングするために `<Outlet>` をレンダリングする必要があります。これにより、ネストされた UI を持つレイアウトを簡単にレンダリングすることができます。

## `<Route path>` パターンに関する注意点

React Router v6では、簡略化されたパス形式が採用されています。v6の`<Route path>`は、2種類のプレースホルダのみをサポートしています: 動的 `:id` スタイルのパラメータ と `*` ワイルドカードです。ワイルドカードはパスの末尾にのみ使用可能で、途中には使用できません。

以下は、v6 で有効なルートパスです。

```jsx
/groups
/groups/admin
/users/:id
/users/:id/messages
/files/*
/files/:id/*
```

以下の正規表現スタイルのルートパスは、v6 では**無効**です。

```jsx
/users/:id?
/tweets/:id(\d+)
/files/*/cat.jpg
/files-*
```

より高度なパターンマッチを実現するため、v4 で path-to-regexp への依存を追加しました。v6 では、よりシンプルな構文を使用することで、ランキングのためにパスを予測的に解析できるようになりました。また、path-to-regexp への依存をやめることにより、バンドルのサイズも小さくすることができました。

正規表現によって高度なパスマッチを実現していた場合は、それを削除してルートパスを簡素化する必要があります。正規表現を URL のパラメータ検証（例えば、id がすべて数字であることを確認するなど）に使用していた場合は、v6 で高度なパラメータ検証を追加する予定であることをお知らせします。今のところ、そのロジックを Route がレンダリングする component に移動し、パラメータをパースした後にレンダリングを分岐させる必要があります。

`<Route sensitive>` を使用していた場合は、それを含む `<Routes caseSensitive>` プロパティに移動する必要があります。`<Routes>` 要素内のすべての Route は、大文字と小文字を区別するか、しないかのどちらかです。

もう一つ、v6のすべてのパスマッチは、URLの末尾のスラッシュを無視することに注意してください。実際、`<Route strict>`は削除され、v6では何の効果もありません。これは、末尾のスラッシュを使用できないという意味ではありません。アプリは、末尾のスラッシュを使用するかどうかを決定できますが、`<Route path="edit">` と `<Route path="edit/">` でクライアント側に2つの異なるUIをレンダリングできないだけです。これらのURLで2つの異なるUIをレンダリングすることは可能ですが（推奨しません）、サーバーサイドで行う必要があります。

## `<Link to>` に関する注意点

v5 では、`/` で始まらない `<Link to>` 値は曖昧でした。これは、現在の URL が何であるかに依存します。例えば、現在の URL が `/users` の場合、v5 の `<Link to="me">` は `<a href="/me">` と表示されます。しかし、現在の URL が `/users/` のように末尾にスラッシュを持つ場合、同じ `<Link to="me">` は `<a href="/users/me">` とレンダリングされます。このため、v5 では、ルート URL からリンクを構築し（`match.url` を使用）、相対的な `<Link to>` 値を使用しないことを推奨していました。

React Router v6では、この曖昧さが修正されました。v6では、`<Link to="me">`は、現在のURLに関係なく、常に同じ`<a href>`をレンダリングします。

たとえば、`<Route path="users">` 内で表示される `<Link to="me">` は、現在の URL に末尾のスラッシュがあるかどうかにかかわらず、常に `/users/me` へのリンクが表示されます。

上位の親ルートへリンクしたい場合は、`<a href>`と同様に、`<Link to>`の値の先頭に `..` セグメントを使用します。

```jsx
function App() {
  return (
    <Routes>
      <Route path="users" element={<Users />}>
        <Route path=":id" element={<UserProfile />} />
      </Route>
    </Routes>
  );
}

function Users() {
  return (
    <div>
      <h2>
        {/* /users へのリンク - 現在のルート */}
        <Link to=".">Users</Link>
      </h2>

      <ul>
        {users.map(user => (
          <li>
            {/* /users/:id へのリンク - 子ルート */}
            <Link to={user.id}>{user.name}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
}

function UserProfile() {
  return (
    <div>
      <h2>
        {/* /users へのリンク - 親ルート */}
        <Link to="..">All Users</Link>
      </h2>

      <h2>
        {/* /users/:id へのリンク - 現在のルート */}
        <Link to=".">User Profile</Link>
      </h2>

      <h2>
        {/* /users/mj へのリンク - 兄弟ルート */}
        <Link to="../mj">MJ</Link>
      </h2>
    </div>
  );
}
```

現在のURLをファイルシステム上のディレクトリパスのように考え、`<Link to>`をcdコマンドのように考えるとよいでしょう

```jsx
// ルートがこんな感じだったら
<Route path="app">
  <Route path="dashboard">
    <Route path="stats" />
  </Route>
</Route>

// そして現在の URL が /app/dashboard（末尾のスラッシュの有無問わず）だったら
<Link to="stats">               => <a href="/app/dashboard/stats">
<Link to="../stats">            => <a href="/app/stats">
<Link to="../../stats">         => <a href="/stats">
<Link to="../../../stats">      => <a href="/stats">

// cd コマンドだと, 現在のディレクトリが /app/dashboard だったら
cd stats                        # pwd is /app/dashboard/stats
cd ../stats                     # pwd is /app/stats
cd ../../stats                  # pwd is /stats
cd ../../../stats               # pwd is /stats
```

メモ: マッチングや相対パス作成時に末尾のスラッシュを無視するという決定は、気軽に行ったものではありません。多くの友人やクライアント（彼らは友達でもあります！）に、この件について相談しました。その結果、ほとんどの人が、プレーンな HTML の相対リンクがどのように末尾のスラッシュを処理しているのかさえ、きちんと理解していないことがわかりました。ほとんどの人は、`cd` コマンドのように動作すると思っていたようです（そんなことはありません）。また、HTML の相対リンクにはネストされたルートという概念がなく、URL に対してのみ機能するため、ここでは少し独自の道を切り開く必要がありました。`@reach/router` はこの前例を作り、数年間うまくいっています。

現在の URL の末尾のスラッシュを無視することに加えて、`<Route path>` が URL の複数のセグメントにマッチするとき、`<Link to="..">` が常に `<a href="..">` のように動作するとは限らないことに注意することが重要です。URL の 1 つのセグメントを削除するのではなく、親ルートのパスに基づいて解決し、基本的にそのルートによって指定されたすべてのパスセグメントを削除します。

```jsx
function App() {
  return (
    <Routes>
      <Route path="users">
        <Route
          path=":id/messages"
          element={
            // /users へのリンクになる
            <Link to=".." />
          }
        />
      </Route>
    </Routes>
  );
}
```

URLセグメントではなくルートに対して、`..`を動作させるというのは奇妙な選択に思えるかもしれませんが、不特定多数のセグメントが`*`にマッチする可能性がある `*`ルートを扱う際の大きな助けとなります。これらのシナリオでは、`<Link to>` の値に単一の `..` セグメントを取ることで、`*` によってマッチしたものを本質的に除去できるので、`*`ルートで、より予測可能なリンクを作成することが可能になります。

```jsx
function App() {
  return (
    <Routes>
      <Route path=":userId">
        <Route path="messages" element={<UserMessages />} />
        <Route
          path="files/*"
          element={
            // * でどれだけマッチしても、/:userId/messages へのリンクになる
            <Link to="../messages" />
          }
        />
      </Route>
    </Routes>
  );
}
```

## `react-router-config` の代わりに `useRoutes` を使用する

v5 の `react-router-config` パッケージの機能は、v6 ではすべて core に移動しました。もし React elements ではなく、JavaScript オブジェクトとしてルートを定義することを好む/必要とするなら、これを気に入ることでしょう。

```jsx
function App() {
  let element = useRoutes([
    // <Route> で与えたプロパティと同じ
    { path: "/", element: <Home /> },
    { path: "dashboard", element: <Dashboard /> },
    {
      path: "invoices",
      element: <Invoices />,
      // ネストされたルートは、子プロパティを使い、それも
      // <Route> と同じ
      children: [
        { path: ":id", element: <Invoice /> },
        { path: "sent", element: <SentInvoices /> }
      ]
    },
    // Not Found ルートも期待通りに動く
    { path: "*", element: <NotFound /> }
  ]);

  // return された要素は、必要なすべての適切なコンテキストを持つ
  // 要素階層全体をレンダリングします。
  return element;
}
```

この方法で定義されたルートは、`<Routes>`と同じセマンティクスをすべて踏襲しています。実際、`<Routes>` は `useRoutes` のラッパーに過ぎません。

`<Routes>`と`useRoutes`の両方を試してみて、どちらを使うか自分で決めてください。正直なところ、私たちはどちらも好きで使っています。

もしサーバサイドでのデータ取得やレンダリングに関する独自のロジックを作成した場合は、`react-router-config`にあったような低レベルの`matchRoutes`関数も用意されています。

## `useHistory` の代わりに `useNavigate` を使用する

React Router v6では、`<Link>`と同義の新しいナビゲーションAPIが導入され、サスペンド対応アプリとの互換性がより向上しました。このAPIには、あなたのスタイルとニーズに応じて、命令型と宣言型の両方が含まれています。

```jsx
// React Router v5 アプリ
import { useHistory } from "react-router-dom";

function App() {
  let history = useHistory();
  function handleClick() {
    history.push("/home");
  }
  return (
    <div>
      <button onClick={handleClick}>go home</button>
    </div>
  );
}
```

v6では、このアプリは`navigate` APIを使用するように書き換える必要があります。これは、ほとんどの場合、`useHistory`を`useNavigate`に変更し、`history.push`や`history.replace`の呼び出しを変更することを意味します。

```jsx
// React Router v6 アプリ
import { useNavigate } from "react-router-dom";

function App() {
  let navigate = useNavigate();
  function handleClick() {
    navigate("/home");
  }
  return (
    <div>
      <button onClick={handleClick}>go home</button>
    </div>
  );
}
```

新しい Location を history にプッシュするのではなく、現在の Location を置き換える必要がある場合は、`navigate(to, { replace: true })` を使用します。state が必要な場合は、`navigate(to, { state })`を使ってください。`navigate` の最初の引数は`<Link to>`と考えることができ、他の引数はreplaceとstateのプロパティと考えることができます。

もし、宣言したAPI（v5の`Redirect`コンポーネントのような）を使いたい場合は、v6では、`Navigate`コンポーネントが提供されています。以下ように使用します。

```jsx
import { Navigate } from "react-router-dom";

function App() {
  return <Navigate to="/home" replace state={state} />;
}
```

メモ: v5の`<Redirect />`はデフォルトで`replace`ロジックを使用し（`push` propで変更可能）、一方、v6の`<Navigate />`はデフォルトで`push`ロジックを使用し、`replace` propで変更可能であることに注意してください。

```jsx
// これを:
<Redirect to="about" />
<Redirect to="home" push />

// こう変更する:
<Navigate to="about" replace />
<Navigate to="home" />
```

現在、`useHistory`の`go`, `goBack`, `goForward`を使用して前後への移動を行っている場合、これらを`navigate`に置き換えて、history スタックのどこにポインタを移動するかを、数値引数で指定する必要があります。例えば、以下はv5の`useHistory`フックを使ったコードです。

```jsx
// React Router v5 アプリ
import { useHistory } from "react-router-dom";

function App() {
  const { go, goBack, goForward } = useHistory();

  return (
    <>
      <button onClick={() => go(-2)}>
        Go 2 pages back
      </button>
      <button onClick={goBack}>Go back</button>
      <button onClick={goForward}>Go forward</button>
      <button onClick={() => go(2)}>
        Go 2 pages forward
      </button>
    </>
  );
}
```

v6 では以下のようになります。

```jsx
// React Router v6 アプリ
import { useNavigate } from "react-router-dom";

function App() {
  const navigate = useNavigate();

  return (
    <>
      <button onClick={() => navigate(-2)}>
        Go 2 pages back
      </button>
      <button onClick={() => navigate(-1)}>Go back</button>
      <button onClick={() => navigate(1)}>
        Go forward
      </button>
      <button onClick={() => navigate(2)}>
        Go 2 pages forward
      </button>
    </>
  );
}
```

繰り返しになりますが、`history` APIの直接利用から`navigate` APIに移行する主な理由の1つは、React suspenseとの互換性を向上させるためです。React Router v6では、コンポーネント階層のルートで`useTransition`フックを使用します。これにより、例えば、以前にクリックしたリンクがまだロードされている間に別のルートへのリンクをクリックした場合など、保留中のルート遷移を中断する必要がある場合に、よりスムーズなエクスペリエンスを提供することができます。navigate APIは内部の保留中の遷移状態を認識しており、履歴スタックに PUSH する代わりに REPLACE を行うので、実際にはロードされていないページが履歴に残ってしまうことはありません。

メモ: v5 の `<Redirect>` 要素は、ルート設定の一部 (`<Routes>` 内) としてサポートされなくなりました。これは、React の今後の変更により、最初のレンダリング中にルータの状態を変更することが安全でなくなるためです。すぐにリダイレクトする必要がある場合は、a) サーバ上で行うか (おそらく最良の解決策)、b) ルートコンポーネントで `<Navigate>` 要素をレンダリングすることができます。ただし、ナビゲーションは `useEffect` で行われることを認識してください。

サスペンスとの互換性はさておき、`navigate`は`Link`と同様に相対的なナビゲーションをサポートしています。例えば

```jsx
// `/stuff`にいるとする
function SomeForm() {
  let navigate = useNavigate();
  return (
    <form
      onSubmit={async event => {
        let newRecord = await saveDataFromForm(
          event.target
        );
        // URLを自分で組み立てることができる
        navigate(`/stuff/${newRecord.id}`);
        // または、Link のようにすることもできる
        navigate(`${newRecord.id}`);
      }}
    >
      {/* ... */}
    </form>
  );
}
```

## `<Link> component` のプロパティを削除する

`<Link>` は return されたアンカータグを上書きするための `component` プロパティをサポートしなくなりました。これにはいくつかの理由があります。

まず、`<Link>`はほとんどの場合に`<a>`タグをレンダリングする必要があります。そうでない場合は、アプリに深刻なアクセシビリティとユーザビリティの問題がある可能性があり、それはよくありません。ブラウザは`<a>`で多くの優れたユーザビリティ機能を提供し、我々はユーザがその恩恵を無償で得られるようにしたいと考えています。

しかし、あなたのアプリはCSS-in-JSライブラリを使用しているかもしれませんし、あなたのデザインシステムにはすでにカスタムで、ファンシーなリンクコンポーネントがあり、それを代わりにレンダリングしたいかもしれません。hooks 以前の世界では、`component` props は十分に機能したかもしれませんが、今では、私たちの hook をいくつか使うだけで、アクセス可能な独自の`Link`コンポーネントを作成することができます。

```jsx
import { FancyPantsLink } from "@fancy-pants/design-system";
import {
  useHref,
  useLinkClickHandler
} from "react-router-dom";

const Link = React.forwardRef(
  (
    {
      onClick,
      replace = false,
      state,
      target,
      to,
      ...rest
    },
    ref
  ) => {
    let href = useHref(to);
    let handleClick = useLinkClickHandler(to, {
      replace,
      state,
      target
    });

    return (
      <FancyPantsLink
        {...rest}
        href={href}
        onClick={event => {
          onClick?.(event);
          if (!event.defaultPrevented) {
            handleClick(event);
          }
        }}
        ref={ref}
        target={target}
      />
    );
  }
);
```

`react-router-native`を使用している場合、基本的に同じように動作する`useLinkPressHandler`を提供しています。リンクの`onPress`ハンドラで、このフックの返す関数を呼び出すだけで、準備は完了です。

## `<NavLink exact>`を`<NavLink end>`にリネームする

これは、Reactエコシステムの、他のライブラリの共通プラクティスに合わせるために、propの名前を変更しただけです。

## `<NavLink />` から `activeClassName` と `activeStyle` プロップを削除する

`v6.0.0-beta.3` より、`NavLinkProps` から `activeClassName` と `activeStyle` プロパティが削除されました。代わりに、`style` または `className` に関数を渡すことで、コンポーネントのアクティブな状態に基づいてインラインスタイルまたはクラス文字列をカスタマイズすることができます。

```diff
<NavLink
  to="/messages"
- style={{ color: 'blue' }}
- activeStyle={{ color: 'green' }}
+ style={({ isActive }) => ({ color: isActive ? 'green' : 'blue' })}
>
  Messages
</NavLink>
```

```diff
<NavLink
  to="/messages"
- className="nav-link"
- activeClassName="activated"
+ className={({ isActive }) => "nav-link" + (isActive ? " activated" : "")}
>
  Messages
</NavLink>
```

もし、v5のプロパティを維持したい場合は、独自の`<NavLink />`をラッパーコンポーネントとして作成することで、よりスムーズにアップグレードできます。

```jsx
import * as React from "react";
import { NavLink as BaseNavLink } from "react-router-dom";

const NavLink = React.forwardRef(
  ({ activeClassName, activeStyle, ...props }, ref) => {
    return (
      <BaseNavLink
        ref={ref}
        {...props}
        className={({ isActive }) =>
          [
            props.className,
            isActive ? activeClassName : null
          ]
            .filter(Boolean)
            .join(" ")
        }
        style={({ isActive }) => ({
          ...props.style,
          ...(isActive ? activeStyle : null)
        })}
      />
    );
  }
);
```

## `react-router-dom/server`から`StaticRouter`を取得する

`StaticRouter`コンポーネントは、新しいバンドルである`react-router-dom/server`に移動しました。

```jsx
// 変更前
import { StaticRouter } from "react-router-dom";
// 変更後
import { StaticRouter } from "react-router-dom/server";
```

この変更は、`react-dom`パッケージで確立された慣習により近く従うため、また、`<StaticRouter>`が何のためにあり、いつ（サーバー上で）使用されるべきかをユーザーがより理解できるようにするために行われたものです。

## `useRouteMatch`を`useMatch`に置き換える

`useMatch`は、v5の`useRouteMatch`と非常によく似ていますが、いくつかの重要な違いがあります。

- 新しい[パスパターンマッチングアルゴリズム](#route-path-パターンに関する注意点)
- pattern 引数は必須となりました
- パターンの配列は受け付けなくなりました
- パターンをオブジェクトとして渡す場合、v6の他のAPIとの整合性を高めるために、いくつかのオプションが改名されました
    - `useRouteMatch({ strict })` は `useMatch({ end })` になりました
    - `useRouteMatch({ sensitive })` は `useMatch({ caseSensitive })` に変更になりました
- 形状が異なるマッチオブジェクトが返されるようになりました

新しい useMatch フックの正確な API とその型宣言を見るには、[API リファレンス](https://reactrouter.com/docs/en/v6/api#usematch)をご覧ください。

```jsx
declare function useMatch<ParamKey extends string = string>(
  pattern: PathPattern | string
): PathMatch<ParamKey> | null;
```

## `<Prompt>`は現在サポートされていません

v5からの`<Prompt>`は（v6ベータからの`usePrompt`と`useBlocker`と共に）、v6の現在のリリースバージョンに含まれていません。私たちは、完全には完成していない機能にさらに時間をかけるよりも、今あるものを使ってリリースする方が良いと判断しました。近い将来、v6にこの機能を追加する予定ですが、6.xの最初の安定版リリースではありません。

## 見落としがあったら教えて下さい

私たちは細心の注意を払っていますが、何か見落としているかもしれません。もし、このアップグレードガイドに従った結果、そのようなことがあった場合は、ぜひ私たちに教えてください。私たちは、v5 のコードをアップグレードして v6 の素晴らしい機能のすべてを利用できるようにするために、何をすればよいかを見つけるお手伝いをさせていただきます。

Good Luck🤘
