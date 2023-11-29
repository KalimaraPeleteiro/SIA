<h1 align="center"> SIA </h1>

<h3 align="center"> Sistema Integrado AgroConnect </h3>

<div align = "center">
  
Plataforma desenvolvida para o projeto do 6º Semestre. Oferece serviços de agricultura de precisão com aprendizado de máquina para produtores de pequeno porte. Os modelos são disponibilizados via uma [API](https://github.com/KalimaraPeleteiro/SIA-AI-API/) construída em Flask, que é consumida pela aplicação. Front-End feito em React.JS e o back-end em FastAPI com comunicações assíncronas.


<br>

[Dashboard](#dashboard)

[Análises](#analises)

[Produtos](#produtos)

[Culturas](#cultura-especifica)

[Como Executar o Sistema Localmente](#how-to)

</div>

<br>
<br>

<h3 id = "dashboard">Dashboard</h3>

Tela principal do sistema. O Dashboard, como o nome sugere, oferece uma visão geral de seu estado atual.

![Dashboard (Inativo) (1)](https://github.com/KalimaraPeleteiro/SIA/assets/94702837/6d2caf1d-461d-4972-9aa5-8aa8d6f194f4)

<br>
<br>

<h3 id = "analises">Análises</h3>

Para começar a utilizar os sistemas, é necessário que você registre culturas. Culturas funcionam como a representação de uma lavoura dentro do sistema, e você pode tanto adicionar uma cultura iniciada do zero (depois de começar a utilizar o sistema) ou culturas que foram iniciadas antes do sistema. Se for o primeiro caso, antes de iniciar uma cultura, é melhor que você encomende uma análise, que pode ser de dois tipos:

- Análise de Solo
- Análise de Água

![Análise (Ativo) (1)](https://github.com/KalimaraPeleteiro/SIA/assets/94702837/c78505ef-fa5b-438f-8739-eda3f76e5bd5)


Todas as análises possuem 04 fases até terem seus resultados disponíveis. Na primeira etapa, uma equipe é enviada para o local, com a intenção de coletar amostras do que está sendo posto para análise. Depois, as amostras são transportadas e analisadas, passando por fim, ao modelo, que retorna os resultados.

No caso de Análise de Solo, a melhor combinação de lavoura e fertilizante para aquele solo é retornada. Em Análise de Água, a potabilidade de água é verificada.

<p align="center">
  <img src="https://github.com/KalimaraPeleteiro/SIA/assets/94702837/1affb419-d5e2-4748-80d4-1a0af46e9a18" width="400" />
  <img src="https://github.com/KalimaraPeleteiro/SIA/assets/94702837/873c258e-9bda-433b-8617-933141efd447" width="400" />
  <img src="https://github.com/KalimaraPeleteiro/SIA/assets/94702837/dc8f6f26-5ada-40df-9fb9-49a5102fd98c" width="400" />
  <img src="https://github.com/KalimaraPeleteiro/SIA/assets/94702837/a5d29989-3003-4c6f-a089-1f3966b11d37" width="400" />
</p>

<br>
<br>

<h3 id = "produtos">Produtos</h3>

Além de uma análise prévia, para o bom uso do sistema, também é recomendado a compra de um dos produtos ofertados pela plataforma. O principal dos tais é uma Estação Meteorológica, que vem em diversos tipos (tipos mais avançados oferecem acesso a mais sistemas).

Após a compra do produto, o mesmo deve ser ativado com uma chave única (enviada ao e-mail do usuário).

<p align="center">
  <img src="https://github.com/KalimaraPeleteiro/SIA/assets/94702837/5ddb1949-48a7-41c6-8ab9-b91818b826ea" width="500" />
  <img src="https://github.com/KalimaraPeleteiro/SIA/assets/94702837/432716eb-26b6-4909-b226-4a68577eefd5" width="500" />
</p>

<br>
<br>

<h3 id = "cultura-especifica">Culturas</h3>

Se o usuário seguiu todos os passos sugeridos até agora, o que ele tem em mãos no momento é uma recomendação especializada do que deve ser cultivado em seu solo para máxima produtividade, além de estações para verificar o desenvolvimento de sua lavoura. Assim, o próximo passo é iniciar o trabalho e registrar a cultura no sistema.


![Minhas Culturas (Lista)](https://github.com/KalimaraPeleteiro/SIA/assets/94702837/c2bf2606-4634-4c5b-8dc8-58d4e28d4e16)

Além disso, o usuário tem acesso a uma página específica a sua cultura, com informações detalhadas e os modelos preditivos. Essa página reflete os recursos dedicados pelo usuário a sua cultura. Caso não tenha uma estação meteorológica instalada, por exemplo, o usuário não terá acesso aos gráficos nem predições.

As predições fornecidas são: previsão estimada de safra, sugestão diária de irrigação e sugestão diária de aplicação de pesticidas.

Outro serviço disponibilizado são informações colhidas diretamente da FAO (Organização de Agricultura e Comida da ONU) via Web Scraping.

![ImagemArtigo](https://github.com/KalimaraPeleteiro/SIA/assets/94702837/6e0b5f71-ce34-4208-8811-b623f6c15cc2)

![Imagem Artigo 02](https://github.com/KalimaraPeleteiro/SIA/assets/94702837/85ff669b-5fd3-45fd-a5c1-81bef0bdacff)

Uma versão completa da página segue abaixo.

![ImagemArtigo2](https://github.com/KalimaraPeleteiro/SIA/assets/94702837/c1723add-9504-4fd9-86b8-266f51d3a682)

<br>
<br>

<h3 id = "how-to">Como Executar o Sistema</h3>

Para executar a API, é necessário definir suas credenciais no *app.py*, modificando o
<br>
<br>
"postgresql://kalimara:hitman@localhost/SIA" pela estrutura "postgresql://seuusuario:suasenha@localhost/SIA"
<br> 
<br>

O Banco de dados DEVE se chamar SIA. Use  `database.sql` na pasta *sia-back* para criar o banco. 

<br>
Em seguida, sera necessário usar o `source ambiente_virtual/bin/activate` para entrar no ambiente virtual.
<br>
O `pip install requirements.txt` irá instalar as bibliotecas necessárias, e o `python3 app.py` irá ativar a API.

<br>

Também será necessário fazer o `docker pull kalimarapeleteiro/sia-ai-api:1.1` para ter a outra API no seu sistema Docker. Para executá-la, use `docker run -p 5000:5000 kalimarapeleteiro/sia-ai-api:1.1`.

<br>

Por fim, basta instalar as dependências com o `npm install` e executar com o `npm run dev`.

<br>

__Tenha em mente que todas essas operações devem ser feitas nos diretórios específicos. O npm no "sia-front", o pip install no "sia-back" e o docker no terminal geral.__
