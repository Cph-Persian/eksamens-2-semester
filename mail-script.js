/* EMAILJS KONTAKTFORMULAR */

document.addEventListener('DOMContentLoaded', function() {
    // Find kontaktformularen i DOM'en
    const contactForm = document.getElementById('contactForm');
    
    if (contactForm) {
        // Tilføj submit event listener til formularen
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault(); // Forhindrer standard formular indsendelse
            
            // Opdater submit knappens tilstand
            const submitButton = contactForm.querySelector('button[type="submit"]');
            const originalButtonText = submitButton.innerHTML;
            submitButton.innerHTML = 'Sender...';
            submitButton.disabled = true; // Deaktiver knappen mens vi sender

            // Indsaml alle formulardata til et objekt
            const templateParams = {
                from_name: contactForm.querySelector('#name').value,
                from_email: contactForm.querySelector('#email').value,
                subject: contactForm.querySelector('#subject').value,
                message: contactForm.querySelector('#message').value,
                to_name: 'Naturnat' // Fast modtager navn
            };

            // Debug information i konsollen
            console.log('Sender email med følgende parametre:', templateParams);

            // Send email via EmailJS service
            // service_5fvsv6q = Service ID fra EmailJS
            // template_fyb7xpa = Template ID fra EmailJS
            emailjs.send('service_5fvsv6q', 'template_fyb7xpa', templateParams)
                .then(function(response) {
                    // Håndter succesfuld afsendelse
                    console.log('SUCCESS!', response.status, response.text);
                    // Vis success besked og skjul eventuelle fejlbeskeder
                    document.getElementById('success-message').style.display = 'block';
                    document.getElementById('error-message').style.display = 'none';
                    contactForm.reset(); // Nulstil formularen
                })
                .catch(function(error) {
                    // Håndter fejl ved afsendelse
                    console.error('FAILED...', error);
                    // Vis fejlbesked til brugeren
                    const errorMessage = document.getElementById('error-message');
                    errorMessage.textContent = 'Der opstod en fejl: ' + (error.text || 'Ukendt fejl. Prøv venligst igen.');
                    errorMessage.style.display = 'block';
                    document.getElementById('success-message').style.display = 'none';
                })
                .finally(function() {
                    // Gendan knappens oprindelige tilstand
                    submitButton.innerHTML = originalButtonText;
                    submitButton.disabled = false;
                });
        });
    }
});