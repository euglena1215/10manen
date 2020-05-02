import Layout from "../components/Layout";
import styled from "styled-components";
import Link from "next/link";
import { useState } from "react";

const INPUT_TYPES = {
  NAME: "NAME",
  ADDRESS: "ADDRESS",
  WHY: "WHY",
  ACCOUNT_NUMBER: "ACCOUNT_NUMBER",
  CONFIRM_FILE: "CONFIRM_FILE",
  REALLY_NEED: "REALLY_NEED",
};

const INPUT_TYPE_ELEMENTS = {
  [INPUT_TYPES.NAME]: (
    <div>
      名前：
      <input type="text" name="name" />
    </div>
  ),
  [INPUT_TYPES.ADDRESS]: (
    <div>
      住所：
      <input type="text" name="address" />
    </div>
  ),
  [INPUT_TYPES.WHY]: (
    <div>
      志望動機：
      <textarea name="why" />
    </div>
  ),
  [INPUT_TYPES.ACCOUNT_NUMBER]: (
    <div>
      口座番号：
      <input type="text" name="accountNumber" />
    </div>
  ),
  [INPUT_TYPES.CONFIRM_FILE]: (
    <div>
      本人確認種類：
      <input type="file" name="confirm" />
    </div>
  ),
  [INPUT_TYPES.REALLY_NEED]: (
    <div>
      本当に必要ですか？：
      <input type="checkbox" name="reallyNeed" />
    </div>
  ),
};

export default () => {
  const [inputTypes, setInputTypes] = useState<string[]>([]);

  return (
    <Layout>
      フォーム作成
      <div>
        <button
          onClick={() => setInputTypes([...inputTypes, INPUT_TYPES.NAME])}
        >
          名前
        </button>
        <button
          onClick={() => setInputTypes([...inputTypes, INPUT_TYPES.ADDRESS])}
        >
          住所
        </button>
        <button onClick={() => setInputTypes([...inputTypes, INPUT_TYPES.WHY])}>
          志望動機
        </button>
        <button
          onClick={() =>
            setInputTypes([...inputTypes, INPUT_TYPES.ACCOUNT_NUMBER])
          }
        >
          口座番号
        </button>
        <button
          onClick={() =>
            setInputTypes([...inputTypes, INPUT_TYPES.CONFIRM_FILE])
          }
        >
          本人確認種類
        </button>
        <button
          onClick={() =>
            setInputTypes([...inputTypes, INPUT_TYPES.REALLY_NEED])
          }
        >
          本当に必要ですか？
        </button>
      </div>
      <Form action="">
        {inputTypes.map((inputType) => INPUT_TYPE_ELEMENTS[inputType])}
      </Form>
      <Link
        href={{
          pathname: "/Calculate",
          query: { inputTypes: inputTypes.join(",") },
        }}
      >
        <a>フォーム完成！</a>
      </Link>
    </Layout>
  );
};

const Form = styled.form`
  border: 1px solid #000;
`;
