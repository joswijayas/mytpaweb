package graph

// This file will be automatically regenerated based on the schema, any resolver implementations
// will be copied through when generating and any unknown code will be moved to the end.

import (
	"context"
	"tpabend/bendtpa/graph/model"
	"tpabend/bendtpa/service"
)

// AddJob is the resolver for the addJob field.
func (r *mutationResolver) AddJob(ctx context.Context, title string, companyName string, city string, country string, status string, description string) (*model.Job, error) {
	return service.AddJob(ctx, title, companyName, city, country, status, description)
}

// Jobs is the resolver for the Jobs field.
func (r *queryResolver) Jobs(ctx context.Context) ([]*model.Job, error) {
	return service.GetJobs(ctx)
}
