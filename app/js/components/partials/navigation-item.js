class NavigationItem {
    constructor(name, url, children, current) {
        this.name = name;
        this.url = url;
        this.children = children;
        this.current = current;
    }

    get isParentButton() {
        return !this.url && this.hasOwnProperty('children');
    }
}

export default NavigationItem;
