package main

import (
	"fmt"
	"net/http"
	"os"
	"time"
	"flag"
	"log"

	"github.com/gorilla/handlers"
	"github.com/gorilla/mux"

	// myModels "matcha/models"
	myHandlers "matcha/handlers"
)

func main() {
	
	var host string
	var port string

	// var conditions = map[string]string{
	// 	"UserId": "3",
	// 	// "login": "test",
	// }
	// var condS = map[string]string{
	// 	"login": 		"testUpdate",
	// 	"Age": 			"62",
	// 	"FirstName": 	"test_updated",
	// 	"LastName":		"Insert_updated",
	// 	"Orientation":	"Bi",
	// 	"Gender": 		"Female",
	// }
	// var condW = map[string]string{
	// 	"UserId": "3",
	// }

	// var userModel myModels.Models
	// userModel.TableName = "Users"

	// userModel.FindAll()
	// userModel.FindWhere(conditions)
	// userModel.Insert(conditions)
	// userModel.Update(condS, condW)
	// userModel.Delete(conditions)
	

	// flag.StringVar(&entry, "entry", "./index.html", "the entrypoint to serve.")
	// flag.StringVar(&static, "static", ".", "the directory to serve static files from.")
	flag.StringVar(&host, "host", "127.0.0.1:", "the `host` to listen on.")
	flag.StringVar(&port, "port", "8000", "the `port` to listen on.")
	flag.Parse()

	fmt.Println("Server started..")
	fmt.Println("Listening on " + host + port)

	r := mux.NewRouter()
	
    // Note: In a larger application, we'd likely extract our route-building logic into our handlers
    // package, given the coupling between them.

	// It's important that this is before your catch-all route ("/")
	// api := r.PathPrefix("/api/v1/").Subrouter()
	// api.HandleFunc("/users", GetUsersHandler).Methods("GET")
	// Optional: Use a custom 404 handler for our API paths.
	// api.NotFoundHandler = JSONNotFound

	
	// Serve my routes
	r.PathPrefix("/api/signin").HandlerFunc(myHandlers.SigninHandler())
	r.PathPrefix("/api/signup").HandlerFunc(myHandlers.SignupHandler())
	
	// Serve static assets directly.
	r.PathPrefix("/static/css/").HandlerFunc(distCssHandler())
	r.PathPrefix("/static/js/").HandlerFunc(distJsHandler())
	r.PathPrefix("/src").HandlerFunc(distSrcHandler())
	// Catch-all: Serve our JavaScript application's entry-point (index.html).
	r.PathPrefix("/").HandlerFunc(indexHandler("./dist/index.html"))

	srv := &http.Server{
		Handler: handlers.LoggingHandler(os.Stdout, r),
		Addr:    host + port,
		// Good practice: enforce timeouts for servers you create!
		WriteTimeout: 15 * time.Second,
		ReadTimeout:  15 * time.Second,
	}
	
	log.Fatal(srv.ListenAndServe())
}

func distJsHandler() func(w http.ResponseWriter, r *http.Request){
	// fmt.Println("DistJsHandler")
	var fileToServer = "Empty"	
	fn := func(w http.ResponseWriter, r *http.Request){
		// r.ParseForm()
		// fmt.Print("Form: ")
		// fmt.Println(r.Form)
		// fmt.Println("Path: " + r.URL.Path)

		fileToServer = "./dist" + r.URL.Path
		
		fmt.Println("service de " + fileToServer)
		http.ServeFile(w, r, fileToServer)
	}
	return http.HandlerFunc(fn)
}
func distCssHandler() func(w http.ResponseWriter, r *http.Request){
	// fmt.Println("DistCssHandler")
	var fileToServer = "Empty"
	fn := func(w http.ResponseWriter, r *http.Request){
		r.ParseForm()
		// fmt.Print("Form: ")
		// fmt.Println(r.Form)
		// fmt.Println("Path: " + r.URL.Path)
		
		fileToServer = "./dist" + r.URL.Path
		
		fmt.Println("service de " + fileToServer)
		http.ServeFile(w, r, fileToServer)
	}
	return http.HandlerFunc(fn)
}
func distSrcHandler() func(w http.ResponseWriter, r *http.Request){
	// fmt.Println("DistSrcHandler")
	var fileToServer = "Empty"
	fn := func(w http.ResponseWriter, r *http.Request){
		r.ParseForm()
		// fmt.Print("Form: ")
		// fmt.Println(r.Form)
		// fmt.Println("Path: " + r.URL.Path)
		
		fileToServer = "." + r.URL.Path
		
		fmt.Println("service de " + fileToServer)
		http.ServeFile(w, r, fileToServer)
	}
	return http.HandlerFunc(fn)
}

func indexHandler(entrypoint string) func(w http.ResponseWriter, r *http.Request) {
	// fmt.Println("DistSrcHandler")	
	fn := func(w http.ResponseWriter, r *http.Request) {
		fmt.Println("service de index.html")
		http.ServeFile(w, r, entrypoint)
	}
	return http.HandlerFunc(fn)
}

// func getUsersHandler(w http.ResponseWriter, r *http.Request) {
// 	data := map[string]interface{}{
// 		"id": "12345",
// 		"ts": time.Now().Format(time.RFC3339),
// 	}

// 	b, err := json.Marshal(data)
// 	if err != nil {
// 		http.Error(w, err.Error(), 400)
// 		return
// 	}

// 	w.Write(b)
// }