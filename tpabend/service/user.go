package service

import (
	"context"
	"fmt"
	"tpabend/bendtpa/database"
	"tpabend/bendtpa/graph/model"
	"tpabend/bendtpa/tools"

	"github.com/google/uuid"
)

func UserCreate(ctx context.Context, input model.NewUser) (*model.User, error) {
	db := database.GetDB()

	input.Password = tools.HashPassword(input.Password)
	user := model.User{
		ID:                uuid.NewString(),
		Name:              "",
		Email:             input.Email,
		Password:          input.Password,
		FirstName:         "",
		LastName:          nil,
		Pronoun:           nil,
		Headline:          nil,
		Position:          nil,
		Region:            nil,
		About:             nil,
		ProfilePicture:    "https://icon-library.com/images/no-profile-picture-icon/no-profile-picture-icon-15.jpg",
		BackgroundPicture: nil,
		IsActive:          false,
	}

	if err := db.Model(user).Create(&user).Error; err != nil {
		return nil, err
	}

	return &user, nil
}

func UserGetByID(ctx context.Context, id string) (*model.User, error) {
	db := database.GetDB()
	var user model.User
	if err := db.Model(user).Where("id = ?", id).Take(&user).Error; err != nil {
		return nil, err
	}
	return &user, nil
}

func UserGetByEmail(ctx context.Context, email string) (*model.User, error) {
	db := database.GetDB()
	var user model.User
	err := db.Model(user).Where("email LIKE ?", email).Take(&user).Error;
	fmt.Print(err)
	if err != nil {
		fmt.Printf("user.go 56 %s", err)
		return nil, err
	}
	return &user, nil
}

func ActivateUser(ctx context.Context, id string)(interface{}, error){
	model := new(model.User)
	db := database.GetDB()
	err := db.First(model, "id = ?", id).Error
	if err != nil{
		return nil, err
	}

	if !model.IsActive{
		model.IsActive = true
	}

	return model, db.Where("id = ?", id).Save(model).Error
}

func UpdateAbout(ctx context.Context, id string, about string)(interface{}, error){
	model := new(model.User)
	db := database.GetDB()
	err := db.First(model, "id = ?", id).Error
	if err != nil{
		return nil, err
	}

	model.About = &about

	return model, db.Where("id = ?", id).Save(model).Error
}