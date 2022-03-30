import styled from "styled-components";

export const BottomLayOutWrapper = styled.div`
  position: fixed;
  bottom: 0;
  width: 100%;
  height: 56px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const BottomLayOutItem = styled.div`
  cursor: pointer;
  padding: 6px 12px 8px;
  width: 160px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  font-size: 12px;
  &:hover {
    background: #f5f5f5;
    color: #3f51b5;
  }
`;
