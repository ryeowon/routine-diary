import React, { useEffect, useState } from "react";
import { Calendar } from "react-calendar";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import {
  getDatabase,
  onValue,
  query,
  ref,
  orderByChild,
  equalTo,
} from "firebase/database";

const Wrapper = styled.div`
  width: 100%;
  max-width: 500px;
  margin-left: 2vw;

  @media only screen and (max-width: 768px) {
    max-width: 400px;
    margin: 3vh 0;
  }
`;

const DiaryWrapper = styled.div`
  overflow-y: scroll;
`;

const DiaryContainer = styled.div`
  box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px 0px;
  border-radius: 10px;
  margin-bottom: 2vh;

  @media only screen and (max-width: 768px) {
    margin-bottom: 2vh;
  }
`;

const SelectedDate = styled.div`
  background-color: ${(props) => props.theme.dark1};
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  padding: 7px 20px;
  text-align: center;
  font-weight: 600;
  font-size: large;
  border: 1px solid black;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 6px -1px,
    rgba(0, 0, 0, 0.06) 0px 2px 4px -1px;
  position: relative;
  z-index: 10;
  display: flex;
  justify-content: space-between;
`;

const DiaryContent = styled.div`
  background-color: ${(props) => props.theme.light1};
  min-height: 100px;
  border-left: 1px solid black;
  border-right: 1px solid black;
  border-bottom: none;
  padding: 7px;
  position: relative;
  z-index: 9;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 6px -1px,
    rgba(0, 0, 0, 0.06) 0px 2px 4px -1px;
  border-bottom: 1px solid black;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
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

const FriendName = styled.span`
  //color: white;
  //text-decoration: underline;
  background-color: rgba(255, 255, 255, 0.5);
  border-radius: 10px;
  padding: 2px 7px 2px 7px;
`;

const FriendsDiary = ({ date, userInfo }) => {
  const [dateLabel, setDateLabel] = useState("");
  const [contents, setContents] = useState("");
  const [diaryList, setDiaryList] = useState({});
  const [diaryComponent, setDiaryComponent] = useState(<></>);
  const [IsdiaryExist, setIsDiaryExist] = useState(false);

  useEffect(() => {
    let offset = date.getTimezoneOffset() * 60000;
    let dateOffset = new Date(date.getTime() - offset);
    setDateLabel(dateOffset.toISOString().substring(0, 10));
  }, [date]);

  useEffect(() => {
    if (!userInfo.friends) return;

    let friend_list = Object.keys(userInfo.friends);

    console.log(friend_list);

    const db = getDatabase();
    const idRef = query(ref(db, "/users"), orderByChild("id"));

    let temp_list = {};
    setIsDiaryExist(false);
    //setDiaryList({});

    friend_list.forEach((friend_id, idx) => {
      const userRef = query(idRef, equalTo(friend_id));
      onValue(
        userRef,
        (snapshot) => {
          //console.log("FriendsDiary.js", snapshot.val());
          let diaryInfo = snapshot.val()[friend_id].diary[dateLabel];
          //console.log(friend_id, diaryInfo);
          if (diaryInfo) {
            temp_list[friend_id] = diaryInfo;

            console.log("templist", temp_list);

            if (idx + 1 === Object.entries(userInfo.friends).length) {
              setDiaryList((prev) => temp_list);
            }
          }
        },
        {
          onlyOnce: true,
        }
      );
      //console.log(Object.values(diaryList).length);
    });

    //setDiaryList((prev) => temp_list);
    console.log("diaryList", diaryList);
  }, [userInfo, dateLabel]);

  useEffect(() => {
    //console.log("value", Object.values(diaryList).length);
    //console.log("useEffect", diaryList);
    //console.log("useEffect", Object.entries(diaryList).length);
    if (Object.entries(diaryList).length) {
      setIsDiaryExist(true);
      const component = Object.entries(diaryList).map((diaryInfo) => {
        //console.log("info", diaryInfo);
        return (
          <DiaryContainer>
            <SelectedDate>
              <label>
                <FriendName>{userInfo.friends[diaryInfo[0]]}</FriendName>'s
                Diary
              </label>
              {dateLabel}
            </SelectedDate>
            <DiaryContent>{diaryInfo[1].text}</DiaryContent>
          </DiaryContainer>
        );
      });

      setDiaryComponent(component);
    } else {
    }
  }, [diaryList]);

  //console.log("length", )

  return (
    <Wrapper>
      <Title>Friend's Diaries</Title>

      {IsdiaryExist ? (
        <DiaryWrapper>{diaryComponent}</DiaryWrapper>
      ) : (
        <Message>
          There is no friend's diary. Select other dates or add a new friend.
        </Message>
      )}
    </Wrapper>
  );
};

export default FriendsDiary;
