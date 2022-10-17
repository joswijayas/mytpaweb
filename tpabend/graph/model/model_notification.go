package model

import "time"

type Notification struct {
	ID        string    `json:"id"`
	Message   string    `json:"message"`
	FromUser  *User     `json:"fromUser"`
	FromUserID string    `json:"fromUserId"`
	ToUser    *User     `json:"toUser"`
	ToUserID   string    `json:"toUserId"`
	CreatedAt time.Time `json:"createdAt"`
}