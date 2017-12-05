package handlers

import (
	"fmt"
	"net/http"
	"strings"
	"encoding/json"

	myModels "matcha/models"
)

func AuthConfHandler() func (w http.ResponseWriter, r *http.Request) {
	// fmt.Println("--> CALL AuthConfHandler")
	var userModel myModels.Models
	userModel.TableName = "Users"
	
	fn := func (w http.ResponseWriter, r *http.Request) {
		w.Header().Set("Access-Control-Allow-Origin", "*")
		w.Header().Set("Access-Control-Allow-Methods", "GET")

		fmt.Println("->" + r.URL.Path)
		splited := strings.Split(r.URL.Path, "/")
		// fmt.Println("SPLITED:")
		// for i := 0; i < len(splited); i++ {
		// 	fmt.Println(i, ": ", splited[i])
		// }

		cond := map[string]string {
			"UserToken": splited[3],
		}
		result := userModel.FindWhere(cond)
		fmt.Println("Result: ", result)
		i := 0
		for _ = range result {
			i++
		}
		if i != 1 {
			respMsg := map[string]string{"error": "invalid token"}
			json.NewEncoder(w).Encode(respMsg)
			return 
		}
		fmt.Println("Result0: ", result[0])
		result[0].Password = "*"
		json.NewEncoder(w).Encode(result[0])

		// condWhere := map[string]string{
		// 	"UserToken": result[0].UserToken,
		// }
		// condSet := map[string]string{
		// 	"UserToken": "Activated",
		// }
		// userModel.Update(condSet, condWhere)
	}

	return http.HandlerFunc(fn)
}