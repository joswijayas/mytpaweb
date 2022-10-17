package graph

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

import (
	"context"
	"tpabend/bendtpa/graph/generated"
	"tpabend/bendtpa/graph/model"
	"tpabend/bendtpa/service"
)

// Search is the resolver for the Search field.
func (r *queryResolver) Search(ctx context.Context, keyword string, limit int, offset int, userID string) (*model.Search, error) {
	return service.Search(ctx, keyword, limit, offset, userID)
}

// SearchHastag is the resolver for the SearchHastag field.
func (r *queryResolver) SearchHastag(ctx context.Context, keyword string, limit int, offset int) (*model.Search, error) {
	return service.SearchHastag(ctx, keyword, limit, offset)
}

// SearchPost is the resolver for the SearchPost field.
func (r *queryResolver) SearchPost(ctx context.Context, keyword string, limit int, offset int) (*model.Search, error) {
	return service.SearchPost(ctx, keyword, limit, offset)
}

// SearchUser is the resolver for the SearchUser field.
func (r *queryResolver) SearchUser(ctx context.Context, keyword string, limit int, offset int, userID string) (*model.Search, error) {
	return service.SearchUser(ctx, keyword, limit, offset, userID)
}

// Users is the resolver for the Users field.
func (r *searchResolver) Users(ctx context.Context, obj *model.Search) ([]*model.User, error) {
	return service.GetUserSearch(ctx, obj)
}

// Posts is the resolver for the Posts field.
func (r *searchResolver) Posts(ctx context.Context, obj *model.Search) ([]*model.Post, error) {
	return service.GetPostSearch(ctx, obj)
}

// Search returns generated.SearchResolver implementation.
func (r *Resolver) Search() generated.SearchResolver { return &searchResolver{r} }

type searchResolver struct{ *Resolver }
