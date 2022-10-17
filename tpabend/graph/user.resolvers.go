package graph

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

import (
	"context"
	"fmt"
	"log"
	"tpabend/bendtpa/graph/generated"
	"tpabend/bendtpa/graph/model"
	"tpabend/bendtpa/service"
	"tpabend/bendtpa/tools"
)

// RegisterUser is the resolver for the registerUser field.
func (r *mutationResolver) RegisterUser(ctx context.Context, input model.NewUser) (interface{}, error) {
	return service.UserRegister(ctx, input)
}

// LoginUser is the resolver for the loginUser field.
func (r *mutationResolver) LoginUser(ctx context.Context, email string, password string) (interface{}, error) {
	fmt.Print(email)
	return service.UserLogin(ctx, email, password)
}

// UpdateUser is the resolver for the updateUser field.
func (r *mutationResolver) UpdateUser(ctx context.Context, id string, input model.UpdateUser) (interface{}, error) {
	return service.UserUpdate(ctx, id, input)
}

// ActivateUser is the resolver for the activateUser field.
func (r *mutationResolver) ActivateUser(ctx context.Context, id string) (interface{}, error) {
	return service.ActivateUser(ctx, id)
}

// UpdateAbout is the resolver for the updateAbout field.
func (r *mutationResolver) UpdateAbout(ctx context.Context, id string, about string) (interface{}, error) {
	return service.UpdateAbout(ctx, id, about)
}

// UpdateImage is the resolver for the updateImage field.
func (r *mutationResolver) UpdateImage(ctx context.Context, id string, profilePicture string) (interface{}, error) {
	return service.UpdateProfileImage(ctx, id, profilePicture)
}

// UpdateBgImage is the resolver for the updateBgImage field.
func (r *mutationResolver) UpdateBgImage(ctx context.Context, id string, backgroundPicture string) (interface{}, error) {
	return service.UpdateBackgroundImage(ctx, id, backgroundPicture)
}

// ResetPassword is the resolver for the resetPassword field.
func (r *mutationResolver) ResetPassword(ctx context.Context, email string, newPassword string) (interface{}, error) {
	user := new(model.User)
	link := new(model.LinkResetPassword)

	if err := r.DB.First(user, "email = ?", email).Error; err != nil {
		panic(err)
	}

	if err := r.DB.Delete(link, "email = ?", email).Error; err != nil {
		panic(err)
	}

	user.Password = tools.HashPassword(newPassword)

	return user, r.DB.Save(user).Error
}

// FollowUser is the resolver for the FollowUser field.
func (r *mutationResolver) FollowUser(ctx context.Context, id1 string, id2 string) (interface{}, error) {
	return service.FollowUser(ctx, id1, id2)
}

// UnFollowUser is the resolver for the UnFollowUser field.
func (r *mutationResolver) UnFollowUser(ctx context.Context, id1 string, id2 string) (interface{}, error) {
	return service.UnfollowUser(ctx, id1, id2)
}

// VisitUser is the resolver for the VisitUser field.
func (r *mutationResolver) VisitUser(ctx context.Context, id1 string, id2 string) (interface{}, error) {
	return service.VisitUser(ctx, id1, id2)
}

// User is the resolver for the user field.
func (r *queryResolver) User(ctx context.Context, id string) (*model.User, error) {
	log.Print("ajjajajajajaj")
	return service.GetUser(ctx, id)
}

// Users is the resolver for the users field.
func (r *queryResolver) Users(ctx context.Context) ([]*model.User, error) {
	panic(fmt.Errorf("not implemented: Users - users"))
}

// Mine is the resolver for the mine field.
func (r *queryResolver) Mine(ctx context.Context) (*model.User, error) {
	panic(fmt.Errorf("not implemented: Mine - mine"))
}

// Protected is the resolver for the protected field.
func (r *queryResolver) Protected(ctx context.Context) (string, error) {
	return "success", nil
}

// UserSuggestion is the resolver for the UserSuggestion field.
func (r *queryResolver) UserSuggestion(ctx context.Context, userID string) ([]*model.User, error) {
	return service.UserSuggestion(ctx, userID)
}

// Experiences is the resolver for the Experiences field.
func (r *userResolver) Experiences(ctx context.Context, obj *model.User) ([]*model.Experience, error) {
	print("experience resolverr")
	return service.GetUserExperience(ctx, obj)
}

// Educations is the resolver for the Educations field.
func (r *userResolver) Educations(ctx context.Context, obj *model.User) ([]*model.Education, error) {
	panic(fmt.Errorf("not implemented: Educations - Educations"))
}

// Connections is the resolver for the Connections field.
func (r *userResolver) Connections(ctx context.Context, obj *model.User) ([]*model.Connection, error) {
	return service.GetConnections(ctx, obj)
}

// ConnectionRequests is the resolver for the ConnectionRequests field.
func (r *userResolver) ConnectionRequests(ctx context.Context, obj *model.User) ([]*model.ConnectionRequest, error) {
	return service.GetConnectionRequest(ctx, obj)
}

// Visits is the resolver for the Visits field.
func (r *userResolver) Visits(ctx context.Context, obj *model.User) ([]*model.Visit, error) {
	return service.GetVisits(ctx, obj)
}

// Follows is the resolver for the Follows field.
func (r *userResolver) Follows(ctx context.Context, obj *model.User) ([]*model.Follow, error) {
	return service.GetFollows(ctx, obj)
}

// Blocks is the resolver for the Blocks field.
func (r *userResolver) Blocks(ctx context.Context, obj *model.User) ([]*model.Block, error) {
	return service.GetBlocks(ctx, obj)
}

// Mutation returns generated.MutationResolver implementation.
func (r *Resolver) Mutation() generated.MutationResolver { return &mutationResolver{r} }

// Query returns generated.QueryResolver implementation.
func (r *Resolver) Query() generated.QueryResolver { return &queryResolver{r} }

// User returns generated.UserResolver implementation.
func (r *Resolver) User() generated.UserResolver { return &userResolver{r} }

type mutationResolver struct{ *Resolver }
type queryResolver struct{ *Resolver }
type userResolver struct{ *Resolver }
