import React, { useEffect, useState } from "react";
import { Calendar } from "react-calendar";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";

const Wrapper = styled.div`
  width: 100%;
  max-width: 500px;
  margin: 0 0vw;
`;

const DiaryContainer = styled.div`
  box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px 0px;
  border-radius: 10px;
`;

const SelectedDate = styled.div`
  background-color: ${(props) => props.theme.dark1};
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  padding: 7px;
  text-align: center;
  font-weight: 600;
  font-size: large;
  border: 1px solid black;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 6px -1px,
    rgba(0, 0, 0, 0.06) 0px 2px 4px -1px;
  position: relative;
  z-index: 10;
`;

const DiaryContent = styled.div`
  background-color: ${(props) => props.theme.light1};
  min-height: 200px;
  border-left: 1px solid black;
  border-right: 1px solid black;
  border-bottom: none;
  padding: 7px;
  position: relative;
  z-index: 9;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 6px -1px,
    rgba(0, 0, 0, 0.06) 0px 2px 4px -1px;
`;

const AchievementRate = styled.div`
  background-color: ${(props) => props.theme.light1};
  padding: 7px;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  border: 1px solid black;
  font-weight: 600;
`;

const Title = styled.div`
  font-size: x-large;
  font-weight: bold;
  margin-bottom: 10px;
`;

const Message = styled.div`
  margin-top: 20px;
  color: gray;
`;

const FriendsDiary = ({ friendsInfo, date }) => {
  const [dateLabel, setDateLabel] = useState("");
  const [contents, setContents] = useState("");
  const [diaryList, setDiaryList] = useState(null);

  useEffect(() => {
    setDateLabel(date.toISOString().substring(0, 10));
  }, [date]);

  return (
    <Wrapper>
      <Title>Friend's Diaries</Title>
      {diaryList ? (
        <DiaryContainer>
          <SelectedDate>{dateLabel}</SelectedDate>
          <DiaryContent></DiaryContent>
          <AchievementRate>Routine Achievement Rate</AchievementRate>
        </DiaryContainer>
      ) : (
        <Message>
          There is no friend's diary. Select other dates or add a new friend.
        </Message>
      )}
    </Wrapper>
  );
};

export default FriendsDiary;
