// Elementos DOM
const loginScreen = document.getElementById('loginScreen');
const mainContent = document.getElementById('mainContent');
const loginForm = document.getElementById('loginForm');
const licenseKeyInput = document.getElementById('licenseKey');
const loginError = document.getElementById('loginError');
const methodOptions = document.querySelectorAll('.method-option');
const step4Title = document.getElementById('step4-title');
const step4Desc = document.getElementById('step4-desc');
const step4OfficeDesc = document.getElementById('step4-office-desc');
const step4OfficeNote = document.getElementById('step4-office-note');

// Chave de licença válida
const validLicenseKey = "PXIYFWWYSVDWKSHDWHW98";

// Verificar se o usuário já está logado
if (localStorage.getItem('isAuthenticated') === 'true') {
    loginScreen.style.display = 'none';
    mainContent.style.display = 'block';
}

// Processar formulário de login
loginForm.addEventListener('submit', function(e) {
    e.preventDefault();
    
    const enteredKey = licenseKeyInput.value.trim();
    
    if (enteredKey === validLicenseKey) {
        // Login bem-sucedido
        localStorage.setItem('isAuthenticated', 'true');
        loginScreen.style.display = 'none';
        mainContent.style.display = 'block';
    } else {
        // Login falhou
        loginError.style.display = 'block';
        licenseKeyInput.style.borderColor = '#ff6b6b';
        
        // Limpar o campo após 2 segundos
        setTimeout(() => {
            licenseKeyInput.value = '';
            licenseKeyInput.style.borderColor = 'rgba(255, 255, 255, 0.2)';
            loginError.style.display = 'none';
        }, 2000);
    }
});

// Configurar seletor de método
methodOptions.forEach(option => {
    option.addEventListener('click', function() {
        // Remover classe active de todas as opções
        methodOptions.forEach(opt => opt.classList.remove('active'));
        
        // Adicionar classe active à opção clicada
        this.classList.add('active');
        
        // Atualizar conteúdo baseado na seleção
        const method = this.getAttribute('data-method');
        updateMethod(method);
    });
});

// Atualizar conteúdo baseado no método selecionado
function updateMethod(method) {
    if (method === 'windows') {
        step4Title.textContent = 'Selecione a opção de ativação';
        step4Desc.style.display = 'block';
        step4OfficeDesc.style.display = 'none';
        step4OfficeNote.style.display = 'none';
    } else if (method === 'office') {
        step4Title.textContent = 'Selecione a opção para Office';
        step4Desc.style.display = 'none';
        step4OfficeDesc.style.display = 'block';
        step4OfficeNote.style.display = 'block';
    }
}

// Função para copiar o código
function copyCode() {
    const code = document.getElementById('code');
    const textArea = document.createElement('textarea');
    textArea.value = code.textContent;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
    
    // Mostrar mensagem de sucesso
    showSuccessMessage('Código copiado para a área de transferência!');
}

// Função para copiar a chave PIX
function copyPix() {
    const pixCode = '11918296867';
    const textArea = document.createElement('textarea');
    textArea.value = pixCode;
    document.body.appendChild(textArea);
    textArea.select();
    document.execCommand('copy');
    document.body.removeChild(textArea);
    
    // Mostrar mensagem de sucesso
    showSuccessMessage('Chave PIX copiada para a área de transferência!');
}

// Mostrar mensagem de sucesso
function showSuccessMessage(message) {
    const successMessage = document.getElementById('successMessage');
    successMessage.innerHTML = `<i class="fas fa-check-circle"></i> ${message}`;
    successMessage.classList.add('show');
    
    setTimeout(() => {
        successMessage.classList.remove('show');
    }, 3000);
}

// Criar efeito sakura (flores caindo)
function createSakura() {
    const sakuraContainer = document.body;
    const sakuraCount = 15; // Número de flores (reduzido para mobile)
    
    for (let i = 0; i < sakuraCount; i++) {
        setTimeout(() => {
            const sakura = document.createElement('div');
            sakura.className = 'sakura';
            sakura.innerHTML = '❀';
            
            // Posição aleatória
            const startPositionX = Math.random() * 100;
            sakura.style.left = startPositionX + 'vw';
            
            // Duração e atraso aleatórios
            const duration = Math.random() * 15 + 15;
            const delay = Math.random() * 5;
            sakura.style.animationDuration = duration + 's';
            sakura.style.animationDelay = delay + 's';
            
            // Tamanho aleatório
            const size = Math.random() * 15 + 10;
            sakura.style.fontSize = size + 'px';
            
            // Opacidade aleatória
            const opacity = Math.random() * 0.5 + 0.3;
            sakura.style.opacity = opacity;
            
            sakuraContainer.appendChild(sakura);
            
            // Remover após a animação
            setTimeout(() => {
                if (sakura.parentNode) {
                    sakura.remove();
                }
            }, (duration + delay) * 1000);
        }, i * 800);
    }
}

// Efeito de destaque nos passos ao rolar
function highlightSteps() {
    const steps = document.querySelectorAll('.step');
    const windowHeight = window.innerHeight;
    
    steps.forEach(step => {
        const stepTop = step.getBoundingClientRect().top;
        if (stepTop < windowHeight * 0.75) {
            step.classList.add('active');
        } else {
            step.classList.remove('active');
        }
    });
}

// Iniciar o efeito sakura e repetir
createSakura();
setInterval(createSakura, 20000); // Repetir a cada 20 segundos

// Adicionar evento de scroll para destacar passos
window.addEventListener('scroll', highlightSteps);

// Destacar passos iniciais
if (localStorage.getItem('isAuthenticated') === 'true') {
    setTimeout(highlightSteps, 500);
}