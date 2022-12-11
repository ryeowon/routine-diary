import React, { useEffect, useState } from "react";
import { Calendar } from "react-calendar";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";

// I used styled components to make easy to use CSS
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
    box-shadow: ${(props) => props.theme.small_shadow};
  }
  .react-calendar__month-view__days {
    border-radius: 5px;
    background-color: ${(props) => props.theme.light1};
    margin-top: 3px;
    box-shadow: ${(props) => props.theme.small_shadow};
  }
  .react-calendar__tile {
    background-color: transparent;
    border-radius: 10px;

    &:hover {
      background-color: ${(props) => props.theme.dark1};
    }
  }

  .react-calendar__tile--range {
    background-color: ${(props) => props.theme.dark1};
    box-shadow: ${(props) => props.theme.small_shadow};
  }
`;
// End of styled components

// Function to render a calander
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
