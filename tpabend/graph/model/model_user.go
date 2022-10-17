package model

type NewUpdateUser struct {
	Name              string  `json:"name"`
	Email             string  `json:"email"`
	FirstName         string  `json:"firstName"`
	LastName          *string `json:"lastName"`
	Pronoun           *string `json:"pronoun"`
	Headline          *string `json:"headline"`
	Position          *string `json:"position"`
	Region            *string `json:"region"`
	About             *string `json:"about"`
	ProfilePicture    *string `json:"profilePicture"`
	BackgroundPicture *string `json:"backgroundPicture"`
}

type NewUser struct {
	Email    string `json:"email"`
	Password string `json:"password"`
}

type User struct {
	ID                string        `json:"id"`
	Name              string        `json:"name"`
	Email             string        `json:"email"`
	Password          string        `json:"password"`
	FirstName         string        `json:"firstName"`
	LastName          *string       `json:"lastName"`
	Pronoun           *string       `json:"pronoun"`
	Headline          *string       `json:"headline"`
	Position          *string       `json:"position"`
	Region            *string       `json:"region"`
	About             *string       `json:"about"`
	ProfilePicture    string        `json:"profilePicture"`
	BackgroundPicture *string       `json:"backgroundPicture"`
	IsActive          bool          `json:"isActive"`
	Experiences       []*Experience `json:"Experiences" gorm:"foreignKey:UserID"`
	Educations       []*Education 	`json:"Educations" gorm:"foreignKey:UserID"`
	Connection			[]*Connection	`json:"Connection" gorm:"foreignKey:User1ID;foreignKey:User2ID"`
	ConnectionRequest []*ConnectionRequest  `json:"ConnectionRequest" gorm:"foreignKey:SenderID;foreignKey:ReceiverID"`
	Comment              []*Comment           `json:"Comment" gorm:"foreignKey:CommenterID;"`
	LikeComment          []*LikeComment       `json:"LikeComment" gorm:"foreignKey:UserID"`
	Visits               []*User              `json:"Visit" gorm:"many2many:user_visits"`
	Follows              []*User              `json:"Follow" gorm:"many2many:user_follows"`
	Block                []*User              `json:"Block" gorm:"many2many:user_blocks"`
	// Notification         []*Notification      `json:"Notification" gorm:"foreignKey:FromUserID;foreignKey:ToUserID"`
}

type Connection struct {
	ID    string `json:"id"`
	User1 *User  `json:"user1"`
	User2 *User  `json:"user2"`
	User1ID string `json:"user1ID"`
	User2ID string `json:"user2ID"`
}

type ConnectionRequest struct {
	ID       string `json:"id"`
	Sender   *User  `json:"sender"`
	Receiver *User  `json:"receiver"`
	Message  string `json:"message"`
	SenderID string `json:"senderId"`
	ReceiverID string `json:"receiverId"`
}