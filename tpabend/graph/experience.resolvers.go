package graph

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

import (
	"context"
	"log"
	"tpabend/bendtpa/graph/model"
	"tpabend/bendtpa/service"
)

// AddExperience is the resolver for the addExperience field.
func (r *mutationResolver) AddExperience(ctx context.Context, input model.NewExperience) (interface{}, error) {
	log.Println("asdasdasdasdasdasdasdasd")
	return service.AddExperience(ctx, input)
}

// UpdateExperience is the resolver for the updateExperience field.
func (r *mutationResolver) UpdateExperience(ctx context.Context, id string, input model.NewExperience) (*model.Experience, error) {
	return service.UpdateExperience(ctx, id, input)
}

// DeleteExperience is the resolver for the deleteExperience field.
func (r *mutationResolver) DeleteExperience(ctx context.Context, id string) (*model.Experience, error) {
	return service.DeleteExperience(ctx, id)
}

// Experiences is the resolver for the Experiences field.
func (r *queryResolver) Experiences(ctx context.Context, id string) ([]*model.Experience, error) {
	return service.Experiences(ctx, id)
}
