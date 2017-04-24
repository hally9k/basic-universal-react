import React from 'react';

const BYTE_BASE = 1024;
const DECIMAL_PLACES = 1;
const KILO_BYTE = 1024;
const MEGA_BYTE = KILO_BYTE * BYTE_BASE;
const GIGA_BYTE = MEGA_BYTE * BYTE_BASE;

class FileDownload extends React.Component {
    constructor(props) {
        super(props);

        this.state = this.props;
    }

    get filesize() {
        let bytes = this.state.filesize,
            extension = this.state.extension.toUpperCase(),
            extensionText = `${extension} file`;

        if ((bytes >= KILO_BYTE) && (bytes < MEGA_BYTE)) {
            return `${(bytes / KILO_BYTE).toFixed(DECIMAL_PLACES)} KB ${extensionText}`;
        } else if ((bytes >= MEGA_BYTE) && (bytes < GIGA_BYTE)) {
            return `${(bytes / MEGA_BYTE).toFixed(DECIMAL_PLACES)} MB ${extensionText}`;
        }

        return `${bytes} B ${extensionText}`;
    }

    render() {
        return (
            <section className="section">
                <div className="constrain-width">
                    <div className="file-attachment">
                        <div className="information">
                            <p className="filename">{this.state.filename}</p>
                            <p className="filesize">{this.filesize}</p>
                        </div>
                        <a className="small primary button" href={this.state.file} download={this.state.filename} target="_blank">Download</a>
                    </div>
                </div>
            </section>
        );
    }
}

FileDownload.propTypes = {
    extension: React.PropTypes.string.isRequired,
    file: React.PropTypes.string.isRequired,
    filename: React.PropTypes.string.isRequired,
    filesize: React.PropTypes.string.isRequired
};

export default FileDownload;
