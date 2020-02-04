import React, {Component} from 'react';
import {
    Row,
    Col,
    Form,
    FormTextarea,
    FormInput,
    FormGroup,
    Button,
    Card,
    CardHeader,
    CardBody,
} from "shards-react";
import {Link} from 'react-router-dom';
import logo from '../images/logo.png';
import firebase, {fire} from '../Firebase';
import storage from '../Firebase';

class Admin_Upload extends Component {
    constructor(props) {
        super(props);
        this.toggle = this.toggle.bind(this);
        this.state = {
            open: false,
            selectedFile: null,
            tag: 'Select by Difficult',
        };
        this.postData ={
            path: '/post/',
            selectedFile: null,
            guidCode: ""
        }
        fire();
    }
    
    toggle() {
        this.setState(prevState => {
        return { open: !prevState.open };
        });
    }
    uuidv4() {
        return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
          (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
        );
    }
    handleSubmit = (e) => {
        console.log(this.state.selectedFile)
        e.preventDefault();
        if (this.state.tag == "Select by Difficult") {
            alert('난이도를 선택해 주세요!');
            return;
        }
        try {
            this.postData.guidCode = this.uuidv4()
            var file = document.querySelector('input[type=file]').files[0];

            const { metaData } = {
                'contentType': 'image/jpeg'
            }
            firebase
                .storage()
                .ref()
                .child('posts/' + this.postData.guidCode + '/')
                .put(file, metaData)
            ;
            alert('업로드가 완료되었습니다!');
        } catch (e) {
            alert(e.message);
        }
    }
    handleChange = (e) => {
        console.log(e.target.value)
        if(e.target.files){
            const selectedFile = e.target.files;
            this.setState(() => ({selectedFile}))
        }else{
            this.setState({
                [e.target.name]: e.target.value
            })
        }
    }
    render() {
        return (
            
            <div>
                <Row>
                    <Col style={{paddingTop: 50}}>
                        <Card Row="200">
                            <CardHeader className="">
                                <h3 className='m-0'>파일 업로드</h3>
                            </CardHeader>
                            <CardBody>
                                <FormGroup inline="inline" >
                                    <select class="form-control custom-select" name="tag" onChange={this.handleChange} size="1">
                                        <option>Select by Difficult</option>
                                        <option>E</option>
                                        <option>M</option>
                                        <option>H</option>
                                        <option>Other</option>
                                    </select>
                                    <input
                                        style={{marginTop: 15}}
                                        type="file"
                                        name="selectedFile"
                                        accept=".docs, .hwp, .jpg, .jpeg, .png"
                                        onChange={this.handleChange}/>
                                </FormGroup>

                                <FormGroup class="add-new-post">
                                    <div class="quill add-new-post__editor mb-1">
                                        <div class="ql-container ql-snow"><div class="ql-editor ql-blank" data-gramm="false" contenteditable="true">
                                            <p></p>
                                        </div>
                                            <div class="ql-clipboard" contenteditable="true" tabindex="-1"></div>
                                        </div>
                                    </div>
                                </FormGroup>

                                <Button block='true' style={{marginTop: 20}} onClick={this.handleSubmit}>업로드 하기</Button>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </div>
        );
    }
}

export default Admin_Upload;