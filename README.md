# SAP hackathon

This project landed us 1st place at SAPs first hackathon!

* [Crimist](https://github.com/crimist) | Backend
* [Leonardo Ciappi (Lciappi)](https://github.com/Lciappi) | Frontend
* [Eric Lee (ikamino)](https://github.com/ikamino) | Both

## Demo

* Start server and frontend
* Run `/backend/demo.py`
* See routing change!

## Execution

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
yay -S nodejs # on Arch btw

npm install --global yarn
```

Running with yarn:

```sh
yarn install # installs packages
yarn dev # start dev server
```
