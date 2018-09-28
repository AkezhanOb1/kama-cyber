package main

import (
	"net/http"
		"./db"
	"gopkg.in/mgo.v2/bson"
		"fmt"
	"encoding/json"
		"log"
	"github.com/sclevine/agouti"
)

type Users struct {
	 Id bson.ObjectId `bson:"_id"`
	 UserID string `bson:"userid"`
	 UserPassword string `bson:"userPassword"`
}

type User struct {
	UserID string `json:"userId"`
	UserPassword string `bson:"userPassword"`
}

func main() {
	http.HandleFunc("/", index)
	http.HandleFunc("/api/users", users)
	http.ListenAndServe(":8080", nil)
}

func index(w http.ResponseWriter, r *http.Request){
	w.Write([]byte("Kama HELLO"))
}

func users(w http.ResponseWriter, r *http.Request){
	collection := db.MongoSession.DB("zimbra").C("users")

	if r.Method == "POST" {
		decoder := json.NewDecoder(r.Body)
		var data User
		err := decoder.Decode(&data)
		if err != nil {
			panic(err)
		}
		res := Checker(data.UserID, data.UserPassword)
		if res != nil {
			w.WriteHeader(500)
			return
		}
		w.WriteHeader(211)
		collection.Insert(data)

	}else {
		query  := bson.M{}
		users := []Users{}
		collection.Find(query).All(&users)
		jsonedUser, err := json.Marshal(users)
		if err != nil {
			fmt.Println(err)
			return
		}

		w.Write([]byte(jsonedUser))
	}
}

func Checker(id string, password string) error {
	//driver := agouti.ChromeDriver()
	driver := agouti.ChromeDriver(
		agouti.ChromeOptions("args", []string{"--headless", "--disable-gpu", "--no-sandbox"}),
	)

	if err := driver.Start(); err != nil {
		log.Fatal("Failed to start driver:", err)
	}

	page, err := driver.NewPage()
	if err != nil {
		log.Fatal("Failed to open page:", err)
	}

	if err := page.Navigate("https://mail.iitu.kz/zimbra/"); err != nil {
		log.Fatal("Failed to navigate:", err)
	}

	err = page.FindByID(`username`).Fill(id)
	if err != nil {
		driver.Stop()
		fmt.Println(err)
		return err
	}

	err = page.FindByID(`password`).Fill(password)
	if err != nil {
		driver.Stop()
		fmt.Println(err)
		return err
	}

	err = page.FindByClass(`ZLoginButton`).Click()
	if err != nil {
		driver.Stop()
		fmt.Println(err)
		return err
	}

	err = page.FindByID(`C0`).Click()
	if err != nil {
		driver.Stop()
		fmt.Println(err)
		return err

	}

	if err := driver.Stop(); err != nil {
		return err
	}
	return nil
}