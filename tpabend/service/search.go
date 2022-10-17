package service

import (
	"context"
	"tpabend/bendtpa/database"
	"tpabend/bendtpa/graph/model"

	"github.com/samber/lo"
)

func Search(ctx context.Context, keyword string, limit int, offset int, userID string)(*model.Search, error){
	db := database.GetDB()
	search := new(model.Search)

	var modelUsers []*model.User
	var modelPosts []*model.Post

	if err := db.Not("id = ?", userID).Find(&modelUsers, "lower(name) like lower(?)", "%"+keyword+"%").Error; err != nil{
		return nil, err
	}

	if err := db.Order("time_stamp desc").Find(&modelPosts, "description like ? ", "%"+keyword+"%").Error; err != nil {
		return nil, err
	}

	search.Users = modelUsers
	search.Posts = modelPosts

	return search, nil
}

func SearchHastag(ctx context.Context, keyword string, limit int, offset int)(*model.Search, error){
	db := database.GetDB()
	search := new(model.Search)

	var modelPosts []*model.Post

	if err := db.Limit(limit).Offset(offset).Order("time_stamp desc").Find(&modelPosts, "description LIKE ? ", "%#"+keyword+"%").Error; err != nil{
		return nil, err
	}
	search.Posts = modelPosts
	return search, nil
}

func GetUserSearch(ctx context.Context, obj *model.Search)([]*model.User, error){
	db := database.GetDB()
	var users []*model.User

	userId_get := lo.Map(obj.Users, func(user *model.User, _ int) string {
		return user.ID
	})
	if len(userId_get) == 0{
		return users, nil
	}
	if err := db.Find(&users, userId_get).Error; err != nil{
		return nil, err
	}
	return users, nil
}

func GetPostSearch(ctx context.Context, obj *model.Search)([]*model.Post, error){
	db := database.GetDB()
	var postss []*model.Post

	postIds := lo.Map(obj.Posts, func(post *model.Post, _ int) string {
		return post.ID
	})

	if len(postIds) == 0 {
		return postss, nil
	}

	if err := db.Order("time_stamp desc").Find(&postss, postIds).Error; err != nil {
		return nil, err
	}

	return postss, nil
}

func SearchPost(ctx context.Context, keyword string, limit int, offset int)(*model.Search, error){
	db := database.GetDB()
	search := new(model.Search)

	var modelPosts []*model.Post

	if err := db.Limit(limit).Offset(offset).Find(&modelPosts, "description like ? ", "%"+keyword+"%").Error; err != nil {
		return nil, err
	}

	search.Posts = modelPosts

	return search, nil
}

func SearchUser(ctx context.Context, keyword string, limit int, offset int, userid string)(*model.Search, error){
	db := database.GetDB()
	search := new(model.Search)
	var modelUsers []*model.User

	if err := db.Limit(limit).Offset(offset).Not("id = ?", userid).Find(&modelUsers, "lower(name) like lower(?)", "%"+keyword+"%").Error; err != nil {
		return nil, err
	}

	search.Users = modelUsers

	return search, nil
}