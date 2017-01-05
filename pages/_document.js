import Document, { Head, Main, NextScript } from 'next/document';
import styleSheet from 'styled-components/lib/models/StyleSheet';

export default class MyDocument extends Document {
  static async getInitialProps ({ renderPage }) {
    const page = renderPage();
    const style = styleSheet.rules().map(rule => rule.cssText).join('\n');
    return { ...page, style };
  }

  render() {
    return (
      <html>
        <Head>
          <title>🦁 Lionshare</title>
          <style dangerouslySetInnerHTML={{ __html: this.props.style }} />

          <meta
            name="description"
            content="Your roaring crypto portfolio"
          />
          <link rel="icon" type="image/png" href="/static/favicons/favicon-32x32.png" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </html>
    );
  }
}
