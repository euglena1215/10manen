import Layout from "../components/Layout";
import styled from "styled-components";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";

export type INPUT_ATTRIBUTE = {
  type: INPUT_TYPES;
  name: string;
  description: string;
  required: boolean;
};

type INPUT_TYPES = "TEXT" | "TEXT_AREA" | "FILE" | "CHECKBOX";

const convertHtmlInputTag = (input_type: INPUT_TYPES) => {
  switch (input_type) {
    case "TEXT":
      return <FormInputText type="text" />;
    case "TEXT_AREA":
      return <FormInputTextArea />;
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

  const [inputDescription, setInputDescription] = useState<string>(null);
  const descriptionRef = useRef(null);
  useEffect(() => {
    descriptionRef.current.value = inputDescription;
  }, [inputDescription]);

  return (
    <Layout>
      <FormPreview action="">
        <FormPreviewText>プレビュー</FormPreviewText>
        <FormPreviewTitle>10万円申請書</FormPreviewTitle>
        <FormPreviewTable>
          {inputAttributes.map((inputAttribute) => (
            <tr>
              <FormPreviewTableName>
                {inputAttribute.required ? (
                  <FormPreviewRequired>必須</FormPreviewRequired>
                ) : null}
                {inputAttribute.name}
              </FormPreviewTableName>
              <FormPreviewTableInputWrapper>
                <FormPreviewTableDescription>
                  {inputAttribute.description}
                </FormPreviewTableDescription>
                {convertHtmlInputTag(inputAttribute.type)}
              </FormPreviewTableInputWrapper>
            </tr>
          ))}
        </FormPreviewTable>
      </FormPreview>
      <FormBuilder>
        <FormBuilderTabWrapper>
          <FormBuilderTab
            onClick={() => {
              if (selectedTab !== "TEXT") {
                setSelectedTab("TEXT");
                setInputName(null);
                setInputDescription(null);
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
                setInputDescription(null);
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
                setInputDescription(null);
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
                setInputDescription(null);
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
            説明：
            <textarea
              ref={descriptionRef}
              onChange={(e) => setInputDescription(e.target.value)}
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
                  description: inputDescription,
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
  min-height: 250px;
  max-height: 400px;
  background-color: #ffffe0;
  overflow: scroll;
`;

const FormPreviewText = styled.div`
  font-size: 0.6rem;
  background-color: #fff;
  width: 90px;
  border-right: 1px solid;
  border-bottom: 1px solid;
  text-align: center;
  padding: 3px;
`;

const FormPreviewTitle = styled.h1`
  text-align: center;
  margin: 20px;
`;

const FormPreviewTable = styled.table`
  width: 90%;
  margin: 20px auto;
`;

const FormPreviewTableName = styled.td`
  border: 1px solid #888;
  font-size: 0.6rem;
  padding: 10px;
  background-color: #f1f1f1;
  width: 30%;
  font-weight: bold;
  color: #444;
`;

const FormPreviewRequired = styled.span`
  background-color: #dc143c;
  color: white;
  font-weight: normal;
  border-radius: 2px;
  padding: 3px 6px;
  font-size: 0.5rem;
  margin-right: 5px;
`;

const FormPreviewTableDescription = styled.p`
  font-size: 0.5rem;
  color: #555;
`;

const FormPreviewTableInputWrapper = styled.td`
  border: 1px solid #888;
  background-color: #fff;
  padding: 10px;
  width: 70%;
`;

const FormInputText = styled.input`
  width: 50%;
  border-radius: 3px;
  border: 1px solid #aaa;
  line-height: 0.8rem;
  background-color: #f4f4f4;
`;

const FormInputTextArea = styled.textarea`
  width: 50%;
  border-radius: 3px;
  line-height: 0.8rem;
  border: 1px solid #aaa;
  background-color: #f4f4f4;
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
