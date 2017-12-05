package handlers

import (
	"fmt"
	"net/http"
	"strings"

	myModels "matcha/models"
)

func RstPwdHandler() func (w http.ResponseWriter, r *http.Request) {
	fn := func (w http.ResponseWriter, r *http.Request) {
		fmt.Println("URL -> ", r.URL.Path)
		var userModel myModels.Models
		userModel.TableName = "Users"
		
		splited := strings.Split(r.URL.Path, "/")
		// fmt.Println("SPLITED:")
		// for i := 0; i < len(splited); i++ {
		// 	fmt.Println(i, ": ", splited[i])
		// }
		condS := map[string]string {
			"UserToken": "",
		}
		condW := map[string]string {
			"UserToken": splited[3],
		}
		userModel.Update()
	}
	return http.HandlerFunc(fn)
}
