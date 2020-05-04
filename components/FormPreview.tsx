import { INPUT_TYPES, INPUT_ATTRIBUTE } from "../pages/CreateForm";

import styled from "styled-components";

export default ({
  inputAttributes,
}: {
  inputAttributes: INPUT_ATTRIBUTE[];
}) => (
  <form action="">
    <FormPreviewInner>
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
    </FormPreviewInner>
  </form>
);

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
