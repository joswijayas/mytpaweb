package service

import (
	"context"
	"tpabend/bendtpa/database"
	"tpabend/bendtpa/graph/model"

	"github.com/google/uuid"
)

func Sender(ctx context.Context, obj *model.ConnectionRequest)(*model.User, error){
	modelUser, err := GetUser(ctx, obj.SenderID)

	if(err != nil){
		return nil, err
	}
	return modelUser, nil
}

func Receiver(ctx context.Context, obj *model.ConnectionRequest)(*model.User, error){
	modelUser, err := GetUser(ctx, obj.ReceiverID)

	if(err != nil){
		return nil, err
	}
	return modelUser, nil
}

func AddConnectionRequest(ctx context.Context, senderID string, receiverID string, message string) (*model.ConnectionRequest, error){
	db := database.GetDB()
	modelConnectionRequest := &model.ConnectionRequest{
		ID: uuid.NewString(),
		SenderID: senderID,
		ReceiverID: receiverID,
		Message: message,
	}

	if err := db.Create(modelConnectionRequest).Error; err != nil{
		return nil, err
	}

	return modelConnectionRequest, nil
}

func DeleteConnectionRequest(ctx context.Context, senderID string, receiverID string) (*model.ConnectionRequest, error){
	db := database.GetDB()
	modelConnectionRequest := new(model.ConnectionRequest)
	if err := db.Find(&modelConnectionRequest, "sender_id = ? AND receiver_id = ?", senderID, receiverID).Error; err != nil{
		return nil, err
	}
	return modelConnectionRequest, db.Delete(modelConnectionRequest).Error
}

func User1(ctx context.Context, obj *model.Connection) (*model.User, error){
	modelUser, err := GetUser(ctx, obj.User1ID)
	if err != nil{
		return nil, err
	}

	return modelUser, nil
}

func User2(ctx context.Context, obj *model.Connection) (*model.User, error){
	modelUser, err := GetUser(ctx, obj.User2ID)
	if err != nil{
		return nil, err
	}

	return modelUser, nil
}

func AddConnection(ctx context.Context, user1id string, user2id string) (*model.Connection, error){
	db := database.GetDB()
	connection := &model.Connection{
		ID: uuid.NewString(),
		User1ID: user1id,
		User2ID: user2id,
	}

	return connection, db.Create(connection).Error
}

func GetConnections(ctx context.Context, obj *model.User)([]*model.Connection, error){
	var modelConnection []*model.Connection
	db := database.GetDB()
	if err := db.Where("user1_id = ?", obj.ID).Or("user2_id = ?", obj.ID).Find(&modelConnection).Error; err != nil{
		return nil, err
	}

	return modelConnection, nil
}

func RemoveConnection(ctx context.Context, id string) (*model.Connection, error){
	db := database.GetDB()
	connection := new(model.Connection)
	if err := db.First(connection, "id = ?", id).Error; err != nil {
		return nil, err
	}
	return connection, db.Delete(connection).Error
}