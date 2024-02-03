// Import required modules and set up the server
const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
const jwt = require("jsonwebtoken");

// Secret key for JWT authentication
const secretKey = "32CF98A49C85D2BF21D5C63C8E9CD";

// Create an instance of the Express application
const app = express();
const port = 3000;

// Database connection configuration
const db = mysql.createConnection({
  host: "127.0.0.1",
  user: "root",
  password: "911@ab#m",
  database: "mydatabase",
});

// Enable JSON parsing and CORS
app.use(express.json());
app.use(cors());

// Establish a connection to the database
db.connect();

// API endpoint to retrieve all users
app.get("/api/users", (req, res) => {
  // Retrieve all users from the database
  db.query("SELECT * FROM users", (error, results) => {
    if (error) throw error;
    res.json(results);
  });
});

// API endpoint to add a new user
app.post("/api/users", (req, res) => {
  // Extract user data from the request body
  const { id, username, email, password } = req.body;

  // Insert user data into the 'users' table
  db.query(
    "INSERT INTO users (id, username, email, password) VALUES (?, ?, ?, ?)",
    [id, username, email, password],
    (error, results) => {
      if (error) {
        // Handle duplicate entry error
        if (error.code === "ER_DUP_ENTRY") {
          console.error("Duplicate entry error:", error);
          res.status(400).json({ error: "Duplicate entry" });
        } else {
          console.error("Error inserting user into database:", error);
          res.status(500).json({ error: "Internal Server Error" });
        }
      } else {
        res.status(201).json({ message: "User created successfully" });
      }
    }
  );
});

