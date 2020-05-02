import Layout from "../components/Layout";
import Link from "next/link";

export default () => (
  <Layout>
    <h1>せつめい</h1>
    <ul>
      <li>
        <p>あなたは受託会社の社員</p>
      </li>
      <li>
        <p>政府から案件がきた</p>
      </li>
      <li>
        <p>
          「10万円支給したいから申請フォーム作って!
          ただ、国民全員に申請されちゃうと財源無くなっちゃうから良い感じに煩雑にして調整してw」
        </p>
      </li>
    </ul>

    <Link href="/CreateForm">
      <a>つくるぞ！</a>
    </Link>
  </Layout>
);
