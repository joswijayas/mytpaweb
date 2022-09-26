package graph

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

import (
	"context"
	"fmt"
	"tpabend/bendtpa/graph/generated"
	"tpabend/bendtpa/graph/model"
)

// CommentSenderID is the resolver for the commentSenderId field.
func (r *commentResolver) CommentSenderID(ctx context.Context, obj *model.Comment) (string, error) {
	panic(fmt.Errorf("not implemented: CommentSenderID - commentSenderId"))
}

// UserComment is the resolver for the userComment field.
func (r *commentResolver) UserComment(ctx context.Context, obj *model.Comment) (*model.User, error) {
	panic(fmt.Errorf("not implemented: UserComment - userComment"))
}

// Replies is the resolver for the Replies field.
func (r *commentResolver) Replies(ctx context.Context, obj *model.Comment) ([]*model.Comment, error) {
	panic(fmt.Errorf("not implemented: Replies - Replies"))
}

// Likes is the resolver for the Likes field.
func (r *commentResolver) Likes(ctx context.Context, obj *model.Comment) ([]*model.LikeComment, error) {
	panic(fmt.Errorf("not implemented: Likes - Likes"))
}

// User is the resolver for the User field.
func (r *likeCommentResolver) User(ctx context.Context, obj *model.LikeComment) (*model.User, error) {
	panic(fmt.Errorf("not implemented: User - User"))
}

// AddComment is the resolver for the addComment field.
func (r *mutationResolver) AddComment(ctx context.Context, postID string, commentSenderID string, comment string) (*model.Comment, error) {
	panic(fmt.Errorf("not implemented: AddComment - addComment"))
}

// AddReply is the resolver for the addReply field.
func (r *mutationResolver) AddReply(ctx context.Context, commentSenderID string, postID string, replyCommentID string, comment string) (*model.Comment, error) {
	panic(fmt.Errorf("not implemented: AddReply - addReply"))
}

// LikeComment is the resolver for the likeComment field.
func (r *mutationResolver) LikeComment(ctx context.Context, commentID string, userID string) (*model.LikeComment, error) {
	panic(fmt.Errorf("not implemented: LikeComment - likeComment"))
}

// DeleteLikeComment is the resolver for the deleteLikeComment field.
func (r *mutationResolver) DeleteLikeComment(ctx context.Context, commentID string, userID string) (*model.LikeComment, error) {
	panic(fmt.Errorf("not implemented: DeleteLikeComment - deleteLikeComment"))
}

// PostsComment is the resolver for the postsComment field.
func (r *queryResolver) PostsComment(ctx context.Context, limit int, offset int, postID string) ([]*model.Comment, error) {
	panic(fmt.Errorf("not implemented: PostsComment - postsComment"))
}

// CommentReply is the resolver for the commentReply field.
func (r *queryResolver) CommentReply(ctx context.Context, limit int, offset int, commentID string) ([]*model.Comment, error) {
	panic(fmt.Errorf("not implemented: CommentReply - commentReply"))
}

// Comment returns generated.CommentResolver implementation.
func (r *Resolver) Comment() generated.CommentResolver { return &commentResolver{r} }

// LikeComment returns generated.LikeCommentResolver implementation.
func (r *Resolver) LikeComment() generated.LikeCommentResolver { return &likeCommentResolver{r} }

type commentResolver struct{ *Resolver }
type likeCommentResolver struct{ *Resolver }
