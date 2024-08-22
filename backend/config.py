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

def assign_ids():
    try:
        # Obtener todos los documentos que no tienen un '_id' en el formato correcto
        usuarios_sin_id = collection.find({"_id": {"$exists": False}})
        
        for usuario in usuarios_sin_id:
            new_id = generate_user_id()
            collection.update_one(
                {"_id": {"$exists": False}},
                {"$set": {"_id": new_id}}
            )
            print(f"Asignado ID {new_id} a usuario {usuario}")

        print("Asignación de IDs completada.")
    except Exception as e:
        print(f"Error al asignar IDs: {e}")

if __name__ == "__main__":
    assign_ids()