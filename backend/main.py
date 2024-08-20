from fastapi.middleware.cors import CORSMiddleware
from fastapi import FastAPI, HTTPException,Query
from typing import List,Optional
from config import collection  
from bson import ObjectId

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # Cambia esto al puerto de tu frontend
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/clientes/", response_model=List[dict])
def obtener_clientes():
    try:
        # Verificar el tipo de 'collection'
        print(f"Tipo de 'collection': {type(collection)}")

        # obtener todos datos de la coleccion
        clientes = collection.find()

        # Convertir los ObjectId a str para poder que los lea correctamente fastapi
        lista_clientes = []
        for cliente in clientes:
            cliente['_id'] = str(cliente['_id'])  # esta linea convierte objectid a str
            lista_clientes.append(cliente)

        # Verificar si la lista está vacía
        if not lista_clientes:
            raise HTTPException(status_code=404, detail="No se encontraron clientes en la base de datos")

        return lista_clientes
    
    except Exception as e:
        # Registrar el error en la consola
        print(f"Error al obtener clientes: {e}")
        # Lanzar una excepción HTTP 500 con detalles del error
        raise HTTPException(status_code=500, detail=str(e))


#endpoint para filtrar por atributos
@app.get("/clientes/filtrar/", response_model=List[dict])
def filtrar_clientes(textura: Optional[str] = None, densidad: Optional[str] = None, porosidad: Optional[str] = None,plasticidad: Optional[str] = None,hebra: Optional[str] = None,oleosidad: Optional[str] = None,permeabilidad: Optional[str] = None):
    query = {}
    if textura:
        query["textura"] = textura
    if densidad:
        query["densidad"] = densidad
    if porosidad:
        query["porosidad"] = porosidad
    if porosidad:
        query["plasticidad"] = plasticidad
    if porosidad:
        query["hebra"] = hebra
    if porosidad:
        query["oleosidad"] = oleosidad
    if porosidad:
        query["permeabilidad"] = permeabilidad    

        print("Consulta MongoDB:", query)               
    
    clientes = collection.find(query)
    lista_clientes = [cliente for cliente in clientes]
    return lista_clientes

