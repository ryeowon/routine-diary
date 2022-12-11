import React, { useEffect, useState } from "react";
import { Calendar } from "react-calendar";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import {
  getDatabase,
  ref,
  set,
  onValue,
  query,
  equalTo,
  orderByChild,
  push,
  child,
  update,
} from "firebase/database";

const Wrapper = styled.div`
  //width: 30vw;
  margin-left: 100px;
  //min-width: 700px;

  @media only screen and (max-width: 768px) {
    margin: 30px 0;
  }
`;

const DiaryContainer = styled.div`
  box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px 0px;
  border-radius: 10px;

  width: 50vw;

  @media only screen and (max-width: 768px) {
    width: 70vw;
  }
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
  border-bottom: 1px solid black;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  padding: 7px;
  position: relative;
  z-index: 9;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 6px -1px,
    rgba(0, 0, 0, 0.06) 0px 2px 4px -1px;
`;

const TextArea = styled.textarea`
  background-color: transparent;
  width: 100%;
  min-height: 200px;
  border: none;
  resize: none;
  &:focus {
    outline: none;
  }
`;

const AchievementRate = styled.div`
  background-color: ${(props) => props.theme.light1};
  padding: 7px;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
  border: 1px solid black;
  font-weight: 600;
`;

const SaveBtn = styled.button`
  margin: 20px auto;
  display: block;
  padding: 0 20px;
  height: 37px;
  border-radius: 5px;
  border: none;
  background-color: ${(props) => props.theme.dark1};
  cursor: pointer;
  font-size: 16px;
  font-weight: 600;
  box-shadow: rgba(0, 0, 0, 0.16) 0px 3px 6px 0px,
    rgba(0, 0, 0, 0.23) 0px 3px 6px 0px;

  &:hover {
    background-color: ${(props) => props.theme.dark2};
    color: white;
  }
  &:active {
    box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px 0px,
      rgba(0, 0, 0, 0.23) 0px 6px 6px 0px;
    transform: translateY(3px);
  }
`;

const Diary = ({ date, userInfo, setUserInfo }) => {
  const [dateLabel, setDateLabel] = useState("");
  const [contents, setContents] = useState("");
  const [diaryInfo, setDiaryInfo] = useState("");
  const [diaryComponent, setDiaryComponent] = useState(<></>);
  const [diaryContent, setDiaryContent] = useState();

  useEffect(() => {
    let offset = date.getTimezoneOffset() * 60000;
    let dateOffset = new Date(date.getTime() - offset);
    setDateLabel(dateOffset.toISOString().substring(0, 10));
  }, [date]);

  useEffect(() => {
    if (userInfo.diary) {
      setDiaryInfo(userInfo.diary[dateLabel]);
      //console.log(dateLabel);
      //console.log(userInfo.diary[dateLabel]);
    }
  }, [userInfo, dateLabel]);

  const SaveDiary = () => {
    const db = getDatabase();

    // save diary to database
    const updates = {};
    updates["/users/" + userInfo.id + "/diary/" + dateLabel + "/text"] =
      diaryContent;
    update(ref(db), updates);

    // load user's information again.
    const idRef = query(ref(db, "/users"), orderByChild("id"));
    let id = userInfo.id;
    const userRef = query(idRef, equalTo(id));

    onValue(
      userRef,
      (snapshot) => {
        console.log("Diary.js", snapshot.val());
        if (snapshot.val()) {
          setUserInfo(snapshot.val()[id]);
        } else {
          setUserInfo(null);
        }
      },
      {
        onlyOnce: true,
      }
    );
  };

  const onChange = (e) => {
    setDiaryContent(e.target.value);
  };

  return (
    <Wrapper>
      <DiaryContainer>
        <SelectedDate>{dateLabel}</SelectedDate>
        <DiaryContent>
          {diaryInfo ? (
            <>{diaryInfo.text}</>
          ) : (
            <TextArea onChange={onChange} placeholder="Write today's diary!" />
          )}
        </DiaryContent>
      </DiaryContainer>
      {diaryInfo ? (
        <></>
      ) : (
        <SaveBtn onClick={SaveDiary}>Save Today's Diary</SaveBtn>
      )}
    </Wrapper>
  );
};

export default Diary;
