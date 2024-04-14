
# Grocery Store Management API

This project is a backend API for managing a grocery store. It includes functionalities for both admin and user responsibilities. Admins can manage grocery items and inventory, while users can view available grocery items and place orders.

## Technologies Used
- **Node.js & Express**: For creating the server and API.
- **PostgreSQL**: As the database for storing grocery items and orders.
- **Docker**: For containerizing the application, ensuring consistent environments across deployments.

## Using Docker

### Prerequisites
Ensure Docker is installed on your system. You can check by running:



```bash
docker --version
```

Running with Docker
To set up and run the application using Docker, use the following commands:

```sh
# Build the Docker image:
docker-compose build

# Run the Docker containers:
docker-compose up

```

Testing with Docker
To test the API using curl, run the following commands:

Admin Responsibilities

Add New Grocery Item:

```sh
curl -X POST http://localhost:8001/admin/grocery-items -d '{"name":"Orange", "price":1.20, "inventory_level":100}' -H "Content-Type: application/json"
```

View Existing Grocery Items:

```sh 
curl -X GET http://localhost:8001/admin/grocery-items
```

Remove Grocery Item:

```sh 
curl -X DELETE http://localhost:8001/admin/grocery-items/{id}
```

Update Grocery Item:

```sh 
curl -X PUT http://localhost:8001/admin/grocery-items/{id} -d '{"price":1.50, "name":"Updated Name", "inventory_level":120}' -H "Content-Type: application/json"
```

Manage Inventory Levels:

```sh 
curl -X PATCH http://localhost:8001/admin/grocery-items/{id}/inventory -d '{"inventory_level":150}' -H "Content-Type: application/json"

```

User Responsibilities

View List of Available Grocery Items:

```sh 
curl -X GET http://localhost:8001/user/grocery-items
```

Book Multiple Grocery Items in a Single Order:

```sh 
curl -X POST http://localhost:8001/user/orders -d '{"items":[{"groceryItemId":1, "quantity":2}, {"groceryItemId":2, "quantity":3}]}' -H "Content-Type: application/json"
```

Without Docker
If you prefer not to use Docker, follow these steps for a manual setup:

Installing Dependencies

Ensure you have Node.js and npm installed. Check their versions to make sure they meet the project's requirements:

```sh 
node --version
npm --version
```

Install the required npm packages:

```sh 
npm install
```

Initializing the Database
Set up the PostgreSQL database and initialize it with the necessary tables and data:

```sh 
# Run SQL commands to create tables and seed data
psql -d database_name -a -f setup.sql
```

Running the Server
Start the server locally:

```sh 
npm start
```

Testing Manually

Use the same curl commands listed under the "Testing with Docker" section for manually testing the API after setting up your server and database locally.
