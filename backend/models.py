from pydantic import BaseModel
from typing import Optional

class User(BaseModel):
    name: str
    whatsapp: str
    pdogt_method: Optional[str] = None
    purchases: Optional[int] = 0