package service

import (
	"context"
	"fmt"
	"time"
	"tpabend/bendtpa/database"
	"tpabend/bendtpa/graph/model"

	"github.com/google/uuid"
	"github.com/samber/lo"
)

func CreatePost(ctx context.Context, input model.NewPost)(*model.Post, error){
	db := database.GetDB()
	modelPost := &model.Post{
		ID: uuid.NewString(),
		Description: input.Text,
		PhotoURL: input.PhotoURL,
		VideoURL: input.VideoURL,
		SenderId: input.SenderID,
		TimeStamp: time.Now(),
	}
	return modelPost, db.Create(modelPost).Error
}

func LikePost(ctx context.Context, postID string, userID string)(*model.LikePosts, error){
	db := database.GetDB()
	likePost := &model.LikePosts{
		PostId: postID,
		UserId: userID,
	}

	return likePost, db.Create(likePost).Error
}

func UnlikePost(ctx context.Context, postID string, userID string)(*model.LikePosts, error){
	db := database.GetDB()
	likepost := new(model.LikePosts)
	if err := db.Find(likepost, "post_id = ? AND user_id = ?", postID, userID).Error; err!=nil{
		return nil, err
	}
	return likepost, db.Delete(likepost, "post_id = ? AND user_id = ?", postID, userID).Error
}

func GetLikes(ctx context.Context, obj *model.Post)([]*model.LikePosts, error){
	db := database.GetDB()
	var likePost []*model.LikePosts
	if err := db.Find(&likePost, "post_id", obj.ID).Error; err != nil{
		return nil, err
	}

	return likePost, nil
} 

func GetComments(ctx context.Context, obj *model.Post) ([]*model.Comment, error) {
	var modelComment []*model.Comment
	db := database.GetDB()
	if err := db.Find(&modelComment, "post_id = ?", obj.ID).Error; err != nil {
		return nil, err
	}

	return modelComment, nil
}

func GetPosts(ctx context.Context, limit int, offset int, userIDs string) ([]*model.Post, error){
	db := database.GetDB()
	var userConnectIdList []string
	userID := userIDs
	userConnectIdList = append(userConnectIdList, userID)

	var follows []*model.Follow

	if err := db.Table("user_follows").Find(&follows, "user_id = ?", userID).Error; err != nil {
		return nil, err
	}

	followIds := lo.Map(follows, func(x *model.Follow, _ int) string {
		return x.FollowID
	})

	userConnectIdList = append(userConnectIdList, followIds...)

	var connections1 []*model.Connection
	var connections2 []*model.Connection

	if err := db.Find(&connections1, "user1_id", userID).Error; err != nil {
		return nil, err
	}

	if err := db.Find(&connections2, "user2_id", userID).Error; err != nil {
		return nil, err
	}

	connetions1Ids := lo.Map(connections1, func(connectionData *model.Connection, _ int) string {
		return connectionData.User2ID
	})

	connetions2Ids := lo.Map(connections2, func(connectionData *model.Connection, _ int) string {
		return connectionData.User1ID
	})

	userConnectIdList = append(userConnectIdList, connetions1Ids...)
	userConnectIdList = append(userConnectIdList, connetions2Ids...)
	userConnectIdList = lo.Uniq(userConnectIdList)
	fmt.Println(userConnectIdList)
	var posts []*model.Post
	if err := db.Limit(limit).Offset(offset).Order("time_stamp desc").Find(&posts, "sender_id IN ?", userConnectIdList).Error; err != nil {
		return nil, err
	}
	return posts, nil
}