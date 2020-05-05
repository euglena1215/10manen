import styled from "styled-components";

import { INPUT_TYPES, INPUT_ATTRIBUTE } from "../pages/CreateForm";
import InputText from "./InputText";
import InputTextArea from "./InputTextArea";
import { useState, useEffect } from "react";

export default ({
  inputAttributes,
  onDeleteInputAttribute,
}: {
  inputAttributes: INPUT_ATTRIBUTE[];
  onDeleteInputAttribute: (index: number) => void;
}) => {
  const [hoveredInput, setHoveredInput] = useState<number>(null);

  return (
    <form action="">
      <FormPreviewInner>
        <FormPreviewText>プレビュー</FormPreviewText>
        <FormPreviewTitle>10万円申請書</FormPreviewTitle>
        <FormPreviewTable>
          {inputAttributes.map((inputAttribute, index) => (
            <FormPreviewTableRow
              onMouseOver={() => {
                setHoveredInput(index);
              }}
              onMouseLeave={() => {
                setHoveredInput(null);
              }}
            >
              <FormPreviewTableName>
                {inputAttribute.required ? (
                  <FormPreviewRequired>必須</FormPreviewRequired>
                ) : null}
                {inputAttribute.name}
              </FormPreviewTableName>
              <FormPreviewTableInputWrapper>
                <FormPreviewTableDescription>
                  {nl2br(inputAttribute.description)}
                </FormPreviewTableDescription>
                {convertHtmlInputTag(inputAttribute.type)}
                {hoveredInput === index ? (
                  <CloseButton onClick={() => onDeleteInputAttribute(index)}>
                    削除
                  </CloseButton>
                ) : null}
              </FormPreviewTableInputWrapper>
            </FormPreviewTableRow>
          ))}
        </FormPreviewTable>
      </FormPreviewInner>
    </form>
  );
};

const nl2br = (text) => {
  if (text && text.length !== 0) {
    const regex = /(\n)/g;
    return (
      <span>
        {text.split(regex).map((line) => {
          if (line.match(regex)) {
            return <br />;
          } else {
            return line;
          }
        })}
      </span>
    );
  } else {
    return null;
  }
};

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

const FormPreviewInner = styled.form`
  border: 2px solid #000;
  min-height: 250px;
  max-height: 400px;
  background-color: #ffffe0;
  overflow: scroll;
  font-family: "Sawarabi Mincho";
`;

const FormPreviewText = styled.div`
  position: fixed;
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

const FormInputText = styled(InputText)`
  width: 50%;
  background-color: #f4f4f4;
`;

const FormInputTextArea = styled(InputTextArea)`
  width: 50%;
  background-color: #f4f4f4;
`;

const FormPreviewTableRow = styled.tr``;

const CloseButton = styled.span`
  margin-left: 5px;
  font-size: 0.6rem;
  cursor: pointer;
`;
