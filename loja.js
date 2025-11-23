const prompt = require("prompt-sync")()
const fs = require("fs")      // fs: file system - pacote com métodos para manipular arquivos
const path = require("path")  // path (caminho): para obter o local do arquivo html salvo no diretório corrente

// 👚 Alteração de Variáveis: de "produtos" alimentícios para "itens" de moda
const itens = []          // Nome do Item (Ex: Camiseta Básica)
const categorias = []     // Categoria (Ex: Camisa, Calça, Vestido)
const precos = []         // Preço
const tamanhos = []       // Tamanhos/Detalhes (Ex: P, M, G, Cores) - Era 'ingredientes'
const fotos = []          // URL da Foto

// 1. Inclusão de Itens (Roupas)
function inclusao() {
    console.clear()              // limpa a tela
    console.log("Inclusão de Itens")
    console.log("-".repeat(40))

    const item = prompt("Item (Nome)..: ")
    const categoria = prompt("Categoria...: ")
    const preco = Number(prompt("Preço R$....: "))
    const tamanho = prompt("Tamanhos/Detalhes: ") // Era 'ingredientes'
    const foto = prompt("URL da Foto..: ")

    itens.push(item)
    categorias.push(categoria)
    precos.push(preco)
    tamanhos.push(tamanho)
    fotos.push(foto)
    
    gravaDados()

    if(itens.length > 0) {
        catalogoWeb()
    }

    console.log("Ok! Item cadastrado com Sucesso!\n")
}

// 2. Listagem de Itens (Roupas)
function listagem() {
    console.clear()              // limpa a tela
    console.log("Lista dos Itens Cadastrados")
    console.log("-".repeat(84))

    console.log()
    // 👗 Mudança na coluna 'Ingredientes' para 'Tamanhos/Detalhes'
    console.log("Nº Item................: Categoria: Preço R$ Tamanhos/Detalhes......................:")
    console.log()

    for (let i = 0; i < itens.length; i++) {
        const num = String(i + 1).padStart(2)
        const item = itens[i].padEnd(20)         // acrescenta espaços até 20 posições
        const categoria = categorias[i].padEnd(10)
        const preco = precos[i].toFixed(2).padStart(8)  // "    7.50" "   12.00"
        const tamanho = tamanhos[i].padEnd(40)          // Era 'ingredientes'
        console.log(`${num} ${item} ${categoria} ${preco} ${tamanho}`)
    }

    console.log("-".repeat(81))
    prompt("Pressione Enter....")
}

// 3. Pesquisa de Itens por Categoria
function pesquisa() {
    console.clear()              // limpa a tela
    console.log("Pesquisa de Itens por Categoria")
    console.log("-".repeat(70))

    const categoria = prompt("Categoria: ").toUpperCase()

    // 🔎 Mudança na coluna 'Ingredientes' para 'Tamanhos/Detalhes'
    console.log("\nItem...............: Tamanhos/Detalhes.......................: Preço R$")
    console.log("----------------------------------------------------------------------")

    let existe = 0

    for (let i = 0; i < itens.length; i++) {
        if (categorias[i].toUpperCase() == categoria) {
            const item = itens[i].padEnd(20)         // acrescenta espaços até 20 posições
            const tamanho = tamanhos[i].padEnd(40)   // Era 'ingredientes'
            const preco = precos[i].toFixed(2).padStart(8)  // "    7.50" "   12.00"
            console.log(`${item} ${tamanho} ${preco}`)
            existe = existe + 1
        }
    }

    if (existe == 0) {
        console.log("* Obs.: Não há itens desta categoria")
    }

    console.log("----------------------------------------------------------------------")
    prompt("Pressione Enter....")
}

