from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse, FileResponse
from databases import Database
from datetime import datetime, date
from fpdf import FPDF
import json
import aiohttp
import random
import smtplib


# Preparando o Banco
URL_BANCO = "postgresql://kalimara:hitman@localhost/SIA"
EMAIL_SIA = "sia.agroconnect@outlook.com"
SENHA_SIA = "@groetech1234"

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


# =================== FUNÇÕES ===================
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


async def recomendar_analise_solo_cultura():
    rota = "http://127.0.0.1:5000/analise/solo/cultura/"

    # Por enquanto, vou gerar dados aleatórios.
    body = {
        "Nitrogênio": random.uniform(0.0, 140.0),
        "Fósforo": random.uniform(5.0, 145.0),
        "Potássio": random.uniform(5.0, 205.0),
        "Temperatura": random.uniform(8.0, 43.7),
        "Umidade": random.uniform(14.3, 100.0),
        "pH": random.uniform(3.5, 9.94),
        "Chuva": random.uniform(20.0, 300.0)
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
                return "Erro de Colunas"
            

async def recomendar_analise_solo_fertilizante():
    rota = "http://127.0.0.1:5000/analise/solo/fertilizante/"

    # Por enquanto, vou gerar dados aleatórios.
    body = {
        "Temperatura": random.uniform(25.0, 38.0),
        "Umidade do Ar": random.uniform(50.0, 72.0),
        "Umidade do Solo": random.uniform(25.0, 65.0),
        "Nitrogênio": random.uniform(4.0, 42.0),
        "Potássio": random.uniform(0.0, 19.0),
        "Fósforo": random.uniform(0.0, 42.0)
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
                return "Erro de Colunas"


def gerar_relatorio_pdf_solo(nomeAnalise):

    nitrogenio = random.uniform(0.0, 140.0)
    fosforo = random.uniform(0.0, 145.0)
    potassio = random.uniform(0.0, 205.0)

    pdf = FPDF()

    pdf.add_page()
    pdf.set_font("Arial", size = 20)

    pdf.image("AgroLogo.png",  x=150, y=275, w=36, h = 11)
    pdf.write(20, f"Relatório de Solo da Análise '{nomeAnalise}'")
    pdf.ln()
    pdf.set_font_size(12)

    pdf.write(5, f"Nitrogênio -> {nitrogenio:.2f} gramas por m³")
    pdf.ln()
    pdf.ln()
    pdf.write(5, f"Fósforo -> {fosforo:.2f} gramas por m³")
    pdf.ln()
    pdf.ln()
    pdf.write(5, f"Potássio -> {potassio:.2f} gramas por m³")
    pdf.output("relatório.pdf")




# =================== ROTAS DA API ===================

# ------------------------------------------ DASHBOARD ------------------------------------------

# Retorna lista de culturas que aparece na dashboard.
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








# ------------------------------------------ MINHAS CULTURAS ------------------------------------------

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


# Retornando a lista de lavouras que aparece como opção na criação de nova cultura.
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


# Cria uma nova cultura no banco.
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
 

# Retorna os dados de uma cultura específica, para quando você acessar a página individual da mesma.
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







# ------------------------------------------ ANALISES ------------------------------------------

# Retorna a lista de análises.
@app.get("/analises/lista/")
async def lista_analises():
    try:
        await banco_de_dados.connect()
        busca = """SELECT Analises.id, Analises.nomePersonalizado, TiposAnalise.tipo, 
                   Analises.dataEncomenda FROM Analises LEFT JOIN TiposAnalise ON TiposAnalise.id = 
                   Analises.tipo;"""
        
        resultado = await banco_de_dados.fetch_all(busca)

        analises = list()

        
        for analise in resultado:
            data_formatada = datetime.fromisoformat(str(analise["dataencomenda"]))
            data_formatada = f"{data_formatada.day:02d}/{data_formatada.month:02d}/{data_formatada.year}"

            analises.append({"id": analise["id"],
                             "nomePersonalizado": analise["nomepersonalizado"],
                             "tipo": analise["tipo"],
                             "dataEncomenda": data_formatada},
                             )
        
        return {"Analises": analises}

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        await banco_de_dados.disconnect()


# Retorna os detalhes da análise, para a página específica.
@app.post("/analise/detalhes/")
async def detalhes_analise_especifica(dados: dict):
    try:
        await banco_de_dados.connect()

        busca = f'SELECT Analises.nomePersonalizado, Analises.tipo, Analises.dataVisita, Analises.estagio FROM Analises WHERE id = {dados["analiseId"]};'
        resultado = await banco_de_dados.fetch_one(busca)

        data_formatada = datetime.fromisoformat(str(resultado["datavisita"]))
        data_formatada = f"{data_formatada.day:02d}/{data_formatada.month:02d}/{data_formatada.year}"

        resposta = {
            "nomePersonalizado": resultado["nomepersonalizado"],
            "tipo": "Água" if resultado["tipo"] == 1 else "Solo",
            "estagio": resultado["estagio"],
            "dataVisita": data_formatada
        }
        
        return resposta 

    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        await banco_de_dados.disconnect()


# Chamada quando o botão "Baixar Relatório" é pressionado.
@app.post("/analise/relatorio/baixar/")
async def criar_relatorio(dados: dict):
    gerar_relatorio_pdf_solo(dados["nomeAnalise"])

    return FileResponse("relatório.pdf", media_type="application/pdf", filename="relatório.pdf")


# Enviando o resultado da Análise
@app.post("/analise/resultado/solo/")
async def enviar_resultado_solo(dados: dict):
    try:
        SERVIDOR_EMAIL = smtplib.SMTP('smtp-mail.outlook.com', 587)
        SERVIDOR_EMAIL.starttls()
        SERVIDOR_EMAIL.login(EMAIL_SIA, SENHA_SIA)

        cultura = await recomendar_analise_solo_cultura()
        fertilizante = await recomendar_analise_solo_fertilizante()

        texto = f"Subject: Resultado da Análise '{dados['nomeAnalise']}'\n\nOlá, a sua Análise '{dados['nomeAnalise']}' está completa! \n\nBaseado nos resultados encontrados, recomendamos uma combinação de {cultura['Resposta']} e {fertilizante['Resposta']} para o seu tipo de solo! Boa plantação!".encode('utf-8')

        SERVIDOR_EMAIL.sendmail(EMAIL_SIA, "kalimarapeleteiro@gmail.com", texto)

        return JSONResponse(content={"Mensagem": "E-mail Enviado."}, status_code=200)
        
    finally:
        SERVIDOR_EMAIL.quit()










# ------------------------------------------ ESTAÇÕES ------------------------------------------

# Buscando por Estações
@app.get("/estacoes/lista/")
async def lista_estacoes():
    try:
        await banco_de_dados.connect()
        busca = """SELECT * FROM retornarTodasAsEstacoes();"""
        
        resultado = await banco_de_dados.fetch_all(busca)

        estacoes = list()
        
        for estacao in resultado:
            estacoes.append({"nomePersonalizado": estacao["nomepersonalizado"],
                             "ativo": estacao["ativo"],
                             "cultura": estacao["cultura"]},
                             )
        
        return {"Estacoes": estacoes}

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        await banco_de_dados.disconnect()




# Execução
if __name__ == "__main__":
    import uvicorn
    
    # Adicionar o host = '0.0.0.0' após produção. Remover o reload.
    uvicorn.run("app:app", port=8000, reload=True)  