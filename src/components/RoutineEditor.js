import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";

const Wrapper = styled.div`
  min-width: 300px;
  width: 25vw;
  padding: 20px 0;
  margin-left: 10px;
`;

const Title = styled.div`
  text-align: center;
  font-size: 1.35em;
  font-weight: 600;
  margin-bottom: 25px;
`;

const Container = styled.div`
  background-color: ${(props) => props.theme.light1};
  width: 100%;
  padding: 10px 10px 1px 10px;
  border-radius: 10px;
  box-shadow: ${(props) => props.theme.small_shadow};
`;

const InputWrapper = styled.div`
  text-align: center;
  padding: 10px 0;
`;
const Input = styled.input`
  width: 90%;
  height: 22px;
  border-radius: 5px;
  border: 1px solid black;
  padding: 4px 10px;

  &:focus {
    outline: none;
  }

  font-family: "Raleway", "Courier New", monospace;
  font-size: 14px;
`;

const Label = styled.div`
  margin-bottom: 2px;
  font-weight: 600;
`;

const CycleContainer = styled.div`
  display: flex;
  justify-content: space-around;
  margin: 6px 0;
`;

const Day = styled.div`
  height: 40px;
  width: 40px;
  display: flex;
  font-size: 0.9em;
  justify-content: center;
  align-items: center;
  background-color: white;
  border-radius: 10px;
  box-shadow: ${(props) => props.theme.small_shadow};
  cursor: pointer;
  transition: all 0.4s ease;

  &:hover {
    background-color: ${(props) => props.theme.dark0};
  }

  &:active {
    background-color: ${(props) => props.theme.dark0};
  }
`;

const Button = styled.button`
  height: 35px;
  width: 30%;
  border-radius: 10px;
  border: 1px solid gray;
  font-size: 1em;
  margin: 10px 10px 10px 10px;
  box-shadow: ${(props) => props.theme.btn_shadow};
  font-weight: 600;

  background-color: ${(props) => props.theme.dark0};
  &:hover {
    background-color: ${(props) => props.theme.dark1};
    color: white;
  }
  &:active {
    box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px 0px,
      rgba(0, 0, 0, 0.23) 0px 6px 6px 0px;
    transform: translateY(3px);
  }
`;

const RoutineEditor = ({ isNew }) => {
  return (
    <>
      {isNew ? (
        <Wrapper>
          <Title>Add a New Routine</Title>
          <Container>
            <InputWrapper>
              <Label>Routine Name</Label>
              <Input placeholder="ex. Drinking water in the morning" />
            </InputWrapper>
            <InputWrapper>
              <Label>Routine Cycle</Label>
              <CycleContainer>
                <Day>Mon</Day>
                <Day>Tue</Day>
                <Day>Wed</Day>
                <Day>Thu</Day>
                <Day>Fri</Day>
                <Day>Sat</Day>
                <Day>Sun</Day>
              </CycleContainer>
            </InputWrapper>
            <InputWrapper>
              <Label>Participants</Label>
              <CycleContainer>
                <Day>Me</Day>
                <Day>
                  <span className="material-symbols-outlined">person_add</span>
                </Day>
              </CycleContainer>
            </InputWrapper>
            <InputWrapper>
              <Button>Save</Button>
              <Button>Cancel</Button>
            </InputWrapper>
          </Container>
        </Wrapper>
      ) : (
        <Wrapper>
          <Title>Edit Routine</Title>
          <Container>
            <InputWrapper>
              <Label>Routine Name</Label>
              <Input />
            </InputWrapper>
            <InputWrapper>
              <Label>Routine Cycle</Label>
              <CycleContainer>
                <Day>Mon</Day>
                <Day>Tue</Day>
                <Day>Wed</Day>
                <Day>Thu</Day>
                <Day>Fri</Day>
                <Day>Sat</Day>
                <Day>Sun</Day>
              </CycleContainer>
            </InputWrapper>
            <InputWrapper>
              <Label>Participants</Label>
              <CycleContainer>
                <Day>Me</Day>
                <Day>
                  <span className="material-symbols-outlined">person_add</span>
                </Day>
              </CycleContainer>
            </InputWrapper>
            <InputWrapper>
              <Button>Save</Button>
              <Button>Cancel</Button>
            </InputWrapper>
          </Container>
        </Wrapper>
      )}
    </>
  );
};

export default RoutineEditor;
