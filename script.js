// Menu Mobile
const menuBtn = document.querySelector('.menu-btn');
const menu = document.querySelector('.menu');

menuBtn.addEventListener('click', () => {
    menu.classList.toggle('active');
});

// Fechar menu ao clicar em um link
document.querySelectorAll('.menu a').forEach(link => {
    link.addEventListener('click', () => {
        menu.classList.remove('active');
    });
});

// Header Scroll
window.addEventListener('scroll', () => {
    const header = document.querySelector('header');
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

function showDepoimento(index) {
    if (index < 0) {
        currentIndex = depoimentos.length - 1;
    } else if (index >= depoimentos.length) {
        currentIndex = 0;
    } else {
        currentIndex = index;
    }
    
    const offset = -currentIndex * 100 + '%';
    depoimentosSlider.style.transform = 'translateX(' + offset + ')';
    
    // Atualizar dots
    dots.forEach(dot => dot.classList.remove('active'));
    dots[currentIndex].classList.add('active');
}

// Inicializar slider
showDepoimento(0);

// Event listeners para dots
dots.forEach((dot, index) => {
    dot.addEventListener('click', () => {
        showDepoimento(index);
    });
});

// Auto slide a cada 5 segundos
setInterval(() => {
    showDepoimento(currentIndex + 1);
}, 5000);

// Suporte para swipe em dispositivos móveis
depoimentosSlider.addEventListener('touchstart', (e) => {
    touchStartX = e.changedTouches[0].screenX;
});

depoimentosSlider.addEventListener('touchend', (e) => {
    touchEndX = e.changedTouches[0].screenX;
    handleSwipe();
});

function handleSwipe() {
    if (touchEndX < touchStartX) {
        // Swipe para a esquerda
        showDepoimento(currentIndex + 1);
    } else if (touchEndX > touchStartX) {
        // Swipe para a direita
        showDepoimento(currentIndex - 1);
    }
}

// Toggle de Preços (Mensal/Anual)
const planoToggle = document.getElementById('plano-toggle');
const precosMensais = document.querySelectorAll('.preco-mensal');
const precosAnuais = document.querySelectorAll('.preco-anual');

planoToggle.addEventListener('change', () => {
    if (planoToggle.checked) {
        // Mostrar preços anuais
        precosMensais.forEach(preco => preco.style.display = 'none');
        precosAnuais.forEach(preco => preco.style.display = 'inline');
    } else {
        // Mostrar preços mensais
        precosMensais.forEach(preco => preco.style.display = 'inline');
        precosAnuais.forEach(preco => preco.style.display = 'none');
    }
});

// FAQ Accordion
const faqQuestions = document.querySelectorAll('.faq-question');

faqQuestions.forEach(question => {
    question.addEventListener('click', () => {
        const faqItem = question.parentElement;
        faqItem.classList.toggle('active');
        
        // Fechar outros itens
        document.querySelectorAll('.faq-item').forEach(item => {
            if (item !== faqItem) {
                item.classList.remove('active');
            }
        });
    });
});

// Rolagem suave para as seções
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Animação de elementos quando estiverem visíveis
const observerOptions = {
    threshold: 0.1
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate');
        }
    });
}, observerOptions);

// Observar elementos para animação
document.querySelectorAll('.section-header, .recurso-card, .step, .preco-card, .faq-item').forEach(element => {
    observer.observe(element);
});

// Adicionar classes de animação CSS
document.addEventListener('DOMContentLoaded', () => {
    document.querySelectorAll('.section-header, .recurso-card, .step, .preco-card, .faq-item').forEach(element => {
        element.classList.add('fade-in');
    });
});