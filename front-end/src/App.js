import React, { Component } from 'react';
import './App.css';
import logo from './assets/images/logo.jpg'



class App extends Component {

    state = {
        userId: '',
        userPassword: '',
        users: []
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
                console.log(this.state.users, "akiw")
            })
    }

    insertDb = () => {
            let userName = this.state.userId
            let userPassword = this.state.userPassword
           console.log(this.state.userId, this.state.userPassword)
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
            }).then(() => {
                this.setState({
                    userId: '',
                    userPassword: '',
                })
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

    submitButtonHandler = () => {
        console.log("password ", this.state.userPassword, " loing", this.state.userId)
    }

  render() {
    return (
      <div className="App">
          <div className="main-part">
             <div className="contentBox">
                 <div className="logo-section">
                     <img src={logo} alt="logo" className={"logo-image"}/>
                 </div>
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
