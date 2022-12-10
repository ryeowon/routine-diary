import React, { useEffect, useState } from "react";
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

const AddRow = styled.div`
  width: 40vw;
  min-width: 400px;
  display: grid;
  grid-template-columns: 6fr 1fr;
  background-color: rgba(255, 255, 255, 0.9);
  padding: 10px;
  border-radius: 10px;
  position: relative;
  padding-left: 48px;
  box-shadow: ${(props) => props.theme.small_shadow};
  border-bottom: 1px solid rgba(34, 36, 38, 0.15);
  cursor: pointer;
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
const RoutineName = styled.div`
  cursor: pointer;
`;
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

const AddBtn = styled.span`
  font-weight: bold;
`;

const FriendCheckMarks = styled.div`
  position: absolute;
  right: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const FriendCheck = styled.div`
  font-size: x-small;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-left: 5px;
`;

const FriendCheckLabel = styled.span`
  height: 10px;
  font-size: small;
  font-weight: bold;
  padding-top: 1px;
`;

const FriendName = styled.div`
  color: gray;
  font-size: 900;
`;
//end of css

const RoutineTable = ({
  userInfo,
  setUserInfo,
  setIsEdit,
  setRoutineNum,
  routineList,
  setRoutineList,
}) => {
  const [date, setDate] = useState(new Date().toISOString().substring(0, 10));
  const [day, setDay] = useState("mon");
  const [isReady, setIsReady] = useState(0);
  const [now, setNow] = useState(new Date());

  const dayLabel = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];

  const [routineComponent, setRoutineComponent] = useState(<></>);

  useEffect(() => {
    // convert to Korean Time
    let offset = now.getTimezoneOffset() * 60000;
    let dateOffset = new Date(now.getTime() - offset);
    setDate(dateOffset.toISOString().substring(0, 10));

    // set Day
    let d = now;
    setDay(dayLabel[d.getDay()]);
  }, [now]);

  const onChange = (e) => {
    // set Date and Day whenever date is selected.
    setDate(e.target.value);
    let d = new Date(e.target.value);
    setDay(dayLabel[d.getDay()]);
  };

  const promise1 = new Promise((resolve, reject) => {
    resolve("Success!");
  });

  useEffect(() => {
    let routine_list = userInfo.routines;
    console.log(userInfo);
    console.log("routine list", routine_list);
    //console.log(routineList);

    const db = getDatabase();

    let temp_list = {};
    if (!routine_list) {
      setRoutineList((prev) => temp_list);
      return;
    }

    Object.values(routine_list).forEach((routine_id, idx) => {
      const routineRef = query(ref(db, "/routines/" + routine_id));
      onValue(
        routineRef,
        (snapshot) => {
          //console.log("FriendsDiary.js", snapshot.val());
          let routineInfo = snapshot.val();
          //console.log(friend_id, diaryInfo);

          temp_list[routine_id] = routineInfo;
          //setDiaryList((prev) => temp_list);
          //console.log("templist", temp_list);

          console.log(
            "templist, routinelist length",
            Object.entries(temp_list).length,
            Object.entries(userInfo.routines).length
          );
          if (
            Object.entries(temp_list).length ===
            Object.entries(userInfo.routines).length
          ) {
            setRoutineList((prev) => temp_list);
          }
        },
        {
          onlyOnce: true,
        }
      );

      //setRoutineList((prev) => temp_list);
      //console.log(Object.values(diaryList).length);
      //console.log(routineList);
    });

    //setRoutineList((prev) => temp_list);
  }, [userInfo]);

  useEffect(() => {
    //console.log("length", Object.entries(routineList).length);
    console.log("routinelist", routineList);

    //if (isReady !== Object.entries(userInfo.routines).length) return;
    console.log("changed");

    let num = 0;
    if (Object.entries(routineList).length) {
      const component = Object.entries(routineList).map((routineInfo, idx) => {
        console.log("info", routineInfo);

        //console.log(day);

        console.log(routineInfo[1].participants);

        if (!routineInfo[1].cycle[day]) return <></>;

        num += 1;

        const friendComponent = Object.entries(routineInfo[1].participants).map(
          (participant_id) => {
            if (participant_id[0] === userInfo.id) return <></>;
            //console.log("a", participant_id[1].performed_dates[date]);

            console.log("a", participant_id[0]);

            let icon = "close";

            if (
              participant_id[1].performed_dates &&
              participant_id[1].performed_dates[date]
            ) {
              icon = "done";
            }

            console.log("a", participant_id[0]);

            return (
              <FriendCheck>
                <FriendCheckLabel className="material-symbols-outlined">
                  person
                </FriendCheckLabel>
                <FriendName>{participant_id[1].username}</FriendName>
                <FriendCheckLabel className="material-symbols-outlined">
                  {icon}
                </FriendCheckLabel>
              </FriendCheck>
            );
          }
        );

        //console.log(friendComponent);

        return (
          <Row>
            <RowNum>{num}</RowNum>
            <RoutineName
              onClick={() => {
                setIsEdit(true);
                setRoutineNum(routineInfo[0]);
              }}
            >
              {routineInfo[1].name}
            </RoutineName>
            <FriendCheckMarks>{friendComponent}</FriendCheckMarks>
            <RoutineCheck onClick={() => CheckRoutine(routineInfo[0])}>
              {routineInfo[1].participants[userInfo.id].performed_dates &&
              routineInfo[1].participants[userInfo.id].performed_dates[date] ? (
                <CheckLabel className="material-symbols-outlined">
                  done
                </CheckLabel>
              ) : (
                <></>
              )}
            </RoutineCheck>
          </Row>
        );
      });

      setRoutineComponent(component);
    } else {
      setRoutineComponent(<div></div>);
    }
  }, [routineList, date, day]);

  const CheckRoutine = (routine_id) => {
    let performed_dates =
      routineList[routine_id].participants[userInfo.id].performed_dates;

    if (!performed_dates) performed_dates = {};
    if (performed_dates[date]) {
      delete performed_dates[date];
    } else {
      performed_dates[date] = true;
    }

    const db = getDatabase();
    const updates = {};

    // update performed date.
    updates[
      "routines/" +
        routine_id +
        "/participants/" +
        userInfo.id +
        "/performed_dates"
    ] = performed_dates;

    update(ref(db), updates)
      .then(() => {
        // load user's information again.
        let id = userInfo.id;
        const idRef = query(ref(db, "/users"), orderByChild("id"));
        const userRef = query(idRef, equalTo(id));

        onValue(
          userRef,
          (snapshot) => {
            console.log("edit", snapshot.val());
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
      })
      .catch((error) => {});
  };

  return (
    <Wrapper>
      <div>
        <InputDate type="date" value={date} onChange={onChange} />
      </div>
      <Table>
        {routineComponent}
        <AddRow
          onClick={() => {
            setIsEdit(true);
            setRoutineNum("new");
          }}
        >
          <RowNum>
            <AddBtn className="material-symbols-outlined">add</AddBtn>
          </RowNum>
          <RoutineName>Add a new routine</RoutineName>
        </AddRow>
      </Table>
    </Wrapper>
  );
};

export default RoutineTable;
