import React, { Component } from 'react';
import { Document, Page, pdfjs } from 'react-pdf';
import Axios from 'axios';
import CircularLoader from '../CircularLoader';

import './pdfViewer.css'


pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

// import file from './Outline.pdf';


class PDFViewer extends Component {
  state = { numPages: null, currentPage: 1, fileURL: '' };

  componentDidMount() {
    this.downloadFile();
  };

  closeModal = ({ target }) => {
    this.modalRef.current.style.display = 'none';
  };  

  downloadFile = async () => {
    const { file } = this.props;
    try {
      const { data } = await Axios.get(`https://cors-anywhere.herokuapp.com/${file.filename}`, {
        responseType: 'blob', //Force to receive data in a Blob Format
        headers: { 'Access-Control-Allow-Origin': '*' },
        crossdomain: true
      });

      const blob = new Blob(
        [data], 
        {type: 'application/pdf'}
      );

      const fileURL = URL.createObjectURL(blob);
      this.setState({ fileURL });
    } catch (error) {
      console.log(error.message);
    }
  };

  handleDocumentLoadSuccess = ({ numPages }) => this.setState({ numPages });

  render() {
    const { numPages, currentPage, fileURL } = this.state;
    const { file, modalRef } = this.props;

    return (
      <div className="pdf-viewer-wrapper" id="myModal" ref={modalRef}>
        <span
          className="close cursor"
          onClick={ this.closeModal }
        >
          x
        </span>
        <div className="modal-content">
          <div className="download-btn-wrapper">
            <a
              href={ fileURL }
              className="download-btn"
              download={`${file.doc_name}-${file.appRef}`}
              >
              Download
            </a>
          </div>
          <Document
            file={ `https://cors-anywhere.herokuapp.com/${file.filename}` }
            onLoadSuccess={ this.handleDocumentLoadSuccess }
            onLoadError={  (error) => console.log(error) }
            className='pdf-viewer'
            loading={ <CircularLoader isLoading={ true } /> }
          >
            <Page pageNumber={ currentPage } scale={ 1.3 } >
              <p className='page-description'>Page { currentPage } of { numPages }</p>
            </Page>
            <div className="navigation-wrapper">
            <span
              className={ `prev${(numPages && currentPage > 1) ? '' : ' hide'}` }
              onClick={ () => this.setState({ currentPage: currentPage - 1 }) }
            >&#10094;</span>
            <span
              className={ `next${(numPages && currentPage < numPages) ? '' : ' hide'}` }
              onClick={ () => this.setState({ currentPage: currentPage + 1 }) }
            >&#10095;</span>
            </div>
          </Document>
        </div>  
      </div>
    );
  }
}
 
export default PDFViewer;