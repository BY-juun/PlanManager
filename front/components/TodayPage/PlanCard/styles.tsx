import styled from "styled-components";

export const PlanCardRoot = styled.div`
  background: #ffffff 0% 0% no-repeat padding-box;
  box-shadow: 0px 1px 7px #333d4b26;
  border: 0.5px solid #c8c8c8;
  width: 44%;
  margin-bottom: 20px;
  padding: 20px;
  width: 100%;
`;

export const PlanContent = styled.div`
  background: #f5f5f5;
  padding: 10px 0;
  font-size: 15px;
`;

export const ExecutionTime = styled.div`
  font-size: 12px;
`;

export const BtnWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  margin-top: 10px;
  gap: 2%;
`;

export const DeleteBtn = styled.button`
  cursor: pointer;
  border: 1px solid #ff7373;
  background: white;
  color: #ff7373;
  border-radius: 4px;
  padding: 10px 15px;
  width: 49%;
`;

export const SubmitBtn = styled.button`
  cursor: pointer;
  border: 1px solid #006cc6;
  background: white;
  color: #006cc6;
  border-radius: 4px;
  padding: 10px 15px;
  width: 49%;
`;
