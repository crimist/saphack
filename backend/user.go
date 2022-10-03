package main

import (
	"gorm.io/gorm"
)

type User struct {
	gorm.Model
	ID string // username

	// user settings
	Name        string
	Mask        bool        // user would like riders to wear mask
	Address     string      // home address
	Coordinates Coordinates `gorm:"embedded"` // home coords
	Team        []*User     `gorm:"many2many:user;"`

	// money
	AvaiableReimbursement float32 // how much u have avaiable to reimburse, starts at 125 every month
	ToReimburse           float32 // how much the company will reimburse you, starts at 0 every month

	// lifetime stats
	CO2Saved   float64 // kg
	GasSaved   float64 // Liters
	MoneySaved float64 // $CAD (of Gas) (optional)
	Traveled   float64 // km

	// scheduling
	Schedule Schedule `gorm:"embedded"`
	RouteID  uint
}

func (u *User) BeforeCreate(tx *gorm.DB) (err error) {
	u.AvaiableReimbursement = 125

	return
}
