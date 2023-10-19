from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from databases import Database
from datetime import datetime
import json

URL_BANCO = "postgresql://kalimara:hitman@localhost/SIA"
banco_de_dados = Database(URL_BANCO)

app = FastAPI()

origens = ["http://localhost:5173"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origens,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/dashboard/lista/")
async def lista_culturas_dashboard():
    try:
        await banco_de_dados.connect()
        busca = "SELECT * FROM retornarTodasCulturasUsuarioDashboard('reidogado@agro.com.br');"
        resultado = await banco_de_dados.fetch_all(busca)

        culturas = list()
        for cultura in resultado:
            data = str(cultura["diacriacao"])
            data_formatada = datetime.fromisoformat(data)
            data_formatada = f"{data_formatada.day:02d}/{data_formatada.month:02d}/{data_formatada.year}"
            culturas.append({"nomeCultura": cultura["nomecultura"], "diaCriacao": data_formatada})
        
        return {"culturas": culturas}
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        await banco_de_dados.disconnect()

if __name__ == "__main__":
    import uvicorn
    
    # Adicionar o host = '0.0.0.0' após produção. Remover o reload.
    uvicorn.run("app:app", port=8000, reload=True) 