// API endpoint for user login
app.post("/api/login", (req, res) => {
  // Extract username and password from the request body
  const { username, password } = req.body;

  // Query the database to check user credentials
  db.query(
    "SELECT id, isAdmin FROM users WHERE username = ? AND password = ?",
    [username, password],
    (error, results) => {
      if (error) {
        console.error("Error during login:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
      } else {
        if (results.length > 0) {
          // If credentials are valid, generate a JWT token
          const { id, isAdmin } = results[0];
          const token = jwt.sign({ userId: id, isAdmin }, secretKey, {
            expiresIn: "1h",
          });

          // Return token and user information
          res.status(200).json({
            success: true,
            message: "Authentication successful",
            token,
            userId: id,
            isAdmin: isAdmin,
          });
        } else {
          // If credentials are invalid, return authentication failure
          res.status(401).json({ success: false, message: "Authentication failed" });
        }
      }
    }
  );
});

// API endpoint to retrieve all items
app.get("/api/items", (req, res) => {
  // Retrieve all items from the 'items' table
  db.query("SELECT * FROM items", (error, results) => {
    if (error) {
      console.error("Error fetching items:", error);
      res.status(500).json({ success: false, message: "Internal Server Error" });
    } else {
      res.json(results);
    }
  });
});

// API endpoint to retrieve all tournaments
app.get("/api/tournaments", (req, res) => {
  // Retrieve all tournaments from the 'tournaments' table
  db.query("SELECT * FROM tournaments", (error, results) => {
    if (error) {
      console.error("Error fetching items:", error);
      res.status(500).json({ success: false, message: "Internal Server Error" });
    } else {
      res.json(results);
    }
  });
});

// API endpoint to add a new item
app.post("/api/items", (req, res) => {
  // Extract item data from the request body
  const { name, price, detail } = req.body;

  // Insert item data into the 'items' table
  db.query(
    "INSERT INTO items (name, price, detail) VALUES (?, ?, ?)",
    [name, price, detail],
    (error, results) => {
      if (error) {
        console.error("Error inserting item into database:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
      } else {
        res.status(201).json({ success: true, message: "Item created successfully" });
      }
    }
  );
});

// API endpoint to add a reservation
app.post("/api/reservation", (req, res) => {
  // Extract reservation data from the request body
  const { userId, startHour, endHour, selectedConsole } = req.body;

  // Insert reservation data into the 'reservation' table
  db.query(
    "INSERT INTO reservation (user_id, start_hour, end_hour, console_type) VALUES (?, ?, ?, ?)",
    [userId, startHour, endHour, selectedConsole],
    (error, results) => {
      if (error) {
        console.error("Error inserting reservation into database:", error);
        res.status(500).json({ error: "Internal Server Error" });
      } else {
        res.status(201).json({ message: "Reservation created successfully" });
      }
    }
  );
});

// API endpoint to add an item to the shopping bag
app.post("/api/add-to-cart", (req, res) => {
  // Extract item and user IDs from the request body
  const { itemId, userId } = req.body;

  // Insert item into the 'shopping_bag' table
  db.query(
    "INSERT INTO shopping_bag (user_id, item_id) VALUES (?, ?)",
    [userId, itemId],
    (error, results) => {
      if (error) {
        // Handle any errors during the database operation
        console.error("Error adding item to cart:", error);
        res.status(500).json({ success: false, error: "Internal Server Error" });
      } else {
        res.status(201).json({ success: true, message: "Item added to cart successfully" });
      }
    }
  );
});

// API endpoint to retrieve items in the shopping bag for a specific user
app.get("/api/items-in-shopping-bag/:user_id", (req, res) => {
  // Extract user ID from the request parameters
  const userId = req.params.user_id;

  // Retrieve items in the shopping bag for the specified user
  db.query(
    "SELECT items.* FROM items INNER JOIN shopping_bag ON items.id = shopping_bag.item_id WHERE shopping_bag.user_id = ?",
    [userId],
    (error, results) => {
      if (error) {
        console.error("Error retrieving items:", error);
        res.status(500).json({ error: "Internal Server Error" });
      } else {
        res.json(results);
      }
    }
  );
});

// API endpoint to retrieve items in the reservation for a specific user
app.get("/api/reservation/:userId", (req, res) => {
  // Extract user ID from the request parameters
  const userId = req.params.userId;

  // Retrieve items in the reservation for the specified user
  db.query(
    "SELECT * FROM reservation WHERE user_id = ?",
    [userId],
    (error, results) => {
      if (error) {
        console.error("Error fetching reservation items:", error);
        res.status(500).json({ error: "Internal Server Error" });
      } else {
        res.json(results);
      }
    }
  );
});

// API endpoint to retrieve items in the reservation for all users
app.get("/api/reservation", (req, res) => {
  // Retrieve all items in the reservation from the 'reservation' table
  db.query(
    "SELECT * FROM reservation",
    (error, results) => {
      if (error) {
        console.error("Error fetching reservation items:", error);
        res.status(500).json({ error: "Internal Server Error" });
      } else {
        res.json(results);
      }
    }
  );
});

// API endpoint to add a user to a tournament
app.post("/api/add-to-tournament", (req, res) => {
  // Extract user and tournament IDs from the request body
  const { userId, itemId } = req.body;

  // Insert user into the 'user_tournament_relationship' table
  db.query(
    "INSERT INTO user_tournament_relationship (user_id, tournament_id) VALUES (?, ?)",
    [userId, itemId],
    (error, results) => {
      if (error) {
        console.error("Error adding user to tournament:", error);
        res.status(500).json({ success: false, message: "Internal Server Error" });
      } else {
        res.status(201).json({ success: true, message: "User added to the tournament" });
      }
    }
  );
});

// API endpoint to add money to a user's account
app.post("/api/add-money", (req, res) => {
  // Extract user ID and money amount from the request body
  const { userId, money } = req.body;

  // Check if money is within the allowed range
  if (money > 100000) {
    return res.json({ success: false, message: "مقدار بیش از حد مجاز است" });
  }

  // Update the user's account balance in the database
  const sql =
    "UPDATE users SET account_balance = account_balance + ? WHERE id = ?";
  db.query(sql, [money, userId], (error, results) => {
    if (error) {
      console.error("Error updating account balance:", error);
      return res.json({ success: false, message: "خطا در افزایش موجودی" });
    }

    // Check if the update was successful
    if (results.affectedRows > 0) {
      return res.json({ success: true, message: "مبلغ به حساب شما اضافه شد" });
    } else {
      return res.json({ success: false, message: "خطا در افزایش موجودی" });
    }
  });
});

// API endpoint to retrieve the account balance of a user
app.get("/api/get-account-balance/:userId", (req, res) => {
  // Extract user ID from the request parameters
  const userId = req.params.userId;

  // Retrieve the user's account balance from the database
  const sql = "SELECT account_balance FROM users WHERE id = ?";
  db.query(sql, [userId], (error, results) => {
    if (error) {
      console.error("Error fetching account balance:", error);
      res.json({ success: false, message: "خطا در دریافت موجودی" });
    } else {
      if (results.length > 0) {
        const accountBalance = results[0].account_balance;
        res.json({ success: true, balance: accountBalance });
      } else {
        res.json({ success: false, message: "کاربر یافت نشد" });
      }
    }
  });
});

// API endpoint to add a new item
app.post("/api/add-item", (req, res) => {
  // Extract item data from the request body
  const { itemName, imageUpload, description, quantity, price } = req.body;

  // Insert item data into the 'items' table
  const sql =
    "INSERT INTO items (name, image_url, detail, amount, price) VALUES ( ?, ?, ?, ?, ?)";
  db.query(
    sql,
    [itemName, imageUpload, description, quantity, price],
    (error, results) => {
      if (error) {
        console.error("Error adding item to the database:", error);
        return res
          .status(500)
          .json({ success: false, message: "خطا در ثبت کالا در دیتابیس" });
      } else {
        return res
          .status(200)
          .json({ success: true, message: "کالا با موفقیت ثبت شد" });
      }
    }
  );
});

// API endpoint to add a new tournament
app.post("/api/add-tournament", (req, res) => {
  // Extract tournament data from the request body
  const tournamentData = req.body;

  const {
    userId,
    name,
    entryFee,
    imageUrl,
    selectedTime,
    selectedMonth,
    selectedDay,
    remainingSpots,
    detail,
  } = tournamentData;

  // Format date and time
  const formattedDate = `2024-${selectedMonth}-${selectedDay}`;
  const formattedTime = `${selectedTime}:00`;

  // SQL query to insert tournament data into the 'tournaments' table
  const query = `INSERT INTO tournaments (name, entryFee, image_url, date, time, remainingSpots, detail) VALUES (?, ?, ?, ?, ?, ?, ?)`;

  const values = [
    name,
    entryFee,
    imageUrl,
    formattedDate,
    formattedTime,
    remainingSpots,
    detail,
  ];

  try {
    // Execute the SQL query
    db.query(query, values, (error, results) => {
      if (error) {
        console.error("Error inserting tournament into database:", error);
        res.json({ success: false, message: "خطا در ثبت تورنومنت" });
      } else {
        res.json({ success: true, message: "تورنومنت با موفقیت ثبت شد" });
      }
    });
  } catch (error) {
    console.error("Error inserting tournament into database:", error);
    res.json({ success: false, message: "خطا در ثبت تورنومنت" });
  }
});

// API endpoint to retrieve user information by email
app.get("/api/get-user-info", (req, res) => {
  // Extract email from the query parameters
  const { email } = req.query;

  // SQL query to retrieve username and password from the 'users' table
  const query = "SELECT username, password FROM users WHERE email = ?";
  db.query(query, [email], (error, results) => {
    if (error) {
      console.error("Error querying database:", error);
      res.json({ exists: false });
    } else {
      if (results.length > 0) {
        // If user exists, return user information
        const userInfo = {
          username: results[0].username,
          password: results[0].password,
        };
        res.json({ exists: true, userInfo });
      } else {
        // If user does not exist, return not found
        res.json({ exists: false });
      }
    }
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
