# Plataforma-Router

#### Introdução
O módulo router é responsável pelo roteamento das requisições para camada de presentation.
O roteamento é obtido por definição da apresentação que indica qual url deve ser utilizada para chegar a tela do sistema.

OBS: Atualmente o router está sendo utilizado para enviar as mensagens de eventos destinadas as telas, por meio de um pooling.

#### Estrutura do Projeto
No projeto podemos encontrar os seguintes arquivos:
* [app.js]: disponibiliza os serviços de roteamento de url das páginas de apresentação.
* [config.js]: contém as configurações de roteamento

#### Requisitos

Para executar o gerenciador com sucesso você precisa instalar as seguintes ferramentas:
* [NodeJS](https://nodejs.org)
* NPM (vem junto com o NodeJS)
* [Docker](https://www.docker.com/)
* Docker compose

Caso queira executar o servidor sem utilizar o docker, tem um script no projeto Plataforma-SDK, em:
Plataforma-SDK/_scripts/shell/start-router.sh

Se você estiver utilizando o windows, é necessário executar o powersheel no modo terminal.

Caso você opte por usar o docker você pode subir com o seguinte comando:
```sh
$ docker-compose up -d
```
Ao executar esse comando o docker irá subir um container com EventManager inicializado.

Após a subida dos containers você pode enviar deve acessar o eventmamanger pelo endereço:
http://localhost:8086/presentation/<presentationName>

Onde o <presentationName> é o nome da tela que está sendo solicitada para apresentação, nome de identificação da ´presentation´ para o ´core´.

Example:
Url: http://localhost:8086/presentation/crudcontas
Http Method: GET




