package graph

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

import (
	"context"
	"tpabend/bendtpa/graph/model"
	"tpabend/bendtpa/service"
)

// AddBlock is the resolver for the addBlock field.
func (r *mutationResolver) AddBlock(ctx context.Context, userID string, blockID string) (*model.Block, error) {
	return service.AddBlock(ctx, userID, blockID)
}

// DeleteBlock is the resolver for the deleteBlock field.
func (r *mutationResolver) DeleteBlock(ctx context.Context, userID string, blockID string) (*model.Block, error) {
	return service.DeleteBlock(ctx, userID, blockID)
}

// Blocks is the resolver for the blocks field.
func (r *queryResolver) Blocks(ctx context.Context, userID string) ([]*model.Block, error) {
	return service.GetBlockss(ctx, userID)
}
