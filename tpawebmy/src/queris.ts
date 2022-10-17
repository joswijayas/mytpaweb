import { gql } from "@apollo/client";

export const QUERY_REGISTER = gql`
    mutation UserRegister($input: NewUser!){
        registerUser(input: $input)
    }`;

export const QUERY_ACTIVATE_USER = gql`
    mutation ActivateUser($id: ID!){
        activateUser(id: $id)
    }`;

export const QUERY_LOGIN = gql`
    mutation UserLogin($email: String!, $password: String!){
        loginUser(email: $email, password: $password)
    }`;

export const QUERY_UPDATE_ABOUT = gql`
    mutation UpdateAbout($id: ID!, $about: String!){
        updateAbout(
            id: $id,
            about: $about
        )
    }`;

export const QUERY_GET_USER = gql`
    query GetUser($id: ID!){
  user(
    id: $id,
  ){
  	 id,
    name,
    email,
    firstName,
    lastName,
    pronoun,
    headline,
    position,
    region,
    about,
    profilePicture,
    backgroundPicture,
    Experiences{
			id,
      userId,
      title,
      employmentType,
      companyName,
      location,
      isActive,
      industry,
      monthStartDate,
      monthEndDate,
      yearStartDate,
      yearEndDate,
      profileHeadline,
      description
    }
  }
}`;

export const QUERY_GET_EXPERIENCE = gql`
   query GetExperiences($id: ID!){
  Experiences(
     id: $id,
  ){
    id,
		title,
    userId,
    employmentType,
    companyName,
    location,
    isActive,
    industry,
    monthStartDate,
    monthEndDate,
    yearStartDate,
    yearEndDate,
    profileHeadline,
    description
  }
}`;

export const QUERY_ADD_EXPERIENCE = gql`
    mutation AddExperience($input: NewExperience!){
	    addExperience(input: $input)
}`

export const QUERY_DELETE_EXPERIENCE = gql`
    mutation DeleteExperience($id: ID!){
    deleteExperience(
        id: $id
    ){
            title
    }
}
`

export const QUERY_UPDATE_EXPERIENCE = gql`
  mutation EditQuery($id: ID! , $input: NewExperience!){
  updateExperience(id: $id, input: $input){
    title,
    profileHeadline
  }
}
`

export const QUERY_GET_EDUCATION = gql`
  query GetEducation($id: ID!){
  Educations(id: $id){
		id,
    userId,
    school,
    degree,
    fieldOfStudy,
    startYear,
    endYear
  }
}`;

export const QUERY_ADD_EDUCATION = gql`
  mutation AddEducation($input: NewEducation!){
  	addEducation(input: $input)
  }`;

export const QUERY_DELETE_EDUCATION = gql`
  mutation DeleteEducation($id: ID!){
  deleteEducation(id: $id){
    id,
    userId,
    school
  }
}`;

export const QUERY_UPDATE_EDUCATION = gql`
  mutation UpdateEducation($id: ID!, $input: NewEducation!){
	updateEducation(id: $id, input: $input){
    userId,
    school
  }
}`;

export const QUERY_UPDATE_PROFILE_IMG = gql`
   mutation UpdateImage($id: ID!, $profilePicture: String!){
  updateImage(id: $id, profilePicture: $profilePicture)
}`;

export const QUERY_UPDATE_BACKGROUND_IMG = gql`
  mutation UpdateBgImage($id: ID!, $backgroundPicture: String!){
	  updateBgImage(id: $id, backgroundPicture: $backgroundPicture)
  }`;

export const QUERY_UPDATE_PROFILE = gql`
  mutation UpdateUser($id: ID!, $input: UpdateUser!){
	  updateUser(id: $id, input: $input)
  }`;

export const QUERY_CONNECT_REQUEST = gql`
  mutation AddConnectionRequest(
  $senderId: ID!, 
  $receiverId: ID!, 
  $message: String!
){
	addConnectionRequest(
 		   senderId: $senderId,
    	 receiverId: $receiverId,
    	 message: $message
  ){
    id,
    sender{
      id,
      name
    },
    receiver{
      id,
      name
    },
    message
  }
}`;

export const QUERY_PENDING_OR_NO = gql`
  query GetUser($id: ID!){
	user(
    id: $id
  ){
		ConnectionRequests{
			id,
      sender{
        id
        email
      	name
        profilePicture
        backgroundPicture
      },
      receiver{
        id
        email
        name
      }
      message
    }
  }
}
`;

