package handlers

import (
	"fmt"
	"io"
	"strings"
	"time"
	"net/http"
	"net/smtp"
	"crypto/tls"
	"crypto/sha1"
	"encoding/json"
	"encoding/base64"

	myModels "matcha/models"
)

func SignupHandler() func (w http.ResponseWriter, r *http.Request) {
	fmt.Println("Call signup handler")
	var userModel myModels.Models
	userModel.TableName = "Users"

	fn := func (w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Methods", "PUT")
		var respMsg map[string]string

		if r.Method == "PUT" {
			r.ParseForm()
			fmt.Println(r.Form)
			fmt.Println("->" + r.URL.Path)

			splited := strings.Split(r.URL.Path, "/")
			fmt.Println(splited)

			//check if login or mail already exist
			var checkCond1 = map[string]string {
				"Login": splited[4],
			}
			result := userModel.FindWhere(checkCond1)
			fmt.Println("Result check cond1: [", result, "]")
			if result !=  nil {
				respMsg = map[string]string{"error": "Login already used"}
				fmt.Println("blabla00")
				json.NewEncoder(w).Encode(respMsg)
				return
				fmt.Println("blabla01")
			} else {
				var checkCond2 = map[string]string {
					"Mail": splited[5],
				}
				result = userModel.FindWhere(checkCond2)
				fmt.Println("Result check cond2: [", result, "]")
				if result !=  nil {
					respMsg = map[string]string{"error": "Mail already used"}
					fmt.Println("blabla00")
					json.NewEncoder(w).Encode(respMsg)
					return
					fmt.Println("blabla02")
				}
			}
			//if ok -> create new user in db 
			fmt.Println("Checks login-mail ok On ajoute le new user a la db")
			authToken := createConfirmToken()
			var cond = map[string]string {
				"FirstName": splited[3],
				"LastName":  splited[4],
				"Login":     splited[5],
				"Mail":      splited[6],
				"Password":  splited[7],
				// "Password":     encryptPwd(splited[7]),
				"UserToken": authToken,
			}
			userModel.Insert(cond)

			sendConfirmMail(splited[6], "clique ici : http://localhost:8080/#/mailvalidation/" + authToken + " ... ")
			}
			
		}
	return http.HandlerFunc(fn)
}

func createConfirmToken() (token string) {
	hasher := sha1.New()
	t := "matcha42" + time.Now().String() + "42matcha"
	io.WriteString(hasher, t)
	token = base64.URLEncoding.EncodeToString(hasher.Sum(nil))
	return token
}

func encryptPwd(pwd string) (Hpwd string) {
	hasher := sha1.New()
	t := "matcha42" + pwd + "42matcha"
	io.WriteString(hasher, t)
	Hpwd = base64.URLEncoding.EncodeToString(hasher.Sum(nil))
	return Hpwd
}

func sendConfirmMail(to string, body string) {
	fmt.Println("start func msg send")
	var userModel myModels.Models
	userModel.TableName = "Users"
	cond := map[string]string {
		"FirstName":	"mailer",
		"LastName":		"mailer",
		"Login":		"guillaume.aly@gmail.com",
		"UserId":		"13",
	}
	result := userModel.FindWhere(cond)
	from := "guillaume.aly@gmail.com"
	pass := result[0].Password
	to = "guillaumea1@msn.com" // redirection vers ma boite a virer
	msg := "From: " + from + "\n" +
		"To: " + to + "\n" +
		"Subject: test matcha\n\n" +
		body
	
	auth := smtp.PlainAuth("", from, pass, "smtp.gmail.com")
	
	tlsconfig := &tls.Config{
		InsecureSkipVerify: true,
		ServerName:         "smtp.gmail.com",
	}
	
	conn, err := tls.Dial("tcp", "smtp.gmail.com:465", tlsconfig) //set tls connexion
	checkErr(err, "signup_handler 002")
	client, err := smtp.NewClient(conn, "smtp.gmail.com") //set client details
	checkErr(err, "signup_handler 003")
	err = client.Auth(auth)
	checkErr(err, "signup_handler 004")
	err = client.Mail(from)
	checkErr(err, "signup_handler 005")
	err = client.Rcpt(to)
	checkErr(err, "signup_handler 006")
	Mw, err := client.Data()
	checkErr(err, "signup_handler 007")
	Mw.Write([]byte(msg)) //mail writer
	checkErr(err, "signup_handler 008")
	err = Mw.Close()
	checkErr(err, "signup_handler 009")
	client.Quit()	

	fmt.Println("End func msg send")
}

