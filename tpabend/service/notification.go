package service

import (
	"context"
	"time"
	"tpabend/bendtpa/database"
	"tpabend/bendtpa/graph/model"

	"github.com/google/uuid"
)

func AddNotification(ctx context.Context, toUserID string, fromUserID string, message string)(*model.Notification, error){
	db := database.GetDB()
	
	modelNotification := &model.Notification{
		ID: uuid.NewString(),
		FromUserID: fromUserID,
		ToUserID: toUserID,
		Message: message,
		CreatedAt: time.Now(),
	}

	return modelNotification, db.Create(modelNotification).Error
}

func FromUser(ctx context.Context, obj *model.Notification)(*model.User, error){
	return GetUser(ctx, obj.FromUserID)
}

func ToUser(ctx context.Context, obj *model.Notification)(*model.User, error){
	return GetUser(ctx, obj.ToUserID)
}

func UserNotification(ctx context.Context, toUserID string)([]*model.Notification, error){
	db := database.GetDB()
	var modelNotifications []*model.Notification

	if err := db.Order("created_at desc").Find(&modelNotifications, "to_user_id = ?", toUserID).Error; err != nil {
		return nil, err
	}

	return modelNotifications, nil
}