export const QUERY_DELETE_CONNECTION_REQUEST = gql`
  mutation DeleteConnectionRequest(
  $senderId: ID!, $receiverId: ID!
){
  deleteConnectionRequest(
    senderId: $senderId,
		receiverId: $receiverId
  ){
    id,
    sender{
      name
    },
    receiver{
      name
    }
  }
}
`;

export const QUERY_ADD_CONNECTION = gql`
  mutation AddConnection($user1ID: ID!, $user2ID: ID!){
  addConnection(
    user1ID: $user1ID,
    user2ID: $user2ID
  ){
    id,
    user1{
    	id,
      name,
      email,
      backgroundPicture,
      profilePicture,
      firstName,
      lastName,
      pronoun,
      headline,
      position,
      region,
      about,
    },
    user2{
      id,
      name,
      email,
      backgroundPicture,
      profilePicture,
      firstName,
      lastName,
      pronoun,
      headline,
      position,
      region,
      about,
    }
  }
}`;

export const QUERY_GET_CONNECTIONS = gql`
  query GetConnection($id: ID!){
  user(id: $id){
    Connections{
      id,
      user1{
        id,
        name,
        email,
        backgroundPicture,
        profilePicture,
        firstName,
        lastName,
        pronoun,
        headline,
        position,
        region,
        about,
      },
      user2{
        id,
        name,
        email,
        backgroundPicture,
        profilePicture,
        firstName,
        lastName,
        pronoun,
        headline,
        position,
        region,
        about,
      }
    }
  }
}`;

export const QUERY_REMOVE_CONNECTION = gql`
  mutation DeleteConnection($id: ID!){
	removeConnection(
    id: $id
  ){
    id
  }
}`;

export const QUERY_GET_JOBS = gql`
  query GetJobs{
  Jobs{
		title
    timeStamp
    id
    companyName
    city
    country
    status
    description
    creator
    timeStamp
  }
}
`;

export const QUERY_CREATE_JOB = gql`
  mutation AddJob($title: String!, $companyName: String!, $city: String!, $country: String!, $status: String!, $description: String!){
  addJob(
    title: $title,
    companyName: $companyName,
    city: $city,
    country: $country,
    status: $status,
    description: $description
  ){
    id
    title
    companyName
    city
    country
    status
    description
    creator
    timeStamp
  }
}
`;

export const QUERY_CREATE_POST = gql`
  mutation CreatePost($input: NewPost!){
  createPost(input: $input){
    id
    description
    photoUrl
    videoUrl
    shareCount
    timeStamp
    Sender{
      email
    }
  }
}
`;

export const QUERY_SEND_EMAIL_RESET_PASSWORD = gql`
  mutation SendLinkReset($email: String!){
    sendLinkResetPassword(email: $email)
}`;

export const QUERY_RESET_PASSWORD = gql`
  mutation ResetPassword($email: String!, $newPassword: String!){
    resetPassword(
      email: $email,
      newPassword: $newPassword
    )
}`;

export const QUERY_GET_RESET_LINK = gql `
  query GetResetLink($id: String!){
    getResetLink(id: $id){
      id
      email
    }
}`;

export const QUERY_GET_POST = gql`
  query GetPosts($Limit: Int!, $Offset: Int!, $UserID: ID!){
  Posts(Limit: $Limit, Offset: $Offset, UserID: $UserID){
    id
    description
    photoUrl
    videoUrl
    Sender{
      id
      name
      firstName
      lastName
      email
      headline
      position
      profilePicture
      backgroundPicture
    }
    Likes{
      userId
      postId
    }
    Comments{
      id
      postId
    }
    shareCount
    timeStamp
  }
}
`;

export const QUERY_FOLLOW = gql`
  mutation FollowUser($id1: ID!, $id2: ID!){
	  FollowUser(id1: $id1, id2: $id2)
  }
`;

export const QUERY_GET_USER_FOLLOW = gql`
  query GetUser($id: ID!){
  user(id: $id){
    Follows{
      userId
      followId
    }
  }
}
`;

export const QUERY_GET_USER_VISITS = gql`
  query GetVisits($id: ID!){
  user(id: $id){
    Visits{
			userId
      visitId
    }
  }
}`;

export const QUERY_UNFOLLOW = gql`
  mutation UnfollowUser($id1: ID!, $id2: ID!){
	  UnFollowUser(id1: $id1, id2: $id2)
  }
`;

export const QUERY_LIKE_POST = gql`
  mutation LikePost($postId:ID!, $userId:ID!){
    likePost(postId: $postId, userId: $userId){
      userId
      postId
    }
}`;

export const QUERY_UNLIKE_POST = gql`
  mutation UnlikePost($postId:ID!, $userId:ID!){
    unlikePost(postId: $postId, userId: $userId){
      userId
      postId
    }
}`;

