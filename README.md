
# The Social Network {Gigs} <!-- omit in toc -->

> Table of Contents.

- [Overview](#overview)
- [MVP](#mvp)
  - [Goals](#goals)
  - [Libraries and Dependencies](#libraries-and-dependencies)
  - [Client (Front End)](#client-front-end)
    - [Wireframes](#wireframes)
    - [Component Tree](#component-tree)
    - [Component Hierarchy](#component-hierarchy)
    - [Component Breakdown](#component-breakdown)
    - [Time Estimates](#time-estimates)
  - [Server (Back End)](#server-back-end)
    - [ERD Model](#erd-model)
- [Post-MVP](#post-mvp)
- [Code Showcase](#code-showcase)
- [Code Issues & Resolutions](#code-issues--resolutions)

<br>

## Overview

_**The Social Network{Gigs}** is a social platform for {dev} professionals to network {and one day get developer jobs}. 


<br>

## MVP

> The application will be built with the following frameworks and languages:

_**The Social Network {Gigs}** MVP will consist of the following:_

### Server (Back End) <!-- omit in toc -->

- A **RESTful JSON API**.
  - A **Ruby on Rails** server, exposing RESTful JSON endpoints.
  - A database with at least 3 tables:
    - There will be least 1 association between your tables. (1:m _or_ m:m)
  - Utilize **Rails** to define models for interacting with the database.
  - Implement working generic controller actions for Full CRUD (`index`, `show`, `create`, `update`, `delete`) between your non-User tables 
    - _Note that if you choose to do Authentication, CRUD on your User table does not count toward this requirement._

### Client (Front End) <!-- omit in toc -->

- An interactive **React** app, built using `npx create-react-app`.
  - Have 8 separate, rendered components in an organized and understandable React file structure.
  - Utilize functional and class React components appropriately.
  - Utilize state and props in your components efficiently.
  - Use _only_ React for DOM Manipulation.
- Consume data from  **Ruby on Rails API**, and render that data in your components.
- **React Router**, for client-side routing.
- Demonstrates Full CRUD actions ( `index`, `show`, `create`, `update`, and `delete` ) on the front end.
  - _Note that if you decide to implement Auth, your full CRUD actions must be covered amongst your non-User tables._



<br>

### Goals

- _Have a login page,_
- _Create a User._
- _Update User Information._
- _Post Comments._
- _Edit._
- _Delete._

<br>

### Libraries and Dependencies

> All supporting libraries and dependencies, and their role in the project.

|     Library      | Description                                 | 
| :--------------: | :------------------------------------------ |
|      FE: React   | _To create the front end user interface._   | 
| FE: React Router | _will handle routes in the web application._ |
| BE: Ruby on Rails| _will be used to create the backend db._ |


<br>

### Client (Front End)

#### Wireframes

- Desktop. 
- Design will be responsive for mobile.

> Link: 
https://whimsical.com/ErTmcxH9ize2jegeiGmEuy

![Wireframe](images/wireframe.png)




#### Component Tree / Hierarchy

- React components directory/file of app.  
- The structure of how your React components are being rendered, showing which components are rendering the other components. 


``` structure

src
|__ components/
      |__ shared/ (components that would be shared across the layouts)
          |__ button.jsx ( generalized button UI in the app)
          |__ input.jsx ( generalized input UI in the app)
      |__ layout/ (the presentational UI)
          |__ auth/ (Handle all things authentication)
              |__ Login.jsx
              |__ Register.jsx
              |__ Profile.jsx
          |__ Article.jsx (Shows all articles)
          |__ Comment.jsx (Shows all comments)
          |__ userList.jsx (Display users/followers)
          |__ follow.jsx
          |__ unfollow.jsx
          |__ navigation/ (Handle all things navigation)
              |__ header.jsx
              |__ footer.jsx

|__ api/(Helpers files to organize business logic e.g API consumption)
    |__ apiclient.js 
   
|__ App.js (All components are imported in here)
|__ index.js ( Import App.js to index.js to render on the browser)


```

#### Component Breakdown

> Use this section to go into further depth regarding your components, including breaking down the components as stateless or stateful, and considering the passing of data between those components.

|  Component   |    Type    | state | props | Description                                                      |
| :----------: | :--------: | :---: | :---: | :--------------------------------------------------------------- |
|    Layout    | functional |   n   |   n   | _The header will contain the navigation, footer and logo._       |
|  Navigation  | functional |   n   |   n   | _The navigation will provide a link to each of the pages._       |
|   Login Page |   class    |   y   |   y   | _The gallery will render the posts using cards in flexbox._      |
| Create User  |   class    |   y   |   y   | _The cards will render the post info via props._                 |
|    Newsfeed  |   class    |   tba   |   tba   | _The will display random users._ |

#### Time Estimates

> Estimate time necessary to build out each of the components.

| Task                | Priority | Estimated Time | Time Invested | Actual Time |
| ------------------- | :------: | :------------: | :-----------: | :---------: |
| Add Login Page      |    H     |     6 hrs      |     x hrs     |     TBD     |
| Create User Page    |    H     |     6 hrs      |     x hrs     |     TBD     |
| Add Contact Form    |    L     |     6 hrs      |     x hrs     |     TBD     |
| Create DB           |    H     |     12 hrs      |     x hrs     |     TBD     |
| CSS                 |    M     |     6 hrs      |     x hrs     |     TBD     |
| TOTAL               |          |     36 hrs     |     x hrs     |     TBD     |



<br>

### Server (Back End)

#### ERD Model

> Link:
https://dbdiagram.io/d/5f31574f08c7880b65c5bbf1

![ERD Map](images/Gigs_ERD_Model.png)


- user to follows (many - many relationship)
- user to articles (one - many relationship)
- articles to comments (one to many relationship)
- user to comments(one to one relationship)

<br>

***

## Post-MVP

- Have a newsfeed!
- Have to create a user post, like, comment, on a user post.
- Post of jobs using zipcode/geo-location.

***

## Code Showcase

> Use this section to include a brief code snippet of functionality that you are proud of and a brief description.

## Code Issues & Resolutions

> Use this section to list of all major issues encountered and their resolution.
