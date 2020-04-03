# movie-analyst-api
API for the movie analyst application of the jenkins ramp up


Bear in mind that you would need to pass the connection data to the application for it to work, check the code, the environment variables are there :D

## Attributions
Application developed based on this post https://scotch.io/tutorials/building-and-securing-a-modern-backend-api

## To start the containers
### MySQL

        cd docker/
        sudo docker-compose up -d

### Movies API

        docker build -t jpazb/movie-api .
        docker run -p 3000:3000 -d jpazb/movie-api
        docker run -it -d -p 3000:3000 jpazb/movie-api

