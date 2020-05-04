import Layout from "../components/Layout";
import styled from "styled-components";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import FormPreview from "../components/FormPreview";
import InputText from "../components/InputText";
import InputTextArea from "../components/InputTextArea";

export type INPUT_ATTRIBUTE = {
  type: INPUT_TYPES;
  name: string;
  description: string;
  required: boolean;
};

export type INPUT_TYPES = "TEXT" | "TEXT_AREA" | "FILE" | "CHECKBOX";

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

  const [isNameRequired, setInNameRequired] = useState(false);

  const clearInput = () => {
    setInputName(null);
    setInputDescription(null);
    setInputRequired(false);
  };

  return (
    <Layout>
      <FormPreview inputAttributes={inputAttributes} />
      <FormBuilder>
        <FormBuilderTabWrapper>
          <FormBuilderTab
            onClick={() => {
              if (selectedTab !== "TEXT") {
                setSelectedTab("TEXT");
                clearInput();
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
                clearInput();
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
                clearInput();
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
                clearInput();
              }
            }}
            isActive={selectedTab === "CHECKBOX"}
          >
            チェックボックス
          </FormBuilderTab>
        </FormBuilderTabWrapper>

        <FormBuilderContent>
          <table>
            <tr>
              <td>
                項目名<RequiredRed>*</RequiredRed>：
              </td>
              <td>
                <InputText
                  type="text"
                  ref={nameRef}
                  onChange={(e) => setInputName(e.target.value)}
                />
                {isNameRequired ? (
                  <RequiredText>項目名は必須です</RequiredText>
                ) : null}
              </td>
            </tr>
            <tr>
              <td>説明：</td>
              <td>
                <InputTextArea
                  ref={descriptionRef}
                  onChange={(e) => setInputDescription(e.target.value)}
                />
              </td>
            </tr>
            <tr>
              <td>必須？</td>
              <td>
                <input
                  type="checkbox"
                  ref={requiredRef}
                  checked={inputRequired}
                  onChange={(e) => setInputRequired(e.target.checked)}
                />
              </td>
            </tr>
          </table>

          <button
            onClick={() => {
              if (inputName && inputName.length !== 0) {
                setInputAttributes([
                  ...inputAttributes,
                  {
                    type: selectedTab,
                    name: inputName,
                    description: inputDescription,
                    required: inputRequired,
                  },
                ]);
                clearInput();
                setInNameRequired(false);
              } else {
                setInNameRequired(true);
              }
            }}
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
        <CreateFormLinkWrapper>
          <CreateFormLink>> フォーム完成！</CreateFormLink>
        </CreateFormLinkWrapper>
      </Link>
    </Layout>
  );
};

const FormBuilder = styled.div`
  margin-top: 30px;
`;

const FormBuilderTabWrapper = styled.div`
  padding-bottom: 13px;
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

const CreateFormLinkWrapper = styled.div`
  text-align: center;
  margin: 30px;
`;

const CreateFormLink = styled.a`
  text-decoration: none;
  cursor: pointer;
  color: #555;

  :hover {
    color: #000;
  }
`;

const RequiredRed = styled.span`
  color: red;
`;

const RequiredText = styled.span`
  color: red;
  font-size: 0.5rem;
`;
