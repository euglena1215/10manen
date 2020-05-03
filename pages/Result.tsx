import Link from "next/link";
import { useRouter } from "next/router";
import Layout from "../components/Layout";

export default ({ query }) => {
  const router = useRouter();
  const { consumeRate, userVoices } = router.query;

  const formattedUserVoices =
    typeof userVoices === "string" ? userVoices.split(",") : userVoices;

  const zaigen = 100;

  return (
    <Layout>
      結果画面
      <p>想定財源{zaigen}億円に対して...</p>
      <p>
        {(zaigen * Number(consumeRate)).toString().slice(0, 3)}億円使いました！
      </p>
      <p>国民の声</p>
      {formattedUserVoices &&
        formattedUserVoices.map((userVoice) => <p>{userVoice}</p>)}
      <Link href="/CreateForm">
        <a>作りなおす</a>
      </Link>
    </Layout>
  );
};
