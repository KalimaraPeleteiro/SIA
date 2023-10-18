import tabula

import pandas as pd

 

# Função para verificar se uma célula está vazia, é "NaN" ou contém apenas espaços em branco

def is_cell_empty(cell):
    return pd.isna(cell) or (isinstance(cell, str) and cell.strip() in ["NaN", ""])

 

# Leitura do PDF e obtenção da lista de DataFrames

pdf_file = "BK-BA01-04200-IS-20-01570_00000.pdf"
pages = tabula.read_pdf(pdf_file, pages="all", multiple_tables=True, stream=True)

 

# Determinar a largura da página para pegar a metade direita

for page_num, page in enumerate(pages, start=1):

    page_width = page.shape[1]

    half_page_width = page_width // 2

   

    # Selecionar apenas o lado direito (metade direita) da página

    half_page = page.iloc[:, half_page_width:]

   

    print(f"Página {page_num}:")

   

    # Filtrar e excluir linhas completamente vazias, com espaços em branco ou "NaN"

    half_page_filtered = half_page.dropna(axis=0, how="all").dropna(axis=0, how="all", subset=half_page.columns)

   

    # Excluir colunas que contêm "Unnamed" no cabeçalho

    half_page_filtered = half_page_filtered.loc[:, ~half_page_filtered.columns.str.contains('Unnamed')]

   

    # Excluir linhas com 5 ou mais valores "NaN"

    half_page_filtered = half_page_filtered[half_page_filtered.isna().sum(axis=1) < 5]

   

    print(half_page_filtered.to_string(index=False))  # Convertendo para string sem índice de linha

    print("Análise de espaços vazios:")

   

    # Verificar se a tabela possui espaços vazios

    has_empty_cells = any(half_page_filtered.apply(lambda x: x.map(is_cell_empty)).values.flatten())

    if has_empty_cells:

        print("Esta tabela possui espaços vazios.")

    else:

        print("Esta tabela não possui espaços vazios.")

   

    print("\n")  # Adiciona uma linha em branco entre as tabelas

 

print("Total de páginas processadas:", page_num)