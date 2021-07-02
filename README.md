# Final-project
Final project in Technigo Bootcamp, Spring 2021

# The project
BadenBaden is a bath tracker application that allows the users to create an account where they can save their bathing locations and rate the experience. 

Tech used in backend:
- Mongo Cloud Atlas for database hosting
- MongoDB as data storage
- Mongoose to define document structure in MongoDB
- MongoDB Compass and Postman for testing
- Heroku for backend server hosting
- Node.js as backend Javascript environment
- Express as framework

Endpoints:
- POST /register
  - creates a new user and returns error if user can't be created
- POST /login
  - authenticates that the user is registered and that the given password matches the stored one 
- POST /baths
  - creates bath with property values according to the user's input, such as name, coordinates and rating
- GET /baths
  - gets the user's previously stored baths and returns them sorted in descending order (new bath on top)

Tech used in frontend:
- React as frontend Javascript library
- Redux to manage state
- React Router for routing in React 
- CSS for styling
- Google Maps Javascript API to display google maps in BathMap-component
- @react-google-maps/api to simplify the usage of google maps API in the components
- npm package 'use-places-autocomplete' - a React hook based on the google maps API that autocompletes the user's input in the search bar and display place suggestions.

If I had more time I would create more reusable components and styling. 

My stretch goal for the project was (and still is) to display air and water temperature based on the user's location. I also want the user to be able to rate the bath place by a different set of attributes, like beach, cliffs, dock, kid friendly, dog friendly, parking, crowded etc. Another feature I would like is to share your baths with others and maybe be able to post a picture. I will keep working on that and optimize the code. 

# View it live 

Backend deployed on Heroku:
https://badenbaden.herokuapp.com/

Frontend deployed on Netlify:
https://badenbaden.netlify.app/