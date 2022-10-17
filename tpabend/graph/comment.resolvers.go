package graph

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

import (
	"context"
	"tpabend/bendtpa/graph/generated"
	"tpabend/bendtpa/graph/model"
	"tpabend/bendtpa/service"
)

// CommentSenderID is the resolver for the commentSenderId field.
func (r *commentResolver) CommentSenderID(ctx context.Context, obj *model.Comment) (string, error) {
	// return service.GetUser(ctx, obj.CommenterID)
	panic('s')
}

// UserComment is the resolver for the userComment field.
func (r *commentResolver) UserComment(ctx context.Context, obj *model.Comment) (*model.User, error) {
	return service.GetUser(ctx, obj.CommenterID)
}

// Replies is the resolver for the Replies field.
func (r *commentResolver) Replies(ctx context.Context, obj *model.Comment) ([]*model.Comment, error) {
	return service.Replies(ctx, obj)
}

// Likes is the resolver for the Likes field.
func (r *commentResolver) Likes(ctx context.Context, obj *model.Comment) ([]*model.LikeComment, error) {
	return service.Likes(ctx, obj)
}

// User is the resolver for the User field.
func (r *likeCommentResolver) User(ctx context.Context, obj *model.LikeComment) (*model.User, error) {
	return service.GetUser(ctx, obj.UserID)
}

// AddComment is the resolver for the addComment field.
func (r *mutationResolver) AddComment(ctx context.Context, postID string, commentSenderID string, comment string) (*model.Comment, error) {
	return service.AddComment(ctx, postID, commentSenderID, comment)
}

// AddReply is the resolver for the addReply field.
func (r *mutationResolver) AddReply(ctx context.Context, commentSenderID string, postID string, replyCommentID string, comment string) (*model.Comment, error) {
	return service.AddReply(ctx, commentSenderID, postID, replyCommentID, comment)
}

// LikeComment is the resolver for the likeComment field.
func (r *mutationResolver) LikeComment(ctx context.Context, commentID string, userID string) (*model.LikeComment, error) {
	return service.LikeComment(ctx, commentID, userID)
}

// DeleteLikeComment is the resolver for the deleteLikeComment field.
func (r *mutationResolver) DeleteLikeComment(ctx context.Context, commentID string, userID string) (*model.LikeComment, error) {
	return service.DeleteLikeComment(ctx, commentID, userID)
}

// PostsComment is the resolver for the postsComment field.
func (r *queryResolver) PostsComment(ctx context.Context, id string) (*model.Comment, error) {
	return service.GetComment(ctx, id)
}

// CommentReply is the resolver for the commentReply field.
func (r *queryResolver) CommentReply(ctx context.Context, limit int, offset int, commentID string) ([]*model.Comment, error) {
	return service.CommentReply(ctx, limit, offset, commentID)
}

// PostComments is the resolver for the postComments field.
func (r *queryResolver) PostComments(ctx context.Context, limit int, offset int, postID string) ([]*model.Comment, error) {
	return service.GetPostComments(ctx, limit, offset, postID)
}

// Comment returns generated.CommentResolver implementation.
func (r *Resolver) Comment() generated.CommentResolver { return &commentResolver{r} }

// LikeComment returns generated.LikeCommentResolver implementation.
func (r *Resolver) LikeComment() generated.LikeCommentResolver { return &likeCommentResolver{r} }

type commentResolver struct{ *Resolver }
type likeCommentResolver struct{ *Resolver }

// !!! WARNING !!!
// The code below was going to be deleted when updating resolvers. It has been copied here so you have
// one last chance to move it out of harms way if you want. There are two reasons this happens:
//  - When renaming or deleting a resolver the old code will be put in here. You can safely delete
//    it when you're done.
//  - You have helper methods in this file. Move them out to keep these resolver files clean.
func (r *queryResolver) PostsComments(ctx context.Context, limit int, offset int, postID string) ([]*model.Comment, error) {
	return service.GetPostComments(ctx, limit, offset, postID)
}
