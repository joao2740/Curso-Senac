# 📖 Sistema Comercial em Java com Swing

## Sobre o Projeto
Este projeto é um **sistema comercial simples**, desenvolvido em **Java** utilizando **Swing** para a interface gráfica.  

O objetivo é ensinar os alunos, de forma prática, a:
- Criar um projeto Java no Eclipse.
- Organizar pacotes (`model`, `controller`, `view`).
- Implementar classes básicas (Produto, ProdutoController).
- Construir interfaces gráficas com **Swing**.
- Implementar **Login** e redirecionamento para a tela principal de cadastro.

---

## Estrutura do Projeto

br.com.sistemacomercial
│
├── model
│ └── Produto.java
│
├── controller
│ └── ProdutoController.java
│
├── view
│ ├── LoginView.java
│ └── ProdutoView.java


### model
- **Produto.java**  
  Representa o produto com atributos `nome` e `preço`.

### controller
- **ProdutoController.java**  
  Gerencia a lista de produtos (cadastrar, listar, excluir).

### view
- **LoginView.java**  
  Tela inicial do sistema.  
  O usuário informa **usuário** e **senha**.  
  Se for válido, abre a tela de cadastro de produtos.

- **ProdutoView.java**  
  Tela de cadastro de produtos.  
  Permite adicionar, listar e excluir produtos.

---

##  Tecnologias Utilizadas
- **Java SE 8+**
- **Swing** (para interface gráfica)
- **Eclipse IDE** (ou outra IDE Java)

---

## Como Executar

1. Abra o **Eclipse**.
2. Crie um novo projeto **Java Project**.
3. Crie os pacotes:
   - `br.com.sistemacomercial.model`
   - `br.com.sistemacomercial.controller`
   - `br.com.sistemacomercial.view`
4. Adicione as classes conforme o código fornecido.
5. **Execute a classe `LoginView`**, que contém o método `main`.
6. Ao logar, você será direcionado para a tela de cadastro de produtos.

---

## Login Padrão
- **Usuário:** `admin`  
- **Senha:** `123`

Se os dados estiverem corretos, a tela de cadastro abrirá.  

---

## Funcionalidades

### Tela de Login
- Campo para **usuário**
- Campo para **senha**
- Botão **Entrar**
- Validação simples (`admin` / `123`)

### Tela de Cadastro de Produto
- Campo para digitar **nome** do produto
- Campo para digitar **preço**
- Botão **Cadastrar**
- Botão **Excluir**
- Lista que mostra os produtos cadastrados

---

## Explicação Passo a Passo
1. **LoginView**
   - Interface que pede usuário e senha.
   - Se validado, abre `ProdutoView`.
2. **ProdutoView**
   - Permite cadastrar produtos em uma lista.
   - Usa `ProdutoController` para gerenciar a lista.
3. **ProdutoController**
   - Contém métodos para **cadastrar**, **listar** e **excluir** produtos.
4. **Produto**
   - Classe simples com `nome` e `preço`.

---

## Objetivo Educacional
Este projeto foi desenvolvido para **ensinar iniciantes** em programação orientada a objetos com **Java** e introduzir a criação de **interfaces gráficas** utilizando **Swing**.  

Os alunos terão contato com:
- Estruturação de projetos em pacotes.
- Criação de classes e objetos.
- Manipulação de listas (`ArrayList`).
- Uso de eventos de botões no Swing.
- Noções de MVC (Model-View-Controller).

---
