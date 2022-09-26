package model

type Education struct {
	ID           string `json:"id"`
	UserID       string `json:"userId"`
	School       string `json:"school"`
	Degree       string `json:"degree"`
	FieldOfStudy string `json:"fieldOfStudy"`
	StartYear    int    `json:"startYear"`
	EndYear      int    `json:"endYear"`
}

type NewEducation struct {
	UserID       string `json:"userId"`
	School       string `json:"school"`
	Degree       string `json:"degree"`
	FieldOfStudy string `json:"fieldOfStudy"`
	StartYear    int    `json:"startYear"`
	EndYear      int    `json:"endYear"`
}