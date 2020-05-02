import styled from "styled-components";

const Layout = ({ children }) => (
  <Wrapper>
    <Inner>{children}</Inner>
  </Wrapper>
);
export default Layout;

const A = styled.h1`
  color: #eee;
`;

const Wrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Inner = styled.div`
  width: 750px;
`;
