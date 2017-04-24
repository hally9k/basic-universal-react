import DateHelper from '../../helpers/date-helper';
import getURIValueFromKey from '../../helpers/get-uri-value-from-key';
import moment from 'moment';
import { TYPES } from '../../config/event';
import DayPicker, { DateUtils } from 'react-day-picker';
import React, { Component, PropTypes } from 'react';

class ShowSearchForm extends Component {
    constructor() {
        super();

        this.state = {
            date: '-',
            genre: '-',
            price: '-',
            from: null, // The combined calendar uses this
            to: null, // The combined calendar uses this
            inputFrom: null, // The input text uses this
            inputTo: null, // The input text uses this
            showCombinedCalendar: false,
            showFromCalendar: false,
            showToCalendar: false
        };
    }

    componentDidMount() {
        this.setValuesFromURL();
    }

    closeCombinedCalendar() {
        this.setState({
            showCombinedCalendar: false
        });
    }

    /**
     * Set current state variables with values from URL (GET parameters).
     *
     * @return {void}
     */
    setValuesFromURL() {
        let date = getURIValueFromKey('date'),
            dates = '',
            from = '',
            newState = {
                date: getURIValueFromKey('date'),
                genre: getURIValueFromKey('genre'),
                price: getURIValueFromKey('price')
            },
            to = '';

        if ((date !== '-') && (date !== '')) {
            dates = date.split(',');
            from = new Date(dates[0]);
            to = new Date(dates[1]);

            if (this.isDate(from)) {
                // These need to be set independently to avoid the input recieving bad data
                newState.inputFrom = this.formatReadableDate(from);
                newState.from = from;
            }

            if (this.isDate(to)) {
                // These need to be set independently to avoid the input recieving bad data
                newState.inputTo = this.formatReadableDate(to);
                newState.to = to;
            }
        }

        this.setState(newState);
    }

    /*
     * Switch the state of the calendar so it opens and closes
     *
     */
    toggleCalendar(type) {
        let toggle;

        switch (type) {
            case 'combined':
                toggle = {
                    showCombinedCalendar: !this.state.showCombinedCalendar
                };
                break;
            default:
                break;
        }

        this.setState(toggle);
    }

    closeCalendar(type) {
        let close;

        switch (type) {
            case 'from':
                close = {
                    showToCalendar: false,
                    showFromCalendar: false
                };
                break;
            case 'to':
                close = {
                    showToCalendar: false,
                    showFromCalendar: false
                };
                break;

            default:
                break;
        }

        this.setState(close);
    }

    openCalendar(type) {
        let open;

        switch (type) {
            case 'from':
                open = {
                    showToCalendar: false,
                    showFromCalendar: true
                };
                break;

            case 'to':
                open = {
                    showToCalendar: true,
                    showFromCalendar: false
                };
                break;

            default:
                break;
        }

        this.setState(open);
    }

    handleDayClickCombined(day, status) {
        let newState;

        if (status.disabled) {
            return;
        }

        const range = DateUtils.addDayToRange(day, this.state);

        newState = {
            from: range.from,
            to: range.to,
            inputFrom: null,
            inputTo: null,
            date: ''
        };

        if (range.from) {
            newState.inputFrom = this.formatReadableDate(range.from);
            newState.date = this.formatReadableDate(range.from);
        }

        if (range.to) {
            newState.inputTo = this.formatReadableDate(range.to);
            newState.date = `${this.formatReadableDate(range.from)} - ${this.formatReadableDate(range.to)}`;
        }

        this.setState(newState);
    }

    handleDayClickFrom(day, status) {
        if (status.disabled) {
            return;
        }

        this.closeCalendar('from');

        this.setState({
            from: day,
            inputFrom: this.formatReadableDate(day),
            date: `${this.formatReadableDate(day)} - ${this.state.inputTo}`
        });
    }

    handleDayClickTo(day, status) {
        if (status.disabled) {
            return;
        }

        this.closeCalendar('to');

        this.setState({
            to: day,
            inputTo: this.formatReadableDate(day),
            date: `${this.formatReadableDate(this.state.inputFrom)} - ${this.formatReadableDate(day)}`
        });
    }

    handleDateRangeClick(event, date) {
        event.preventDefault();

        let dates,
            rangeOfDates;

        rangeOfDates = {
            from: null,
            to: null,
            inputFrom: null,
            inputTo: null,
            date: '',
            showToCalendar: false,
            showFromCalendar: false
        };

        if (date !== '') {
            dates = date.split(',');
            rangeOfDates = {
                from: new Date(dates[0]),
                to: new Date(dates[1]),
                inputFrom: this.formatReadableDate(dates[0]),
                inputTo: this.formatReadableDate(dates[1]),
                date: `${this.formatReadableDate(dates[0])} - ${this.formatReadableDate(dates[1])}`,
                showToCalendar: false,
                showFromCalendar: false
            };
        }

        this.setState(rangeOfDates);
    }

