package main

import (
	"database/sql"
	"time"
)

// generates demo db

func SetupDemo() {
	arrive3PM := sql.NullTime{Time: time.Date(2022, 10, 4, 15, 0, 0, 0, time.Local), Valid: true}
	arrive10_30AM := sql.NullTime{Time: time.Date(2022, 10, 4, 10, 30, 0, 0, time.Local), Valid: true}
	arrive8AM := sql.NullTime{Time: time.Date(2022, 10, 4, 8, 0, 0, 0, time.Local), Valid: true}
	leave5PM := sql.NullTime{Time: time.Date(2022, 10, 4, 17, 0, 0, 0, time.Local), Valid: true}

	users := []User{
		// car 1: unmasked (until cal)
		{ // Driver
			ID:                    "leo",
			Name:                  "Leo Jung",
			Mask:                  false,
			Address:               "17307 NE 13th Pl, Bellevue, WA 98008, United States",
			Coordinates:           Coordinates{47.621811, -122.108367},
			AvaiableReimbursement: 125,
			Schedule: Schedule{
				Days: []Day{
					{Arrive: arrive10_30AM,
						Leave: leave5PM,
					},
					{
						Arrive:    arrive8AM,
						Leave:     leave5PM,
						DriveTo:   true,
						DriveFrom: true,
					},
					{},
					{
						Arrive:    arrive8AM,
						Leave:     leave5PM,
						DriveTo:   true,
						DriveFrom: false,
					},
					{},
				},
			},
		},
		{
			ID:                    "taniyah",
			Name:                  "Taniyah Rocha",
			Mask:                  false,
			Address:               "16301 NE 8th St #261, Bellevue, WA 98008, United States",
			Coordinates:           Coordinates{47.616555, -122.123076},
			AvaiableReimbursement: 125,
			Schedule: Schedule{
				Days: []Day{
					{},
					{
						Arrive: arrive10_30AM,
						Leave:  leave5PM,
					},
					{},
					{
						Arrive: arrive10_30AM,
						Leave:  leave5PM,
					},
					{},
				},
			},
		},
		{
			ID:                    "xavier",
			Name:                  "Xavier Briggs",
			Mask:                  false,
			Address:               "12700 NE 8th St, Bellevue, WA 98005, United States",
			Coordinates:           Coordinates{47.617784, -122.169971},
			AvaiableReimbursement: 125,
			Schedule: Schedule{
				Days: []Day{
					{},
					{
						Arrive: arrive10_30AM,
						Leave:  leave5PM,
					},
					{
						Arrive: arrive3PM,
						Leave:  leave5PM,
					},
					{
						Arrive: arrive10_30AM,
						Leave:  leave5PM,
					},
					{},
				},
			},
		},

		// car 2: masked
		{ // Driver
			ID:                    "jorden",
			Name:                  "Jorden Montes",
			Mask:                  false,
			Address:               "2609 Evergreen Point Rd, Medina, WA 98039, United States",
			Coordinates:           Coordinates{47.633921, -122.239664},
			AvaiableReimbursement: 125,
			Schedule: Schedule{
				Days: []Day{
					{Arrive: arrive10_30AM,
						Leave:     leave5PM,
						DriveTo:   true,
						DriveFrom: true,
					},
					{
						Arrive:    arrive8AM,
						Leave:     leave5PM,
						DriveTo:   true,
						DriveFrom: true,
					},
					{},
					{
						Arrive:    arrive8AM,
						Leave:     leave5PM,
						DriveTo:   true,
						DriveFrom: true,
					},
					{
						Arrive: arrive8AM,
						Leave:  leave5PM,
					},
				},
			},
		},
		{
			ID:                    "zaid",
			Name:                  "Zaid Valdez",
			Mask:                  false,
			Address:               "8245 NE 22nd Pl, Clyde Hill, WA 98004, United States",
			Coordinates:           Coordinates{47.630593, -122.226994},
			AvaiableReimbursement: 125,
			Schedule: Schedule{
				Days: []Day{
					{
						Arrive: arrive10_30AM,
						Leave:  leave5PM,
					},
					{
						Arrive: arrive8AM,
						Leave:  leave5PM,
					},
					{},
					{
						Arrive: arrive8AM,
						Leave:  leave5PM,
					},
					{},
				},
			},
		},
		{ // passenger wants masks
			ID:                    "nayeli",
			Name:                  "Nayeli Hester",
			Mask:                  true,
			Address:               "1701 92nd Ave NE, Clyde Hill, WA 98004, United States",
			Coordinates:           Coordinates{47.625758, -122.218223},
			AvaiableReimbursement: 125,
			Schedule: Schedule{
				Days: []Day{
					{},
					{
						Arrive: arrive8AM,
						Leave:  leave5PM,
					},
					{},
					{},
					{},
				},
			},
		},
	}

	// all one team
	users[0].Team = []*User{&users[1], &users[2], &users[3], &users[4], &users[5]}
	users[1].Team = []*User{&users[0], &users[2], &users[3], &users[4], &users[5]}
	users[2].Team = []*User{&users[0], &users[1], &users[3], &users[4], &users[5]}
	users[3].Team = []*User{&users[4], &users[5], &users[0], &users[1], &users[2]}
	users[4].Team = []*User{&users[3], &users[5], &users[0], &users[1], &users[2]}
	users[5].Team = []*User{&users[3], &users[4], &users[0], &users[1], &users[2]}

	db.Create(users)
}
