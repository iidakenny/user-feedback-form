// Grabbing all form inuputs.

const form_input = document.getElementById('user_feedback_form');
const name_input = document.getElementById('name');
const email_input = document.getElementById('email');
const comment_input = document.getElementById('comment');
const email_buttons = document.querySelectorAll('.email_btn');

// Grabbing all form validations.

const name_validation = document.getElementById('name_validation');
const email_validation = document.getElementById('email_validation');
const comment_validation = document.getElementById('comment_validation');

// Resets all tooltips on page load
document.querySelectorAll('.tooltip').forEach(t => {
    t.style.display = 'none';
});

function launchFireworks() {
    const btn = document.getElementById('submit');
    const rect = btn.getBoundingClientRect();
    const colors = ['#ffffff', '#96fff0', '#b8f0ff', '#e0f8ff', '#ffcef3', '#d4aaff', '#fffde0', '#ff6eb4'];
    const types = ['', 'long', 'tiny'];

    function spawnWave(count, distanceMin, distanceMax, sizeMin, sizeMax, delayOffset) {
        for (let i = 0; i < count; i++) {
            const particle = document.createElement('div');
            particle.classList.add('sparkle-particle');

            // randomly assign a shape type
            const type = types[Math.floor(Math.random() * types.length)];
            if (type) particle.classList.add(type);

            const originX = rect.left + Math.random() * rect.width;
            const originY = rect.top + Math.random() * rect.height;
            const angle = Math.random() * 360;
            const distance = distanceMin + Math.random() * distanceMax;
            const tx = Math.cos((angle * Math.PI) / 180) * distance;
            const ty = Math.sin((angle * Math.PI) / 180) * distance;

            particle.style.left = `${originX}px`;
            particle.style.top = `${originY}px`;
            particle.style.background = colors[Math.floor(Math.random() * colors.length)];
            particle.style.setProperty('--tx', `${tx}px`);
            particle.style.setProperty('--ty', `${ty}px`);

            const size = `${sizeMin + Math.random() * sizeMax}px`;
            particle.style.width = size;
            particle.style.height = size;
            particle.style.animationDelay = `${delayOffset + Math.random() * 0.2}s`;
            particle.style.animationDuration = `${0.9 + Math.random() * 0.6}s`;

            document.body.appendChild(particle);
            setTimeout(() => particle.remove(), 2000);
        }
    }

    // Wave 1 — big dramatic burst
    spawnWave(60, 80, 180, 6, 10, 0);

    // Wave 2 — medium follow-up
    setTimeout(() => spawnWave(40, 50, 120, 4, 7, 0.1), 250);

    // Wave 3 — tiny glitter dust settles
    setTimeout(() => spawnWave(50, 20, 80, 2, 5, 0.05), 500);
}

setTimeout(() => {
    for (let i = 0; i < 40; i++) {
        const particle = document.createElement('div');
        particle.classList.add('sparkle-particle');

        const originX = rect.left + Math.random() * rect.width;
        const originY = rect.top + Math.random() * rect.height;
        const angle = Math.random() * 360;
        const distance = 40 + Math.random() * 100;
        const tx = Math.cos((angle * Math.PI) / 180) * distance;
        const ty = Math.sin((angle * Math.PI) / 180) * distance;

        particle.style.left = `${originX}px`;
        particle.style.top = `${originY}px`;
        particle.style.background = colors[Math.floor(Math.random() * colors.length)];
        particle.style.setProperty('--tx', `${tx}px`);
        particle.style.setProperty('--ty', `${ty}px`);
        const size = `${3 + Math.random() * 6}px`;
        particle.style.width = size;
        particle.style.height = size;
        particle.style.filter = `drop-shadow(0 0 ${3 + Math.random() * 5}px white)`;
        particle.style.animationDelay = `${Math.random() * 0.3}s`;
        particle.style.animationDuration = `${0.6 + Math.random() * 0.5}s`;

        document.body.appendChild(particle);
        setTimeout(() => particle.remove(), 1500);
    }
}, 300);

