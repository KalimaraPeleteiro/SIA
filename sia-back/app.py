from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from databases import Database
from datetime import datetime, date
import json
import aiohttp
import random


# Preparando o Banco
URL_BANCO = "postgresql://kalimara:hitman@localhost/SIA"
banco_de_dados = Database(URL_BANCO)


app = FastAPI()


# CORS
origens = ["http://localhost:5173"]
app.add_middleware(
    CORSMiddleware,
    allow_origins=origens,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# =================== FUNÇÕES ASSÍNCRONAS ===================
async def prever_safra(cultura):
    rota = "http://127.0.0.1:5000/previsao/safra/"

    # Por enquanto, vou gerar dados aleatórios.
    body = {
        "Cultura": cultura,
        "Ano": date.today().year,
        "Pesticidas (ton)": random.uniform(0.04, 110000.0),
        "Temperatura": random.uniform(0.0, 40.0),
        "Chuva Anual": random.uniform(50.0, 3000.0)
    }

    headers = {
        "Content-Type": "application/json"
    }

    async with aiohttp.ClientSession() as session:
        async with session.post(rota, data = json.dumps(body), headers = headers) as response:
            if response.status == 200:
                resultado = await response.json()
                return resultado
            elif response.status == 400:
                return "Erro de Cultura"


# =================== ROTAS DA API ===================

# Rota da página de Dashboard. Retorna uma lista das culturas do usuário.
# Por enquanto, considera o usuário como o usuário padrão: "reidoagro@agro.com.br"
@app.get("/dashboard/lista/")
async def lista_culturas_dashboard():
    try:
        await banco_de_dados.connect()
        busca = "SELECT * FROM retornarTodasCulturasUsuarioDashboard('reidogado@agro.com.br');"
        resultado = await banco_de_dados.fetch_all(busca)

        culturas = list()
        for cultura in resultado:
            data = str(cultura["datacriacao"])
            data_formatada = datetime.fromisoformat(data)
            data_formatada = f"{data_formatada.day:02d}/{data_formatada.month:02d}/{data_formatada.year}"
            culturas.append({"nomeCultura": cultura["nomecultura"], "diaCriacao": data_formatada})
        
        return {"culturas": culturas}
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        await banco_de_dados.disconnect()


# Retornando a lista de culturas na página de Culturas.
@app.get("/culturas/lista/")
async def lista_culturas_minhas_culturas():
    try:
        await banco_de_dados.connect()
        busca = "SELECT * FROM retornarListaCulturasDetalhes('reidogado@agro.com.br');"
        resultado = await banco_de_dados.fetch_all(busca)

        culturas = list()
        for cultura in resultado:

            previsao = await prever_safra(cultura["produtocultura"])

            if previsao == "Erro de Cultura":
                resposta_previsao = "Essa cultura não está disponível para previsão. Desculpe ;-;."
            else:
                resposta_previsao = previsao["Previsão"]

            data = str(cultura["datacriacao"])
            data_formatada = datetime.fromisoformat(data)
            data_formatada = f"{data_formatada.day:02d}/{data_formatada.month:02d}/{data_formatada.year}"
            culturas.append({"nomeCultura": cultura["nomecultura"], 
                             "produtoCultura": cultura["produtocultura"], 
                             "dataCriacao": data_formatada,
                             "analisePrevia": cultura["existeanalise"],
                             "estagioAnalise": cultura["estagio"],
                             "previsaoColheita": resposta_previsao})
                    
        return {"culturas": culturas}
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        await banco_de_dados.disconnect()


@app.get("/culturas/lavouras/")
async def lista_lavouras_minhas_culturas():
    try:
        await banco_de_dados.connect()
        busca = "SELECT * FROM Lavouras;"
        resultado = await banco_de_dados.fetch_all(busca)

        lavouras = list()

        for lavoura in resultado:
            lavouras.append({"id": lavoura["id"],
                             "Produto": lavoura["produto"]})
        
        return {"lavouras": lavouras}

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        await banco_de_dados.disconnect()


@app.post("/culturas/nova-cultura/")
async def criar_nova_cultura(dados: dict):
    try:
        await banco_de_dados.connect()

        # Cultura Criada
        comando = f"CALL novaCultura('{dados['nomeCultura']}', '{dados['produto']}')"
        await banco_de_dados.execute(comando)

        # Agora, vamos buscar pelo seu ID e ligá-la ao Usuário
        busca = f"SELECT * FROM obterIdCultura('{dados['nomeCultura']}')"
        resposta = await banco_de_dados.fetch_one(busca)

        comando = f"CALL adicionarCulturaAoUsuario({resposta['obteridcultura']}, 1)"
        await banco_de_dados.execute(comando)


        return JSONResponse(content={"Mensagem": "Post Bem-Sucedido"}, status_code=200)
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        await banco_de_dados.disconnect()
 

@app.post("/cultura_especifica/dados/")
async def dados_cultura(dados: dict):
    try:
        await banco_de_dados.connect()

        # Agora, vamos buscar pelo seu ID e ligá-la ao Usuário
        busca = f"SELECT * FROM obterIdCultura('{dados['nomeCultura']}')"
        resultado = await banco_de_dados.fetch_one(busca)

        segunda_busca = f"SELECT * FROM obterDetalhesCultura({resultado['obteridcultura']})"
        segundo_resultado = await banco_de_dados.fetch_one(segunda_busca)

        data_formatada = datetime.fromisoformat(str(segundo_resultado["datacriacao"]))
        data_formatada = f"{data_formatada.day:02d}/{data_formatada.month:02d}/{data_formatada.year}"

        if segundo_resultado["datainicio"] is not None:
            data_formatada_inicio = datetime.fromisoformat(str(segundo_resultado["datacriacao"]))
            data_formatada_inicio = f"{data_formatada_inicio.day:02d}/{data_formatada_inicio.month:02d}/{data_formatada_inicio.year}"
        else:
            data_formatada_inicio = None

        resposta = {
            "produto": segundo_resultado["produto"],
            "dataCriacao": data_formatada,
            "dataInicio": data_formatada_inicio,
            "culturaIniciada": True if data_formatada_inicio is not None else False,
            "existeAnalise": segundo_resultado["existeanalise"],
            "existeEstacao": segundo_resultado["existeestacao"],
            "melhorEstacao": False if segundo_resultado["tipoestacao"] != "Pro" else True,
            "ativo": segundo_resultado["ativo"]
        }
        
        return resposta 

    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        await banco_de_dados.disconnect()


if __name__ == "__main__":
    import uvicorn
    
    # Adicionar o host = '0.0.0.0' após produção. Remover o reload.
    uvicorn.run("app:app", port=8000, reload=True)  