// ============================================================
// TESTE AUTOMATIZADO AVANÇADO - DESAFIO EXTRA
// ============================================================
// Cobre os cenários:
//  - Login válido (múltiplos usuários cadastrados)
//  - Login inválido (senha/usuário errados)
//  - Campos vazios (validação de obrigatoriedade)
//  - Verificação da cor da mensagem (sucesso/erro)
// ============================================================

const { Builder, By, until } = require('selenium-webdriver');
const path = require('path');

const caminhoHtml = 'file://' + path.resolve(__dirname, 'login.html');

// Executa um cenário de teste individual
async function executarCenario(driver, cenario) {
    console.log(`\n=== ${cenario.nome} ===`);

    // Recarrega a página para começar do zero
    await driver.get(caminhoHtml);

    // Preenche os campos somente se houver valor (cenários de campo vazio)
    if (cenario.usuario) {
        await driver.findElement(By.id('usuario')).sendKeys(cenario.usuario);
    }
    if (cenario.senha) {
        await driver.findElement(By.id('senha')).sendKeys(cenario.senha);
    }

    // Clica em "Entrar"
    await driver.findElement(By.id('botao')).click();

    // Aguarda a mensagem aparecer
    const elementoMensagem = await driver.wait(
        until.elementLocated(By.id('mensagem')),
        5000
    );

    await driver.wait(async () => {
        const texto = await elementoMensagem.getText();
        return texto.length > 0;
    }, 5000);

    // Captura o texto exibido e a classe CSS (cor)
    const mensagem = await elementoMensagem.getText();
    const classe   = await elementoMensagem.getAttribute('class');

    console.log(`Mensagem: "${mensagem}"`);
    console.log(`Classe CSS (cor): ${classe}`);

    // Verifica se o resultado bate com o esperado
    const passou = mensagem === cenario.mensagemEsperada
                && classe   === cenario.classeEsperada;

    if (passou) {
        console.log("✅ PASSOU");
    } else {
        console.log("❌ FALHOU");
        console.log(`   Esperado: "${cenario.mensagemEsperada}" (${cenario.classeEsperada})`);
    }

    // Pausa breve entre cenários para o aluno acompanhar
    await driver.sleep(1500);
    return passou;
}

async function executarTestes() {
    const driver = await new Builder().forBrowser('chrome').build();

    // Definição de todos os cenários de teste
    const cenarios = [
        {
            nome: "Cenário 1: Login válido - admin",
            usuario: "admin",
            senha: "123456",
            mensagemEsperada: "Login realizado com sucesso!",
            classeEsperada: "sucesso"
        },
        {
            nome: "Cenário 2: Login válido - joao",
            usuario: "joao",
            senha: "senha123",
            mensagemEsperada: "Login realizado com sucesso!",
            classeEsperada: "sucesso"
        },
        {
            nome: "Cenário 3: Login válido - maria",
            usuario: "maria",
            senha: "abc123",
            mensagemEsperada: "Login realizado com sucesso!",
            classeEsperada: "sucesso"
        },
        {
            nome: "Cenário 4: Senha incorreta",
            usuario: "admin",
            senha: "senha_errada",
            mensagemEsperada: "Usuário ou senha inválidos!",
            classeEsperada: "erro"
        },
        {
            nome: "Cenário 5: Usuário inexistente",
            usuario: "fulano",
            senha: "qualquer",
            mensagemEsperada: "Usuário ou senha inválidos!",
            classeEsperada: "erro"
        },
        {
            nome: "Cenário 6: Ambos os campos vazios",
            usuario: "",
            senha: "",
            mensagemEsperada: "Preencha todos os campos!",
            classeEsperada: "erro"
        },
        {
            nome: "Cenário 7: Apenas usuário preenchido",
            usuario: "admin",
            senha: "",
            mensagemEsperada: "Preencha todos os campos!",
            classeEsperada: "erro"
        },
        {
            nome: "Cenário 8: Apenas senha preenchida",
            usuario: "",
            senha: "123456",
            mensagemEsperada: "Preencha todos os campos!",
            classeEsperada: "erro"
        }
    ];

    let passou = 0;
    let falhou = 0;

    try {
        for (const cenario of cenarios) {
            const ok = await executarCenario(driver, cenario);
            ok ? passou++ : falhou++;
        }

        console.log("\n========================================");
        console.log(`RESUMO FINAL: ${passou} passaram | ${falhou} falharam`);
        console.log("========================================\n");

    } catch (erro) {
        console.error("Erro durante a execução dos testes:", erro);
    } finally {
        await driver.quit();
    }
}

executarTestes();
