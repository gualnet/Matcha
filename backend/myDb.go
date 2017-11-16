package main

import (
	"fmt"
	"database/sql"
	_ "github.com/go-sql-driver/mysql"
)

func InitDbConn () (*sql.DB){
	fmt.Println("start init")

	// dbDsn := "mysql:host=localhost:8889;dbname=db_matcha"
	dbDsn := "root:root@tcp(localhost:8889)/db_matcha"

	// db , err := mysql.MySQLDriver.Open(dbDsn)
	db , err := sql.Open("mysql", dbDsn)
	checkErr(err)
	defer db.Close()

	// fmt.Println("Db data:")
	// fmt.Println(db)
	// fmt.Println("PING:")
	// err = db.Ping()
	// checkErr(err)

	fmt.Println("End init")
	return db

}

func checkErr(err error) {
	if err != nil {
		fmt.Println("YA UNE ERREUR -> UserModel_struct!")
		panic(err)
	}
}