// 4. Geração do Catálogo Web (HTML) - Era 'cardapioWeb'
function catalogoWeb() {
    let conteudo = `
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Catálogo Web: Moda e Estilo</title>
    <style>
        body { font-family: Arial; margin: 20px; background-color: #f4f4f4;}
        h1 { color: #2c3e50;} /* Nova cor */
        table { width: 100%; border-collapse: collapse; background-color: #fff;
                 box-shadow: 1px 1px 6px #999; border-radius: 8px; overflow: hidden;}
        th, td { padding: 12px; border-bottom: 1px solid #ccc;}
        th { background-color: #bdc3c7; color: #333; text-align: left;} /* Nova cor */
        img { max-width: 100px; max-height: 120px; border-radius: 4px; object-fit: cover;} /* Adicionado object-fit */
        tr:hover { background-color: #f9f9f9;}  
        .centro { text-align: center; }       
    </style>
</head>
<body>
    <h1>Catálogo Web: Moda e Estilo</h1> <table>
        <thead>
            <tr>
                <th>Nome do Item</th>
                <th>Categoria</th>
                <th>Tamanhos/Detalhes</th> <th>Preço R$</th>
                <th>Foto Ilustrativa</th>
            </tr>
        </thead>
        <tbody>`

    for (let i = 0; i < itens.length; i++) {
        conteudo += `
            <tr><td>${itens[i]}</td>
                <td>${categorias[i]}</td>
                <td>${tamanhos[i]}</td> <td class="centro">${precos[i].toLocaleString("pt-br", { minimumFractionDigits: 2 })}</td>
                <td class="centro"><img src="${fotos[i]}" alt="Foto do Item"></td>
            </tr>         
        `
    }

    conteudo +=
        `     
        </tbody>
    </table>      
</body>
</html>`

    // 💾 Alterado o nome do arquivo para 'catalogo.html'
    fs.writeFileSync("catalogo.html", conteudo)
    const caminhoAbsoluto = path.resolve("catalogo.html")
    const url = "file:///" + caminhoAbsoluto.replace(/\\/g, "/")

    console.log(`\n\nCatálogo gerado com sucesso. Acesse: ${url}`)

    prompt("Pressione Enter....")
}

// 5. Resumo/Estatística dos Itens
function resumo() {
    console.clear()              // limpa a tela
    console.log("Resumo/Estatística dos Itens")
    console.log("-".repeat(40))

    let num = itens.length
    let soma = 0
    let numMasculino = 0    // Nova Categoria
    let numFeminino = 0     // Nova Categoria

    for (let i = 0; i < num; i++) {
        soma = soma + precos[i]
        // 👫 Novas Categorias para Estatística
        if (categorias[i].toUpperCase() == "MASCULINO") {
            numMasculino++
        } else if (categorias[i].toUpperCase() == "FEMININO") {
            numFeminino++
        }
    }

    const media = soma / num
    console.log(`Nº Itens.......: ${num}`)
    console.log(`Preço Médio R$.: ${media.toFixed(2)}`)
    console.log(`Nº Masculino...: ${numMasculino}`)
    console.log(`Nº Feminino....: ${numFeminino}`)
    console.log("-".repeat(40))

    prompt("Pressione Enter....")
}

// 6. Alteração de Preço
function alteracao() {
    console.clear()              // limpa a tela

    listagem()

    console.log()
    // 💡 Alterado de 'Produto' para 'Item'
    const num = Number(prompt("Qual Nº do Item Alterar (0, para cancelar)? "))

    if (num == 0 || num > itens.length) {
        console.log("Nenhum item alterado...")
        prompt("Pressione Enter....")
        return
    }

    // 📝 Alterado de 'Produto' para 'Item' e de 'Ingredientes' para 'Tamanhos'
    console.log(`Item.........: ${itens[num-1]}`)
    console.log(`Categoria....: ${categorias[num-1]}`)
    console.log(`Tamanhos.....: ${tamanhos[num-1]}`)
    console.log(`Preço R$.....: ${precos[num-1].toFixed(2)}`)

    console.log()
    const novoPreco = Number(prompt("Novo Preço R$: "))

    precos[num-1] = novoPreco

    console.log("Ok. Preço alterado com sucesso")
    prompt("Pressione Enter....")
}

