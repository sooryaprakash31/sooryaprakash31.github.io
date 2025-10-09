// Main JavaScript functionality for the portfolio
class Portfolio {
    constructor() {
        this.init();
    }

    init() {
        this.setupThemeToggle();
        this.setupNavigation();
        this.setupMobileMenu();
        this.setupScrollToSection();
        this.initializeTheme();
    }

    // Theme Toggle Functionality
    setupThemeToggle() {
        const themeToggle = document.getElementById('themeToggle');
        const themeIcon = themeToggle.querySelector('.theme-icon');

        themeToggle.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'dark' ? 'light' : 'dark';

            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);

            // Update icon
            themeIcon.textContent = newTheme === 'dark' ? '☀️' : '🌙';
        });
    }

    // Initialize theme from localStorage or system preference
    initializeTheme() {
        const savedTheme = localStorage.getItem('theme');
        const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        const theme = savedTheme || (systemPrefersDark ? 'dark' : 'light');

        document.documentElement.setAttribute('data-theme', theme);

        const themeIcon = document.querySelector('.theme-icon');
        themeIcon.textContent = theme === 'dark' ? '☀️' : '🌙';
    }

    // Navigation and Tab Switching
    setupNavigation() {
        const navLinks = document.querySelectorAll('.nav-link[data-tab]');
        const tabContents = document.querySelectorAll('.tab-content');

        navLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const targetTab = link.getAttribute('data-tab');
                this.switchTab(targetTab, navLinks, tabContents);
                this.closeMobileMenu();
            });
        });

        // Handle hash changes for direct links
        window.addEventListener('hashchange', () => {
            const hash = window.location.hash.slice(1);
            if (hash) {
                this.switchTab(hash, navLinks, tabContents);
            }
        });

        // Initialize with current hash or default to 'about'
        const initialTab = window.location.hash.slice(1) || 'about';
        this.switchTab(initialTab, navLinks, tabContents);
    }

    // Update on page load
    switchTab(targetTab, navLinks, tabContents) {
        // Remove active class from all nav links
        navLinks.forEach(link => link.classList.remove('active'));

        // Hide all tab contents
        tabContents.forEach(content => content.classList.remove('active'));

        // Activate target tab
        const targetNavLink = document.querySelector(`[data-tab="${targetTab}"]`);
        const targetContent = document.getElementById(targetTab);

        if (targetNavLink && targetContent) {
            targetNavLink.classList.add('active');
            targetContent.classList.add('active');

            // Update URL hash without scrolling
            history.replaceState(null, null, `#${targetTab}`);
        }
    }

    // Mobile Menu Toggle
    setupMobileMenu() {
        const mobileMenuToggle = document.getElementById('mobileMenuToggle');
        const navbarMenu = document.querySelector('.navbar-menu');

        mobileMenuToggle.addEventListener('click', () => {
            navbarMenu.classList.toggle('active');
            mobileMenuToggle.classList.toggle('active');
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (!mobileMenuToggle.contains(e.target) && !navbarMenu.contains(e.target)) {
                this.closeMobileMenu();
            }
        });
    }

    closeMobileMenu() {
        const navbarMenu = document.querySelector('.navbar-menu');
        const mobileMenuToggle = document.getElementById('mobileMenuToggle');

        navbarMenu.classList.remove('active');
        mobileMenuToggle.classList.remove('active');
    }

    // Smooth scroll to sections
    setupScrollToSection() {
        const buttons = document.querySelectorAll('[data-tab]');

        buttons.forEach(button => {
            button.addEventListener('click', (e) => {
                const targetTab = button.getAttribute('data-tab');
                const targetElement = document.getElementById(targetTab);

                if (targetElement) {
                    // Small delay to allow tab switch animation
                    setTimeout(() => {
                        window.scrollTo({
                            top: 0,
                            behavior: 'smooth'
                        });
                    }, 100);
                }
            });
        });
    }
}

