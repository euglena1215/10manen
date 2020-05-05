import Document, { Html, Head, Main, NextScript } from "next/document";
import { ServerStyleSheet } from "styled-components";

type Props = {
  styleTags: any;
};

export default class MyDocument extends Document<Props> {
  static async getInitialProps(ctx) {
    const sheet = new ServerStyleSheet();
    const originalRenderPage = ctx.renderPage;

    try {
      ctx.renderPage = () =>
        originalRenderPage({
          enhanceApp: (App) => (props) =>
            sheet.collectStyles(<App {...props} />),
        });

      const initialProps = await Document.getInitialProps(ctx);
      return {
        ...initialProps,
        styles: (
          <>
            {initialProps.styles}
            {sheet.getStyleElement()}
          </>
        ),
      };
    } finally {
      sheet.seal();
    }
  }

  render() {
    return (
      <Html lang="ja">
        <Head>
          <meta charSet="utf-8" />
          <title>10万円支給されるやつ</title>
          <meta
            name="description"
            content="10万円申請書類を適切に煩雑にしてユーザーを離脱させ、想定財源ぴったりに寄せるゲーム"
          />
          <link
            href="https://fonts.googleapis.com/css?family=M+PLUS+Rounded+1c"
            rel="stylesheet"
          />
          <link
            href="https://fonts.googleapis.com/css?family=M+PLUS+1p"
            rel="stylesheet"
          />
          <meta name="twitter:image" content="/images/ogp.png" />
          <meta name="og:image" content="/images/ogp.png" />
          {this.props.styleTags}
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}
