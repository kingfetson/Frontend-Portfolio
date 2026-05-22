const projects = [
    {
        title: "AfriLearn Brand Identity",
        category: "UI/UX Design",
        description: "Full visual identity system for an ed-tech platform, focusing on minimal accessibility."
    },
    {
        title: "Figmify",
        category: "Frontend Development",
        description: "An educational tool bridging the gap between wireframes and interactive prototypes."
    },
    {
        title: "Prodev Mobile App",
        category: "Mobile (Expo)",
        description: "Developing robust mobile solutions with a focus on context-driven engineering."
    }
];

function renderProjects() {
    const grid = document.getElementById('project-grid');
    
    grid.innerHTML = projects.map(project => `
        <div class="card">
            <span>${project.category}</span>
            <h3>${project.title}</h3>
            <p>${project.description}</p>
        </div>
    `).join('');
}

// Initial render
document.addEventListener('DOMContentLoaded', renderProjects);
