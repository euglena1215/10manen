import ResultBase from "../components/ResultBase";
import styled from "styled-components";

export default () => {
  return (
    <ResultBase twitterContent="納期を過ぎて責任を取らされ あなたはクビになりました。">
      <Title1>納期を過ぎて責任を取らされ</Title1>
      <Title2>あなたはクビになりました。</Title2>
      <ImgWrapper>
        <img src="images/fire.png" width="300px"/>
      </ImgWrapper>
    </ResultBase>
  );
};

const Title1 = styled.p`
  margin: 20px;
  font-size: 1rem;
  text-align: center;
`;

const Title2 = styled.p`
  margin: 20px;
  font-size: 1.8rem;
  text-align: center;
  font-weight: bold;
`;

const ImgWrapper = styled.div`
  text-align: center;
`;
