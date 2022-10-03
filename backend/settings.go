package main

import (
	"net/http"

	"github.com/gin-gonic/gin"
)

func GetSelf(c *gin.Context) {
	var user User
	ids, ok := c.Request.Header["Id"]
	if !ok || len(ids) == 0 || len(ids[0]) == 0 {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": "invalid user ID",
		})
		return
	}
	id := ids[0]

	result := db.Preload("Team").First(&user, "id = ?", id)
	if result.Error != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": result.Error.Error(),
		})
		return
	}

	c.JSON(http.StatusOK, gin.H{
		"user": user,
	})
}

func UpdateSettings(c *gin.Context) {
	var user User
	id := c.Request.Header["Id"][0]

	result := db.First(&user, "id = ?", id)
	if result.Error != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": result.Error.Error(),
		})
		return
	}

	db.Save(&user)

	c.Status(http.StatusOK)
}
