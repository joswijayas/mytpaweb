package model

import "time"

type Message struct {
	ID           string    `json:"id"`
	Sender       *User     `json:"sender"`
	SharePost    *Post     `json:"SharePost"`
	ShareProfile *User     `json:"ShareProfile"`
	Text         string    `json:"text"`
	ImageURL     string    `json:"imageUrl"`
	Room           *Room      `json:"Room"`
	CreatedAt    time.Time `json:"createdAt"`
	RoomID string
	SenderID string
	ShareProfileID *string
	SharePostID *string
}

type Room struct {
	ID          string     `json:"id"`
	User1       *User      `json:"user1"`
	User2       *User      `json:"user2"`
	User1ID string
	User2ID string
	Messages    []*Message `json:"messages"`
	CreatedAt   time.Time  `json:"createdAt"`
}