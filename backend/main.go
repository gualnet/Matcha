package main

import (
	"fmt"
	"net/http"
	"os"
	"time"
	"flag"
	// "database/sql"
	"log"

	"github.com/gorilla/handlers"
	"github.com/gorilla/mux"

	models "matcha/models"
)

func main() {
	
	var host string
	var port string

	// var conditions = map[string]string{
	// 	// "UserId": "3",
	// 	"login": "test",
	// }
	var conditions = map[string]string{
		"login": 		"testInsert",
		"Age": 			"26",
		"FirstName": 	"test",
		"LastName":		"Insert",
	}

	var userModel models.Models
	userModel.TableName = "Users"

	// userModel.FindAll()
	// userModel.FindWhere(conditions)
	userModel.Insert(conditions)
	

	os.Exit(0)
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

	// Serve static assets directly.
	// r.PathPrefix("/dist/static").Handler(http.FileServer(http.Dir(static)))
	r.PathPrefix("/static/css/").HandlerFunc(distCssHandler())
	r.PathPrefix("/static/js/").HandlerFunc(distJsHandler())
	r.PathPrefix("/src").HandlerFunc(distSrcHandler())
	
	r.PathPrefix("/signin").HandlerFunc(signinHandler())
	
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

func signinHandler () func (w http.ResponseWriter, r *http.Request) {
	fn := func (w http.ResponseWriter, r *http.Request) {
		fmt.Println("signinHandler")	
		fmt.Println("method: " + r.Method)
		
			if r.Method == "POST" {
				r.ParseForm()
				fmt.Println(r.Form)
				fmt.Println("username", r.Form["login"])
				fmt.Println("password", r.Form["password"])
				http.ServeFile(w, r, "./validate.html")
			} else if r.Method == "GET" {
				r.ParseForm()
				fmt.Println(r.Form)
			}
	}
	return http.HandlerFunc(fn)
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