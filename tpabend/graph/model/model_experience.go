package model

type Experience struct {
	ID              string `json:"id"`
	UserID          string `json:"userId"`
	Title           string `json:"title"`
	EmploymentType  string `json:"employmentType"`
	CompanyName     string `json:"companyName"`
	Location        string `json:"location"`
	IsActive        bool   `json:"isActive"`
	Industry        string `json:"industry"`
	MonthStartDate  string `json:"monthStartDate"`
	MonthEndDate    string `json:"monthEndDate"`
	YearStartDate   string `json:"yearStartDate"`
	YearEndDate     string `json:"yearEndDate"`
	ProfileHeadline string `json:"profileHeadline"`
	Description     string `json:"description"`
}

type NewExperience struct {
	UserID          string `json:"userId"`
	Title           string `json:"title"`
	EmploymentType  string `json:"employmentType"`
	CompanyName     string `json:"companyName"`
	Location        string `json:"location"`
	IsActive        bool   `json:"isActive"`
	Industry        string `json:"industry"`
	MonthStartDate  string `json:"monthStartDate"`
	MonthEndDate    string `json:"monthEndDate"`
	YearStartDate   string `json:"yearStartDate"`
	YearEndDate     string `json:"yearEndDate"`
	ProfileHeadline string `json:"profileHeadline"`
	Description     string `json:"description"`
}