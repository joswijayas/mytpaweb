package emailconf

import (
	"fmt"

	"gopkg.in/gomail.v2"
)

func SendEmailVerification(link string, userEmail string) {
	email_component := gomail.NewMessage()
	email_component.SetHeader("From", "LinkhedIn Welcome Team <messages-noreply@linkhedin.com>")
	email_component.SetHeader("To", userEmail)
	email_component.SetHeader("Subject", "LinkhedIn Verification Confirmation")
	email_component.SetBody("text/html",fmt.Sprintf("<div>Hi <b>%s</b> Welcome to LinkhedIn</div><div>Please activate your account with this link <a href=%s>%s</a></div>", userEmail, link, link))

	emailing := gomail.NewDialer("smtp.gmail.com", 587, "jj.linkhedin@gmail.com", "jjlinkhedin123")
	if err := emailing.DialAndSend(email_component); err != nil{
		panic(err)
	}
}