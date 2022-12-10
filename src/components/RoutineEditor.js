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
  get,
} from "firebase/database";

const Wrapper = styled.div`
  min-width: 300px;
  width: 25vw;
  padding: 20px 0;
  margin-left: 10px;
  //overflow-y: scroll;
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
  position: relative;
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

const ParticipantContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Box = styled.div`
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
  background-color: ${(props) => (props.active ? props.theme.dark1 : null)};

  &:active {
    box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px 0px,
      rgba(0, 0, 0, 0.23) 0px 6px 6px 0px;
    transform: translateY(1px);
  }
`;

const Button = styled.button`
  height: 35px;
  padding: 0 30px;
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

const PersonName = styled.label`
  font-size: small;
`;

const CancelBtn = styled.div`
  position: absolute;
  right: 5px;
  top: 5px;
  cursor: pointer;
`;

const RoutineEditor = ({
  routineNum,
  userInfo,
  setUserInfo,
  routineList,
  setIsEdit,
  date,
}) => {
  const [routineInfo, setRoutineInfo] = useState({
    cycle: {
      mon: false,
      tue: false,
      wed: false,
      thu: false,
      fri: false,
      sat: false,
      sun: false,
    },
    isActive: true,
    name: "",
    participants: {},
  });

  const [cycleComponent, setCycleComponent] = useState(
    <CycleContainer>
      <Box active={routineInfo.cycle.mon} onClick={() => onCycleClick("mon")}>
        Mon
      </Box>
      <Box active={routineInfo.cycle.tue} onClick={() => onCycleClick("tue")}>
        Tue
      </Box>
      <Box active={routineInfo.cycle.wed} onClick={() => onCycleClick("wed")}>
        Wed
      </Box>
      <Box active={routineInfo.cycle.thu} onClick={() => onCycleClick("thu")}>
        Thu
      </Box>
      <Box active={routineInfo.cycle.fri} onClick={() => onCycleClick("fri")}>
        Fri
      </Box>
      <Box active={routineInfo.cycle.sat} onClick={() => onCycleClick("sat")}>
        Sat
      </Box>
      <Box active={routineInfo.cycle.sun} onClick={() => onCycleClick("sun")}>
        Sun
      </Box>
    </CycleContainer>
  );
  const [participantsComponent, setParticipantsComponent] = useState(<></>);

  useEffect(() => {
    console.log("editor", routineList);
    if (routineNum === "new") {
      setRoutineInfo((prev) => {
        let temp_info = {
          cycle: {
            mon: false,
            tue: false,
            wed: false,
            thu: false,
            fri: false,
            sat: false,
            sun: false,
          },
          name: "",
          participants: {},
        };
        temp_info.participants[userInfo.id] = {
          username: userInfo.username,
        };
        return temp_info;
      });
      console.log("new");

      //setRoutineInfo();
    } else {
      console.log("routine list", routineList);
      setRoutineInfo((prev) => routineList[routineNum]);
    }
  }, [routineNum]);

  useEffect(() => {
    if (routineNum === "new") {
    }
  }, [routineNum]);

  useEffect(() => {
    setCycleComponent(
      <CycleContainer>
        <Box active={routineInfo.cycle.mon} onClick={() => onCycleClick("mon")}>
          Mon
        </Box>
        <Box active={routineInfo.cycle.tue} onClick={() => onCycleClick("tue")}>
          Tue
        </Box>
        <Box active={routineInfo.cycle.wed} onClick={() => onCycleClick("wed")}>
          Wed
        </Box>
        <Box active={routineInfo.cycle.thu} onClick={() => onCycleClick("thu")}>
          Thu
        </Box>
        <Box active={routineInfo.cycle.fri} onClick={() => onCycleClick("fri")}>
          Fri
        </Box>
        <Box active={routineInfo.cycle.sat} onClick={() => onCycleClick("sat")}>
          Sat
        </Box>
        <Box active={routineInfo.cycle.sun} onClick={() => onCycleClick("sun")}>
          Sun
        </Box>
      </CycleContainer>
    );

    if (!userInfo.friends) return;
    const component = Object.entries(userInfo.friends).map((friendInfo) => {
      //console.log(friendInfo);
      return (
        <ParticipantContainer onClick={() => onParticipantClick(friendInfo[0])}>
          <Box active={routineInfo.participants[friendInfo[0]]}>
            <span className="material-symbols-outlined">person</span>
          </Box>
          <PersonName>{friendInfo[1]}</PersonName>
        </ParticipantContainer>
      );
    });

    setParticipantsComponent(component);
  }, [routineInfo]);

  const onCycleClick = (day) => {
    // update routine cycle
    let temp_info = routineInfo.cycle;

    temp_info[day] = !temp_info[day];
    setRoutineInfo({
      ...routineInfo,
      cycle: temp_info,
    });
  };

  const onParticipantClick = (friend_id) => {
    // update participants
    let temp_info = routineInfo.participants;

    if (routineNum !== "new" && routineInfo.participants[friend_id]) {
      alert("cannot remove friends.");
    } else if (temp_info[friend_id]) {
      delete temp_info[friend_id];
    } else {
      temp_info[friend_id] = {
        username: userInfo.friends[friend_id],
      };
    }

    //console.log("it's me..", temp_info);

    setRoutineInfo({
      ...routineInfo,
      participants: temp_info,
    });
  };

  const onChange = (e) => {
    setRoutineInfo({ ...routineInfo, name: e.target.value });
  };

  const SaveNewRoutine = () => {
    const db = getDatabase();
    const CountRef = ref(db, "routines/count");
    let count = 0;

    get(CountRef)
      .then((snapshot) => {
        if (snapshot.exists()) {
          count = snapshot.val() + 1;

          const updates = {};
          console.log(userInfo.username);
          //routineInfo.participants[userInfo.id].username = userInfo.username;
          updates["/routines/" + count] = routineInfo;
          updates["/routines/count"] = count;

          console.log("participants", routineInfo.participants);

          Object.keys(routineInfo.participants).forEach((id) => {
            console.log("id", id);
            updates["/users/" + id + "/routines/" + count] = count;
          });

          console.log(updates);

          update(ref(db), updates)
            .then(() => {
              // load user's information again.
              let id = userInfo.id;
              const idRef = query(ref(db, "/users"), orderByChild("id"));
              const userRef = query(idRef, equalTo(id));

              onValue(
                userRef,
                (snapshot) => {
                  console.log("RoutineEditor.js", snapshot.val());
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
          console.log(updates);

          /**/
        } else {
          console.log("No data available");
        }
      })
      .catch((error) => {
        console.error(error);
      });
    //update(ref(db), updates);
  };

  const DeleteRoutine = () => {
    const db = getDatabase();

    let participants = routineInfo.participants;
    delete participants[userInfo.id];

    const updates = {};
    updates["users/" + userInfo.id + "/routines/" + routineNum] = null;
    updates["routines/" + routineNum + "/participants"] = participants;

    console.log(updates);

    update(ref(db), updates)
      .then(() => {
        // load user's information again.
        let id = userInfo.id;
        const idRef = query(ref(db, "/users"), orderByChild("id"));
        const userRef = query(idRef, equalTo(id));

        onValue(
          userRef,
          (snapshot) => {
            console.log("RoutineEditor.js", snapshot.val());
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

    //console.log("delete!");
  };

  const EditRoutine = () => {
    const db = getDatabase();

    const updates = {};
    //console.log(userInfo.username);
    //routineInfo.participants[userInfo.id].username = userInfo.username;

    Object.keys(routineInfo.participants).forEach((id) => {
      console.log("id", id);
      updates["/users/" + id + "/routines/" + routineNum] = routineNum;
    });

    updates["/routines/" + routineNum] = routineInfo;

    console.log(updates);

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
    <>
      <Wrapper>
        {routineNum === "new" ? (
          <Title>Add a New Routine</Title>
        ) : (
          <Title>Edit Routine</Title>
        )}

        <Container>
          <CancelBtn onClick={() => setIsEdit(false)}>
            <span class="material-symbols-outlined">close</span>
          </CancelBtn>
          <InputWrapper>
            <Label>Routine Name</Label>
            <Input
              value={routineInfo.name}
              placeholder="ex. Drinking water in the morning"
              onChange={onChange}
            />
          </InputWrapper>
          <InputWrapper>
            <Label>Routine Cycle</Label>
            {cycleComponent}
          </InputWrapper>
          <InputWrapper>
            <Label>Participants</Label>
            <CycleContainer>
              <ParticipantContainer>
                <Box active={true}>
                  <span className="material-symbols-outlined">person</span>
                </Box>
                <PersonName>Me</PersonName>
              </ParticipantContainer>
              {participantsComponent}
            </CycleContainer>
          </InputWrapper>
          {routineNum === "new" ? (
            <InputWrapper>
              <Button
                onClick={() => {
                  SaveNewRoutine();
                  setIsEdit(false);
                }}
              >
                Save
              </Button>
            </InputWrapper>
          ) : (
            <InputWrapper>
              <Button
                onClick={() => {
                  EditRoutine();
                  setIsEdit(false);
                }}
              >
                Save
              </Button>
              <Button
                onClick={() => {
                  DeleteRoutine();
                  setIsEdit(false);
                }}
              >
                Stop Routine
              </Button>
            </InputWrapper>
          )}
        </Container>
      </Wrapper>
    </>
  );
};

export default RoutineEditor;
