package service

import (
	"context"
	"errors"
	"tpabend/bendtpa/database"
	"tpabend/bendtpa/graph/model"

	"github.com/google/uuid"
	"github.com/vektah/gqlparser/v2/gqlerror"
	"gorm.io/gorm"
)

func SendLinkResetPassword(ctx context.Context, email string)(string, error){
	db := database.GetDB()
	if _, err := UserGetByEmail(ctx, email); err != nil {
		if err == gorm.ErrRecordNotFound {
			return "", &gqlerror.Error{
				Message: "Email not found",
			}
		}
		return "", err
	}

	if _, err := ResetLinkGetByEmail(ctx, email); err == nil {
		return "", errors.New("You have already requested, please check your email!")
	}

	link := model.LinkResetPassword{
		ID: uuid.NewString(),
		Email: email,
	}

	if err := db.Model(link).Create(&link).Error; err != nil{
		return "", err
	}

	resetLink := "http://localhost:5173/ResetPassword/" + link.ID

	SendEmail(email, resetLink)

	return resetLink, nil
}

func GetResetLink(ctx context.Context, id string)(*model.LinkResetPassword, error){
	model := new(model.LinkResetPassword)
	db := database.GetDB()
	

	if err:= db.First(model, "id = ?", id).Error; err != nil{
		return nil, err
	}

	return model, nil
}

func ResetLinkGetByEmail(ctx context.Context, email string)(*model.LinkResetPassword, error){
	db := database.GetDB()
	var resetLink model.LinkResetPassword
	if err := db.Model(resetLink).Where("email LIKE ?", email).Take(&resetLink).Error; err != nil{
		return nil, err
	}
	return &resetLink, nil
}