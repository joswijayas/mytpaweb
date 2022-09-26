package service

import (
	"context"
	"time"
	"tpabend/bendtpa/database"
	"tpabend/bendtpa/graph/model"

	"github.com/google/uuid"
)

func AddJob(ctx context.Context, title string, companyName string, city string, country string, status string, description string)(*model.Job, error){
	db := database.GetDB()
	job := &model.Job{
		ID: uuid.NewString(),
		Title: title,
		CompanyName: companyName,
		City: city,
		Country: country,
		Status: status,
		Description: description,
		Creator: "Creator",
		TimeStamp: time.Now(),
	}

	return job, db.Create(job).Error
}

func GetJobs(ctx context.Context) ([]*model.Job, error){
	db := database.GetDB()
	var jobs []*model.Job
	if err := db.Order("time_stamp desc").Find(&jobs).Error; err != nil{
		return nil, err
	}
	return jobs, nil
} 