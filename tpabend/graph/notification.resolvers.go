package graph

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

import (
	"context"
	"tpabend/bendtpa/graph/generated"
	"tpabend/bendtpa/graph/model"
	"tpabend/bendtpa/service"
)

// AddNotification is the resolver for the addNotification field.
func (r *mutationResolver) AddNotification(ctx context.Context, toUserID string, fromUserID string, message string) (*model.Notification, error) {
	return service.AddNotification(ctx, toUserID, fromUserID, message)
}

// FromUser is the resolver for the fromUser field.
func (r *notificationResolver) FromUser(ctx context.Context, obj *model.Notification) (*model.User, error) {
	return service.FromUser(ctx, obj)
	// panic('d')
}

// ToUser is the resolver for the toUser field.
func (r *notificationResolver) ToUser(ctx context.Context, obj *model.Notification) (*model.User, error) {
	return service.ToUser(ctx, obj)
	// panic('d')
}

// UserNotification is the resolver for the userNotification field.
func (r *queryResolver) UserNotification(ctx context.Context, toUserID string) ([]*model.Notification, error) {
	return service.UserNotification(ctx, toUserID)
	// panic('d')
}

// Notification returns generated.NotificationResolver implementation.
func (r *Resolver) Notification() generated.NotificationResolver { return &notificationResolver{r} }

type notificationResolver struct{ *Resolver }