export const QUERY_GET_VISITS = gql`
  query GetVisit($userId: ID!){
  user(id: $userId){
    Visits{
      userId
      visitId
    }
  }
}
`;

export const QUERY_ADD_VISITS = gql`
  mutation VisitUser($id1: ID!, $id2: ID!){
    VisitUser(id1: $id1, id2: $id2)
}`;


export const QUERY_SEARCH = gql`
  query Search($Keyword: String!, $Limit: Int!, $Offset: Int!, $UserID: ID!){
  Search(Keyword: $Keyword, Limit: $Limit, Offset: $Offset, UserID: $UserID){
    Users{
      id
      name
      email
      password
      firstName
      lastName
      pronoun
      headline
      position
      region
      about
      profilePicture
      backgroundPicture
      Connections{
        id
      }
    }
    Posts{
      id
      description
      photoUrl
      videoUrl
      Sender{
        id
        name
        email
        password
        firstName
        lastName
        pronoun
        headline
        position
        region
        about
        profilePicture
        backgroundPicture
        Connections{
          id
        }
      }
      Likes{
        postId
        postId
      }
      Comments{
        id
        postId
      }
      shareCount
      
    }
  }
}`;

export const QUERY_SEARCH_USER = gql`
  query SearchUser($Keyword: String!, $Limit: Int!, $Offset: Int!, $UserID: ID!){
  SearchUser(Keyword: $Keyword, Limit: $Limit, Offset: $Offset, UserID: $UserID){
    Users{
      id
      name
      email
      password
      firstName
      lastName
      pronoun
      headline
      position
      region
      about
      profilePicture
      backgroundPicture
      Connections{
        id
      }
      
    }
 
  }
}
`;

export const QUERY_SEARCH_POST = gql`
  query SearchPosts($Keyword: String!, $Limit: Int!, $Offset: Int!){
  SearchPost(Keyword: $Keyword, Limit: $Limit, Offset: $Offset){

    Posts{
       id
      description
      photoUrl
      videoUrl
      Sender{
        id
        name
        email
        password
        firstName
        lastName
        lastName
        pronoun
        headline
        position
        profilePicture
      }
      Likes{
        userId
        postId
      }
      Comments{
        id
        postId
      }
      shareCount
      timeStamp
    }
  }
}
`;

export const QUERY_U_MIGHT_KNOW = gql`
  query UserSuggestion($userId: ID!) {
    UserSuggestion(userId: $userId) {
      id
      name
      email
      firstName
      lastName
      pronoun
      headline
      position
      region
      about
      profilePicture
      backgroundPicture
    }   	
}
`;

export const QUERY_GET_HASHTAGS = gql`
  query hashtags {
    Hashtags {
      id
      hashtag
    }
}`;

export const QUERY_ADD_HASHTAG = gql`
  mutation addHashtags($hashtag: String!) {
    addHashtag(hashtag: $hashtag) {
      id
      hashtag
    }
}`;

export const QUERY_SEARCH_HASTAG = gql`
  query SearchHastag($Keyword: String!, $Limit: Int!, $Offset: Int!) {
  SearchHastag(Keyword: $Keyword, Limit: $Limit, Offset: $Offset) {
    Users {
      id
      name
    }
    
    Posts {
      id
      description
      photoUrl
      videoUrl
      Sender{
        id
        name
        email
        firstName
        lastName
        pronoun
        headline
        position
        profilePicture

      }
      Comments{
        id
      }
      Likes{
        userId
        postId
      }
      
      shareCount
      timeStamp
    }
  }
}
`;

export const QUERY_ADD_COMMENT = gql`
  mutation addComment($postId: ID!, $commentSenderId: ID!, $comment: String!) {
  addComment(
    postId: $postId
    commentSenderId: $commentSenderId
    comment: $comment
  ) {
    id
    postId
    userComment {
      id
      name
      email
    }
    Replies {
      id
      replyCommentId
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
}`;

export const QUERY_GET_POST_COMMENTS = gql`
  query PostComments($Limit: Int!, $Offset: Int!, $postId: ID!){
  postComments(Limit: $Limit, Offset: $Offset, postId: $postId){
    id
    postId
    userComment{
      id
      email
      name
      firstName
      lastName
      headline
      position
      profilePicture
    }
    Replies{
      id
      postId
      timeStamp
      commentText
      userComment{
        id
        email
        name
        firstName
        lastName
        headline
        profilePicture
      }
    }
    Likes{
      id
      commentId
      User{
        id
      }
    }
    commentText
    timeStamp
  }
}
`;