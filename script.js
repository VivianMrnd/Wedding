document.getElementById('current-year').textContent = new Date().getFullYear();
const weddingDate = new Date('December 15, 2027 15:00:00').getTime();

function updateCountdown() {
    const diff = weddingDate - new Date().getTime();
    if (diff > 0) {
        ['days', 'hours', 'minutes', 'seconds'].forEach((unit, i) => {
            const time = [86400, 3600, 60, 1].map(v => Math.floor(diff / (v * 1000)) % (i ? 60 : Infinity));
            document.getElementById(unit).textContent = time[i].toString().padStart(2, '0');
        });
    }
}

updateCountdown();
setInterval(updateCountdown, 1000);

function checkFade() {
    document.querySelectorAll('.fade-in').forEach(el => {
        if (el.getBoundingClientRect().top < window.innerHeight - 150) el.classList.add('appear');
    });
}

document.addEventListener('DOMContentLoaded', () => {
    document.querySelector('#hero .fade-in').classList.add('appear');
    checkFade();
});
window.addEventListener('scroll', checkFade);

window.addEventListener('scroll', () => {
    let current = [...document.querySelectorAll('section')].reverse()
        .find(sec => pageYOffset >= sec.offsetTop - 200)?.id;
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.toggle('active', link.getAttribute('href').substring(1) === current);
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
        e.preventDefault();
        const target = document.querySelector(anchor.getAttribute('href'));
        target && window.scrollTo({ top: target.offsetTop, behavior: 'smooth' });
    });
});

// RSVP Form Submission
const scriptURL = "https://script.google.com/macros/s/AKfycbzyvPsw3rVOhW37feMlx2GGiltyybXIRUyheI0F6rYuGyYOTmZtBnShX4OFvnwHU9I/exec";
const form = document.getElementById("rsvp-form");
const responseMessage = document.getElementById("response-message");

form.addEventListener("submit", (e) => {
    e.preventDefault();
    const formData = Object.fromEntries(new FormData(form));
    fetch(scriptURL, {
        method: "POST",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify(formData)
    })
    .then(res => res.json())
    .then(data => {
        responseMessage.innerHTML = `<div class="alert alert-${data.result === "success" ? "success" : "danger"}">${data.result === "success" ? "Thank you for your RSVP!" : "There was an error submitting your RSVP. Please try again later."}</div>`;
        if (data.result === "success") form.reset();
        setTimeout(() => responseMessage.innerHTML = "", 3000);
    })
    .catch(() => {
        responseMessage.innerHTML = '<div class="alert alert-danger">There was an error submitting your RSVP. Please try again later.</div>';
    });
});