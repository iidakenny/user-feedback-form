const form_input = document.getElementById('user_feedback_form');

const comment_input = document.getElementById('comment');


document.querySelector('#user_feedback_form').addEventListener('submit', (event) => {
    event.preventDefault();
    console.log(comment_input.value);
});

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
