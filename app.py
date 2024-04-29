from flask import Flask, request, jsonify,session, redirect, url_for
from flask_cors import CORS 
import psycopg2
from datetime import datetime
app = Flask(__name__)
CORS(app)

# Connection details for your PostgreSQL database
DB_HOST = "your_database_host"
DB_PORT = "your_database_port"
DB_NAME = "your_database_name"
DB_USER = "your_database_user"
DB_PASSWORD = "your_database_password"

# Establish connection to the database
def connect_to_database():
    try:
        conn = psycopg2.connect(
            dbname="defaultdb",
            user="avnadmin",
            password="AVNS_uV1YR-LVsdsphUfo5Uy",
            host="pg-sheraspace-prashantachowdhury967-b200.d.aivencloud.com",
            port=23896
        )
        print("Connected to the database successfully")
        return conn
    except psycopg2.Error as e:
        print("Error connecting to the database:", e)
        return None

@app.route("/", methods=['GET'])
def home():
    return "Hello World"

@app.route("/submit", methods=['POST'])
def submit():
    data = request.json
    # Connect to the database
    conn = connect_to_database()
    if conn:
        try:
            # Create a cursor to execute SQL queries
            cur = conn.cursor()
            # Insert data into the "queries" table
            cur.execute("INSERT INTO queries (email, name, query, createdat , updatedat ) VALUES (%s, %s, %s, %s, %s)", (data['email'], data['name'], data['query'], datetime.now(), datetime.now()))
            # Commit the transaction
            conn.commit()
            print("Data inserted successfully")
            return jsonify({"message": "Data received and inserted successfully"})
        except psycopg2.Error as e:
            print("Error inserting data:", e)
            return jsonify({"error": str(e)})
        finally:
            # Close the cursor and connection
            cur.close()
            conn.close()
    else:
        return jsonify({"error": "Failed to connect to the database"})
    
@app.route("/sessions", methods=['POST'])
def create_session():
    ip_address = request.remote_addr
    conn = connect_to_database()
    if conn:
        try:
            cur = conn.cursor()
            cur.execute("INSERT INTO sessions (ip_address) VALUES (%s)", (ip_address,))
            conn.commit()
            print("Session created successfully")
            return jsonify({"message": "Session created successfully"})
        except psycopg2.Error as e:
            print("Error creating session:", e)
            return jsonify({"error": str(e)})
        finally:
            cur.close()
            conn.close()
    else:
        return jsonify({"error": "Failed to connect to the database"})
    

def get_unanswered_queries():
    # Check if user is logged in
    if 'logged_in' not in session or not session['logged_in']:
        return redirect(url_for('login'))  # Redirect to login if not logged in
    # Connect to the database
    conn = connect_to_database()
    if conn:
        try:
            # Create a cursor to execute SQL queries
            cur = conn.cursor()
            # Fetch queries with unanswered questions
            cur.execute("SELECT * FROM queries WHERE answer IS NULL")
            queries = cur.fetchall()
            # Return queries as JSON response
            return jsonify({"queries": queries})
        except psycopg2.Error as e:
            print("Error executing SQL query:", e)
            return jsonify({"error": str(e)})
        finally:
            # Close the cursor and connection
            cur.close()
            conn.close()
    else:
        return jsonify({"error": "Failed to connect to the database"})

# Route for logging out
@app.route("/logout", methods=['GET'])
def logout():
    # Clear session
    session.clear()
    return redirect(url_for('login'))  # Redirect to login page

if __name__ == '__main__':
    app.run(debug=True)
