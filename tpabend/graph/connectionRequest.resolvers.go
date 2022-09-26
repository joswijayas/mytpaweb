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
func (r *connectionRequestResolver) Sender(ctx context.Context, obj *model.ConnectionRequest) (*model.User, error) {
	return service.Sender(ctx, obj)
}

// Receiver is the resolver for the receiver field.
func (r *connectionRequestResolver) Receiver(ctx context.Context, obj *model.ConnectionRequest) (*model.User, error) {
	return service.Receiver(ctx, obj)
}

// AddConnectionRequest is the resolver for the addConnectionRequest field.
func (r *mutationResolver) AddConnectionRequest(ctx context.Context, senderID string, receiverID string, message string) (*model.ConnectionRequest, error) {
	return service.AddConnectionRequest(ctx, senderID, receiverID, message)
}

// DeleteConnectionRequest is the resolver for the deleteConnectionRequest field.
func (r *mutationResolver) DeleteConnectionRequest(ctx context.Context, senderID string, receiverID string) (*model.ConnectionRequest, error) {
	return service.DeleteConnectionRequest(ctx, senderID, receiverID)
}

// ConnectionRequest returns generated.ConnectionRequestResolver implementation.
func (r *Resolver) ConnectionRequest() generated.ConnectionRequestResolver {
	return &connectionRequestResolver{r}
}

type connectionRequestResolver struct{ *Resolver }
