document.addEventListener('DOMContentLoaded', function() {
    // Variáveis globais
    let carrinho = [];
    const carrinhoModal = document.getElementById('carrinho-modal');
    const btnVerCarrinho = document.getElementById('ver-carrinho');
    const spanFechar = document.getElementsByClassName('fechar-modal')[0];
    const btnFinalizarCompra = document.getElementById('finalizar-compra');
    
    // Botões "Adicionar ao Carrinho"
    const botoesAdicionar = document.querySelectorAll('.adicionar-carrinho');
    
    // Atualizar contador do carrinho
    function atualizarContadorCarrinho() {
        const totalItens = carrinho.reduce((total, item) => total + item.quantidade, 0);
        document.getElementById('carrinho-contador').textContent = totalItens;
    }
    
    // Atualizar modal do carrinho
    function atualizarCarrinhoModal() {
        const carrinhoItens = document.getElementById('carrinho-itens');
        const carrinhoTotal = document.getElementById('carrinho-total');
        
        if (carrinho.length === 0) {
            carrinhoItens.innerHTML = '<p id="carrinho-vazio">Seu carrinho está vazio</p>';
            carrinhoTotal.textContent = '0,00';
            return;
        }
        
        carrinhoItens.innerHTML = '';
        
        let total = 0;
        
        carrinho.forEach((item, index) => {
            const itemElement = document.createElement('div');
            itemElement.className = 'item-carrinho';
            
            const itemInfo = document.createElement('div');
            itemInfo.className = 'item-carrinho-info';
            
            const itemNome = document.createElement('span');
            itemNome.className = 'item-carrinho-nome';
            itemNome.textContent = item.nome;
            
            const itemPreco = document.createElement('span');
            itemPreco.className = 'item-carrinho-preco';
            itemPreco.textContent = `R$ ${item.preco.toFixed(2).replace('.', ',')} x ${item.quantidade}`;
            
            itemInfo.appendChild(itemNome);
            itemInfo.appendChild(document.createElement('br'));
            itemInfo.appendChild(itemPreco);
            
            const btnRemover = document.createElement('button');
            btnRemover.className = 'item-carrinho-remover';
            btnRemover.textContent = 'Remover';
            btnRemover.addEventListener('click', () => removerDoCarrinho(index));
            
            itemElement.appendChild(itemInfo);
            itemElement.appendChild(btnRemover);
            
            carrinhoItens.appendChild(itemElement);
            
            total += item.preco * item.quantidade;
        });
        
        carrinhoTotal.textContent = total.toFixed(2).replace('.', ',');
    }
    
    // Adicionar item ao carrinho
    function adicionarAoCarrinho(id, nome, preco) {
        const itemExistente = carrinho.find(item => item.id === id);
        
        if (itemExistente) {
            itemExistente.quantidade += 1;
        } else {
            carrinho.push({
                id,
                nome,
                preco: parseFloat(preco),
                quantidade: 1
            });
        }
        
        atualizarContadorCarrinho();
        atualizarCarrinhoModal();
    }
    
    // Remover item do carrinho
    function removerDoCarrinho(index) {
        if (carrinho[index].quantidade > 1) {
            carrinho[index].quantidade -= 1;
        } else {
            carrinho.splice(index, 1);
        }
        
        atualizarContadorCarrinho();
        atualizarCarrinhoModal();
    }
    
    // Event listeners
    botoesAdicionar.forEach(botao => {
        botao.addEventListener('click', function() {
            const id = this.getAttribute('data-id');
            const nome = this.getAttribute('data-nome');
            const preco = this.getAttribute('data-preco');
            
            adicionarAoCarrinho(id, nome, preco);
            
            // Feedback visual
            this.textContent = 'Adicionado!';
            setTimeout(() => {
                this.textContent = 'Adicionar ao Carrinho';
            }, 1000);
        });
    });
    
    btnVerCarrinho.addEventListener('click', function() {
        carrinhoModal.style.display = 'block';
    });
    
    spanFechar.addEventListener('click', function() {
        carrinhoModal.style.display = 'none';
    });
    
    window.addEventListener('click', function(event) {
        if (event.target === carrinhoModal) {
            carrinhoModal.style.display = 'none';
        }
    });
    
    btnFinalizarCompra.addEventListener('click', function() {
        if (carrinho.length === 0) {
            alert('Seu carrinho está vazio!');
            return;
        }
        
        alert('Compra finalizada com sucesso! Obrigado por comprar na TechStore.');
        carrinho = [];
        atualizarContadorCarrinho();
        atualizarCarrinhoModal();
        carrinhoModal.style.display = 'none';
    });
});