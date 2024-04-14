import "dotenv/config";
import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

console.log("DATABASE_URL:", process.env.DATABASE_URL);
console.log("DB Details:", {
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
});

pool.query("SELECT NOW()", (err, res) => {
  if (err) {
    console.error("Error connecting to the database", err.stack);
  } else {
    console.log("Successful database connection", res.rows);
  }
});
async function addGroceryItem(
  name: string,
  price: number,
  inventory_level: number
) {
  const client = await pool.connect();
  try {
    const query =
      "INSERT INTO grocery_items (name, price, inventory_level) VALUES ($1, $2, $3) RETURNING *";
    const values = [name, price, inventory_level];
    const result = await client.query(query, values);
    return result.rows[0];
  } catch (error) {
    console.error("Database query error:", error);
  } finally {
    client.release();
  }
}

async function getAllGroceryItems() {
  const client = await pool.connect();
  try {
    const query = "SELECT * FROM grocery_items";
    const result = await client.query(query);
    return result.rows;
  } finally {
    client.release();
  }
}

async function removeGroceryItemById(id: number) {
  const client = await pool.connect();
  try {
    const query = "DELETE FROM grocery_items WHERE id = $1";
    const values = [id];
    await client.query(query, values);
  } finally {
    client.release();
  }
}

async function updateGroceryItemById(
  id: number,
  newItem: { name: string; price: number; inventory_level: number }
) {
  const client = await pool.connect();
  try {
    const { name, price, inventory_level } = newItem;
    const query =
      "UPDATE grocery_items SET name = $1, price = $2, inventory_level = $3 WHERE id = $4 RETURNING *";
    const values = [name, price, inventory_level, id];
    const result = await client.query(query, values);
    return result.rows[0];
  } finally {
    client.release();
  }
}

async function updateInventoryById(id: number, inventory_level: number) {
  const client = await pool.connect();
  try {
    const query =
      "UPDATE grocery_items SET inventory_level = $1 WHERE id = $2 RETURNING *";
    const values = [inventory_level, id];
    const result = await client.query(query, values);
    return result.rows[0];
  } finally {
    client.release();
  }
}

async function getAvailableGroceryItems() {
  const client = await pool.connect();
  try {
    const query = "SELECT * FROM grocery_items WHERE inventory_level > 0";
    const result = await client.query(query);
    return result.rows;
  } finally {
    client.release();
  }
}

async function createOrder(
  items: { groceryItemId: number; quantity: number }[]
) {
  const client = await pool.connect();
  try {
    await client.query("BEGIN");

    const orderResult = await client.query(
      "INSERT INTO orders DEFAULT VALUES RETURNING id"
    );
    const orderId = orderResult.rows[0].id;

    for (const item of items) {
      await client.query(
        "INSERT INTO order_items (order_id, grocery_item_id, quantity) VALUES ($1, $2, $3)",
        [orderId, item.groceryItemId, item.quantity]
      );
    }

    await client.query("COMMIT");
    return { orderId, items };
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
}

export {
  addGroceryItem,
  getAllGroceryItems,
  removeGroceryItemById,
  updateGroceryItemById,
  updateInventoryById,
  getAvailableGroceryItems,
  createOrder,
};
