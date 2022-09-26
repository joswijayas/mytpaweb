package service

import (
	"context"
	"log"
	"tpabend/bendtpa/database"
	"tpabend/bendtpa/graph/model"
	"github.com/google/uuid"
)

func GetUserExperience(ctx context.Context, obj *model.User) ([]*model.Experience, error) {
	db := database.GetDB()

	var modelExperiences []*model.Experience
	log.Println("getuserexperienceeee")
	print(obj.ID)
	if err := db.Where("user_id = ?", obj.ID).Find(&modelExperiences).Error; err != nil {
		return nil, err
	}
	print(modelExperiences)
	return modelExperiences, nil
}

func GetExperienceByUserId(ctx context.Context, id string) (*model.Experience, error) {
	db := database.GetDB()
	var exp model.Experience
	if err := db.Model(exp).Where("user_id = ?", id).Find(&exp).Error; err != nil {
		return nil, err
	}
	return &exp, nil
}

func Experiences(ctx context.Context, id string) ([]*model.Experience, error) {
	db := database.GetDB()
	var modelExperiences []*model.Experience
	if err := db.Where("user_id = ?", id).Find(&modelExperiences).Error; err != nil {
		return nil, err
	}
	return modelExperiences, nil
}

func AddExperience(ctx context.Context, input model.NewExperience) (*model.Experience, error) {
	log.Println("hahaha masuk siniii ni")
	db := database.GetDB()
	experience := model.Experience{
		ID:              uuid.NewString(),
		UserID:          input.UserID,
		Title:           input.Title,
		EmploymentType:  input.EmploymentType,
		CompanyName:     input.CompanyName,
		Location:        input.Location,
		IsActive:        false,
		Industry:        input.Industry,
		MonthStartDate:  input.MonthStartDate,
		MonthEndDate:    input.MonthEndDate,
		YearStartDate:   input.YearStartDate,
		YearEndDate:     input.YearEndDate,
		ProfileHeadline: input.ProfileHeadline,
		Description:     input.Description,
	}

	if err := db.Model(experience).Create(&experience).Error; err != nil {
		return nil, err
	}

	return &experience, nil
}

func DeleteExperience(ctx context.Context, id string)(*model.Experience, error){
	db := database.GetDB()
	experience := new(model.Experience)
	if err := db.First(experience, "id = ?", id).Error; err != nil {
		return nil, err
	}
	return experience, db.Delete(experience).Error
}

func UpdateExperience(ctx context.Context, id string, input model.NewExperience)(*model.Experience, error){
	db := database.GetDB()
	experience := new(model.Experience)

	if err := db.First(experience, "id = ?", id).Error; err != nil{
		return nil, err
	}

	experience.Title = input.Title
	experience.EmploymentType = input.EmploymentType
	experience.ProfileHeadline = input.ProfileHeadline
	experience.CompanyName = input.CompanyName
	experience.Location = input.Location
	experience.Industry = input.Industry
	experience.Description = input.Description
	experience.MonthStartDate = input.MonthStartDate
	experience.MonthEndDate = input.MonthEndDate
	experience.YearStartDate = input.YearStartDate
	experience.YearEndDate = input.YearEndDate

	return experience, db.Save(experience).Error
}