package main

import "math"

type Coordinates struct {
	Latitude  float64 // X
	Longitude float64 // Y
}

const NMIToKM = 1.852

func (c1 Coordinates) Distance(c2 Coordinates) float64 {
	radlat1 := float64(math.Pi * c1.Latitude / 180)
	radlat2 := float64(math.Pi * c2.Latitude / 180)

	theta := float64(c1.Longitude - c2.Longitude)
	radtheta := float64(math.Pi * theta / 180)

	dist := math.Sin(radlat1)*math.Sin(radlat2) + math.Cos(radlat1)*math.Cos(radlat2)*math.Cos(radtheta)
	if dist > 1 {
		dist = 1
	}

	dist = math.Acos(dist)
	dist = dist * 180 / math.Pi
	dist = dist * 60 * NMIToKM

	return dist
}
