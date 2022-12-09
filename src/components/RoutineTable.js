import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";

// css for components in Routine.js
const Wrapper = styled.div`
  //justify-content: center;
  padding: 20px 0;
`;

const InputDate = styled.input`
  cursor: pointer;
  font-size: 15px;
  display: block;
  height: 30px;
  padding: 0 10px;
  box-shadow: ${(props) => props.theme.small_shadow};
  border: 1px solid rgba(34, 36, 38, 0.15);
  border-radius: 10px;
`;

const Table = styled.div`
  margin-top: 20px;
`;

const Row = styled.div`
  width: 40vw;
  min-width: 400px;
  display: grid;
  grid-template-columns: 6fr 1fr;
  background-color: ${(props) => props.theme.light1};
  padding: 10px;
  border-radius: 10px;
  position: relative;
  padding-left: 48px;
  box-shadow: ${(props) => props.theme.small_shadow};
  border-bottom: 1px solid rgba(34, 36, 38, 0.15);
`;

const RowNum = styled.div`
  border-radius: 10px;
  background-color: ${(props) => props.theme.dark1};
  color: white;
  font-weight: bold;
  position: absolute;
  height: 100%;
  width: 40px;
  left: 0;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const RoutineName = styled.div``;
const RoutineCheck = styled.div`
  //background-color: ${(props) => props.theme.dark0};
  border-left: 2px solid rgba(34, 36, 38, 0.15);
  font-weight: bold;
  position: absolute;
  height: 100%;
  width: 40px;
  right: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
`;

const CheckLabel = styled.span`
  font-weight: bold;
`;
//end of css

const RoutineTable = () => {
  const [date, setDate] = useState(new Date().toISOString().substring(0, 10));
  const [routineInfo, setRoutineInfo] = useState([
    {
      name: "",
      cycle: {
        mon: false,
        tue: false,
        wed: false,
        thu: false,
        fri: false,
        sat: false,
        sun: false,
      },
      participants: [{ id: 1, performed_dates: ["2022-12-09"] }],
      isActive: true,
    },
  ]);
  return (
    <Wrapper>
      <div>
        <InputDate type="date" value={date} />
      </div>
      <Table>
        <Row>
          <RowNum>1</RowNum>
          <RoutineName>Drink water in the morning</RoutineName>
          <RoutineCheck>
            <CheckLabel className="material-symbols-outlined">done</CheckLabel>
          </RoutineCheck>
        </Row>
        <Row>
          <RowNum>1</RowNum>
          <RoutineName>Drink water in the morning</RoutineName>
          <RoutineCheck></RoutineCheck>
        </Row>
      </Table>
    </Wrapper>
  );
};

export default RoutineTable;
