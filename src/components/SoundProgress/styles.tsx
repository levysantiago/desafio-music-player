import styled from "styled-components";

export interface IInsideBarProps {
  width: string;
}

export const BaseBar = styled.div`
  width: 100%;
  height: 6px;
  border-radius: 100px;
  background-color: #5f586f;
  display: flex;
  align-items: center;
  margin-bottom: 10px;
  cursor: pointer;
`;

export const InsideBar = styled.div`
  height: 100%;
  border-radius: 100px;
  background-color: #c1bfc4;
`;

export const CountersContainer = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const Counter = styled.span`
  font-family: "Roboto-Regular";
  size: 14px;
  color: #c4c4cc;
`;
