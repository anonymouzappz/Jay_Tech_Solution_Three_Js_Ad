export function createLayout() {
  document.body.innerHTML = `
    <div id="app">
      <div id="scene-root"></div>
      <div class="page-overlay"></div>
<button id="back-to-top" class="back-to-top">↑</button>
      <header class="site-header">
       <div class="brand">
  <div class="brand-icon">
    <img src="/logo.png" alt="Jay Tech Solutions Logo" />
  </div>

  <div class="brand-text">
    <div class="brand-kicker">Premium Home Tech Services</div>
    <div class="brand-title">Jay Tech Solutions</div>
  </div>
</div>

        <nav class="site-nav">
          <a href="#services">Services</a>
          <a href="#process">Process</a>
          <a href="#gallery">Gallery</a>
          <a href="#reviews">Reviews</a>
          <a href="#faq">FAQ</a>
        </nav>

        <div class="header-actions">
          <a href="tel:12398495607" class="btn btn-secondary header-call">
            Call Now
          </a>
          <button id="music-toggle" class="music-btn" type="button">
            ▶ Play Music
          </button>
        </div>
      </header>

      <main>
        <section class="hero-section">
          <div class="hero-backdrop-glow hero-backdrop-glow-1"></div>
          <div class="hero-backdrop-glow hero-backdrop-glow-2"></div>

          <div id="content" class="content-grid hero-grid">
            <section class="hero-copy">
              <div class="pill hero-pill">⚡ Fast Response • Clean Work • Professional Installations</div>

              <h1 class="hero-title">
                Professional TV Mounting & Smart Home
                <span class="hero-badge">Installation Services</span>
              </h1>

              <p class="hero-text">
                Our installations are <span class="glow-text">out of this world</span>.
                From precision TV mounting and clean wire concealment to cameras,
                sound systems, and full smart home setups, we create polished,
                modern installs that look incredible and work flawlessly.
              </p>

              <div class="hero-highlight-bar">
                <div class="highlight-item">✔ Clean Wire Concealment</div>
                <div class="highlight-item">✔ Secure, Precise Mounting</div>
                <div class="highlight-item">✔ Smart Home Integration</div>
                <div class="highlight-item">✔ Professional Finishing</div>
              </div>

              <div class="hero-actions">
                <button id="open-booking-btn" class="btn btn-primary hero-cta-main" type="button">
                  Book Your Installation →
                </button>

                <a href="tel:12398495607" class="btn btn-secondary">
                  Call for a Quote
                </a>

                <a href="#gallery" class="btn btn-secondary">
                  View Our Work ↓
                </a>
              </div>

              <div class="hero-trust-row">
                <div class="trust-chip">TV Mounting</div>
                <div class="trust-chip">Ring Cameras</div>
                <div class="trust-chip">Soundbars</div>
                <div class="trust-chip">Smart Home Setup</div>
                <div class="trust-chip">Home Security</div>
              </div>

              <div id="stats-grid" class="stats-grid">
                <div class="glass-card">
                  <div class="card-label">Specialties</div>
                  <div class="card-value">TV • Cameras • Audio</div>
                </div>
                <div class="glass-card">
                  <div class="card-label">Install Style</div>
                  <div class="card-value">Clean • Modern • Reliable</div>
                </div>
                <div class="glass-card">
                  <div class="card-label">Service Promise</div>
                  <div class="card-value">Professional Results Every Time</div>
                </div>
              </div>
            </section>

            <aside class="hero-side">
              <div class="glass-panel hero-panel">
                <div class="panel-head">
                  <div class="panel-icon">🏠</div>
                  <div>
                    <div class="panel-kicker">What We Do Best</div>
                    <div class="panel-title">Premium home tech installs</div>
                  </div>
                </div>

                <ul class="panel-list">
                  <li>TV Wall Mounting (All Sizes)</li>
                  <li>Wire Concealment & Clean Setup</li>
                  <li>Ring Camera Installation</li>
                  <li>Home Security Setup</li>
                  <li>Soundbar & Home Theater Installation</li>
                  <li>Smart Home Device Setup</li>
                </ul>

                <div class="asset-box premium-box">
                  <div>✔ Same-day appointments available</div>
                  <div>✔ Affordable, transparent pricing</div>
                  <div>✔ Clean, polished, professional work</div>
                </div>

                <div class="mini-cta-box">
                  <div class="mini-cta-title">Ready to upgrade your space?</div>
                  <div class="mini-cta-text">
                    Tell us what you need installed and we’ll help you get it done right.
                  </div>
                  <button id="open-booking-btn-2" class="btn btn-primary mini-cta-btn" type="button">
                    Get Started →
                  </button>
                </div>
              </div>
            </aside>
          </div>
        </section>

        <section id="services" class="services-section section-shell">
          <div class="section-head center">
            <div class="pill">🛠 Our Services</div>
            <h2 class="section-title">Professional installation services built around your home</h2>
            <p class="section-text">
              We handle everything from simple TV mounting to complete smart home and
              entertainment setups with clean execution and reliable results.
            </p>
          </div>

          <div class="service-grid">
            <div class="service-card glass-card">
              <div class="service-icon">📺</div>
              <h3>TV Mounting</h3>
              <p>Secure wall mounting for all TV sizes with level alignment and a clean finish.</p>
            </div>

            <div class="service-card glass-card">
              <div class="service-icon">🎥</div>
              <h3>Camera Installation</h3>
              <p>Ring cameras and home security devices installed for better visibility and peace of mind.</p>
            </div>

            <div class="service-card glass-card">
              <div class="service-icon">🔊</div>
              <h3>Soundbar & Audio</h3>
              <p>Soundbars, speakers, and entertainment systems installed neatly and set up correctly.</p>
            </div>

            <div class="service-card glass-card">
              <div class="service-icon">💡</div>
              <h3>Smart Home Setup</h3>
              <p>Smart devices connected and configured so your setup feels simple, smooth, and modern.</p>
            </div>

            <div class="service-card glass-card">
              <div class="service-icon">🧰</div>
              <h3>Wire Concealment</h3>
              <p>Clean cable management that upgrades the look of your room and reduces clutter fast.</p>
            </div>

            <div class="service-card glass-card">
              <div class="service-icon">🏡</div>
              <h3>Custom Installs</h3>
              <p>Need something unique? We can help with tailored installation solutions for your space.</p>
            </div>
          </div>
        </section>

        <section class="benefits-section section-shell">
          <div class="section-head center">
            <div class="pill">✨ Why Homeowners Choose Us</div>
            <h2 class="section-title">More than installation — we deliver a finished look</h2>
          </div>

          <div class="benefit-grid">
            <div class="benefit-card">
              <div class="benefit-number">01</div>
              <h3>Clean Work</h3>
              <p>We focus on polished results, hidden wires, and a setup that looks as good as it performs.</p>
            </div>

            <div class="benefit-card">
              <div class="benefit-number">02</div>
              <h3>Professional Precision</h3>
              <p>Accurate mounting, smart placement, and dependable installation done with care.</p>
            </div>

            <div class="benefit-card">
              <div class="benefit-number">03</div>
              <h3>Modern Experience</h3>
              <p>We help transform your living space into something cleaner, smarter, and more functional.</p>
            </div>
          </div>
        </section>

        <section id="process" class="process-section section-shell">
          <div class="section-head center">
            <div class="pill">🚀 Simple Process</div>
            <h2 class="section-title">How it works</h2>
          </div>

          <div class="process-grid">
            <div class="process-card glass-card">
              <div class="process-step">1</div>
              <h3>Tell us what you need</h3>
              <p>Choose your service and share a few details about your setup.</p>
            </div>

            <div class="process-card glass-card">
              <div class="process-step">2</div>
              <h3>We confirm the job</h3>
              <p>We review your request, discuss timing, and make sure everything is ready.</p>
            </div>

            <div class="process-card glass-card">
              <div class="process-step">3</div>
              <h3>We install it right</h3>
              <p>Clean, professional installation with a polished finished result.</p>
            </div>
          </div>
        </section>

        <section id="gallery" class="gallery-section">
          <div class="gallery-shell">
            <div class="gallery-head">
              <div class="pill">📸 Recent Installations</div>
              <h2 class="gallery-title">See the quality for yourself</h2>
              <p class="gallery-text">
                Take a look at some of our recent TV mounting, wire concealment,
                camera installs, and smart home projects.
              </p>
            </div>

            <div class="gallery-grid">
  <button class="gallery-card gallery-card-1 gallery-item" type="button" data-type="image" data-src="/gallery-1.jpg">
    <img src="/gallery-1.jpg" alt="TV wall mounting installation" />
    <span class="gallery-overlay"><span>View Install</span></span>
  </button>

  <button class="gallery-card gallery-card-2 gallery-item" type="button" data-type="image" data-src="/gallery-2.jpg">
    <img src="/gallery-2.jpg" alt="Ring camera installation" />
    <span class="gallery-overlay"><span>View Install</span></span>
  </button>

  <button class="gallery-card gallery-card-6 gallery-item" type="button" data-type="video" data-src="/video-2.mp4">
    <video src="/video-2.mp4" autoplay muted loop playsinline></video>
    <span class="gallery-overlay"><span>Play Video</span></span>
  </button>

  <button class="gallery-card gallery-card-3 gallery-item" type="button" data-type="image" data-src="/gallery-3.jpg">
    <img src="/gallery-3.jpg" alt="Soundbar setup" />
    <span class="gallery-overlay"><span>View Install</span></span>
  </button>

  <button class="gallery-card gallery-card-4 gallery-item" type="button" data-type="image" data-src="/gallery-4.jpg">
    <img src="/gallery-4.jpg" alt="Wire concealment work" />
    <span class="gallery-overlay"><span>View Install</span></span>
  </button>

  <button class="gallery-card gallery-card-5 gallery-item" type="button" data-type="video" data-src="/video-1.mp4">
    <video src="/video-1.mp4" autoplay muted loop playsinline></video>
    <span class="gallery-overlay"><span>Play Video</span></span>
  </button>
</div>
          </div>
        </section>

        <section id="reviews" class="testimonials-section section-shell">
          <div class="section-head center">
            <div class="pill">🌟 Client Feedback</div>
            <h2 class="section-title">The kind of experience people remember</h2>
          </div>

          <div class="testimonial-grid">
            <div class="testimonial-card glass-card">
              <p>
                “Very professional, clean install, and the TV looked perfect once it was mounted.
                The wires were hidden and everything looked amazing.”
              </p>
              <div class="testimonial-author">— Happy Customer</div>
            </div>

            <div class="testimonial-card glass-card">
              <p>
                “Fast response, quality work, and they made the whole setup look premium.
                I’d definitely recommend them.”
              </p>
              <div class="testimonial-author">— Homeowner</div>
            </div>

            <div class="testimonial-card glass-card">
              <p>
                “They helped with mounting, soundbar setup, and smart home devices.
                Everything came out clean and worked great.”
              </p>
              <div class="testimonial-author">— Returning Client</div>
            </div>
          </div>
        </section>

        <section class="cta-banner-section section-shell">
          <div class="cta-banner glass-panel">
            <div>
              <div class="pill">📅 Limited Availability</div>
              <h2 class="cta-banner-title">Book your install before the next opening fills up</h2>
              <p class="cta-banner-text">
                Whether you need one TV mounted or a full smart home setup, we’re ready to help.
              </p>
            </div>

            <div class="cta-banner-actions">
              <button id="open-booking-btn-3" class="btn btn-primary" type="button">
                Schedule Service →
              </button>
              <a href="tel:12398495607" class="btn btn-secondary">Call Now</a>
            </div>
          </div>
        </section>

        <section id="faq" class="faq-section section-shell">
          <div class="section-head center">
            <div class="pill">❓ FAQ</div>
            <h2 class="section-title">Questions people usually ask</h2>
          </div>

          <div class="faq-grid">
            <div class="faq-card glass-card">
              <h3>Do you mount all TV sizes?</h3>
              <p>Yes, we handle a wide range of TV sizes and help position them for the best viewing setup.</p>
            </div>

            <div class="faq-card glass-card">
              <h3>Do you hide wires?</h3>
              <p>Yes, clean wire concealment is one of our most requested upgrades and makes a huge difference.</p>
            </div>

            <div class="faq-card glass-card">
              <h3>Can you install cameras and smart devices too?</h3>
              <p>Absolutely. We install Ring cameras, smart home devices, soundbars, and more.</p>
            </div>

            <div class="faq-card glass-card">
              <h3>How do I book?</h3>
              <p>Use the booking form below and send us your details. We’ll follow up to confirm everything.</p>
            </div>
          </div>
        </section>

        <section id="booking" class="booking-section">
          <div class="booking-shell">
            <div class="booking-copy">
              <div class="pill">📅 Custom Booking Experience</div>

              <h2 class="booking-title">Book your installation in minutes</h2>

              <p class="booking-text">
                Choose your service, tell us what you need installed, and send your request.
                We’ll follow up to confirm pricing, timing, and any extra details.
              </p>

              <div class="booking-feature-list">
                <div class="mini-feature">TV Mounting</div>
                <div class="mini-feature">Ring Cameras</div>
                <div class="mini-feature">Wire Hiding</div>
                <div class="mini-feature">Soundbars</div>
                <div class="mini-feature">Smart Home Setup</div>
              </div>
            </div>

            <div class="booking-card">
              <button id="close-booking-btn" class="booking-close" type="button">
                ✕
              </button>

              <div id="booking-3d" class="booking-3d"></div>

              <form id="booking-form" class="booking-form">
                <div class="form-row">
                  <input type="text" name="name" placeholder="Your name" required />
                  <input type="tel" name="phone" placeholder="Phone number" required />
                </div>

                <div class="form-row">
                  <input type="email" name="email" placeholder="Email address" required />
                  <select name="service" required>
                    <option value="">Select a service</option>
                    <option>TV Mounting</option>
                    <option>Ring Camera Installation</option>
                    <option>Soundbar Setup</option>
                    <option>Wire Concealment</option>
                    <option>Smart Home Setup</option>
                    <option>Home Security Setup</option>
                    <option>Custom Installation</option>
                  </select>
                </div>

                <div class="form-row">
                  <input type="date" name="date" required />
                  <select name="time" required>
                    <option value="">Preferred time</option>
                    <option>Morning</option>
                    <option>Afternoon</option>
                    <option>Evening</option>
                  </select>
                </div>

                <textarea
                  name="details"
                  rows="5"
                  placeholder="Tell us about your setup, TV size, wall type, number of devices, or anything else..."
                ></textarea>

                <button type="submit" class="btn btn-primary booking-submit">
                  Send Booking Request →
                </button>

                <p id="booking-status" class="booking-status"></p>
              </form>
            </div>
          </div>
        </section>
        <div id="gallery-modal" class="gallery-modal" aria-hidden="true">
  <button id="gallery-modal-close" class="gallery-modal-close" type="button">✕</button>
  <div class="gallery-modal-inner">
    <img id="gallery-modal-image" class="gallery-modal-image" alt="" />
    <video id="gallery-modal-video" class="gallery-modal-video" controls playsinline></video>
  </div>
</div>
      </main>

      <footer class="site-footer">
        <div class="footer-brand">
          <div class="brand-title">Jay Tech Solutions</div>
          <div class="footer-text">
            Professional TV mounting, smart home installation, camera setup,
            audio installs, and clean wire concealment.
          </div>
        </div>

        <div class="footer-links">
          <a href="#services">Services</a>
          <a href="#gallery">Gallery</a>
          <a href="#booking">Booking</a>
          <a href="tel:12398495607">Call</a>
        </div>
      </footer>
    </div>
  `;
}
