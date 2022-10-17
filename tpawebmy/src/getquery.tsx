import { gql } from "@apollo/client";

export const GET_USER = gql`
    query GetUser($id: ID!){
        user(id: $id){
            id
        }
    }
`;

export const QUERY_LIKE_COMMENT = gql`
    mutation LikeComment($commentId: ID!, $userId: ID!){
        likeComment(commentId: $commentId, userId: $userId){
            id
            commentId
            User{
            id
            }
        }
}`;

export const QUERY_UNLIKE_COMMENT = gql`
    mutation UnlikeComment($commentId: ID!, $userId: ID!){
  deleteLikeComment(commentId: $commentId, userId: $userId){
    id
    commentId
    User{
      id
    }
  }
}`;


export const QUERY_GET_COMMENT_REPLY = gql`
    query CommentReply($Limit: Int!, $Offset: Int!, $commentId: ID!){
  commentReply(Limit: $Limit, Offset: $Offset, commentId: $commentId){
    postId
    id
    Likes{
      id
      User{
        id
      }
    }
    commentText
    timeStamp
    replyCommentId
    userComment{
      id
      name
      headline
      position
     	profilePicture
    }
    Replies{
      id
			postId
      replyCommentId
      userComment{
        id
        name
        headline
        position
        profilePicture
      }
      Likes{
        id
        commentId
        User{
          id
        }
      }
      commentText
    }
    
  }
}
`;

export const QUERY_REPLY_COMMENT = gql`
    mutation addReply($commentSenderId: ID!, $postId: ID!, $replyCommentId: ID!, $comment: String!) {
  addReply(
    commentSenderId: $commentSenderId
    postId: $postId
    replyCommentId: $replyCommentId
    comment: $comment
  ) {
    id
    postId
    replyCommentId
    userComment {
      id
      email
      name
    }
    Replies {
      id
      postId
    }
    Likes {
      id
      commentId
      User {
        id
        name
      }
    }
    commentText
    timeStamp
  }
}
`;

export const QUERY_GET_NOTIF = gql`
  query userNotification($toUserId:ID!){
  userNotification(toUserId: $toUserId){
    id
    message
    fromUser{
			id
     	name
      profilePicture
    }
    toUser{
      id
      name
      profilePicture
    }
    createdAt
  }
}
`;

export const QUERY_ADD_NOTIF = gql`
  mutation AddNotification($toUserId: ID!, $fromUserId: ID!, $message: String!){
	addNotification(toUserId: $toUserId, fromUserId: $fromUserId, message: $message){
		id
    message
    fromUser{
      id
      name
    }
    toUser{
			id
      name
    }
    createdAt
  }
}
`;

export const QUERY_ADD_ROOM = gql`
  mutation AddRoom($userId1: ID!, $userId2: ID!){
  addRoom(userId1: $userId1, userId2: $userId2){
    id
    user1{
      name
    }
    user2{
      name
    }
    lastMessage{
      text
    }
    messages{
      text
      createdAt
      sender{
				name
      }
    }
  }
}
`;

export const QUERY_ROOM_MESSAGES = gql`
  query Room($roomId: ID!) {
  room(roomId: $roomId) {
    id
    user1 {
      id
      name
      profilePicture
    }
    user2 {
      id
      name
      profilePicture
    }
    messages {
      id
      sender {
        id
        name
        profilePicture
        headline
        position
        about
      }
      text
      createdAt
      imageUrl
    }
  }
}
`;

export const QUERY_GET_ROOM = gql`
  query Rooms($userId:ID!){
	rooms(userId: $userId){
		id
    user1{
      id
      name
      profilePicture
    }
    user2{
			id
      name
      profilePicture
    }
    
  }
}
`;


export const QUERY_SEND_MESSAGES = gql`
  mutation addMessage($senderId: ID!, $text: String!, $imageUrl: String!, $roomId: ID!) {
  addMessage(
    senderId: $senderId
    text: $text
    imageUrl: $imageUrl
    roomId: $roomId
  ) {
    id
  }
}
`;