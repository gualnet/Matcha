package models

import (
	"strings"
	"fmt"
	"database/sql"
	// "text/template"
)

type Models struct {
	DbConnexion	*sql.DB
	dbDsn		string
	TableName	string
}

func (m *Models) initDbConn() {
	m.dbDsn = "root:root@tcp(localhost:8889)/db_matcha"
	if m.DbConnexion == nil {
		fmt.Println("VUUUUUU")
		dbConn, err := sql.Open("mysql", m.dbDsn)
		checkErr(err)
		m.DbConnexion = dbConn
	}
}

func (m *Models) FindAll() {
	// println(m.DbConnexion)
	m.initDbConn()
	// println(m.DbConnexion)

	sqlReq := "SELECT * FROM " + m.TableName
	fmt.Println("My request [" + sqlReq + "]")


	stmt, err := m.DbConnexion.Prepare(sqlReq)
	checkErr(err)
	fmt.Println("Statement: ")
	fmt.Println(stmt)
	
	// result, err := stmt.Exec()
	result, err := stmt.Query()
	fmt.Println("Result: ")
	// fmt.Println(result.Next())
	for result.Next() {
		var UserId int
		var Login, Password, FirstName, LastName, Mail, Gender, Orientation	string

		err := result.Scan(&UserId, &Login, &Password, &FirstName, &LastName, &Mail, &Gender, &Orientation)
		checkErr(err)
		fmt.Println(UserId, Login, Password, FirstName, LastName, Mail, Gender, Orientation)
	}
}

func (m *Models) FindWhere(cond map[string]string ) {
	// println(m.DbConnexion)
	m.initDbConn()
	// println(m.DbConnexion)

	sqlReq := "SELECT * FROM " + m.TableName + " WHERE "
	var champsSlc []string
	for key, val := range cond {
		champsSlc = append(champsSlc, "`"+key+"`='"+val+"'")
		// fmt.Println(champsSlc)
	}
	sqlReq = sqlReq + strings.Join(champsSlc, " AND ")
	fmt.Println(sqlReq)
	
	stmt, err := m.DbConnexion.Prepare(sqlReq)
	checkErr(err)
	result, err := stmt.Query()
	checkErr(err)
	for result.Next() {
		var UserId int
		var Login, Password, FirstName, LastName, Age, Mail, Gender, Orientation	string
		
		err := result.Scan(&UserId, &Login, &Password, &FirstName, &LastName, &Age, &Mail, &Gender, &Orientation)
		checkErr(err)
		fmt.Println(UserId, Login, Password, FirstName, LastName, Age, Mail, Gender, Orientation)
	}
}

func (m *Models) Insert(cond map[string]string) {
	// println(m.DbConnexion)
	m.initDbConn()
	// println(m.DbConnexion)

	var column []string
	var value []string

	for key, val := range cond {
		column = append(column, "`"+ key + "`")
		// value = append(value, val)
		value = append(value, "'" + val + "'")
	}
	// fmt.Println(column, " | ", value)
	
	sqlReq := "INSERT INTO " + m.TableName + " ("
	sqlReq = sqlReq + strings.Join(column, ", ") + ") VALUES ("
	sqlReq = sqlReq + strings.Join(value, ", ") + ");"
	fmt.Println(sqlReq)

	stmt, err := m.DbConnexion.Prepare(sqlReq)
	checkErr(err)
	_, err = stmt.Exec()
	checkErr(err)
}

func (m *Models) Update(condSet, condWhere map[string]string) {
	// println(m.DbConnexion)
	m.initDbConn()
	// println(m.DbConnexion)

	var setSlc []string
	var whereSlc []string
	for key, val := range condSet {
		setSlc = append(setSlc, "`"+key+"`='"+val+"'")
	}
	// fmt.Println("set:", setSlc)
	for key, val := range condWhere {
		whereSlc = append(whereSlc, "`"+key+"`='"+val+"'")
	}
	// fmt.Println("where:", whereSlc)
	
	sqlReq := "UPDATE " + m.TableName + " SET "
	sqlReq = sqlReq + strings.Join(setSlc, ", ") + " WHERE "
	sqlReq = sqlReq + strings.Join(whereSlc, ", ") + ";"
	fmt.Println(sqlReq)

	stmt, err := m.DbConnexion.Prepare(sqlReq)
	checkErr(err)
	_, err = stmt.Exec()
	checkErr(err)
}

func (m *Models) Delete(cond map[string]string) {
	// println(m.DbConnexion)
	m.initDbConn()
	// println(m.DbConnexion)

	var champsSlc []string
	for key, val := range cond {
		champsSlc = append(champsSlc, "`"+key+"`='"+val+"'")
	}
	fmt.Println(champsSlc)
	
	sqlReq := "DELETE FROM " + m.TableName + " WHERE "
	sqlReq = sqlReq + strings.Join(champsSlc, " AND ") + ";"
	fmt.Println(sqlReq)

	stmt, err := m.DbConnexion.Prepare(sqlReq)
	checkErr(err)
	_, err = stmt.Exec()
	checkErr(err)
}

func checkErr(err error) {
	if err != nil {
		fmt.Println("YA UNE ERREUR -> Model_struct!")
		panic(err)
	}
}