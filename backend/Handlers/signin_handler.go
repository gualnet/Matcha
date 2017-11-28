package handlers

import (
	"fmt"
	"net/http"
	"encoding/json"
	"strings"

	// "github.com/gorilla/sessions"

	myModels "matcha/models"
	// myStructs "matcha/Structs"
)

func SigninHandler () func (w http.ResponseWriter, r *http.Request) {
	fmt.Println("signinHandler")	
	var userModel myModels.Models
	userModel.TableName = "Users"

	fn := func (w http.ResponseWriter, r *http.Request) {
		fmt.Println("method: " + r.Method)
		w.Header().Set("Access-Control-Allow-Origin", "*")
		// if r.Method == "POST" {
		// 	// r.ParseForm()
		// 	// fmt.Println(r.Form)
		// 	// fmt.Println("username", r.Form["login"])
		// 	// fmt.Println("password", r.Form["password"])
		// 	decoder := json.NewDecoder(r.Body)
		// 	var test myStructs.UserInfo
		// 	err := decoder.Decode(&test)
		// 	checkErr(err)
		// 	fmt.Print("--:>", test.Login, test.Password, "<:--")

		// 	//prepare user input for db request
		// 	var cond = map[string]string{
		// 		// "Login": test.Login,
		// 		// "Password": test.Password,
		// 		"FirstName": "name",
		// 	}
		// 	//get user info in db
		// 	res := userModel.FindWhere(cond)
		// 	// fmt.Println("RES: ", res)
		// 	json.NewEncoder(w).Encode(res)

		// } else 
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
		}
	}
	return http.HandlerFunc(fn)
}

func checkErr(err error) {
	if err != nil {
		fmt.Println("YA UNE ERREUR -> signin_handler!")
		panic(err)
	}
}