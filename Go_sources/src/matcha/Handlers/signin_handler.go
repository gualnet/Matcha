package handlers

import (
	"fmt"
	"net/http"
	"net/smtp"
	"encoding/json"
	"strings"
	"strconv"
	"crypto/tls"

	myModels "matcha/models"
	// myStructs "matcha/Structs"
)

func SigninHandler () func (w http.ResponseWriter, r *http.Request) {
	// fmt.Println("signinHandler")	
	var userModel myModels.Models
	userModel.TableName = "Users"

	fn := func (w http.ResponseWriter, r *http.Request) {
		fmt.Println("method: " + r.Method)
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Methods", "GET, POST")
		w.Header().Set("Access-Control-Allow-Headers", "Accept, Content-Type, Content-Length, Accept-Encoding, X-CSRF-Token, Authorization")
		// w.Header().Set("Access-Control-Allow-Headers", "content-type, application/json;charset=UTF-8, text/plain. */*")
		w.Header().Set("Access-Control-Allow-Content-Type", "application/json;charset=UTF-8, text/plain. */*")
		if r.Method == "GET" {
			splited := strings.Split(r.URL.Path, "/")
			fmt.Println(splited)
			var cond = map[string]string{
				"Login": splited[3],
				"Password": splited[4],
			}
			//get user info in db
			res := userModel.FindWhere(cond)
			fmt.Println("RES: ", res)
			json.NewEncoder(w).Encode(res)
		} else if r.Method == "POST" {
			err := r.ParseForm()
			checkErr(err, "000")
			inputLogin := r.FormValue("Login")
			fmt.Println("inputLogin: ", inputLogin)
			
			cond := map[string]string {
				"Login": inputLogin,
			}
			result := userModel.FindWhere(cond)
			fmt.Println("00Res: ", result)
			if result == nil {
				cond = map[string]string {
					"Mail": inputLogin,
				}
				result = userModel.FindWhere(cond)
				fmt.Println("01Res: ", result)
				if result == nil {
					return // cred introuvable dans la bdd
				}
			}
			fmt.Println("Res: ", result)
			fmt.Println("Res[\"UserId\"]: ", result[0].UserId)

			token := createConfirmToken()

			condS := map[string]string {
				"UserToken": token,
				"Password": "NWQTJsw7zfSqp1&Ji982S%K&bjPciAih",
			}
			cond = map[string]string {
				"UserId": strconv.Itoa(int(result[0].UserId)),
			}
			userModel.Update(condS, cond)

			sendPwdResetMail(token)
			
			fmt.Println("BDD set on send : ", token)
			fmt.Println("************")
		}
	}
	return http.HandlerFunc(fn)
}

func sendPwdResetMail(token string) {
	fmt.Println("call send pwd rest mail")
	
	var userModel myModels.Models
	userModel.TableName = "Users"
	cond := map[string]string {
		"FirstName":	"mailer",
		"LastName":		"mailer",
		"Login":		"guillaume.aly@gmail.com",
		// "UserId":		"1",
	}
	result := userModel.FindWhere(cond)	
	from := "guillaume.aly@gmail.com"
	pass := result[0].Password
	to := "guillaumea1@msn.com"
	body := "bla bla like to reset your password : \n" +
	"http://localhost:8080/#/rstpwd/" + token
	msg := "From: " + from + "\n" +
	"To: " + to + "\n" +
	"Subject: test matcha\n\n" + body
	
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

func checkErr(err error, errMsg string) {
	if err != nil {
		fmt.Println("YA UNE ERREUR [" + errMsg + "]")
		panic(err)
	}
}

