package service

import (
	"context"
	"time"
	"tpabend/bendtpa/database"
	"tpabend/bendtpa/graph/model"

	"github.com/google/uuid"
)

func SharePost(ctx context.Context, obj *model.Message)(*model.Post, error){
	db := database.GetDB()
	modelPost := new(model.Post)
	if err := db.Find(&modelPost, "id = ?", obj.SharePostID).Error; err != nil{
		return nil,err
	}
	return modelPost, nil
}

func ShareProfile(ctx context.Context, obj *model.Message) (*model.User, error) {
	db := database.GetDB()
	modelUser := new(model.User)

	if obj.ShareProfileID == nil {
		return modelUser, nil
	}

	if err := db.Find(&modelUser, "id = ?", obj.ShareProfileID).Error; err != nil {
		return nil, err
	}

	return modelUser, nil
}

func  AddRoom(ctx context.Context, userID1 string, userID2 string) (*model.Room, error) {
	db := database.GetDB()
	modelRoom := &model.Room{
		ID:        uuid.NewString(),
		User1ID:   userID1,
		User2ID:   userID2,
		CreatedAt: time.Now(),
	}
	return modelRoom, db.Create(modelRoom).Error
}

func Room( ctx context.Context, roomID string) (*model.Room, error) {
	db := database.GetDB()
	modelRoom := new(model.Room)

	return modelRoom, db.Order("created_at desc").Find(modelRoom, "id = ?", roomID).Error
}

func AddMessageShareProfile(ctx context.Context, senderID string, roomID string, shareProfileID string) (*model.Message, error) {
	modelMessage := &model.Message{
		ID:             uuid.NewString(),
		SenderID:       senderID,
		RoomID:         roomID,
		ShareProfileID: &shareProfileID,
		CreatedAt:      time.Now(),
	}
	db := database.GetDB()

	return modelMessage, db.Create(modelMessage).Error
}

// Rooms is the resolver for the rooms field.
func Rooms(ctx context.Context, userID string) ([]*model.Room, error) {
	var modelRooms []*model.Room

	db := database.GetDB()
	if err := db.Order("created_at desc").Where("user1_id = ?", userID).Or("user2_id = ?", userID).Find(&modelRooms).Error; err != nil {
		return nil, err
	}

	return modelRooms, nil
}

// LastMessage is the resolver for the lastMessage field.
func LastMessage(ctx context.Context, obj *model.Room) (*model.Message, error) {
	modelMessage := new(model.Message)
	db := database.GetDB()
	if err := db.Order("created_at desc").Limit(1).Find(&modelMessage, "room_id = ?", obj.ID).Error; err != nil {
		return nil, err
	}

	

	return modelMessage, nil
}

func Messages( ctx context.Context, obj *model.Room) ([]*model.Message, error) {
	var modelMessages []*model.Message
	db := database.GetDB()
	if err := db.Order("created_at asc").Find(&modelMessages, "room_id = ?", obj.ID).Error; err != nil {
		return nil, err
	}

	return modelMessages, nil
}

func GetSharePost(ctx context.Context, obj *model.Message) (*model.Post, error) {
	modelPost := new(model.Post)
	db := database.GetDB()
	if err := db.Find(&modelPost, "id = ?", obj.SharePostID).Error; err != nil {
		return nil, err
	}

	return modelPost, nil
}
 
func GetShareUser(ctx context.Context, obj *model.Message) (*model.User, error) {
	db:=database.GetDB()
	modelUser := new(model.User)
	if obj.ShareProfileID == nil {
		return modelUser, nil
	}

	if err := db.Find(&modelUser, "id = ?", obj.ShareProfileID).Error; err != nil {
		return nil, err
	}

	return modelUser, nil
}

func AddMessageSharePost(ctx context.Context, senderID string, roomID string, sharePostID string) (*model.Message, error) {
	modelMessage := &model.Message{
		ID:          uuid.NewString(),
		SenderID:    senderID,
		RoomID:      roomID,
		SharePostID: &sharePostID,
		CreatedAt:   time.Now(),
	}
	db:=database.GetDB()

	return modelMessage, db.Create(modelMessage).Error
}

func AddMessage(ctx context.Context, senderID string, text string, imageURL string, roomID string) (*model.Message, error) {
	modelMessage := &model.Message{
		ID:        uuid.NewString(),
		Text:      text,
		ImageURL:  imageURL,
		SenderID:  senderID,
		RoomID:    roomID,
		CreatedAt: time.Now(),
	}
	db:=database.GetDB()
	return modelMessage, db.Create(modelMessage).Error
}