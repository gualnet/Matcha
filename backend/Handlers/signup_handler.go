package handlers

import (
	"encoding/json"
	"net/http"
	"fmt"
	"strings"

	myModels "matcha/models"
)

func SignupHandler () func (w http.ResponseWriter, r *http.Request) {
	fmt.Println("Call signup handler")
	var userModel myModels.Models
	userModel.TableName = "Users"

	fn := func (w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin", "*")
		var respMsg map[string]string

		if r.Method == "POST" {
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
			var cond = map[string]string {
				"FirstName": splited[2],
				"LastName":  splited[3],
				"Login":     splited[4],
				"Password":  splited[6],
				"Mail":      splited[5],
			}
			userModel.Insert(cond)
				
			}
			
		}
	fmt.Println("blabla03")
	return http.HandlerFunc(fn)
}