import Layout from "../components/Layout";
import styled from "styled-components";
import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import FormPreview from "../components/FormPreview";
import InputText from "../components/InputText";
import InputTextArea from "../components/InputTextArea";

import useInterval from "use-interval";

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

  const MAX_TIME = 60;
  const [time, setTime] = useState(MAX_TIME);
  useInterval(() => {
    setTime(time - 1);
  }, 1000);

  const currentDate = ((max, time) => {
    const now = new Date(2020, 3, 1);
    now.setDate(now.getDate() + max - time);
    return now;
  })(MAX_TIME, time);
  const formatCurretDay = (day) => {
    switch (day) {
      case 0:
        return <>月</>;
      case 1:
        return <>火</>;
      case 2:
        return <>水</>;
      case 3:
        return <>木</>;
      case 4:
        return <>金</>;
      case 5:
        return <CurrentDateSat>土</CurrentDateSat>;
      case 6:
        return <CurrentDateSun>日</CurrentDateSun>;
    }
  };
  const formatCurrentDate = (
    <>
      {currentDate.getMonth() + 1}月{currentDate.getDate()}日（
      {formatCurretDay(currentDate.getDay())}）
    </>
  );

  return (
    <Layout>
      <CurrentDate>
        {formatCurrentDate}
        <CurrentDateRemain>
          期限まで残り
          {time > 0 ? (
            <CurrentDateRemainDate>{time}</CurrentDateRemainDate>
          ) : (
            <CurrentDateRemainDateExceed>{time}</CurrentDateRemainDateExceed>
          )}
          日
        </CurrentDateRemain>
      </CurrentDate>

      <FormPreview
        inputAttributes={inputAttributes}
        onDeleteInputAttribute={(index) => {
          inputAttributes.splice(index, 1);
          setInputAttributes(inputAttributes);
        }}
      />
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
          <FormBuilderTable>
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
          </FormBuilderTable>

          <ApplyButtonWrapper>
            <ApplyButton
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
            </ApplyButton>
          </ApplyButtonWrapper>
        </FormBuilderContent>
      </FormBuilder>
      <Link
        href={{
          pathname: "/Calculate",
          query: {
            time: time,
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
  display: flex;
  overflow-x: scroll;
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

const FormBuilderTable = styled.table`
  margin: 10px;
`;

const ApplyButtonWrapper = styled.div`
  text-align: right;
  margin-right: 10px;
  margin-bottom: 10px;
`;

const ApplyButton = styled.button`
  background-color: #fff;
  border-radius: 3px;
  font-size: 0.8rem;
  border: 2px solid;
  padding: 3px 15px;
  cursor: pointer;

  :hover {
    box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(0, 0, 0, 0.02);
  }
`;

const CurrentDate = styled.div`
  margin: 20px 0;
`;

const CurrentDateSat = styled.span`
  color: blue;
`;

const CurrentDateSun = styled.span`
  color: red;
`;

const CurrentDateRemain = styled.span`
  font-size: 0.7rem;
`;

const CurrentDateRemainDate = styled.span`
  font-size: 1rem;
`;

const CurrentDateRemainDateExceed = styled(CurrentDateRemainDate)`
  color: red;
`;
