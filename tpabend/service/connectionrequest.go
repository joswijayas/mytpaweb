package service

import (
	"context"
	"tpabend/bendtpa/database"
	"tpabend/bendtpa/graph/model"
)

func GetConnectionRequest(ctx context.Context, obj *model.User) ([]*model.ConnectionRequest, error){
	var modelConnectionRequest []*model.ConnectionRequest
	print(modelConnectionRequest)
	db := database.GetDB()
	if err := db.Find(&modelConnectionRequest, "receiver_id = ?", obj.ID).Error; err != nil{
		return nil, err
	}

	return modelConnectionRequest, nil
}