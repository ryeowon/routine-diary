import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";

const Wrapper = styled.div``;

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

const FriendList = ({ setModal }) => {
  const [friendInfo, setFriendInfo] = useState("null");
  const [friendRequest, setFriendRequest] = useState(true);

  const showModal = () => {
    setModal(true);
  };

  return (
    <Wrapper>
      <Title>
        <span>Friend List</span>
        <AddButton className="material-symbols-outlined" onClick={showModal}>
          group_add
        </AddButton>
      </Title>

      {friendInfo ? (
        <List>
          {friendRequest ? (
            <FriendRequestContainer>
              <SubTitle>Friend Requests</SubTitle>
              <FriendRequest>
                <span className="material-symbols-outlined">person</span>
                Name
                <ConfirmBtn>
                  <span className="material-symbols-outlined">check</span>
                </ConfirmBtn>
                <RemoveBtn>
                  <span className="material-symbols-outlined">close</span>
                </RemoveBtn>
              </FriendRequest>
            </FriendRequestContainer>
          ) : (
            <></>
          )}

          <Friend>
            <span className="material-symbols-outlined">person</span>
            Name
            <RemoveBtn>
              <span className="material-symbols-outlined">close</span>
            </RemoveBtn>
          </Friend>
        </List>
      ) : (
        <List>
          <Message>
            You don't have any friends! Add friends to share routines and
            diaries!
          </Message>
        </List>
      )}
    </Wrapper>
  );
};

export default FriendList;