    formatDate(date) {
        return moment(date).format('YYYY-MM-DD');
    }

    formatReadableDate(date) {
        return moment(date).format('DD/MM/YYYY');
    }

    isDate(date) {
        return (date instanceof Date && !isNaN(date.getTime()));
    }


    // Render
    renderDatePickerDesktop() {
        const { from, to } = this.state;

        if (this.state.showCombinedCalendar === true) {
            return (
                <div className="date-picker combined">
                    <div className="date-ranges">
                        <button className="date-option" onClick={ (event) => this.handleDateRangeClick(event, DateHelper.thisWeek) }>next 7 days</button>
                        <button className="date-option" onClick={ (event) => this.handleDateRangeClick(event, DateHelper.thisWeekend) }>this weekend</button>
                        <button className="date-option" onClick={ (event) => this.handleDateRangeClick(event, DateHelper.thisMonth) }>this month</button>
                        <button className="date-option" onClick={ (event) => this.handleDateRangeClick(event, '') }>any dates</button>
                    </div>

                    <DayPicker
                      numberOfMonths={ 2 }
                      disabledDays={ DateUtils.isPastDay }
                      selectedDays={ (day) => DateUtils.isDayInRange(day, { from, to }) }
                      onDayClick={ (event, day, status) => this.handleDayClickCombined(day, status) }
                      modifiers={ { from: (day) => DateUtils.isSameDay(day, from), to: (day) => DateUtils.isSameDay(day, to), } }
                    />

                    <button type="button" className="button clear-dates hide-on-mobile" onClick={ (event) => this.handleDateRangeClick(event, '') }>Clear dates</button>

                </div>

            );
        }

        return null;
    }

    renderDatePickerMobileFrom() {
        const { from } = this.state;

        let initialMonth = moment().toDate();

        if (from) {
            initialMonth = from;
        }

        if (this.state.showFromCalendar === true) {
            return (
                <div className="date-picker mobile from">
                    <div className="date-ranges">
                        <button className="date-option" onClick={ (event) => this.handleDateRangeClick(event, DateHelper.thisWeek) }>next 7 days</button>
                        <button className="date-option" onClick={ (event) => this.handleDateRangeClick(event, DateHelper.thisWeekend) }>this weekend</button>
                        <button className="date-option" onClick={ (event) => this.handleDateRangeClick(event, DateHelper.thisMonth) }>this month</button>
                        <button className="date-option" onClick={ (event) => this.handleDateRangeClick(event, '') }>any dates</button>
                    </div>

                    <DayPicker
                        onDayClick={ (event, day, status) => this.handleDayClickFrom(day, status) }
                        selectedDays={ (day) => DateUtils.isSameDay(from, day)}
                        disabledDays={ DateUtils.isPastDay }
                        initialMonth={ initialMonth }
                    />

                    <button type="button" className="button default" onClick={() => this.closeCalendar('from')}>Close</button>

                </div>
            );
        }

        return null;
    }

    renderDatePickerMobileTo() {
        const { to, from } = this.state;

        let initialMonth = moment().toDate();

        if (to) {
            initialMonth = to;
        } else if (from) {
            initialMonth = from;
        }

        if (this.state.showToCalendar === true) {
            return (
                <div className="date-picker mobile to">
                    <div className="date-ranges">
                        <button className="date-option" onClick={ (event) => this.handleDateRangeClick(event, DateHelper.thisWeek) }>next 7 days</button>
                        <button className="date-option" onClick={ (event) => this.handleDateRangeClick(event, DateHelper.thisWeekend) }>this weekend</button>
                        <button className="date-option" onClick={ (event) => this.handleDateRangeClick(event, DateHelper.thisMonth) }>this month</button>
                        <button className="date-option" onClick={ (event) => this.handleDateRangeClick(event, '') }>any dates</button>
                    </div>

                    <DayPicker
                        onDayClick={ (event, day, status) => this.handleDayClickTo(day, status) }
                        selectedDays={ (day) => DateUtils.isSameDay(to, day) }
                        disabledDays={ DateUtils.isPastDay }
                        initialMonth={ initialMonth }
                    />

                    <button type="button" className="button default" onClick={() => this.closeCalendar('to')}>Close</button>

                </div>
            );
        }

        return null;
    }

    renderEventTypesDropdown() {
        return (
           <select name="genre" id="show-finder-genre" aria-label="Show Genre" value={this.state.genre} onChange={(event) => { this.setState({ genre: event.target.value }); }}>
                {TYPES.map((item) => {
                    return (<option value={ item.key } key={ item.key }>{ item.value }</option>);
                })}
            </select>
        );
    }

