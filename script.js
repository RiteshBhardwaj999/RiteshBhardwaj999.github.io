// ===== Initialize AOS =====
AOS.init({
    duration: 800,
    easing: 'ease-out-cubic',
    once: true,
    offset: 80
});

// ===== Initialize Typed.js =====
new Typed('#typed-output', {
    strings: [
        'Java Developer',
        'DSA Enthusiast',
        'Full-Stack Explorer',
        'Problem Solver',
        'Spring Boot Developer'
    ],
    typeSpeed: 50,
    backSpeed: 30,
    backDelay: 2000,
    loop: true,
    showCursor: true
});

// ===== GitHub API Integration =====
const GITHUB_USERNAME = 'RiteshBhardwaj999';

const langColors = {
    Java: '#b07219',
    Python: '#3572A5',
    JavaScript: '#f1e05a',
    TypeScript: '#3178c6',
    HTML: '#e34c26',
    CSS: '#563d7c',
    'C++': '#f34b7d',
    C: '#555555',
    Shell: '#89e051',
    Kotlin: '#A97BFF',
    Go: '#00ADD8',
    Rust: '#dea584'
};

// Custom descriptions for known projects (overrides GitHub description if present)
const projectDescriptions = {
    'Worker-Attendance-Overtime-Settlement-Engine': 'A Java-based engine for tracking worker attendance, calculating overtime hours, and automating salary settlements.',
    'LearnFlow': 'An interactive learning platform built with Java for structured course progression and student performance tracking.',
    'AIWebPageTutor': 'An AI-powered web tutor application built with Java that helps users learn and understand web technologies.',
    'Binance_Futures_Testnet': 'A Python trading bot for Binance Futures testnet with automated strategy execution and portfolio management.',
    'Agentic-Profile-Matching': 'An AI-driven profile matching system built with Python using agentic workflows for intelligent candidate-job pairing.',
    'BookMyShow': 'A movie ticket booking platform clone with seat selection, show scheduling, and booking management.',
    'RAG-System-Implementation': 'A Retrieval-Augmented Generation system built with Python for context-aware AI responses using document retrieval.',
    'payflow_project': 'A Java-based payment flow management system for handling transactions, invoices, and payment processing.',
    'LearnTrack': 'A Student & Course Management System built with Core Java featuring enrollment tracking, grade management, and course scheduling.',
    'Team-Task-Manager': 'A collaborative task management tool built with Java for team workflows, task assignment, and progress tracking.',
    'llm-file-assistant': 'A Python-powered file assistant using LLMs to analyze, summarize, and answer questions about uploaded documents.',
    'Smart-Parking-Lot-System': 'A Java-based smart parking solution with real-time slot tracking, vehicle entry/exit management, and fee calculation.',
    'LibraryManagementSystem': 'A comprehensive library management system in Java for book cataloging, member management, and issue/return tracking.',
    'MediTrack': 'A Clinic & Appointment Management System using Core Java for patient records, doctor scheduling, and appointment booking.',
    'Swing': 'A collection of Java Swing GUI projects including a login page and Student Registration System.',
    'BT-32': 'A Bluetooth-based communication module project for short-range device connectivity and data transfer.',
    'Card_deck': 'A Java implementation of a card deck with shuffling, dealing, and card game logic.',
    'Elevator': 'A Java simulation of elevator operations with floor management, request handling, and scheduling algorithms.',
    'ResumeWebpage': 'A modern portfolio website built with Spring Boot and vanilla JS, featuring live GitHub integration and AOS animations.'
};

async function fetchGitHubProjects() {
    const grid = document.getElementById('projectsGrid');

    try {
        const response = await fetch(
            `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=30`
        );
        if (!response.ok) throw new Error('GitHub API error');

        const repos = await response.json();
        const projects = repos
            .filter(repo => !repo.fork)
            .sort((a, b) => b.stargazers_count - a.stargazers_count || new Date(b.updated_at) - new Date(a.updated_at))
            .slice(0, 9);

        // Update repo count in hero
        const repoCountEl = document.getElementById('repoCount');
        if (repoCountEl) {
            repoCountEl.textContent = repos.filter(r => !r.fork).length;
        }

        if (projects.length === 0) {
            grid.innerHTML = '<p style="grid-column:1/-1;text-align:center;color:#64748b;">No projects found.</p>';
            return;
        }

        grid.innerHTML = projects.map((repo, i) => `
            <a href="${repo.html_url}" target="_blank" rel="noopener"
               class="project-card" data-aos="fade-up" data-aos-delay="${i * 100}">
                <div class="project-header">
                    <div class="project-icon"><i class="fa-solid fa-folder-open"></i></div>
                    <div class="project-links"><i class="fa-solid fa-arrow-up-right-from-square"></i></div>
                </div>
                <h3>${escapeHtml(repo.name)}</h3>
                <p>${escapeHtml(projectDescriptions[repo.name] || repo.description || 'No description provided.')}</p>
                <div class="project-meta">
                    ${repo.language ? `
                        <span class="project-lang">
                            <span class="lang-dot" style="background:${langColors[repo.language] || '#8b8b8b'}"></span>
                            ${escapeHtml(repo.language)}
                        </span>
                    ` : ''}
                    <span class="project-stat"><i class="fa-regular fa-star"></i> ${repo.stargazers_count}</span>
                    <span class="project-stat"><i class="fa-solid fa-code-fork"></i> ${repo.forks_count}</span>
                </div>
            </a>
        `).join('');

        // Refresh AOS for dynamically added elements
        AOS.refresh();

    } catch (error) {
        console.error('Failed to fetch GitHub projects:', error);
        grid.innerHTML = `
            <div style="grid-column:1/-1;text-align:center;padding:40px;color:#64748b;">
                <i class="fa-solid fa-triangle-exclamation fa-2x" style="margin-bottom:12px;display:block;"></i>
                <p>Unable to load projects from GitHub.</p>
                <p style="margin-top:8px;font-size:0.9rem;">
                    Visit <a href="https://github.com/${GITHUB_USERNAME}" target="_blank" rel="noopener" style="color:#6366f1;">my GitHub profile</a> directly.
                </p>
            </div>
        `;
    }
}

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}

// ===== Navbar Scroll Effect =====
const navbar = document.getElementById('navbar');

window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
    updateActiveNavLink();
});

// ===== Active Nav Link Highlighting =====
function updateActiveNavLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-link');
    let current = '';

    sections.forEach(section => {
        if (window.scrollY >= section.offsetTop - 120) {
            current = section.id;
        }
    });

    navLinks.forEach(link => {
        link.classList.toggle('active', link.getAttribute('href') === `#${current}`);
    });
}

// ===== Mobile Nav Toggle =====
const navToggle = document.getElementById('navToggle');
const navLinksEl = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
    const isOpen = navLinksEl.classList.toggle('open');
    navToggle.innerHTML = isOpen
        ? '<i class="fa-solid fa-xmark"></i>'
        : '<i class="fa-solid fa-bars"></i>';
});

// Close mobile nav on link click
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navLinksEl.classList.remove('open');
        navToggle.innerHTML = '<i class="fa-solid fa-bars"></i>';
    });
});

// ===== Smooth Scroll =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) target.scrollIntoView({ behavior: 'smooth' });
    });
});

// ===== Init =====
document.addEventListener('DOMContentLoaded', fetchGitHubProjects);
