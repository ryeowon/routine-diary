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

// I used styled components to make easy to use CSS
const Wrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.4);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 99;
`;

const Modal = styled.div`
  position: absolute;
  width: 300px;
  height: 300px;
  padding: 20px;
  text-align: center;
  background-color: ${(props) => props.theme.light1};
  border-radius: 10px;
  box-shadow: 0 2px 3px 0 rgba(34, 36, 38, 0.15);
  z-index: 100;
`;

const Title = styled.div`
  font-weight: bold;
  font-size: large;
  margin-bottom: 10px;
`;

const Input = styled.input`
  max-width: 500px;
  min-width: 200px;
  width: 10vw;
  height: 22px;
  margin: 2px 0;
  border-radius: 5px;
  border: 1px solid black;
  padding: 4px 10px;

  &:focus {
    outline: none;
  }

  font-family: "Raleway", "Courier New", monospace;
  font-size: 14px;
`;

const SearchBtn = styled.button`
  height: 30px;
  padding: 4px 10px;
  margin-left: 10px;
  border-radius: 5px;
  border: 1px solid black;
  background-color: ${(props) => props.theme.dark1};
  transition: all 0.4s ease;

  box-shadow: ${(props) => props.theme.btn_shadow};

  &:hover {
    background-color: ${(props) => props.theme.dark2};
    color: white;
  }
  &:active {
    box-shadow: rgba(0, 0, 0, 0.19) 0px 10px 20px 0px,
      rgba(0, 0, 0, 0.23) 0px 6px 6px 0px;
    transform: translateY(2px);
  }
`;

const CloseBtn = styled.div`
  position: absolute;
  top: 5px;
  right: 5px;
  cursor: pointer;
`;

const FriendContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 70%;
`;

const FriendName = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid gray;
  padding: 5px 10px;
  border-radius: 10px;
  background-color: rgba(255, 255, 255, 0.8);
  box-shadow: 0 2px 3px 0 rgba(34, 36, 38, 0.15);
  min-width: 150px;
  margin: 0 20px;
  font-weight: 600;
`;

const Friend = styled.div`
  display: flex;
  margin: 20px;
`;

const RequestBtn = styled.div`
  transition: all 0.4s ease;
  cursor: pointer;
  &:hover {
    color: ${(props) => props.theme.dark2};
  }
  border-radius: 10px;
  background-color: white;
  height: 35px;
  width: 35px;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 1px solid gray;
  box-shadow: ${(props) => props.theme.small_shadow};
  &:active {
    box-shadow: rgba(0, 0, 0, 0.15) 0px 10px 20px 0px,
      rgba(0, 0, 0, 0.1) 0px 6px 6px 0px;
    transform: translateY(2px);
  }
`;
// End of styled components

// Function to render modal for adding friends
const AddFriendModal = ({ setModal, userInfo }) => {
  const [id, setId] = useState("");
  const [friendInfo, setFriendInfo] = useState(null);
  const [isSearched, setIsSearched] = useState(false);
  const [isRequested, setIsRequested] = useState(false);

  // Function to close modal
  const CloseModal = () => {
    setModal(false);
  };

  // Function to enter friend's id
  const onInputChange = (e) => {
    setId(e.target.value);
  };

  // Function to search friend
  const onSearchClick = (e) => {
    // if user enter user's own id, just return
    if (id === userInfo.id) return;

    // query information corresponding to friend id
    const db = getDatabase();
    const idRef = query(ref(db, "/users"), orderByChild("id"));
    const userRef = query(idRef, equalTo(id));

    onValue(
      userRef,
      (snapshot) => {
        console.log("snapshot val", snapshot.val());
        if (snapshot.val()) {
          // set friend information if there is corresponding information
          setFriendInfo(snapshot.val()[id]);
        } else {
          // if there is no information, set friend information to null
          setFriendInfo(null);
        }
      },
      {
        onlyOnce: true,
      }
    );

    setIsSearched(true);
    setIsRequested(false);
  };

  // Function to send friend request
  const onRequestClick = () => {
    const db = getDatabase();

    // save request information to database
    const updates = {};
    updates["/users/" + id + "/friend_requests/" + userInfo.id] =
      userInfo.username;
    console.log(updates);
    update(ref(db), updates);

    setIsRequested(true);
  };

  return (
    // components to render
    <Wrapper>
      <Modal>
        <CloseBtn className="material-symbols-outlined" onClick={CloseModal}>
          close
        </CloseBtn>
        <Title>Add New Friends</Title>
        <Input placeholder="Enter friend's ID" onChange={onInputChange} />
        <SearchBtn onClick={onSearchClick}>Search</SearchBtn>
        <FriendContainer>
          {!isSearched && !friendInfo ? <>Press the search button.</> : <></>}
          {isSearched && !friendInfo ? <>No matching friends.</> : <></>}
          {friendInfo ? (
            <div>
              <Friend>
                <FriendName>
                  <span className="material-symbols-outlined">person</span>
                  {friendInfo.username}
                </FriendName>
                <RequestBtn onClick={onRequestClick}>
                  <span className="material-symbols-outlined">person_add</span>
                </RequestBtn>
              </Friend>
              {isRequested ? <div>Requested successfully.</div> : <></>}
            </div>
          ) : (
            <></>
          )}
        </FriendContainer>
      </Modal>
    </Wrapper>
  );
};

export default AddFriendModal;
