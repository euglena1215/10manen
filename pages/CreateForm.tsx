import Layout from "../components/Layout";
import styled from "styled-components";
import Link from "next/link";

const CreateForm = () => (
  <Layout>
    フォーム作成
    <div>
      <button type="button" name="name">
        名前
      </button>
      <button type="button" name="address">
        住所
      </button>
      <button type="button" name="why">
        志望動機
      </button>
      <button type="button" name="accountNumber">
        口座番号
      </button>
      <button type="button" name="confirm">
        本人確認種類
      </button>
      <button type="button" name="reallyNeed">
        本当に必要ですか？
      </button>
    </div>
    <Form action="">
      <div>
        名前：
        <input type="text" name="name" />
      </div>
      <div>
        住所：
        <input type="text" name="address" />
      </div>
      <div>
        志望動機：
        <textarea name="why" />
      </div>
      <div>
        口座番号：
        <input type="text" name="accountNumber" />
      </div>
      <div>
        本人確認種類：
        <input type="file" name="confirm" />
      </div>
      <div>
        本当に必要ですか？：
        <input type="checkbox" name="reallyNeed" />
      </div>
    </Form>
    <Link href="/Result">
      <a>フォーム完成！</a>
    </Link>
  </Layout>
);
export default CreateForm;

const Form = styled.form`
  border: 1px solid #000;
`;
