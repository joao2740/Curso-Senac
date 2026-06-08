# Teste Automatizado de Login com Selenium WebDriver

Projeto da atividade **Introdução ao Teste Automatizado com Selenium WebDriver**.

## Arquivos do projeto

| Arquivo | Descrição |
|---------|-----------|
| `login.html` | Página de login (usuário, senha, botão, mensagem) |
| `package.json` | Configuração do projeto Node.js e dependências |
| `test.js` | Teste básico - cenário de login válido |
| `test-avancado.js` | Desafio extra - 8 cenários (válido, inválido, campos vazios, cores) |

## Pré-requisitos

- **Node.js** instalado (https://nodejs.org/)
- **Google Chrome** instalado
- **VS Code** com terminal integrado

## Passo a passo

### 1. Abrir o projeto no VS Code

Coloque todos os arquivos em uma pasta e abra-a no VS Code (`Arquivo > Abrir Pasta`).

### 2. Abrir o terminal integrado

`Terminal > Novo Terminal` (ou `Ctrl + '`).

### 3. Inicializar o projeto e instalar dependências

```bash
npm install
```

Isso instalará automaticamente o `selenium-webdriver` e o `chromedriver` listados no `package.json`.

> **Observação:** a partir da versão 4.6+ do Selenium, o **Selenium Manager** já baixa automaticamente o ChromeDriver compatível com a versão do Chrome instalada. Mesmo assim, mantemos o pacote `chromedriver` no projeto conforme o enunciado da atividade.

### 4. Executar o teste básico

```bash
node test.js
```

O Chrome será aberto automaticamente, fará login com `admin / 123456`, verificará a mensagem de sucesso e fechará o navegador. O resultado aparece no terminal:

```
Abrindo a página de login...
Preenchendo os campos...
Clicando no botão Entrar...
Mensagem exibida: Login realizado com sucesso!
✅ TESTE PASSOU: login efetuado com êxito.
Navegador encerrado.
```

### 5. Executar o teste avançado (Desafio Extra)

```bash
node test-avancado.js
```

Esse teste roda 8 cenários em sequência:

1. Login válido - admin
2. Login válido - joao
3. Login válido - maria
4. Senha incorreta
5. Usuário inexistente
6. Ambos os campos vazios
7. Apenas usuário preenchido
8. Apenas senha preenchida

E exibe um resumo final no terminal com quantos cenários passaram ou falharam.

## Usuários cadastrados (na página HTML)

| Usuário | Senha |
|---------|-------|
| admin | 123456 |
| joao | senha123 |
| maria | abc123 |

## Conceitos abordados

- **Builder**: cria a instância do navegador
- **By.id(...)**: localiza elementos pelo atributo `id`
- **sendKeys(...)**: digita texto em um campo
- **click()**: clica em um botão
- **driver.wait(...)**: espera condições antes de continuar (ex.: elemento aparecer)
- **getText() / getAttribute()**: obtém texto e atributos para validação
- **driver.quit()**: encerra o navegador ao final do teste

## Solução de problemas comuns

**"ChromeDriver only supports Chrome version X"**
O ChromeDriver precisa ser compatível com a versão do Chrome. Atualize:
```bash
npm install chromedriver@latest
```

**"chromedriver não encontrado"**
Rode novamente: `npm install`

**A janela do Chrome abre e fecha rápido demais**
Aumente o `driver.sleep(3000)` no final do `test.js` para 5000 ou mais.