document.querySelector('#user_feedback_form').addEventListener('submit', (event) => {
    event.preventDefault();
    let is_valid = true;

    name_validation.style.display = 'none';
    email_validation.style.display = 'none';
    comment_validation.style.display = 'none';

    if (name_input.value.trim() === '') {
        name_validation.textContent = '⚠️ Please enter your full name'
        name_validation.style.display = 'block'
        is_valid = false;
    }

    if (email_input.value.trim() === '') {
        email_validation.textContent = '⚠️ Please enter your email'
        email_validation.style.display = 'block'
        is_valid = false;
    }
    else if (!email_input.value.includes('@') || !email_input.value.includes('.')) {
        email_validation.textContent = '⚠️ Please enter a valid email address';
        email_validation.style.display = 'block';
        is_valid = false;
    }

    if (comment_input.value.trim() === '') {
        comment_validation.textContent = '⚠️ Please enter a comment'
        comment_validation.style.display = 'block'
        is_valid = false;
    }

    if (is_valid) {
        launchFireworks();
        const feedback_display = document.getElementById('feedback_display');
        const success_msg = document.getElementById('success_msg');

        const now = new Date();
        const date_string = now.toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });

        document.querySelectorAll('.feedback_entry').forEach(entry => {
            entry.classList.remove('new_entry');
        });

        const new_entry = document.createElement('div');
        new_entry.classList.add('feedback_entry', 'new_entry');
        new_entry.innerHTML = `
            <button class="delete_btn"> X </button>
            <h3> ${name_input.value}</h3>
            <p> ${comment_input.value}</p>
            <span class="entry_date"> Submitted on ${date_string}</span>
            
        `;

        new_entry.querySelector('.delete_btn').addEventListener('click', () => {
            new_entry.remove();
        });

        feedback_display.insertBefore(new_entry, feedback_display.firstChild);

        success_msg.style.display = 'block';
        setTimeout(() => {
            success_msg.style.display = 'none';
        }, 3000);

        name_input.value = '';
        email_input.value = '';
        comment_input.value = '';
        character_counter.textContent = '0 / 500 characters';
        character_counter.classList.remove('warning', 'danger');
    

}});



const character_counter = document.getElementById('char_counter');

comment_input.addEventListener('input', () => {
    const current_length = comment_input.value.length;
    character_counter.textContent = `${current_length} / 500 characters`;

    character_counter.classList.remove('warning', 'danger');

    if (current_length > 400) {
        character_counter.classList.add('warning');
    }

    if (current_length === 500) {
        character_counter.classList.add('danger');
    }
});


const tooltip_fields = document.querySelectorAll('.tooltip_wrapper');

tooltip_fields.forEach(wrapper => {
    const tooltip = wrapper.querySelector('.tooltip')

    wrapper.addEventListener('mouseenter', () => {
        tooltip.style.display = 'block';
    });

    wrapper.addEventListener('mouseleave',() => {
        tooltip.style.display = 'none';
    });

});


form_input.addEventListener('input', (event) => {

    if (event.target.id === 'name') {
        name_validation.style.display = 'none';
    }
    if (event.target.id === 'email') {
        email_validation.style.display = 'none';
    }
    if (event.target.id === 'comment') {
        comment_validation.style.display = 'none';
    }

// Hide tooltip when user starts typing
    const wrapper = event.target.closest('.tooltip_wrapper');
    if (wrapper) {
        const tooltip = wrapper.querySelector('.tooltip');
        if (tooltip) tooltip.style.display = 'none';
    }
});

// Stop clicks inside the form from bubbling up to the body
form_input.addEventListener('click', (e) => {
    e.stopPropagation();
});

// If the user clicks the background, nothing form related happens.
document.body.addEventListener('click', () => {
    name_validation.style.display = 'none';
    email_validation.style.display = 'none';
    comment_validation.style.display = 'none';
});

// added 3 email guick buttons for easier email input.
email_buttons.forEach(btn => {
    btn.addEventListener('click', () => {
        const domain = btn.textContent;

        if (email_input.value.trim() === '') {

            email_input.value = domain;
            email_input.focus();
            email_input.setSelectionRange(0,0);

        } 
        else {

            const base = email_input.value.split('@')[0];
            email_input.value = base + domain;
            email_input.focus();
        }
    });
});

document.querySelectorAll('.tooltip').forEach(t => console.log(t.style.display));
