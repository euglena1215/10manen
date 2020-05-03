import Layout from "../components/Layout";
import styled from "styled-components";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";

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
  const [selectedTab, setSelectedTab] = useState<INPUT_TYPES>("TEXT");

  const [inputName, setInputName] = useState<string>(null);
  const nameRef = useRef(null);
  useEffect(() => {
    nameRef.current.value = inputName;
  }, [inputName]);

  const [inputRequired, setInputRequired] = useState<boolean>(false);
  const requiredRef = useRef(null);
  useEffect(() => {
    requiredRef.current.checked = inputRequired;
  }, [inputRequired]);

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
        <FormBuilderTabWrapper>
          <FormBuilderTab
            onClick={() => {
              if (selectedTab !== "TEXT") {
                setSelectedTab("TEXT");
                setInputName(null);
                setInputRequired(false);
              }
            }}
            isActive={selectedTab === "TEXT"}
          >
            記述項目（短）
          </FormBuilderTab>
          <FormBuilderTab
            onClick={() => {
              if (selectedTab !== "TEXT_AREA") {
                setSelectedTab("TEXT_AREA");
                setInputName(null);
                setInputRequired(false);
              }
            }}
            isActive={selectedTab === "TEXT_AREA"}
          >
            記述項目（長）
          </FormBuilderTab>
          <FormBuilderTab
            onClick={() => {
              if (selectedTab !== "FILE") {
                setSelectedTab("FILE");
                setInputName(null);
                setInputRequired(false);
              }
            }}
            isActive={selectedTab === "FILE"}
          >
            添付ファイル
          </FormBuilderTab>
          <FormBuilderTab
            onClick={() => {
              if (selectedTab !== "CHECKBOX") {
                setSelectedTab("CHECKBOX");
                setInputName(null);
                setInputRequired(false);
              }
            }}
            isActive={selectedTab === "CHECKBOX"}
          >
            チェックボックス
          </FormBuilderTab>
        </FormBuilderTabWrapper>

        <FormBuilderContent>
          <p>
            項目名：
            <input
              type="text"
              ref={nameRef}
              onChange={(e) => setInputName(e.target.value)}
            />
          </p>
          <p>
            必須？
            <input
              type="checkbox"
              ref={requiredRef}
              checked={inputRequired}
              onChange={(e) => setInputRequired(e.target.checked)}
            />
          </p>

          <button
            onClick={() =>
              setInputAttributes([
                ...inputAttributes,
                {
                  type: selectedTab,
                  name: inputName,
                  required: inputRequired,
                },
              ])
            }
          >
            反映
          </button>
        </FormBuilderContent>
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
  border: 2px solid #000;
  min-height: 100px;
  padding: 10px;
`;

const FormBuilder = styled.div`
  margin-top: 30px;
`;

const FormBuilderTabWrapper = styled.div`
  padding-bottom: 9px;
`;

const FormBuilderTab = styled.span<{ isActive: boolean }>`
  font-size: 0.8rem;
  padding: 10px;
  border: 2px solid #000;
  text-align: center;
  cursor: pointer;
  border-right: 0;
  border-bottom: 0;
  background-color: ${({ isActive }) => (isActive ? "#ddd" : "#fff")};

  :last-child {
    border-right: 2px solid #000;
  }
`;

const FormBuilderContent = styled.div`
  padding: 10px;
  border: 2px solid #000;
  font-size: 0.8rem;
`;
