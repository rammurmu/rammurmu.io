document.addEventListener('DOMContentLoaded', function() {
    // Track clicks on the dark mode toggle
    const darkModeToggle = document.getElementById('dark-mode-toggle');
    darkModeToggle.addEventListener('change', function() {
        gtag('event', 'toggle_dark_mode', {
            'event_category': 'engagement',
            'event_label': darkModeToggle.checked ? 'enabled' : 'disabled'
        });
    });

    // Track form submissions
    const newsletterForm = document.getElementById('newsletter-form');
    newsletterForm.addEventListener('submit', function(event) {
        gtag('event', 'subscribe_newsletter', {
            'event_category': 'engagement',
            'event_label': 'newsletter_form'
        });
    });

    // Track clicks on social media links
    const socialLinks = document.querySelectorAll('.social-icons a');
    socialLinks.forEach(function(link) {
        link.addEventListener('click', function() {
            gtag('event', 'click_social_link', {
                'event_category': 'engagement',
                'event_label': link.getAttribute('aria-label')
            });
        });
    });

    // Track contact form submissions
    const contactForm = document.getElementById('contact-form');
    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            gtag('event', 'submit_contact_form', {
                'event_category': 'engagement',
                'event_label': 'contact_form'
            });
        });
    }

    // Track page views
    gtag('event', 'page_view', {
        'event_category': 'engagement',
        'event_label': document.title
    });
});
