from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse, FileResponse
from databases import Database
from datetime import datetime, date
from fpdf import FPDF
import json
import aiohttp
import random
import re
import smtplib


# Preparando o Banco
URL_BANCO = "postgresql://kalimara:hitman@localhost/SIA"
EMAIL_SIA = "sia.agroconnect@outlook.com"
SENHA_SIA = "@groetech1234"
BANCO_DE_DADOS = Database(URL_BANCO)


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
async def get_db_connection():
    await BANCO_DE_DADOS.connect()
    try:
        yield BANCO_DE_DADOS
    finally:
        await BANCO_DE_DADOS.disconnect()


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


async def recomendar_analise_agua():
    rota = "http://127.0.0.1:5000/analise/agua/"

    # Por enquanto, vou gerar dados aleatórios.
    body = {
        "Alumínio": random.uniform(0.0, 5.05),
        "Amônia": random.uniform(0.0, 29.8),
        "Arsênio": random.uniform(0.0, 1.05),
        "Bário": random.uniform(0.0, 4.94),
        "Cádmio": random.uniform(0.0, 0.13),
        "Cloro": random.uniform(0.0, 8.68),
        "Cromo": random.uniform(0.0, 0.9),
        "Cobre": random.uniform(0.0, 2.0),
        "Flúor": random.uniform(0.0, 1.5),
        "Bactérias": random.uniform(0.0, 1.0),
        "Vírus": random.uniform(0.0, 1.0),
        "Chumbo": random.uniform(0.0, 0.2),
        "Nitrato": random.uniform(0.0, 19.8),
        "Nitrito": random.uniform(0.0, 2.93),
        "Mercúrio": random.uniform(0.0, 0.01),
        "Perclorato": random.uniform(0.0, 60.0),
        "Rádio": random.uniform(0.0, 7.99),
        "Selênio": random.uniform(0.0, 0.1),
        "Prata": random.uniform(0.0, 0.5),
        "Urânio": random.uniform(0.0, 0.09)
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


async def recomendar_irrigacao_hoje(cultura):
    rota = "http://127.0.0.1:5000/recomendacao/irrigacao/"

    # Por enquanto, vou gerar dados aleatórios.
    body = {
        "Cultura": cultura,
        "Dias Ativos (Cultura)": random.randint(1, 210),
        "Umidade do Solo": random.uniform(120, 990),
        "Temperatura": random.uniform(14, 39),
        "Umidade do Ar": random.uniform(11, 85)
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


async def recomendar_pesticida_hoje():
    rota = "http://127.0.0.1:5000/recomendacao/pesticida/"

    # Por enquanto, vou gerar dados aleatórios.
    body = {
        "Quantidade de Insetos": random.randint(100, 4000),
        "Uso de Pesticida": random.choice(["Nunca Usado Anteriormente", "Usado Anteriormente", "Usando Atualmente"]),
        "Número de Doses Semanais": random.randint(5, 60),
        "Número de Semanas de Uso": random.uniform(0, 30),
        "Número de Semanas sem Uso": random.randint(0, 2)
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


def gerar_relatorio_pdf_agua(nomeAnalise):

    dicionario = dict()
    dicionario['Alumínio'] = random.uniform(0.0, 5.05)
    dicionario['Amônia'] = random.uniform(0.0, 29.8)
    dicionario['Arsênio'] = random.uniform(0.0, 1.05)
    dicionario['Bário'] = random.uniform(0.0, 4.94)
    dicionario['Cádmio'] = random.uniform(0.0, 0.13)
    dicionario['Cloro'] = random.uniform(0.0, 8.68)
    dicionario['Cromo'] = random.uniform(0.0, 0.9)
    dicionario['Cobre'] = random.uniform(0.0, 2.0)
    dicionario['Flúor'] = random.uniform(0.0, 1.5)
    dicionario['Bactérias'] = random.uniform(0.0, 1.0)
    dicionario['Vírus'] = random.uniform(0.0, 1.0)
    dicionario['Chumbo'] = random.uniform(0.0, 0.2)
    dicionario['Nitratos'] = random.uniform(0.0, 19.8)
    dicionario['Nitritos'] = random.uniform(0.0, 2.93)
    dicionario['Mercúrio'] = random.uniform(0.0, 0.01)
    dicionario['Perclorato'] = random.uniform(0.0, 60.0)
    dicionario['Rádio'] = random.uniform(0.0, 7.99)
    dicionario['Selênio'] = random.uniform(0.0, 0.1)
    dicionario['Prata'] = random.uniform(0.0, 0.5)
    dicionario['Urânio'] = random.uniform(0.0, 0.09)

    pdf = FPDF()

    pdf.add_page()
    pdf.set_font("Arial", size = 20)

    pdf.image("AgroLogo.png",  x=150, y=275, w=36, h = 11)
    pdf.write(20, f"Relatório de Solo da Água '{nomeAnalise}'")
    pdf.ln()
    pdf.set_font_size(12)

    for chave, valor in dicionario.items():
        pdf.write(5, f"{chave} -> {valor:.2f} miligramas por m³")
        pdf.ln()
        pdf.ln()
    
    pdf.output("relatório.pdf")


async def gerar_relatorio_pdf_solo_historico(idAnalise):
    await BANCO_DE_DADOS.connect()

    busca = f"SELECT * FROM ParametrosSolo WHERE analise_id = {idAnalise}"
    resposta = await BANCO_DE_DADOS.fetch_all(busca)

    pdf = FPDF()

    pdf.add_page()
    pdf.set_font("Arial", size = 20)

    pdf.image("AgroLogo.png",  x=150, y=275, w=36, h = 11)
    pdf.write(20, "Resultado")
    pdf.ln()
    pdf.set_font_size(12)

    for resultado in resposta:
        pdf.write(5, f"Cultura -> {resultado['cultura']}")
        pdf.ln()
        pdf.ln()
        pdf.write(5, f"Fertilizante -> {resultado['fertilizante']}")

    pdf.output("relatório.pdf")

    await BANCO_DE_DADOS.disconnect()


async def gerar_relatorio_pdf_agua_historico(idAnalise):
    await BANCO_DE_DADOS.connect()

    busca = f"SELECT * FROM ParametrosAgua WHERE analise_id = {idAnalise}"
    resposta = await BANCO_DE_DADOS.fetch_all(busca)

    pdf = FPDF()

    pdf.add_page()
    pdf.set_font("Arial", size = 20)

    pdf.image("AgroLogo.png",  x=150, y=275, w=36, h = 11)
    pdf.write(20, "Resultado")
    pdf.ln()
    pdf.set_font_size(12)

    if resposta[0]["saudavel"] is True:
        pdf.write(5, "Água própria para consumo.")
    elif resposta[0]["saudavel"] is False:
        pdf.write(5, "Água não potável.")


    pdf.output("relatório.pdf")

    await BANCO_DE_DADOS.disconnect()




# =================== ROTAS DA API ===================

# ------------------------------------------ DASHBOARD ------------------------------------------

# Retorna lista de culturas que aparece na dashboard.
@app.get("/dashboard/lista/")
async def lista_culturas_dashboard(db: BANCO_DE_DADOS = Depends(get_db_connection)):
    try:
        busca = "SELECT * FROM retornarTodasCulturasUsuarioDashboard('reidogado@agro.com.br');"
        resultado = await db.fetch_all(busca)

        culturas = list()
        for cultura in resultado:
            data = str(cultura["datacriacao"])
            data_formatada = datetime.fromisoformat(data)
            data_formatada = f"{data_formatada.day:02d}/{data_formatada.month:02d}/{data_formatada.year}"
            culturas.append({"nomeCultura": cultura["nomecultura"], "diaCriacao": data_formatada})
        
        return {"culturas": culturas}
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))


@app.get("/dashboard/detalhes/")
async def retornar_detalhes_dashboard():
    try:
        await BANCO_DE_DADOS.connect()
        busca_culturas = "SELECT COUNT(id) AS numeroCulturasAtivas FROM Culturas WHERE dataInicio IS NOT null;"
        busca_analises = "SELECT COUNT(id) AS numeroAnalisesPendentes FROM Analises WHERE estagio != 4;"
        busca_pestes = "SELECT COUNT(id) AS numeroDronesAtivos FROM Drones WHERE ativo is True;"

        resultado_culturas = await BANCO_DE_DADOS.fetch_one(busca_culturas)    
        resultado_analises = await BANCO_DE_DADOS.fetch_one(busca_analises)
        resultado_pestes = await BANCO_DE_DADOS.fetch_one(busca_pestes)

        return {"numeroCulturasAtivas": resultado_culturas["numeroculturasativas"], 
                "numeroAnalisesPendentes": resultado_analises["numeroanalisespendentes"],
                "numeroInsetos": round(resultado_pestes["numerodronesativos"] * random.randint(100, 4000) / 1000, 2)}

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        await BANCO_DE_DADOS.disconnect()







# ------------------------------------------ MINHAS CULTURAS ------------------------------------------

# Retornando a lista de culturas na página de Culturas.
@app.get("/culturas/lista/")
async def lista_culturas_minhas_culturas():
    try:
        await BANCO_DE_DADOS.connect()
        busca = "SELECT * FROM retornarListaCulturasDetalhes('reidogado@agro.com.br');"
        resultado = await BANCO_DE_DADOS.fetch_all(busca)

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
        await BANCO_DE_DADOS.disconnect()


# Retornando a lista de lavouras que aparece como opção na criação de nova cultura.
@app.get("/culturas/lavouras/")
async def lista_lavouras_minhas_culturas():
    try:
        await BANCO_DE_DADOS.connect()
        busca = "SELECT * FROM Lavouras;"
        resultado = await BANCO_DE_DADOS.fetch_all(busca)

        lavouras = list()

        for lavoura in resultado:
            lavouras.append({"id": lavoura["id"],
                             "Produto": lavoura["produto"]})
        
        return {"lavouras": lavouras}

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        await BANCO_DE_DADOS.disconnect()


# Cria uma nova cultura no banco.
@app.post("/culturas/nova-cultura/")
async def criar_nova_cultura(dados: dict):
    try:
        await BANCO_DE_DADOS.connect()

        # Cultura Criada
        comando = f"CALL novaCultura('{dados['nomeCultura']}', '{dados['produto']}')"
        await BANCO_DE_DADOS.execute(comando)

        # Agora, vamos buscar pelo seu ID e ligá-la ao Usuário
        busca = f"SELECT * FROM obterIdCultura('{dados['nomeCultura']}')"
        resposta = await BANCO_DE_DADOS.fetch_one(busca)

        comando = f"CALL adicionarCulturaAoUsuario({resposta['obteridcultura']}, 1)"
        await BANCO_DE_DADOS.execute(comando)


        return JSONResponse(content={"Mensagem": "Post Bem-Sucedido"}, status_code=200)
    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        await BANCO_DE_DADOS.disconnect()
 

# Retorna os dados de uma cultura específica, para quando você acessar a página individual da mesma.
@app.post("/cultura_especifica/dados/")
async def dados_cultura(dados: dict):
    try:
        await BANCO_DE_DADOS.connect()

        # Agora, vamos buscar pelo seu ID e ligá-la ao Usuário
        busca = f"SELECT * FROM obterIdCultura('{dados['nomeCultura']}')"
        resultado = await BANCO_DE_DADOS.fetch_one(busca)

        segunda_busca = f"SELECT * FROM obterDetalhesCultura({resultado['obteridcultura']})"
        segundo_resultado = await BANCO_DE_DADOS.fetch_one(segunda_busca)

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
        await BANCO_DE_DADOS.disconnect()


@app.post("/cultura_especifica/previsao/")
async def previsao_safra_cultura_individual(dados: dict):
    try:
        await BANCO_DE_DADOS.connect()
        resultado = await prever_safra(dados["produtoCultura"])

        if resultado == "Erro de Cultura":
            previsaoSafra = resultado
        else:
            number = re.search(r"[-+]?[.]?[\d]+(?:,\d\d\d)*[\.]?\d*(?:[eE][-+]?\d+)?", resultado["Previsão"])
            resultado = round(float(number.group())/10000, 2)
            previsaoSafra = resultado
        
        irrigacao = await recomendar_irrigacao_hoje(dados["produtoCultura"])
        if irrigacao == "Erro de Cultura":
            recomendacaoIrrigacao = irrigacao
        else:
            recomendacaoIrrigacao = irrigacao["Recomendação"]
        
        
        pesticida = await recomendar_pesticida_hoje()
        recomendacaoPesticida = pesticida["Recomendação"]

        return {"previsaoSafra": previsaoSafra,
                "recomendacaoIrrigacao": recomendacaoIrrigacao,
                "recomendacaoPesticida": recomendacaoPesticida}

    
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        await BANCO_DE_DADOS.disconnect()






# ------------------------------------------ ANALISES ------------------------------------------

# Retorna a lista de análises.
@app.get("/analises/lista/")
async def lista_analises():
    try:
        await BANCO_DE_DADOS.connect()
        busca = """SELECT Analises.id, Analises.nomePersonalizado, 
	                      TiposAnalise.tipo, Analises.dataEncomenda,
	                      existeParametroAnalise(Analises.id) AS existeParametro
                    FROM Analises 
                    LEFT JOIN TiposAnalise ON TiposAnalise.id = Analises.tipo;"""
        
        resultado = await BANCO_DE_DADOS.fetch_all(busca)

        analises = list()

        
        for analise in resultado:
            data_formatada = datetime.fromisoformat(str(analise["dataencomenda"]))
            data_formatada = f"{data_formatada.day:02d}/{data_formatada.month:02d}/{data_formatada.year}"

            analises.append({"id": analise["id"],
                             "nomePersonalizado": analise["nomepersonalizado"],
                             "tipo": analise["tipo"],
                             "dataEncomenda": data_formatada,
                             "existeParametro": analise["existeparametro"]},
                             )
        
        return {"Analises": analises}

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        await BANCO_DE_DADOS.disconnect()


# Retorna os detalhes da análise, para a página específica.
@app.post("/analise/detalhes/")
async def detalhes_analise_especifica(dados: dict):
    try:
        await BANCO_DE_DADOS.connect()

        busca = f'SELECT Analises.nomePersonalizado, Analises.tipo, Analises.dataVisita, Analises.estagio FROM Analises WHERE id = {dados["analiseId"]};'
        resultado = await BANCO_DE_DADOS.fetch_one(busca)

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
        await BANCO_DE_DADOS.disconnect()


@app.post("/analise/nova-analise/")
async def criar_nova_analise(dados:dict):   
    try:
        await BANCO_DE_DADOS.connect()

        if dados["dataVisita"] is not None:
            comando = f"CALL novaAnalise('{dados['nomePersonalizado']}', {dados['tipo']}, {dados['dataVisita']})"
        else:
            comando = f"CALL novaAnalise('{dados['nomePersonalizado']}', {dados['tipo']})"
        
        await BANCO_DE_DADOS.execute(comando)

        return JSONResponse(content={"Mensagem": "Post Bem-Sucedido"}, status_code=200)

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        await BANCO_DE_DADOS.disconnect()


# Chamada quando o botão "Baixar Relatório" é pressionado.
@app.post("/analise/relatorio/baixar/solo/")
async def criar_relatorio_solo(dados: dict):
    gerar_relatorio_pdf_solo(dados["nomeAnalise"])

    return FileResponse("relatório.pdf", media_type="application/pdf", filename="relatório.pdf")


# Chamada quando o botão "Baixar Relatório" é pressionado.
@app.post("/analise/relatorio/baixar/agua/")
async def criar_relatorio_agua(dados: dict):
    gerar_relatorio_pdf_agua(dados["nomeAnalise"])

    return FileResponse("relatório.pdf", media_type="application/pdf", filename="relatório.pdf")


# Enviando o resultado da Análise
@app.post("/analise/resultado/solo/")
async def enviar_resultado_solo(dados: dict):
    try:
        await BANCO_DE_DADOS.connect()

        SERVIDOR_EMAIL = smtplib.SMTP('smtp-mail.outlook.com', 587)
        SERVIDOR_EMAIL.starttls()
        SERVIDOR_EMAIL.login(EMAIL_SIA, SENHA_SIA)

        cultura = await recomendar_analise_solo_cultura()
        fertilizante = await recomendar_analise_solo_fertilizante()

        texto = f"Subject: Resultado da Análise '{dados['nomeAnalise']}'\n\nOlá, a sua Análise '{dados['nomeAnalise']}' está completa! \n\nBaseado nos resultados encontrados, recomendamos uma combinação de {cultura['Resposta']} e {fertilizante['Resposta']} para o seu tipo de solo! Boa plantação!".encode('utf-8')

        SERVIDOR_EMAIL.sendmail(EMAIL_SIA, "kalimarapeleteiro@gmail.com", texto)

        comando = f"CALL finalizarAnaliseSolo({dados['analiseId']}, '{cultura['Resposta']}', '{fertilizante['Resposta']}');"
        await BANCO_DE_DADOS.execute(comando)

        return JSONResponse(content={"Mensagem": "E-mail Enviado."}, status_code=200)
        
    finally:
        SERVIDOR_EMAIL.quit()
        await BANCO_DE_DADOS.disconnect()


# Enviando o resultado da Análise
@app.post("/analise/resultado/agua/")
async def enviar_resultado_agua(dados: dict):
    try:
        await BANCO_DE_DADOS.connect()

        SERVIDOR_EMAIL = smtplib.SMTP('smtp-mail.outlook.com', 587)
        SERVIDOR_EMAIL.starttls()
        SERVIDOR_EMAIL.login(EMAIL_SIA, SENHA_SIA)

        resultado = await recomendar_analise_agua()

        if resultado["Resposta"] == "Potável":
            texto = f"Subject: Resultado da Análise '{dados['nomeAnalise']}'\n\nOlá, a sua Análise '{dados['nomeAnalise']}' está completa! \n\nBaseado nos resultados encontrados, a água é potável!".encode('utf-8')
            comando = f"CALL finalizarAnaliseAgua({dados['analiseId']}, {True});"
        if resultado["Resposta"] == "Insalubre":
            texto = f"Subject: Resultado da Análise '{dados['nomeAnalise']}'\n\nOlá, a sua Análise '{dados['nomeAnalise']}' está completa! \n\nBaseado nos resultados encontrados, a água não é própria para consumo.".encode('utf-8')
            comando = f"CALL finalizarAnaliseAgua({dados['analiseId']}, {False});"


        SERVIDOR_EMAIL.sendmail(EMAIL_SIA, "kalimarapeleteiro@gmail.com", texto)
        await BANCO_DE_DADOS.execute(comando)

        return JSONResponse(content={"Mensagem": "E-mail Enviado."}, status_code=200)
        
    finally:
        SERVIDOR_EMAIL.quit()
        await BANCO_DE_DADOS.disconnect()


# Chamada quando o botão "Baixar Relatório" é pressionado.
@app.post("/analise/historico/baixar/solo/")
async def criar_relatorio_agua(dados: dict):
    await gerar_relatorio_pdf_solo_historico(dados["analiseId"])

    return FileResponse("relatório.pdf", media_type="application/pdf", filename="relatório.pdf")


@app.post("/analise/historico/baixar/agua/")
async def criar_relatorio_agua(dados: dict):
    await gerar_relatorio_pdf_agua_historico(dados["analiseId"])

    return FileResponse("relatório.pdf", media_type="application/pdf", filename="relatório.pdf")











# ------------------------------------------ ESTAÇÕES ------------------------------------------

# Buscando por Estações
@app.get("/estacoes/lista/")
async def lista_estacoes():
    try:
        await BANCO_DE_DADOS.connect()
        busca = """SELECT * FROM retornarTodasAsEstacoes();"""
        
        resultado = await BANCO_DE_DADOS.fetch_all(busca)

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
        await BANCO_DE_DADOS.disconnect()


@app.get("/estacoes/lista/culturas/")
async def lista_culturas_sem_estacao():
    try:
        await BANCO_DE_DADOS.connect()

        busca = """SELECT Culturas.nomePersonalizado 
                   FROM Culturas
                   LEFT JOIN Estacoes ON Estacoes.cultura_id = Culturas.id
                   WHERE Estacoes.cultura_id IS NULL;"""
        
        resultado = await BANCO_DE_DADOS.fetch_all(busca)

        culturas = list()
        
        for cultura in resultado:
            culturas.append({"nomePersonalizado": cultura["nomepersonalizado"]})
        
        return {"Culturas": culturas}

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        await BANCO_DE_DADOS.disconnect()


@app.post("/estacoes/nova-estacao/")
async def lista_culturas_sem_estacao(dados: dict):
    SERVIDOR_EMAIL = None
    try:
        await BANCO_DE_DADOS.connect()

        # Agora, vamos buscar pelo seu ID e ligá-la ao Usuário
        busca = f"SELECT * FROM obterIdCultura('{dados['nomeCultura']}')"
        resposta = await BANCO_DE_DADOS.fetch_one(busca)

        comando = f"CALL novaEstacao('{dados['nomePersonalizado']}', {dados['tipoEstacao']}, {resposta['obteridcultura']})"
        await BANCO_DE_DADOS.execute(comando)

        busca_estacao = f"SELECT Estacoes.chave FROM Estacoes WHERE Estacoes.nomePersonalizado = '{dados['nomePersonalizado']}';"
        resposta_busca = await BANCO_DE_DADOS.fetch_one(busca_estacao)

        SERVIDOR_EMAIL = smtplib.SMTP('smtp-mail.outlook.com', 587)
        SERVIDOR_EMAIL.starttls()
        SERVIDOR_EMAIL.login(EMAIL_SIA, SENHA_SIA)

        texto = f"Subject: Compra de Estação '{dados['nomePersonalizado']}'\n\nOlá, parabéns por adquirir uma nova estação meteorológica. Em breve, funcionários da AgroConnect irão até você para realizar a instalação. Uma vez concluído o processo, lembre-se de ativar a sua estação! Para isso, use a chave '{resposta_busca['chave']}'!".encode('utf-8')

        SERVIDOR_EMAIL.sendmail(EMAIL_SIA, "kalimarapeleteiro@gmail.com", texto)

        return JSONResponse(content={"Mensagem": "Post Bem-Sucedido"}, status_code=200)
    

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        await BANCO_DE_DADOS.disconnect()
        if SERVIDOR_EMAIL is not None:
            SERVIDOR_EMAIL.quit()


@app.post("/estacoes/ativar/")
async def ativar_estacao(dados: dict):
    try:
        await BANCO_DE_DADOS.connect()

        comando = f"""UPDATE Estacoes
                      SET ativo = true
                      WHERE chave = '{dados['chave']}' AND ativo = false;"""
        await BANCO_DE_DADOS.execute(comando)

        return JSONResponse(content={"Mensagem": "Estação Ativa"}, status_code=200)
    

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        await BANCO_DE_DADOS.disconnect()









# ------------------------------------------ DRONES ------------------------------------------
@app.get("/pestes/lista/")
async def lista_drones():
    try:
        await BANCO_DE_DADOS.connect()
        busca = """SELECT Drones.nomePersonalizado AS Drone, Culturas.nomePersonalizado AS Cultura, Drones.ativo FROM Drones
                   LEFT JOIN Culturas ON Drones.cultura_id = Culturas.id;"""
        resultado = await BANCO_DE_DADOS.fetch_all(busca)

        drones = list()

        for drone in resultado:
            drones.append({"nomeDrone": drone["drone"],
                           "culturaLigada": drone["cultura"],
                           "ativo": drone["ativo"]})
        
        return {"Drones": drones}

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        await BANCO_DE_DADOS.disconnect()


@app.get("/pestes/lista/culturas/")
async def lista_culturas_sem_drone():
    try:
        await BANCO_DE_DADOS.connect()

        busca = """SELECT Culturas.nomePersonalizado 
                   FROM Culturas
                   LEFT JOIN Drones ON Drones.cultura_id = Culturas.id
                   WHERE Drones.cultura_id IS NULL;"""
        
        resultado = await BANCO_DE_DADOS.fetch_all(busca)

        culturas = list()
        
        for cultura in resultado:
            culturas.append({"nomePersonalizado": cultura["nomepersonalizado"]})
        
        return {"Culturas": culturas}

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        await BANCO_DE_DADOS.disconnect()


@app.post("/pestes/novo-drone/")
async def novo_drone(dados: dict):
    SERVIDOR_EMAIL = None
    try:
        await BANCO_DE_DADOS.connect()

        # Agora, vamos buscar pelo seu ID e ligá-la ao Usuário
        busca = f"SELECT * FROM obterIdCultura('{dados['nomeCultura']}')"
        resposta = await BANCO_DE_DADOS.fetch_one(busca)

        comando = f"CALL novoDrone('{dados['nomePersonalizado']}', {resposta['obteridcultura']})"
        await BANCO_DE_DADOS.execute(comando)

        busca_estacao = f"SELECT Drones.chave FROM Drones WHERE Drones.nomePersonalizado = '{dados['nomePersonalizado']}';"
        resposta_busca = await BANCO_DE_DADOS.fetch_one(busca_estacao)

        SERVIDOR_EMAIL = smtplib.SMTP('smtp-mail.outlook.com', 587)
        SERVIDOR_EMAIL.starttls()
        SERVIDOR_EMAIL.login(EMAIL_SIA, SENHA_SIA)

        texto = f"Subject: Compra do Drone '{dados['nomePersonalizado']}'\n\nOlá, parabéns por adquirir uma nova instância do grandiosíssimo AGRO-1!. Em breve, funcionários da AgroConnect irão até você para entregar o produto e configurá-lo. Uma vez concluído o processo, lembre-se de ativar o seu novo drone! Para isso, use a chave '{resposta_busca['chave']}'!".encode('utf-8')

        SERVIDOR_EMAIL.sendmail(EMAIL_SIA, "kalimarapeleteiro@gmail.com", texto)

        return JSONResponse(content={"Mensagem": "Post Bem-Sucedido"}, status_code=200)
    

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        await BANCO_DE_DADOS.disconnect()
        if SERVIDOR_EMAIL is not None:
            SERVIDOR_EMAIL.quit()


@app.post("/pestes/ativar/")
async def ativar_estacao(dados: dict):
    try:
        await BANCO_DE_DADOS.connect()

        comando = f"""UPDATE Drones
                      SET ativo = true
                      WHERE chave = '{dados['chave']}' AND ativo = false;"""
        await BANCO_DE_DADOS.execute(comando)

        return JSONResponse(content={"Mensagem": "Drone Ativo"}, status_code=200)
    

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        await BANCO_DE_DADOS.disconnect()



# Execução
if __name__ == "__main__":
    import uvicorn
    
    # Adicionar o host = '0.0.0.0' após produção. Remover o reload.
    uvicorn.run("app:app", port=8000, reload=True)  