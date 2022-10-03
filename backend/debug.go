package main

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

// heartbeat
func Heartbeat(c *gin.Context) {
	c.JSON(http.StatusOK, gin.H{
		"status": "ok",
	})
}

// routes
func Routes(c *gin.Context) {
	RouteTo()

	c.JSON(http.StatusOK, gin.H{
		"status": "ok",
	})
}

// dumps all users
func GetUsers(c *gin.Context) {
	var users []User

	result := db.Preload("Team").Find(&users)
	if result.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": result.Error.Error(),
		})
		return

	}

	c.JSON(http.StatusOK, gin.H{
		"users": users,
	})
}

// get user
func GetUser(c *gin.Context) {
	var user User
	id := c.Param("id")

	result := db.Preload("Team").Preload("Days").First(&user, "id = ?", id)
	if result.Error != nil {
		c.JSON(http.StatusInternalServerError, gin.H{
			"error": result.Error.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"user": user,
	})
}

func Demo(c *gin.Context) {
	sugar.Debug("doing demo!")

	var user User
	db.First(&user, "id = ?", "zaid")

	user.Address = "699 120th Ave NE, Bellevue, WA 98005, United States"
	user.Coordinates = Coordinates{47.616012, -122.182592}

	db.Save(&user)
	sugar.Debugw("demo changed", "zaid", user)

	db.Delete(&Route{}, []uint{1, 2})
	RouteTo()

	sugar.Debugw("demo regen routes")
}
