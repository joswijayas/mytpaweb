package service

import (
	"context"
	"errors"
	"fmt"
	"tpabend/bendtpa/database"
	"tpabend/bendtpa/graph/model"
	"tpabend/bendtpa/tools"
	"github.com/google/uuid"
	"github.com/vektah/gqlparser/v2/gqlerror"
	"gorm.io/gorm"
)

func UserRegister(ctx context.Context, input model.NewUser) (interface{}, error) {
	_, err := UserGetByEmail(ctx, input.Email)

	if err == nil {
		if err != gorm.ErrRecordNotFound {
			fmt.Printf("auth.go 21 %s", err)
			return nil, err
		}
	}

	createdUser, err := UserCreate(ctx, input)

	if err != nil {
		return nil, err
	}

	token, err := jwtGenerate(ctx, createdUser.ID)
	if err != nil {
		return nil, err
	}

	newUID := uuid.NewString()

	verification := &model.ActivationLink{
		ID:     newUID,
		Link:   "http://localhost:5173/Verification/" + createdUser.ID,
		UserID: createdUser.ID,
	}

	db := database.GetDB()
	err = db.Create(&verification).Error

	if err != nil {
		return nil, err
	}
	fmt.Print(createdUser.Email)
	SendEmailVerification(createdUser.Email, verification.Link)

	return map[string]interface{}{
		"token": token,
		"name":  createdUser.Name,
		"email": createdUser.Email,
	}, nil

}

func UserLogin(ctx context.Context, email string, password string) (interface{}, error) {
	user, err := UserGetByEmail(ctx, email)
	fmt.Print(user)
	if err != nil {
		if err == gorm.ErrRecordNotFound {
			return nil, &gqlerror.Error{
				Message: "Data not found, please check your email or password!",
			}
		}
		return nil, err
	}
	if err := tools.ComparePassword(user.Password, password); err != nil {
		return nil, errors.New("Wrong password!")
	}
	fmt.Print("----------------------")
	fmt.Print(user)
	if !user.IsActive {
		fmt.Print("akljsdflkasdjf")
		return nil, gqlerror.Errorf("Account is not active, please check your email!")
	}

	token, err := jwtGenerate(ctx, user.ID)
	if err != nil {
		return nil, err
	}

	return map[string]interface{}{
		"id":                 user.ID,
		"name":               user.Name,
		"firstName":         user.FirstName,
		"lastName":          user.LastName,
		"is_active":          user.IsActive,
		"email":              user.Email,
		"about":              user.About,
		"backgroundPicture": user.BackgroundPicture,
		"profilePicture":    user.ProfilePicture,
		"headline":           user.Headline,
		"position":           user.Position,
		"pronoun":            user.Pronoun,
		"region":             user.Region,
		"experiences":		  user.Experiences,
		"token":              token,
	}, nil

}
