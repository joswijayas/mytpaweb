package service

import (
	"context"
	"time"
	"tpabend/bendtpa/database"
	"tpabend/bendtpa/graph/model"

	"github.com/google/uuid"
	"github.com/vektah/gqlparser/v2/gqlerror"
)

func Replies(ctx context.Context, obj *model.Comment)([]*model.Comment, error){
	db := database.GetDB()
	var modelComments []*model.Comment

	if err := db.Find(&modelComments, "reply_comment_id = ?", obj.ID).Error; err != nil{
		return nil, err
	}

	return modelComments, nil
}

func Likes(ctx context.Context, obj *model.Comment)([]*model.LikeComment, error){
	db := database.GetDB()
	var modelLikes []*model.LikeComment

	if err := db.Find(&modelLikes, "comment_id", obj.ID).Error; err != nil{
		return nil, err
	}

	return modelLikes, nil
}

func AddComment(ctx context.Context, postID string, commenterSenderID string, comment string)(*model.Comment, error){
	db := database.GetDB()
	modelComment := &model.Comment{
		ID: uuid.NewString(),
		PostID: postID,
		CommenterID: commenterSenderID,
		CommentText: comment,
		TimeStamp: time.Now(),
	}

	return modelComment, db.Create(modelComment).Error
}

func AddReply(ctx context.Context, commenterID string, postID string, reply_comment_id string, comment string)(*model.Comment, error){
	db := database.GetDB()
	modelComment := &model.Comment{
		ID: uuid.NewString(),
		PostID: postID,
		CommenterID: commenterID,
		CommentText: comment,
		ReplyCommentID: &reply_comment_id,
		TimeStamp: time.Now(),
	}

	return modelComment, db.Create(modelComment).Error
}

func LikeComment(ctx context.Context, commentID string, userID string)(*model.LikeComment, error){
	db := database.GetDB()



	modelLikeComment := &model.LikeComment{
		ID: uuid.NewString(),
		CommentID: commentID,
		UserID: userID,
	}

	likeComment := new(model.LikeComment)

	if err := db.Find(modelLikeComment, "user_id = ? AND comment_id = ?", userID, commentID).Error; err != nil{
		return nil, err
	}

	if likeComment.ID != ""{
		return nil, gqlerror.Errorf("double click")
	}

	return modelLikeComment, db.Create(modelLikeComment).Error
}

func DeleteLikeComment(ctx context.Context, commentID string, userID string)(*model.LikeComment, error){
	db := database.GetDB()

	modelLikeComment := new(model.LikeComment)

	if err := db.Find(modelLikeComment, "comment_id = ? AND user_id = ?", commentID, userID).Error; err != nil{
		return nil, err
	}

	return modelLikeComment, db.Delete(modelLikeComment).Error
}

func GetComment(ctx context.Context, id string)(*model.Comment, error){
	db := database.GetDB()
	modelComment := new(model.Comment)

	if err := db.Find(modelComment, "id = ?", id).Error; err != nil{
		return nil, err
	}

	return modelComment, nil
}

func GetPostComments(ctx context.Context, limit int, offset int, postID string)([]*model.Comment, error){
	var modelComments []*model.Comment

	db := database.GetDB()

	if err := db.Limit(limit).Offset(offset).Order("time_stamp desc").Find(&modelComments, "post_id = ? AND reply_comment_id IS NULL", postID).Error; err != nil{
		return nil, err
	}

	if len(modelComments) == 0{
		return nil, gqlerror.Errorf("comment empty")
	}

	return modelComments, nil
}

func CommentReply(ctx context.Context, limit int, offset int, commentID string)([]*model.Comment, error){
	db := database.GetDB()

	var modelComments []*model.Comment

	if err := db.Limit(limit).Offset(offset).Order("time_stamp desc").Find(&modelComments, "reply_comment_id = ?", commentID).Error; err != nil {
		return nil, err
	}
	return modelComments, nil
}