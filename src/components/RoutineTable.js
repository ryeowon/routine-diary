import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";

// css for components in Routine.js
const Wrapper = styled.div`
  width: 100%;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  padding: 20px 0;
`;

const InputDate = styled.input`
  cursor: pointer;
  font-size: 15px;
`;

const Table = styled.div``;

const Row = styled.div`
  display: grid;
  grid-template-columns: 1fr 6fr 1fr;
`;

const RowNum = styled.div``;
const RoutineName = styled.div``;
const RoutineCheck = styled.div``;
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
      <InputDate type="date" value={date} />
      <Table>
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
