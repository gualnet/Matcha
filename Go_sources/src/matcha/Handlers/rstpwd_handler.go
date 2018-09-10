package handlers

import (
	"fmt"
	"net/http"
	"strings"
	"encoding/json"

	"github.com/gorilla/mux"	

	myModels "matcha/models"
)

func RstPwdHandler() func (w http.ResponseWriter, r *http.Request) {
	fn := func (w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Headers", "Content-Type")
		// w.Header().Set("Access-Control-Allow-Methods", "GET, POST")
		
		var userModel myModels.Models
		userModel.TableName = "Users"
		
		if r.Method == "GET" {
			getRequest(w, r, userModel)
		} else if r.Method == "POST" {
			postRequest(w, r, userModel)
		}
	}
	return http.HandlerFunc(fn)
}

func getRequest(w http.ResponseWriter, r *http.Request, userModel myModels.Models) {
	fmt.Println("GET URL -> ", r.URL.Path)
	splited := strings.Split(r.URL.Path, "/")
	cond := map[string]string {
		"UserToken": splited[3],
	}
	res := userModel.FindWhere(cond)
	if res == nil {
		json.NewEncoder(w).Encode("false")
		fmt.Println("\n\n")
		return
	}
	fmt.Println("RES: ", res)
	json.NewEncoder(w).Encode("true")
	fmt.Println("\n\n")
	return
}

func postRequest(w http.ResponseWriter, r *http.Request, userModel myModels.Models) {
	fmt.Println("POST URL -> ", r.URL.Path)

	fmt.Println("**********************")
	fmt.Println("\n%v\n", r)
	fmt.Println("**********************")
	
	vars := mux.Vars(r)
	_ = vars
	
	fmt.Println("vars: ", vars)
	err := r.ParseForm()
	checkErr(err, "TEST")
	// var pw1 string
	// var pw2 string
	if stringvar, ok := vars["truc"]; ok {
		fmt.Println("truc: ", stringvar)
	} else {
		fmt.Println("truc: NOK")
	}
	// if stringvar, ok := vars["pw2"]; ok {
	// 	fmt.Println("pw2: ", stringvar)
	// }

	// err := r.ParseForm()
	// checkErr(err, "rstpwd 000")
	// fmt.Println("r.Form", r.Form)
	pwd1 := r.FormValue("truc")
	pwd2 := r.FormValue("password2")
	token := r.FormValue("token")
	fmt.Println("pwd1: ", pwd1, "pwd2: ", pwd2, "token: ", token)
	// if pwd1 != pwd2 {
	// 	json.NewEncoder(w).Encode("false")
	// 	return
	// }

	// condW := map[string]string {
	// 	"UserToken": token,
	// }
	// condS := map[string]string {
	// 	"Password": pwd1,
	// }
	// userModel.Update(condS, condW)
}