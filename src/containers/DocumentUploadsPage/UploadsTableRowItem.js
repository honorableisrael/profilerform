import React, { Component } from 'react';
import * as Icon from "react-feather";
import Axios from 'axios';
import { BASE_URL } from '../../constants';
import BrowserStorage from '../../utils/browserStorageUtils';
import { extractErrors } from '../../utils/errorUtils';


const fileIsInvalid = ({ type, size }) => {
  return size > 1024 * 1024 || !['jpg', 'jpeg', 'png', 'pdf'].includes(type.split('/')[1]);
}


class UploadsTableRowItem extends Component {
  state = {
    fileData: this.props.fileData,
    localFile: {},
    uploading: false,
  };

  static getDerivedStateFromProps({ fileData }, state) {
    if (state.fileData.file.updated_at !== fileData.file.updated_at) return { ...state, fileData };
    return null;
  }

  handleChange = async ({ target }) => {
    const [localFile] = target.files;
    const { fileData } = this.state;
    await this.setState({ localFile, fileData: { ...fileData, uploaded: false } });
    this.uploadFile()
  }

  uploadFile = async () => {
    const { localFile, uploading, fileData } = this.state;
    const { uploads, index, setParentState, fileData: { file: { doc_value, uploadid, id } } } = this.props;
    if (!localFile.size) return this.setState({ localFile: { name: 'No file selected' } });
    if (fileIsInvalid(localFile) || fileData.uploaded) return;
    if (!uploading) {
      const formData = new FormData();
      formData.set(doc_value, localFile);
      formData.set('uploadid', uploadid);
      formData.set('id', id);
      try {
        this.setState({ uploading: true });
        const { data: { data } } = await Axios.post(`${BASE_URL}/user/application/uploaddoc`, formData, {
          headers: { Authorization: `Bearer ${BrowserStorage.getUserToken()}` }
        });
        const files = [...uploads];
        files[index] = { uploaded: true, file: data };
        setParentState({ files });
      } catch (error) {
        console.log(error.message);
        const errors = extractErrors(error);
        console.log(errors);
      } finally {
        this.setState({ uploading: false });
      }
    }
  }

  render() {
    const {
      localFile, uploading, fileData: { uploaded, file: { doc_name, doc_value, is_uploaded } }
    } = this.state;
    
    return (
      <tr>
        <td className='fp-upload-file-title'>
          { doc_name }
        </td>
        <td>
          <div className='fp-upload-action'>
            <span className='fp-upload-btn'>
              Upload File
            </span>
            <input
              type='file'
              className='fp-file-upload'
              name={ doc_value }
              accept='.png,.jpg,.jpeg,.pdf'
              onChange={ this.handleChange }
              disabled={ uploading }
              required
            />
            {
              uploading ? (
                <span className="uploading-indicator">
                  <i>Uploading</i>
                </span>
              ) : <i>{ localFile.name } { uploaded ? <Icon.Check color='#0C0' /> : '' }</i>
            }
          </div>
          {
            localFile.size && fileIsInvalid(localFile) ? (
              <div className="invalid-msg">
                File must be of type PDF/PNG/JPEG (or JPG) not greater than 1MB in size
              </div>
            ) : ''
          }
        </td>
        <td className='fp-w10'>
          <span
            className={`badge${is_uploaded ? ' approved' : ' rejected'}`}
          >
            {
              is_uploaded ? 'Uploaded' : 'Not found'
            }
          </span>
        </td>
        <td className='fp-w10'>
          <div className='fp-document-upload-action-dropdown'>
            <Icon.MoreHorizontal
              color='#b9b7b7'
              className='ml-4'
            />
            <div className='fp-document-upload-action-dropdown-content'>
              <span
                onClick={ this.uploadFile }
              >
                {
                  is_uploaded ? 'Replace File' : 'Upload file'
                }
              </span>
              <span href='/'>Delete File</span>
            </div>
          </div>
        </td>
      </tr>
    );
  }
}
 
export default UploadsTableRowItem;

// const UploadsTableRowItem = ({ file: { doc_name, doc_value, uploadid, is_uploaded }, uploads, index, setParentState }) => {
//   const [file, setFile] = useState({});
//   const [uploading, setUploading] = useState(false);

//   // useEffect(() => {
    
//   //   return () => {
//   //     cleanup
//   //   };
//   // }, [input])

  

//   const uploadFile = async ({ target }) => {
//     if (!file.size || fileIsInvalid(file)) return setFile({ name: 'No file selected' });
//     if (!uploading) {
//       const formData = new FormData();
//       formData.set(doc_value, file);
//       formData.set('uploadid', uploadid);
//       try {
//         setUploading(true);
//         const { data: { data } } = await Axios.post(`${BASE_URL}/user/application/uploaddoc`, formData, {
//           headers: { Authorization: `Bearer ${BrowserStorage.getUserToken()}` }
//         });
//         const files = [...uploads];
//         files[index] = data;
//         setParentState({ files });
//       } catch (error) {
//         console.log(error.message);
//         const errors = extractErrors(error);
//         console.log(errors);
//       } finally {
//         setUploading(false);
//       }
//     }

//     return (
//       <tr>
//         <td className='fp-upload-file-title'>
//           { doc_name }
//         </td>
//         <td>
//           <div className='fp-upload-action'>
//             <span className='fp-upload-btn'>
//               Upload File
//             </span>
//             <input
//               type='file'
//               className='fp-file-upload'
//               name={ doc_value }
//               accept='.png,.jpg,.jpeg'
//               onChange={ handleChange }
//               required
//               formNoValidate
//             />
//             <i>{ file.name }</i>
//           </div>
//           {
//             file.size && fileIsInvalid(file) ? (
//               <div className="invalid-msg">
//                 File must be of type PNG/JPEG (or JPG) not greater than 1MB in size
//               </div>
//             ) : ''
//           }
//         </td>
//         <td className='fp-w10'>
//           <span
//             className={`badge${is_uploaded ? ' approved' : ' rejected'}`}
//           >
//             {
//               is_uploaded ? 'Uploaded' : 'Not found'
//             }
//           </span>
//         </td>
//         <td className='fp-w10'>
//           <div className='fp-document-upload-action-dropdown'>
//             <Icon.MoreHorizontal
//               color='#b9b7b7'
//               className='ml-4'
//             />
//             <div className='fp-document-upload-action-dropdown-content'>
//               <span
//                 onClick={ uploadFile }
//               >
//                 {
//                   is_uploaded ? 'Replace File' : 'Upload file'
//                 }
//               </span>
//               <span href='/'>Delete File</span>
//             </div>
//           </div>
//         </td>
//       </tr>
//     );
//   }
// }
 
// export default UploadsTableRowItem;