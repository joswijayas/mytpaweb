package graph

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

import (
	"context"
	"tpabend/bendtpa/graph/model"
	"tpabend/bendtpa/service"
)

// AddEducation is the resolver for the addEducation field.
func (r *mutationResolver) AddEducation(ctx context.Context, input model.NewEducation) (interface{}, error) {
	return service.AddEducation(ctx, input)
}

// UpdateEducation is the resolver for the updateEducation field.
func (r *mutationResolver) UpdateEducation(ctx context.Context, id string, input model.NewEducation) (*model.Education, error) {
	return service.UpdateEducation(ctx, id, input)
}

// DeleteEducation is the resolver for the deleteEducation field.
func (r *mutationResolver) DeleteEducation(ctx context.Context, id string) (*model.Education, error) {
	return service.DeleteEducation(ctx, id)
}

// Educations is the resolver for the Educations field.
func (r *queryResolver) Educations(ctx context.Context, id string) ([]*model.Education, error) {
	return service.Educations(ctx, id)
}
