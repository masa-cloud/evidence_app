# Bolster App

# Require

- TODO:

# Build Project in simulator with iOS:

## Prepare

> Please make sure yours computer install react native

if not please follow react native document get start

```
https://reactnative.dev/docs/environment-setup
```

## ディレクトリ構成
[component]共有コンポーネントは<例>container
[pages-component]ページ固有のコンポーネント(分割するだけのコンポーネントは同一ファイル内)
[pages]ページ
ディレクトリルール内
・テストやstorybookは同一階層内
　→下記名前で同一階層に配置
　　○○.spec.tsx
　　○○.stories.tsx
・pagesとpages_componentはディレクトリ構成は一緒

## ESLintで下記ルール自動化
・ファイル名、オブジェクト名、プロパティ名は、降順
・未使用ファイルは、自動import削除
・使用ファイルは自動import
## ESLintで下記ルール強制
・基本index.tsからしかimportしない
　→exportさせないファイルには、下記を記述
/**
 * @package
 */
##　スタイルルール
・ColorはuseColorStyleで指定<例>テキスト、背景
・Color以外は、全てTailWindCssを使用

下記を導入したらスターターキットとして、やる
TODO:storybook導入
TODO:nativebase導入
TODO:できればテスト導入