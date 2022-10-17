package service

import (
	"context"
	"errors"
	"fmt"
	"tpabend/bendtpa/database"
	"tpabend/bendtpa/graph/model"
	"tpabend/bendtpa/tools"

	"github.com/google/uuid"
	"github.com/samber/lo"
	"github.com/vektah/gqlparser/v2/gqlerror"
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

func ResetPassword(ctx context.Context, id string, newPass string) (interface{}, error) {
	model, err := UserGetByID(ctx, id)
	if err != nil {
		return nil, err
	}
	db := database.GetDB()
	if err := db.First(model, "id = ?", id).Error; err != nil {
		return nil, err
	}
	if !model.IsActive {
		return nil, errors.New("your account is not authenticated")
	}
	model.Password = tools.HashPassword(newPass)
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

func UpdateProfileImage(ctx context.Context, id string, profilePicture string)(interface{}, error){
	model := new(model.User)
	db := database.GetDB()
	err := db.First(model, "id = ?", id).Error
	if err != nil{
		return nil, err
	}

	model.ProfilePicture = profilePicture

	return model, db.Where("id = ?", id).Save(model).Error
}

func UpdateBackgroundImage(ctx context.Context, id string, backgroundPicture string)(interface{}, error){
	model := new(model.User)
	db := database.GetDB()
	err := db.First(model, "id = ?", id).Error
	if err != nil{
		return nil, err
	}

	model.BackgroundPicture = &backgroundPicture

	return model, db.Where("id = ?", id).Save(model).Error
}

func GetUser(ctx context.Context, id string) (*model.User, error){
	db := database.GetDB()
	var user model.User
	err := db.Model(user).Where("id = ?", id).Take(&user).Error
	if err != nil {
		return nil, err
	}
	return &user, nil
}

func UserUpdate(ctx context.Context, id string, input model.UpdateUser)(interface{}, error){
	model := new(model.User)
	db := database.GetDB()
	err := db.First(model, "id = ?", id).Error
	if err != nil{
		return nil, err
	}

	model.Name = input.Name
	model.FirstName = input.FirstName
	model.LastName = input.LastName
	model.Pronoun = input.Pronoun
	model.Position = input.Position
	model.Region = input.Region
	model.Headline = input.Headline

	return model, db.Where("id = ?", id).Save(model).Error
}

func FollowUser(ctx context.Context, id1 string, id2 string)(interface{}, error){
	db := database.GetDB()

	modelFollow := new(model.Follow)

	modelFollow.UserID = id1
	modelFollow.FollowID = id2

	db.Table("user_follows").Create(modelFollow)

	var modelFollows []*model.Follow
	db.Table("user_follows").Find(&modelFollows, "follow_id = ?", id2)

	return map[string]interface{}{
		"length": len(modelFollows),
	}, nil
}

func UnfollowUser(ctx context.Context, id1 string, id2 string) (interface{}, error){
	db := database.GetDB()
	modelFollow := new(model.Follow)
	if err := db.Table("user_follows").First(&modelFollow, "user_id = ? AND follow_id = ?", id1, id2).Error; err != nil{
		return nil, err
	}

	if modelFollow.UserID == "" {
		var modelFollows []*model.Follow
		db.Table("user_follows").Find(&modelFollows, "follow_id = ?", id2)

		return map[string]interface{}{
			"length": len(modelFollows),
		}, nil
	} else {
		db.Table("user_follows").Delete(&modelFollow, "user_id = ? AND follow_id = ?", id1, id2)

		var modelFollows []*model.Follow
		db.Table("user_follows").Find(&modelFollows, "follow_id = ?", id2)

		return map[string]interface{}{
			"length": len(modelFollows),
		}, nil
	}
}

func VisitUser(ctx context.Context, id1 string, id2 string)(interface{}, error){
	db := database.GetDB()
	
	modelVisit := new(model.Visit)

	db.Table("user_visits").First(&modelVisit, "user_id = ? AND visit_id = ?", id1, id2)

	if modelVisit.UserID != ""{
		var modelVisits []*model.Visit
		db.Table("user_visits").Find(&modelVisits, "visit_id = ?", id2)

		return map[string]interface{}{
			"length": len(modelVisits),
		}, nil
	}else{
		modelVisit.UserID = id1
		modelVisit.VisitID = id2

		if err := db.Table("user_visits").Create(modelVisit).Error; err == nil {
			// AddNotification(db, ctx, id2, id1, "Visit Your Profile")
		}

		var modelVisits []*model.Visit
		db.Table("user_visits").Find(&modelVisits, "visit_id = ?", id2)

		return map[string]interface{}{
			"length": len(modelVisits),
		}, nil
	}

}

func GetVisits(ctx context.Context, obj *model.User) ([]*model.Visit, error) {
	db := database.GetDB()
	var modelVisits []*model.Visit

	return modelVisits, db.Table("user_visits").Find(&modelVisits, "visit_id = ?", obj.ID).Error
}

func GetFollows(ctx context.Context, obj *model.User) ([]*model.Follow, error) {
	db := database.GetDB()
	var modelFollow []*model.Follow

	return modelFollow, db.Table("user_follows").Find(&modelFollow, "follow_id = ? ", obj.ID).Error
}

func GetBlocks(ctx context.Context, obj *model.User) ([]*model.Block, error) {
	db := database.GetDB()
	var modelBlocks []*model.Block

	if err := db.Table("user_blocks").Where("user_id = ?", obj.ID).Or("block_id = ?", obj.ID).Find(&modelBlocks).Error; err != nil {
		return nil, err
	}	

	return modelBlocks, nil
}

func UserSuggestion(ctx context.Context, userID string)([]*model.User, error){
	db := database.GetDB()
	var modelUsers []*model.User
	var userIdList []string
	var suggestId []string

	var connect1 []*model.Connection
	var connect2 []*model.Connection

	if err := db.Find(&connect1, "user1_id", userID).Error; err != nil {
		return nil, err
	}
 
	if err := db.Find(&connect2, "user2_id", userID).Error; err != nil {
		return nil, err
	}

	connetions1Ids := lo.Map(connect1, func(connectionData *model.Connection, _ int) string {
		return connectionData.User2ID
	})

	connetions2Ids := lo.Map(connect2, func(connectionData *model.Connection, _ int) string {
		return connectionData.User1ID
	})

	userIdList = append(userIdList, connetions1Ids...)
	userIdList = append(userIdList, connetions2Ids...)
	userIdList = lo.Uniq(userIdList)

	var friendConnection1 []*model.Connection
	var friendConnection2 []*model.Connection

	if err := db.Where("user1_id IN ?", userIdList).Not("user2_id = ?", userID).Find(&friendConnection1).Error; err != nil {
		return nil, err
	}

	if err := db.Where("user2_id IN ?", userIdList).Not("user1_id = ?", userID).Find(&friendConnection2).Error; err != nil {
		return nil, err
	}

	fmt.Println(userIdList)

	userSuggestion1Ids := lo.Map(friendConnection1, func(connectionData *model.Connection, _ int) string {
		return connectionData.User2ID
	})

	userSuggestion2Ids := lo.Map(friendConnection2, func(connectionData *model.Connection, _ int) string {
		return connectionData.User1ID
	})

	suggestId = append(suggestId, userSuggestion1Ids...)
	suggestId = append(suggestId, userSuggestion2Ids...)
	suggestId = lo.Uniq(suggestId)
	fmt.Println(suggestId)

	var finalsuggestId []string
	for _, suggestionIdUser := range suggestId {
		checkSame := false
		for _, userConnectionId := range userIdList {
			if suggestionIdUser == userConnectionId {
				checkSame = true
			}
		}

		if !checkSame {
			finalsuggestId = append(finalsuggestId, suggestionIdUser)
		}
	}

	fmt.Println(finalsuggestId)

	if len(finalsuggestId) == 0 {
		return nil, gqlerror.Errorf("No suggest connect")
	}

	if err := db.Find(&modelUsers, finalsuggestId).Error; err != nil {
		return nil, err
	}

	return modelUsers, nil
}