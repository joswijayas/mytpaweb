package graph

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

import (
	"context"
	"tpabend/bendtpa/graph/generated"
	"tpabend/bendtpa/graph/model"
	"tpabend/bendtpa/service"
)

// User1 is the resolver for the user1 field.
func (r *connectionResolver) User1(ctx context.Context, obj *model.Connection) (*model.User, error) {
	return service.User1(ctx, obj)
}

// User2 is the resolver for the user2 field.
func (r *connectionResolver) User2(ctx context.Context, obj *model.Connection) (*model.User, error) {
	return service.User2(ctx, obj)
}

// AddConnection is the resolver for the addConnection field.
func (r *mutationResolver) AddConnection(ctx context.Context, user1id string, user2id string) (*model.Connection, error) {
	return service.AddConnection(ctx, user1id, user2id)
}

// RemoveConnection is the resolver for the removeConnection field.
func (r *mutationResolver) RemoveConnection(ctx context.Context, id string) (*model.Connection, error) {
	return service.RemoveConnection(ctx, id)
}

// Connection returns generated.ConnectionResolver implementation.
func (r *Resolver) Connection() generated.ConnectionResolver { return &connectionResolver{r} }

type connectionResolver struct{ *Resolver }
