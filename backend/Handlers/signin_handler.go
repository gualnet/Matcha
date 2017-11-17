package handlers

import (
	"fmt"
	"net/http"
	"encoding/json"

	myModels "matcha/models"
)

func SigninHandler () func (w http.ResponseWriter, r *http.Request) {
	fmt.Println("signinHandler")	
	var userModel myModels.Models
	userModel.TableName = "Users"

	fn := func (w http.ResponseWriter, r *http.Request) {
		fmt.Println("method: " + r.Method)
		
			if r.Method == "POST" {
				// r.ParseForm()
				// fmt.Println(r.Form)
				// fmt.Println("username", r.Form["login"])
				// fmt.Println("password", r.Form["password"])

				//prepare user input for db request
				var cond = map[string]string{
					"Login": r.FormValue("login"),
					"Password": r.FormValue("password"),
				}
				//get user info in db
				res := userModel.FindWhere(cond)
				// fmt.Println("RES: ", res)
				json.NewEncoder(w).Encode(res)

			} else {
				// ???
			}
	}
	return http.HandlerFunc(fn)
}