import React, { useEffect, useState } from "react";
import { Calendar } from "react-calendar";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";

const CalendarContainer = styled.div`
  .react-calendar {
    width: 300px;
    text-align: center;
  }
  button {
    border: none;
    padding: 7px 0;
    cursor: pointer;
  }
  .react-calendar__navigation__arrow {
    padding: 10px;
    background-color: transparent;
    font-size: 18px;
  }
  .react-calendar__navigation__label {
    background-color: ${(props) => props.theme.light1};
    border-radius: 5px;
    padding: 5px 7px;
  }
  .react-calendar__month-view__days {
    border-radius: 5px;
    background-color: ${(props) => props.theme.light1};
    margin-top: 3px;
  }
  .react-calendar__tile {
    background-color: transparent;
    border-radius: 10px;
  }

  .react-calendar__tile--range {
    background-color: ${(props) => props.theme.dark1};
  }
`;

const MyCalander = ({ date, setDate }) => {
  return (
    <CalendarContainer>
      <Calendar
        onChange={setDate}
        value={date}
        locale="en-EN"
        next2Label={null}
        prev2Label={null}
        showNeighboringMonth={false}
      />
    </CalendarContainer>
  );
};

export default MyCalander;