import classNames from 'classnames';
import NavigationItem from './navigation-item';
import React from 'react';
import SearchActions from '../../client/actions/search-actions';
import ShowSearchform from './show-search-form';

class Header extends React.Component {

    /**
     * Constructor for <Header/>
     *
     * @param  {object} props React properties for the App
     *
     * @return void
     */
    constructor(props) {
        super(props);

        this.state = {
            currentParent: null,
            isVisible: false,
            isShowFinderVisible: false,
            isChildrenVisible: false,
            navigation: this.props.navigation.map((item) => {
                return new NavigationItem(item.name, item.url, item.children, this.checkIfCurrentUrl(item.current));
            })
        };
    }

    /**
     * Check if a URL matches the current page URL
     *
     * @param  {string} url URL to check against
     *
     * @return {boolean}
     */
    checkIfCurrentUrl(url) {
        return new RegExp(url).test(this.props.currentUrl);
    }

    /**
     * Returns a list of navigation children for a given parent
     *
     * @param  {object} parent Object containing parent and any children it may have
     *
     * @return {jsx} A list of children as a JSX object
     */
    renderNavigationChildren(parent) {
        if (parent.hasOwnProperty('children')) {
            return parent.children.map((item, index) => {
                return (
                    <a className="item sub" href={item.url} key={index}>{item.name}</a>
                );
            });
        }
    }

    /**
    * Render
    *
    * @return {ReactComponent} Main component to be rendered
    */
    render() {
        let buttonClass,
            currentParentClass,
            currentParentName,
            navigationClass,
            showFinderClass;

        buttonClass = classNames({
            'button-menu': true,
            'is-active': this.state.isVisible,
            'is-children-active': this.state.isChildrenVisible
        });

        navigationClass = classNames({
            'navigation': true,
            'is-active': this.state.isVisible
        });

        currentParentClass = classNames({
            'current-parent': true,
            'is-active': this.state.isChildrenVisible
        });

        showFinderClass = classNames({
            'show-finder-form': true,
            'is-active': this.state.isShowFinderVisible
        });

        currentParentName = this.state.currentParent ? this.state.currentParent.name : '';

        return (
            <div className="header-wrapper">
                <header className="header" role="banner" data-headroom>

                    <div className="information-bar">
                        <button className={buttonClass} type="button" aria-label="Menu" aria-controls="navigation" onClick={() => this.handleButtonToggle() }>
                            <span className="box">
                                <span className="inner"></span>
                            </span>
                            <span className="accessibility-label">Toggle Menu</span>
                        </button>

                        <a className="logo" href="/" title="View the Auckland Live homepage">
                            <svg className="logo-image">
                                <use xlinkHref="/assets/images/logo/horizontal.svg#text"></use>
                            </svg>
                        </a>

                        <nav className={navigationClass} role="navigation" id="navigation">
                            <h4 className={currentParentClass}>{currentParentName}</h4>
                            {this.state.navigation.map((item, index) => {
                                let itemClass = 'item';

                                if (this.checkIfCurrentUrl(item.current)) itemClass += ' is-active';

                                if (item.isParentButton) {
                                    let navigationChildrenClass = 'navigation-children';

                                    if (this.state.isChildrenVisible && this.state.currentParent === item) {
                                        navigationChildrenClass += ' is-active';
                                    }

                                    return (
                                        <div className="item-parent item-root" key={index}>
                                            <button className={itemClass} type="button" key={index} onClick={() => { this.handleChildrenDisplay(item); }}>{item.name}</button>
                                            <div className={navigationChildrenClass}>
                                                {this.renderNavigationChildren(item)}
                                            </div>
                                        </div>
                                    );
                                }
                            })}
                        </nav>

                        <button className="button default || button-find-show" type="button" aria-label="Toggle Event Finder" onClick={() => this.handleShowFinderOpen() }>Find An Event</button>
                        <button className="button default inverse || button-search" type="button" onClick={() => SearchActions.setDialogActive(true) } aria-label="Open Search Dialog">
                            <div className="firefox-fix-wrap">
                                <svg className="icon">
                                    <use xlinkHref="/assets/images/ui-icons.svg#search"></use>
                                </svg>
                                <span className="text">Search</span>
                            </div>
                        </button>
                    </div>

                    <button className="button primary square || button-find-show-mobile" type="button" aria-label="Toggle Event Finder" onClick={() => this.handleShowFinderOpen() }>
                        <div className="firefox-fix-wrap">
                            <span className="text">Find An Event</span>
                            <svg className="icon reverse">
                                <use xlinkHref="/assets/images/ui-icons.svg#arrow"></use>
                            </svg>
                        </div>
                    </button>
                    <ShowSearchform className={showFinderClass} />
                </header>
                <ShowSearchform className={showFinderClass} close={() => this.handleShowFinderClose()} />
            </div>
        );
    }

    handleButtonToggle() {
        if (this.state.isChildrenVisible) {
            this.setState({
                isChildrenVisible: !this.state.isChildrenVisible
            });
        } else {
            this.setState({
                isVisible: !this.state.isVisible
            });
        }
    }

    handleShowFinderOpen() {
        const body = document.querySelector('body');

        this.setState({
            isShowFinderVisible: true,
        });
        body.classList.add('scroll-lock');
    }

    handleShowFinderClose() {
        const body = document.querySelector('body');

        this.setState({
            isShowFinderVisible: false,
        });

        body.classList.remove('scroll-lock');
    }

    handleChildrenDisplay(parent) {
        this.setState({
            currentParent: parent,
            isChildrenVisible: !this.state.isChildrenVisible
        });
    }
}

Header.propTypes = {
    navigation: React.PropTypes.array.isRequired,
    currentUrl: React.PropTypes.string.isRequired
};

export default Header;
