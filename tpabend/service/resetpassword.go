package service

import (
	"crypto/rand"
	"fmt"
	"io"

	"gopkg.in/gomail.v2"
)

var table = [...]byte{'1', '2', '3', '4', '5', '6', '7', '8', '9', '0'}

func EncodeToString(max int) string {
	b := make([]byte, max)
	n, err := io.ReadAtLeast(rand.Reader, b, max)
	if n != max {
		panic(err)
	}
	for i := 0; i < len(b); i++ {
		b[i] = table[int(b[i])%len(table)]
	}
	return string(b)
}

func SendEmail(userEmail string, link string) {
	email_component := gomail.NewMessage()
	email_component.SetHeader("From", "LinkhedIn Team <jj.linkhedin@gmail.com>")

	email_component.SetHeader("To", userEmail)
	email_component.SetHeader("Subject", "Reset Password LinkHEdIn ")
	email_component.SetBody("text/html", fmt.Sprintf("<div><div>Please open this reset link.</div><div>%s</div><div>Enter this code to complete the reset.</div></div>", link))

	// emailing := gomail.NewDialer("smtp.gmail.com", 587, "jj.linkhedin@gmail.com", "iuhelnxcdsoruxse")
	// "noreply.linkhedin@gmail.com", "olypzmqlrgqapaxs"
	emailing := gomail.NewDialer("smtp.gmail.com", 587, "noreply.linkhedin@gmail.com", "olypzmqlrgqapaxs")
	if err := emailing.DialAndSend(email_component); err != nil{
		panic(err)
	}
}