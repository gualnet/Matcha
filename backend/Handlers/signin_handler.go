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
	// fmt.Println("signinHandler")	
	var userModel myModels.Models
	userModel.TableName = "Users"

	fn := func (w http.ResponseWriter, r *http.Request) {
		fmt.Println("method: " + r.Method)
		w.Header().Set("Access-Control-Allow-Origin", "*")
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

func checkErr(err error, errMsg string) {
	if err != nil {
		fmt.Println("YA UNE ERREUR [" + errMsg + "]")
		panic(err)
	}
}