// 7. Exclusão de Itens
function exclusao() {
    console.clear()              // limpa a tela

    listagem()

    console.log()
    // 🗑️ Alterado de 'Produto' para 'Item'
    const num = Number(prompt("Qual Nº do Item Excluir (0, para cancelar)? "))

    if (num == 0 || num > itens.length) {
        console.log("Nenhum item excluído...")
        prompt("Pressione Enter....")
        return
    }

    // exclui os elementos dos vetores (Alterado de 'produtos' para 'itens' e 'ingredientes' para 'tamanhos')
    itens.splice(num - 1, 1)
    categorias.splice(num - 1, 1)
    tamanhos.splice(num - 1, 1)
    precos.splice(num - 1, 1)
    fotos.splice(num - 1, 1)

    console.log("Ok. Item removido com sucesso")
    prompt("Pressione Enter....")
}

// 💾 Grava os dados dos Itens em arquivo
function gravaDados() {
    const dados = []

    // coloca o conteúdo de todos os vetores em um único (Alterado de 'produtos' para 'itens' e 'ingredientes' para 'tamanhos')
    for (let i = 0; i < itens.length; i++) {
        dados.push(itens[i] + ";" +
            categorias[i] + ";" +
            precos[i] + ";" +
            tamanhos[i] + ";" +
            fotos[i])
    }

    // função que grava os dados no arquivo (Alterado de 'produtos.txt' para 'itens.txt')
    fs.writeFileSync("itens.txt", dados.join("\n"))

    console.log("\nDados salvos em arquivo...")
}

// 📥 Obtém o conteúdo do arquivo e atribui aos vetores
function recuperaDados() {
    // se existe o arquivo (Alterado de 'produtos.txt' para 'itens.txt')
    if (fs.existsSync("itens.txt")) {
        // lê os dados e atribui para um vetor separando-os por "\n"
        const linhas = fs.readFileSync("itens.txt", "utf-8").split("\n")

        // percorre todas as linhas e divide os elementos para os vetores originais
        for (let i = 0; i < linhas.length; i++) {
            const partes = linhas[i].split(";")
            
            // Certifica-se de que a linha não está vazia (caso a última linha do arquivo seja um newline)
            if (partes.length === 5) { 
                itens.push(partes[0])
                categorias.push(partes[1])
                precos.push(Number(partes[2]))
                tamanhos.push(partes[3]) // Era ingredientes
                fotos.push(partes[4])
            }
        }
    }
}

// 🚀 Chama a função (antes do programa principal) para ter a lista dos itens já cadastrados
recuperaDados()

// === Programa Principal (Menu) ===

menuPrincipal:
do {
    console.clear()              // limpa a tela
    console.log("Loja de Roupas: Moda Style") // Novo Nome da Loja
    console.log("=".repeat(40))
    console.log("1. Inclusão de Itens")
    console.log("2. Listagem de Itens")
    console.log("3. Pesquisa por Categoria")
    console.log("4. Catálogo Web (HTML)") // Novo Nome
    console.log("5. Estatística/Resumo")
    console.log("6. Alteração de Preço")
    console.log("7. Exclusão de Itens")
    console.log("8. Finalizar")
    const opcao = Number(prompt("Opção: "))
    
    switch (opcao) {
        case 1: {
            inclusao()
            break
        }
        case 2: {
            listagem()
            break
        }
        case 3: {
            pesquisa()
            break
        }
        case 4: {
            catalogoWeb() // Chamando a nova função
            break
        }
        case 5: {
            resumo()
            break
        }
        case 6: {
            alteracao()
            break
        }
        case 7: {
            exclusao()
            break
        }
        default: {
            break menuPrincipal
        }
    }

} while (true)

// no final do programa, chama a função que grava os dados em arquivo texto
gravaDados()

console.log("-".repeat(40))
console.log("Fim do Programa...")