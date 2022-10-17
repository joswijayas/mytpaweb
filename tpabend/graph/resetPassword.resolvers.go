package graph

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

import (
	"context"
	"tpabend/bendtpa/graph/model"
	"tpabend/bendtpa/service"
)

// SendLinkResetPassword is the resolver for the sendLinkResetPassword field.
func (r *mutationResolver) SendLinkResetPassword(ctx context.Context, email string) (string, error) {
	return service.SendLinkResetPassword(ctx, email)
}

// GetResetLink is the resolver for the getResetLink field.
func (r *queryResolver) GetResetLink(ctx context.Context, id string) (*model.LinkResetPassword, error) {
	return service.GetResetLink(ctx, id)
}
