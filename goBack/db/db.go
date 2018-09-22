package db

import (
	"gopkg.in/mgo.v2"
	"fmt"
	)


var MongoSession *mgo.Session

func init() {
	var err error
	MongoSession, err = mgo.Dial("mongodb://127.0.0.1:27017")
	if err != nil {
		panic("DATA BASE CONNECTION ERROR")
	}
	if err = MongoSession.Ping(); err != nil {
		panic(" DATA BASE PING ERROR")
	}

	fmt.Println("SUCCESSFULLY CONNECTED")
}
