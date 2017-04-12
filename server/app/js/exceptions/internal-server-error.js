const HTTP = require('../config/http');

export default function InternalServerErrorException() {
    this.name = 'InternalServerException';
    this.message = HTTP.STATUS_CODE.INTERNAL_SERVER_ERROR.content;
    this.status = HTTP.STATUS_CODE.INTERNAL_SERVER_ERROR.status;
}
