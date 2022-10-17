package service

import (
	"context"
	"log"
	"tpabend/bendtpa/database"
	"tpabend/bendtpa/graph/model"
)

func AddBlock(ctx context.Context, userID string, blockID string) (*model.Block, error) {
	db := database.GetDB()

	modelBlock := &model.Block{
		UserID:  userID,
		BlockID: blockID,
	}

	return modelBlock, db.Table("user_blocks").Create(modelBlock).Error
}

func DeleteBlock(ctx context.Context, userID string, blockID string) (*model.Block, error) {
	log.Print("hjahahaha")
	db := database.GetDB()

	modelBlock := new(model.Block)

	// education := new(model.Education)
	if err := db.First(modelBlock, "user_id = ? AND block_id = ?", userID, blockID).Error; err != nil {
		return nil, err
	}
	return modelBlock, db.Delete(modelBlock).Error


	// if err:=db.Table("user_blocks").Delete(modelBlock, "user_id = ? AND block_id = ?", userID, blockID).Error; err != nil{
	// 	return nil, err
	// }

	// return modelBlock, db.Table("user_blocks").Delete(modelBlock, "user_id = ? AND block_id = ?", userID, blockID).Error
}

func GetBlockss(ctx context.Context, userID string) ([]*model.Block, error) {
	db := database.GetDB()

	var modelBlocks []*model.Block

	if err := db.Table("user_blocks").Where("user_id = ?", userID).Or("block_id = ?", userID).Find(&modelBlocks).Error; err != nil {
		return nil, err
	}

	return modelBlocks, nil
}