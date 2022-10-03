package main

import "net/url"

// 601 108th Ave NE Unit 1000, Bellevue, WA 98004, United States
var OfficeCoordinates = Coordinates{47.616137, -122.19681}

func RouteTo() {
	var days []Day
	var driverIDs []string
	var drivers []User
	var passengers []User

	db.Find(&days, "drive_to = true")

	for _, day := range days {
		driverIDs = append(driverIDs, day.UserID)
	}

	db.Where("id IN ?", driverIDs).Find(&drivers)
	sugar.Info(drivers)

	db.Where("id NOT IN ?", driverIDs).Find(&passengers)
	sugar.Info(passengers)

	paths := [][]User{}

	// start nodes
	for i, driver := range drivers {
		node := driver
		paths = append(paths, []User{})

		// sugar.Debugw("path for driver", "driver", driver.Name)

		for {
			lowest := float64(1000) // lowest dist
			lowestNode := User{}    // lowest next node

			for _, passenger := range passengers {
				dist := node.Coordinates.Distance(passenger.Coordinates)
				// sugar.Debugw("distance to passenger", "passenger", passenger.Name, "distance", dist)
				if dist < lowest {
					lowest = dist
					lowestNode = passenger
				}
			}

			// sugar.Debugw("got closest passenger", "passenger", lowestNode.Name, "distance", lowest)

			distOffice := node.Coordinates.Distance(OfficeCoordinates)
			// sugar.Debugw("distance to office", "distance", distOffice)
			if distOffice < lowest {
				// sugar.Debugw("office is closest", "office distance", distOffice)
				paths[i] = append(paths[i], node)
				break
			}

			// remove node from node list
			for i, passenger := range passengers {
				if passenger.ID == lowestNode.ID {
					passengers = append(passengers[:i], passengers[i+1:]...)
					// sugar.Debugw("deleted pa	ssenger (node)", "passenger", passenger.Name)
					break
				}
			}

			// do path append
			paths[i] = append(paths[i], node)

			// update node
			node = lowestNode
		}
	}

	for i, route := range paths {
		// sugar.Debugw("route", "index", i)

		r := Route{
			NavURL: "https://www.google.com/maps/dir/",
		}

		for _, user := range route {
			// sugar.Debugw("user", "name", user.Name)
			if user.Mask {
				r.Mask = true
			}

			r.MemberIDs = append(r.MemberIDs, user.ID)
			r.NavURL += url.QueryEscape(user.Address) + "/"
		}

		r.NavURL += "SAP+Concur,+108th+Avenue+Northeast+Unit+1000,+Bellevue,+WA,+USA/"

		db.Create(&r)
		sugar.Debugw("created route", "index", i, "route", r)

		for _, memberID := range r.MemberIDs {
			var user User
			db.Find(&user, "id = ?", memberID)

			// hardcode tuesdays lol
			user.RouteID = r.ID
			db.Save(&user)
		}
	}
}

func RouteFrom() {
	return
}
