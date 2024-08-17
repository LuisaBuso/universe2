import os
from pymongo import MongoClient
from dotenv import load_dotenv

# Cargar variables de entorno desde el archivo .env
load_dotenv()

# Obtener las credenciales y la URL desde las variables de entorno
username = os.getenv("MONGO_USERNAME")
password = os.getenv("MONGO_PASSWORD")
db_name = os.getenv("MONGO_DB_NAME")
cluster_url = os.getenv("MONGO_CLUSTER_URL")

# Construir la URL de conexión
url = f"mongodb+srv://{username}:{password}@{cluster_url}/{db_name}?retryWrites=true&w=majority&appName=Cluster0"

# Crear el cliente de MongoDB
client = MongoClient(url)

# Conectar a la base de datos y a la colección
db = client[db_name]
collection = db['datauser']
