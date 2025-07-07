import mysql.connector
from mysql.connector import Error
from dotenv import load_dotenv
import os

load_dotenv()

def  connection_to_db():
    try:
        connection = mysql.connector.connect(
            host = os.getenv('DB_host'),
            database = os.getenv('DB_name'),
            user = os.getenv('DB_user'),
            password = os.getenv('DB_password')
        )
        return connection
    except Error as e:
        print("Connecting error: ", e)
        return None