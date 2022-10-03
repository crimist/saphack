package main

import (
	"fmt"

	"github.com/gin-gonic/gin"
	"go.uber.org/zap"
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

const PORT = 1337

var (
	sugar *zap.SugaredLogger
	db    *gorm.DB
)

func main() {
	// logger setup
	logger, err := zap.NewDevelopment()
	if err != nil {
		panic("failed to create logger")
	}
	defer logger.Sync()
	sugar = logger.Sugar()

	// database setup
	db, err = gorm.Open(sqlite.Open("database.db"), &gorm.Config{})
	if err != nil {
		sugar.Fatalln("failed to open database")
	}

	// demo setup
	db.Migrator().DropTable(&User{}, &Day{}, &Route{})
	db.AutoMigrate(&User{}, &Day{}, &Route{})

	SetupDemo()
	RouteTo()

	// routing
	router := gin.Default()
	router.Use(CORSAllowAll()) // TODO: proper auth

	// debug
	router.GET("/heartbeat", Heartbeat)
	router.GET("/users", GetUsers)
	router.GET("/user/:id", GetUser)
	router.GET("/routes", Routes)

	// real
	router.GET("/self", GetSelf) // TODO: should be /user/self
	router.GET("/user/me/schedule/team", GetTeamSchedule)
	router.GET("/user/me/schedule", GetMeSchedule)
	router.GET("/user/me/dashboard", GetMyDashboard)
	router.GET("/demo", Demo)

	// listen
	sugar.Infow("listening on", "port", PORT)
	err = router.Run(fmt.Sprintf(":%v", PORT))
	if err != nil {
		sugar.Fatalw("failed to listen", "port", PORT, "err", err)
	}
}
