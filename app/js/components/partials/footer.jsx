import * as CONFIG from '../../config/app';
import React from 'react';

class Footer extends React.Component {
    constructor(props) {
        super(props);

        this.copyrightYear = new Date().getFullYear();
        this.sponsors = [
            {
                name: 'Auckland Arts Festival',
                url: '/event/auckland-arts-festival',
                logo: '/assets/images/residents/auckland-arts-festival.png'
            },
            {
                name: 'Auckland Philharmonia Orchestra',
                url: '/event/auckland-philharmonia-orchestra',
                logo: '/assets/images/residents/auckland-philharmonia-orchestra.png'
            },
            {
                name: 'Auckland Writers Festival',
                url: '/event/auckland-writers-festival',
                logo: '/assets/images/residents/auckland-writers-festival.png'
            },
            {
                name: 'Chamber Music New Zealand',
                url: '/event/chamber-music-new-zealand',
                logo: '/assets/images/residents/chamber-music-new-zealand.png'
            },
            {
                name: 'New Zealand International Comedy Festival',
                url: '/event/comedy-festival',
                logo: '/assets/images/residents/comedy-festival.png'
            },
            {
                name: 'New Zealand International Film Festival',
                url: '/event/nz-international-film-festival',
                logo: '/assets/images/residents/film-festival.png'
            },
            {
                name: 'New Zealand Opera',
                url: '/event/nz-opera',
                logo: '/assets/images/residents/new-zealand-opera.png'
            },
            {
                name: 'New Zealand Symphony Orchestra',
                url: '/event/new-zealand-symphony-orchestra',
                logo: '/assets/images/residents/new-zealand-symphony-orchestra.png'
            },
            {
                name: 'Royal New Zealand Ballet',
                url: '/event/royal-new-zealand-ballet',
                logo: '/assets/images/residents/royal-new-zealand-ballet.png'
            }
        ];
    }

    render() {
        return (
            <footer>
                <section className="partners">
                    <div className="constrain-width">
                        <h6 className="heading">Resident Companies &amp; Festivals</h6>

                        <div className="logos">
                            {this.sponsors.map((sponsor, id) => {
                                return (
                                    <a className="logo" href={sponsor.url} title={`View ${sponsor.name} website`} key={id}>
                                        <img alt={sponsor.name} src={sponsor.logo}/>
                                    </a>
                                );
                            })}
                        </div>
                    </div>
                </section>

                <section className="footer">
                    <div className="constrain-width">
                        <div className="blocks">
                            <div className="block">
                                <h6 className="heading">General Enquiries</h6>
                                <p>
                                    <a href="tel:09 309 2677" title="Contact us via Phone">09 309 2677</a>
                                    <br/>
                                    <a href="mailto:online@aucklandlive.co.nz" title="Contact us via Email">online@aucklandlive.co.nz</a>
                                </p>
                            </div>

                            <div className="block">
                                <h6 className="heading">Ticket Enquiries</h6>
                                <p>
                                    <a href="tel:0800 111 999" title="Contact us via Freephone">0800 111 999</a>
                                </p>
                            </div>

                            <form action="https://oss.ticketmaster.com/aps/rfa/EN/account/signup/form" method="POST" target="_blank" className="block newsletter || form" rel="noopener noreferrer">
                                <fieldset className="form-inline">
                                    <h6 className="heading"><label htmlFor="email">Be the first to know</label></h6>
                                    <div className="field-group">
                                        <input name="signup" id="email" type="email" autoComplete="email" autoCorrect="off" autoCapitalize="off" placeholder="Enter email address" required/>
                                        <button type="submit" className="button primary">Submit</button>
                                    </div>
                                    <p className="link-login">Already signed up? <a href={CONFIG.LOGIN_URL} target="_blank">Log in here</a>.</p>
                                </fieldset>
                            </form>
                        </div>
                    </div>
                </section>

                <section className="page-info" role="contentinfo">
                    <div className="constrain-width || inner">

                        <a className="logo" href="/" title="View the Auckland Live homepage">
                            <img className="vertical" src="/assets/images/logo/vertical-colour.svg" alt="Auckland Live Logo"/>
                            <img className="horizontal" src="/assets/images/logo/horizontal-colour.svg" alt="Auckland Live Logo"/>
                        </a>

                        <div className="social-links">
                            <h6 className="heading">Be part of it</h6>

                            <div className="icons">
                                <a className="icon" target="_blank" href={CONFIG.FACEBOOK_URL} title="Facebook Link">
                                    <svg className="svg">
                                        <use xlinkHref="/assets/images/social/sprite.svg#facebook"></use>
                                    </svg>
                                </a>

                                <a className="icon" target="_blank" href={CONFIG.INSTAGRAM_URL} title="Instagram Link">
                                    <svg className="svg">
                                        <use xlinkHref="/assets/images/social/sprite.svg#instagram"></use>
                                    </svg>
                                </a>

                                <a className="icon" target="_blank" href={CONFIG.TWITTER_URL} title="Twitter Link">
                                    <svg className="svg">
                                        <use xlinkHref="/assets/images/social/sprite.svg#twitter"></use>
                                    </svg>
                                </a>

                                <a className="icon youtube" target="_blank" href={CONFIG.YOUTUBE_URL} title="YouTube Link">
                                    <svg className="svg">
                                        <use xlinkHref="/assets/images/social/sprite.svg#youtube"></use>
                                    </svg>
                                </a>
                            </div>
                        </div>

                        <div className="further-info">
                            <a className="rfa-logo" href="http://www.rfal.co.nz/" title="View the Regional Facilities Auckland website">
                                <img className="image" src="/assets/images/rfa/logo.svg" alt="Regional Facilities Auckland Logo"/>
                            </a>
                        </div>
                    </div>

                    <p className="fine-print">
                        <span className="copyright">&copy; {this.copyrightYear} {CONFIG.APP_NAME}</span> | <a href="/privacy-policy">Privacy Policy</a>
                    </p>
                </section>
            </footer>
        );
    }
}

export default Footer;
