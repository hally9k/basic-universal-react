const HTTP = require('../config/http');

export default function PageNotFoundException() {
    this.name = 'PageNotFoundException';
    this.message = HTTP.STATUS_CODE.NOT_FOUND.content;
    this.status = HTTP.STATUS_CODE.NOT_FOUND.status;
}
