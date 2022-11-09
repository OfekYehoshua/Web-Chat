// import { m } from "framer-motion";

export const GetSender = (loggedUser, users) => {
    return users[0]._id === loggedUser.data._id ? users[1].nickName : users[0].nickName;
  };

export const GetSenderFull = (loggedUser, users)=>{
  return users[0]._id === loggedUser.data._id? users[1] : users[0]
}

export const isSameSender = (messages, m, i, userId) => {
  return (
    i < messages.length - 1 &&
    (messages[i + 1].sender?._id !== m.sender?._id ||
      messages[i + 1].sender?._id === undefined) &&
    messages[i].sender?._id !== userId
  );
};

//messages = all the messages
//m =corrent message
//i = number of message
export const isSameSenderMargin = (messages, m, i, userId) => {
  if (
i<messages.length - 1 &&
messages[i+1].sender?._id === m.sender?._id &&
messages[i].sender?._id !==userId
  )
  return 33;
  else if(
(i<messages.length - 1 && messages[i+1].sender._id !==userId)||
(i === messages.length - 1 && messages[i].sender._id !== userId)
  )
  return 0;
  else return "auto";
};
export const isLastMessage = (messages, i, userId) => {
  return (
    i === messages.length - 1 &&
    messages[messages.length - 1].sender._id !== userId &&
    messages[messages.length - 1].sender._id
  );
};

export const isSameUser = (messages, m , i ) =>{
  return i> 0 && messages[i-1].sender._id === m.sender._id
}