    renderEventPriceRange() {
        return (
           <select name="price" id="show-finder-price" aria-label="Show Price" value={this.state.price} onChange={(event) => { this.setState({ price: event.target.value }); }}>
                <option value="-">Any price</option>
                <option value="0">Free</option>
                <option value="<50">Under $50</option>
                <option value="50-100">$50 - $100</option>
                <option value=">100">$100 +</option>
            </select>
        );
    }

    renderCloseOverlay() {
        if (this.state.showCombinedCalendar === true) {
            return <button type="button" className="close-overlay hide-on-mobile" onClick={() => this.closeCombinedCalendar()}></button>;
        }
    }

    mountPostableDate() {
        let { from, to } = this.state;

        if (!from) {
            return '-';
        }

        if (!to) {
            return this.formatDate(from);
        }

        return `${this.formatDate(from)},${this.formatDate(to)}`;
    }

    mountOutputableDate() {
        let { date, from, to } = this.state;

        if ((date === '-') || (date === '') || (date === 'Invalid+date,Invalid+date')) {
            return 'any dates';
        }

        /**
         * W.A.D.D applied here aka workaround driven development
         * Not enough budget to refactor!
         * When you change pages the date doesn't have the proper format, this make sure it does before outputting
         */
        if (date.search(' - ') > 0) {
            return date;
        }

        if (!to) {
            if (from) {
                return this.formatReadableDate(from);
            }
        }

        date = date.split(',');

        from = date[0].split('-');
        from = `${from[2]}/${from[1]}/${from[0]}`;

        if (!date[1]) {
            return from;
        }

        to = date[1].split('-');
        to = `${to[2]}/${to[1]}/${to[0]}`;

        return `${from} - ${to}`;
    }

    render() {
        let { inputFrom, inputTo } = this.state;

        if ((!inputFrom) || (inputFrom === '')) {
            inputFrom = 'any dates';
        }

        if ((!inputTo) || (inputTo === '')) {
            inputTo = 'any dates';
        }

        return (
            <form action="/search/events" method="GET" className={this.props.className}>
                <button type="button" className="button-close" onClick={this.props.close}></button>
                <span className="label">I'm looking for</span>
                <div className="select-wrapper">
                    { this.renderEventTypesDropdown() }
                    <label htmlFor="show-finder-type" className="chevron">
                        <svg viewBox="0 0 14 9"><use xlinkHref="/assets/images/ui-icons.svg#chevron"></use></svg>
                    </label>
                </div>

                <span className="hide-on-mobile label">on</span>
                <div className="input-wrapper hide-on-mobile">
                    <label htmlFor="show-finder-type" className="chevron">
                        <svg viewBox="0 0 14 9"><use xlinkHref="/assets/images/ui-icons.svg#chevron"></use></svg>
                    </label>
                    <input readOnly aria-label="Show Date" type="text" value={ this.mountOutputableDate() } onClick={() => this.toggleCalendar('combined') } />
                </div>
                <input name="date" id="date" aria-label="Show Date" type="hidden" value={ this.mountPostableDate() } />

                {this.renderDatePickerDesktop()}

                <div className="input-wrapper hide-on-desktop datepicker-calendar">
                    <span className="label">from </span>
                    <input readOnly aria-label="Show Date" type="text" value={ inputFrom } onClick={() => this.openCalendar('from') } />
                    <div className="date-picker-wrapper">
                        {this.renderDatePickerMobileFrom()}
                    </div>
                </div>

                <div className="input-wrapper hide-on-desktop datepicker-calendar">
                    <span className="label">to </span>
                    <input readOnly aria-label="Show Date" type="text" value={ inputTo } onClick={() => this.openCalendar('to') } />
                    <div className="date-picker-wrapper">
                        {this.renderDatePickerMobileTo()}
                    </div>
                </div>
                {/*
                <span className="hide-on-mobile label">for</span>
                 <div className="select-wrapper hide-on-mobile">

                    { this.renderEventPriceRange() }
                    <label htmlFor="show-finder-price" className="chevron">
                        <svg viewBox="0 0 14 9"><use xlinkHref="/assets/images/ui-icons.svg#chevron"></use></svg>
                    </label>
                </div>
                */}
                <span className="label hide-on-mobile">for</span>
                <div className="select-wrapper">
                    <span className="label hide-on-desktop">for</span>
                    { this.renderEventPriceRange() }
                    <label htmlFor="show-finder-price" className="chevron">
                        <svg viewBox="0 0 14 9"><use xlinkHref="/assets/images/ui-icons.svg#chevron"></use></svg>
                    </label>
                </div>

                <button type="button" className="button clear-dates hide-on-desktop" onClick={ (event) => this.handleDateRangeClick(event, '') }>Clear dates</button>

                <button type="submit" className="button primary find-button">Find</button>

                { this.renderCloseOverlay() }
            </form>
        );
    }
}

ShowSearchForm.propTypes = {
    className: PropTypes.string,
    close: React.PropTypes.func
};

export default ShowSearchForm;
