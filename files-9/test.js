// ============================================================
// TESTE AUTOMATIZADO BÁSICO - SELENIUM WEBDRIVER
// ============================================================
// Este teste:
//  1. Abre o navegador Chrome
//  2. Acessa a página de login (login.html)
//  3. Preenche os campos de usuário e senha
//  4. Clica no botão "Entrar"
//  5. Valida a mensagem exibida na tela
//  6. Encerra o navegador
// ============================================================

// Importa os módulos do Selenium
const { Builder, By, until } = require('selenium-webdriver');
const path = require('path');

async function testeLogin() {
    // Inicializa o navegador Chrome
    let driver = await new Builder().forBrowser('chrome').build();

    try {
        // Monta o caminho absoluto do arquivo HTML local
        const caminhoHtml = 'file://' + path.resolve(__dirname, 'login.html');

        console.log("Abrindo a página de login...");
        await driver.get(caminhoHtml);

        // Localiza os campos pelo ID e preenche
        console.log("Preenchendo os campos...");
        await driver.findElement(By.id('usuario')).sendKeys('admin');
        await driver.findElement(By.id('senha')).sendKeys('123456');

        // Clica no botão "Entrar"
        console.log("Clicando no botão Entrar...");
        await driver.findElement(By.id('botao')).click();

        // Aguarda a mensagem aparecer na tela (até 5 segundos)
        const elementoMensagem = await driver.wait(
            until.elementLocated(By.id('mensagem')),
            5000
        );

        // Aguarda o texto da mensagem ser preenchido
        await driver.wait(async () => {
            const texto = await elementoMensagem.getText();
            return texto.length > 0;
        }, 5000);

        // Captura o texto exibido
        const mensagem = await elementoMensagem.getText();
        console.log("Mensagem exibida:", mensagem);

        // Valida o resultado
        if (mensagem === "Login realizado com sucesso!") {
            console.log("✅ TESTE PASSOU: login efetuado com êxito.");
        } else {
            console.log("❌ TESTE FALHOU: mensagem inesperada.");
        }

        // Pausa para o aluno observar o resultado no navegador
        await driver.sleep(3000);

    } catch (erro) {
        console.error("Erro durante o teste:", erro);
    } finally {
        // Encerra o navegador
        await driver.quit();
        console.log("Navegador encerrado.");
    }
}

// Executa o teste
testeLogin();
