package graph

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

import (
	"context"
	"fmt"
	"tpabend/bendtpa/graph/generated"
	"tpabend/bendtpa/graph/model"
	"tpabend/bendtpa/service"
)

// RegisterUser is the resolver for the registerUser field.
func (r *mutationResolver) RegisterUser(ctx context.Context, input model.NewUser) (interface{}, error) {
	// model := &model.User{
	// 	ID:                uuid.NewString(),
	// 	Name:              "",
	// 	Email:             input.Email,
	// 	Password:          input.Password,
	// 	FirstName:         "",
	// 	LastName:          nil,
	// 	Pronoun:           nil,
	// 	Headline:          nil,
	// 	Position:          nil,
	// 	Region:            nil,
	// 	About:             nil,
	// 	ProfilePicture:    "https://icon-library.com/images/no-profile-picture-icon/no-profile-picture-icon-15.jpg",
	// 	BackgroundPicture: nil,
	// 	IsActive:          false,
	// }
	// err := r.DB.Create(model).Error

	// return model, err
	return service.UserRegister(ctx, input)
}

// LoginUser is the resolver for the loginUser field.
func (r *mutationResolver) LoginUser(ctx context.Context, email string, password string) (interface{}, error) {
	fmt.Print(email)
	return service.UserLogin(ctx, email, password)
}

// UpdateUser is the resolver for the updateUser field.
func (r *mutationResolver) UpdateUser(ctx context.Context, id string, input model.NewUpdateUser) (*model.User, error) {
	panic(fmt.Errorf("not implemented: UpdateUser - updateUser"))
}

// ActivateUser is the resolver for the activateUser field.
func (r *mutationResolver) ActivateUser(ctx context.Context, id string) (interface{}, error) {
	return service.ActivateUser(ctx, id)
}

// UpdateAbout is the resolver for the updateAbout field.
func (r *mutationResolver) UpdateAbout(ctx context.Context, id string, about string) (interface{}, error) {
	return service.UpdateAbout(ctx, id, about)
}

// User is the resolver for the user field.
func (r *queryResolver) User(ctx context.Context, id string) (*model.User, error) {
	panic(fmt.Errorf("not implemented: User - user"))
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

// Mutation returns generated.MutationResolver implementation.
func (r *Resolver) Mutation() generated.MutationResolver { return &mutationResolver{r} }

// Query returns generated.QueryResolver implementation.
func (r *Resolver) Query() generated.QueryResolver { return &queryResolver{r} }

type mutationResolver struct{ *Resolver }
type queryResolver struct{ *Resolver }
