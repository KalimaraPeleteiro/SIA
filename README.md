# Como Executar o Sistema (Produção)

Para executar a API, é necessário definir suas credenciais no *app.py*, modificando o
<br>
<br>
"postgresql://kalimara:hitman@localhost/SIA" pela estrutura "postgresql://seuusuario:suasenha@localhost/SIA"
<br> 
<br>

O Banco de dados DEVE se chamar SIA.
<br>
<br>
Em seguida, sera necessário usar o `source ambiente_virtual/bin/activate` para entrar no ambiente virtual.
<br>
O `pip install requirements.txt` irá instalar as bibliotecas necessárias, e o `python3 app.py` irá ativar a API.

<br>
<br>
Também será necessário fazer o `docker pull kalimarapeleteiro/sia-ai-api:1.1` para ter a outra API no seu sistema Docker. Para executá-la, use `docker run -p 5000:5000 kalimarapeleteiro/sia-ai-api:1.1`.

<br>
<br>
Por fim, basta instalar as dependências com o `npm install` e executar com o `npm run dev`.

<br>
<br>
__Tenha em mente que todas essas operações devem ser feitas nos diretórios específicos. O npm no "sia-front", o pip install no "sia-back" e o docker no terminal geral.__
