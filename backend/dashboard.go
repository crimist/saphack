package main

import (
	"net/http"
	"strconv"
	"time"

	"github.com/gin-gonic/gin"
)

func GetMyDashboard(c *gin.Context) {
	var user User
	id := c.Request.Header["Id"][0]

	result := db.Preload("Days").First(&user, "id = ?", id)
	if result.Error != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": result.Error.Error(),
		})
		return
	}

	sugar.Debugw("looking up route", "id", user.RouteID)

	var route Route
	db.Find(&route, user.RouteID)
	sugar.Debugw("serving route", "route", route)

	tripInfo := map[string]string{
		"arrive":     user.Schedule.Days[1].Arrive.Time.Format(time.Kitchen),
		"leave":      user.Schedule.Days[1].Leave.Time.Format(time.Kitchen),
		"mask":       strconv.FormatBool(route.Mask),
		"passengers": strconv.Itoa(len(route.MemberIDs)),
	}

	members := []string{}
	for _, id := range route.MemberIDs {
		var user User
		db.Find(&user, "id = ?", id)
		members = append(members, user.Name)
	}

	iframeURL := route.NavURL

	c.JSON(http.StatusOK, gin.H{
		"tripinfo": tripInfo,
		"members":  members,
		"url":      iframeURL,
	})
}
