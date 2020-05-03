import Layout from "../components/Layout";
import styled from "styled-components";
import Link from "next/link";
import { useState } from "react";

export type INPUT_ATTRIBUTE = {
  type: INPUT_TYPES;
  name: string;
  required: boolean;
};

type INPUT_TYPES = "TEXT" | "TEXT_AREA" | "FILE" | "CHECKBOX";

const convertHtmlInputTag = (input_type: INPUT_TYPES) => {
  switch (input_type) {
    case "TEXT":
      return <input type="text" />;
    case "TEXT_AREA":
      return <textarea />;
    case "FILE":
      return <input type="file" />;
    case "CHECKBOX":
      return <input type="checkbox" />;
  }
};

export default () => {
  const [inputAttributes, setInputAttributes] = useState<INPUT_ATTRIBUTE[]>([]);

  return (
    <Layout>
      <FormPreview action="">
        {inputAttributes.map((inputAttribute) => (
          <div>
            <p>{inputAttribute.name}</p>
            {convertHtmlInputTag(inputAttribute.type)}
          </div>
        ))}
      </FormPreview>
      <FormBuilder>
        <button
          onClick={() =>
            setInputAttributes([
              ...inputAttributes,
              { type: "TEXT", name: "名前", required: false },
            ])
          }
        >
          名前
        </button>
        <button
          onClick={() =>
            setInputAttributes([
              ...inputAttributes,
              { type: "TEXT", name: "住所", required: false },
            ])
          }
        >
          住所
        </button>
        <button
          onClick={() =>
            setInputAttributes([
              ...inputAttributes,
              { type: "TEXT_AREA", name: "志望動機", required: false },
            ])
          }
        >
          志望動機
        </button>
        <button
          onClick={() =>
            setInputAttributes([
              ...inputAttributes,
              { type: "TEXT", name: "口座番号", required: false },
            ])
          }
        >
          口座番号
        </button>
        <button
          onClick={() =>
            setInputAttributes([
              ...inputAttributes,
              { type: "FILE", name: "本人確認種類", required: false },
            ])
          }
        >
          本人確認種類
        </button>
        <button
          onClick={() =>
            setInputAttributes([
              ...inputAttributes,
              { type: "CHECKBOX", name: "本当に必要ですか？", required: false },
            ])
          }
        >
          本当に必要ですか？
        </button>
      </FormBuilder>
      <Link
        href={{
          pathname: "/Calculate",
          query: {
            inputAttributes: inputAttributes.map((attr) =>
              JSON.stringify(attr)
            ),
          },
        }}
      >
        <a>フォーム完成！</a>
      </Link>
    </Layout>
  );
};

const FormPreview = styled.form`
  border: 1px solid #000;
  min-height: 100px;
`;

const FormBuilder = styled.div``;
