import {
  getDatabase,
  onValue,
  query,
  ref,
  orderByChild,
  equalTo,
  set,
  update,
} from "firebase/database";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";

// I used styled components to make easy to use CSS
const Wrapper = styled.div`
  margin-left: 2vw;
`;

const Title = styled.div`
  font-size: x-large;
  font-weight: bold;
  margin-bottom: 10px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const List = styled.div`
  min-width: 230px;
  width: 14vw;
  background-color: ${(props) => props.theme.light1};
  border: 1px solid black;
  border-radius: 10px;
  min-height: 300px;
  box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px 0px;
  padding: 10px;
`;

const Message = styled.div`
  color: gray;
  text-align: center;
  line-height: 25px;
`;

const AddButton = styled.span`
  transition: all 0.4s ease;
  cursor: pointer;
  &:hover {
    color: ${(props) => props.theme.dark2};
  }
`;

const Friend = styled.div`
  display: flex;
  align-items: center;
  padding: 7px 5px;
  background-color: white;
  border: 1px solid gray;
  border-radius: 5px;
  position: relative;
  margin-bottom: 5px;
  box-shadow: ${(props) => props.theme.small_shadow};
`;

const FriendRequest = styled.div`
  display: flex;
  align-items: center;
  padding: 7px 5px;
  background-color: ${(props) => props.theme.dark0};
  border: 1px solid gray;
  border-radius: 5px;
  position: relative;
  margin-bottom: 5px;
  box-shadow: ${(props) => props.theme.small_shadow};
`;

const RemoveBtn = styled.div`
  position: absolute;
  right: 5px;
  font-size: 6px;
  cursor: pointer;
  transition: all 0.4s ease;
  cursor: pointer;
  &:hover {
    color: ${(props) => props.theme.dark2};
  }
`;

const ConfirmBtn = styled.div`
  position: absolute;
  right: 32px;
  font-size: 6px;
  cursor: pointer;
  transition: all 0.4s ease;
  cursor: pointer;
  &:hover {
    color: ${(props) => props.theme.dark2};
  }
`;

const FriendRequestContainer = styled.div`
  margin-bottom: 20px;
`;

const SubTitle = styled.div`
  font-size: 1.1em;
  font-weight: 600;
  margin-bottom: 3px;
`;
// End of styled components

const FriendList = ({ setModal, userInfo, setUserInfo }) => {
  const [friendInfo, setFriendInfo] = useState(false);
  const [friendRequest, setFriendRequest] = useState(false);

  const [RequestComponent, setRequestComponent] = useState(<></>);
  const [friendComponent, setFriendComponent] = useState(<></>);

  // Function to show modal
  const showModal = () => {
    setModal(true);
  };

  // Function to confirm friend's request
  const onConfirm = (friend_id, friend_name) => {
    const db = getDatabase();

    // delete the friend request.
    set(
      ref(db, "users/" + userInfo.id + "/friend_requests/" + friend_id),
      null
    );

    // update the friend list
    const updates = {};
    updates["/users/" + userInfo.id + "/friends/" + friend_id] = friend_name;
    updates["/users/" + friend_id + "/friends/" + userInfo.id] =
      userInfo.username;
    update(ref(db), updates);

    // load user information again.
    const idRef = query(ref(db, "/users"), orderByChild("id"));
    let id = userInfo.id;
    const userRef = query(idRef, equalTo(id));
    onValue(
      userRef,
      (snapshot) => {
        console.log("Friend.js", snapshot.val());
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

  // Function to reject friend's request
  const onReject = (friend_id) => {
    const db = getDatabase();

    // delete the friend request.
    set(
      ref(db, "users/" + userInfo.id + "/friend_requests/" + friend_id),
      null
    );

    // load user information again.
    const idRef = query(ref(db, "/users"), orderByChild("id"));
    let id = userInfo.id;
    const userRef = query(idRef, equalTo(id));
    onValue(
      userRef,
      (snapshot) => {
        console.log("Friend.js", snapshot.val());
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

  // Function to remove friend
  const onRemove = (friend_id) => {
    const db = getDatabase();

    // delete the friend.
    set(ref(db, "users/" + userInfo.id + "/friends/" + friend_id), null);
    set(ref(db, "users/" + friend_id + "/friends/" + userInfo.id), null);

    // load user information again.
    const idRef = query(ref(db, "/users"), orderByChild("id"));
    let id = userInfo.id;
    const userRef = query(idRef, equalTo(id));
    onValue(
      userRef,
      (snapshot) => {
        console.log("Friend.js", snapshot.val());
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

  useEffect(() => {
    // whenever user information is updated, render friend requests and friend list.
    let friend_requests = userInfo.friend_requests;

    // if there are friend_requests, render friend_requests
    if (friend_requests) {
      setFriendRequest(true);
      const component = Object.entries(friend_requests).map(
        (friend_info, idx) => {
          return (
            <FriendRequest>
              <span className="material-symbols-outlined">person</span>
              {friend_info[1]}
              <ConfirmBtn
                onClick={() => onConfirm(friend_info[0], friend_info[1])}
              >
                <span className="material-symbols-outlined">check</span>
              </ConfirmBtn>
              <RemoveBtn onClick={() => onReject(friend_info[0])}>
                <span className="material-symbols-outlined">close</span>
              </RemoveBtn>
            </FriendRequest>
          );
        }
      );
      setRequestComponent(component);
    } else {
      setFriendRequest(false);
    }

    let friend_list = userInfo.friends;

    // if there are friends, render friend list
    if (friend_list) {
      setFriendInfo(true);

      const component = Object.entries(friend_list).map((friend_info, idx) => {
        return (
          <Friend key={"f" + idx}>
            <span className="material-symbols-outlined">person</span>
            {friend_info[1]}
            <RemoveBtn onClick={() => onRemove(friend_info[0])}>
              <span className="material-symbols-outlined">close</span>
            </RemoveBtn>
          </Friend>
        );
      });

      setFriendComponent(component);
    }
  }, [userInfo]);

  return (
    <Wrapper>
      <Title>
        <span>Friend List</span>
        <AddButton className="material-symbols-outlined" onClick={showModal}>
          group_add
        </AddButton>
      </Title>

      <List>
        {friendRequest ? (
          <FriendRequestContainer>
            <SubTitle>Friend Requests</SubTitle>
            {RequestComponent}
          </FriendRequestContainer>
        ) : (
          <></>
        )}

        {friendInfo ? (
          <>{friendComponent}</>
        ) : (
          <Message>
            You don't have any friends! Add friends to share routines and
            diaries!
          </Message>
        )}
      </List>
    </Wrapper>
  );
};

export default FriendList;
