package service

import (
	"context"
	"log"
	"tpabend/bendtpa/database"
	"tpabend/bendtpa/graph/model"

	"github.com/google/uuid"
)

func Educations(ctx context.Context, id string) ([]*model.Education, error) {
	db := database.GetDB()
	var modelEducation []*model.Education
	if err := db.Where("user_id = ?", id).Find(&modelEducation).Error; err != nil {
		return nil, err
	}
	return modelEducation, nil
}


func AddEducation(ctx context.Context, input model.NewEducation) (*model.Education, error) {
	log.Println("hahaha masuk siniii ni")
	db := database.GetDB()
	education := model.Education{
		ID:              uuid.NewString(),
		UserID:          input.UserID,
		School: input.School,
		Degree: input.Degree,
		FieldOfStudy: input.FieldOfStudy,
		StartYear: input.StartYear,
		EndYear: input.EndYear,
	}

	if err := db.Model(education).Create(&education).Error; err != nil {
		return nil, err
	}

	return &education, nil
}

func DeleteEducation(ctx context.Context, id string)(*model.Education, error){
	db := database.GetDB()
	education := new(model.Education)
	if err := db.First(education, "id = ?", id).Error; err != nil {
		return nil, err
	}
	return education, db.Delete(education).Error
}

func UpdateEducation(ctx context.Context, id string, input model.NewEducation)(*model.Education, error){
	db := database.GetDB()
	education := new(model.Education)

	if err := db.First(education, "id = ?", id).Error; err != nil{
		return nil, err
	}

	education.School = input.School
	education.FieldOfStudy = input.FieldOfStudy
	education.Degree = input.Degree
	education.StartYear = input.StartYear
	education.EndYear = input.EndYear

	return education, db.Save(education).Error
}