// Data Management for Dynamic Content
class ContentManager {
    constructor() {
        this.data = {
            projects: [
                {
                    title: "FilmBuddy",
                    description: "A Film Recommendation Engine",
                    image: "assets/project1.jpg",
                    technologies: ["Python", "Flask", "REST API", "Docker"],
                    demoUrl: "#",
                    githubUrl: "https://github.com/sooryaprakash31/FilmBuddy"
                }
            ],
            experience: {
                workExperience: [
                    {
                        title: "Software Engineer - Machine Learning",
                        company: "Kaleris",
                        location: "Chennai, India",
                        duration: "Oct 2022 - Present",
                        description: "• Enhanced the No Code Auto ML framework to accommodate a wide range of machine learning and deep learning algorithms, optimized" +
                            "its architecture for scalability, and successfully deployed it in large-scale production environments.<br>" +
                            "• Collaborated with cross-functional teams to conduct in-depth historical data analysis and engineered recurrent neural network models for" +
                            "precise terminal occupancy prediction resulting in a notable 20% efficiency improvement and optimal resource allocation. <br>" +
                            "• Introduced features like dynamic filtering and task monitoring into the framework, resulting in heightened customer satisfaction.",
                        technologies: ["Python", "Machine Learning", "Deep Learning", "Flask", "Docker", "Kubernetes", "AWS"]
                    },
                    {
                        title: "Associate Software Engineer",
                        company: "Navis - Kaleris",
                        location: "Chennai, India",
                        duration: "Jul 2021 - Oct 2022",
                        description: " • Developed a Configuration-driven No Code Auto ML framework, automating machine learning phases, resulting in faster model generation\n" +
                            "and reduced manual work. <br>" +
                            "• Integrated the framework with a microservices architecture, enhancing operational efficiency through streamlined service orchestration and" +
                            "significantly boosting scalability, thus aligning with the principles of decoupled and containerized services. <br>" +
                            "• Implemented advanced machine learning models that accurately predict the remaining useful life of cranes, resulting in a 30% reduction in" +
                            "maintenance cost.",
                        technologies: ["Python", "Machine Learning", "Flask", "Docker", "Kubernetes", "AWS"]
                    },
                    {
                        title: "Associate Software Engineer Intern",
                        company: "Navis - Kaleris",
                        location: "Chennai, India",
                        duration: "Feb 2021 - Jul 2021",
                        description:"• Designed a robust data pipeline for data extraction from the organization's central database and implemented ETL processes to curate\n" +
                            "datasets for solving diverse real-world use cases utilizing machine learning techniques. <br>" +
                            "• Contributed to the implementation of a multitenant architecture within the backend of the business intelligence report generation tool,\n" +
                            "resulting in resource-efficient operations, improved overall efficiency, and the enforcement of robust security measures",
                        technologies: ["Python", "Flask", "PostgreSQL", "Docker"]
                    }

                ],
                education: [
                    {
                        degree: "Bachelor of Engineering",
                        field: "Computer Science and Engineering",
                        institution: "Anna University",
                        location: "Chennai, India",
                        duration: "2017 - 2021",
                        description: "Courses: Programming & Data Structures, Software Engineering, " +
                            "Machine Learning, Artificial intelligence, Design & Analysis of Algorithms, Database Management Systems ",
                        achievement: "GPA: 8.87/10"
                    }
                ],
                skills: {
                    "Programming Languages": ["Python", "Java", "C++", "SQL", "Shell"],
                    "Machine Learning, Deep Learning & GenAI": [
                        "Regression Analysis", "Time-Series Forecasting", "RNNs", "LLMs", "MCP", "NLP",
                        "Agentic AI", "Prompt Engineering", "Model Evaluation", "Hyperparameter Tuning", "Deployment (Batch & Real-time)"
                    ],

                    "Specializations": [
                        "Software Engineering", "Machine Learning", "Design Patterns", "System Design",
                        "Data Structures and Algorithms", "SDLC"
                    ],
                    "Web & API Technologies": [
                        "Flask", "FastAPI", "Django", "REST APIs", "Swagger"
                    ],
                    "Libraries & Frameworks": [
                        "Scikit-learn", "TensorFlow", "PyTorch", "Keras", "Hugging Face", "Streamlit",
                        "Pandas", "NumPy", "Prophet", "Spacy", "LangChain", "LangGraph", "ChromaDB",
                        "SQLAlchemy", "Pyspark", "Pytest", "Cerberus", "Jupyter Notebook"
                    ],
                    "Practices & Methodologies": [
                        "Agile (Scrum)", "Jira", "Version Control", "MLOps", "DevOps",
                        "Cross-functional Team Collaboration", "Scalable Architecture Design"
                    ],
                    "Data Engineering & Big Data": [
                        "Apache Spark", "Kafka", "Redis", "PostgreSQL", "MongoDB"
                    ],
                    "Cloud & DevOps": [
                        "AWS (EC2, S3, SageMaker)", "Docker", "Kubernetes", "Jenkins", "CI/CD Pipelines", "Git"
                    ],

                },
                achievements: [
                    {
                        title: "Generative AI Hackathon - Winner",
                        organization: "Kaleris",
                        year: "2024",
                        icon: "🏅"
                    },
                    {
                        title: "Smart India Hackathon 2020 - Winner",
                        organization: "Ministry of Education - Government of India",
                        year: "2020",
                        icon: "🏅"
                    },
                    {
                        title: "RIT SAACHACK - Best Innovation Award",
                        organization: "Rajalakshmi Institute of Technology",
                        year: "2018",
                        icon: "🏅"
                    },
                ]
            }
        };

        this.renderContent();
    }

