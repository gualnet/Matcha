package handlers

import (
	"fmt"
	"net/http"

	myModels "matcha/models"
	
)

func SigninHandler () func (w http.ResponseWriter, r *http.Request) {
	var userModel myModels.Models
	userModel.TableName = "Users"

	fn := func (w http.ResponseWriter, r *http.Request) {
		fmt.Println("signinHandler")	
		fmt.Println("method: " + r.Method)
		
			if r.Method == "POST" {
				r.ParseForm()
				fmt.Println(r.Form)
				fmt.Println("username", r.Form["login"])
				fmt.Println("password", r.Form["password"])

				var cond = map[string]string{
					"Login": r.FormValue("login"),
					"Password": r.FormValue("password"),
				}
				userModel.FindWhere(cond)


				http.ServeFile(w, r, "./validate.html")
			} else if r.Method == "GET" {
				r.ParseForm()
				fmt.Println(r.Form)
			}
	}
	return http.HandlerFunc(fn)
}