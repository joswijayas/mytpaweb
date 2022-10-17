package service

import (
	"context"
	"tpabend/bendtpa/database"
	"tpabend/bendtpa/graph/model"

	"github.com/google/uuid"
	"github.com/vektah/gqlparser/v2/gqlerror"
)

func AddHashtag(ctx context.Context, hashtag string)(*model.Hashtag, error){
	db := database.GetDB()
	modelHashtag := new(model.Hashtag)
	modelInputHashtag := &model.Hashtag{
		ID:      uuid.NewString(),
		Hashtag: hashtag,
	}

	if err := db.Find(modelHashtag, "hashtag = ?", hashtag).Error; err != nil {
		return nil, err
	}

	if modelHashtag.ID != "" {
		return nil, gqlerror.Errorf("Hashtag already exists")
	}

	return modelInputHashtag, db.Create(modelInputHashtag).Error
}

func Hashtags(ctx context.Context)([]*model.Hashtag, error){
	db := database.GetDB()
	var modelHashtags []*model.Hashtag

	return modelHashtags, db.Find(&modelHashtags).Error
}