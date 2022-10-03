package main

import (
	"github.com/lib/pq"
)

type Route struct {
	ID uint

	Mask      bool           // whether a mask is required for this trip
	MemberIDs pq.StringArray `gorm:"type:text[]"`
	NavURL    string
}
