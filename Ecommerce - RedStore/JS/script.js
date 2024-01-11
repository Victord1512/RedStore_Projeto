document.addEventListener('DOMContentLoaded', function () {
/*Coloquei esse DOMContentLoaded para que o sistema processe todos os elementos do site antes de rodar o script*/
    const navbar = document.querySelector(".navbar");
    const menu = document.querySelector(".menu-button");

    menu.addEventListener("click", () => {
        navbar.classList.toggle("show-menu");
    });

    document.getElementById('btnCarrinho').addEventListener('click', function() {
        var carrinhoInterface = document.querySelector('.carrinho-container');
        
        // Verifica se o estilo 'display' da interface do carrinho é 'none' ou está vazio
        if (carrinhoInterface.style.display === 'none' || carrinhoInterface.style.display === '') {
            // Se verdadeiro, alterna para 'block' (torna visível)
            carrinhoInterface.style.display = 'block';
        } else {
            // Se falso, alterna para 'none' (torna invisível)
            carrinhoInterface.style.display = 'none';
        }
    });


    document.getElementById('btn-categorias').addEventListener('click', function() {
        var menuCategorias = document.querySelector('.menu-categorias');
        
        // Verifica se o estilo 'display' da interface do carrinho é 'none' ou está vazio
        if (menuCategorias.style.display === 'none' || menuCategorias.style.display === '') {
            // Se verdadeiro, alterna para 'block' (torna visível)
            menuCategorias.style.display = 'block';
        } else {
            // Se falso, alterna para 'none' (torna invisível)
            menuCategorias.style.display = 'none';
        }
    });

    // 
    // Quando o botão me interessei for acionado, vai aparecer a interface com as informações do produto.
    var btnMeInteressei = document.getElementsByClassName('btn-meInteressei');
    for (var i = 0; i < btnMeInteressei.length; i++) {
        btnMeInteressei[i].addEventListener('click', function() {
            var informaçõesProdutoBanner1 = document.querySelector('.informações-produto-banner1');
            // Função para quando o botão me interessei for acionado
            if (informaçõesProdutoBanner1.style.display === 'none' || informaçõesProdutoBanner1.style.display === '') {
                informaçõesProdutoBanner1.style.display = 'block';
            } else {
                informaçõesProdutoBanner1.style.display = 'none';
            }
        });
    }


    function removerProduto(){
        // Selecionando o botão  
        const btnRemover = document.getElementsByClassName("botão-remover");
        // Adicionando um evento click em cada botão que estiver no carrinho
        for(let i = 0; i < btnRemover.length; i++){
            btnRemover[i].addEventListener("click", function(evento){
                // Removendo o elemento pai
                evento.target.parentElement.parentElement.remove();
                // Precisei acessar o td que seria o pai do botão remover, para depois pegar o tr, que no caso é pai do td.
                // E enfim adicionar o método remove(), que remove elementos.
                atualizarTotal()
                //Por fim atualizamos o total
            })
        }
    }    
    removerProduto();
    
    
    function atualizarTotal(){
        let total = 0;
        const produtoCart = document.getElementsByClassName("produto");
        for(let i = 0; i < produtoCart.length; i++){
            const preço = produtoCart[i].getElementsByClassName("preço-produto")[0].innerText.replace("R$", "").replace(",", ".");
            const qtde = produtoCart[i].getElementsByClassName("quantidade")[0].value
            total += preço*qtde
        }
        document.querySelector(".total span").innerText = "R$" + total.toFixed(2)
    }
    
    // Aqui fiz uma lógica para quando o usuário mudar a quantidade, o total seja atualizado.
    const qtdeInputs = document.getElementsByClassName("quantidade")
    for(var i = 0; i<qtdeInputs.length; i++){
        qtdeInputs[i].addEventListener("change", atualizarTotal)
    }

    const btnAdicionar = document.getElementsByClassName("adicionar-produto")
    for(var i=0; i<btnAdicionar.length; i++){
        btnAdicionar[i].addEventListener("click", adicionarAoCarrinho)
    }
    ///////////////////////////////////////////////////////////////////////////////////////////////
    function adicionarAoCarrinho(evento){
        const botãoAdiconar = evento.target
        const infosProduto = botãoAdiconar.parentElement
        const imagemProduto = infosProduto.getElementsByClassName("imagem-produto")[0].src
        const nomeProduto = infosProduto.getElementsByClassName("nome-produto")[0].innerText
        const preçoProduto = infosProduto.getElementsByClassName("preço-produto")[0].innerText
        
        // Pegando a div da mensagem
        const mensagemDiv = document.getElementById('mensagemAdicao');
        // Definindo o texto da mensagem
        mensagemDiv.textContent = `${nomeProduto} foi adicionado ao carrinho!`;
        // Exibe a div de mensagem
        mensagemDiv.style.display = 'block';
        // Oculta a div de mensagem após 2 segundos
        setTimeout(function () {
            mensagemDiv.style.display = 'none';
        }, 3000);

    
        let novoProduto = document.createElement("tr")
        novoProduto.classList.add("produto")

        novoProduto.innerHTML = 
        `
        <td class="imagem-produto"><img src="${imagemProduto}" alt="${nomeProduto}"></td>
        <td class="nome-produto">${nomeProduto}</td>
        <td class="preço-produto">${preçoProduto}</td>
        <td><input type="number" value="1" min="1" class="quantidade"></td>
        <td class="remover-produto">
            <button type="button" class="botão-remover">&#128465;</button>
        </td>
        `

        const tbody = document.querySelector(".tabela-produtos tbody")
        tbody.append(novoProduto)


        atualizarTotal()
        novoProduto.getElementsByClassName("quantidade")[0].addEventListener("change", atualizarTotal)
        novoProduto.getElementsByClassName("botão-remover")[0].addEventListener("click", removerProduto)
    }

    

    function adicionarProdutoBanner1 (){
        const btnAdicionar_MeInteressei = document.getElementById("btn-meInteressei")
        btnAdicionar_MeInteressei.addEventListener("click", function(){
            
            nomeProduto = "Notebook Gamer - Acer Nitro 5"
            const mensagemDiv1 = document.getElementById('mensagemAdicao');
            // Definindo o texto da mensagem
            mensagemDiv1.textContent = `${nomeProduto} foi adicionado ao carrinho!`;
            // Exibe a div de mensagem
            mensagemDiv1.style.display = 'block';
            // Oculta a div de mensagem após 2 segundos
            setTimeout(function () {
                mensagemDiv1.style.display = 'none';
            }, 3000);
            
            let produtoBanner1 = document.createElement("tr")
            produtoBanner1.classList.add("produto")
            

            
            produtoBanner1.innerHTML = 
            `
            <td class="imagem-produto"><img src="./imagens/banner1.png" alt="Notebook"></td>
            <td class="nome-produto">Notebook Gamer - Acer Nitro 5</td>
            <td class="preço-produto">R$4200,00</td>
            <td><input type="number" value="1" min="1" class="quantidade"></td>
            <td class="remover-produto">
                <button type="button" class="botão-remover">&#128465;</button>
            </td>
            `
    
            const tbody_produtoBanner1 = document.querySelector(".tabela-produtos tbody")
            tbody_produtoBanner1.append(produtoBanner1)
            atualizarTotal()
            produtoBanner1.getElementsByClassName("quantidade")[0].addEventListener("change", atualizarTotal)
            produtoBanner1.getElementsByClassName("botão-remover")[0].addEventListener("click", removerProduto)
        })
    }
    adicionarProdutoBanner1()

    function adicionarProdutoDestaque (){
        const btnAdicionar_Produto_Destaque = document.getElementById("btn-produto-destaque")
        btnAdicionar_Produto_Destaque.addEventListener("click", function(){
            let produtoDestaque = document.createElement("tr")
            produtoDestaque.classList.add("produto")
    
            nomeProduto = "Smart Watch Esportivo"
            const mensagemDiv = document.getElementById('mensagemAdicao');
            // Definindo o texto da mensagem
            mensagemDiv.textContent = `${nomeProduto} foi adicionado ao carrinho!`;
            // Exibe a div de mensagem
            mensagemDiv.style.display = 'block';
            // Oculta a div de mensagem após 2 segundos
            setTimeout(function () {
                mensagemDiv.style.display = 'none';
            }, 3000);


            produtoDestaque.innerHTML = 
            `
            <td class="imagem-produto"><img src="./imagens/SmartWatch.png" alt="Smart Watch Esportivo"></td>
            <td class="nome-produto">Smart Watch Esportivo</td>
            <td class="preço-produto">R$180,00</td>
            <td><input type="number" value="1" min="1" class="quantidade"></td>
            <td class="remover-produto">
                <button type="button" class="botão-remover">&#128465;</button>
            </td>
            `
    
            const tbody_produtoDestaque = document.querySelector(".tabela-produtos tbody")
            tbody_produtoDestaque.append(produtoDestaque)
            atualizarTotal()
            produtoDestaque.getElementsByClassName("quantidade")[0].addEventListener("change", atualizarTotal)
            produtoDestaque.getElementsByClassName("botão-remover")[0].addEventListener("click", removerProduto)
        })
    }
    adicionarProdutoDestaque()

    const links = document.querySelectorAll('nav a');
    links.forEach(link => {
      link.addEventListener('click', function(event) {
        event.preventDefault(); // Evita o comportamento padrão do link
        const targetId = this.getAttribute('href').substring(1);

        if (targetId === 'sobre') {
          // Se o link for "sobre", role até o rodapé
          const footer = document.getElementById('footer');
          footer.scrollIntoView({ behavior: 'smooth' });
        } else {
          // Para outros links, role para a seção correspondente
          const targetElement = targetId === 'home' ? document.body : document.getElementById(targetId);
          targetElement.scrollIntoView({ behavior: 'smooth' });
        }
      });
    });
    const categorias = document.querySelectorAll('.container-categorias a');
    categorias.forEach(categoria => {
      categoria.addEventListener('click', function(event) {
        event.preventDefault(); // Evita o comportamento padrão do link
        const targetId = this.getAttribute('href').substring(1);

        if (targetId === 'notebooks') {
          // Se o link for "sobre", role até o rodapé
          const notebooks = document.getElementById('notebooks');
          notebooks.scrollIntoView({ behavior: 'smooth' });
        }
        else if(targetId === 'setup'){
            const setup = document.getElementById('setup');
            setup.scrollIntoView({ behavior: 'smooth' });
        }
        else {
          // Para outros links, role para a seção correspondente
          const gamer = document.getElementById('gamer');
          gamer.scrollIntoView({ behavior: 'smooth' });
        }
      });
    });
});
