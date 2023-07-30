from urllib.parse import urljoin
import os
from dotenv import load_dotenv

load_dotenv('.env.local')

TESTING = False
SECRET_KEY = os.getenv('SECRET_KEY')
BASE_URL = "http://localhost:3000/"
DOMAIN = "http://localhost:3000/"

SQLALCHEMY_DATABASE_URI = os.getenv('SQLALCHEMY_DATABASE_URI')
SQLALCHEMY_TRACK_MODIFICATIONS = False

