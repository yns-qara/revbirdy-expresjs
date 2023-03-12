# Express Web App with MySQL Database

This is a Node.js web application built with Express.js that uses a MySQL database to store and retrieve data. The app reads the database configuration from a .env file.

## Installation

1. Clone this repository to your local machine.

```
git clone https://github.com/yns-qara/revbirdy-expresjs.git
cd revbirdy-expresjs
```

2. Install the dependencies.

```
npm install
```

3. Create a .env file in the root directory of the project and add your MySQL database configuration.

```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your-password
DB_NAME=your-database-name
```

4. Start the application.

```
node app.py
```


## Usage

Once the application is running, you can access it in your web browser by navigating to `http://localhost:3000/`. The home page displays a list of data retrieved from the database.

You can also interact with the database by sending HTTP requests to the appropriate endpoints. The following endpoints are available:

- `GET /`: Retrieves all data from the database.
- `GET /:id`: Retrieves data with the specified ID from the database.
- `POST /`: Creates a new data entry in the database.
- `PUT /:id`: Updates the data with the specified ID in the database.
- `DELETE /:id`: Deletes the data with the specified ID from the database.

To send a request to an endpoint, you can use a tool like cURL or a REST client like Postman.


