import Link from "next/link";
import { useRouter } from "next/router";
import Layout from "../components/Layout";
import styled from "styled-components";

export default () => {
  const router = useRouter();
  const { consumeRate, userVoices } = router.query;

  const formattedUserVoices =
    typeof userVoices === "string" ? userVoices.split(",") : userVoices;

  const zaigen = 100;

  return (
    <Layout>
      <Title>
        <p>想定財源{zaigen}億円に対して...</p>
        <p>
          {(zaigen * Number(consumeRate)).toString().slice(0, 3)}
          億円使いました！
        </p>
      </Title>
      <UserVoice>
        <UserVoiceTitle>国民の声</UserVoiceTitle>

        {formattedUserVoices &&
          formattedUserVoices.map((userVoice) => (
            <UserVoiceContent>
              <p>@xxxx: {userVoice}</p>
            </UserVoiceContent>
          ))}
      </UserVoice>

      <Link href="/CreateForm">
        <a>作りなおす</a>
      </Link>
    </Layout>
  );
};

const Title = styled.div`
  margin: 20px;
  font-size: 2rem;
  text-align: center;
`;

const UserVoice = styled.div``;

const UserVoiceTitle = styled.p`
  font-size: 1.5rem;
`;

const UserVoiceContent = styled.div`
  margin: 10px;
`;
