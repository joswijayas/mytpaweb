package graph

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

import (
	"context"
	"tpabend/bendtpa/graph/generated"
	"tpabend/bendtpa/graph/model"
	"tpabend/bendtpa/service"
)

// Sender is the resolver for the sender field.
func (r *messageResolver) Sender(ctx context.Context, obj *model.Message) (*model.User, error) {
	return service.GetUser(ctx, obj.SenderID)
}

// SharePost is the resolver for the SharePost field.
func (r *messageResolver) SharePost(ctx context.Context, obj *model.Message) (*model.Post, error) {
	return service.SharePost(ctx, obj)
}

// ShareProfile is the resolver for the ShareProfile field.
func (r *messageResolver) ShareProfile(ctx context.Context, obj *model.Message) (*model.User, error) {
	return service.ShareProfile(ctx, obj)
}

// AddRoom is the resolver for the addRoom field.
func (r *mutationResolver) AddRoom(ctx context.Context, userID1 string, userID2 string) (*model.Room, error) {
	return service.AddRoom(ctx, userID1, userID2)
}

// AddMessage is the resolver for the addMessage field.
func (r *mutationResolver) AddMessage(ctx context.Context, senderID string, text string, imageURL string, roomID string) (*model.Message, error) {
	return service.AddMessage(ctx, senderID, text, imageURL, roomID)
}

// AddMessageSharePost is the resolver for the addMessageSharePost field.
func (r *mutationResolver) AddMessageSharePost(ctx context.Context, senderID string, roomID string, sharePostID string) (*model.Message, error) {
	return service.AddMessageSharePost(ctx, senderID, roomID, sharePostID)
}

// AddMessageShareProfile is the resolver for the addMessageShareProfile field.
func (r *mutationResolver) AddMessageShareProfile(ctx context.Context, senderID string, roomID string, shareProfileID string) (*model.Message, error) {
	return service.AddMessageShareProfile(ctx, senderID, roomID, shareProfileID)
}

// Room is the resolver for the room field.
func (r *queryResolver) Room(ctx context.Context, roomID string) (*model.Room, error) {
	return service.Room(ctx, roomID)
}

// Rooms is the resolver for the rooms field.
func (r *queryResolver) Rooms(ctx context.Context, userID string) ([]*model.Room, error) {
	return service.Rooms(ctx, userID)
}

// User1 is the resolver for the user1 field.
func (r *roomResolver) User1(ctx context.Context, obj *model.Room) (*model.User, error) {
	return service.GetUser(ctx, obj.User1ID)
}

// User2 is the resolver for the user2 field.
func (r *roomResolver) User2(ctx context.Context, obj *model.Room) (*model.User, error) {
	return service.GetUser(ctx, obj.User2ID)
}

// LastMessage is the resolver for the lastMessage field.
func (r *roomResolver) LastMessage(ctx context.Context, obj *model.Room) (*model.Message, error) {
	return service.LastMessage(ctx, obj)
}

// Messages is the resolver for the messages field.
func (r *roomResolver) Messages(ctx context.Context, obj *model.Room) ([]*model.Message, error) {
	return service.Messages(ctx, obj)
}

// Message returns generated.MessageResolver implementation.
func (r *Resolver) Message() generated.MessageResolver { return &messageResolver{r} }

// Room returns generated.RoomResolver implementation.
func (r *Resolver) Room() generated.RoomResolver { return &roomResolver{r} }

type messageResolver struct{ *Resolver }
type roomResolver struct{ *Resolver }
