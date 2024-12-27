🏝️ Tourist Management System

📚 Project Overview

The Tourist Management System is a RESTful API built with Node.js, Express.js, and MongoDB, designed to manage attractions, visitors, and reviews seamlessly. It allows users to perform CRUD operations, leave reviews for attractions, and ensures data consistency with automated updates.

🚀 Key Features

🏞️ Attractions Module

Create Attraction: Add new tourist attractions with details like name, location, and entry fee .

Update Attraction: Modify details of existing attractions.

Delete Attraction: Remove attractions, ensuring related reviews are also deleted.

Top Rated Attractions: Fetch the top 5 attractions based on ratings (/api/attractions/top-rated).

Automatic Rating Update: Attraction ratings are recalculated whenever a review is added or removed.

👤 Visitors Module

Create Visitor: Register a visitor with name and email.

Update Visitor: Update visitor information.

Delete Visitor: Automatically removes all reviews left by the visitor upon deletion.

Visitor Activity: Fetch visitors along with the count of attractions they have reviewed (/api/visitors/activity).

📝 Reviews Module

Create Review: Visitors can review attractions if:

They have previously visited the attraction.

They have not already reviewed the attraction.

Update Review: Modify an existing review.

Delete Review: Removes the review and recalculates the attraction's rating.

⚙️ Endpoints Overview

🏞️ Attractions Routes

GET /api/attractions/top-rated → Get top 5 attractions.

POST /api/attractions → Create a new attraction.

PUT /api/attractions/:id → Update an attraction.

DELETE /api/attractions/:id → Delete an attraction.

👤 Visitors Routes

GET /api/visitors/activity → Get visitors with their activity count.

POST /api/visitors → Register a new visitor.

PUT /api/visitors/:id → Update visitor details.

DELETE /api/visitors/:id → Remove a visitor and their reviews.

📝 Reviews Routes

POST /api/reviews → Add a new review.

PUT /api/reviews/:id → Update an existing review.

DELETE /api/reviews/:id → Delete a review and update attraction rating.

🛠️ Tech Stack

Backend: Node.js, Express.js

Database: MongoDB

ORM: Mongoose

API Testing: Postman

📝 Setup Instructions

Clone the repository:

git clone <repository-url>

Install dependencies:

npm install

Start the server:

npm run dev

Access API at http://localhost:5000


Happy coding! 🚀🌟

