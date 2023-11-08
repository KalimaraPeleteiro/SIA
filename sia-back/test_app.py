import pytest
from fastapi.testclient import TestClient
from app import prever_safra, app


cliente_teste = TestClient(app)


# Testes Unitários (Testando Função Preditiva)
@pytest.mark.asyncio
async def test_prever_safra_cultura_correta():
    resultado = await prever_safra("Trigo")
    assert isinstance(resultado, dict)


@pytest.mark.asyncio
async def test_prever_safra_cultura_indisponivel():
    resultado = await prever_safra("Feijão")
    assert resultado == "Erro de Cultura"


# Teste de Funcionalidade (Testando uma Rota da API)
def test_rota_culturas_dashboard():
    response = cliente_teste.get("/dashboard/lista/")
    assert response.status_code == 200
    dados = response.json()
    assert "culturas" in dados 

    assert isinstance(dados["culturas"], list)
    for cultura in dados["culturas"]:
        assert "nomeCultura" in cultura
        assert "diaCriacao" in cultura