const projects = [
    {
        title: "AfriLearn Identity",
        category: "Visual System",
        desc: "A cohesive design ecosystem for digital education."
    },
    {
        title: "Figmify Tooling",
        category: "Frontend Architecture",
        desc: "Converting static ideas into production-ready prototypes."
    },
    {
        title: "Context-Aware UI",
        category: "Product Design",
        desc: "Research-driven interfaces for AI interactions."
    }
];

function init() {
    const grid = document.getElementById('project-grid');
    
    grid.innerHTML = projects.map(p => `
        <div class="project-card reveal">
            <div class="image-placeholder"></div>
            <p class="badge">${p.category}</p>
            <h3>${p.title}</h3>
            <p>${p.desc}</p>
        </div>
    `).join('');

    // Reveal on Scroll Logic
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = "1";
                entry.target.style.transform = "translateY(0)";
            }
        });
    }, { threshold: 0.1 });

    document.querySelectorAll('.reveal').forEach(el => {
        el.style.opacity = "0";
        el.style.transform = "translateY(30px)";
        el.style.transition = "all 0.8s ease-out";
        observer.observe(el);
    });
}

document.addEventListener('DOMContentLoaded', init);
