# Backend judging notes

* Focuses
  * High performance (& scaleable)
  * Easy to deploy
  * Secure
* Backend is written in Go using high performance API framework & ORM
  * Database can easily be swapped out
* Fully dockeriszed including frontend making it easy to deploy
* Scable through sharding
* Secure
  * Users isolated to their team
  * Passwords hashed with bcrypt + salt
  * Docker
* Route calculation is performed using a greedy algorithm but could easily be tweaked for finer route control
  * Other metrics like CO2 etc.