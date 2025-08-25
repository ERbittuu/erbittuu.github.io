/*
* Template Name: Kerge - Resume / CV / vCard Template
* Author: lmpixels
* Author URL: http://themeforest.net/user/lmpixels
* Version: 2.4
*/
// var json = require('./data.json'); //(with path)

(function ($) {
    "use strict";
    // Portfolio subpage filters
    function portfolio_init() {
        var portfolio_grid = $('.portfolio-grid'),
            portfolio_filter = $('.portfolio-filters');

        if (portfolio_grid) {

            portfolio_grid.shuffle({
                speed: 450,
                itemSelector: 'figure'
            });

            portfolio_filter.on("click", ".filter", function (e) {
                portfolio_grid.shuffle('update');
                e.preventDefault();
                $('.portfolio-filters .filter').parent().removeClass('active');
                $(this).parent().addClass('active');
                portfolio_grid.shuffle('shuffle', $(this).attr('data-group'));
            });

        }
    }
    // /Portfolio subpage filters

    // Contact form validator
    $(function () {

        $('#contact_form').validator();

        $('#contact_form').on('submit', function (e) {
            if (!e.isDefaultPrevented()) {
                var url = "contact_form/contact_form.php";

                $.ajax({
                    type: "POST",
                    url: url,
                    data: $(this).serialize(),
                    success: function (data) {
                        var messageAlert = 'alert-' + data.type;
                        var messageText = data.message;

                        var alertBox = '<div class="alert ' + messageAlert + ' alert-dismissable"><button type="button" class="close" data-dismiss="alert" aria-hidden="true">&times;</button>' + messageText + '</div>';
                        if (messageAlert && messageText) {
                            $('#contact_form').find('.messages').html(alertBox);
                            $('#contact_form')[0].reset();
                        }
                    }
                });
                return false;
            }
        });
    });
    // /Contact form validator

    // Hide Mobile menu
    function mobileMenuHide() {
        var windowWidth = $(window).width(),
            siteHeader = $('#site_header');

        if (windowWidth < 992) {
            siteHeader.addClass('mobile-menu-hide');
            setTimeout(function () {
                siteHeader.addClass('animate');
            }, 500);
        } else {
            siteHeader.removeClass('animate');
        }
    }
    // /Hide Mobile menu

    //On Window load & Resize
    $(window)
        .on('load', function () { //Load
            // Animation on Page Loading
            $(".preloader").fadeOut(800, "linear");

            // initializing page transition.
            var ptPage = $('.subpages');
            if (ptPage[0]) {
                PageTransitions.init({
                    menu: 'ul.site-main-menu',
                });
            }
        })
        .on('resize', function () { //Resize
            mobileMenuHide();
        });


    // On Document Load
    $(document).on('ready', function () {
        // Initialize Portfolio grid
        var $portfolio_container = $(".portfolio-grid");
        $portfolio_container.imagesLoaded(function () {
            portfolio_init(this);
        });

        // Blog grid init
        var $container = $(".blog-masonry");
        $container.imagesLoaded(function () {
            $container.masonry();
        });

        // Mobile menu
        $('.menu-toggle').on("click", function () {
            $('#site_header').addClass('animate');
            $('#site_header').toggleClass('mobile-menu-hide');
        });

        // Mobile menu hide on main menu item click
        $('.site-main-menu').on("click", "a", function (e) {
            mobileMenuHide();
        });

        // Sidebar toggle
        $('.sidebar-toggle').on("click", function () {
            $('#blog-sidebar').toggleClass('open');
        });

        // Testimonials Slider
        $(".testimonials.owl-carousel").owlCarousel({
            nav: true, // Show next/prev buttons.
            items: 3, // The number of items you want to see on the screen.
            loop: false, // Infinity loop. Duplicate last and first items to get loop illusion.
            navText: false,
            margin: 25,
            responsive: {
                // breakpoint from 0 up
                0: {
                    items: 1,
                },
                // breakpoint from 480 up
                480: {
                    items: 1,
                },
                // breakpoint from 768 up
                768: {
                    items: 2,
                },
                1200: {
                    items: 2,
                }
            }
        });


        $(".clients.owl-carousel").imagesLoaded().owlCarousel({
            nav: true, // Show next/prev buttons.
            items: 2, // The number of items you want to see on the screen.
            loop: false, // Infinity loop. Duplicate last and first items to get loop illusion.
            navText: false,
            margin: 10,
            autoHeight: false,
            responsive: {
                // breakpoint from 0 up
                0: {
                    items: 2,
                },
                // breakpoint from 768 up
                768: {
                    items: 4,
                },
                1200: {
                    items: 6,
                }
            }
        });


        // Text rotation
        $('.text-rotation').owlCarousel({
            loop: true,
            dots: false,
            nav: false,
            margin: 0,
            items: 1,
            autoplay: true,
            autoplayHoverPause: false,
            autoplayTimeout: 3800,
            animateOut: 'fadeOut',
            animateIn: 'fadeIn'
        });

        // Lightbox init
        $('body').magnificPopup({
            delegate: 'a.lightbox',
            type: 'image',
            removalDelay: 300,

            // Class that is added to popup wrapper and background
            // make it unique to apply your CSS animations just to this exact popup
            mainClass: 'mfp-fade',
            image: {
                // options for image content type
                titleSrc: 'title',
                gallery: {
                    enabled: true
                },
            },

            iframe: {
                markup: '<div class="mfp-iframe-scaler">' +
                    '<div class="mfp-close"></div>' +
                    '<iframe class="mfp-iframe" frameborder="0" allowfullscreen></iframe>' +
                    '<div class="mfp-title mfp-bottom-iframe-title"></div>' +
                    '</div>', // HTML markup of popup, `mfp-close` will be replaced by the close button

                patterns: {
                    youtube: {
                        index: 'youtube.com/', // String that detects type of video (in this case YouTube). Simply via url.indexOf(index).

                        id: null, // String that splits URL in a two parts, second part should be %id%
                        // Or null - full URL will be returned
                        // Or a function that should return %id%, for example:
                        // id: function(url) { return 'parsed id'; }

                        src: '%id%?autoplay=1' // URL that will be set as a source for iframe.
                    },
                    vimeo: {
                        index: 'vimeo.com/',
                        id: '/',
                        src: '//player.vimeo.com/video/%id%?autoplay=1'
                    }
                },

                srcAction: 'iframe_src', // Templating object key. First part defines CSS selector, second attribute. "iframe_src" means: find "iframe" and set attribute "src".
            },

            callbacks: {
                markupParse: function (template, values, item) {
                    values.title = item.el.attr('title');
                }
            },
        });

        $('.ajax-page-load-link').magnificPopup({
            type: 'ajax',
            removalDelay: 300,
            mainClass: 'mfp-fade',
            gallery: {
                enabled: true
            },
        });

        //Form Controls
        $('.form-control')
            .val('')
            .on("focusin", function () {
                $(this).parent('.form-group').addClass('form-group-focus');
            })
            .on("focusout", function () {
                if ($(this).val().length === 0) {
                    $(this).parent('.form-group').removeClass('form-group-focus');
                }
            });
    });

    // On Document Load
    $(document).on('ready', function () {
        $.getJSON("data.json", function (json) {
            populateAllContent(json);
        });
    });

    function addExprience(exprience_) {
        var j;
        for (j = 0; j < exprience_.length; j++) {
            var exprience = exprience_[j];

            var html = `
<div class="timeline-item clearfix">
<div class="left-part">
<h5 class="item-period">${exprience.duration}</h5>
<span class="item-company">${exprience.name}</span>
</div>
<div class="divider"></div>
<div class="right-part">
<h4 class="item-title">${exprience.title}</h4>
<p>${exprience.detail}</p>
<p>Achievements: </p>
<ul type="A">
`
        var max = exprience.achievements.length;
        var i;
        for (i = 0; i < max; i++) {
            html += `<li type="circle">${exprience.achievements[i]}</li>`;
        }

        html += "</ul></div></div>";

        var txt3 = document.createElement("p");  // Create with DOM
        txt3.innerHTML = html
        document.getElementById("exprience").append(txt3);
        }
    }


    function populateAllContent(json) {
        const personalInfo = json.personal_info;
        const pageContent = json.page_content;
        
        // Update page title and meta
        document.getElementById('page-title').textContent = personalInfo.name;
        document.getElementById('meta-description').setAttribute('content', `${personalInfo.name} - ${personalInfo.title}`);
        
        // Update header and main content
        document.getElementById('header-name').textContent = personalInfo.name;
        document.getElementById('header-title').textContent = personalInfo.title;
        document.getElementById('mobile-name').textContent = personalInfo.name;
        document.getElementById('mobile-title').textContent = personalInfo.title;
        document.getElementById('main-name').textContent = personalInfo.name;
        
        // Update navigation
        document.getElementById('nav-about').textContent = pageContent.navigation.about;
        document.getElementById('nav-resume').textContent = pageContent.navigation.resume;
        document.getElementById('nav-contact').textContent = pageContent.navigation.contact;
        
        // Update rotating titles
        populateRotatingTitles(personalInfo.rotating_titles);
        
        // Update main summary
        document.getElementById('main-summary').innerHTML = `<p>${json.summary}</p>`;
        
        // Update section titles
        document.getElementById('about-title').textContent = pageContent.sections.about.title;
        document.getElementById('resume-title').textContent = pageContent.sections.resume.title;
        document.getElementById('experience-years-desc').textContent = pageContent.sections.resume.subtitle;
        document.getElementById('portfolio-title').textContent = pageContent.sections.portfolio.title;
        document.getElementById('portfolio-subtitle').textContent = pageContent.sections.portfolio.subtitle;
        document.getElementById('contact-title').textContent = pageContent.sections.contact.title;
        document.getElementById('contact-subtitle').textContent = pageContent.sections.contact.subtitle;
        document.getElementById('contact-cta-text').textContent = pageContent.sections.contact.cta_text;
        document.getElementById('contact-cta-message').textContent = pageContent.sections.contact.cta_message;
        
        // Update education and experience titles
        document.getElementById('education-title').textContent = pageContent.education_section.title;
        document.getElementById('experience-title').textContent = pageContent.experience_section.title;
        
        // Update contact information
        const phoneElement = document.getElementById('contact-phone');
        phoneElement.href = `tel:${personalInfo.phone}`;
        phoneElement.textContent = personalInfo.phone;
        
        const emailElement = document.getElementById('contact-email');
        emailElement.href = `mailto:${personalInfo.email}`;
        emailElement.textContent = personalInfo.email;
        
        const footerEmailElement = document.getElementById('footer-email');
        footerEmailElement.href = `mailto:${personalInfo.email}`;
        footerEmailElement.textContent = personalInfo.email;
        
        document.getElementById('contact-location').textContent = personalInfo.location;
        
        // Update social links
        document.querySelector('a[href*="linkedin"]').href = personalInfo.linkedin;
        document.querySelector('a[href*="github"]').href = `https://github.com/${personalInfo.github.split(' ')[0]}`;
        
        // Update enhanced social links
        document.getElementById('social-linkedin').href = personalInfo.linkedin;
        document.getElementById('social-github').href = `https://github.com/${personalInfo.github.split(' ')[0]}`;
        
        // Load all dynamic content
        addServices(json.services);
        addEducation(json.education);
        addExprience(json.exprience);
        addTechnicalSkills(json.skills);
        addPortfolioFilters(pageContent.portfolio_filters);
        addProjects(json.projects);
    }

    function addServices(services) {
        const container = document.getElementById('services-container');
        let html = '';
        
        for (let i = 0; i < services.length; i += 2) {
            const service1 = services[i];
            const service2 = services[i + 1];
            
            html += `
                <div class="col-xs-12 col-sm-6">
                    <div class="col-inner">
                        <div class="info-list-w-icon">
                            <div class="info-block-w-icon">
                                <div class="ci-icon">
                                    <i class="${service1.icon}"></i>
                                </div>
                                <div class="ci-text">
                                    <h4>${service1.title}</h4>
                                    <p>${service1.description}</p>
                                </div>
                            </div>
                            ${service2 ? `
                            <div class="info-block-w-icon">
                                <div class="ci-icon">
                                    <i class="${service2.icon}"></i>
                                </div>
                                <div class="ci-text">
                                    <h4>${service2.title}</h4>
                                    <p>${service2.description}</p>
                                </div>
                            </div>
                            ` : ''}
                        </div>
                    </div>
                </div>
            `;
        }
        
        container.innerHTML = html;
    }

    function addEducation(education) {
        const container = document.getElementById('education');
        const html = `
            <div class="timeline-item clearfix">
                <div class="left-part">
                    <h5 class="item-period">2010 - ${education.year}</h5>
                    <span class="item-company">${education.university}</span>
                </div>
                <div class="divider"></div>
                <div class="right-part">
                    <h4 class="item-title">${education.degree} in ${education.field}</h4>
                    <p>${education.degree} in ${education.field} from ${education.university}</p>
                </div>
            </div>
        `;
        container.innerHTML = html;
    }

    function addTechnicalSkills(skills) {
        const container = document.getElementById('technical-skills');
        let html = '';
        
        // Programming Languages
        html += `<div class="skill-category">
            <h4><i class="lnr lnr-code"></i> Programming Languages</h4>
            <div class="skill-tags">`;
        skills.programming_languages.forEach(skill => {
            html += `<span class="skill-tag primary">${skill}</span>`;
        });
        html += `</div></div>`;

        // Frameworks & Technologies  
        html += `<div class="skill-category">
            <h4><i class="lnr lnr-layers"></i> Frameworks & Technologies</h4>
            <div class="skill-tags">`;
        skills.frameworks_technologies.forEach(skill => {
            html += `<span class="skill-tag secondary">${skill}</span>`;
        });
        html += `</div></div>`;

        // Architectural Patterns
        html += `<div class="skill-category">
            <h4><i class="lnr lnr-apartment"></i> Architecture</h4>
            <div class="skill-tags">`;
        skills.architectural_patterns.forEach(skill => {
            html += `<span class="skill-tag accent">${skill}</span>`;
        });
        html += `</div></div>`;

        // Tools & Platforms
        html += `<div class="skill-category">
            <h4><i class="lnr lnr-cog"></i> Tools & Platforms</h4>
            <div class="skill-tags">`;
        skills.tools_platforms.forEach(skill => {
            html += `<span class="skill-tag info">${skill}</span>`;
        });
        html += `</div></div>`;

        container.innerHTML = html;
    }

    function addProjects(projects) {
        const portfolioGrid = document.querySelector('.portfolio-grid');
        if (!portfolioGrid) return;
        
        let html = '';
        
        for (let i = 0; i < projects.length; i++) {
            const project = projects[i];
            
            // Create technology tags
            let techTags = '';
            if (project.technologies) {
                project.technologies.slice(0, 3).forEach(tech => {
                    techTags += `<span class="tech-tag">${tech}</span>`;
                });
                if (project.technologies.length > 3) {
                    techTags += `<span class="tech-tag more">+${project.technologies.length - 3}</span>`;
                }
            }

            // Create highlights list
            let highlights = '';
            if (project.highlights && project.highlights.length > 0) {
                highlights = `<div class="project-highlights">
                    <h5>Key Highlights:</h5>
                    <ul>`;
                project.highlights.forEach(highlight => {
                    highlights += `<li>${highlight}</li>`;
                });
                highlights += `</ul></div>`;
            }
            
            html += `
                <figure class="item project-card" data-groups='["category_all", "category_${project.category}"]'>
                    <div class="portfolio-item-img">
                        <img src="${project.image}" alt="${project.name}" title="${project.name}" />
                        <div class="portfolio-overlay">
                            <div class="portfolio-info">
                                <h4>${project.name}</h4>
                                <p>${project.description.substring(0, 120)}${project.description.length > 120 ? '...' : ''}</p>
                                <a href="#" class="btn btn-sm btn-primary view-details" data-project="${i}">View Details</a>
                            </div>
                        </div>
                    </div>
                    <div class="project-content">
                        <h4 class="project-title">${project.name}</h4>
                        <div class="project-tech">${techTags}</div>
                        <p class="project-desc">${project.description}</p>
                        ${highlights}
                        <div class="project-actions">
                            <a href="${project.link}" target="_blank" class="btn btn-sm btn-outline">
                                <i class="lnr lnr-link"></i> ${project.link === '#' ? 'Demo' : 'View Project'}
                            </a>
                        </div>
                    </div>
                </figure>
            `;
        }
        
        portfolioGrid.innerHTML = html;
        
        // Add event listeners for project details
        document.querySelectorAll('.view-details').forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                const projectIndex = this.getAttribute('data-project');
                showProjectModal(projects[projectIndex]);
            });
        });
        
        // Reinitialize portfolio grid after adding content
        setTimeout(() => {
            if (window.$ && $('.portfolio-grid').length) {
                $('.portfolio-grid').shuffle({
                    speed: 450,
                    itemSelector: 'figure'
                });
            }
        }, 100);
    }

    function showProjectModal(project) {
        // Create modal HTML
        const modalHTML = `
            <div class="project-modal-overlay" onclick="closeProjectModal()">
                <div class="project-modal" onclick="event.stopPropagation()">
                    <div class="modal-header">
                        <h2>${project.name}</h2>
                        <button class="close-modal" onclick="closeProjectModal()">&times;</button>
                    </div>
                    <div class="modal-content">
                        <div class="project-image">
                            <img src="${project.image}" alt="${project.name}">
                        </div>
                        <div class="project-details">
                            <p class="project-description">${project.description}</p>
                            
                            <div class="technologies">
                                <h4>Technologies Used:</h4>
                                <div class="tech-tags">
                                    ${project.technologies.map(tech => `<span class="tech-tag">${tech}</span>`).join('')}
                                </div>
                            </div>
                            
                            ${project.highlights ? `
                                <div class="highlights">
                                    <h4>Key Highlights:</h4>
                                    <ul>
                                        ${project.highlights.map(highlight => `<li>${highlight}</li>`).join('')}
                                    </ul>
                                </div>
                            ` : ''}
                            
                            <div class="project-actions">
                                <a href="${project.link}" target="_blank" class="btn btn-primary">
                                    <i class="lnr lnr-link"></i> ${project.link === '#' ? 'Demo Coming Soon' : 'View Project'}
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
        
        // Add modal to page
        document.body.insertAdjacentHTML('beforeend', modalHTML);
        document.body.style.overflow = 'hidden';
    }

    // Global function for closing modal
    window.closeProjectModal = function() {
        const modal = document.querySelector('.project-modal-overlay');
        if (modal) {
            modal.remove();
            document.body.style.overflow = 'auto';
        }
    }

    function populateRotatingTitles(titles) {
        const container = document.getElementById('rotating-titles');
        let html = '';
        
        titles.forEach(title => {
            html += `<div class="item"><div class="sp-subtitle">${title}</div></div>`;
        });
        
        container.innerHTML = html;
        
        // Reinitialize owl carousel for rotating titles
        setTimeout(() => {
            $(container).owlCarousel({
                loop: true,
                dots: false,
                nav: false,
                margin: 0,
                items: 1,
                autoplay: true,
                autoplayHoverPause: false,
                autoplayTimeout: 3800,
                animateOut: 'fadeOut',
                animateIn: 'fadeIn'
            });
        }, 100);
    }

    function addPortfolioFilters(filters) {
        const container = document.getElementById('portfolio-filters');
        let html = '';
        
        filters.forEach((filter, index) => {
            const isActive = index === 0 ? 'active' : '';
            html += `
                <li class="${isActive}">
                    <a class="filter btn btn-sm btn-link" data-group="${filter.value}">${filter.label}</a>
                </li>
            `;
        });
        
        container.innerHTML = html;
        
        // Reinitialize portfolio filter functionality
        setTimeout(() => {
            const portfolioGrid = $('.portfolio-grid');
            container.querySelectorAll('.filter').forEach(filterBtn => {
                filterBtn.addEventListener('click', function(e) {
                    e.preventDefault();
                    // Remove active class from all filters
                    container.querySelectorAll('li').forEach(li => li.classList.remove('active'));
                    // Add active class to clicked filter
                    this.parentElement.classList.add('active');
                    // Apply filter
                    if (portfolioGrid.length) {
                        portfolioGrid.shuffle('shuffle', this.getAttribute('data-group'));
                    }
                });
            });
        }, 100);
    }

})(jQuery);
