package main

import (
	"log"
	"net/http"
	"os"
	"tpabend/bendtpa/directives"
	"tpabend/bendtpa/graph"
	"tpabend/bendtpa/graph/generated"
	"tpabend/bendtpa/graph/model"
	"tpabend/bendtpa/middlewares"

	"github.com/99designs/gqlgen/graphql/handler"
	"github.com/99designs/gqlgen/graphql/playground"
	"github.com/gorilla/mux"
	"gorm.io/driver/postgres"
	"gorm.io/gorm"
)

const defaultPort = "8080"

func MyCors(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Add("Access-Control-Allow-Headers", "Content-Type,AccessToken,X-CSRF-Token, Authorization, Token")
		w.Header().Add("Access-Control-Allow-Methods", "POST, GET, OPTIONS, PUT, DELETE")
		w.Header().Set("content-type", "application/json;charset=UTF-8")
		if r.Method == "OPTIONS" {
			w.WriteHeader(http.StatusNoContent)
			return
		}
		next.ServeHTTP(w, r)
	})
}

func main() {
	port := os.Getenv("PORT")
	if port == "" {
		port = defaultPort
	}

	dsn := "host=localhost user=postgres password=12345 dbname=mytpaweb port=5432 sslmode=disable TimeZone=Asia/Shanghai"
	db, err := gorm.Open(postgres.Open(dsn), &gorm.Config{})

	if err != nil{
		panic(err)
	}

	db.AutoMigrate(&model.User{})
	db.AutoMigrate(&model.ActivationLink{})
	
	c := generated.Config{Resolvers: &graph.Resolver{
		DB: db,
	}}

	c.Directives.Auth = directives.Auth

	srv := handler.NewDefaultServer(generated.NewExecutableSchema(c))

	routere := mux.NewRouter()
	routere.Use(MyCors)
	routere.Use(middlewares.AuthMiddleware)

	routere.Handle("/", playground.Handler("GraphQL playground", "/query"))
	routere.Handle("/query", srv)

	log.Printf("connect to http://localhost:%s/ for GraphQL playground", port)
	log.Fatal(http.ListenAndServe(":"+port, routere))
}