---
runme:
  id: 01HVBZDYJ80CQ3NY07ZK5FNS98
  version: v3
---

# Grocery Store Management API

This project is a backend API for managing a grocery store. It includes functionalities for both admin and user responsibilities. Admins can manage grocery items and inventory, while users can view available grocery items and place orders.

## Technologies Used
- **Node.js & Express**: For creating the server and API.
- **PostgreSQL**: As the database for storing grocery items and orders.
- **Docker**: For containerizing the application, ensuring consistent environments across deployments.

## Using Docker

### Prerequisites
Ensure Docker is installed on your system. You can check by running:

```sh {"id":"01HVBZK63TNGTNMH552WCWMCJZ"}

```bash
docker --version
```

Running with Docker
To set up and run the application using Docker, use the following commands:

```sh {"id":"01HVBZG3R8101J3VMG4HXRPV4G"}
# Build the Docker image:
docker-compose build

# Run the Docker containers:
docker-compose up

```

Testing with Docker
To test the API using curl, run the following commands:

Admin Responsibilities

Add New Grocery Item:

```sh {"id":"01HVBZMM5AR4R2SG6RMCPD6GXZ"}
curl -X POST http://localhost:8001/admin/grocery-items -d '{"name":"Orange", "price":1.20, "inventory_level":100}' -H "Content-Type: application/json"
```

View Existing Grocery Items:

```sh {"id":"01HVBZP20AXPZSTJ0X0STKEF0W"}
curl -X GET http://localhost:8001/admin/grocery-items
```

Remove Grocery Item:

```sh {"id":"01HVBZPBT402K680KJVFMPBWME"}
curl -X DELETE http://localhost:8001/admin/grocery-items/{id}
```

Update Grocery Item:

```sh {"id":"01HVBZQ5JNQ61V5R7TE4P0VG9T"}
curl -X PUT http://localhost:8001/admin/grocery-items/{id} -d '{"price":1.50, "name":"Updated Name", "inventory_level":120}' -H "Content-Type: application/json"
```

Manage Inventory Levels:

```sh {"id":"01HVBZQP59S9NPYCBHD9CACVJ5"}
curl -X PATCH http://localhost:8001/admin/grocery-items/{id}/inventory -d '{"inventory_level":150}' -H "Content-Type: application/json"

```

User Responsibilities

View List of Available Grocery Items:

```sh {"id":"01HVBZRCWAGSGVDF6CCJ17J911"}
curl -X GET http://localhost:8001/user/grocery-items
```

Book Multiple Grocery Items in a Single Order:

```sh {"id":"01HVC059NJK5Q1YZZZ32N3N0K3"}
curl -X POST http://localhost:8001/user/orders -d '{"items":[{"groceryItemId":1, "quantity":2}, {"groceryItemId":2, "quantity":3}]}' -H "Content-Type: application/json"
```

Without Docker
If you prefer not to use Docker, follow these steps for a manual setup:

Installing Dependencies

Ensure you have Node.js and npm installed. Check their versions to make sure they meet the project's requirements:

```sh {"id":"01HVC06XAEXGGW1W9Z27GMNCGH"}
node --version
npm --version
```

Install the required npm packages:

```sh {"id":"01HVC07HTHMQBFJKCX53Q2JB16"}
npm install
```

Initializing the Database
Set up the PostgreSQL database and initialize it with the necessary tables and data:

```sh {"id":"01HVC08649S8PV79758QTPJ0K0"}
# Run SQL commands to create tables and seed data
psql -d database_name -a -f setup.sql
```

Running the Server
Start the server locally:

```sh {"id":"01HVC08T3SR74MCPZWMCZNN2DE"}
npm start
```

Testing Manually

Use the same curl commands listed under the "Testing with Docker" section for manually testing the API after setting up your server and database locally.