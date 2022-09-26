package graph

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

import (
	"context"
	"tpabend/bendtpa/graph/generated"
	"tpabend/bendtpa/graph/model"
	"tpabend/bendtpa/service"
)

// CreatePost is the resolver for the createPost field.
func (r *mutationResolver) CreatePost(ctx context.Context, input model.NewPost) (*model.Post, error) {
	return service.CreatePost(ctx, input)
}

// LikePost is the resolver for the likePost field.
func (r *mutationResolver) LikePost(ctx context.Context, postID string, userID string) (*model.LikePosts, error) {
	return service.LikePost(ctx, postID, userID)
}

// UnlikePost is the resolver for the unlikePost field.
func (r *mutationResolver) UnlikePost(ctx context.Context, postID string, userID string) (*model.LikePosts, error) {
	return service.UnlikePost(ctx, postID, userID)
}

// Sender is the resolver for the Sender field.
func (r *postResolver) Sender(ctx context.Context, obj *model.Post) (*model.User, error) {
	return service.GetUser(ctx, obj.SenderId)
}

// Likes is the resolver for the Likes field.
func (r *postResolver) Likes(ctx context.Context, obj *model.Post) ([]*model.LikePosts, error) {
	return service.GetLikes(ctx, obj)
}

// Comments is the resolver for the Comments field.
func (r *postResolver) Comments(ctx context.Context, obj *model.Post) ([]*model.Comment, error) {
	return service.GetComments(ctx, obj)
}

// ShareCount is the resolver for the shareCount field.
func (r *postResolver) ShareCount(ctx context.Context, obj *model.Post) (int, error) {
	return 0, nil
}

// Posts is the resolver for the Posts field.
func (r *queryResolver) Posts(ctx context.Context, limit int, offset int, userID string) ([]*model.Post, error) {
	return service.GetPosts(ctx, limit, offset, userID)
}

// Post returns generated.PostResolver implementation.
func (r *Resolver) Post() generated.PostResolver { return &postResolver{r} }

type postResolver struct{ *Resolver }

// !!! WARNING !!!
// The code below was going to be deleted when updating resolvers. It has been copied here so you have
// one last chance to move it out of harms way if you want. There are two reasons this happens:
//  - When renaming or deleting a resolver the old code will be put in here. You can safely delete
//    it when you're done.
//  - You have helper methods in this file. Move them out to keep these resolver files clean.
func (r *postResolver) Author(ctx context.Context, obj *model.Post) (*model.User, error) {
	return service.GetUser(ctx, obj.SenderId)
}
