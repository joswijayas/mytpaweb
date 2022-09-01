package service

import (
	"context"
	"fmt"
	"os"
	"time"

	"github.com/dgrijalva/jwt-go"
)

type JwtCustomClaim struct {
	ID string `json:"id"`
	jwt.StandardClaims
}

func myJwtKey() string {
	myKey := os.Getenv("JWT_SECRET")
	if myKey == "" {
		return "jjjwtkey"
	}

	return myKey
}

var jwtkey = []byte(myJwtKey())

func jwtGenerate(ctx context.Context, userID string) (string, error) {
	t := jwt.NewWithClaims(jwt.SigningMethodHS256, &JwtCustomClaim{
		ID: userID,
		StandardClaims: jwt.StandardClaims{
			ExpiresAt: time.Now().Add(time.Hour * 72).Unix(),
			IssuedAt:  time.Now().Unix(),
		},
	})

	token, err := t.SignedString(jwtkey)
	if err != nil {
		return "", err
	}

	return token, nil
}

func ValidateJwt(ctx context.Context, token string) (*jwt.Token, error) {
	return jwt.ParseWithClaims(token, &JwtCustomClaim{}, func(t *jwt.Token) (interface{}, error) {
		if _, ok := t.Method.(*jwt.SigningMethodHMAC); !ok {
			return nil, fmt.Errorf("ERROR GBS SIGNIN")
		}

		return jwtkey, nil
	})
}
