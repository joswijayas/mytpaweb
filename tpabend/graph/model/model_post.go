package model

import "time"

type Post struct {
	ID          string       `json:"id"`
	Description string       `json:"description"`
	PhotoURL    string       `json:"photoUrl"`
	VideoURL    string       `json:"videoUrl"`
	SenderId    string       `json:"senderId"`
	Sender      *User        `json:"Sender" gorm:"reference:User"`
	Likes       []*User `json:"Likes" gorm:"many2many:like_posts"`
	Comments    []*Comment   `json:"Comments" gorm:"foreignKey:PostID;"`
	ShareCount  int          `json:"shareCount"`
	TimeStamp   time.Time    `json:"timeStamp"`
}

type NewPost struct {
	SenderID string `json:"senderId"`
	Text     string `json:"text"`
	PhotoURL string `json:"photoUrl"`
	VideoURL string `json:"videoUrl"`
}

type LikePosts struct {
	UserId string `json:"userId"`
	PostId string `json:"postId"`
}

type Comment struct {
	ID              string         `json:"id"`
	PostID          string         `json:"postId"`
	CommenterID string         `json:"commenterId"`
	ReplyCommentID  *string         `json:"replyCommentId"`
	Commenter     *User          `json:"Commenter"`
	Replies         []*Comment     `json:"Replies" gorm:"foreignKey:ReplyCommentID"`
	LikesComment           []*LikeComment `json:"LikeComment" gorm:"foreignKey:CommentID"`
	CommentText     string        `json:"commentText"`
	TimeStamp       time.Time      `json:"timeStamp"`
}


type LikeComment struct {
	ID        string `json:"id"`
	CommentID string `json:"commentId"`
	UserID string `json:"userID"`
	User      *User  `json:"User"`
}
