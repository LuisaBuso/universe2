from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI, HTTPException, Query
from typing import List, Optional
from config import collection  
from bson import ObjectId
import uuid
from pydantic import BaseModel

app = FastAPI()

# Configuración de CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Modelo de datos para Pydantic
class User(BaseModel):
    first_name: str  # Asegúrate de que este campo coincida con el de tu base de datos
    phone: str  # Asegúrate de que este campo esté presente
                #poner todos los campos!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
# Función para generar un ID único
def generate_unique_id():
    return str(uuid.uuid4())

# Crear o actualizar un usuario
# @app.post("/clientes/", response_model=dict)
# def crear_o_actualizar_usuario(user: User):
#     try:
#         # Buscar si el usuario ya existe por el campo 'phone'
#         existing_user = collection.find_one({"phone": user.phone})

#         if existing_user:
#             # Actualizar los datos del usuario existente
#             updated_data = {k: v for k, v in user.dict().items() if v is not None}
#             collection.update_one({"phone": user.phone}, {"$set": updated_data})
#             return {"message": "Usuario actualizado exitosamente"}
#         else:
#             # Crear un nuevo usuario si no existe
#             user_data = user.dict()
#             user_data["unique_id"] = generate_unique_id()  # Generar unique_id
#             collection.insert_one(user_data)
#             return {"message": "Usuario creado exitosamente"}

#     except Exception as e:
#         print(f"Error al crear o actualizar usuario: {e}")
#         raise HTTPException(status_code=500, detail=str(e))

@app.get("/clientes/", response_model=List[dict])
def obtener_clientes():
    try:
        clientes = collection.find()
        lista_clientes = []

        for cliente in clientes:
            cliente['_id'] = str(cliente['_id'])  # Convertir ObjectId a str
            lista_clientes.append(cliente)

        if not lista_clientes:
            raise HTTPException(status_code=404, detail="No se encontraron clientes en la base de datos")

        return lista_clientes

    except Exception as e:
        print(f"Error al obtener clientes: {e}")
        raise HTTPException(status_code=500, detail=str(e))


    

@app.put("/clientes/{id}", response_model=dict)
def actualizar_usuario(id: str, user: User):
    try:
        # Verificar si el usuario existe
        existing_user = collection.find_one({"id": id})

        if existing_user:
            # Actualizar el usuario existente
            updated_data = {k: v for k, v in user.dict().items() if v is not None}
            result = collection.update_one({"id": id}, {"$set": updated_data})

            if result.modified_count:
                return {"message": "Usuario actualizado exitosamente"}
            else:
                raise HTTPException(status_code=404, detail="No se encontraron cambios para actualizar")
        else:
            # Si el usuario no existe, puedes optar por crear uno nuevo
            # collection.insert_one(user.dict())
            raise HTTPException(status_code=404, detail="Usuario no encontrado")

    except Exception as e:
        print(f"Error al actualizar usuario: {e}")
        raise HTTPException(status_code=500, detail=str(e))

# Actualizar un usuario existente
# @app.put("/clientes/{unique_id}", response_model=dict)
# def actualizar_usuario(unique_id: str, user: User):
#     try:
#         updated_data = {k: v for k, v in user.dict().items() if v is not None}
#         result = collection.update_one({"unique_id": unique_id}, {"$set": updated_data})

#         if result.modified_count:
#             return {"message": "Usuario actualizado exitosamente"}
#         else:
#             raise HTTPException(status_code=404, detail="No se encontró el usuario o no hubo cambios")

#     except Exception as e:
#         print(f"Error al actualizar usuario: {e}")
#         raise HTTPException(status_code=500, detail=str(e))

# Eliminar un usuario por ID
@app.delete("/clientes/{unique_id}", response_model=dict)
def eliminar_usuario(unique_id: str):
    try:
        result = collection.delete_one({"unique_id": unique_id})

        if result.deleted_count:
            return {"message": "Usuario eliminado exitosamente"}
        else:
            raise HTTPException(status_code=404, detail="No se encontró el usuario")

    except Exception as e:
        print(f"Error al eliminar usuario: {e}")
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/clientes/count", response_model=dict)
def contar_clientes():
    try:
        total_clientes = collection.count_documents({})
        return {"total_clientes": total_clientes}
    except Exception as e:
        print(f"Error al contar clientes: {e}")
        raise HTTPException(status_code=500, detail=str(e))

