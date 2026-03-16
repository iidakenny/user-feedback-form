// Grabbing all form inuputs.

const form_input = document.getElementById('user_feedback_form');
const name_input = document.getElementById('name');
const email_input = document.getElementById('email');
const comment_input = document.getElementById('comment');

// Grabbing all form validations.

const name_validation = document.getElementById('name_validation');
const email_validation = document.getElementById('email_validation');
const comment_validation = document.getElementById('comment_validation');


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

    if (comment_input.value.trim() === '') {
        comment_validation.textContent = '⚠️ Please enter a comment'
        comment_validation.style.display = 'block'
        is_valid = false;
    }

    if (is_valid) {
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
});

// Stop clicks inside the form from bubbling up to the body
form_input.addEventListener('click', () => {
    _event.stopPropagation();
});

// If the user clicks the background, nothing form related happens.
document.body.addEventListener('click', () => {
    name_validation.style.display('none');
    email_validation.style.display('none');
    comment_validation.style.display('none');
});