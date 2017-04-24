import classNames from 'classnames';
import React from 'react';
import Tile from './tile';

class Grid extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            content: []
        };
    }

    componentWillMount() {
        this.setupItems(this.props.content);
    }

    componentWillReceiveProps(newProps) {
        if (newProps.content !== this.state.content) {
            this.setupItems(newProps.content);
        }
    }

    get heading() {
        if (this.props.heading) return (<h4>{this.props.heading}</h4>);
    }

    get line() {
        if (this.props.hasLine) return (<hr/>);
    }

    indexInMasonryPosition(index) {
        const gridDenominator = 12;

        return index % gridDenominator === 1 || // eslint-disable-line no-magic-numbers
               index % gridDenominator === 5 || // eslint-disable-line no-magic-numbers
               index % gridDenominator === 7 || // eslint-disable-line no-magic-numbers
               index % gridDenominator === 10; // eslint-disable-line no-magic-numbers
    }

    convertToMasonryGrid(tiles) {
        let gridCount,
            highlighted = [],
            nonHighlighted = [],
            result = [];

        // Sort tiles into highlighted vs. non-highlighted
        tiles.map(function(tile) {
            if (tile.isHighlighted) {
                highlighted.push(tile);
            } else {
                nonHighlighted.push(tile);
            }
        });

        // This gives each grid position a 'weight'
        gridCount = nonHighlighted.length + highlighted.length * 2; // eslint-disable-line no-magic-numbers

        // Ensure the grid retains the same 'count' as the limit
        if (this.props.limit && gridCount > this.props.limit) {
            gridCount = this.props.limit;
        }

        // Loop through and place tiles in correct locations
        for (let i = 1; i <= gridCount; i++) {
            if (highlighted.length > 0 && this.indexInMasonryPosition(i)) { // eslint-disable-line no-magic-numbers
                result.push(highlighted.shift());
                i++;
            } else if (nonHighlighted.length > 0) { // eslint-disable-line no-magic-numbers
                result.push(nonHighlighted.shift());
            }
        }

        // Remove highlighting on any remaining highlighted tiles that don't fit in the grid
        highlighted.forEach(function(highlightedTile) {
            highlightedTile.isHighlighted = false;
            result.push(highlightedTile);
        });

        return result;
    }

    removeHighlightAttribute(tiles) {
        tiles.forEach(function(tile) {
            tile.isHighlighted = false;
        });

        return tiles;
    }

    setupItems(items) {
        let content = items;

        // Apply limit on tiles if applicable
        if (this.props.limit) {
            content = items.slice(0, this.props.limit); // eslint-disable-line no-magic-numbers
        }

        // Run featured/not-featured through layout/masonry algorithm if applicable
        if (this.props.showHighlighted) {
            content = this.convertToMasonryGrid(content);
        } else {
            content = this.removeHighlightAttribute(content);
        }

        this.setState({
            content: content
        });
    }

    render() {
        let constrainClass,
            gridClass;

        gridClass = classNames({
            'grid': true,
            'has-highlighted': this.props.showHighlighted
        });

        constrainClass = classNames({
            'constrain-width': true,
            'large': this.props.isLarge,
            'normal': !this.props.isLarge
        });

        return (
            <div className={gridClass}>
                <div className={constrainClass}>
                    {this.heading}
                    {this.line}
                    <div className="tiles">
                        {this.state.content.map((item, index) => {
                            return (<Tile key={index} isNews={this.props.isNews} {...item}/>);
                        })}
                    </div>
                </div>
            </div>
        );
    }
}

Grid.propTypes = {
    content: React.PropTypes.array.isRequired,
    hasLine: React.PropTypes.bool,
    heading: React.PropTypes.string,
    isLarge: React.PropTypes.bool,
    isNews: React.PropTypes.bool,
    limit: React.PropTypes.number,
    showHighlighted: React.PropTypes.bool
};

Grid.defaultProps = {
    hasLine: true,
    isLarge: false,
    isNews: false,
    showHighlighted: false
};

export default Grid;