    renderContent() {
        this.renderProjects();
        this.renderExperience();
    }

    renderProjects() {
        const projectsGrid = document.querySelector('.projects-grid');
        if (!projectsGrid) return;

        projectsGrid.innerHTML = this.data.projects.map(project => `
            <div class="project-card">
                <img src="${project.image}" alt="${project.title}" class="project-image" 
                     onerror="this.src='data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzAwIiBoZWlnaHQ9IjIwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZGRkIi8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkltYWdlPC90ZXh0Pjwvc3ZnPg=='">
                <div class="project-content">
                    <h3>${project.title}</h3>
                    <p>${project.description}</p>
                    <div class="project-tech">
                        ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                    </div>
                    <div class="project-links">
                        <a href="${project.demoUrl}" class="project-link" target="_blank">Live Demo</a>
                        <a href="${project.githubUrl}" class="project-link" target="_blank">GitHub</a>
                    </div>
                </div>
            </div>
        `).join('');
    }

    renderExperience() {
        // Render Work Experience Timeline
        this.renderWorkExperience();
        // Render Education Timeline
        this.renderEducation();
        // Render Skills Grid
        this.renderSkills();
        // Render Achievements Grid
        this.renderAchievements();
    }

    renderWorkExperience() {
        const workTimeline = document.querySelector('#experience .timeline');
        if (!workTimeline) return;

        const { workExperience } = this.data.experience;

        workTimeline.innerHTML = workExperience.map(job => `
            <div class="timeline-item">
                <div class="timeline-date">${job.duration}</div>
                <div class="timeline-content">
                    <div class="timeline-header">
                        <h4>${job.title}</h4>
                        <span class="company">${job.company}${job.location ? ` • ${job.location}` : ''}</span>
                    </div>
                    <p class="timeline-description">${job.description}</p>
<!--                     <div class="timeline-skills">${job.technologies.map(tech => `<span class="skill-tag">${tech}</span>`).join('')} </div>-->
                </div>
            </div>
        `).join('');
    }

    renderEducation() {
        const educationTimeline = document.querySelectorAll('#experience .timeline')[1];
        if (!educationTimeline) return;

        const { education } = this.data.experience;

        educationTimeline.innerHTML = education.map(edu => `
            <div class="timeline-item">
                <div class="timeline-date">${edu.duration}</div>
                <div class="timeline-content">
                    <div class="timeline-header">
                        <h4>${edu.degree}</h4>
                        <span class="company">${edu.institution}${edu.location ? ` • ${edu.location}` : ''}</span>
                    </div>
                    <p class="timeline-description">${edu.description}</p>
                    ${edu.achievement ? `<div class="timeline-achievement">
                        <span class="achievement-badge">${edu.achievement}</span>
                    </div>` : ''}
                </div>
            </div>
        `).join('');
    }

    renderSkills() {
        const skillsGrid = document.querySelector('#experience .skills-grid');
        if (!skillsGrid) return;

        const { skills } = this.data.experience;

        skillsGrid.innerHTML = Object.entries(skills).map(([category, skillsList]) => `
            <div class="skill-category">
                <h4>${category}</h4>
                <div class="skill-tags">
                    ${skillsList.map(skill => `<span class="skill-tag">${skill}</span>`).join('')}
                </div>
            </div>
        `).join('');
    }

    renderAchievements() {
        const achievementsGrid = document.querySelector('#experience .achievements-grid');
        if (!achievementsGrid) return;

        const { achievements } = this.data.experience;

        achievementsGrid.innerHTML = achievements.map(achievement => `
            <div class="achievement-card">
                <div class="achievement-icon">${achievement.icon}</div>
                <div class="achievement-detail">
                    <h4>${achievement.title}</h4>
                    <p>${achievement.organization} - ${achievement.year}</p>
                </div>
            </div>
        `).join('');
    }

    // Methods to update content dynamically
    addProject(project) {
        this.data.projects.push(project);
        this.renderProjects();
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new Portfolio();
    new ContentManager();
});

// Export for potential module use
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { Portfolio, ContentManager };
}
