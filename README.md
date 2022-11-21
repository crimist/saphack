# SAP hackathon: SAPshare

SAPShare is an eco-friendly ride-sharing app for the office with dynamic route mapping and team coordination features. 

Built for SAP Invitational Hackathon 2022: 1st Place

<!-- ## <u>Table of Contents</u> -->
## Contributors
* [Crimist](https://github.com/crimist) | Backend
* [Leonardo Ciappi (Lciappi)](https://github.com/Lciappi) | Frontend
* [Eric Lee (ikamino)](https://github.com/ikamino) | Both

## The Problem

> The SAP Invitational Hackathon was a Hackathon hosted for UBC, SFU, BCIT, and Northeastern University over two days, from October 1-2, 2022. 

Under an overall theme of growing team spirit at SAP, teams were given three "tracks," or challenges that they could handle. Our team decided to tackle the second challenge of three -> Go green at SAP. 

### Planning

We started by spending a significant amount of time brainstorming various eco-friendly projects that could be useful for the office, arriving and deciding on a ride-sharing app based on the location and difficulty of individual private transportation to the office. 

Of course, our first path of action was to find a strong incentive for the usability of our project.

In conducting "market research" and conversing with the various employees, volunteers and organizers of the hackathon itself, we learned a couple of things:
1. Many employees decided to take public transportation to the office 

A couple breakthroughs we had were as follows: 
1. In conducting "market research" and conversing with the various employees, volunteers and organizers of the hackathon itself, we learned that SAP itself 

## Demo

* Start server and frontend
* Run `/backend/demo.py`
* See routing change!

## Execution:

## "Production"

With docker-compose:

```sh
docker-compose up # -d for daemon
```

## Dev

### Backend

With go:

```sh
# in backend/
go run .
```

### Frontend

Install yarn:

```sh
# install node
yay -S nodejs # on Arch 
nvm install node # nvm manager
sudo apt-get install -y nodejs #linux
npm install --global yarn
```

Running with yarn:

```sh
yarn install # installs packages
yarn dev # start dev server
```
