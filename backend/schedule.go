package main

import (
	"database/sql"
	"fmt"
	"net/http"
	"strconv"
	"time"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

// Day represents a day in the schedule
type Day struct {
	gorm.Model
	UserID string

	// User inputs
	Arrive sql.NullTime // arrival time
	Leave  sql.NullTime // leave time (when work ends), nil means drive back not needed

	// if both the following are false we are a passenger that day
	DriveTo   bool // whether the user can drive to work that day
	DriveFrom bool // whether the driver will be driving back after work that day
}

type Schedule struct {
	Days []Day
}

func GetMeSchedule(c *gin.Context) {
	var user User
	id := c.Request.Header["Id"][0]

	result := db.Preload("Days").First(&user, "id = ?", id)
	if result.Error != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": result.Error.Error(),
		})
		return
	}

	days := make([]map[string]string, 5)

	for i, day := range user.Schedule.Days {
		days[i] = make(map[string]string)
		if day.Arrive.Valid {
			days[i]["arrive"] = day.Arrive.Time.Format("2006-01-02T15:04:05")
		} else {
			days[i]["arrive"] = ""
		}
		if day.Leave.Valid {
			days[i]["leave"] = day.Leave.Time.Format("2006-01-02T15:04:05")
		} else {
			days[i]["leave"] = ""
		}
		days[i]["driveto"] = strconv.FormatBool(day.DriveTo)
		days[i]["drivefrom"] = strconv.FormatBool(day.DriveFrom)
	}

	sugar.Debugw("", "going", days)

	c.JSON(http.StatusOK, gin.H{
		"days": days,
	})
}

func GetTeamSchedule(c *gin.Context) {
	var user User
	id := c.Request.Header["Id"][0]

	result := db.Preload("Team").First(&user, "id = ?", id)
	if result.Error != nil {
		c.JSON(http.StatusBadRequest, gin.H{
			"error": result.Error.Error(),
		})
		return
	}

	going := [5][]string{}
	times := [5][]string{}

	for _, teammate := range user.Team {
		db.Preload("Days").First(teammate, "id = ?", teammate.ID)

		for i, day := range teammate.Schedule.Days {
			if day.Arrive.Valid {
				going[i] = append(going[i], teammate.Name)
				times[i] = append(times[i], fmt.Sprintf("Arrives %v. Leaves %v.", day.Arrive.Time.Format(time.Kitchen), day.Leave.Time.Format(time.Kitchen)))
			}
		}
	}

	for i := 0; i < len(going); i++ {
		if going[i] == nil {
			going[i] = []string{""}
		}
	}

	for i := 0; i < len(times); i++ {
		if times[i] == nil {
			times[i] = []string{""}
		}
	}

	sugar.Debugw("", "going", going)
	sugar.Debugw("", "times", times)

	c.JSON(http.StatusOK, gin.H{
		"currentUser": user.Name,
		"users":       going,
		"times":       times,
	})
}
