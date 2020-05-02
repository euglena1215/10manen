import Link from "next/link";
import Layout from "../components/Layout";

const Result = () => (
  <Layout>
    結果画面
    <p>想定財源100億円に対して...</p>
    <p>1000億円使いました！</p>
    <p>国民の声</p>
    <p>使いにくい。これ作った人はどうかしてるのか</p>
    <p>公開遅くね？</p>
    <p>項目多すぎてめんどすぎるわ</p>
    <Link href="/CreateForm">
      <a>作りなおす</a>
    </Link>
  </Layout>
);
export default Result;
