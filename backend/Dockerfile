FROM golang:latest

WORKDIR /app
COPY . .

RUN go build -v

EXPOSE 1337/tcp

RUN addgroup --system backend && adduser --system --ingroup backend --disabled-password backend 
USER backend:backend

CMD ["./backend"]
