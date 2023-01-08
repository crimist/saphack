# SAP hackathon: SAPshare

SAPShare is an eco-friendly ride-sharing app for the office with dynamic route mapping and team coordination features. 

Built for SAP Invitational Hackathon 2022: 1st Place

<!-- ## <u>Table of Contents</u> -->
## Contributors
* [Crimist](https://github.com/crimist) | Backend
* [Leonardo Ciappi (Lciappi)](https://github.com/Lciappi) | Frontend
* [Eric Lee (ikamino)](https://github.com/ikamino) | Both

[Jump to Demo](#demo)

## The Problem

> The SAP Invitational Hackathon was a Hackathon hosted for UBC, SFU, BCIT, and Northeastern University over two days, from October 1-2, 2022. 

Under an overall theme of growing team spirit at SAP, teams were given three "tracks," or challenges that they could handle. Our team decided to tackle the second challenge of three -> Go green at SAP. 

### Planning

We started by spending a significant amount of time brainstorming various eco-friendly projects that could be useful for the office, arriving and deciding on a ride-sharing app based on the location and difficulty of individual private transportation to the office. 

Of course, our first path of action was to find a strong incentive for the usability of our project.

In conducting "market research" and conversing with the various employees, volunteers and organizers of the hackathon itself, we learned and thought of a couple of things:
1. Many employees decided to take public transportation to the office, due to multiple reasons: 
- Not having access to a car
- The horrors of driving in Downtown Vancouver
- The price of parking at the office, of which the lot wasn't company owned, and as such, is a significantly large amount - ~$13 a day. 
2. We thought about the frequency of employees actually going into office, especially with the recent COVID-19 pandemic and WFH surge. This lead to the conclusion that most employees only went in when either required to, or for the social aspect. (People wouldn't go in if their team wasn't in/SAC employees as a whole came in on Tuesdays)
3. SAP employees were given a monthly transportation credit, to use towards gas, public transit, or parking - ~$120 a month. 

With all this information, we decided on a solution that would be able to solve/help solve most of these issues. 

### Product
Of course, SAPShare primarily keeps in mind the main track: going green, and the overall theme: bringing employees together. As such, within our planning, we unified two lists: Core Product, and Nice to Haves. 
### Core
Our Core Product was simple, a scalable ride sharing application that was made unique due to SAP incentives (that brought employees together). This meant employee authentication, dynamic route mapping, and a team scheduler (Assuming that a majority of team members would arrive/leave at the same times). 

Our primary incentive to both employees and company, outside of the eco-savings, was the money savings as well. Having users pool together their user credit meant drivers wouldn't have to spend as much, if any money out of pocket for transit, while passengers saved time compared to transit. With the employees saving so much, the company itself wouldn't have to reimburse quite as much. 

Our other incentive was a team scheduler - employees would be more incentivised to go to the office if they knew their teammates were going in, and employees would be more incentivised to use our application if they had the possibility of getting a (free) ride. Lastly, compared to any other ride-sharing app, employees would have the confidence of knowing that it was an employee exclusive application, removing the worry that may come from sharing with strangers. 

From there, it was all about designing a front-end that would show the user exactly what they needed, removing as many of the barriers as we could towards usage. 
### Nice to Haves
Here were many of the features/design that elevated our user experience, while not being essential to our product.  

Our UI greeted the user with vital information: all the benefits our application provided. The dashboard would detail the time they've saved (compared to a transit commute), the amount of CO2 saved, and the amount of money saved/credit remaining. 

Given the pandemic, we had options for user comfortability, such as a masks required option, and address scrubbing. 

We tried to avoid overloading the user with information, showing only the benefits, upcoming schedule, and route map. 

Lastly, our UI was mobile responsive, and most importantly, had a dark mode.

### Technologies

Our front-end was built using React and Material UI, while our original back-end was built using Go with Gin and Gorm.

#### **Backend**

The backend dynamically mapping routes with a greedy shortest-path algorithm based on the users and office address. Users are part of groups (teams) and can view each others statuses regarding ride sharing.

To achieve this in a short time frame I used Gorm, a flexible ORM, and Gin, a web framework. Due to the time constraints of a hackathon we couldn't implement all the features but given time we'd have like to included:

* SSO authentication.
* Team management (potentially automated).
* Address autofill and coordinate fetching with the google maps API.
* Improved and functioning statistics based on vehicle information (charts, montly recap, etc.).
* Configurable ride calculation algorithm (prefer time vs. gas usage etc.).
* Improved mapping software integration (support Waze and other mapping software).

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
