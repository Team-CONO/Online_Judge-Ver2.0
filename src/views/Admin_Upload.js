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
import ReactQuill from "react-quill";
import admin from "firebase-admin";

class Admin_Upload extends Component {
    constructor(props) {
        super(props);
        this.state = {
            uid: "",
            open: false,
            selectedFile: null,
            tag: 'Select by Difficult',
            postTitle: "",
            postKey: "",
            postBody: ""
        };
        fire();
        //console.log(firebase.auth().currentUser)
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
        //console.log(this.state)
        e.preventDefault();
        if (this.state.tag == "Select by Difficult") {
            alert('난이도를 선택해 주세요!');
            return;
        }
        try {
            //console.log(this.state)
            //console.log(this.postData)
            //this.state.postKey = "";
            //console.log(file)

            const { metaData } = {
                'contentType': 'image/jpeg'
            }
            var user = firebase.auth().currentUser;
            //console.log(user)
            //console.log(admin.auth().createCustomToken(user.uid))
            if(user){

                var _fileLen = this.state.selectedFile.length;

                var _lastDot = this.state.selectedFile.lastIndexOf('.');

                var _fileExt = this.state.selectedFile.substring(_lastDot, _fileLen).toLowerCase();

                console.log(_fileExt)


                var file = document.querySelector('input[type=file]').files[0];
                var postData ={
                    postKey: firebase.database().ref().child('posts').push().key,
                    guidCode: this.uuidv4(),
                    path: "posts/",

                    postTitle: this.state.postTitle,
                    postBody: this.state.postBody,

                    tag: this.state.tag,

                    selectedFile: this.state.selectedFile
                }
                var databasepath = 'posts/' + postData.tag + '/' + postData.postKey
                var storagepath = 'posts/' + postData.postKey + '/' + postData.guidCode + _fileExt
                var filelink = "";

                console.log(storagepath)

                //alert("Storage Start")
                firebase.auth().currentUser.getIdToken(true).then(function(token){
                    //console.log(customToken)
                    const customeTokenReq = fetch("https://asia-northeast1-mimi-chan.cloudfunctions.net/auth/token", {
                        method: 'POST',
                        headers: {
                            'Authorization': token
                        }
                    })

                    customeTokenReq
                        .then((val) => {
                            console.log('val', val.body);
                            // val.body
                            return val.json()
                        })
                        .then(res => {
                            console.log('res', res);
                            if (res.success) {
                                firebase
                                    .auth()
                                    .signInWithCustomToken(res.token)
                                    .then(res => {
                                        console.log('token login ok', res);

                                        firebase
                                            .storage()
                                            .ref()
                                            .child(storagepath)
                                            .put(file)
                                            .then(function(urllink){
                                                urllink.ref.getDownloadURL().then(function(url){
                                                    firebase
                                                        .database()
                                                        .ref('posts/' + postData.tag + "/" + postData.postKey)
                                                        .set({title: postData.postTitle, body: postData.postBody, url: url})
                                                        .catch((e) => {
                                                            console.log('3');
                                                            console.log(e);
                                                        })
                                                })
                                                console.log('asdfasdf', urllink)
                                            })
                                            .catch((err) => {
                                                console.log('err file',err);
                                            })
                                    })
                                    .catch(err => {
                                        console.log('token login fail', err);
                                    })
                            }
                        })
                        .catch(err => {
                            console.log('err', err);
                        })

                    // firebase
                    // .auth()
                    // .signInWithCustomToken(customToken)
                    // .then(res => {
                    //     //console.log(res)
                    //     if(res.user){
                    //         //console.log(path)
                    //         firebase
                    //             .storage()
                    //             .ref()
                    //             .child(storagepath)
                    //             .put(file)
                    //             .then(function(urllink){
                    //                 /*var xhr = new XMLHttpRequest();
                    //                 xhr.responseType = 'blob';
                    //                 xhr.onload = function(event) {
                    //                     var blob = xhr.response;
                    //                 };*/
                    //                 //console.log(urllink.ref.getDownloadURL())
                    //                 urllink.ref.getDownloadURL().then(function(url){
                    //                     //alert("DB Start")
                    //                     admin.auth().createCustomToken(user.uid).then(function(customToken){
                    //                         firebase
                    //                         .auth()
                    //                         .signInWithCustomToken(customToken)
                    //                         .then(res => {
                    //                         if(res.user){
                    //                                 //console.log(filelink)
                    //                                 //console.log('posts/' + postData.postKey)
                    //                                 firebase
                    //                                 .database()
                    //                                 .ref('posts/' + postData.tag + "/" + postData.postKey)
                    //                                 .set({title: postData.postTitle, body: postData.postBody, url: url})
                    //                                 .catch((e) => {
                    //                                     console.log('3');
                    //                                     console.log(e);
                    //                                 })
                    //                             }
                    //                         })
                    //                         .catch((e) => {
                    //                             console.log(e);
                    //                         });
                    //                     }).catch((e) => {
                    //                         console.log(e);
                    //                     });
                    //                 })
                    //                 .catch((e) => {
                    //                     console.log(e);
                    //                 });

                    //             })
                    //             .catch((e) => {
                    //                 console.log(e);
                    //             });
                    //     }
                    // })
                });

                alert('업로드가 완료되었습니다!')
            }
        } catch (e) {
            console.log(e)
        }
    }
    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value
        })
        //console.log(this.state.selectedFile)
    }
    rteChange = (content, delta, source, editor, e) => {
        //console.log(editor.getText()); // plain text
        this.state.postBody = editor.getText()
    }
    render() {
        return (

            <div>
                <Row>
                    <Col /*"style={{paddingTop: 25, paddingLeft: 63}}"*/ >
                        <Card className="my-4 mx-5">
                            <CardHeader className="">
                                <h4 className='m-0'>파일 업로드</h4>
                            </CardHeader>
                            <CardBody >
                                <FormInput name="postTitle" size="lg" className="mb-3" placeholder="Your Post Title" onChange={this.handleChange} />
                                <FormGroup>
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
                                        accept=".docx, .hwp, .jpg, .jpeg, .png"
                                        onChange={this.handleChange}/>
                                </FormGroup>

                                <ReactQuill onChange={this.rteChange} name="postBody" className="add-new-post__editor mb-1" />

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