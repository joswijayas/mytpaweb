package service

import (
	"fmt"

	"gopkg.in/gomail.v2"
)

func SendEmailVerification(userEmail string, link string) {
	email_component := gomail.NewMessage()
	email_component.SetHeader("From", "LinkhedIn Welcome Team <jj.linkhedin@gmail.com>")

	email_component.SetHeader("To", userEmail)
	email_component.SetHeader("Subject", "LinkhedIn Verification Confirmation")
	email_component.SetBody("text/html",fmt.Sprintf("<div>Hi <b>%s</b> Welcome to LinkhedIn</div><div>Please activate your account with this link <a href=%s>%s</a></div>", userEmail, link, link))

	// emailing := gomail.NewDialer("smtp.gmail.com", 587, "jj.linkhedin@gmail.com", "iuhelnxcdsoruxse")
	emailing := gomail.NewDialer("smtp.gmail.com", 587, "noreply.linkhedin@gmail.com", "olypzmqlrgqapaxs")
	if err := emailing.DialAndSend(email_component); err != nil{
		panic(err)
	}
}