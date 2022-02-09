## Real time chat 
This is real time chat enables client and server to open connection with each other using socket.io <br />
We enable users to login and send a message with files to chat groups.



## Pre Installation
```preinstall
install node js version 16
install yarn
install mysql
```


## Installation
```bash

$ git clone git@github.com:yassminediab/armoney-task.git
$ yarn install
```

## Running the app

```bash
# development
$ yarn migrate:run
$ yarn start:dev
#
to run seed to create some users and chat group
http://localhost:3000/seeds
#
run application on port 3000
http://localhost:3000
```

## APIS
we have login API its enable user to login and we will return the jwt token in response you can use it to authenticate other APIS and user profile information </br>
![alt text](https://github.com/yassminediab/armoney-task/blob/main/assets/Screenshot%20from%202022-02-09%2020-02-37.png?raw=true)

We have upload image API you can upload image and get the file name and send it to send message socket
![alt text](https://github.com/yassminediab/armoney-task/blob/main/assets/Screenshot%20from%202022-02-09%2020-08-53.png?raw=true)

Finally we have sockets to send the message via connections between the client and server

![alt text](https://github.com/yassminediab/armoney-task/blob/main/assets/Screenshot%20from%202022-02-09%2020-25-18.png?raw=true)

As you can see in the screenshot you are sending the token in headers to authenticate the endpoint and we are sending the message to the socket and after receiving the message we are emitting an event to the clients for each user to let the client listen on it.
